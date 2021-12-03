import axios from 'axios'
import options from './options'
import axiosRetry from 'axios-retry'
import logging from './logging'

const MAX_INCITEFUL_REQUESTS = 100
const INTERVAL_MS = 10
let PENDING_REQUESTS = 0
const idParamName = 'ids[]'
const pruneParamName = 'prune'
const queryApi = axios.create()
const API_URL =
  process.env.VUE_APP_CLIENT_API_URL || 'https://api.inciteful.xyz'

queryApi.interceptors.request.use(function (config) {
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      if (PENDING_REQUESTS < MAX_INCITEFUL_REQUESTS) {
        PENDING_REQUESTS++
        clearInterval(interval)
        resolve(config)
      }
    }, INTERVAL_MS)
  })
})

queryApi.interceptors.response.use(
  function (response) {
    PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1)
    return Promise.resolve(response)
  },
  function (error) {
    PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1)
    return Promise.reject(error)
  }
)

axiosRetry(queryApi, { retries: 3 })

function handleIncitefulErr (err) {
  logging.logError(err)
}

function handleServiceErr (err) {
  if (err.response && err.response.status !== 404) {
    logging.logError(err)
  }
}

// Inciteful API Calls
function queryGraph (ids, sql) {
  const prune = options.getPruneLevel()

  if (Array.isArray(ids)) {
    if (ids.length === 1) {
      return queryGraphSingle(ids[0], sql, prune)
    } else {
      return queryGraphMulti(ids, sql, prune)
    }
  } else {
    return queryGraphSingle(ids, sql, prune)
  }
}

function queryGraphSingle (id, sql, prune) {
  let url = `${API_URL}/query/${id}`

  if (prune) {
    url = url + `?${pruneParamName}=${prune}`
  }

  return queryApi.post(url, sql).then(response => response.data)
}

function queryGraphMulti (ids, sql, prune) {
  const idParams = ids.map(id => `${idParamName}=${id}`).join('&')
  let url = `${API_URL}/query?${idParams}`

  if (prune) {
    url = url + `&${pruneParamName}=${prune}`
  }

  return queryApi.post(url, sql).then(response => response.data)
}

function connectPapers (from, to, extendedGraphs) {
  return axios
    .get(
      `${API_URL}/connector?from=${encodeURIComponent(
        from
      )}&to=${encodeURIComponent(to)}&extend=${extendedGraphs ? 5 : 0}`
    )
    .then(response => response.data)
    .catch(err => {
      handleIncitefulErr(err)
    })
}

function getPaper (id) {
  return axios
    .get(`${API_URL}/paper/${id}`)
    .then(response => response.data)
    .catch(err => {
      handleIncitefulErr(err)
    })
}

function getPapers (ids, condensed) {
  const idParams = ids.map(id => `${idParamName}=${id}`).join('&')

  return axios
    .get(`${API_URL}/paper?${idParams}&condensed=${!!condensed}`)
    .then(response => response.data)
    .catch(err => {
      handleIncitefulErr(err)
    })
}

function getPaperIds (ids) {
  return getPapers(ids, true).then(data => data.map(paper => paper.id))
}

function searchPapers (query) {
  if (query) {
    const params = new URLSearchParams([['q', query]])
    return axios
      .get(`${API_URL}/paper/search`, {
        params,
        timeout: 1000
      })
      .then(response => response.data)
      .catch(_ => {
        return []
      })
      .then(data => {
        if (data.length > 0) {
          return data
        } else {
          return searchSemanticScholar(query).then(data =>
            data.map(convertToIncitefulPaper)
          )
        }
      })
  } else {
    return Promise.resolve([])
  }
}

function convertToIncitefulPaper (ssPaper) {
  return {
    id: ssPaper.id,
    title: ssPaper.title,
    author: ssPaper.authors.map(convertToIncitefulAuthor),
    published_year: ssPaper.year,
    journal: ssPaper.venue,
    abstract: ssPaper.abstract,
    num_cited_by: ssPaper.citationCount,
    num_citing: ssPaper.referenceCount
  }
}

function convertToIncitefulAuthor (ssAuthor) {
  return {
    author_id: ssAuthor.id,
    name: ssAuthor.name,
    affiliation: ssAuthor.affiliation
  }
}

function getCitations (ids) {
  const idParams = ids.map(id => `${idParamName}=${id}`).join('&')

  return axios
    .get(`${API_URL}/graph/citations?${idParams}`)
    .then(response => response.data)
    .catch(err => {
      handleIncitefulErr(err)
    })
}

function downloadBibFile (ids) {
  const idParams = ids.map(id => `${idParamName}=${id}`).join('&')

  window.location = `${API_URL}/bib?${idParams}`
}

function unpaywall (doi) {
  return axios
    .get(`https://api.unpaywall.org/v2/${doi}?email=info@inciteful.xyz`)
    .then(response => response.data)
    .catch(err => {
      handleServiceErr(err)
      return undefined
    })
}

function searchSemanticScholar (query) {
  return axios
    .get(
      `https://api.semanticscholar.org/graph/v1/paper/search?fields=paperId,abstract,authors.authorId,authors.name,referenceCount,citationCount,venue,title,year&query=${encodeURIComponent(
        query
      )}`
    )
    .then(res => {
      if (res.data && res.data.data) {
        res.data.data.forEach(p => {
          p.id = `s2id:${p.paperId}`
        })
        return res.data.data
      } else {
        return []
      }
    })
    .catch(err => {
      handleServiceErr(err)
      return Promise.resolve([])
    })
}

export default {
  queryGraph,
  unpaywall,
  searchSemanticScholar,
  getPaper,
  getPapers,
  connectPapers,
  getPaperIds,
  searchPapers,
  downloadBibFile,
  getCitations
}

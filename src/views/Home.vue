<template>
  <div class="home">
    <div class="shadow bg-gray-800 lg:py-12 py-6 px-4 sm:px-6 lg:px-8">
      <div class="relative">
        <div class="sm:text-center md:max-w-4xl md:mx-auto lg:text-left">
          <h2
            class="mb-2 text-4xl tracking-tight leading-10 font-extrabold text-gray-100 sm:leading-none lg:text-5xl xl:text-6xl"
          >
            Tools to help you
            <br class="hidden md:inline" />
            <span class="text-purple-400">accelerate your research</span>
          </h2>
        </div>
        <div class="max-w-xl mx-auto px-4 md:max-w-screen-xl lg:px-6">
          <div class="lg:flex mt-3 sm:mt-5 ">
            <div class="flex-1 lg:pr-6 md:max-w-4xl md:mx-auto">
              <p
                class="text-base text-gray-300 sm:text-xl lg:text-lg xl:text-xl"
              >
                Build a network of academic papers and we'll analyze the network
                to help you <span class="text-purple-400">discover</span> the
                most relevant literature.
              </p>
              <div class="mt-5 sm:mx-auto lg:mx-0 text-gray-400">
                <p class="text-base font-medium">
                  Search for the title of a paper to get started.
                </p>
                <div>
                  <div class="flex pt-3">
                    <div class="flex-auto max-w-full text-base ">
                      <GraphSearch
                        :showImport="true"
                        @selected="addLitReviewPapers"
                        @searched="goToSearch"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex-none flex lg:flex-col">
              <div
                class="flex-grow lg:flex-auto border-r-0 lg:border-r-2 border-gray-600 border-b-2 lg:border-b-0 lg:h-20 m-auto lg:w-0"
              ></div>
              <div class="flex-none p-3 text-gray-600">OR</div>
              <div
                class="flex-grow lg:flex-auto border-r-0 lg:border-r-2 border-gray-600 border-b-2 lg:border-b-0 lg:h-20 m-auto lg:w-0"
              ></div>
            </div>
            <div class="flex-1 lg:pl-6 md:max-w-4xl md:mx-auto">
              <p
                class="text-base text-gray-300 sm:text-xl lg:text-lg xl:text-xl"
              >
                Select two papers and we will show you how the
                <span class="text-purple-400">literature connects</span> them
                together.
              </p>
              <div class="pt-5 text-gray-400">
                <ConnectorSearch />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="py-6 xl:py-12 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      <div class="max-w-max-content lg:max-w-7xl mx-auto">
        <div class="relative z-10 mb-4 md:mb-2 md:px-6">
          <div class="text-base max-w-prose lg:max-w-none">
            <h1
              class="mt-2 pb-0 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10"
            >
              Find the most relevant literature, faster
            </h1>
          </div>
        </div>
        <div class="relative">
          <svg
            class="hidden md:block absolute top-0 right-0 -mt-20 -mr-20"
            width="404"
            height="384"
            fill="none"
            viewBox="0 0 404 384"
          >
            <defs>
              <pattern
                id="95e8f2de-6d30-4b7e-8159-f791729db21b"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x="0"
                  y="0"
                  width="4"
                  height="4"
                  class="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width="404"
              height="384"
              fill="url(#95e8f2de-6d30-4b7e-8159-f791729db21b)"
            />
          </svg>
          <svg
            class="hidden md:block absolute bottom-0 left-0 -mb-20 -ml-20"
            width="404"
            height="384"
            fill="none"
            viewBox="0 0 404 384"
          >
            <defs>
              <pattern
                id="7a00fe67-0343-4a3c-8e81-c145097a3ce0"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x="0"
                  y="0"
                  width="4"
                  height="4"
                  class="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width="404"
              height="384"
              fill="url(#7a00fe67-0343-4a3c-8e81-c145097a3ce0)"
            />
          </svg>
          <div class="relative md:bg-white md:p-6">
            <div class="lg:grid lg:grid-cols-2 lg:gap-6 mb-3">
              <div
                class="prose prose-lg text-gray-500 mb-6 lg:max-w-none lg:mb-0"
              >
                <p>
                  The goal of Inciteful is to give the world free tools to help
                  accelerate academic research. If that means getting up to
                  speed on a new topic, finding the latest literature, or
                  figuring out how two ideas are connected, we can help.
                </p>
                <p>
                  Unlike a traditional search engine, citations are the
                  cornerstone of all of our tools. Building these tools for all
                  academic literature has only recently been possible with the
                  rise of open scholarly bibliographic data and the amazing work
                  being done by the <a href="/data">these groups</a>.
                </p>
                <p>
                  To date we have two tools.
                  <a href="/p">Paper Discovery</a> and the
                  <a href="/c">Literature Connector</a>. More tools are actively
                  under development.
                </p>
                <p>
                  The <a href="/p">Paper Discovery</a> tool builds a network of
                  papers from citations, uses network analysis algorithms to
                  analyze the network, and gives you the information you need to
                  quickly get up to speed on that topic. You can find the most
                  similar papers, important papers as well as prolific authors
                  and institutions.
                </p>
              </div>
              <div class="prose prose-lg text-gray-500">
                <p>
                  Our second tool was the <a href="/c">Literature Connector</a>.
                  Intended for interdisciplinary scholars trying to bridge two
                  domains, it allows you to enter two papers and it will give
                  you an interactive visualization showing you how they are
                  connected by the literature. From there you can send the
                  papers you find into our Paper Discovery tool to find other
                  relevant literature which happened to not be the "shortest
                  path" between the two papers.
                </p>
                <p>
                  Inciteful is under active development and our hope is that,
                  over time, our tools will build upon each other giving you an
                  unrivaled experience for quickly discovering new literature.
                </p>
                <p>
                  Being built off the backs of free and open
                  <a href="/data">data</a>, we commit to paying it forward by
                  keeping our own tools free for everyone. To learn more, head
                  over to our <a href="/about">about page</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="py-6 lg:py-12  bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div class="max-w-xl mx-auto px-4 sm:px-6 lg:max-w-screen-xl lg:px-8">
        <div class="lg:grid lg:grid-cols-3 lg:gap-8">
          <div class="rounded-md bg-white p-6">
            <div
              class=" flex items-center float-left justify-center h-12 w-12 rounded-md mr-3 mb-1 bg-purple-500
                    text-white"
            >
              <GlobeAltIcon class="h-6 w-6" />
            </div>
            <div class="mt-3">
              <h5 class="text-lg leading-6 font-medium text-gray-900">
                Over 240,000,000 papers
              </h5>
              <p class="mt-5 text-base leading-6 text-gray-500">
                The Inciteful database has coverage over the majority of
                academic papers in peer reviewed journals as well as books.
                Hundreds of thousands more are added every month.
              </p>
            </div>
          </div>
          <div class="mt-10 lg:mt-0 rounded-md bg-white p-6">
            <div
              class=" flex items-center justify-center float-left mr-3 mb-1 h-12 w-12 rounded-md bg-purple-500
                        text-white"
            >
              <CubeTransparentIcon class="w-6 h-6" fill="none" />
            </div>
            <div class="mt-3">
              <h5 class="text-lg leading-6 font-medium text-gray-900">
                Almost 2 billion citations
              </h5>
              <p class="mt-5 text-base leading-6 text-gray-500">
                We collect citation information from a variety of
                <a
                  class="text-purple-600 underline focus:no-underline"
                  href="/data"
                  >data sources</a
                >
                to ensure as much coverage possible as citations are the
                cornerstone of our site.
              </p>
            </div>
          </div>
          <div class="mt-10 lg:mt-0 rounded-md bg-white p-6">
            <div
              class="flex items-center justify-center float-left mr-3 mb-1 h-12 w-12 rounded-md bg-purple-500 text-white"
            >
              <DocumentReportIcon class="w-6 h-6" />
            </div>
            <div class="mt-3">
              <h5 class="text-lg leading-6 font-medium text-gray-900">
                Built to be flexible
              </h5>
              <p class="mt-5 text-base leading-6 text-gray-500">
                Whether you want to use the pre-defined analyses or you are a
                power user wanting to explore the data with SQL, Inciteful gives
                you the tools you need.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white">
      <div class="max-w-screen-xl mx-auto px-4 py-6 lg:py-12 sm:px-6 lg:px-8">
        <BetaSignup />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// @ is an alias to /src
import BetaSignup from '@/components/BetaSignup.vue'
import GraphSearch from '@/components/GraphSearch.vue'
import ConnectorSearch from '@/components/ConnectorSearch.vue'
import navigation from '../navigation'
import { PaperID } from '@/types/incitefulTypes'
import {
  DocumentReportIcon,
  CubeTransparentIcon,
  GlobeAltIcon
} from '@heroicons/vue/outline'

export default defineComponent({
  name: 'Home',
  components: {
    BetaSignup,
    GraphSearch,
    ConnectorSearch,
    DocumentReportIcon,
    CubeTransparentIcon,
    GlobeAltIcon
  },
  methods: {
    addLitReviewPapers (ids: PaperID[]) {
      if (ids.length === 1) {
        this.$router.push({ path: navigation.getPaperUrl(ids[0]) })
      } else {
        this.$router.push({ name: 'LitReview', query: { ids } })
      }
    },
    goToSearch (query: string) {
      this.$router.push({ name: 'Search', query: { q: query } })
    }
  }
})
</script>

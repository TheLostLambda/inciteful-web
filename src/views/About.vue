<template>
  <single-column>
    <h1>About Inciteful</h1>
    <p class="py-2">
      The seed of the idea for Inciteful came about as a result of a frustrating
      experience after helping my wife (the academic of the family) with some
      research. I was interested in a topic that was tangentially related to
      what she was working on but she wasn't familiar with that specific
      literature. As a result I went down a rabbit hole of going to Google
      Scholar to look for papers, scanning papers for references, looking at who
      cited those papers, and then returning to Google Scholar to repeat the
      process. All while keeping the results of my search in a notepad, noting
      connections between different papers to better understand how they are all
      related. After an embarrassingly long time, I realized I was just drawing
      a network graph. Probably an experience that most academics can relate to.
    </p>
    <p class="py-2">
      My background is in Computer Science and am a developer by trade so my
      mind quickly jumped to how this whole process could be automated. I also
      have a bit of ADD so the interest in my original research question was
      quickly and easily overtaken by this new project.
    </p>
    <p class="py-2">
      After spending the first year of life as a hacked together python notebook
      using the apis from
      <a
        class="text-purple-700 cursor-pointer hover:text-purple-500"
        href="https://opencitations.net/"
        >Open Citations</a
      >
      and
      <a
        class="text-purple-700 cursor-pointer hover:text-purple-500"
        href="https://crossref.org"
        >Crossref</a
      >, I decided to try and scale it up to something that others could use.
    </p>
    <p class="py-2">
      The biggest problem was the real time creation of the graph. My original
      solution took over 15 minutes to build the graph for a paper with only a
      few citations and 40-50 references. It was clearly too slow. After a
      number of fits and starts, where I ended up learning a new programming
      language (<a
        class="text-purple-700 cursor-pointer hover:text-purple-500"
        href="https://www.rust-lang.org/"
        >Rust</a
      >), testing out a number of databases, changing the source of my data, and
      re-architecting the code a few times, I finally found a solution that I'm
      happy with and I hope you are too.
    </p>
    <p class="py-2">
      As this is built upon the back of data that I received for free, it feels
      like bad karma to charge for the service. That being said, it's pretty
      expensive to keep the site up and running ($500/month) as the backend
      servers need to be pretty powerful to give a good experience to the end
      users. In the future I might start accepting donations to cover the cost
      of running the site or if you know of an institution who might be
      interested in sponsoring the project, an introduction would be
      appreciated.
    </p>
    <p class="py-2">
      It's still under active development so if you have any questions,
      suggestions or just want to say hi, please feel free to send me your
      <a
        class="text-purple-700 cursor-pointer hover:text-purple-500"
        href="mailto:feedback@inciteful.xyz"
        >feedback</a
      >.
    </p>
  </single-column>
</template>
<script lang="ts">
import SingleColumn from '@/components/layout/SingleColumn.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'About',
  components: { SingleColumn }
})
</script>

SingleColumn

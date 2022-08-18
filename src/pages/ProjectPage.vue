<script lang="ts" setup>
import {onBeforeUnmount, onMounted, Ref, ref} from "vue";
import ProjectProvider from "../providers/ProjectProvider";
import ProjectModel from "../models/Project";
import {useRoute} from "vue-router";
import gsap from "gsap";
import arrowLeft from "../assets/arrow-left.svg?raw";
import tailwind from "../assets/tailwindcss.svg?raw";
import PortfolioExperience from "../experience/PortfolioExperience";

const route = useRoute()
let projectProvider = new ProjectProvider()
let project: Ref<null | ProjectModel> = ref(null)
let projectTitle: Ref|null = ref(null)
let projectTechnos: Ref|null = ref(null)
project.value = projectProvider.getProjectBySlug(<string>route.params.slug)

//Timeline GSAP Animation
let timeline: GSAPTimeline = gsap.timeline();

onMounted(() => {
  if(projectTitle && projectTechnos) {
    timeline.from(projectTitle.value, {delay: .3, x: 50, opacity: 0, duration: .8, ease: "power3.out"})
    timeline.from(projectTechnos.value, {y: -20, opacity: 0, duration: .3, ease: "power3.out"})
  }
  timeline.play()

  const options: object = {}
  //@ts-ignore
  options.camera = {
    orbitControls: import.meta.env.VITE_ENABLE_ORBIT_CONTROLS === '1'
  }

  experience = new PortfolioExperience(canvas.value, options, {clearColor: project.value?.backgroundColor})
})

//Experience
const canvas = ref(null)
const width = ref(window.innerWidth)
let experience: PortfolioExperience;

onBeforeUnmount(() => {
  experience.destroy()
})

</script>

<template>
  <div ref="projectSection" class="project py-3 md:py-12 min-h-screen text-slate-50">
    <canvas class="fixed top-0" style="z-index:-1;" ref="canvas"></canvas>

    <div class="container mx-auto z-10">
      <router-link class="mb-5 flex gap-x-2" :to="{name: 'home'}"><span v-html="arrowLeft"></span> Retour accueil</router-link>

      <h1 ref="projectTitle" class="project-title font-comfortaa text-7xl mt-4 mb-2">{{ project.title }}</h1>
      <ul class="project-technologies-list list-none flex flex-row flex-wrap gap-y-2 p-0 items-start mb-10">
        <li ref="projectTechnos" v-for="techno in project.detailedTechnologies"
            class="project-technologies-item	flex flex-row justify-center items-center text-gray-200 mr-2 px-2 py-1">
          {{ techno }}
        </li>
      </ul>

      <div>
        <div style="width:60px" v-html="tailwind"></div>
      </div>

      <p class="project-description mb-3">{{ project.projectBackground }}</p>
      <ul v-if="project.pictures.length > 0"
          class="project-show-pictures list-none block overflow-x-scroll whitespace-nowrap pb-3 md:pb-0 md:flex"
          data-controller="lightbox">
        <li v-for="(picture, key) in project.pictures" class="project-show-picture inline-block max-w-xs mr-4">
          <div data-controller="lazy-loader">
            <picture>
              <source v-for="pic in picture" :type="pic.type" :srcset="pic.srcset">
              <img :src="picture[0].srcset" class="rounded-lg max-h-36" loading="lazy"
                   height="144" :alt="'Projet ' + project.title" />
            </picture>
          </div>
        </li>
      </ul>

    </div>
  </div>
</template>

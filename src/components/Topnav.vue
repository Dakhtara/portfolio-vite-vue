<script lang="ts" setup>
import Blob from "./atom/Blob.vue";
import { useScrolling } from "../composable/scrolling";
import {onMounted, Ref, ref} from "vue";
import gsap from "gsap";
import KeyboardCommand from "./atom/KeyboardCommand.vue";
import store from "../stores";

const {searchMenuStore} = store.setup()
let {doScrolling} = useScrolling();
let mainTitle: Ref|null = ref(null)

let toggleSearchMenu = () => {
  searchMenuStore.toggle()
}

onMounted(() => {
if (mainTitle) {
  let animation = gsap.from(mainTitle.value, {
    duration: 1.5,
    opacity: 0,
    y: -20,
    scale: .8,
    ease: "power3.out"
  })
  animation.play();
}
})
</script>

<template>
  <section class="top-section bg-primary text-gray-50 pt-4 pb-9 min-h-screen">
    <div class="container mx-auto">
      <nav class="grid-cols-2 hidden md:grid">
        <a>
          <picture>
            <img class="nav-image" src="/images/logo-v2.png" width="100" alt="Logo"/>
          </picture>
        </a>
        <ul class="nav-menu list-none flex justify-end items-center">
          <li class="nav-menu-item ml-10">
            <a href="#"
               class="nav-item-link font-comfortaa text-gray-50 decoration-0 text-lg" @click="doScrolling('experience-section')">Expériences</a>
          </li>
          <li
              class="nav-menu-item text-gray-50 ml-10">
            <a href="#" class="nav-item-link font-comfortaa decoration-0 text-lg" @click="doScrolling('project-section')">Projets</a>
          </li>
        </ul>
      </nav>

      <div id="blob-header-item" class="max-w-2xl header-intro my-8 mx-auto z-10 relative text-center">
        <Blob />
        <h1 ref="mainTitle" class="font-comfortaa text-4xl mb-16 mt-0 relative z-10">Anthony Matignon</h1>
        <h2 class="text-3xl relative z-10 mb-7 font-medium">Développeur Web (Symfony/VueJS)</h2>
        <p class="text-xl relative z-10 font-medium hidden md:block">Après avoir travaillé dans
          divers domaines du web, je recherche maintenant de
          nouvelles expériences en tant qu'auto-entrepreneur.
          Que vous soyez une agence web, une entreprise ou une boutique, je peux vous aider dans votre développement
          d'application ou sites web.</p>
      </div>

      <div class="md:w-6/12 mx-auto border-secondary hover:border-white transition-colors group border-2 py-4 px-6 flex rounded-xl cursor-pointer justify-between" @click="toggleSearchMenu">
        <span>Rechercher un projet</span>
        <div class="flex items-center text-secondary transition-colors group-hover:text-white">
          <KeyboardCommand class="mr-1 " />K
        </div>
      </div>

    </div>
  </section>
</template>

<script lang="ts" setup>
import Project from "./Project.vue"
import ProjectProvider from "../providers/ProjectProvider"
import KeyboardCommand from "./atom/KeyboardCommand.vue";
import store from "../stores/index"

const {searchMenuStore} = store.setup()

let projects = new ProjectProvider().getAllProjects()

let toggleSearchMenu = () => {
  searchMenuStore.toggle()
}

</script>

<template>
  <section id="project-section" class="bg-primary projects text-slate-50">
    <div class="container mx-auto py-24">
      <h1 class="project-section-title text-center font-comfortaa text-white text-3xl font-bold mb-10">Projets</h1>

      <p class="mb-10">
        Que ce soit des projets en cours ou plus anciens, chacun à demander un travail spécifique sur certains points.
        <br><br>
        Vous pouvez utiliser la recherche ou alors tout simplement scroller la page pour voir les projets auxquelles j’ai participé ces dernières années
      </p>

      <div class="md:w-6/12 mx-auto border-secondary hover:border-white transition-colors group border-2 py-4 px-6 flex rounded-xl cursor-pointer justify-between" @click="toggleSearchMenu">
        <span>Rechercher un projet</span>
        <div class="flex items-center text-secondary transition-colors group-hover:text-white">
          <KeyboardCommand class="mr-1 " />K
        </div>
      </div>
    </div>

    <Project v-for="(project, index) in projects" :key="project.slug" :is-odd="(index + 1) % 2 === 0" :project="project" />
</section>
</template>

<script lang="ts" setup>
import Project from "./Project.vue"
import ProjectProvider from "../providers/ProjectProvider"
let projects = new ProjectProvider().getAllProjects()
</script>

<template>
  <section id="project-section" class="projects text-slate-50">
    <div class="container mx-auto">
      <h1 class="project-section-title font-comfortaa text-primary text-3xl font-bold mb-2">Projets</h1>
    </div>

    <Project v-for="(project, index) in projects" :key="project.slug" :is-odd="(index + 1) % 2 === 0" :project="project" />
</section>
</template>
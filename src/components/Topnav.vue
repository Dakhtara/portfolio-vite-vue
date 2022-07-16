<script lang="ts">
import Blob from "./atom/Blob.vue";
export default { components: { Blob } }
</script>

<template>
  <section class="top-section bg-primary text-gray-50 pt-4 pb-9">
    <div class="container mx-auto">
      <nav class="grid-cols-2 hidden md:grid">
        <a>
          <picture>
            <img class="nav-image" src="/images/logo-v2.png" width="100" alt="Logo"/>
          </picture>
        </a>
        <ul class="nav-menu list-none flex justify-end items-center">
          <li data-controller="anchor" data-anchor-target-value="experience-section" class="nav-menu-item ml-10">
            <a data-action="anchor#visit" href="#"
               class="nav-item-link font-comfortaa text-gray-50 decoration-0 text-lg">Expériences</a>
          </li>
          <li data-controller="anchor" data-anchor-target-value="project-section"
              class="nav-menu-item text-gray-50 ml-10">
            <a data-action="anchor#visit" href="#" class="nav-item-link font-comfortaa decoration-0 text-lg">Projets</a>
          </li>
        </ul>
      </nav>

      <div id="blob-header-item" class="max-w-2xl header-intro my-8 mx-auto z-10 relative text-center">
        <Blob />
        <h1 class="font-comfortaa text-4xl mb-16 mt-0 relative z-10">Anthony Matignon</h1>
        <h2 class="text-3xl relative z-10 mb-7 font-medium">Développeur Web (Symfony/VueJS)</h2>
        <p class="text-xl relative z-10 font-medium hidden md:block">Après avoir travaillé dans
          divers domaines du web, je recherche maintenant de
          nouvelles expériences en tant qu'auto-entrepreneur.
          Que vous soyez une agence web, une entreprise ou une boutique, je peux vous aider dans votre développement
          d'application ou sites web.</p>
      </div>
    </div>
  </section>
</template>
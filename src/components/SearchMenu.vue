<script lang="ts" setup>
import {ProjectModel} from "../models/Project";
import {useScrolling} from "../composable/scrolling";
import store from "../stores";
import crossSvg from "../assets/cross.svg?raw";
import {useSearchMenu} from "../composable/searchMenu";
import {useRouter} from "vue-router";

interface ProjectSearch extends ProjectModel {
  shown?: boolean
}

//Composable
const router = useRouter();
let {doScrolling} = useScrolling();
let {
  hide,
  onItemClick,
  searchInput,
  onArrowDown,
  onArrowUp,
  state,
  search
} = useSearchMenu((project: ProjectSearch) => {
  router.push({
    name: "project",
    params: {
      slug: project.slug
    }
  })
});

let goToHome = () => {
  router.push({name: "home"})
  hide()
}

//Store
const {searchMenuStore} = store.setup()
</script>

<template>
  <div id="search-menu-container" :class="[searchMenuStore.isOpen ? 'block' : 'hidden']">
    <div ref="backdrop"
         class="search-menu-backdrop fixed top-0 left-0 h-full w-full bg-slate-800/50 backdrop-blur-sm z-20"
         @click.self="hide">
      <div class="absolute md:left-10vw w-full top-10 md:w-80vw rounded border border-slate-400/20 bg-white shadow">
        <div class="flex items-center justify-between py-2 px-4">
          <img src="/images/search.svg" alt="Search glass"/>
          <input ref="searchInput" class="search-menu-input mx-2 w-auto flex-1 py-3 outline-0" type="search"
                 placeholder="Search for something" @keyup="search" @keydown.prevent.arrow-up="onArrowUp"
                 @keydown.prevent.arrow-down="onArrowDown" @keyup.enter="onItemClick(state.currentFocus)"/>
          <div class="rounded border border-slate-400/50 hidden md:block bg-white p-1 text-xs uppercase text-slate-500">
            Esc
          </div>
          <div @click="hide" class="md:hidden text-slate-500" v-html="crossSvg">

          </div>
        </div>

        <div class="border-t border-slate-400/30">
          <div class=" group search-menu-item flex cursor-pointer justify-between border-t border-slate-400/20
                        py-4 px-4 hover:bg-slate-200 hover:text-slate-800"
            @click="goToHome"
          >
            <span>Homepage</span>
          </div>
          <div class="py-4 px-4 text-lg">Projects</div>
          <div v-for="project in state.projects"
               @click="onItemClick(project)"
               v-show="project.shown"
               :class="[project.slug === state.currentFocus?.slug ? 'bg-slate-200' : '']"
               class="group search-menu-item flex cursor-pointer justify-between border-t border-slate-400/20
                        py-4 px-4 hover:bg-slate-200 hover:text-slate-800">
                        <span>
                            {{ project.title }}
                        </span>

            <div>
                            <span v-for="techno in project.detailedTechnologies"
                                  :class="[project.slug === state.currentFocus?.slug ? 'border-slate-500' : 'border-slate-200']"
                                  class="techno border rounded px-1 py-1 ml-1 text-xs text-slate-500
                                group-hover:border-slate-500">
                                {{ techno }}
                            </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ProjectProvider from "../providers/ProjectProvider"
import { onMounted, reactive, ref, Ref } from 'vue';
import {ProjectModel} from "../models/Project";
import lunr from "lunr";
import { useScrolling } from "../composable/scrolling";
import store from "../stores";

interface ProjectSearch extends ProjectModel {
    shown?: boolean
}

const {searchMenuStore} = store.setup()

let projects: Array<ProjectSearch> = new ProjectProvider().getAllProjects()
projects.forEach((project: ProjectSearch) => {
    project.shown = true;
})

let { doScrolling } = useScrolling();

const state = <{projects: Array<ProjectSearch>, currentFocus: null | ProjectSearch }>reactive({
    projects,
    currentFocus: null,
})
let searchInput: Ref = ref(null)
let backdrop: Ref = ref(null)
let index: lunr.Index;

onMounted(() => {
    document.addEventListener("keydown", (event) => {
        if (event.key === "k" && event.metaKey) {
            searchMenuStore.toggle()
            if (searchMenuStore.isOpen === true && searchInput.value !== null) {
                // Set timeout to set focus when it is shown
                setTimeout(() => {
                    searchInput.value.focus()
                }, 0)
            }
        }

        if (event.key === "Escape") {
            hide()
        }
    })

    let documents: Array<any> = []
    projects.forEach((project: ProjectSearch) => {
        let title = project.title
        let slug = project.slug
        let technologies = project.detailedTechnologies
        documents.push({ title, slug, technologies })


        index = lunr(function () {
            this.ref('slug')
            this.field('title')
            this.field('technologies')
            documents.forEach((doc, i) => {
                this.add(doc)
            })
        })
    })
})

let hide = () => {
  searchMenuStore.hide()
}

let onItemClick = (project: ProjectSearch) => {
    hide()
    doScrolling(`project-${project.slug}`, 600)
}

let search = () => {
    let results = index.search(searchInput.value.value + "*")
    if (results.length > 0) {
        let flatResults = results.map((result) => result.ref)
        state.projects.forEach((item: ProjectSearch) => {
            item.shown = false
            if (flatResults.includes(item.slug)) {
                item.shown = true
            }
        })
    }
}

let onArrowUp = (): void => {
    let visibleItems = getVisibleItems()

    if (state.currentFocus === null) {
        state.currentFocus = visibleItems[visibleItems.length - 1]
        return
    }

    if (visibleItems.includes(state.currentFocus)) {
        let index = visibleItems.indexOf(state.currentFocus)
        if (index > 0) {
            state.currentFocus = visibleItems[index - 1]
        } else {
            state.currentFocus = visibleItems[visibleItems.length - 1]
        }
    } else {
        state.currentFocus = visibleItems[visibleItems.length - 1]
        return

    }
}

let onArrowDown = (): void => {
    let visibleItems = getVisibleItems()

    if (state.currentFocus === null) {
        state.currentFocus = visibleItems[0]
        return
    }

    if (visibleItems.includes(state.currentFocus)) {
        let index = visibleItems.indexOf(state.currentFocus)
        if (index < visibleItems.length - 1) {
            state.currentFocus = visibleItems[index + 1]
        } else {
            state.currentFocus = visibleItems[0]
        }
    } else {
        state.currentFocus = visibleItems[0]
        return
    }
}

let onInputEnter = (): void => {
    if (state.currentFocus !== null) {
        onItemClick(state.currentFocus)
    }
}

let getVisibleItems = (): Array<ProjectSearch> => {
    return state.projects.filter((item: ProjectSearch) => {
        return item.shown
    })
}
</script>

<template>
    <div id="search-menu-container" :class="[searchMenuStore.isOpen ? 'block' : 'hidden']">
        <div ref="backdrop"
            class="search-menu-backdrop fixed top-0 left-0 h-full w-full bg-slate-800/50 backdrop-blur-sm z-20"
            @click.self="hide">
            <div class="absolute left-10vw top-10 w-80vw rounded border border-slate-400/20 bg-white shadow">
                <div class="flex items-center justify-between py-2 px-4">
                    <img src="/images/search.svg" alt="Search glass" />
                    <input ref="searchInput" class="search-menu-input mx-2 w-auto flex-1 py-3 outline-0" type="search"
                        placeholder="Search for something" @keyup="search" @keydown.prevent.arrow-up="onArrowUp" @keydown.prevent.arrow-down="onArrowDown" @keyup.enter="onInputEnter" />
                    <div class="rounded border border-slate-400/50 bg-white p-1 text-xs uppercase text-slate-500">Esc
                    </div>
                </div>

                <div class="border-t border-slate-400/30">
                    <div class="py-4 px-4 text-lg">Projects</div>
                    <div v-for="project in state.projects"
                    @click="onItemClick(project)"
                    @keyup.enter="onItemClick(project)"
                    v-show="project.shown"
                        :class="[project.slug === state.currentFocus?.slug ? 'bg-slate-200' : '']"
                        class="group search-menu-item flex cursor-pointer justify-between border-t border-slate-400/20
                        py-4 px-4 hover:bg-slate-200 hover:text-slate-800">
                        <span>
                            {{ project.title }}
                        </span>

                        <div>
                            <span v-for="techno in project.detailedTechnologies"
                                :class="[project.slug === state.currentFocus?.slug ? 'border-slate-500' : 'border-slate-200']" class="techno border rounded px-1 py-1 ml-1 text-xs text-slate-500
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

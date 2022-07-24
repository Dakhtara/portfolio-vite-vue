import store from "../stores";
import {onMounted, reactive, ref, Ref, watch} from "vue";
import lunr from "lunr";
import ProjectProvider from "../providers/ProjectProvider";
import {ProjectModel} from "../models/Project";

interface ProjectSearch extends ProjectModel {
    shown?: boolean
}

interface ItemClickCallback {
    (project: ProjectSearch): void
}

export function useSearchMenu(itemClickCallback: ItemClickCallback) {
    const {searchMenuStore} = store.setup()
    let searchInput: Ref = ref(null)
    let backdrop: Ref = ref(null)
    let index: lunr.Index;

    //Load Project
    let projects: Array<ProjectSearch> = new ProjectProvider().getAllProjects()
    projects.forEach((project: ProjectSearch) => {
        project.shown = true;
    })

    //Watchers
    watch(() => searchMenuStore.isOpen,  (isOpen: boolean) => {
        if (isOpen) {
            // Set timeout to set focus when it is shown
            setTimeout(() => {
                searchInput.value.focus()
            }, 0)
        }
    })


    //Events
    onMounted(() => {
        document.addEventListener("keydown", (event) => {
            if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
                searchMenuStore.toggle()
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

    //State
    const state = <{projects: Array<ProjectSearch>, currentFocus: null | ProjectSearch }>reactive({
        projects,
        currentFocus: null,
    })

    //Functions
    function onItemClick(project: ProjectSearch|null): void {
        if (!project) {
            return;
        }
        hide()
        if (itemClickCallback) {
            itemClickCallback(project)
        }
    }

    function search(): void {
        let results = index.search(searchInput.value.value + "*")
        if (results.length > 0) {
            let flatResults = results.map((result) => result.ref)
            state.projects.forEach((item: ProjectSearch) => {
                item.shown = false
                if (flatResults.includes(item.slug)) {
                    item.shown = true
                }
            })

            console.log(state.projects)
        }
    }

    function onArrowUp(): void {
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

    function onArrowDown(): void {
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

    function onInputEnter(): void {
        if (state.currentFocus !== null) {
            onItemClick(state.currentFocus)
        }
    }

    function getVisibleItems(): Array<ProjectSearch> {
        return state.projects.filter((item: ProjectSearch) => {
            return item.shown
        })
    }


    function hide() {
        searchMenuStore.hide();
    }

    return {
        hide,
        searchInput,
        backdrop,
        itemClickCallback,
        onItemClick,
        onArrowUp,
        onArrowDown,
        state,
        search
    }
}

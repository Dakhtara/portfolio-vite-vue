import * as VueRouter from 'vue-router';
import HomePage from "./pages/HomePage.vue";
import ProjectPage from "./pages/ProjectPage.vue";

const routes = [
    {path: '/', name: "home", component: HomePage},
    {path: '/projects/:slug', name: "project", component: ProjectPage},
]

export const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
})

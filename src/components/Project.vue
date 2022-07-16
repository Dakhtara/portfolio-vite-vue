<script lang="ts" setup>
import Project from "../models/Project"
import TiltImage from "./TiltImage.vue";

let props = defineProps({
    project: {
        type: Project,
        required: true
    },
    isOdd: {
        type: Boolean,
        required: true,
        default: false
    }
})
let mainPicture = props.project.pictures[0]
</script>

<template>
    <div :id="'project-' + project.slug" class="project py-3 md:py-24 overflow-x-hidden"
        :style="'background-color:' + project.backgroundColor">
        <div class="container mx-auto">
            <div class="project-details grid grid-cols-[100%] md:grid-cols-30-60 gap-x-36"
                :class="[isOdd === true ? 'image-right' : 'image-left']">
                <div class="project-main-image  none md:block">
                    <TiltImage :is-left="!isOdd">
                        <picture>
                            <source v-for="pic in mainPicture" :type="pic.type" :srcset="pic.srcset">
                            <img class="main-image rounded-xl drop-shadow-project-image drop-shadow-slate-500"
                                src="{{ asset(picture) }}" loading="lazy" :alt="'Projet ' + project.title" />
                        </picture>
                    </TiltImage>
                </div>
                <div class="project-main-details">
                    <h2 class="project-title font-comfortaa text-2xl mb-2">{{ project.title }}</h2>
                    <p class="project-description mb-3">{{ project.projectBackground }}</p>
                    <ul class="project-technologies-list list-none flex flex-row p-0 items-start mb-3">
                        <li v-for="techno in project.detailedTechnologies"
                            class="project-technologies-item rounded-lg	flex flex-row justify-center items-center text-black bg-slate-100 mr-2 px-2 py-1">
                            {{ techno }}
                        </li>
                    </ul>
                    <ul v-if="project.pictures.length > 0"
                        class="project-show-pictures list-none block overflow-x-scroll whitespace-nowrap pb-3 md:pb-0 md:flex"
                        data-controller="lightbox">
                        <li v-for="picture in project.pictures" class="project-show-picture inline-block max-w-xs mr-4"
                            data-download-url="false" data-src="{{ asset(picture[0].srcset) }}">
                            <div data-controller="lazy-loader">
                                <picture>
                                    <source v-for="pic in picture" :type="pic.type" :srcset="pic.srcset">
                                    <img src="{{ asset(picture) }}" class="rounded-lg max-h-36" loading="lazy"
                                        height="144" :alt="'Projet ' + project.title" />
                                </picture>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="css">
.project-details {
    grid-template-areas: "b";
}

.project-details.image-right {
    grid-template-areas: "b";
}

.project-main-image {
    grid-area: a;
}

.project-main-details {
    grid-area: b;
}

.main-image {
    transform: rotate(2deg) translateX(-30px) translateY(20px);
}

.project-details.image-right .main-image {
    transform: rotate(-2deg) translateX(-40px) translateY(20px);
    transform-origin: left;
}

@media screen(md) {
    .project-details {
        grid-template-areas: "a b";
    }

    .project-details.image-right {
    grid-template-columns: 60% 30%;
        grid-template-areas: "b a";
    }
}
</style>
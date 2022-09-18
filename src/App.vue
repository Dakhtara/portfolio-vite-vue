<script setup lang="ts">
import Topnav from "./components/Topnav.vue";
import ExperienceSection from "./components/ExperienceSection.vue";
import ProjectsSection from "./components/ProjectsSection.vue";
import SearchMenu from "./components/SearchMenu.vue";
import {onMounted, ref} from "vue";
import gsap from "gsap";
import {fromEvent, throttleTime} from "rxjs";

let totalSection = ref(null)
let isAnimating = false;
let sections = 10;
let currentSection = 0;
onMounted(() => {
  fromEvent(document, "wheel")
      .pipe(throttleTime(700))
      //@ts-ignore
      .subscribe((event: WheelEvent) => {
        if (isAnimating) {
          return;
        }

        //@ts-ignore
        if (event.deltaY > 0 && currentSection < sections) {
          currentSection++;
          //@ts-ignore
        } else if (event.deltaY < 0 && currentSection > 0) {
          currentSection--;
        } else {
          return;
        }

        gsap.to(totalSection.value, {
          y: `-${currentSection}00vh`, duration: .8, onStart: () => {
            isAnimating = true;
          }, onComplete: () => {
            setTimeout(() => {
              isAnimating = false;
            }, 300)
          }
        })
      })
})
</script>

<template>

  <div class="relative">
    <router-view v-slot="{Component, route}">
      <Transition name="slide-right">
        <component :is="Component" :key="route.path"/>
      </Transition>
    </router-view>
  </div>
  <SearchMenu/>
</template>

<style scoped>
.slide-right-leave-active {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: 100;
  transition: all .8s ease-in-out;
}

.slide-right-enter-active {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: 2;
  transition: all 1.8s ease-in-out .6s;
}

.slide-right-leave-to {
  transform: translateX(100vw);
}
</style>

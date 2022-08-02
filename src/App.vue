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
      .subscribe((event: WheelEvent) => {
        if (isAnimating) {
          return;
        }

        if (event.deltaY > 0 && currentSection < sections) {
          currentSection++;
        } else if (event.deltaY < 0 && currentSection > 0) {
          currentSection--;
        } else {
          return;
        }

        gsap.to(totalSection.value, {y: `-${currentSection}00vh`, duration: .8, onStart: () => {
            isAnimating = true;
          }, onComplete: () => {
            setTimeout(() => {
              isAnimating = false;
            }, 300)
          }})
      })
})
</script>

<template>
  <div class="slider h-screen overflow-y-hidden">
    <div ref="totalSection">

      <div class="slider-item">
        <Topnav/>
      </div>
      <div class="slider-item">
        <ExperienceSection/>
      </div>
      <div class="slider-item">
        <ProjectsSection/>
      </div>
    </div>

  </div>
  <SearchMenu/>
</template>

<style scoped>
</style>

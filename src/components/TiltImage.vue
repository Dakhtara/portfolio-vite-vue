<script lang="ts" setup>
import { onMounted, Ref, ref, VNodeRef } from 'vue';

let container: Ref<VNodeRef|null>= ref(null);

const bodyIntersectionObserver = {
    root: null,
    rootMargin: '0px',
    threshold: getThreshold()
}

let props = defineProps({
    isLeft: {
        type: Boolean,
        required: true,
        default: false
    }
})

onMounted(() => {
    let observerLeft = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            const maxDeg = 4;
            const maxTranslateY = 20;
            const minTranslateX = -100;
            const maxTranslateX = -30;
            const thresTranslateX = maxTranslateX - minTranslateX;
            const valueTranslateX = entry.intersectionRatio * thresTranslateX;
            const deg = entry.intersectionRatio * maxDeg;
            const translateY = entry.intersectionRatio * maxTranslateY;
            const translateX = minTranslateX + valueTranslateX;
            // let image = entry.target.querySelector('.project-main-image img');
            let image = container.value.querySelector('img');
            image.style.transform = `rotate(${deg}deg) translateX(${translateX}px) translateY(${translateY}px)`;
        })
    }, bodyIntersectionObserver);

    if (props.isLeft && container.value !== null) {
        observerLeft.observe(container.value);
    }


    let observerRight = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            const maxDeg = -2;
            const maxTranslateY = 20;
            const minTranslateX = 20;
            const maxTranslateX = -50;
            const thresTranslateX = maxTranslateX - minTranslateX;
            const valueTranslateX = entry.intersectionRatio * thresTranslateX;
            const deg = entry.intersectionRatio * maxDeg;
            const translateY = entry.intersectionRatio * maxTranslateY;
            const translateX = minTranslateX + valueTranslateX;
            let image = container.value.querySelector('img');
            image.style.transform = `rotate(${deg}deg) translateX(${translateX}px) translateY(${translateY}px)`;
        })
    }, bodyIntersectionObserver);

    if (!props.isLeft && container.value !== null) {
        observerRight.observe(container.value);
    }
})

function getThreshold() {
    let array = [];
    for (let $i = 0; $i < 1; $i = $i + 0.01) {
        array.push($i);
    }
    console.log(array);
    return array;
}
</script>

<template>
    <div ref="container">
        <slot></slot>
    </div>
</template>
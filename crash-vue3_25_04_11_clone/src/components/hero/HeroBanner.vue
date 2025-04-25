<script setup="ts">
import { defineProps } from "vue";
defineProps({
    title: {
        type: String,
        default: "Become a Vue Dev"
    },
    subtitle: {
        type: String,
        default: "Find the Vue job that fits your skills and needs",
    }
});

</script>
<template>
<section
    :class="$style.hero"
>
    <article
        :class="$style.heroInner"
    >
        <h1>
            {{ title }}
        </h1>
        <p>
            {{ subtitle }}
        </p>
    </article>
</section>
</template>
<style module>
.hero {
    background-color: rgb(21, 128, 61, 1);
    margin-bottom: 1rem;
    padding:5rem 0;
}

.hero-inner {
    max-width: 80rem;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
}
</style>
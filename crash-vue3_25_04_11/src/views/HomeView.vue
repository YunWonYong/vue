<script setup>
import Hero from "@/components/Hero.vue";
import HomeCards from "@/components/HomeCards.vue";
import Joblistings from "@/components/JobListings.vue";
</script>
<template>
    <Hero
        title="Test Title"
    />
    <HomeCards />
    <Joblistings 
        :limit="3"
        :showButton="true"
    />
</template>
<script setup>
    import Navbar from "@/components/Navbar.vue";
    import Hero from "@/components/Hero.vue";
    import HomeCards from "@/components/HomeCards.vue";
    import Joblistings from "@/components/JobListings.vue";
</script>
<template>
    <Navbar />
    <Hero
        title="Test Title"
    />
    <HomeCards />
    <Joblistings 
        :limit="3"
        :showButton="true"
    />
</template>
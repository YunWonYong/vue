<template>
<nav>
    <div
        ref="logoDiv"
        :class="$style.logo"
    >
        <img 
            :src="logo"
            alt="vue jobs"
        />
        <span>
            Vue Jobs
        </span>
    </div>
    <ul>
        <li>

        </li>
        <li>
            
        </li>
        <li>

        </li>
    </ul>
</nav>
</template>
<script setup="ts">
import { ref, onMounted, useCssModule } from "vue";
import logo from "@/assets/images/logo.png"

const logoDiv = ref(null);
onMounted(() => {
    console.log(logoDiv);
});
</script>
<style module>
.logo {
    display: flex;
    align-items: center;
}
</style>
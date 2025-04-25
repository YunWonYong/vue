<script setup="ts">
import logo from "@/assets/images/logo.png";
</script>
<template>
<nav 
    :class="$style.nav"
>
    <div
        :class="$style.navInner"
    >
        <div
            :class="$style.logoBox"
        >
            <img 
                :class="$style.logoImage"
                :src="logo"
                alt="vue jobs"
            />
            <span
                :class="$style.logoTxt"
            >
                Vue Jobs
            </span>
        </div>
        <ul
            :class="$style.mainMenus"
        >
            <li 
                :class="$style.mainMenu"
            >
                <a 
                    :class="$style.cta" 
                    href="#"
                >
                    Home
                </a>
            </li>
            <li 
                :class="$style.mainMenu"
            >
                <a
                    href="#"
                >
                    Jobs
                </a>
            </li>
            <li 
                :class="$style.mainMenu"
            >
                <a
                    href="#"
                >
                    Add Job
                </a>
            </li>
        </ul>
    </div>
</nav>
</template>
<style module>
.nav {
    background-color: rgb(21, 128, 61, 1);
    box-sizing: border-box;
    border-bottom: 1px solid rgb(34, 197, 94);
}

.navInner {
    max-width: 80rem;
    padding: 0 2rem;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 5rem;
}

.logoBox {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding-left: 1.5rem;
}

.logoImage {
    height: 2.5rem;
    width: auto;
    vertical-align: middle;
}

.logoTxt {
    padding-left: 7px;
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: 700;
    color: white;
}

.mainMenus {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0;
    list-style: none;
}

.mainMenu {
    box-sizing: border-box;
    padding: 0.3rem;
}

.mainMenu > a {
    box-sizing: border-box;
    border-radius: 12%;
    padding: 0.5rem 0.8rem;
    font-size: 0.9rem;
    color: white;
    text-decoration: none;
}

.mainMenu > a:hover, 
.mainMenu > a:active {
    color: white;
}

.mainMenu > a:hover {
    background-color: black;
}

.mainMenu > a.cta,
.mainMenu > a.cta:hover {
    background-color: rgb(19, 58, 46);
} 

</style>
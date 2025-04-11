<script setup>
import { ref, onMounted } from "vue";

const name = ref("John Doe");
const status = ref("active");
const tasks = ref(["Task One", "Task Two", "Task Three"]);
const newTask = ref("");
const toggleStatus = () => {
    if (status.value === "active") {
        status.value = "pending";
    } else if (status.value === "pending") {
        status.value = "inactive";
    } else {
        status.value = "active";
    }
};

const addTask = () => {
    if (newTask.value.trim() !== "") {
        tasks.value.push(newTask.value);
        newTask.value = "";
    }
};

const deleteTake = (index) => {
    tasks.value.splice(index, 1);
};

onMounted(async () => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos");
        const data = await response.json();
        tasks.value = data.map((task) => task.title);
    } catch(e) {
        console.log("Error fetching tasks.");
    }
});
</script>
<template>
    <form @submit.prevent="addTask">
        <label for="newTask">
            Add Task
        </label>
        <input type="text" id="newTask" name="newTask" v-model="newTask"/>
        <button type="submit">
            Submit
        </button>
    </form>
    <ul>
        <li v-for="(task, index) in tasks" :key="task">
            <span>
                {{ task }}
            </span>
            <button @click="deleteTake(index)">x</button>
        </li>
    </ul>
</template>
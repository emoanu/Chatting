<template>
    <div>
        <h3>ABout page {{name}}</h3>
        <input type="text" v-model="name">




        <router-link v-bind:to="{
            name: 'Home',
        }">
        Back 
        </router-link> to Home page
    </div>
</template>
<script>
export default {
    name : "About",
    data() {
       return {
           name : "Emo"
       }
    }
}
</script>
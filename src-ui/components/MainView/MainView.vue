<template>
    <div class="MainView">
        <slot/>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped scss lang="scss">
.MainView{
    flex-grow: 1;
    height: calc(100dvh - 50px);
    padding: 20px;
}


</style>
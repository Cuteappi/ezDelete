
<script lang="ts" setup>
    //import Bar from "../components/MainTitleBar/Bar.vue"
</script>

<template>
    <TitleBar/>
    <div class="Main">
        <SideBar/>
        
        <MainView>
            <slot/>
        </MainView>
    </div>
</template>

<style scoped lang="scss">
.Main {
    display:flex
}

</style>

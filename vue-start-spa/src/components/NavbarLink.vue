<template>
    <li>
        <router-link 
        :to="`/${index}`"
        :title="`This link goes to the ${page.link.text} page`" 
        active-class="active"
        aria-current="page" 
        class="nav-link"
        >{{ page.link.text }}</router-link>
    </li>
</template>

<script>
    export default {
        props: ['page', 'index']
    }
</script>
<style scoped>
.emphasize{
    text-decoration: underline !important;
}
</style>
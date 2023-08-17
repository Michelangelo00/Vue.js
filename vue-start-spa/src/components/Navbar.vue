<!--
    template => dove viene costruito tutto l'html con la sintassi di vue, al suo interno possono essere aggiunti anche
    componenti esterni, in questo caso navbar-link è un altro componente presente in NavbarLink.vue

    script => dove viene costruita tutta la logica del componente

    style => dove viene inserito tutto lo style del componente (solo se viene aggiunto scoped), altrimenti
    se esiste una classe con lo stesso nome in altri componenti viene sovrascritta anche negli altri
-->

<template>
            <nav 
            :class="[`navbar-${theme}`, `bg-${theme}`, 'navbar', 'navbar-expand-lg']"
            >
                <div class="container-fluid">
                    <a href="#" class="navbar-brand">My Vue</a>
                    <ul class="navbar-nav me auto mb-2 mb-lg-0">
                        <navbar-link
                            v-for="(page, index) in publishedPages" class="nav-item" :key="index"
                            :page="page"
                            :isActive="activePage == index"
                            @actived="$emit('actived')"
                            :index="index"
                        >
                        </navbar-link>
                        <li>
                            <router-link 
                                to="/create"
                                aria-current="page" 
                                class="nav-link"
                            >Create Page</router-link>
                        </li>
                    </ul>
                    <form action="" class="d-flex">
                        <button
                            type="button"
                            class="btn btn-primary"
                            @click.prevent="changeTheme()"
                        >
                        Change
                        </button>
                    </form>
                </div>
            </nav>
</template>

<script>
import NavbarLink from './NavbarLink.vue';
    export default {
        components:{
            NavbarLink
        },
        created(){
            this.getThemeSetting();
        },
        computed: {
            publishedPages(){
                return this.pages.filter(p => p.published);
            }
        },
        props: ['pages', 'activePage'],
        data(){
            return {
                theme: 'light',
            }
        },
        methods: {
            changeTheme(){
                let theme = 'light';

                if(this.theme == 'light'){
                    theme = 'dark';
                }

                this.theme = theme;
                this.storeThemeSetting();
            },
            storeThemeSetting(){
                localStorage.setItem('theme', this.theme);
            },
            getThemeSetting(){
                let theme = localStorage.getItem('theme');

                if(theme){
                    this.theme = theme;
                }
            },
        }
    }

</script>
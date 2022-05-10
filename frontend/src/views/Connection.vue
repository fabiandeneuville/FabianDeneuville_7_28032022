<template>
    <div>
        <img class="connexion__page__logo" src="../assets/icon-left-font-monochrome-black.png" alt="Logo de Groupomania">
        <login> </login>
        <footerBottom></footerBottom>
    </div>
</template>



<script>

    import Login from '../components/Login'
    import Footer from '../components/Footer.vue'

    export default {
        name: 'connection',
        components: {
            'login' : Login,
            'footerBottom' : Footer
        }
    }

</script>


<style>

    .connexion__page__logo {
        width:60%;
        max-width: 600px;
    }

</style>
<template>
    <div>
        <img class="landing__page__logo" src="../assets/icon-left-font-monochrome-black.png" alt="Logo de Groupomania">
        <signup> </signup>
        <footerBottom> </footerBottom>
    </div>
</template>



<script>

    import Signup from '../components/Signup'
    import Footer from '../components/Footer'

    export default {
        name: 'landing',
        components: {
            'signup' : Signup,
            'footerBottom' : Footer
        }
    }

</script>


<style>

    .landing__page__logo {
        width:60%;
        max-width: 600px;
    }

</style>
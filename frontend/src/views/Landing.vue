<template>
    <div>
        <img class="landing__page__logo" src="../assets/icon-left-font-monochrome-black.png" alt="Logo de Groupomania">
        <signup> </signup>
    </div>
</template>



<script>

    import Signup from '../components/Signup'

    export default {
        name: 'landing',
        components: {
            'signup' : Signup
        }
    }

</script>


<style>

    .landing__page__logo {
        width:60%;
        max-width: 600px;
    }

</style>
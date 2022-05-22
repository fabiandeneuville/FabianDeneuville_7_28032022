<template>
    <div>
        <headerTop></headerTop>
        <div class="error__bloc">
            <h2 class="error__bloc__heading error__bloc__item">404</h2>
            <p class="error__bloc__text error__bloc__item">La page demandée n'existe pas !</p>
            <router-link class="error__bloc__link error__bloc__item" to='./fil'>Retourner à l'accueil</router-link>
        </div>
        <footerBottom></footerBottom>
    </div>
</template>

<script>

import Header from '../components/Header'
import Footer from '../components/Footer'

export default {
    name:'Page404',
    components: {
        'headerTop': Header,
        'footerBottom': Footer
    }
}
</script>

<style scoped>

    .error__bloc {
        margin:200px auto 0 auto;
        padding: 25px;
        width:95%;
        max-width: 600px;
        border-radius:5px;
        background: white;
        box-shadow: 2px 5px 10px 0px #333;
    }

    .error__bloc__item {
        padding:10px;
    }

    .error__bloc__heading {
        font-size: 48px;
        color:rgb(233, 68, 37);
    }


</style>
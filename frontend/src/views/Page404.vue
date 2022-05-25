<template>
    <div>
        <headerTop></headerTop>
        <div class="error__bloc">
            <h2 class="error__bloc__heading error__bloc__item">404</h2>
            <p class="error__bloc__text error__bloc__item">La page demandée n'existe pas !</p>
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
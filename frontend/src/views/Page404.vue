<template>
    <div>
        <headerTop></headerTop>
        <div class="error__bloc">
            <h2 class="error__bloc__heading error__bloc__item">404</h2>
            <img src="../assets/404.png" alt="Introuvable !">
            <p class="error__bloc__text error__bloc__item">En dépit d'une fouille méticuleuse nous n'avons pas trouvé la page que vous recherchez !</p>
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
    },
}

</script>
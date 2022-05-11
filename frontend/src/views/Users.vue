<template>
    <div>
        <headerTop></headerTop>
        <footerBottom></footerBottom>
    </div>
</template>


<script>

import Header from '../components/Header'
import Footer from '../components/Footer'

export default {
    name: 'Users',
    components: {
        'headerTop': Header,
        'footerBottom': Footer
    }
}

</script>

<style scoped>


</style>
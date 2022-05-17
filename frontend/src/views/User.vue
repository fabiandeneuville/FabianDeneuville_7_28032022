<template>
    <div>
        <headerTop></headerTop>



        <footerBottom></footerBottom>
    </div>
</template>


<script>

import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

export default {
    name:'User',
    data(){
        return {
            userId: this.$route.params.id
        }
    },
    components: {
        'headerTop': Header,
        'footerBottom': Footer
    },
    mounted(){
        console.log(this.userId)
    }
}
</script>

<style>



</style>

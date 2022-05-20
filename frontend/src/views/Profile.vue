/********** PROFILE **********/

<template>
    <div>
        <headerTop> </headerTop>
        <profileDetails
        v-bind:userId="userId"
        v-bind:token="token"
        >
        </profileDetails>
        <footerBottom></footerBottom>
    </div>
</template>

<script>

import Header from '../components/Header'
import Footer from '../components/Footer'
import ProfileDetails from '../components/ProfileDetails.vue'

export default {
    name: 'Profile',
    data(){
        return {
            userId:'',
            token:''
        }
    },
    components: {
        'headerTop': Header,
        'footerBottom': Footer,
        'profileDetails': ProfileDetails
    },
    created(){
        const user = JSON.parse(localStorage.getItem('user'));
        this.userId = user.userId;
        this.token = user.token;
    }
}
</script>

<style scoped>



</style>
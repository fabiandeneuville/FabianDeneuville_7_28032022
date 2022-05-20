/********** USER **********/

<template>
    <div>
        <headerTop></headerTop>
        <div class="user__container">
            <h3 class="user__heading">Profile de {{ username }}</h3>
            <div class="user__img__container">
                <img v-bind:src="this.imageUrl" v-bind:alt="`Photo de ${this.username}`">
            </div>
            <p class="user__bio">{{ bio }}</p>
            <a v-if="this.loggedUserId != this.userId" class="user__contact" v-bind:href="`mailto:${this.email}`">
                <i class="fa-solid fa-envelope"></i>
            </a>
        </div>
        <userPostFeed
        v-bind:userId="this.userId"></userPostFeed>
        <footerBottom></footerBottom>
    </div>
</template>

<script>

import Header from '../components/Header.vue'
import UserPostFeed from '../components/UserPostFeed'
import Footer from '../components/Footer.vue'

import axios from 'axios'

export default {
    name:'User',
    data(){
        return {
            userId: this.$route.params.id,
            token: undefined,
            username: undefined,
            bio: undefined,
            email: undefined,
            imageUrl: undefined,
            loggedUserId: undefined,
        }
    },
    components: {
        'headerTop': Header,
        'userPostFeed': UserPostFeed,
        'footerBottom': Footer
    },
    created(){
        this.token = JSON.parse(localStorage.getItem('user')).token;
        this.loggedUserId = JSON.parse(localStorage.getItem('user')).userId;
    },
    mounted(){
        const config = {
            headers: { Authorization: `Bearer ${this.token}` }
        }
        axios
        .get(`http://localhost:3000/api/user/${this.userId}`, config)
        .then(response => {
            this.username = response.data.username;
            this.bio = response.data.bio;
            this.email = response.data.email;
            this.imageUrl = response.data.imageUrl;
        })
        .catch(error => {
            console.log(error)
        })
    }
}
</script>

<style scoped>

    .user__container {
        margin:110px auto 0 auto;
        width:95%;
        max-width: 600px;
        background: white;
        padding:15px;
        border-radius:5px;
        box-shadow: 2px 5px 10px 0px #333;
    }

    .user__heading {
        margin:10px auto 20px auto;
        padding-bottom:5px;
        border-bottom: 1px solid #333;
    }

    .user__img__container {
        width:200px;
        height:200px;
        margin: 10px auto 10px auto;
        overflow: hidden;
        border-radius:50%;
        border:4px solid rgb(233, 68, 37);
    }

    .user__img__container img {
        width:100%;
        height:100%;
        object-fit: cover;
    }

    .user__bio {
        margin:10px auto 10px auto;
        padding:10px;
        text-align: justify;
        border-bottom: 1px solid #333;
    }

    .user__contact {
        display: inline-block;
        padding:15px;
        color: #333;
        font-size: 24px;
        transition: all 0.3s ease;
    }

    .user__contact:hover {
        color: rgb(233, 68, 37);
        transform: scale(1.2)
    }


</style>

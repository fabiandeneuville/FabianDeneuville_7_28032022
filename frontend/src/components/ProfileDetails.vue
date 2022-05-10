<template>
    <div class="profile__container">
        <div class="profile__img__container">
            <img class="profile__img" v-bind:src="imageUrl" v-bind:alt="`Photo de ${username}`">
        </div>
        <h3 class="profile__username">{{ username }}</h3>
        <p class="profile__bio">{{ bio }}</p>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    name: 'ProfileDetails',
    data(){
        return {
            username: '',
            imageUrl: '',
            bio: ''
        }
    },
    props: ['userId', 'token'],
    mounted: function(){
        this.getProfile()
    },
    methods: {
        getProfile: function(){
            const config = {
                    headers: { Authorization: `Bearer ${this.token}` }
                }
            axios
            .get(`http://localhost:3000/api/user/${this.userId}`, config)
            .then(response => {
                this.username = response.data.username;
                this.imageUrl = response.data.imageUrl;
                this.bio = response.data.bio;
            })
            .catch(error => {
                console.log(error)
            })
        }
    }
}

</script>

<style scoped>

    .profile__container {
        width:95%;
        max-width: 600px;
        padding:15px;
        background: white;
        margin: 110px auto 0 auto;
        display: flex; 
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        border-radius:5px;
        box-shadow: 2px 5px 10px 0px #333;
    }

    .profile__img__container {
        width:150px;
        height:150px;
        object-fit: cover;
        border:2px solid #333;
        border-radius:50%;
        overflow: hidden;
    }

    .profile__img {
        width:100%;
    }

    .profile__username {
        width: calc(100% - 150px);
    }

    .profile__bio {
        padding:20px;
        text-align: justify;
    }


</style>

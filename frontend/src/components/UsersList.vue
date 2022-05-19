/********** USER LIST **********/

<template>
    <div>
        <ul class="usersList">
            <li v-bind:key="index" v-for="(user, index) in allUsers">
                <userCard 
                v-bind:id="user.id"
                v-bind:username="user.username"
                v-bind:role="user.role"
                v-bind:email="user.email"
                v-bind:bio="user.bio"
                v-bind:imageUrl="user.imageUrl"
                
                v-bind:loggedUserRole="loggedUserRole"
                v-bind:loggedUserId="loggedUserId"
                v-bind:token="token">
                </userCard>
            </li>
        </ul>
    </div>
</template>

<script>

import UserCard from './UserCard.vue'

import axios from 'axios';

export default {
    name:'usersList',
    data(){
        return {
            allUsers: [],
            loggedUserRole: undefined,
            loggedUserId: undefined,
            token: undefined
        }
    },
    components: {
        'userCard': UserCard
    },
    mounted(){

        const token = JSON.parse(localStorage.getItem('user')).token

        this.token = JSON.parse(localStorage.getItem('user')).token
        this.loggedUserRole = JSON.parse(localStorage.getItem('user')).role
        this.loggedUserId = JSON.parse(localStorage.getItem('user')).userId
        
        const config = {
        headers: { Authorization: `Bearer ${token}` }
        }
        axios
        .get('http://localhost:3000/api/user', config)
        .then(response => {
            for(let user of response.data){
                this.allUsers.push(user)
                console.log(user)
            }
        })
        .catch(error => {
            console.log(error)
        })
    }
}
</script>

<style scoped>

    .usersList {
        margin:110px auto 0 auto;
        width:95%;
        max-width: 600px;
    }

</style>
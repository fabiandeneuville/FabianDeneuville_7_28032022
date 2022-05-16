<template>
    <div class="userCard">
        <div class="userCard__avatar__container">
            <img class="userCard__avatar" v-bind:src="imageUrl" v-bind:alt="`photo de ${username}`">
        </div>
        <h3 class="userCard__username">{{ username }} <span v-if="role === 'admin' || role === 'modérateur'"><i class="fa-solid fa-star"></i></span></h3>
        <p class="userCard__profile__link">
            <i class="fa-solid fa-user"></i>
        </p>
        <div class="userCard__role__bloc">
            <button class="userCard__change__role__btn" v-if="loggedUserRole === 'admin' && this.role != 'admin'" v-on:click="changeRole">{{ role }}</button>
        </div>
        <div class="userCard__delete__bloc" v-if="loggedUserRole === 'admin' && this.role != 'admin'">
            <i class="fa-solid fa-trash"></i>
        </div>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    name:'UserCard',
    data(){
        return {
            apiResponseMessage: undefined
        }
    },
    props: ['username', 'bio', 'email', 'id', 'role', 'imageUrl', 'loggedUserRole', 'token'],
    methods: {
        changeRole: function(){
            const config = {
                headers: { Authorization: `Bearer ${this.token}` }
            }
            const data = {}
            axios
            .put(`http://localhost:3000/api/user/${this.id}/role`, data, config)
            .then(response => {
                console.log(response.data.message)
                this.apiResponseMessage = response.data.message
                location.reload()
            })
            .catch(error => {
                console.log(error)
            })
        }
    }
}
</script>

<style scoped>

    .userCard {
        margin:10px auto;
        background: white;
        border-radius:5px;
        box-shadow: 2px 5px 10px 0px #333;
        padding: 5px;
        display:grid;
        grid-template-columns: 100px 50% auto;
        grid-template-rows:50% 50%;

    }

    .userCard__avatar__container {
        width:100px;
        height:100px;
        overflow: hidden;
        border-radius:50%;
        grid-column: 1/2;
        grid-row: 1/3;
    }

    .userCard__avatar {
        width:100%;
        height:100%;
        object-fit: cover;
    }

    .userCard__username {
        grid-row:1/2;
        grid-column: 2/3;
        justify-self: center;
        align-self: center;
    }

    .userCard__profile__link {
        grid-row:2/3;
        grid-column:2/3;
        justify-self: center;
        align-self: center;
    }

    .userCard__role__bloc {
        grid-row:1/2;
        grid-column:3/4;
        justify-self: center;
        align-self: center;
    }

    .userCard__change__role__btn {
        color: green;
        border: 2px solid green;
        border-radius:50px;
        padding: 2px 5px;
        box-shadow: 2px 2px 5px lightgray;
    }

    .userCard__delete__bloc {
        grid-row: 2/3;
        grid-column: 3/4;
        justify-self: center;
        align-self: center;
    }

    @media screen and (max-width:500px){
        .userCard {
        grid-template-columns: 100px 25% 25% auto;
        grid-template-rows:50% 50%;
    }

    .userCard__username {
        grid-column: 2/5;
    }

    .userCard__role__bloc {
        grid-row:2/3;
        grid-column:3/4;
    }

    .userCard__delete__bloc {
        grid-column: 4/5;
    }
    }



</style>
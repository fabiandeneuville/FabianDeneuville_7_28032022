/********** USER CARD **********/

<template>
    <div class="userCard">
        <div class="userCard__avatar__container">
            <img class="userCard__avatar" v-bind:src="imageUrl" v-bind:alt="`photo de ${username}`">
        </div>
        <h3 class="userCard__username">{{ username }}</h3>
        <router-link v-bind:to="`/utilisateur/${id}`" class="userCard__profile__link userCard__bloc">
            <i class="fa-solid fa-user userCard__icon"></i>
        </router-link>
        <div class="userCard__role__bloc userCard__bloc">
            <button class="userCard__change__role__btn" v-if="loggedUserRole === 'admin' && this.role != 'admin'" v-on:click="changeRole">{{ role }}</button>
            <p class="userCard__role" v-if="loggedUserRole !== 'admin'" disabled>{{ role }}</p>
        </div>
        <div class="userCard__delete__bloc userCard__bloc" v-if="loggedUserRole === 'admin' || loggedUserId === this.id">
            <i v-on:click="deleteProfile" class="fa-solid fa-trash userCard__icon"></i>
        </div>
        <div v-if="this.id != loggedUserId" class="userCard__contact__btn userCard__bloc">
            <a v-bind:href="`mailto:${this.email}`"><i class="fa-solid fa-envelope userCard__icon"></i></a>
        </div>

        <userDeletionModale
        @deleteUser="updateUsersList" 
        v-bind:id="id"
        v-bind:reveal="reveal"
        v-bind:token="token"
        v-on:closeModale="closeModale()"
        >
        </userDeletionModale>
    </div>
</template>

<script>

import UserDeletionModale from './UserDeletionModale.vue'

import axios from 'axios'

export default {
    name:'UserCard',
    data(){
        return {
            reveal: false,
            apiResponseMessage: undefined
        }
    },
    components: {
        'userDeletionModale': UserDeletionModale
    },
    props: ['username', 'bio', 'email', 'id', 'role', 'imageUrl', 'loggedUserRole', 'loggedUserId', 'token'],
    methods: {
        changeRole: function(){
            const config = {
                headers: { Authorization: `Bearer ${this.token}` }
            }
            const data = {}
            axios
            .put(`http://localhost:3000/api/user/${this.id}/role`, data, config)
            .then(response => {
                this.apiResponseMessage = response.data.message
                this.$emit('updateUsersList')
            })
            .catch(error => {
                console.log(error)
            })
        },
        deleteProfile: function(){
            this.reveal = true
        },
        closeModale: function(){
            this.reveal = false
        },
        updateUsersList: function(){
            this.$emit('updateUsersList')
        }  
    }
}
</script>

<style scoped>

    .userCard {
        margin:10px auto 20px;
        background: white;
        border-radius:5px;
        box-shadow: 2px 5px 10px 0px #333;
        padding: 10px;
        display:grid;
        grid-template-columns: 100px auto 20% 10% 10% 10%;
        grid-template-rows:50% 50%;

    }

    .userCard__avatar__container {
        width:100px;
        height:100px;
        overflow: hidden;
        border-radius:50%;
        border:3px solid rgb(233, 68, 37);
        grid-column: 1/2;
        grid-row: 1/3;
    }

    .userCard__avatar {
        width:100%;
        height:100%;
        object-fit: cover;
    }

    .userCard__username {
        grid-row:1/3;
        grid-column: 2/3;
        justify-self: center;
        align-self: center;
        overflow-wrap: break-word;
    }

    .userCard__profile__link {
        grid-row:1/3;
        grid-column:4/5;
        justify-self: center;
        align-self: center;
    }

    .userCard__role__bloc {
        grid-row:1/3;
        grid-column:3/4;
        justify-self: center;
        align-self: center;
    }

    .userCard__change__role__btn, .userCard__role{
        color: green;
        border: 2px solid green;
        border-radius:50px;
        padding: 2px 5px;
        box-shadow: 2px 2px 5px lightgray;
        font-size: 12px;
    }

    .userCard__change__role__btn {
        cursor: pointer;
    }

    .userCard__contact__btn {
        grid-row:1/3;
        grid-column:5/6;
        justify-self: center;
        align-self: center;
    }

    .userCard__delete__bloc {
        grid-row: 1/3;
        grid-column: 6/7;
        justify-self: center;
        align-self: center;
    }

    .userCard__icon {
        font-size: 20px;
        color: #333;
        transition: all 0.3s ease;
        cursor: pointer;
    }

    .userCard__icon:hover {
        color: rgb(233, 68, 37);
        transform:scale(1.2);

    }

    @media screen and (max-width:600px){
        .userCard {
            grid-template-columns: 25% 25% 25% 25%;
            grid-template-rows:50px 50px 50px;
        }

        .userCard__avatar__container {
            width:50px;
            height:50px;
            justify-self: center;
            align-self: center;
        }

        .userCard__username {
            grid-row:1/3;
            grid-column: 2/5;
        }

        .userCard__profile__link {
            grid-row:3/4;
            grid-column:2/3;
        }

        .userCard__role__bloc {
            grid-row:3/4;
            grid-column:1/2;
        }


        .userCard__contact__btn {
            grid-row:3/4;
            grid-column:3/4;
        }

        .userCard__delete__bloc {
            grid-row: 3/4;
            grid-column: 4/5;
        }
    }

</style>
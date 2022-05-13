<template>
    <div>
        <div class="profile__container">
            <div class="profile__img__container">
                <img class="profile__img" v-bind:src="imageUrl" v-bind:alt="`Photo de ${username}`">
            </div>
            <h3 class="profile__username">{{ username }}</h3>
            <p class="profile__bio">{{ bio }}</p>
            <div class="edit__profile__btn__container">
                <div v-on:click="editFormIsVisible = !editFormIsVisible" class="btn edit-btn">
                    <i class="fa-solid fa-pen-to-square"></i>
                </div>
                <div v-on:click="passwordFormIsVisible = !passwordFormIsVisible" class="btn change-password-btn">
                    <i class="fa-solid fa-gear"></i>
                </div>
                <div v-on:click="deleteProfile" class="btn delete-btn">
                    <i class="fa-solid fa-trash"></i>
                </div>
            </div>
        </div>
        <editProfileForm
        v-if="editFormIsVisible"
        v-bind:username="username"
        v-bind:bio="bio"
        v-bind:imageUrl="imageUrl"
        v-bind:userId="userId"
        v-bind:token="token"
        >
        </editProfileForm>
        <changePasswordForm
        v-bind:userId="userId"
        v-bind:token="token"
        v-if="passwordFormIsVisible">
        </changePasswordForm>


        <profileDeletionModale
        v-bind:userId="userId"
        v-bind:reveal="reveal"
        v-bind:token="token"
        v-on:closeModale="closeModale()"
        >
        </profileDeletionModale>
    </div>
</template>

<script>

import ProfileDeletionModale from './ProfileDeletionModale.vue'
import EditProfileForm from './EditProfileForm.vue'
import ChangePasswordForm from './ChangePasswordForm.vue'

import axios from 'axios'

export default {
    name: 'ProfileDetails',
    data(){
        return {
            username: '',
            imageUrl: '',
            bio: '', 
            reveal: false,
            editFormIsVisible:false,
            passwordFormIsVisible: false
        }
    },
    props: ['userId', 'token'],
    components: {
        'profileDeletionModale': ProfileDeletionModale,
        'editProfileForm': EditProfileForm,
        'changePasswordForm': ChangePasswordForm
    },
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
        },
        deleteProfile: function(){
            this.reveal = true
        },
        closeModale: function(){
            this.reveal = false
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
        border-radius:50%;
        border:4px solid rgb(233, 68, 37);
        overflow: hidden;
    }

    .profile__img {
        height:100%;
        position:relative;
        top:50%;
        left:50%;
        transform:translate(-50%, -50%)
    }

    .profile__username {
        width: 100%;
        margin-top: 15px;
    }

    .profile__bio {
        width:100%;
        padding:20px;
        text-align: justify;
        border-bottom:1px solid rgb(233, 68, 37);
    }

    .edit__profile__btn__container {
        width:100%;
        display: flex;
        flex-direction: row;
    }

    .btn {
        width:50%;
        padding:10px;
        height:40px;
        line-height: 20px;
    }

    .btn i {
        font-size: 25px;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .btn i:hover {
        color: rgb(233, 68, 37);
        transform: scale(1.2);
    }


</style>

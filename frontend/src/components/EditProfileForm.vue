/********** EDIT PROFILE FORM **********/

<template>
    <div>
        <div class="edit__form__container">
            <div v-on:click="closeForm" class="close-btn"><i class="fa-solid fa-xmark"></i></div>
            <form class="edit__form">
                <h3 class="edit__form__heading">Edition du profil</h3>
                <div class="edit__form__bloc">
                    <label class="edit__form__bloc__label" for="username">Nouveau nom d'utilisateur :</label>
                    <input v-model="newUsername" class="edit__form__bloc__input" type="text" id="username" contenteditable spellcheck="false">
                </div>
                <div class="edit__form__bloc">
                    <label class="edit__form__bloc__label" for="content">Bio :</label>
                    <textarea v-model="newBio" class="edit__form__bloc__textarea" type="text" id="bio" contenteditable spellcheck="false" placeholder="Dites-nous en plus sur vous."></textarea>
                </div>
                <div class="edit__form__bloc btn__bloc__container">
                    <div class="btn__bloc">
                        <label tabindex=0 role="button" class="edit__form__bloc__file__label" for="file"><i class="fa-solid fa-image"></i></label>
                        <input v-on:change="previewFile" type="file" class="edit__form__bloc__file__input" id="file">
                    </div>
                    <div class="btn__bloc">
                        <button v-on:click.prevent="editProfile" class="edit__form__bloc__submit-btn"><i class="fa-solid fa-paper-plane"></i></button>
                    </div>
                </div>
                <p class="fileMessage" v-if="this.file != ''">Fichier sélectionné : {{ this.file.name }} </p>
                <p class="error__message">{{ apiResponseMessage }}</p>
            </form>
        </div>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    name:'EditProfileForm',
    data(){
        return {
            newUsername:this.username,
            newBio:this.bio,
            file:'',
            apiResponseMessage:''
        }
    },
    props: ['username', 'bio', 'imageUrl', 'userId', 'token'],
    methods: {
        previewFile(event){
            this.file = event.target.files[0]
        },
        editProfile: function(){
            const config = {
                headers: { Authorization: `Bearer ${this.token}` }
            }
            
            if (this.file === ''){
                axios
                .put(`http://localhost:3000/api/user/${this.userId}`, {
                    'username': this.newUsername,
                    'bio': this.newBio
                }
                , config)
                .then(response => {
                    this.apiResponseMessage = ''
                    this.$emit('reloadProfile')
                })
                .catch(error => {
                    this.apiResponseMessage = error.response.data.message
                    console.log(error)
                })
            } else {
                let postData = new FormData();
                const user = JSON.stringify({
                    'username': this.newUsername,
                    'bio': this.newBio
                })
                const image = this.file
                postData.append('user', user)
                postData.append('image', image)
                axios
                .put(`http://localhost:3000/api/user/${this.userId}`, postData, config)
                .then(response => {
                    this.apiResponseMessage = ''
                    this.$emit('reloadProfile')
                })
                .catch(error => {
                    this.apiResponseMessage = error.response.data.message
                    console.log(error)
                })
            }
        },
        closeForm: function(){
            this.$emit('closeForm')
        }
    }
}

</script>
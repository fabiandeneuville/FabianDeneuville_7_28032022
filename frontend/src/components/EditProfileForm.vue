/********** EDIT PROFILE FORM **********/

<template>
    <div>
        <div class="edit__form__container">
            <form class="edit__form">
                <h3 class="edit__form__heading">Edition du profil</h3>
                <div class="edit__form__bloc">
                    <label class="edit__form__label" for="username">Nouveau nom d'utilisateur :</label>
                    <input v-model="newUsername" class="edit__form__input" type="text" id="username" contenteditable spellcheck="false">
                </div>
                <div class="edit__form__bloc">
                    <label class="edit__form__label" for="content">Bio :</label>
                    <textarea v-model="newBio" class="edit__form__textarea" type="text" id="bio" contenteditable spellcheck="false" placeholder="Dites-nous en plus sur vous."></textarea>
                </div>
                <div class="edit__form__bloc btn__bloc__container">
                    <div class="btn__bloc">
                        <label tabindex=0 role="button" class="edit__form__file__label" for="file"><i class="fa-solid fa-image"></i></label>
                        <input v-on:change="previewFile" type="file" class="edit__form__file__input" id="file">
                    </div>
                    <div class="btn__bloc">
                        <button v-on:click.prevent="editProfile" class="edit__form__submit-btn"><i class="fa-solid fa-paper-plane"></i></button>
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
        }
    }
}

</script>

<style scoped>

    .edit__form__container {
        margin:20px auto 10px auto;
        width:95%;
        max-width: 600px;
        display: flex;
        flex-direction: column;
        background: white;
        border-radius:5px;
        box-shadow: 2px 5px 10px 0px #333;
    }

    .edit__form {
        display: flex;
        flex-direction: column;
        width:95%;
        max-width: 600px;
        margin:20px auto
    }

    .edit__form__heading {
        margin:15px auto;
    }

    .edit__form__bloc {
        margin: 10px 0px;
    }

    .edit__form__label {
        font-size: 15px;
        display: block;
        text-align: left;
    }

    .edit__form__input {
        width:100%;
        margin: 5px auto;
        padding: 10px;
        height:30px;
        border: 2px solid rgb(233, 68, 37);
    }

    .edit__form__textarea {
        width:100%;
        margin: 5px auto;
        padding: 10px;
        height:80px;
        border: 2px solid rgb(233, 68, 37);
        font-family: 'Roboto', Helvetica, Arial, sans-serif;
    }

    .btn__bloc__container {
        display: flex;
        flex-direction: row;
    }

    .btn__bloc {
        width:50%;
        height:40px;
        line-height: 20px;
    }

    .edit__form__submit-btn {
        font-size: 30px;
        line-height: 40px;
        border-radius:50px;
        border:none;
        color: #333;
        cursor: pointer;
        transition: all 0.3s ease;
        background: none;
    }

    .edit__form__submit-btn:hover {
        color: rgb(233, 68, 37);
        transform: scale(1.2);
    }

    .edit__form__file__label{
        cursor: pointer;
        font-size: 30px;
        line-height: 40px;
    }

    .edit__form__file__label i{
        transition: all 0.3s ease;
    }

    .edit__form__file__label:hover i{
        color: rgb(233, 68, 37);
        transform: scale(1.2);
    }

    .edit__form__file__input{
        display:none;
    }

    .fileMessage {
        padding: 10px;
    }

</style>
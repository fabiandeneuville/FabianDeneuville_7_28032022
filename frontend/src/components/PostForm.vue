/********** POST FORM **********/

<template>
    <div>
        <div class="post__form__container">
            <div class="post__form__header">
                <div class="avatar__container">
                    <img class="avatar" v-bind:src="imageUrl" v-bind:alt="`Photo de ${username}`">
                </div>
                <h3 class="post__form__header__title">Quoi de neuf {{ username }} ?</h3>
                <div v-if="!isVisible" v-on:click="isVisible = !isVisible" class="post__form__header__btn"><i class="fa-solid fa-pen"></i></div>
                <div v-if="isVisible" v-on:click="isVisible = !isVisible" class="post__form__header__btn"><i class="fa-solid fa-xmark"></i></div>
            </div>
            <form v-if="isVisible" class="post__form">
                <div class="post__form__bloc">
                    <label class="post__form__label" for="title">Titre :</label>
                    <input v-model="title" class="post__form__input" type="text" id="title" required>
                </div>

                <div class="post__form__bloc">
                    <label class="post__form__label" for="content">Message :</label>
                    <textarea v-model="content" class="post__form__textarea" type="text" id="content" required></textarea>
                </div>
                <div class="post__form__bloc btn__bloc__container">
                    <div class="btn__bloc">
                        <label tabindex=0 role="button" class="post__form__file__label" for="file"><i class="fa-solid fa-image"></i></label>
                        <input v-on:change="previewFile" type="file" class="post__form__file__input" id="file">
                    </div>
                    <div class="btn__bloc">
                        <button v-on:click.prevent="postPublication" class="post__form__submit-btn"><i class="fa-solid fa-paper-plane"></i></button>
                    </div>
                </div>
                <p class="fileMessage" v-if="this.file != ''">Fichier sélectionné : {{ this.file.name }}</p>
            </form>
        </div>

        <modale v-bind:reveal="reveal"
                v-bind:apiResponseMessage="apiResponseMessage"></modale>
    </div>
</template>

<script>

import axios from 'axios'
import Modale from './Modale.vue'

export default {
    name: 'postForm',
    data(){
        return {
            isVisible: false,
            title: null,
            content: null,
            file: '',
            apiResponseMessage: '',
            reveal: false
        }
    },
    props: ['username', 'imageUrl', 'token'],
    components: {
        'modale': Modale
    },
    methods: {
        previewFile(event){
            this.file = event.target.files[0]
            console.log(this.file)
        },
        postPublication: function(){

            const config = {
                headers: { Authorization: `Bearer ${this.token}` }
            }

            if (this.file === ''){
                axios
                .post('http://localhost:3000/api/post', {
                    title: this.title,
                    content: this.content
                }, config)
                .then(response => {
                    this.apiResponseMessage = response.data.message
                    this.title = null;
                    this.content = null;
                    this.reveal = true;
                })
                .catch(error =>{
                    console.log(error)
                })
            } else {
                let postData = new FormData();
                const post = JSON.stringify({title: this.title, content: this.content})
                const image = this.file
                postData.append('post', post)
                postData.append('image', image)

                axios
                .post('http://localhost:3000/api/post', postData, config)
                .then(response => {
                    console.log(response.data.message)
                    this.apiResponseMessage = response.data.message
                    this.reveal = true;
                })
                .catch(error => {
                    console.log(error)
                    this.apiResponseMessage = 'Une erreur est survenue !'
                })
            }
        }
    }
}

</script>

<style scoped>

    .post__form__container {
        margin:110px auto 10px auto;
        width:95%;
        max-width: 600px;
        display: flex;
        flex-direction: column;
        background: white;
        border-radius:5px;
        box-shadow: 2px 5px 10px 0px #333;
    }

    .post__form__header {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding:0 15px;
        height:70px;
    }

    .post__form__header__title {
        font-size: 20px;
    }

    @media screen and (max-width:350px){
        .post__form__header__title {
            font-size: 14px;
        }
    }

    .post__form__header__btn {
        width:25px;
        height:25px;
        font-size: 25px;
        transition: all 0.3s ease;
        cursor: pointer;
    }

    .post__form__header__btn:hover {
        transform: scale(1.2);
        color: rgb(233, 68, 37);
    }

    .avatar__container {
        border:2px solid #333;
        border-radius:50%;
        height:50px;
        width:50px;
        overflow: hidden;
        object-fit: cover;
    }
    .avatar {
        width:auto;
        height: 100%;
        position: relative;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
    }

    .post__form {
        width:90%;
        margin: 0 auto;
    }

    .post__form__bloc {
        margin: 10px 0px;
    }

    .post__form__label {
        font-size: 15px;
        display: block;
        text-align: left;
    }

    .post__form__input {
        width:100%;
        margin: 5px auto;
        padding: 10px;
        height:30px;
        border: 2px solid rgb(233, 68, 37);
    }

    .post__form__textarea {
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

    .post__form__submit-btn {
        font-size: 30px;
        line-height: 40px;
        border-radius:50px;
        border:none;
        color: #333;
        cursor: pointer;
        transition: all 0.3s ease;
        background: none;
    }

    .post__form__submit-btn:hover {
        color: rgb(233, 68, 37);
        transform: scale(1.2);
    }

    .post__form__file__label{
        cursor: pointer;
        font-size: 30px;
        line-height: 40px;
    }

    .post__form__file__label i{
        transition: all 0.3s ease;
    }

    .post__form__file__label:hover i{
        color: rgb(233, 68, 37);
        transform: scale(1.2);
    }

    .post__form__file__input{
        display:none;
    }

    .fileMessage {
        padding: 10px;
    }

</style>

/********** EDIT POST FORM **********/

<template>
    <div v-if="showEditModale" class="edit__form__modale__container">
        <div v-on:click="closeEditModale" class="edit__form__modale__overlay"></div>
        <div class="edit__form__modale">
            <div v-on:click="closeEditModale" class="btn-modale"><i class="fa-solid fa-xmark"></i></div>
            <h3 class="edit__form__modale__heading">Modifiez votre publication</h3>
            <form class="edit__form">
                <div class="edit__form__bloc">
                    <label class="edit__form__label" for="title">Titre :</label>
                    <input v-model="title" class="edit__form__input" type="text" id="title" contenteditable spellcheck="false" required>
                </div>

                <div class="edit__form__bloc">
                    <label class="edit__form__label" for="content">Message :</label>
                    <textarea v-model="content" class="edit__form__textarea" type="text" id="content" contenteditable spellcheck="false" required></textarea>
                </div>
                <div class="edit__form__bloc btn__bloc__container">
                    <div class="btn__bloc">
                        <label tabindex=0 role="button" class="edit__form__file__label" for="file"><i class="fa-solid fa-image"></i></label>
                        <input v-on:change="previewFile" type="file" class="edit__form__file__input" id="file">
                    </div>
                    <div class="btn__bloc">
                        <button v-on:click.prevent="editPublication" class="edit__form__submit-btn"><i class="fa-solid fa-paper-plane"></i></button>
                    </div>
                </div>
                <p class="fileMessage" v-if="this.file != ''">Fichier sélectionné : {{ this.file.name }}</p>
            </form>

            <modale
            @closeSuccessModale="closeSuccessModale"
            v-bind:showSuccessModale="showSuccessModale"
            v-bind:apiResponseMessage="apiResponseMessage">
            </modale>
        </div>
    </div>


</template>

<script>

import Modale from './Modale'

import axios from 'axios'

export default {
    name:'EditPostForm',
    data(){
        return {
            token:undefined,
            apiResponseMessage:undefined,
            title:undefined,
            content:undefined,
            file:'',
            showSuccessModale: false
        }
    },
    components: {
        'modale': Modale
    },
    props: ['showEditModale', 'id'],
    methods: {
        getFromLocalStorage: function(){
            this.token = JSON.parse(localStorage.getItem('user')).token
        },
        closeEditModale: function(){
            this.$emit('closeEditModale')
        },
        getPost: function(){

            const config = {
                headers: { Authorization: `Bearer ${this.token}` }
            }
            axios
            .get(`http://localhost:3000/api/post/${this.id}`, config)
            .then(response => {
                this.title = response.data.title
                this.content = response.data.content
            })
            .catch(error => {
                if(error.response.data.error.name === "TokenExpiredError"){
                this.$router.push('/login')
                } else {
                    console.log(error)
                }
            })
        },
        previewFile(event){
            this.file = event.target.files[0]
        },
        editPublication: function(){

            const config = {
                headers: { Authorization: `Bearer ${this.token}` }
            }

            if (this.file === ''){
                axios
                .put(`http://localhost:3000/api/post/${this.id}`, {
                    title: this.title,
                    content: this.content
                }, config)
                .then(response => {
                    this.apiResponseMessage = response.data.message
                    this.title = null;
                    this.content = null;
                    this.showSuccessModale = true;
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
                .put(`http://localhost:3000/api/post/${this.id}`, postData, config)
                .then(response => {
                    console.log(response.data.message)
                    this.apiResponseMessage = response.data.message
                    this.showSuccessModale = true;
                })
                .catch(error => {
                    console.log(error)
                    this.apiResponseMessage = 'Une erreur est survenue !'
                })
            }
        },
        closeSuccessModale: function(){
            this.showSuccessModale = false;
        }
    },
    mounted(){
        this.getFromLocalStorage()
        this.getPost()
    }
}
</script>

<style scoped>

    .edit__form__modale__container {
        position: fixed;
        top:0;
        bottom:0;
        left:0;
        right:0;
        width:100%;
        height:100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .edit__form__modale {
        position:relative;
        background: white;
        width:95%;
        max-width: 600px;
        padding:20px;
        border-radius:5px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .edit__form__modale__overlay {
        background: rgba(0,0,0,0.7);
        position: fixed;
        top:0;
        bottom:0;
        left:0;
        right:0;
    }

    .btn-modale {
        position: absolute;
        top:10px;
        right:15px;
        color: red;
        transition: all 0.3s ease;
        cursor: pointer;
    }

    .btn-modale:hover {
        transform: scale(1.2);
    }

    .edit__form {
        width:90%;
        margin: 0 auto;
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
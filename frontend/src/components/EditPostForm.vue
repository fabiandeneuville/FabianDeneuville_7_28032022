/********** EDIT POST FORM **********/

<template>
    <div v-if="showEditModale" class="modale__container">
        <div v-on:click="closeEditModale" class="edit__form__modale__overlay"></div>
        <div class="edit__form__modale">
            <div v-on:click="closeEditModale" class="close-btn"><i class="fa-solid fa-xmark"></i></div>
            <h3 class="edit__form__modale__heading">Modifiez votre publication</h3>
            <form class="edit__form">
                <div class="edit__form__bloc">
                    <label class="edit__form__bloc__label" for="title">Titre :</label>
                    <input v-model="title" class="edit__form__bloc__input" type="text" id="title" contenteditable spellcheck="false" required>
                </div>

                <div class="edit__form__bloc">
                    <label class="edit__form__bloc__label" for="content">Message :</label>
                    <textarea v-model="content" class="edit__form__bloc__textarea" type="text" id="content" contenteditable spellcheck="false" required></textarea>
                </div>
                <div class="edit__form__bloc btn__bloc__container">
                    <div class="btn__bloc">
                        <label tabindex=0 role="button" class="edit__form__bloc__file__label" for="file"><i class="fa-solid fa-image"></i></label>
                        <input v-on:change="previewFile" type="file" class="edit__form__bloc__file__input" id="file">
                    </div>
                    <div class="btn__bloc">
                        <button v-on:click.prevent="editPublication" class="edit__form__bloc__submit-btn"><i class="fa-solid fa-paper-plane"></i></button>
                    </div>
                </div>
                <p class="fileMessage" v-if="this.file != ''">Fichier sélectionné : {{ this.file.name }}</p>
                <p class="error__message">{{ apiResponseMessage }}</p> 
            </form>
        </div>
    </div>


</template>

<script>

import axios from 'axios'

export default {
    name:'EditPostForm',
    data(){
        return {
            token:this.$store.state.token,
            apiResponseMessage:'',
            title:'',
            content:'',
            file:'',
        }
    },
    props: ['showEditModale', 'id'],
    methods: {
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
                    this.$emit('closeEditModale')
                    this.$emit('updatePostList')
                })
                .catch(error => {
                    this.apiResponseMessage = error.response.data.message
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
                    this.$emit('closeEditModale')
                    this.$emit('updatePostList')
                })
                .catch(error => {
                    console.log(error)
                    this.apiResponseMessage = error.response.data.message
                })
            }
        },
        closeSuccessModale: function(){
            this.showSuccessModale = false;
        }
    },
    mounted(){
        this.getPost()
    }
}

</script>
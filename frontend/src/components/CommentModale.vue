/********** COMMENT MODALE **********/

<template>
    <div v-if="showCommentModale" class="comment__modale__container">
        <div v-on:click="closeCommentModale" class="comment__modale__overlay"></div>
        <div class="comment__modale">
            <div v-on:click="closeCommentModale" class="btn-modale"><i class="fa-solid fa-xmark"></i></div>
            <h3 class="comment__form__heading">{{ heading }}</h3>
            <ul class="comment__list">
                <li v-bind:key="index" v-for="(comment, index) in allComments">
                    <comment
                    v-bind:id="comment.id"
                    v-bind:content="comment.content"
                    v-bind:postId="comment.post_id"
                    v-bind:username="comment.username"
                    v-bind:userId="comment.user_id"
                    v-bind:date="comment.date"
                    v-bind:likes="comment.likes"
                    v-bind:token="token"
                    v-bind:loggedUserRole="loggedUserRole"
                    v-bind:loggedUserId="loggedUserId">
                    </comment>
                </li>
            </ul>
            <hr>
            <form class="comment__form">
                <label class="comment__form__label" for="comment">Votre commentaire :</label>
                <input v-model="comment" class="comment__form__input" type="text" id="comment" required>
                <button v-on:click.prevent="commentPost" class="comment__btn"><i class="fa-solid fa-paper-plane"></i></button>
            </form>
        </div>
    </div>
</template>

<script>

import Comment from './Comment.vue'

import axios from 'axios'

export default {
    name:'CommentModale',
    data(){
        return {
            allComments: [],
            token: undefined,
            loggedUserRole: undefined,
            loggedUserId: undefined,
            heading: "Tous les commentaires",
            comment: undefined,
            commentsCounts: 0
        }
    },
    components: {
        'comment': Comment
    },
    props: ['id', 'showCommentModale', 'compteurComment'],
    methods: {
        closeCommentModale: function(){
            this.$emit('closeCommentModale')
        },
        getFromLocalStotage: function(){
            this.token = JSON.parse(localStorage.getItem('user')).token
            this.loggedUserRole = JSON.parse(localStorage.getItem('user')).role
            this.loggedUserId = JSON.parse(localStorage.getItem('user')).userId
        },
        getAllComments: function(){

            const config = {
                headers: { Authorization: `Bearer ${this.token}` }
            }
            axios
            .get(`http://localhost:3000/api/post/${this.id}/comment`, config)
            .then(response => {
                if(response.data.length === 0){
                    this.heading = "Aucun commentaires !";
                    this.$emit('commentsCount', response.data.length)
                } else if (response.data !== 0){
                    for (let comment of response.data){
                        this.allComments.push(comment)
                        this.heading = "Tous les commentaires :"
                    }
                    this.$emit('commentsCount', response.data.length)
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
        commentPost: function(){
            const token = JSON.parse(localStorage.getItem('user')).token
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            }

            axios
            .post(`http://localhost:3000/api/post/${this.id}/comment`, {
                content: this.comment
            }, config)
            .then(response => {
                location.reload()
            })
            .catch(error => {
                console.log(error)
            })
        }
    },
    mounted(){
        this.getFromLocalStotage()
        this.getAllComments()       
    },
}

</script>

<style scoped>

    .comment__modale__container {
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

    .comment__modale {
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

    .comment__list {
        width:100%;
        max-height:250px;
        overflow-y: scroll;
        scrollbar-width: thin;
        scrollbar-color: rgb(255, 213, 215);       
    }

    .comment__form {
        width:100%;
        display:flex;
        flex-direction: column;
    }

    .comment__form__heading {
        padding:10px;
    }

    .comment__form__label {
        margin:5px auto;
    }

    .comment__form__input {
        width:100%;
        margin: 5px auto;
        padding: 10px;
        height:30px;
        border: 2px solid rgb(233, 68, 37);
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

    .comment__modale__overlay {
        background: rgba(0,0,0,0.5);
        position: fixed;
        top:0;
        bottom:0;
        left:0;
        right:0;
    }

    .comment__btn {
        font-size: 30px;
        line-height: 40px;
        border-radius:50px;
        border:none;
        color: #333;
        cursor: pointer;
        transition: all 0.3s ease;
        background: none;
    }

    .comment__btn:hover {
        color: rgb(233, 68, 37);
        transform: scale(1.2);
    }

</style>
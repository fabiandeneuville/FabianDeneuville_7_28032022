/********** POST **********/

<template>
    <div class="post">
        <div class="post__management" v-if="user_Id === loggedUserId || loggedUserRole === 'admin' || loggedUserRole === 'modérateur' " post__management>
            <div v-on:click="isVisible = !isVisible" class="post__management__btn">
                <i class="fa-solid fa-ellipsis"></i>
            </div>
            <div v-if="isVisible" class="post__management__container">
                <div class="btn__bloc">
                    <i class="fa-solid fa-pen-to-square"></i>
                </div>
                <div v-on:click="toPostDeletion" class="btn__bloc">
                    <i class="fa-solid fa-trash"></i>
                </div>
            </div>
        </div>
        <p v-if="user_Id != loggedUserId" class="post__username">Publication de {{ username }}</p>
        <p v-else class="post__username">Publié par vous</p>
        <p class="post__date">{{ date }}</p>
        <h3 class="post__title">{{ title }}</h3>
        <div class="post__image__container">
            <img v-if="imageUrl" v-bind:src="imageUrl" v-bind:alt="`Imgage de ${title}`">
        </div>
        <p class="post__content">{{ content }}</p>
        <div class="btn__bloc__container">
            <div class="btn__bloc">
                <i v-bind:class="{ orange : postLiked }" v-on:click="likePost" class="fa-solid fa-thumbs-up"></i><span class="count">{{ likesCount + likes }}</span>
            </div>
            <div class="btn__bloc">
                <i v-on:click="showCommentModale = !showCommentModale" class="fa-solid fa-comment"></i><span class="count">{{ commentsCount }}</span>
            </div>
        </div>
        <postDeletionModale
        v-bind:reveal="reveal"
        v-bind:token="token"
        v-bind:id="id"
        v-on:closeModale="closeModale"
        >
        </postDeletionModale>

        <commentModale
        @commentsCount="getCommentsCount"
        v-bind:showCommentModale="showCommentModale"
        v-bind:id="id"
        v-on:closeCommentModale="closeCommentModale">
        </commentModale>
    </div>
</template>

<script>

import PostDeletionModale from './PostDeletionModale'
import CommentModale from './CommentModale.vue'

import axios from 'axios'

export default {
    name:'Post',
    data(){
        return {
            loggedUserId: null,
            loggedUserRole: null,
            token: null,
            isVisible: false,
            reveal: false,
            showCommentModale: false,
            likesCount: 0,
            postLiked: false,
            commentsCount: 0
        }
    },
    components: {
        'postDeletionModale': PostDeletionModale,
        'commentModale': CommentModale
    },
    props: ['id', 'user_Id', 'title', 'content', 'imageUrl', 'username', 'date', 'likes'],
    mounted: function(){
        this.getFromLocalStorage()
        this.checkLike()
        this.getCommentsCount()
    },
    updated(){
        this.checkLike()
    },
    methods: {
        getFromLocalStorage(){
            const user = JSON.parse(localStorage.getItem('user'))
            this.loggedUserId = user.userId;
            this.loggedUserRole = user.role;
            this.token = user.token
        },
        toPostDeletion: function(){
            this.reveal = true;
        },
        closeModale: function(){
            this.reveal = false;
        },
        closeCommentModale: function(){
            this.showCommentModale = false;
            location.reload()
        },
        editPost: function(){

        },
        checkLike: function(){
            const config = {
                headers: { Authorization: `Bearer ${this.token}` }
            };
            axios
            .get(`http://localhost:3000/api/post/${this.id}/like`, config)
            .then(response => {
                if(response.data.message === 'YES'){
                    this.postLiked = true;
                } else {
                    this.postLiked = false;
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
        likePost: function(){
            const config = {
                headers: { Authorization: `Bearer ${this.token}` }
            };
            const data = {};
            axios
            .post(`http://localhost:3000/api/post/${this.id}/like`, data, config)
            .then(response => {
                this.likesCount += response.data.count
            })
            .catch(error => {
                console.log(error)
            })
        },
        getCommentsCount(commentsCount){
            this.commentsCount = commentsCount;
        },
    },
}

</script>

<style scoped>

    .post{
        width: 100%;
        background: white;
        margin: 20px 0 20px 0;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        border-radius:5px;
        box-shadow: 2px 5px 10px 0px #333;
    }

    .post__management {
        width:100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        border-bottom: 1px solid #333;
    }

    .post__management__btn {
        width: 100%;
        height:40px;
        line-height: 40px;
        font-size: 25px;
        transition: all 0.3s ease;
        cursor: pointer;
    }

    .post__management__btn:hover {
        color: rgb(233, 68, 37);
        transform: scale(1.2);
    }

    .post__management__container {
        width:100%;
        display: flex;
        flex-direction: row;
    }

    .post__username {
        width:50%;
        padding: 5px 0;
        font-weight: 800;
        color: rgb(233, 68, 37);
    }

    .post__date {
        width:50%;
        padding: 5px 0;
    }

    .post__image__container {
        width:100%;
        object-fit: contain;
        overflow: hidden;
        padding:5px;
    }

    .post img {
        width:100%;
    }

    .post__title {
        width:90%;
        padding:10px;
        margin:0 auto;
    }

    .post__content {
        width: 90%;
        padding:10px;
        margin:0 auto;
        text-align: justify;
    }

    .btn__bloc__container {
        width:100%;
        display:flex; 
        flex-direction: row;
        justify-content: space-between;
        padding:10px 0;
        border-top:1px solid #333;
    }

    .btn__bloc {
        width:50%;
        height:40px;
        font-size: 25px;
    }

    .btn__bloc i {
        line-height: 40px;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .btn__bloc i:hover {
        color: rgb(233, 68, 37);
        transform: scale(1.2);
    }

    .count {
        font-size: 18px;
        padding:5px;
    }

    .orange {
        color: rgb(233, 68, 37);
    }

</style>
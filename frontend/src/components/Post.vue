/********** POST **********/

<template>
    <div class="post">
        <div class="post__management" v-if="user_Id === loggedUserId || loggedUserRole === 'admin' || loggedUserRole === 'modérateur' ">
            <div v-on:click="showPostManagment = !showPostManagment" class="post__management__btn">
                <i class="fa-solid fa-ellipsis"></i>
            </div>
            <div v-if="showPostManagment" class="post__management__container">
                <div v-on:click="showEditModale = !showEditModale" v-if="user_Id === loggedUserId" class="btn__bloc">
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

        <editPostForm
        @closeEditModale="closeEditModale"
        @updatePostList="updatePostList"
        v-bind:showEditModale="showEditModale"
        v-bind:id="id">
        </editPostForm>

        <postDeletionModale
        @updatePostList="updatePostList"
        v-bind:showDeletionModale="showDeletionModale"
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
import EditPostForm from './EditPostForm'
import CommentModale from './CommentModale'

import axios from 'axios'

export default {
    name:'Post',
    data(){
        return {
            loggedUserId: this.$store.state.userId,
            loggedUserRole: this.$store.state.role,
            token: this.$store.state.token,
            showPostManagment: false,
            showDeletionModale: false,
            showEditModale: false,
            showCommentModale: false,
            likesCount: 0,
            postLiked: false,
            commentsCount: 0
        }
    },
    components: {
        'postDeletionModale': PostDeletionModale,
        'commentModale': CommentModale,
        'editPostForm' : EditPostForm
    },
    props: ['id', 'user_Id', 'title', 'content', 'imageUrl', 'username', 'date', 'likes'],
    mounted: function(){
        this.checkLike()
        this.getCommentsCount()
    },
    updated(){
        this.checkLike()
    },
    methods: {
        toPostDeletion: function(){
            this.showDeletionModale = true;
        },
        closeModale: function(){
            this.showDeletionModale = false;
        },
        closeCommentModale: function(){
            this.showCommentModale = false;
        },
        closeEditModale: function(){
            this.showEditModale = false;
            this.showPostManagment = false;
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
        updatePostList: function(){
            this.$emit('updatePostList')
        }
    },
}

</script>
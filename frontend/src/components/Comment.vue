/********** COMMENT **********/

<template>
    <div class="comment">
        <div class="comment__bloc">
            <h4 class="comment__bloc__elt">{{ username }} - {{ date }}</h4>
            <p class="comment__bloc__elt">{{ content }}</p>
        </div>
        <div class="comment__btn__bloc">
            <div class="comment__like__btn comment__btn">
                <i v-bind:class="{ orange : commentLiked }" v-on:click="likeComment" class="fa-solid fa-thumbs-up"></i><span class="count">{{ likesCount + likes }}</span>
            </div>
            <div v-if="this.userId === this.loggedUserId || this.loggedUserRole === 'admin'" v-on:click="deleteComment" class="comment__delete__btn comment__btn">
                <i class="fa-solid fa-trash"></i>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    name:'Comment',
    data(){
        return {
            commentDeleted: false,
            commentLiked: false,
            likesCount:0
        }
    },
    props: ['id', 'content', 'postId', 'userId', 'username', 'date', 'likes', 'token', 'loggedUserRole', 'loggedUserId'],
    mounted(){
        this.checkLike()
    },
    updated(){
        this.checkLike()
    },
    methods: {
        deleteComment: function(){
            const config = {
                headers: { Authorization: `Bearer ${this.token}` }
            }
            axios
            .delete(`http://localhost:3000/api/post/${this.postId}/comment/${this.id}`, config)
            .then(response => {
                this.$emit('commentDeleted')
            })
            .catch(error => {
                console.log(error)
            })
        },
        likeComment: function(){
            const config = {
                headers: { Authorization: `Bearer ${this.token}` }
            };
            const data = {};
            axios
            .post(`http://localhost:3000/api/post/comment/${this.id}/like`, data, config)
            .then(response => {
                this.likesCount += response.data.count
            })
            .catch(error => {
                console.log(error)
            })
        },
        checkLike: function(){
            const config = {
                headers: { Authorization: `Bearer ${this.token}` }
            };
            axios
            .get(`http://localhost:3000/api/post/comment/${this.id}/like`, config)
            .then(response => {
                if(response.data.message === 'YES'){
                    this.commentLiked = true;
                } else {
                    this.commentLiked = false;
                }
            })
            .catch(error => {
                if(error.response.data.error.name === "TokenExpiredError"){
                this.$router.push('/login')
                } else {
                    console.log(error)
                }
            })
        },
    }
}

</script>

<style scoped>

.comment {
    margin:0 auto 20px auto;
}

.comment__bloc {
    background: rgb(255, 213, 215);
    padding:10px;
    border-radius:15px;
}

.comment__bloc__elt {
    text-align: left;
}

.comment__btn__bloc {
    display:flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    padding-top:5px;
}

.comment__btn {
    display:inline-block;
    width:15%;
    cursor: pointer;
}

.comment__btn i {
    transition:all 0.3s ease;
}

.comment__btn:hover i {
    color: rgb(233, 68, 37);
    transform: scale(1.2);
}

.count {
    padding-left:5px;
}

.orange {
        color: rgb(233, 68, 37);
}

</style>

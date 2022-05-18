<template>
    <div v-bind:class="{ hide : commentDeleted }" class="comment">
        <div class="comment__bloc">
            <h4 class="comment__bloc__elt">{{ username }} - {{ date }}</h4>
            <p class="comment__bloc__elt">{{ content }}</p>
        </div>
        <div class="comment__btn__bloc">
            <div class="comment__like__btn comment__btn">
                <i class="fa-solid fa-thumbs-up"></i>
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
            commentDeleted: false
        }
    },
    props: ['id', 'content', 'postId', 'userId', 'username', 'date', 'likes', 'token', 'loggedUserRole', 'loggedUserId'],
    methods: {
        deleteComment: function(){
            const config = {
                headers: { Authorization: `Bearer ${this.token}` }
            }
            axios
            .delete(`http://localhost:3000/api/post/${this.postId}/comment/${this.id}`, config)
            .then(response => {
                this.commentDeleted = true
            })
            .catch(error => {
                console.log(error)
            })
        }
    }
}

</script>

<style scoped>

.comment {
    margin:0 auto 20px auto;
}

.comment__bloc {
    background: lightgray;
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
    transition:all 0.3s ease;
    cursor: pointer;
}

.comment__btn:hover {
    color: rgb(233, 68, 37);
    transform: scale(1.2);
}

.hide {
    display:none;
}

</style>

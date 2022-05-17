<template>
    <div class="feed">
        <h3>{{ apiResponseMessage }}</h3>
        <ul>
            <li v-bind:key="index" v-for="(post, index) in userPosts">
                <post  
                v-bind:id="post.id"
                v-bind:title="post.title"
                v-bind:content="post.content"
                v-bind:imageUrl="post.imageUrl"
                v-bind:username="post.username"
                v-bind:date="post.date"
                v-bind:likes="post.likes"
                v-bind:user_Id="post.user_Id"
                >
                </post>
            </li>
        </ul>
    </div>
</template>

<script>

import Post from './Post'

import axios from 'axios'

export default {
    name: 'UserPostFeed',
    data(){
        return {
            userPosts: [],
            apiResponseMessage: undefined
        }
    },
    props: ['userId'],
    components: {
        'post': Post
    },
    mounted(){

        const token = JSON.parse(localStorage.getItem('user')).token
        
        const config = {
        headers: { Authorization: `Bearer ${token}` }
        }
        axios
        .get(`http://localhost:3000/api/post/user/${this.userId}`, config)
        .then(response => {
            for (let post of response.data){
                this.userPosts.push(post);
                this.apiResponseMessage = 'Les publications :'
            }
        })
        .catch(error => {
            if(error.response.data.message = 'Aucune publication !'){
                this.apiResponseMessage = error.response.data.message;
            } else {{
                console.log(error)
            }}
        })
    },
}

</script>

<style>
    .feed {
        width: 95%;
        max-width: 600px;
        margin: 20px auto;
    }

    li {
        list-style-type: none;
    }

</style>
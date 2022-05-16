<template>
    <div class="feed">
        <ul>
            <li v-bind:key="index" v-for="(post, index) in allPosts">
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
    name: 'PostFeed',
    data(){
        return {
            allPosts: [],
        }
    },
    components: {
        'post': Post
    },
    created(){

        const token = JSON.parse(localStorage.getItem('user')).token
        
        const config = {
        headers: { Authorization: `Bearer ${token}` }
        }
        axios
        .get('http://localhost:3000/api/post', config)
        .then(response => {
            for (let post of response.data){
                this.allPosts.push(post)
            }
        })
        .catch(error => {
            console.log(error)
        })
    },
}

</script>

<style>
    .feed {
        width: 95%;
        max-width: 600px;
        margin: 0 auto;
    }

    li {
        list-style-type: none;
    }

</style>
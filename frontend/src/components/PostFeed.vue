<template>
    <div class="feed">
        <ul>
            <li>
                <post v-bind:key="index" 
                v-bind:id="allPosts[index].id"
                v-bind:title="allPosts[index].title"
                v-bind:content="allPosts[index].content"
                v-bind:imageUrl="allPosts[index].imageUrl"
                v-bind:username="allPosts[index].username"
                v-bind:date="allPosts[index].date"
                v-bind:likes="allPosts[index].likes"
                v-for="(post, index) in allPosts">
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
    mounted(){

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
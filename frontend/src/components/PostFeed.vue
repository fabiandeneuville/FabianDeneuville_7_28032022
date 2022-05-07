<template>
    <div class="feed">
        <ul>
            <li v-bind:key="index" v-for="(post, index) in allPosts">
                <div class="post">
                    <p class="post__username">Publication de {{ post.username }}</p>
                    <p class="post__date">{{ post.date }}</p>
                    <h3 class="post__title">{{ post.title }}</h3>
                    <div class="post__image__container">
                        <img v-if="post.imageUrl" v-bind:src="post.imageUrl" v-bind:alt="`Imgage de ${title}`">
                    </div>
                    <p class="post__content">{{ post.content }}</p>
                    <div class="btn__bloc__container">
                        <div class="btn__bloc">
                            <i class="fa-solid fa-thumbs-up"></i><span class="likes__count">{{ post.likes }}</span>
                        </div>
                        <div class="btn__bloc">
                            <i class="fa-solid fa-comment"></i>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    name: 'PostFeed',
    data(){
        return {
            allPosts: [],
        }
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
                console.log(post)
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
        height: 100vh;
        width: 95%;
        max-width: 600px;
        margin: 0 auto;
    }

    li {
        list-style-type: none;
    }

    .post{
        width: 100%;
        background: white;
        margin: 0 0 10px 0;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        border-radius:5px;
        box-shadow: 2px 5px 10px 0px #333;
    }

    .post__username {
        width:50%;
        padding: 5px 0;
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


</style>
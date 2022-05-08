<template>
    <div>
        <headerTop> </headerTop>
        <postForm 
            v-bind:username="username" 
            v-bind:imageUrl="imageUrl"
            v-bind:token="token">
        </postForm>
        <postFeed> </postFeed>
    </div>

</template>

<script>

    import axios from 'axios'

    import Header from '../components/Header'
    import PostForm from '../components/PostForm'
    import PostFeed from '../components/PostFeed'

    export default {
        name: 'MainPage',
        data(){
            return {
                userId: null,
                role: null,
                token: null,
                username: null,
                imageUrl: null
            }
        },
        mounted: function(){
            this.fromLocalStorage()
            this.getOneUser()
        },
        components: {
            'headerTop' : Header,
            'postForm' : PostForm,
            'postFeed' : PostFeed
        },
        methods: {
            fromLocalStorage: function(){
                const user = JSON.parse(localStorage.getItem('user'))
                if(user){
                    this.userId = user.userId
                    this.role = user.role
                    this.token = user.token
                } else {
                    this.$router.push('/login')
                }
            },
            getOneUser: function(){

                const config = {
                    headers: { Authorization: `Bearer ${this.token}` }
                }

                axios
                .get(`http://localhost:3000/api/user/${this.userId}`, config)
                .then(response => {
                    this.username = response.data.username
                    this.imageUrl = response.data.imageUrl
                })

            }
        }
    }

</script>



<style scoped>

button {
    position: absolute; 
    top:50%;
}
p {
    position: absolute; 
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 50px;
    background: white;
    padding:30px;
}

img {
    position: absolute;
    top:60%;
    width:50px;
    height:50px;
    object-fit: cover;
}

</style>

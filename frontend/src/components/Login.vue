/********** LOGIN **********/

<template>
    <div class="login">
        <form class="login__form">
            <h2>Connectez-vous</h2>
            <div>
                <p>Pas encore inscrit ?</p>
                <router-link to="/signup">Inscription</router-link>
            </div>
            <label class="login__form__label" for="email">Email</label>
            <input class="login__form__input" v-model="email" type="email" id="email" required>
            <label class="login__form__label" for="password">Mot de passe</label>
            <input class="login__form__input" v-model="password" type="password" id="password" required>
            <button class="login__form__submit-btn" v-on:click.prevent="logingIn">Connexion</button>
            <p class="msg">{{ apiResponseMessage }}</p>
        </form>
    </div>
</template>

<script>

    import axios from 'axios'

    export default {
        name: 'login',
        data(){
            return {
                email: '',
                password: '',
                userId: '',
                role: '',
                token: '',
                apiResponseMessage: ''
            }
        },
        methods: {
            toLocalStorage: function(){
                const user = {
                    'userId': this.userId,
                    'role': this.role,
                    'token': this.token
                }
                localStorage.setItem('user', JSON.stringify(user));
            },
            logingIn: function(){
                axios
                .post('http://localhost:3000/api/user/login', {
                    email: this.email,
                    password: this.password,
                })
                .then(response => {
                    this.userId = response.data.userId
                    this.role = response.data.role
                    this.token = response.data.token
                    this.apiResponseMessage = "Connexion réussie"
                    this.toLocalStorage();
                    this.$router.push('/fil')
                })
                .catch(error => {
                    console.log(error)
                    this.apiResponseMessage = error.response.data.message
                })
            }
        }
    }

</script>

<style scoped>

    .login {
        background: white;
        width:80%;
        max-width: 500px;
        margin: auto;
        border-radius:15px;
        box-shadow: 5px 2px 25px 5px #333;
    }

    .login__form {
        display: flex;
        flex-direction: column;
        width:90%;
        margin: 0 auto;
        padding:20px;
    }

    .login__form__label {
        margin: 15px 0px 5px;
    }

    .login__form__input {
        width:90%;
        margin: 5px auto;
        padding: 5px;
        height:30px;
        border: 2px solid rgb(233, 68, 37);
    }

    .login__form__submit-btn {
        margin: 15px auto 25px;
        width:120px;
        font-size: 20px;
        border-radius:50px;
        border: 2px solid #333;
        color: #333;
        cursor: pointer;
    }

    .login__form__submit-btn:hover {
        color: green;
        border: 2px solid green;
        box-shadow: 2px 2px 5px lightgray;
    }

</style>
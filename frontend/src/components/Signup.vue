<template>
    <div class="signup">
        <form class="signup__form">
            <h2>Inscrivez-vous</h2>

            <label class="signup__form__label" for="username">Nom d'utilisateur</label>
            <input class="signup__form__input" v-model="username" type="text" id="username">

            <label class="signup__form__label" for="email">Email</label>
            <input class="signup__form__input" v-model="email" type="email" id="email">

            <label class="signup__form__label" for="password">Mot de passe</label>
            <input class="signup__form__input" v-model="password" type="text" id="password">

            <label class="signup__form__label" for="passwordConfirm">Confirmez le mot de passe</label>
            <input class="signup__form__input" v-model="passwordConfirm" type="text" id="passwordConfirm">

            <button class="signup__form__submit-btn" v-on:click.prevent="signingUp">Inscription</button>

            <p class="msg">{{ apiResponseMessage }}</p>

        </form>
    </div>
</template>

<script>

    import axios from 'axios'

    export default {
        name: 'signup',
        data() {
            return {
                username: '',
                email: '',
                password: '',
                passwordConfirm: '',
                apiResponseMessage: ''
            }
        },
        methods: {
            signingUp: function(){
                axios
                .post('http://localhost:3000/api/user/signup', {
                    username: this.username,
                    email: this.email,
                    password: this.password,
                    passwordConfirm: this.passwordConfirm   
                })
                .then(response => {
                    this.apiResponseMessage = "Inscription réussie"
                })
                .catch(error => {
                    console.log(error)
                    this.apiResponseMessage = "Un problème est survenu"
                })
            }
        }
    }

</script>


<style>

    .signup {
        background: white;
        width:80%;
        max-width: 500px;
        margin: 25px auto;
        border-radius:15px;
        box-shadow: 5px 2px 25px 5px #333;
    }

    .signup__form {
        display: flex;
        flex-direction: column;
        width:90%;
        margin: 0 auto;
        padding:20px;
    }

    .signup__form__label {
        margin: 15px 0px 5px;
    }

    .signup__form__input {
        width:90%;
        margin: 5px auto;
        padding: 5px;
        height:30px;
        border: 2px solid rgb(233, 68, 37);
        border-radius:50px;
    }

    .signup__form__submit-btn {
        margin: 15px auto 25px;
        width:120px;
        font-size: 20px;
        border-radius:50px;
        border: 2px solid #333;
        color: #333;
        cursor: pointer;
    }

    .signup__form__submit-btn:hover {
        color: green;
        border: 2px solid green;
        box-shadow: 2px 2px 5px lightgray;

    }


</style>
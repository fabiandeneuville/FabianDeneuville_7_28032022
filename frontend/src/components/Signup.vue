/********** SIGNUP **********/

<template>
    <div class="signup">
        <form class="signup__form">
            <h2>Inscrivez-vous</h2>

            <div>
                <p>Déjà inscrit ?</p>
                <router-link to="/login">Connexion</router-link>
            </div>
            <label class="signup__form__label" for="username">Nom d'utilisateur</label>
            <input class="signup__form__input" v-model="username" v-on:input="checkUsername" type="text" id="username" contenteditable spellcheck="false" required>
            <p class="error__message">{{ usernameErrorMessage }}</p>

            <label class="signup__form__label" for="email">Email</label>
            <input class="signup__form__input" v-model="email" v-on:input="checkEmail" type="email" id="email" contenteditable spellcheck="false" required>
            <p class="error__message">{{ mailErrorMessage }}</p>

            <label class="signup__form__label" for="password">Mot de passe</label>
            <input class="signup__form__input" v-model="password" v-on:input="checkPassword" type="text" id="password" contenteditable spellcheck="false" required>
            <p class="error__message">{{ passwordErrorMessage }}</p>

            <label class="signup__form__label" for="passwordConfirm">Confirmez le mot de passe</label>
            <input class="signup__form__input" v-model="passwordConfirm" type="text" id="passwordConfirm" contenteditable spellcheck="false" required>
            <p class="error__message">{{ passwordConfirmErrorMessage }}</p>

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
                apiResponseMessage: '',
                usernameErrorMessage:'',
                mailErrorMessage:'',
                passwordErrorMessage:'',
                passwordConfirmErrorMessage:''
            }
        },
        methods: {
            checkUsername: function(){
                const usernameRegex = /^[a-zéèôöîïûùü' -]{1,50}$/gi
                if(this.username.match(usernameRegex)){
                    this.usernameErrorMessage = ''
                } else {
                    this.usernameErrorMessage = `Vous ne pouvez utiliser que des lettres, espaces, - et ' "`
                }
            },
            checkEmail: function(){
                const mailRegex = /^[a-z0-9-._]+[@]{1}[a-z0-9.-_]+[.]{1}[a-z]{2,10}$/gi
                if(this.email.match(mailRegex)){
                    this.mailErrorMessage = ''
                } else {
                    this.mailErrorMessage = 'Format incorrect'
                }
            },
            checkPassword: function(){
                const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])(?!.* ).{8,16}$/
                if(this.password.match(passwordRegex)){
                    this.passwordErrorMessage = ''
                } else {
                    this.passwordErrorMessage = 'Utilisez des lettres majuscules, minuscules, des chiffres et au moins un symbole parmis *#&§!%+, pour 8 caractères minimum et 16 caractères maximum'
                }
            },
            signingUp: function(){
                axios
                .post('http://localhost:3000/api/user/signup', {
                    username: this.username,
                    email: this.email,
                    password: this.password,
                    passwordConfirm: this.passwordConfirm   
                })
                .then(response => {
                    this.$router.push('/login')
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

    .signup {
        background: white;
        width:80%;
        max-width: 500px;
        margin: auto;
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

    .error__message {
        font-size: 12px;
        color:crimson;
        width:90%;
        margin:2px auto 2px auto;
        padding-left:10px;
    }

</style>
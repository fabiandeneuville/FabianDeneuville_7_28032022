<template>
    <div class="form__container">
        <form class="password__change__form">
            <h3 class="password__change__form__heading">Changement du mot de passe</h3>
            <label class="password__change__form__label" for="password">Nouveau mot de passe</label>
            <input v-model="password" class="password__change__form__input" type="password" id="password" required>
            <label class="password__change__form__label" for="passwordConfirm">Confirmez le mot de passe</label>
            <input v-model="passwordConfirm" class="password__change__form__input" type="password" id="passwordConfirm" required>
            <p>{{ apiResponseMessage }}</p>
            <button v-on:click.prevent="changePassword" class="password__change__form-btn">Valider</button>

        </form>
        <successModale 
        v-bind:reveal="reveal"
        v-bind:apiResponseMessage="apiResponseMessage"
        >
        </successModale>
    </div>
</template>

<script>

import Modale from './Modale'

import axios from 'axios'

export default {
    name: 'ChangePasswordForm',
    data(){
        return {
            password:'',
            passwordConfirm:'',
            apiResponseMessage:'',
            reveal: false
        }
    },
    components: {
        'successModale': Modale
    },
    props: ['userId', 'token'],
    methods: {
        changePassword: function(){
            const config = {
                headers: { Authorization: `Bearer ${this.token}` }
            }
            axios
            .put(`http://localhost:3000/api/user/${this.userId}/password`, {
                password: this.password,
                passwordConfirm: this.passwordConfirm
            }, config)
            .then(response => {
                this.apiResponseMessage = response.data.message
                this.reveal = true;
            })
            .catch(error => {
                this.apiResponseMessage = error.response.data.message
            })
        }
    }
}


</script>

<style scoped>

    .form__container{
        display: block;
        width:95%;
        max-width: 600px;
        background: white;
        margin: 20px auto;
        padding:20px;
        border-radius:5px;
        box-shadow: 2px 5px 10px 0px #333;
    }

    .password__change__form {
        display:flex;
        flex-direction: column;
        width:100%;
        margin:0 auto;
    }

    .password__change__form__heading{
        margin:15px auto;
    }

    .password__change__form__label {
        font-size: 15px;
        display: block;
        text-align: left;
    }

    .password__change__form__input {
        width:100%;
        margin: 5px auto;
        padding: 10px;
        height:30px;
        border: 2px solid rgb(233, 68, 37);
    }

    .password__change__form-btn {
        margin: 15px auto 25px;
        width:120px;
        font-size: 20px;
        border-radius:50px;
        border: 2px solid #333;
        color: #333;
        cursor: pointer;
    }

     .password__change__form-btn:hover {
        color: green;
        border: 2px solid green;
        box-shadow: 2px 2px 5px lightgray;
    }

</style>
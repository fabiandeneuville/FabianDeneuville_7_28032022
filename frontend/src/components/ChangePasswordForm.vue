/********** CHANGE PASSWORD FORM **********/

<template>
    <div class="form__container">
        <div v-on:click="closeForm" class="close-btn"><i class="fa-solid fa-xmark"></i></div>
        <form class="password__change__form">
            <h3 class="password__change__form__heading">Changement du mot de passe</h3>
            <div class="password__change__form__bloc">
                <label class="password__change__form__bloc__label" for="password">Nouveau mot de passe</label>
                <input v-model="password" class="password__change__form__bloc__input" type="password" id="password" required>
            </div>
            <div class="password__change__form__bloc">
                <label class="password__change__form__bloc__label" for="passwordConfirm">Confirmez le mot de passe</label>
                <input v-model="passwordConfirm" class="password__change__form__bloc__input" type="password" id="passwordConfirm" required>
            </div>
            <p>{{ apiResponseMessage }}</p>
            <button v-on:click.prevent="changePassword" class="big-submit-btn">Valider</button>

        </form>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    name: 'ChangePasswordForm',
    data(){
        return {
            password:'',
            passwordConfirm:'',
            apiResponseMessage:'',
        }
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
                this.password = ''
                this.passwordConfirm = ''
            })
            .catch(error => {
                this.apiResponseMessage = error.response.data.message
            })
        },
        closeForm: function(){
            this.$emit('closeForm')
        }
    }
}

</script>
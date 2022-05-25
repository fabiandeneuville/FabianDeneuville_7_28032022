/********** POST DELETION MODALE **********/

<template>
    <div v-if="showDeletionModale" class="deletion">
        <div v-on:click="closeModale" class="deletion__overlay"></div>
        <div class="deletion__modale">
            <h3 class="deletion__modale__title">Êtes-vous sûr ?</h3>
            <div v-on:click="closeModale" class="deletion__modale__btn cancel-btn">ANNULER</div>
            <div v-on:click="deletePost" class="deletion__modale__btn validate-btn">CONFIRMER</div>
        </div>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    name: 'Validation',
    props: ['showDeletionModale', 'token', 'id'],
    methods: {
        deletePost: function(){
            const config = {
                headers: { Authorization: `Bearer ${this.token}` }
            };
            axios
            .delete(`http://localhost:3000/api/post/${this.id}`, config)
            .then(response => {
                this.$emit('updatePostList')
            })
            .catch(error => {
                console.log(error)
            })
        },
        closeModale: function(){
            this.$emit('closeModale')
        }
    }
}

</script>

<style scoped>
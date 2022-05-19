/********** POST DELETION MODALE **********/

<template>
    <div v-if="reveal" class="bloc-modale">
        <div v-on:click="closeModale" class="overlay"></div>
        <div class="modale">
            <h3 class="modale-title">Êtes-vous sûr ?</h3>
            <div v-on:click="closeModale" class="modale-btn cancel-btn">ANNULER</div>
            <div v-on:click="deletePost" class="modale-btn validate-btn">CONFIRMER</div>
        </div>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    name: 'Validation',
    props: ['reveal', 'token', 'id'],
    methods: {
        deletePost: function(){
            const config = {
                headers: { Authorization: `Bearer ${this.token}` }
            };
            axios
            .delete(`http://localhost:3000/api/post/${this.id}`, config)
            .then(response => {
                console.log(response.data.message)
                location.reload()
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

.bloc-modale {
        position: fixed;
        top:0;
        bottom:0;
        left:0;
        right:0;
        width:100%;
        height:100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modale {
        position:relative;
        background: white;
        height:100px;
        width:90%;
        max-width: 250px;
        border-radius:5px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }

    .modale-title {
        width:100%;
    }

    .modale-btn {
        width:50%;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.3s ease;
    }

    .modale-btn:hover {
        transform: scale(1.2);
    }

    .cancel-btn {
        color: crimson;
    }

    .validate-btn {
        color: green;
    }

    .overlay {
        background: rgba(0,0,0,0.5);
        position: fixed;
        top:0;
        bottom:0;
        left:0;
        right:0;
    }

</style>

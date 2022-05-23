/********** MODALE **********/

<template>
    <div v-if="showSuccessModale" class="bloc-modale">
        <div v-on:click="closeModale" class="overlay"></div>
        <div class="modale">
            <div v-on:click="closeModale" class="btn-modale"><i class="fa-solid fa-xmark"></i></div>
            <h3>{{ apiResponseMessage }}</h3>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Modale',
    props: ['showSuccessModale', 'username', 'apiResponseMessage'],
    methods: {
        closeModale: function(){
            this.$emit('closeSuccessModale')
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
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .btn-modale {
        position: absolute;
        top:10px;
        right:15px;
        color: red;
        transition: all 0.3s ease;
        cursor: pointer;
    }

    .btn-modale:hover {
        transform: scale(1.2);
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
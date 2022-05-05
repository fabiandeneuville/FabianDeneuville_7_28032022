<template>
    <div>
        <div v-if="!isVisible" class="post__form__caller">
            <img class="call-elt avatar" v-bind:src="imageUrl" v-bind:alt="`Photo de ${username}`">
            <h3 class="call-elt call-heading">Quoi de neuf {{ username }} ?</h3>
            <div v-on:click="isVisible = !isVisible" class="call-elt call-btn"><i class="fa-solid fa-pen"></i></div>
        </div>

        <form v-if="isVisible" class="post__form">

            <div v-on:click="isVisible = !isVisible" class="close-btn">
                <i class="fa-solid fa-xmark"></i>
            </div>

            <div class="post__form__bloc">
                <label class="post__form__label" for="title">Titre :</label>
                <input v-model="title" class="post__form__input" type="text" id="title" required>
            </div>

            <div class="post__form__bloc">
                <label class="post__form__label" for="content">Message :</label>
                <textarea v-model="content" class="post__form__textarea" type="text" id="content" required></textarea>
            </div>


            <div class="post__form__bloc btn__bloc__container">
                <div class="btn__bloc">
                    <label class="post__form__file__label" for="file"><i class="fa-solid fa-image"></i></label>
                    <input type="file" class="post__form__file__input" id="file">
                </div>
                <div class="btn__bloc">
                    <button class="post__form__submit-btn"><i class="fa-solid fa-paper-plane"></i></button>
                </div>
            </div>

        </form>
    </div>
    
</template>

<script>

export default {
    name: 'postForm',
    data(){
        return {
            isVisible: false,
            title:'',
            content:'',
        }
    },
    props: ['username', 'imageUrl']
}

</script>

<style>

    .post__form__caller {
        position: fixed;
        top:110px;
        left:50%;
        transform: translateX(-50%);
        width:95%;
        height:70px;
        max-width: 600px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        background: #f1f1f1;
        border-radius:15px;
        box-shadow: 5px 2px 25px 5px #333;
    }

    .avatar {
        border:2px solid;
        border-radius:50%;
        height:50px;
    }

    .call-elt {
        display: block;
        line-height: 70px;
    }

    .call-heading {
        font-size: 15px;
        width:60%;
    }

    @media screen and (max-width:300px){
        .call-heading {
            display:none;
        }
    }

    .call-btn {
        width:20%;
        font-size: 25px;
    }

    .call-btn i{
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .call-btn i:hover {
        color: rgb(233, 68, 37);
        transform: scale(1.2);
    }

    .close-btn {
        position: absolute;
        top:15px;
        right:15px;
        font-size: 30px;
        color: rgb(233, 68, 37);
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .close-btn:hover {
        transform: scale(1.2);
    }

    .post__form {
        position: absolute;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        top: 110px;
        left:50%;
        transform: translateX(-50%);
        width:80%;
        max-width: 600px;
        background: #f1f1f1;
        padding: 25px;
        border-radius:15px;
        box-shadow: 5px 2px 25px 5px #333;
    }

    .post__form__bloc {
        margin: 10px 0px;
    }

    .post__form__label {
        font-size: 20px;
        display: block;
        text-align: left;
        margin: 15px 0px 5px 5px;
    }

    .post__form__input {
        width:100%;
        margin: 5px auto;
        padding: 10px;
        height:30px;
        border: 2px solid rgb(233, 68, 37);
        border-radius:50px;
    }

    .post__form__textarea {
        width:100%;
        margin: 5px auto;
        padding: 10px;
        height:80px;
        border: 2px solid rgb(233, 68, 37);
        border-radius:15px;
    }

    .btn__bloc__container {
        display: flex;
        flex-direction: row;
    }

    .btn__bloc {
        width:50%;
        height:40px;
    }

    .post__form__submit-btn {
        font-size: 30px;
        line-height: 40px;
        border-radius:50px;
        padding: 5px;
        border:none;
        color: #333;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .post__form__submit-btn:hover {
        color: rgb(233, 68, 37);
        transform: scale(1.2);
    }

    .post__form__file__label{
        cursor: pointer;
        font-size: 30px;
        line-height: 40px;
    }

    .post__form__file__label i{
        transition: all 0.3s ease;
    }

    .post__form__file__label:hover i{
        color: rgb(233, 68, 37);
        transform: scale(1.2);
    }

    .post__form__file__input{
        display:none;
    }

</style>

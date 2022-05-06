<template>
    <div class="header-top">
        <div class="header__logo__desktop__container">
            <img class="logo__desktop" src="../assets/icon-left-font-monochrome-white.png" alt="logo de Groupomania">
        </div>
        <div class="header__logo__mobile__container">
            <img class="logo__mobile" src="../assets/icon-white.png" alt="logo de Groupomania">
        </div>
        <div class="header__link">
            <i class="fa-solid fa-user"></i>
        </div>
        <div v-on:click="this.logOut" class="header__link">
            <i class="fa-solid fa-arrow-right-from-bracket"></i>
        </div>
    </div>
</template>


<script>

    export default {
        name: 'header-top',
        data(){
            return {
                isAdmin: false
            }
        },
        props: ['role', 'token', 'username'],
        
        methods: {
            logOut: function(){
                localStorage.removeItem('user')
                this.$router.push('/login')
            }
        }
    }

</script>

<style>
    .header-top {
        position: fixed;
        top:0px;
        width: 100%;
        height:100px;
        padding: 10px;
        display:flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background: #333;
    }

    .header__logo__desktop__container {
        display: block;
        width:50%;
    }

    .header__logo__mobile__container {
        display:none;
    }

    .logo__desktop {
        width: 100%;
        max-width: 500px;
    }

    .header__link {
        display: flex;
        justify-content: center;
        align-items: center;
        width:25%;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .header__link:hover {
        transform: scale(1.2);
    }

    .header__link i {
        color: white;
        font-size: 25px;
    }

    @media screen and (max-width:600px){

        .header-top {
            justify-content: space-around;
        }
        .header__logo__desktop__container {
            display: none;
        }

        .header__logo__mobile__container {
            display: block; 
            width: 33%;
        }

        .logo__mobile {
            height: 80px;
        }

        .header__link {
            width: 33%;
        }
    }


</style>

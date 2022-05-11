<template>
    <div class="header-top">
        <router-link to="/fil" class="header__logo__desktop__container">
            <img class="logo__desktop" src="../assets/icon-left-font-monochrome-white.png" alt="logo de Groupomania">
        </router-link>
        <router-link to="/fil" class="header__logo__mobile__container">
            <img class="logo__mobile" src="../assets/icon-white.png" alt="logo de Groupomania">
        </router-link>
        <router-link v-if="location !== '/profile'" to="/profile" role="button" tabindex=0 class="header__link"><i class="fa-solid fa-user"></i></router-link>
        <router-link v-if="location === '/profile' || location === '/utilisateurs'" to="/fil" role="button" tabindex=0 class="header__link"><i class="fa-solid fa-arrow-left"></i></router-link>
        <router-link v-if="location === '/fil' || location === '/profile'" to="/utilisateurs" role="button" tabindex="0" class="header__link"><i class="fa-solid fa-users"></i></router-link>
        <div v-on:click="this.logOut" role="button" tabindex=0 class="header__link">
            <i class="fa-solid fa-arrow-right-from-bracket"></i>
        </div>
    </div>
</template>


<script>

    export default {
        name: 'header-top',
        data(){
            return {
                location: ''
            }
        },
        props: ['role', 'token', 'username'],
        
        methods: {
            logOut: function(){
                localStorage.removeItem('user')
                this.$router.push('/login')
            }
        },
        created(){
            const currentLocation = window.location.pathname;
            this.location = currentLocation;
        }
    }

</script>

<style>
    .header-top {
        position: fixed;
        z-index:9999;
        top:0px;
        width: 100%;
        height:100px;
        padding: 10px;
        display:flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background: #333;
        overflow: hidden;
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
        text-decoration: none;
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

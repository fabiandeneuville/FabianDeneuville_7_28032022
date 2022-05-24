/********** FOOTER **********/

<template>
    <div class="footer__bloc">
        <p>©️ Groupomania - {{ year }}</p>
    </div>
</template>

<script>
export default {
    name: 'Footer',
    data(){
        return {
            year: null,
        }
    }, 
    mounted(){
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        this.year = currentYear;
    }
}
</script>

<style scoped>

    .footer__bloc {
        display: block;
        margin-top: 10px;
        height: 100px;
        width: 100%;
        color: #332;
        display: flex;
        justify-content: center;
        align-items: center;
    }

</style>
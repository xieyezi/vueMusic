<template>
    <div class="no-result">
        <div class="no-result-icon">
            <Icon type="ios-outlet-outline" />
        </div>
        <p class="no-result-text">{{title}}</p>
    </div>
</template>

<script>
    export default {
        name: "no-result",
        props: {
            title: {
                type: String,
                default: ''
            }
        }
    }
</script>

<style scoped>
    .no-result{
        text-align: center;
    }
    .no-result-icon{
        width: 86px;
        height: 90px;
        margin: 0 auto;
        font-size: 50px;
        background-size: 86px 90px;
    }
    .no-result-text{
        font-size: 14px;
        color: #666666;
    }
</style>
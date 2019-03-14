<template>
    <div class="theme">
        <div class="item">
            <p>主题颜色</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "theme"
    }
</script>

<style scoped>
    .theme {
        width: 100%;
        text-align: center;
        background: #2d3047;
    }
    .theme .background {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        opacity: 0.6;
        filter: blur(20px);
    }
    .item{
        width: 100px;
        height: 100px;
        margin: 0 auto;
    }
</style>
<template>
    <div class="mhead">
        <h2 class="text">觉非音乐</h2>
        <div class="iconimg"></div>
    </div>
</template>

<script>
    export default {
        name: "mhead"
    }
</script>

<style scoped>
    .mhead {
        position: relative;
        height: 44px;
        width: 100%;
        text-align: center;
        color: rgba(255, 255, 255, 0.8);
        background: rgb(135, 203, 216);
    }

    .mhead .iconimg {
        position: absolute;
        display: inline-block;
        margin-top: 6px;
        right: 10px;
        width: 30px;
        height: 32px;
        border-radius: 50%;
        background-image: url("../common/image/user.png");
        background-size: 28px 28px;

    }

    .mhead .text {
        display: inline-block;
        vertical-align: top;
        margin-top: 6px;
        line-height: 30px;
        font-size: 18px;
    }
</style>
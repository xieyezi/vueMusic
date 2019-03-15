<template>
    <transition name="slide">
        <div class="theme theme1">
            <div class="back" @click="back">
                <i class="icon-back"></i>
            </div>
            <div class="choose" @click="choose">
                <p class="choosetext">确定</p>
            </div>
            <div class="tophead" ref="tophead">
            </div>
            <div class="content">
                <Row :gutter="4" type="flex" justify="space-between" class="code-row-bg">
                    <Col span="24" style="margin-bottom: 2px;margin-top: 20px;">
                        <div ref="theme1">
                            <Card style="height: 150px;background: #ff7675;">
                                <div style="text-align:center" @click="chooseItem1">
                                    <h3 class="title">桃花粉</h3>
                                    <p class="text">云片何人画，尘侵粉色微</p>
                                </div>
                            </Card>
                        </div>
                    </Col>
                    <Col span="24" style="margin-bottom: 2px;">
                        <div ref="theme2">
                            <Card style="height: 150px;background: #87cbd8;">
                                <div style="text-align:center"  @click="chooseItem2">
                                    <h3 class="title">绿松青</h3>
                                    <p class="text">稍见青青色，还从柳上归</p>
                                </div>
                            </Card>
                        </div>
                    </Col>
                    <Col span="24">
                        <div ref="theme3">
                            <Card style="height: 150px;background: #d6a2e8;">
                                <div style="text-align:center"  @click="chooseItem3">
                                    <h3 class="title">丁香紫</h3>
                                    <p class="text">烟轻雨小，紫陌香尘少</p>
                                </div>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "theme",
        methods: {
            back() {
                this.$router.back();
            },
            choose() {

            },
            chooseItem1() {
                this.$refs.theme1.style.border = 'solid 2px gray';
                this.$refs.tophead.style.background = '#ff7675';
                this.$refs.theme2.style.border = '0';
                this.$refs.theme3.style.border = '0';
            },
            chooseItem2() {
                this.$refs.theme2.style.border = 'solid 2px gray';
                this.$refs.tophead.style.background = '#87cbd8';
                this.$refs.theme1.style.border = '0';
                this.$refs.theme3.style.border = '0';
            },
            chooseItem3() {
                this.$refs.theme3.style.border = 'solid 2px gray';
                this.$refs.tophead.style.background = '#D6A2E8';
                this.$refs.theme2.style.border = '0';
                this.$refs.theme1.style.border = '0';
            }
        }
    }
</script>

<style scoped>
    @import '../common/css/icon.css';

    .theme {
        position: fixed;
        z-index: 100;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        /*background: rgba(214,162,232);*/
    }

    .theme1 {
        background: #ff7675;
    }

    .theme2 {
        background: #87cbd8;
    }

    .theme3 {
        background: #D6A2E8;
    }

    .back {
        position: absolute;
        top: 0;
        left: 6px;
        z-index: 50;
    }

    .icon-back {
        display: block;
        padding: 10px;
        font-size: 20px;
        /*//color: rgb(102, 153, 204);*/
    }

    .choose {
        position: absolute;
        top: 0;
        right: 6px;
        z-index: 50;
    }

    .choosetext {
        display: block;
        padding: 10px;
        font-size: 15px;
        color: white;
    }

    .tophead {
        position: relative;
        height: 10%;
    }

    .content {
        position: relative;
        height: 100%;
        background: rgba(255, 255, 255, 0.9);
    }

    .content .title {
        padding-top: 30px;
        color: white;
    }

    .content .text {
        padding-top: 10px;
        color: white;
    }

    .slide-enter-active, .slide-leave-active {
        transition: all 0.3s;
    }

    .slide-enter, .slide-leave-to {
        transform: translate3d(100%, 0, 0);
    }

</style>
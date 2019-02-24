<template>
    <div class="progress-bar" ref="progressBar">
        <div class="bar-inner">
            <div class="progress" ref="progress"></div>
            <div class="progress-btn-wrapper" ref="progressBtn"
                 @touchstart.prevent="progressTouchStart"
                 @touchmove.prevent="progressTouchMove"
                 @touchend="progressTouchEnd"
            >
                <div class="progress-btn"></div>
            </div>
        </div>
    </div>
</template>

<script>
    const progressBtnWidth = 16;
    //const transform = prefixStyle('transform');
    export default {
        name: "progress-bar",
        props: {
            percent: {
                type: Number,
                default: 0
            }
        },
        methods: {
            progressTouchStart(e) {
                this.touch.initiated = true;
                this.touch.startX = e.touches[0].pageX;
                this.touch.left = this.$refs.progress.clientWidth;
            },
            progressTouchMove(e) {
                if (!this.touch.initiated) {
                    return
                }
                const deltaX = e.touches[0].pageX - this.touch.startX;
                const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth, Math.max(0, this.touch.left + deltaX));
                this._offset(offsetWidth);
            },
            progressTouchEnd() {
                this.touch.initiated = false;
                this._triggerPercent();
            },
            // progressClick(e) {
            //     const rect = this.$refs.progressBar.getBoundingClientRect()
            //     const offsetWidth = e.pageX - rect.left
            //     this._offset(offsetWidth)
            //     // 这里当我点击 progressBtn 的时候，e.offsetX 获取不对
            //     // this._offset(e.offsetX)
            //     this._triggerPercent()
            // },
            //计算出滑动进度条的百分比
            _triggerPercent() {
                const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;
                const percent = this.$refs.progress.clientWidth / barWidth;
                //console.log("percent:"+percent);
                this.$emit('percentChange', percent);
            },
            _offset(offsetWidth) {
                this.$refs.progress.style.width = `${offsetWidth}px`;
                this.$refs.progressBtn.style['transform'] = `translate3d(${offsetWidth}px,0,0)`;
                this.$refs.progressBtn.style['webkitTransform'] = `translate3d(${offsetWidth}px,0,0)`;
            }
        },
        watch: {
            percent(newPercent) {
                if (newPercent >= 0 && !this.touch.initiated) {
                    const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;
                    const offsetWidth = newPercent * barWidth;//偏移量
                    this._offset(offsetWidth);
                }
            }
        },
        created() {
            this.touch = {};
        }
    }
</script>

<style scoped>
    .progress-bar {
        height: 30px;
    }

    .bar-inner {
        position: relative;
        top: 13px;
        height: 4px;
        background: rgba(0, 0, 0, 0.3);
    }

    .bar-inner .progress {
        position: absolute;
        height: 100%;
        background: rgb(135,203,216);
    }

    .bar-inner .progress-btn-wrapper {
        position: absolute;
        left: -8px;
        top: -13px;
        width: 30px;
        height: 30px;
    }

    .bar-inner .progress-btn-wrapper .progress-btn {
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid #fff;
        border-radius: 50%;
        background: rgb(135,203,216);
    }
</style>
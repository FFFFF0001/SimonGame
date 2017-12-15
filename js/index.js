new Vue({
    el: '.main',
    watch: {
        isPause: function (newValue, oldValue) {
            let me = this;
            this.toggleVoice();
            if (!newValue && this.isStart) {
                if (this.step === "--") {
                    this.step = Number(1);
                } else if (typeof this.step === "number") {
                    setTimeout(function () {
                        me.colorRucks = [];
                        me.chooseRucks = [];
                        me.gameOnto(me.step);
                    }, me.exeTime);
                }
            }
        },
        strictMode: function () {
            this.toggleVoice();
        },
        step: function (newValue, oldValue) {
            let me = this;
            if (typeof newValue === "number") {
                if (newValue <= 20) {
                    setTimeout(function () {
                        me.gameOnto(me.step);
                    }, me.exeTime);
                }
            } else if (this.step === this.ERROR_FLAG) {
                me.isMistake = true;
                setTimeout(function () {
                    me.isMistake = false;
                }, me.exeTime);
                if (this.strictMode) {
                    // 如果是严格模式，错了直接重1开始
                    this.init();
                } else {
                    // 如果不是，则从当前关卡，重新随机
                    setTimeout(function () {
                        me.step = oldValue;
                        me.gameOnto(step);
                    }, me.exeTime);
                }
            }
        },
        isGreenClick: function (newValue, oldValue) {
            let me = this;
            if (newValue) {
                $(".col-green").css("background-color", "green");
                setTimeout(function () {
                    me.isGreenClick = false;
                }, me.colorExTime);
            } else {
                $(".col-green").css("background-color", "#02C39A");
            }
        },
        isRedClick: function (newValue, oldValue) {
            let me = this;
            if (newValue) {
                $(".col-red").css("background-color", "red");
                setTimeout(function () {
                    me.isRedClick = false;
                }, me.colorExTime);
            } else {
                $(".col-red").css("background-color", "#F85959");
            }
        },
        isYellowClick: function (newValue, oldValue) {
            let me = this;
            if (newValue) {
                $(".col-yellow").css("background-color", "yellow");
                setTimeout(function () {
                    me.isYellowClick = false;
                }, me.colorExTime);
            } else {
                $(".col-yellow").css("background-color", "#FCCF4D");
            }
        },
        isBlueClick: function (newValue, oldValue) {
            let me = this;
            if (newValue) {
                $(".col-blue").css("background-color", "blue");
                setTimeout(function () {
                    me.isBlueClick = false;
                }, me.colorExTime);
            } else {
                $(".col-blue").css("background-color", "#00649F");
            }
        },
    },
    data() {
        return {
            isPause: true,
            isStart: false,
            isGreenClick: false,
            isRedClick: false,
            isYellowClick: false,
            isBlueClick: false,
            step: "",
            rules: [0, 1, 2, 3],
            colorRucks: [], // 储存随机生成的颜色信息
            chooseRucks: [],
            isDisableTouch: "pointer-events: none;",// 当设置为这个属性时，禁用掉了各种事件
            canClick: false,
            exeTime: 1000,
            colorExTime: 550,
            strictMode: false,
            ERROR_FLAG: "!!",
            clickToggle: false,
            isMistake: false
        }
    },
    methods: {
        init() {
            this.isDisableTouch = "pointer-events: none;";
            this.step = "";
            this.isPause = true;
            this.strictMode = false;
            this.canClick = false;
            this.colorRucks = []; // 储存随机生成的颜色信息
            this.chooseRucks = [];
            this.isStart = false;
        },
        startGame() {
            if (this.isStart) {
                // 游戏关闭状态
                this.init();
                return;
            } else {
                // 游戏开始状态
                this.isDisableTouch = "";
                this.step = "--";
            }
            this.isStart = !this.isStart;
        },
        startAndPause() {
            this.isPause = !this.isPause;
        },
        gameOnto(step) {
            this.canClick = false;
            let me = this;
            for (let i = 0; i < step; i++) {
                this.colorRucks.push(this.rules[parseInt(Math.random() * 4)])
            }
            for (let i = 0; i < this.colorRucks.length; i++) {
                setTimeout(function () {
                    me.lightColor(me.colorRucks[i]);
                }, i * 850);
            }
            setTimeout(function () {
                me.canClick = true;
            }, this.colorRucks.length * this.exeTime)
        },
        clickColor(color) {
            if (this.canClick) {
                this.chooseRucks.push(color);
                if (this.chooseRucks.length <= this.colorRucks.length) {
                    if (this.colorRucks[this.chooseRucks.length - 1] !== color) {
                        this.clickError();
                        return;
                    }
                }
                this.lightColor(color);
                if (this.chooseRucks.length === this.colorRucks.length) {
                    this.clickRight();
                }
            }
        },
        lightColor(val) {
            switch (val) {
                case 0:
                    this.isGreenClick = true;
                    break;
                case 1:
                    this.isRedClick = true;
                    break;
                case 2:
                    this.isYellowClick = true;
                    break;
                case 3:
                    this.isBlueClick = true;
                    break;
            }
        },
        increaseStep() {
            this.step++;
        },
        clickRight() {
            this.increaseStep();
            this.canClick = false;
            this.chooseRucks = [];
            this.colorRucks = [];
        },
        clickError() {
            this.canClick = false;
            this.chooseRucks = [];
            this.colorRucks = [];
            this.step = this.ERROR_FLAG;
        },
        toggleVoice() {
            let me = this;
            me.clickToggle = true;
            setTimeout(function () {
                me.clickToggle = false;
            }, me.exeTime);
        }
    }
});
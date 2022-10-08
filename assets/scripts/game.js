cc.Class({
    extends: cc.Component,

    properties: {
        rope_node: {
            default: null,
            type: cc.Node
        },
        cow_ins: {
            default: null,
            type: cc.Node
        },
        rope_imgs: {
            default: [],
            type:cc.SpriteFrame
        },
        cow_prefab: {
            default: null,
            type:cc.Prefab
        },
        time:0
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.success = false;
        // 初始分数
        this.scoreNum = 0;
    },

    start() {
        let countDownLabel = cc.find("Canvas/bg_sprite/count_down").getComponent(cc.Label);
        countDownLabel.string = this.time + "s";
        this.schedule(function () { 
            this.time--;
            countDownLabel.string = this.time + "s";
        }, 1);
    },

    // update (dt) {},
    
    /**
     * 捕获按钮点击事件
     * @param event 
     * @param customEventDate 
     */
    clickCapture(event, customEventDate) {
        this.rope_node.active = true;
        // 设置绳子在当前父节点的顺序
        this.rope_node.setSiblingIndex(100);

        // 设置绳子起始位置
        this.rope_node.y = -480;
        // 向上移动
        const up = cc.moveTo(0.5, this.rope_node.x, 0);

        // 判断结果
        let result = cc.callFunc(function () {
            // 获取当前牛的x点
            let currentX = this.cow_ins.x;
            if (currentX > -100 && currentX < 100) {
                cc.log("捕捉成功！");
                // 移除
                let bgNode = this.node.getChildByName("bg_sprite");
                bgNode.removeChild(this.cow_ins);
                // 获取牛儿的类型
                let ropeType = this.cow_ins.getComponent("cow").randomType + 1;
                this.rope_node.getComponent(cc.Sprite).spriteFrame = this.rope_imgs[ropeType];
                // 生成新的牛节点
                this.cow_ins = cc.instantiate(this.cow_prefab);
                this.cow_ins.y = 0;
                bgNode.addChild(this.cow_ins);
                this.success = true;
                // 分数+1
                this.scoreNum++;
            } else {
                cc.log("捕捉失败！")
            }
        }, this);

        // 往回拉
        let down = cc.moveTo(0.5, this.rope_node.x, -600);

        let finish = cc.callFunc(function () { 
            this.rope_node.getComponent(cc.Sprite).spriteFrame = this.rope_imgs[0];
            // 判断是否捕捉成功
            if (this.success === true) {
                let scoreLabel = cc.find("Canvas/bg_sprite/score").getComponent(cc.Label);
                scoreLabel.string = "Score:" + this.scoreNum;
                this.success = false;
            }
        }, this)
        

        // 定义一个序列动画
        let sequence = cc.sequence(up, result,down,finish);
        this.rope_node.runAction(sequence);
    }
});

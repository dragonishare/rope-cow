cc.Class({
    extends: cc.Component,

    properties: {
        rope_node: {
            default: null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

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
        this.rope_node.runAction(up);
    }
});

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
    }
});

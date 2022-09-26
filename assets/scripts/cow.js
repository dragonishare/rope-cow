// 用cc.class生成一个对象，包含数组皮肤
const cow_skin = cc.Class({
    name: "cow_skin",
    properties: {
        cows: {
            default: [],
            type: [cc.SpriteFrame]
        }
    }
})
cc.Class({
    extends: cc.Component,

    properties: {
        cow_sets: {
            default: [],
            type: [cow_skin]
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.intervalTime = 0;
        // 随机一种类型
        this.randomType = Math.floor(Math.random() * 3);
    },

    start() {

    },

    update(dt) {
        // 间隔时间
        this.intervalTime += dt;
        let index = Math.floor(this.intervalTime / 0.2);
        index = index % 3;
        // 获取一种牛的类型
        let cowSet = this.cow_sets[this.randomType];

        // 获取精灵组件
        let sprite = this.node.getComponent(cc.Sprite);
        sprite.spriteFrame = cowSet.cows[index];

    },
    runCallback() {
        // 随机一种类型
        this.randomType = Math.floor(Math.random() * 3);
    }
});

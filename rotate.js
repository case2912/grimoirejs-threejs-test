const Quaternion = gr.lib.math.Quaternion;
gr.register(function() {
    gr.registerComponent("Rotate", {
        attributes: {
            speed: {
                default: 1,
                converter: "Number"
            },
            axis: {
                default: [0, 1, 0],
                converter: "Vector3"
            }
        },
        $mount: function() {
            this.__bindAttributes();
            this._transform = this.node.getComponent("Transform");
        },
        $update: function() {
            this._transform.rotation = Quaternion.multiply(
                Quaternion.angleAxis(this.speed * 0.01, this.axis), this._transform.rotation);
        }
    });
});

gr(function() {
    const scene = gr("#main")("scene").single();
    const object = scene.addChildByName("object");
    object.addComponent("Rotate", {
        speed: 0.05
    });
    const dataNum = 4;
    const cellNum = 10;
    const radius = 15;
    const group = 2;
    const scale = 5;
    const padding = 1.2;
    const offsetX = Math.PI / cellNum;
    for (var j = 0; j < group; j++) {
        for (var i = 0; i < cellNum; i++) {
            const o = j % 2 === 0 ? offsetX : 0;
            let d = Math.ceil(Math.random() * dataNum);
            object.addChildByName("mesh", {
                scale: [scale * 0.4, scale * 0.3, 1],
                texture: "./data/img_0" + d + ".png",
                position: [
                    radius * Math.cos(-Math.PI * 2 / cellNum * i - o),
                    (-(group - 1) / 2 + j) * padding,
                    radius * Math.sin(-Math.PI * 2 / cellNum * i - o)
                ],
                rotation: Quaternion.eulerXYZ(0, Math.PI + Math.PI / 2 + Math.PI * 2 / cellNum * i + o, 0)
            });
        }
    }
});
class Bottle extends DrawableObject {
    offset = {
        left: 10,
        right: 10,
        top: 5,
        bottom: 5
    };


    constructor() {
        super();
        this.loadImage('../img/6_salsa_bottle/2_salsa_bottle_on_ground.png');

        this.width = 60;
        this.height = 60;
        this.y = 370;
        this.x = 250 + Math.random() * 1300;
    }
}
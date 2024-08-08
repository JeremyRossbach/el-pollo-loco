class Coin extends DrawableObject {
    offset = {
        left: 30,
        right: 30,
        top: 30,
        bottom: 30
    };


    constructor() {
        super();
        this.loadImage('../img/8_coin/coin_1.png');

        this.width = 100;
        this.height = 100;
        this.y = 330 - Math.random() * 200;
        this.x = 250 + Math.random() * 1300;
    }
}
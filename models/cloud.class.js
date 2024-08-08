class Cloud extends MoveableObject {
    y = 10;
    width = 500;
    height = 300;


    constructor() {
        super().loadImage('../img/5_background/layers/4_clouds/1.png');

        this.animate();
    }


    /**
     * let the clouds move to the left
     */
    animate() {
        this.moveLeft();
    }
}
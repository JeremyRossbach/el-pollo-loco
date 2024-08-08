class Smallchicken extends MoveableObject {
    IMAGES_WALKING = [
        '../img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        '../img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        '../img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    IMAGE_DEAD = '../img/3_enemies_chicken/chicken_small/2_dead/dead.png';
    offset = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    };
    y = 375;
    width = 45;
    height = 45;
    energy = 20;


    constructor() {
        super().loadImage('../img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImage(this.IMAGE_DEAD);
        this.animate();

        this.x = 1000 + Math.random() * 1000;
        this.speed = 0.5 + Math.random() * 1.5;
    }


    /**
     * sets interval so the chicken can move and play animations
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);


        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 100);
    }
}
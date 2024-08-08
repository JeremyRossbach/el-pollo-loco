class ThrowableObject extends MoveableObject {
    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    constructor(x, y) {
        super().loadImage('../img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 60;
        this.throw();
    }


    /**
     * checks if bottles are available to throw, updates the bottle bar and sets gravity to a thrown bottle
     */
    throw() {
        world.character.bottles -= 20;
        if (world.character.bottles < 0) {
            world.character.bottles = 0;
        }
        world.bottleBar.setPercentage(world.character.bottles);
        this.speedY = 30;
        this.applyGravity();
        if (world.character.otherDirection) {
            this.throwLeft();
        } else {
            this.throwRight();
        }
    }


    /**
     * throws bottle to the left side
     */
    throwLeft() {
        setInterval(() => {
            this.x -= 10;
        }, 25);
    }


    /**
     * throws bottle to the right side
     */
    throwRight() {
        setInterval(() => {
            this.x += 10;
        }, 25);
    }
}
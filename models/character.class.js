class Character extends MoveableObject {
    IMAGES_LONGIDLE = [
        '../img/2_character_pepe/1_idle/long_idle/I-11.png',
        '../img/2_character_pepe/1_idle/long_idle/I-12.png',
        '../img/2_character_pepe/1_idle/long_idle/I-13.png',
        '../img/2_character_pepe/1_idle/long_idle/I-14.png',
        '../img/2_character_pepe/1_idle/long_idle/I-15.png',
        '../img/2_character_pepe/1_idle/long_idle/I-16.png',
        '../img/2_character_pepe/1_idle/long_idle/I-17.png',
        '../img/2_character_pepe/1_idle/long_idle/I-18.png',
        '../img/2_character_pepe/1_idle/long_idle/I-19.png',
        '../img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];
    IMAGES_IDLE = [
        '../img/2_character_pepe/1_idle/idle/I-1.png',
        '../img/2_character_pepe/1_idle/idle/I-2.png',
        '../img/2_character_pepe/1_idle/idle/I-3.png',
        '../img/2_character_pepe/1_idle/idle/I-4.png',
        '../img/2_character_pepe/1_idle/idle/I-5.png',
        '../img/2_character_pepe/1_idle/idle/I-6.png',
        '../img/2_character_pepe/1_idle/idle/I-7.png',
        '../img/2_character_pepe/1_idle/idle/I-8.png',
        '../img/2_character_pepe/1_idle/idle/I-9.png',
        '../img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGES_WALKING = [
        '../img/2_character_pepe/2_walk/W-21.png',
        '../img/2_character_pepe/2_walk/W-22.png',
        '../img/2_character_pepe/2_walk/W-23.png',
        '../img/2_character_pepe/2_walk/W-24.png',
        '../img/2_character_pepe/2_walk/W-25.png',
        '../img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        '../img/2_character_pepe/3_jump/J-31.png',
        '../img/2_character_pepe/3_jump/J-32.png',
        '../img/2_character_pepe/3_jump/J-33.png',
        '../img/2_character_pepe/3_jump/J-34.png',
        '../img/2_character_pepe/3_jump/J-35.png',
        '../img/2_character_pepe/3_jump/J-36.png',
        '../img/2_character_pepe/3_jump/J-37.png',
        '../img/2_character_pepe/3_jump/J-38.png',
        '../img/2_character_pepe/3_jump/J-39.png'
    ];
    IMAGES_HURT = [
        '../img/2_character_pepe/4_hurt/H-41.png',
        '../img/2_character_pepe/4_hurt/H-42.png',
        '../img/2_character_pepe/4_hurt/H-43.png'
    ];
    IMAGES_DEAD = [
        '../img/2_character_pepe/5_dead/D-51.png',
        '../img/2_character_pepe/5_dead/D-52.png',
        '../img/2_character_pepe/5_dead/D-53.png',
        '../img/2_character_pepe/5_dead/D-54.png',
        '../img/2_character_pepe/5_dead/D-55.png',
        '../img/2_character_pepe/5_dead/D-56.png',
        '../img/2_character_pepe/5_dead/D-57.png'
    ];
    offset = {
        left: 25,
        right: 40,
        top: 80,
        bottom: 10
    };
    y = 140;
    speed = 5;
    world;
    idleStartTime = null;


    constructor() {
        super().loadImage('../img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONGIDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
        this.animate();
    }


    /**
     * sets interval so the character can move and play animations and sounds
     */
    animate() {
        setInterval(() => this.moveCharacter(), 1000 / 60);
        setInterval(() => this.playCharacterAnimations(), 100);
    }


    /**
     * lets the character move
     */
    moveCharacter() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            run_sound.play();
            this.otherDirection = false;
        }

        if (this.world.keyboard.LEFT && this.x > -600) {
            this.moveLeft();
            run_sound.play();
            this.otherDirection = true;
        }

        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            jump_sound.play();
            this.jump();
        }
        this.world.camera_x = -this.x + 100;
    }


    /**
     * plays the animations of the character
     */
    playCharacterAnimations() {
        if (this.isDead()) {
            this.characterIsDead();
        } else if (this.isHurt() && !this.isAboveGround()) {
            this.characterIsHurt();
        } else if (this.isAboveGround()) {
            this.characterIsJumping();
        } else if (this.isMoving()) {
            this.characterIsWalking();
        } else {
            this.checkIdle();
        }
    }


    /**
     * plays characters dead animation
     */
    characterIsDead() {
        this.playAnimation(this.IMAGES_DEAD);
        dead.play();
        gameOver();
        setInterval(() => {
            this.showImage(this.IMAGES_DEAD[6]);
        }, this.IMAGES_DEAD.length * 100);
        setInterval(() => {
            gameDone();
        }, this.IMAGES_DEAD.length * 150);
    }


    /**
     * plays characters hurt animation
     */
    characterIsHurt() {
        this.playAnimation(this.IMAGES_HURT);
        hurt.play();
        this.idleStartTime = null;
    }


    /**
     * plays characters jump animation
     */
    characterIsJumping() {
        this.playAnimation(this.IMAGES_JUMPING);
        this.idleStartTime = null;
        console.log(world.character.speedY);
    }


    /**
     * plays characters walk animation
     */
    characterIsWalking() {
        this.playAnimation(this.IMAGES_WALKING);
        this.idleStartTime = null;
    }


    /**
     * checks if character is moving
     */
    isMoving() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT
    }


    /**
     * checks if idle animation is less or longer than 5s ago and starts specific animation
     */
    checkIdle() {
        if (this.idleStartTime === null) {
            this.idleStartTime = Date.now();
        }
        let idleTime = (Date.now() - this.idleStartTime) / 1000;

        if (idleTime > 5) {
            this.playAnimation(this.IMAGES_LONGIDLE);
        } else {
            this.playAnimation(this.IMAGES_IDLE);
        }
    }


    /**
     * updates the shown image of the character
     * 
     * @param {string} image - is a specific path of an image
     */
    showImage(image) {
        this.img = this.imageCache[image];
    }
}
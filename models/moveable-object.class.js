class MoveableObject extends DrawableObject {
    speed = 0.15;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    coins = 0;
    bottles = 0;
    lastHit = 0;
    otherDirection = false;
    offset = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    };


    /**
     * applys gravity to the character
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }


    /**
     * checks if the character collides with a character or item and returns a boolean
     * 
     * @param {object} mo - is a specific character or item
     * @returns {boolean}
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left && // R -> L
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top && // T -> B
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right && // L -> R
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom; // B -> T
    }


    /**
     * damages a character
     */
    hit() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * collects coins
     */
    collectCoins() {
        this.coins += 20;
        if (this.coins < 0) {
            this.coins = 0;
        }
    }


    /**
     * collects bottles
     */
    collectBottles() {
        this.bottles += 20;
        if (this.bottles < 0) {
            this.bottles = 0;
        }
    }


    /**
     * checks if a hit is less or longer than 1s ago and returns a boolean
     * 
     * @returns {boolean}
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }


    /**
     * checks if the character is dead and returns a boolean
     * 
     * @returns {boolean}
     */
    isDead() {
        return this.energy == 0;
    }


    /**
     * checks if character is above the ground and returns a boolean
     * 
     * @returns {boolean}
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 230;
        }
    }


    /**
     * shows the different images in a array
     * 
     * @param {string} images - a spacific path of an image
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    /**
     * moves a character to the right
     */
    moveRight() {
        this.x += this.speed;
    }


    /**
     * moves a character to the left
     */
    moveLeft() {
        this.x -= this.speed;
    }


    /**
     * lets a character jump 
     */
    jump() {
        this.speedY = 30;
    }
}
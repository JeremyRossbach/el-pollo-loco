class World {
    character = new Character();
    statusBar = new StatusBar();
    coin = new Coin();
    coinBar = new CoinBar();
    bottle = new Bottle();
    bottleBar = new BottleBar();
    endboss = new Endboss();
    endbossBar = new EndbossBar();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = -100;
    lastThrow = 0;
    throwableObjects = [];
    IMAGE_DEAD = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';
    jumpedOnEnemy = false;
    gamePaused = false;
    thrown = false;
    fallsDown = false;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }


    /**
     * sets the character into the world
     */
    setWorld() {
        this.character.world = this;
    }


    /**
     * sets interval to activate different functions, which are checking actions
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkCoinCollection();
            this.checkBottleCollection();
            this.checkThrowObject();
            this.checkBottleEndbossCollision();
        }, 100);

        setInterval(() => {
            this.checkJumpOn();
        }, 1000 / 60);
    }


    /**
     * checks if the character jumped on an enemy
     */
    checkJumpOn() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.jumpsOnChicken(enemy, index)) {
                this.killEnemy(index);
            }
        });
    }


    /**
     * returns boolean, whether jumpes on chicken or not
     * 
     * @param {object} enemy - is a specific enemy in the game
     * @param {number} index - number of a specific enemy in the game 
     * @returns {boolean}
     */
    jumpsOnChicken(enemy, index) {
        return this.character.isColliding(enemy) &&
            world.character.isAboveGround() &&
            world.character.speedY < 0 &&
            index < this.level.enemies.length - 1;
    }


    /**
     * kills an enemy
     * 
     * @param {number} index - index of chicken which got killed
     */
    killEnemy(index) {
        this.jumpedOnEnemy = true;
        world.character.jump();
        this.level.enemies.splice(index, 1);
        this.jumpedOnEnemy = false;
    }


    /**
     * checks collision betwenn character and enemies
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy, index) && !this.jumpsOnChicken(enemy, index)) {
                this.characterHitted();
            }
        });
    }


    /**
     * hits the character
     */
    characterHitted() {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
    }


    /**
     * checks if a coin is collected
     */
    checkCoinCollection() {
        this.level.coin.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.collectedCoin(index);
            }
        });
    }


    /**
     * collect coin 
     * 
     * @param {number} index - index of collected coin 
     */
    collectedCoin(index) {
        this.character.collectCoins();
        this.coinBar.setPercentage(this.character.coins);
        this.level.coin.splice(index, 1);
    }


    /**
     * checks if a bottle is collected
     */
    checkBottleCollection() {
        this.level.bottle.forEach((bottle, index) => {
            if (this.character.isColliding(bottle) && this.character.bottles < 100) {
                this.collectedBottle(index);
            }
        });
    }


    /**
     * collect bottle
     * 
     * @param {number} index - index of collected bottle
     */
    collectedBottle(index) {
        this.character.collectBottles();
        this.bottleBar.setPercentage(this.character.bottles);
        this.level.bottle.splice(index, 1);
    }


    /**
     * checks if a bottle is thrown
     */
    checkThrowObject() {
        if (this.keyboard.D) {
            if (world.character.bottles > 0 && this.bottleThrown()) {
                if (world.character.otherDirection) {
                    this.startLeft();
                } else {
                    this.startRight();
                }
                this.lastThrow = new Date().getTime();
            }
        }
    }


    /**
     * thrown bottle starts from the left side of the character
     */
    startLeft() {
        let bottle = new ThrowableObject(this.character.x - 0, this.character.y + 100);
        this.throwableObjects.push(bottle);
    }


    /**
     * thrown bottle starts from the right side of the character
     */
    startRight() {
        let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
        this.throwableObjects.push(bottle);
    }


    /**
     * returns boolean, whether throw of bottle is more or less than 1.5s ago
     * 
     * @returns {boolean}
     */
    bottleThrown() {
        let timePassed = new Date().getTime() - this.lastThrow;
        timePassed = timePassed / 1000;
        return timePassed > 1;
    }


    /**
     * checks if a bottle collides with the endboss
     */
    checkBottleEndbossCollision() {
        this.throwableObjects.forEach((bottle, index) => {
            if (this.level.enemies[this.level.enemies.length - 1].isColliding(bottle)) {
                this.endbossHitted(index);
            }
        });
    }


    /**
     * hits the endboss
     * 
     * @param {number} index - index of hitted enemy (endboss)
     */
    endbossHitted(index) {
        this.throwableObjects.splice(index, 1);
        this.level.enemies[this.level.enemies.length - 1].hit();
        this.endbossBar.setPercentage(this.level.enemies[this.level.enemies.length - 1].energy);
    }


    /**
     * draws everything onto the canvas
     */
    draw() {
        if (!this.gamePaused) {
            this.drawBackground();
            this.drawStatusbars();
            this.drawObjects();
            self = this;
            requestAnimationFrame(function () {
                self.draw();
            });
        }
    }


    /**
     * draws the background elements onto the canvas and sets the camera position
     */
    drawBackground() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0);
    }


    /**
     * draws the statusbars onto the canvas
     */
    drawStatusbars() {
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.endbossBar);
    }


    /**
     * draws the objects onto the canvas and sets the camera position
     */
    drawObjects() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coin);
        this.addObjectsToMap(this.level.bottle);
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
    }


    /**
     * adds objects to the game
     * 
     * @param {Array} objects - arrays of images
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    /**
     * draws specific objects into the game
     * 
     * @param {object} mo - specific objects in the game
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    /**
     * flips the image of the character if he moves to the left
     * 
     * @param {object} mo - is a specific character
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    /**
     * flips back the image of the character if he moves to the right
     * 
     * @param {object} mo  - is a specific character
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}
class Level {
    enemies;
    coin;
    bottle;
    clouds;
    backgroundObjects;
    level_end_x = 1530;


    constructor(enemies, coin, bottle, clouds, backgroundObjects) {
        this.coin = coin;
        this.bottle = bottle;
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}
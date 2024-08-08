class DrawableObject {
    x = 120;
    y = 230;
    height = 200;
    width = 150;
    img;
    imageCache = {};
    currentImage = 0;


    /**
     * 
     * 
     * @param {string} path - a specific path of an image
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    /**
     * draws everthing on the canvas
     * 
     * @param {object} ctx - canvas rendering context
     */
    draw(ctx) {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    /**
     * loads every image of the game
     * 
     * @param {Array} arr - array of images
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}
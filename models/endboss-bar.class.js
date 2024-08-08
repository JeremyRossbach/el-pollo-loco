class EndbossBar extends DrawableObject {
    IMAGES_STATUSBAR = [
        '../img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        '../img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        '../img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        '../img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        '../img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        '../img/7_statusbars/2_statusbar_endboss/blue/blue100.png'
    ];
    percentage = 100;


    constructor() {
        super();
        this.loadImages(this.IMAGES_STATUSBAR);
        this.x = 500;
        this.y = 7;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }


    /**
     * updates the enboss bar
     * 
     * @param {number} percentage - a number of a certain amount of health the endboss has left
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_STATUSBAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


    /**
     * retruns a certain number, which renders a specific image
     * 
     * @returns {number} - number = image
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else
        if (this.percentage == 80) {
            return 4;
        } else 
        if (this.percentage == 60) {
            return 3;
        } else
        if (this.percentage == 40) {
            return 2;
        } else
        if (this.percentage == 20) {
            return 1;
        } else {
            return 0;
        }
    }
}
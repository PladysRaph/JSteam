export default class Avatar {
    image;
    width;
    height;

    constructor(url, width, height) {
        this.image = new Image();
        this.image.src = url;
        this.width = width;
        this.height = height;
    }
}
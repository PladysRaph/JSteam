export default class Avatar {

    // Avatar sous format image
    static renderImage(url) {
        let image = new Image();
        image.src = url;
        image.width = 100;
        image.height = 100;
        return image;
    }
}
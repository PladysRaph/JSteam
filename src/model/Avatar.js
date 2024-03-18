export default class Avatar {

    // Avatar sous format image
    static renderImage(url) {
        let image = new Image();
        image.src = url;
        return image;
    }
}
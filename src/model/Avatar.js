export default class Avatar {

    // Avatar personnalisé
    static renderFigure(ctx, {colorFill, colorBorder, shape}) {
        return () => {
            // À IMPLÉMENTER...
        }
    }

    // Avatar sous format image
    static renderImage(url) {
        let image = new Image();
        image.src = url;
        return image;
    }
}
import Bullet from '../model/Bullet.js'

export default class ObjectMapper {

    static #swap(arr, idx1, idx2) {
        let tmp = arr[idx2];
        arr[idx2] = arr[idx1];
        arr[idx1] = tmp;
    }

    static deserialize(object, type) {
        let attributes = Object.values(object);

        // Supprimer un attribut qui n'est pas passé dans le constructeur de la classe Enemy
        if(type.name === 'Enemy')
            attributes.splice(6, 1);
        else if(type.name === 'Player') {
            // On échange et supprime quelques attributs pour maintenir l'ordre des paramètres du constructeur
            ObjectMapper.#swap(attributes, 4, 1);
            ObjectMapper.#swap(attributes, 8, 2);
            ObjectMapper.#swap(attributes, 4, 3);
            ObjectMapper.#swap(attributes, 8, 4);
            ObjectMapper.#swap(attributes, 9, 6);
            ObjectMapper.#swap(attributes, 12, 6);
            attributes.splice(7, 6);
        }

        attributes = attributes.map(attribute => {
            // On réinstancie 'Bullet' car il comporte des méthodes
            // attribute est un objet, on ne connaît pas le nom de la classe donc je vérifie que l'attribut TTLs (existant uniquement dans Bullet) n'est pas undefined
            if(attribute.TTLs != undefined) {
                let valuesBullet = Object.values(attribute);
                // On supprime la valeur d'attribut 'release' (il n'est pas passé en paramètre du constructeur)
                valuesBullet.splice(8, 1);
                return Reflect.construct(Bullet, valuesBullet);
            } else
                return attribute;
        });

        return  
    }
}
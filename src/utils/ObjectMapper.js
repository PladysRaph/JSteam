import Bullet from '../model/Bullet.js'

export default class ObjectMapper {

    static deserialize(object, type) {
        let attributes = Object.values(object);

        // Supprimer un attribut qui n'est pas passé dans le constructeur de la classe Enemy
        if(type.name === 'Enemy')
            attributes.splice(6, 1);
        else if(type.name === 'Player') {
        }

        attributes = attributes.map(attribute => {
            // On réinstancie 'Bullet' car il comporte des méthodes
            // attribute est un objet, on ne connaît pas le nom de classe donc je vérifie que l'attribut TTLs (existant uniquement dans Bullet) n'est pas undefined
            if(attribute.TTLs != undefined) {
                let valuesBullet = Object.values(attribute);
                // On supprime la valeur d'attribut 'release' (il n'est pas passé en paramètre du constructeur)
                valuesBullet.splice(8, 1);
                return Reflect.construct(Bullet, valuesBullet);
            } else
                return attribute;
        });

        return Reflect.construct(type, attributes);
    }
}
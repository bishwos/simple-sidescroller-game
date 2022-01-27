import {Platform} from "@/objects/Platform";
import {GenericObject} from "@/objects/GenericObject";
import {Player} from "@/objects/Player";

export class ObjectFactory {
    constructor({game}) {
        this.game = game
    }

    createPlatform({x, y, image}) {
        return new Platform({game: this.game, x, y, image})
    }

    createParallaxed({x, y, image}) {
        return new GenericObject({game: this.game, x, y, image})
    }

    createPlayer() {
        return new Player({game: this.game})
    }
}
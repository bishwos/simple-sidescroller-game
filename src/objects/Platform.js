import {GenericObject} from "@/objects/GenericObject";

export class Platform extends GenericObject{
    constructor({game, x, y, image}) {
        super({game, x, y, image})
    }
    get x() {
        return this.position.x - this.game.scrollOffset
    }
    isOn(player) {
        return player.position.y + player.height <= this.position.y
        && player.position.y + player.height + player.velocity.y >= this.position.y
        && player.screenX >= this.x
        && player.screenX <= this.x + this.width
    }
}
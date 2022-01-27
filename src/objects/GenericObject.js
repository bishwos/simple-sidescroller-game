export class GenericObject {
    constructor({game, x, y, image}) {
        this.game = game
        this.position = {x, y}
        this.image = image;
        this.width = image.width
        this.height = image.height
    }
    get x() {
        return this.position.x - (this.game.scrollOffset * .66)
    }
    isOn() {
        return false
    }
    draw() {
        this.game.c.drawImage(this.image, this.x, this.position.y)
    }
}
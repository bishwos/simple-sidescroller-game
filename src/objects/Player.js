import spriteStandRight from "@/assets/spriteStandRight.png";
import spriteStandLeft from "@/assets/spriteStandLeft.png";
import spriteRunRight from "@/assets/spriteRunRight.png";
import spriteRunLeft from "@/assets/spriteRunLeft.png";
import {createImage} from "@/factories/createImage";
import {keys} from "@/commands/KeyCommand";

export const gravity = .5
export class Player {
    constructor({game}) {
        this.game = game
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 66;
        this.height = 150;
        this.speed = 15
        this.turbo = 3
        this.frame = 0
        this.right = true
        const that = this
        this.sprites = {
            stand: {
                right: createImage(spriteStandRight),
                left: createImage(spriteStandLeft),
                cropWidth: 177,
                width: 66,
                frames: 59,
                get image() {
                    if (that.right)
                        return this.right
                    return this.left
                }
            },
            run: {
                right: createImage(spriteRunRight),
                left: createImage(spriteRunLeft),
                cropWidth: 341,
                width: 127.875,
                frames: 29,
                get image() {
                    if (that.right)
                        return this.right
                    return this.left
                }
            }
        }
    }

    get x() {
        return this.position.x + this.game.scrollOffset
    }

    get screenX() {
        if (this.x > 400)
            return 400
        return this.x
    }

    draw() {
        this.frame++
        if (this.frame > this.sprite.frames) this.frame = 0
        this.calculateVelocity()
        this.calculateDirection()
        this.position.y += this.velocity.y
        const sprite = this.sprite
        this.game.c.drawImage(sprite.image, sprite.cropWidth * this.frame, 0, sprite.cropWidth, 400, this.screenX, this.position.y, sprite.width, this.height)
    }

    calculateVelocity() {
        this.doGravity()
        if (keys.right.pressed) {
            this.velocity.x = this.speed
        } else if (keys.left.pressed) {
            this.velocity.x = -this.speed
        } else {
            this.velocity.x = 0
        }

        if (keys.shift.pressed) {
            this.velocity.x *= this.turbo
        }

    }

    doGravity() {
        if (keys.up.pressed && this.velocity.y === 0) {
            this.velocity.y -= 8 + this.velocity.x * .6 * gravity
        }
        if (this.position.y + this.height + this.velocity.y < this.game.canvas.height)
            this.velocity.y += gravity

        this.game.platforms.forEach(platform => {
            if (platform.isOn(this)) {
                this.velocity.y = 0
            }
        })
    }

    calculateDirection() {
        if (this.velocity.x > 0)
            this.right = this.velocity.x > 0
        if (this.velocity.x < 0)
            this.right = false
    }

    get sprite() {
        if (this.velocity.x !== 0)
            return this.sprites.run
        return this.sprites.stand
    }
}
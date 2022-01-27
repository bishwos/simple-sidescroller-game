import {createImage} from "@/factories/createImage";
import platform from "@/assets/platform.png";
import platformSmallTall from "@/assets/platformSmallTall.png";
import background from "@/assets/background.png";
import hills from "@/assets/hills.png";
import {ObjectFactory} from "@/factories/ObjectFactory";
import {Loader} from "@/loader";

const platformImage = createImage(platform)
const platformSmallTallImage = createImage(platformSmallTall)
export class Game {
    constructor() {
        this.canvas = document.querySelector('canvas')
        this.c = this.canvas.getContext('2d')
        this.objectFactory = new ObjectFactory({game: this})
        this.platforms = []
        this.player = null
        this.scrollOffset = 0;
        Loader.loaded.then(()=>this.init())
    }
    init() {
        this.canvas.width = 1024
        this.canvas.height = 574
        this.start()
        this.animate()
    }
    animate() {
        const c = this.canvas.getContext('2d')
        c.fillStyle = 'white'
        c.fillRect(0, 0, this.canvas.width, this.canvas.height)

        this.platforms.forEach(platform => platform.draw())
        this.player.draw()
        this.updateScrollOffset()

        if (this.scrollOffset > platformImage.width * 5 + 400 - 2) {
            console.log('winner winner')
        }
        if (this.player.position.y > this.canvas.height) {
            this.start()
        }
        window.requestAnimationFrame(() => this.animate())
    }
    updateScrollOffset() {
        this.scrollOffset += this.player.velocity.x
        if (this.scrollOffset < 0) {
            this.scrollOffset = 0
        }
    }
    start() {
        this.platforms = [
            this.objectFactory.createParallaxed({x: -1, y: -1, image: createImage(background)}),
            this.objectFactory.createParallaxed({x: 0, y: 0, image: createImage(hills)}),
            this.objectFactory.createPlatform({
                x: platformImage.width * 4 + 300 - 2 + platformImage.width - platformSmallTallImage.width,
                y: 270,
                image: platformSmallTallImage
            }),
            this.objectFactory.createPlatform({x: -1, y: 470, image: platformImage}),
            this.objectFactory.createPlatform({
                x: platformImage.width - 3,
                y: 470,
                image: platformImage
            }),
            this.objectFactory.createPlatform({
                x: platformImage.width * 2 + 100,
                y: 470,
                image: platformImage
            }),
            this.objectFactory.createPlatform({
                x: platformImage.width * 3 + 300,
                y: 470,
                image: platformImage
            }),
            this.objectFactory.createPlatform({
                x: platformImage.width * 4 + 300 - 2,
                y: 470,
                image: platformImage
            })
            ,
            this.objectFactory.createPlatform({
                x: platformImage.width * 5 + 800 - 2,
                y: 470,
                image: platformImage
            })
        ]
        this.scrollOffset = 0;
        this.player = this.objectFactory.createPlayer()
    }
}
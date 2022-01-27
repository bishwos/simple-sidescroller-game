import {Loader} from "@/loader";

export function createImage(imageSrc) {
    const image = new Image()
    image.src = imageSrc
    Loader.addImageLoader(image)
    return image
}
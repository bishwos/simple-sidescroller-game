export class Loader {
    static #promises = []

    static get loaded() {
        return Promise.allSettled(Loader.#promises)
    }

    static #add(promise) {
        Loader.#promises.push(promise)
    }

    static addImageLoader(image) {
        const promise = new Promise((resolve) => {
            image.onload = () => resolve()
        })
        this.#add(promise)
    }
}
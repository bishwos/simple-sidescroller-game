export const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
    up: {
        pressed: false
    },
    shift: {
        pressed: false
    },
    directionRight: true
}
export class KeyCommand {
    static start() {
        window.addEventListener('keydown', ({code, shiftKey}) => {
            keys.shift.pressed = shiftKey
            switch (code) {
                case 'KeyA':
                    keys.left.pressed = true
                    keys.directionRight = false
                    break;
                case 'KeyS': //S down
                    break;
                case 'KeyD': //D right
                    keys.right.pressed = true
                    keys.directionRight = true
                    break;
                case 'KeyW': //W Up
                case 'Space':
                    keys.up.pressed = true
                    break;
            }
        })
        window.addEventListener('keyup', ({code, shiftKey}) => {
            keys.shift.pressed = !shiftKey
            switch (code) {
                case 'KeyA':
                    keys.left.pressed = false
                    keys.directionRight = false
                    break;
                case 'KeyS': //S down
                    break;
                case 'KeyD': //D right
                    keys.right.pressed = false
                    keys.directionRight = true
                    break;
                case 'KeyW': //W Up
                case 'Space':
                    keys.up.pressed = false
                    break;
            }
        })
    }
}
import { UserStep } from './user-step'

window.addEventListener('DOMContentLoaded', (e) => {
    App.init()
})

var App = (function () {
    let isInitialized = false
    let config = null
    let root = null
    let main = null

    let init = function () {
        if (isInitialized) {
            return
        }

        buildTree()

        console.log('initialized')
        isInitialized = true
    };

    function buildTree() {
        main = document.getElementById('main')
                
        root = new UserStep(null)
        root.createIn('#main')
    }    

    return { init }
})()
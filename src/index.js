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

        bindUiActions()

        console.log('initialized')
        isInitialized = true
    };

    function buildTree() {
        main = document.getElementById('main')
                
        root = new UserStep(null)
        root.createIn('#main')
    }    

    function bindUiActions () {
        const tpb = document.getElementById('toggle-preview')        
        tpb.addEventListener('click', function(e) {
            e.preventDefault()
            let showPreview = tpb.getAttribute('data-preview')
            if(showPreview === 'on') {
                main.classList.add('no-preview')
                tpb.innerHTML = 'Show  Preview'
                tpb.setAttribute('data-preview', 'off')
            } else {
                main.classList.remove('no-preview')
                tpb.innerHTML = 'Hide  Preview'
                tpb.setAttribute('data-preview', 'on')
            }
        })
    }

    return { init }
})()
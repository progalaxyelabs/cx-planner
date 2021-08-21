import firebase from "firebase/app";
import "firebase/analytics";

import { UserStep } from './user-step'

window.addEventListener('DOMContentLoaded', (e) => {
    const firebaseConfig = {
        // ...
    };

    firebase.initializeApp(firebaseConfig);

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

    function bindUiActions() {
        const tpb = document.getElementById('toggle-preview')
        tpb.addEventListener('click', function (e) {
            e.preventDefault()
            let showPreview = tpb.getAttribute('data-preview')
            if (showPreview === 'on') {
                main.classList.add('no-preview')
                tpb.innerHTML = 'Show  Previews'
                tpb.setAttribute('data-preview', 'off')
            } else {
                main.classList.remove('no-preview')
                tpb.innerHTML = 'Hide  Previews'
                tpb.setAttribute('data-preview', 'on')
            }
        })

        const tstb = document.getElementById('toggle-step-toolbar')
        tstb.addEventListener('click', function (e) {
            e.preventDefault()
            let showPreview = tstb.getAttribute('data-step-toolbar')
            if (showPreview === 'on') {
                main.classList.add('no-step-toolbar')
                tstb.innerHTML = 'Show  Options'
                tstb.setAttribute('data-step-toolbar', 'off')
            } else {
                main.classList.remove('no-step-toolbar')
                tstb.innerHTML = 'Hide  Options'
                tstb.setAttribute('data-step-toolbar', 'on')
            }
        })
    }

    return { init }
})()
import firebase from "firebase/app";
import "firebase/analytics";
import { Modal } from 'bootstrap';
// import Cropper from 'cropperjs';

import { UserStep } from './user-step'

window.addEventListener('DOMContentLoaded', (e) => {
    const firebaseConfig = {
        // ...
    };

    firebase.initializeApp(firebaseConfig);

    App.init()
})

var PreviewImageSelection = (function () {
    let modalElement = null
    let modal = null
    let imgElement = null
    let previewDetail = null
    let isInitialized = false
    let fileInputElement = null
    let precheckElement = null
    let precheckTextElement = null
    let uploadElement = null

    let init = function () {
        if (isInitialized) {
            return
        }

        modalElement = document.getElementById('change-preview-modal')
        modal = new Modal(modalElement)

        imgElement = document.getElementById('preview-image-preview')

        fileInputElement = document.getElementById('input-preview-browse')

        precheckElement = document.getElementById('precheck-preview-browse')
        precheckTextElement = document.getElementById('precheck-text-preview-browse')

        uploadElement = document.getElementById('button-preview-upload')

        bindUiActions()

        isInitialized = true
    }

    function bindUiActions() {

        document.addEventListener('show-change-preview-modal', (e) => {
            previewDetail = e.detail

            imgElement.src = previewDetail.url

            uploadElement.disabled = true
            precheckElement.classList.remove('ok')
            precheckElement.classList.remove('notok')

            modal.show()
        })

        modalElement.addEventListener('hide.bs.modal', (e) => {
            // initCropper()
            previewDetail.callback(imgElement.src)
            console.log('new preview url is ', imgElement.src)
            previewDetail = null
        })

        fileInputElement.addEventListener('change', (e) => {
            if (fileInputElement.files.length > 0) {
                const fsize = fileInputElement.files.item(0).size
                const fbytes = Math.round(fsize / 1024)
                precheckTextElement.innerHTML = (fbytes + ' kB / 50 kB')
                if (fbytes > 50) {
                    precheckNotOk()
                } else {
                    const url = fileInputElement.value
                    const ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase()
                    console.log('url, ext', url, ext)
                    if ((ext === 'png') || (ext === 'jpg') || (ext === 'jpeg')) {
                        console.log(URL.createObjectURL(fileInputElement.files.item(0)))
                        imgElement.src = URL.createObjectURL(fileInputElement.files.item(0))
                        imgElement.onload = function() {
                            URL.revokeObjectURL(this.src)
                        }

                        precheckOk()
                    } else {
                        fileInputElement.value = ''

                        precheckNotOk()
                    }

                }
            }
        })

        uploadElement.addEventListener('click', (e) => {
            uploadElement.disabled = true
        })
    }

    function precheckOk() {
        precheckElement.classList.remove('notok')
        precheckElement.classList.add('ok')
        uploadElement.disabled = false
    }

    function precheckNotOk() {
        precheckElement.classList.remove('ok')
        precheckElement.classList.add('notok')
        uploadElement.disabled = true
    }

    // function initCropper() {
    //     const image = document.getElementById('preview-image-preview')
    //     const cropper = new Cropper(image, {
    //         aspectRatio: 198 / 280,
    //         crop(event) {
    //             console.log(event.detail.x);
    //             console.log(event.detail.y);
    //             console.log(event.detail.width);
    //             console.log(event.detail.height);
    //             console.log(event.detail.rotate);
    //             console.log(event.detail.scaleX);
    //             console.log(event.detail.scaleY);
    //         },
    //     })
    // }

    return { init }
})()

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

        PreviewImageSelection.init()

        console.log('initialized')
        isInitialized = true
    };

    function buildTree() {
        main = document.getElementById('main')

        root = new UserStep(null)
        root.createIn(main)
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
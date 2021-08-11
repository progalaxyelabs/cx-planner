window.addEventListener('DOMContentLoaded', (e) => {
    App.init()
})

var App = (function () {
    let isInitialized = false
    let config = null
    let root = null
    let main = null
    let activeMobileWindow = null;
    let userStepTemplate = null

    let init = function () {
        if (isInitialized) {
            return
        }

        userStepTemplate = document.getElementById('user-step')
            .content.firstElementChild;

        buildTree()

        bindUiActions()

        console.log('initialized')
        isInitialized = true
    };


    function buildTree() {
        main = document.getElementById('main')

        const children = document.createElement('div')
        children.className = 'children'
        main.appendChild(children)

        root = createNode()

        children.appendChild(root)
    }

    function on(name, selector, callback) {
        main.addEventListener(name, (e) => {
            const element = e.target
            if (element.matches(selector)) {
                return callback(e, element)
            }

            const ancestorElement = element.closest(selector)
            if(ancestorElement !== null) {
                return callback(e, ancestorElement)
            }
        })
    }

    function bindUiActions() {
        on('click', '.mobile-button.add-action', (event, target) => {            
            const thisNode = target.closest('.node')
            createChildNodeTo(thisNode)
        })     
        
        on('click', '.mobile-window', (event, target) => {
            if (activeMobileWindow) {
                activeMobileWindow.classList.remove('active')
            }
            
            target.classList.add('active')
            activeMobileWindow = target
        })
    }

    function createNode() {
        return userStepTemplate.cloneNode(true)
    }    

    function createChildNodeTo(thisNode) {
        const childNode = createNode()
        childNode.querySelector('.vertical-bar.to-parent')
            .classList.add('active')

        const children = thisNode
            .querySelector('.children')
        children.appendChild(childNode)

        thisNode.querySelector('.vertical-bar.to-children')
            .classList.add('active')

        updateHorizontalBarWidths(thisNode)
    }

    function updateHorizontalBarWidths(node) {
        const horizontalBar = node.querySelector('.horizontal-bar')
        const children = node.querySelector('.children')
        const numChildren = children.children.length
        let width = children.offsetWidth
        const firstChildWidth = children.children[0].offsetWidth
        const lastChildWidth = children.children[numChildren - 1].offsetWidth
        const verticalBarWidth = node.querySelector('.vertical-bar').offsetWidth
        width -= ((firstChildWidth / 2) + (lastChildWidth / 2))
        width += verticalBarWidth

        horizontalBar.style.width = width + 'px'
        horizontalBar.style.left = ((firstChildWidth - verticalBarWidth) / 2) + 'px'
        horizontalBar.classList.add('active')

        const parentNode = node.parentNode.closest('.node')
        if (parentNode) {
            updateHorizontalBarWidths(parentNode)
        }
    }

    return { init }
})()
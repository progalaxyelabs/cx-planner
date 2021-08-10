window.addEventListener('DOMContentLoaded', (e) => {
    App.init()
})

var App = (function () {
    let isInitialized = false
    let config = null
    let root = null
    let main = null
    let activeMobileWindow = null;

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

        const children = createChildrenWindow()
        main.appendChild(children)

        root = createNode()
        children.appendChild(root)
    }

    function createNode() {
        const node = document.createElement('div')
        node.className = 'node'

        const vBarToParent = createVerticalBar()
        vBarToParent.classList.add('to-parent')
        node.appendChild(vBarToParent)

        node.appendChild(createMessageWindow())

        node.appendChild(createMobileWindow())

        const vBarToChildren = createVerticalBar()
        vBarToChildren.classList.add('to-children')
        node.appendChild(vBarToChildren)

        node.appendChild(createHorizontalBar())

        node.appendChild(createChildrenWindow())

        return node
    }

    function createMobileWindow() {
        const mobileWindow = document.createElement('div')
        mobileWindow.className = 'mobile-window'

        const mobileView = document.createElement('div')
        mobileView.className = 'mobile-view'
        mobileWindow.appendChild(mobileView)

        const mobileButtons = document.createElement('div')
        mobileButtons.className = 'mobile-buttons'
        mobileWindow.appendChild(mobileButtons)

        const createNodeButton = document.createElement('button')
        createNodeButton.appendChild(document.createTextNode('A'))
        createNodeButton.className = 'mobile-button add-action'
        mobileButtons.appendChild(createNodeButton)

        createNodeButton.addEventListener('click', (e) => {
            const button = e.target
            const thisNode = button.closest('.node')
            createChildNodeTo(thisNode)
        })

        mobileWindow.addEventListener('click', (e) => {
            if (activeMobileWindow) {
                activeMobileWindow.classList.remove('active')
            }
            mobileWindow.classList.add('active')
            activeMobileWindow = mobileWindow
        })

        return mobileWindow
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

    function createMessageWindow() {
        const messageWindow = document.createElement('div')
        messageWindow.className = 'message-window'
        messageWindow.contentEditable = true

        return messageWindow
    }

    function createVerticalBar() {
        const v = document.createElement('div')
        v.className = 'vertical-bar'

        return v
    }

    function createHorizontalBar() {
        const h = document.createElement('div')
        h.className = 'horizontal-bar'

        return h
    }

    function createChildrenWindow() {
        const children = document.createElement('div')
        children.className = 'children'

        return children
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
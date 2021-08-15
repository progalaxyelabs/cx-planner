
class UIObject {
    /** @param {UserStep} [_parent] */
    constructor(_parent) {
        /** @type UserStep */
        this.parent = _parent

        /** @type {HTMLElement?} */
        this.element = null

        /** @type {Object?} */
        this.data = null

        /** @private @type {bool} */
        this._isHidden = false
    }

    /** @param {HTMLElement} [element] */
    setElement(element) {
        this.element = element
    }

    hide() {
        this.element.classList.remove('show')
        this.element.classList.add('hide')
        this._isHidden = true
    }

    show() {
        this.element.classList.remove('hide')
        this.element.classList.add('show')
        this._isHidden = false
    }

    isHidden() {
        return this._isHidden
    }

    on(eventName, callback) {
        this.element.addEventListener(eventName, callback)
    }

    activate() {
        this.element.classList.add('active')
    }

    deActivate() {
        this.element.classList.remove('active')
    }

    focus() {
        this.element.focus()
        this.element.scrollIntoView()
    }

    destroy() {
        this.parent = null
        this.element = null
        this.data = null
    }
}

class VerticalBar extends UIObject {
    /** @param {UserStep} [_parent] */
    constructor(_parent) {
        super(_parent)
    }

    getWidth() {
        return 4
    }
}

class VerticalBarToPrevious extends VerticalBar {
    /** @param {UserStep} [_parent] */
    constructor(_parent) {
        super(_parent)

        this.element = _parent.element.
            querySelector('.vertical-bar.to-previous')
    }
}

class VerticalBarToNext extends VerticalBar {
    /** @param {UserStep} [_parent] */
    constructor(_parent) {
        super(_parent)

        this.element = _parent.element.
            querySelector('.vertical-bar.to-next')
    }
}

class HorizontalBar extends UIObject {
    /** @param {UserStep} [_parent] */
    constructor(_parent) {
        super(_parent)

        this.element = _parent.element.
            querySelector('.horizontal-bar')
    }

    place(left, width) {
        this.element.style.left = left + 'px'
        this.element.style.width = width + 'px'
    }
}

class Explanation extends UIObject {
    static tabIndex = 1

    /** @param {UserStep} [_parent] */
    constructor(_parent) {
        super(_parent)

        this.element = _parent.element.
            querySelector('.explanation')

        this.element.tabIndex = Explanation.tabIndex
        Explanation.tabIndex++        
    }
}

class Preview extends UIObject {
    /** @param {UserStep} [_parent] */
    constructor(_parent) {
        super(_parent)

        this.element = _parent.element.
            querySelector('.preview')
    }
}

class StepToolbarButton extends UIObject {
    /** @param {UserStep} [_parent] */
    constructor(_parent) {
        super(_parent)
    }
}

class STBAddNextStep extends StepToolbarButton {
    /** @param {UserStep} [_parent] */
    constructor(_parent) {
        super(_parent)

        this.element = _parent.element.
            querySelector('.add-next-step')

        this.element.addEventListener('click', (e) => {
            this.parent.addNextStep()
        })
    }
}

class STBShowNextSteps extends StepToolbarButton {
    /** @param {UserStep} [_parent] */
    constructor(_parent) {
        super(_parent)

        this.element = _parent.element.
            querySelector('.show-next-steps')


        this.element.addEventListener('click', (e) => {
            this.parent.showNextSteps()
        })
    }
}

class STBHideNextSteps extends StepToolbarButton {
    /** @param {UserStep} [_parent] */
    constructor(_parent) {
        super(_parent)

        this.element = _parent.element.
            querySelector('.hide-next-steps')

        this.element.addEventListener('click', (e) => {
            this.parent.hideNextSteps()
        })
    }
}

class STBRemoveSelf extends StepToolbarButton {
    /** @param {UserStep} [_parent] */
    constructor(_parent) {
        super(_parent)

        this.element = _parent.element.
            querySelector('.remove-self')

        this.element.addEventListener('click', (e) => {
            const step = this.parent
            if (!step.parent) {
                alert('cannot remove this')
                return
            }

            if (confirm("Removing this will remove all next steps also. You can not get them back. Are you sure?")) {
                step.parent.removeNextStep(e)
            }
        })
    }
}

class StepToolbar extends UIObject {
    /** @param {UserStep} [_parent] */
    constructor(_parent) {
        super(_parent)

        this.element = _parent.element.
            querySelector('.step-toolbar')

        this.addNextStep = new STBAddNextStep(_parent)
        this.showNextSteps = new STBShowNextSteps(_parent)
        this.hideNextSteps = new STBHideNextSteps(_parent)
        this.removeSelf = new STBRemoveSelf(_parent)
    }

    destroy() {
        this.addNextStep.destroy()
        this.showNextSteps.destroy()
        this.hideNextSteps.destroy()
        this.removeSelf.destroy()
        super.destroy()
    }
}
class Visual extends UIObject {
    /** @param {UserStep} [_parent] */
    constructor(_parent) {
        super(_parent)

        this.element = _parent.element.
            querySelector('.visual')

        this.preview = new Preview(_parent)
        this.stepToolbar = new StepToolbar(_parent)
    }

    destroy() {
        this.preview.destroy()
        this.stepToolbar.destroy()
        super.destroy()
    }
}

class NextSteps extends UIObject {
    /** @param {UserStep} [_parent] */
    constructor(_parent) {
        super(_parent)

        this.element = _parent.element.
            querySelector('.next-steps')

        this.userSteps = []
    }

    getUserStepIndex(element) {
        let stepElement = element.closest('.step')
        for (let i = 0; i < this.userSteps.length; i++) {
            if (this.userSteps[i].element === stepElement) {
                return i
            }
        }
        return -1
    }

    getUserStepWidth(index) {
        return this.userSteps[index].width
    }

    getFirstStepWidth() {
        if (this.userSteps.length === 0) {
            return 0
        }

        return this.userSteps[0].width
    }

    getLastStepWidth() {
        if (this.userSteps.length === 0) {
            return 0
        }

        return this.userSteps[this.userSteps.length - 1].width
    }

    getCount() {
        return this.userSteps.length
    }

    getWidth() {
        let width = 0
        this.userSteps.forEach((step, index) => {
            width += step.width
        })

        return width
    }

    add(userStep) {
        this.element.appendChild(userStep.element)
        this.userSteps.push(userStep)
    }

    remove(indexToRemove) {
        this.userSteps[indexToRemove].destroy()
        this.userSteps.splice(indexToRemove, 1)
    }

    destroy() {
        this.userSteps = []
        super.destroy()
    }
}


export class UserStep extends UIObject {
    /** @type {HTMLElement} template */
    static template = document.getElementById('user-step')
        .content.firstElementChild

    static paddingX = 4
    static initialWidth = 208

    static stepHighlighter = (function () {
        /** @type {UserStep} [highlighted] */
        let highlighted = null

        let highlight = (step) => {
            if(highlighted) {
                remove(highlighted)
            }
            add(step)
        }
        let remove = (step) => {
            step.element.classList.remove('highlight')
            highlighted = null
        }
        let add = (step)  => {
            step.element.classList.add('highlight')
            highlighted = step
        }
        return { highlight}
    })()

    /** @param {UserStep} [_parent] */
    constructor(_parent) {
        super(_parent)

        const stepElement = UserStep.template.cloneNode(true)
        this.element = stepElement

        this.verticalBarToParent = new VerticalBarToPrevious(this)
        this.explanation = new Explanation(this)
        this.visual = new Visual(this)
        this.verticalbarToNext = new VerticalBarToNext(this)
        this.horizontalBar = new HorizontalBar(this)
        this.nextSteps = new NextSteps(this)

        this.width = UserStep.initialWidth

        this.element.addEventListener('click', (e) => {
            UserStep.stepHighlighter.highlight(this)
            e.stopPropagation()
        })
    }

    setParent(parent) {
        throw 'not implemented'
    }

    createIn(selector) {
        const el = document.querySelector(selector)
        if (el) {
            el.appendChild(this.element)
        }
    }

    addNextStep() {
        const userStep = new UserStep(this)
        this.nextSteps.add(userStep)

        this.showNextSteps()

        this.verticalbarToNext.show()
        this.horizontalBar.show()
        userStep.verticalBarToParent.show()

        // resize at the end
        this.resize()

        this.explanation.focus()
    }

    showNextSteps() {
        this.nextSteps.show()
        this.verticalbarToNext.show()
        this.horizontalBar.show()
        this.resize()
        this.visual.stepToolbar.showNextSteps.deActivate()
        this.visual.stepToolbar.hideNextSteps.activate()
    }

    hideNextSteps() {
        this.nextSteps.hide()
        this.verticalbarToNext.hide()
        this.horizontalBar.hide()
        this.resize()
        this.visual.stepToolbar.showNextSteps.activate()
        this.visual.stepToolbar.hideNextSteps.deActivate()
    }

    removeNextStep(e) {
        let element = e.target
        let indexToRemove = this.nextSteps.getUserStepIndex(element)
        if (indexToRemove === -1) {
            return
        }
        // make sure you are done with 
        // getting everything you need from this step
        // before removing it.
        // once gone, it's gone forever
        this.nextSteps.remove(indexToRemove)

        // resize at the end
        this.resize()
    }

    resize() {

        const nextStepsWidth = this.nextSteps.getWidth()
        const nextStepsCount = this.nextSteps.getCount()

        this.width = nextStepsWidth

        if ((nextStepsCount === 0) || (this.nextSteps.isHidden())) {
            this.width = UserStep.initialWidth
            this.horizontalBar.place(0, 0)
            this.verticalbarToNext.hide()
            this.horizontalBar.hide()
        } else {
            const firstStepWidth = this.nextSteps.getFirstStepWidth()
            const lastStepWidth = this.nextSteps.getLastStepWidth()
            const vbWidth = this.verticalBarToParent.getWidth()
            const hbWidth = nextStepsWidth - (firstStepWidth / 2) - (lastStepWidth / 2) + vbWidth
            const left = (firstStepWidth / 2) - (vbWidth / 2) - UserStep.paddingX

            this.horizontalBar.place(left, hbWidth)
        }

        if (!this.parent) {
            return
        }

        this.parent.resize()
    }

    destroy() {
        this.verticalBarToParent.destroy()
        this.explanation.destroy()
        this.visual.destroy()
        this.verticalbarToNext.destroy()
        this.horizontalBar.destroy()
        this.nextSteps.destroy()

        this.element.remove()

        super.destroy()
    }
}

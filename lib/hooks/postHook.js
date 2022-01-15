/**
 *  cl_post
 *
 *  runs after each draw loop
 */
export default function postHook() {
    const { __clickable__: cl, mouseIsPressed, mouseX, mouseY } = this
    let { clickables, cursorStyle } = cl

    clickables.forEach((clickable) => {
        let { x, y, width: w, height: h } = clickable
        let mouseIsOver =
            mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h

        if (!mouseIsOver && !mouseIsPressed) {
            cursorStyle = 'default'
            clickable.onOutside()
        }

        if (mouseIsOver && mouseIsPressed) {
            cursorStyle = 'pointer'
            clickable.onPress()
        }

        if (mouseIsOver && !mouseIsPressed) {
            cursorStyle = 'pointer'
            clickable.onHover()
        }
    })

    if (window.document.body.style.cursor !== cursorStyle) {
        window.document.body.style.cursor = cursorStyle
    }
}

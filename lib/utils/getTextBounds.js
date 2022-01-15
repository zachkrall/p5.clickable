/**
 * This function is used to get the bounding size of a
 * string of text for use in the 'textScaled' property
 */

function getTextBounds(str, font, size) {
    let txt = document.createElement('span')

    document.body.appendChild(txt)

    Object.assign(txt.style, {
        font: font,
        fontSize: size + 'px',
        height: 'auto',
        width: 'auto',
        position: 'absolute',
        whiteSpace: 'no-wrap',
    })

    txt.innerHTML = str

    let width = Math.ceil(txt.clientWidth)

    let height = Math.ceil(txt.clientHeight)

    document.body.removeChild(txt)

    return [width, height]
}

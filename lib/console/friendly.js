const gold_text = `color:#F39120;`
const red_text = `color:tomato;`
const regular_text = `color:unset;`

export function message(str) {
    console.log(`🏵%c clickable.js says: %c${str}`, gold_text, regular_text)
}

export function warning(str) {
    console.log(`🏵%c clickable.js says: %c${str}`, red_text, regular_text)
}

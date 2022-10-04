export function setDataCss(item) {
    const cssRules = document.styleSheets[0].cssRules
    let result;
    for (let i = 0; i < cssRules.length; i++) {
        if (cssRules[i].selectorText === item) {
            result = document.styleSheets[0].cssRules[i]
        }
    }
    return result
}

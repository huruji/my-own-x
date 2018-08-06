export function setAttribute(dom, name, value = "") {
    if(name === 'className') name = 'class';

    if(name.startsWith('on')) {
        name = name.slice(2).toLowerCase();
        dom.addEventListener(name, value);
    } else if(name === 'style') {
        if(typeof value === 'string') {
            dom.style.cssText = value || '';
        } else if(typeof value === 'object') {
            for(let name in value) {
                dom.style[name] = value;
            }
        }
    } else {
        if(name in dom) {
            dom[name] = value || '';
        } 
        dom.setAttribute(name, value);
    }
}
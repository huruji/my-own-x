function createElement(tag, attrs, ...children) {
    return {
        tag, attrs, children
    }
}

const React = {
    createElement
}
const ReactDOM = {
    render: (vnode, container) => {
        container.innerHTML = '';
        return render(vnode, container);
    }
}
function render(vnode, container) {
    return container.appendChild(_render(vnode));
}

function _render(vnode) {
    if(vnode === undefined || vnode === null || typeof vnode === 'boolean') vnode = '';

    if(typeof vnode === 'number') vnode = String(vnode);

    if(typeof vnode === 'string') {
        let textNode = document.createTextNode(vnode);
        return textNode;
    }

    if(typeof vnode.tag === 'function') {
        const component = createElement(vnode.tag, vnode.attrs);
        setComponentProps(component, vnode.attrs);
        return component.base;
    }

    const dom = document.createElement(vnode.tag);

    if(vnode.attrs) {
        Object.keys(vnode.attrs).forEach(key => {
            const value = vnode.attrs[key];
            setAttribute(dom, key, value);
        })
    }
    vnode.children.forEach(child => render(child, dom));
    return dom;
}

function setAttribute(dom, name, value = "") {
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

function createComponent(component, props) {
    let inst;
    if(component.prototype && component.prototype.render) {
        inst = new Component(props);
    } else {
        inst = new Component(props);
        inst.constructor = component;
        inst.render = function() {
            return this.constructor(props);
        }
    }
    return inst;
}

function setComponentProps(component, props) {
    if(!component.base) {
        if(component.componentWillMount) component.componentWillMount();
    } else if(component.componentWillReceiveProps) {
        component.componentWillReceiveProps(props);
    }
    component.props = props;
    renderComponent(component);
}

function tick() {
    const element = (
        <div>
            <h1>hello, world！</h1>
            <h2>It is {new Date().toLocaleTimeString()}</h2>  
        </div>
    )
    ReactDOM.render(
        element,
        document.getElementById('root')
    )
    console.log(element);
}

class Component{
    constructor(props = {} ) {
        this.state = {};
        this.props = props;
    }

    setState(stateChange) {
        Object.assign(this.state, stateChange);
        renderComponent(this);
    }
}

setInterval(tick, 1000);







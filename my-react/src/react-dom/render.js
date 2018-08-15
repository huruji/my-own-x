import { diff } from './diff'

function _render( vnode, container ) {

    if ( vnode === undefined ) return;

    if ( vnode.isReactComponent ) {
        const component = vnode;

        if ( component._container ) {
            if ( component.componentWillUpdate ) {
                component.componentWillUpdate();
            }
        } else if ( component.componentWillMount ) {
            component.componentWillMount();
        }

        component._container = container;   // ���游������Ϣ�����ڸ���

        vnode = component.render();
    }

    if ( typeof vnode === 'string' || typeof vnode === 'number' ) {
        let textNode = document.createTextNode( vnode );
        return container.appendChild( textNode );
    }

    const dom = document.createElement( vnode.tag );

    if ( vnode.attrs ) {
        Object.keys( vnode.attrs ).forEach( key => {

            const value = vnode.attrs[ key ];

            if ( key === 'className' ) key = 'class';

            // ������¼�������������ֱ�Ӹ��ӵ�dom��
            if ( typeof value === 'function' ) {
                dom[ key.toLowerCase() ] = value;
            } else {
                dom.setAttribute( key, vnode.attrs[ key ] );
            }

        } );
    }

    if ( vnode.children ) {
        vnode.children.forEach( child => _render( child, dom ) );
    }

    return container.appendChild( dom );
}

function render( vnode, container, dom ) {
    return diff( dom, vnode, container );
}

export default render;
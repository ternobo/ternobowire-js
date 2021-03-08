/**
 * Ternobo WireLink Component
 */
export default {
    name: "WireLink",
    functional: true,
    props: {
        href: {
            type: String,
            required: true,
        },
        method: {
            type: String,
            default: 'get',
        },
        replace: {
            type: Boolean,
            default: false,
        },
        preserveScroll: {
            type: Boolean,
            default: false,
        },
        as: {
            type: String,
            default: "a",
        }
    },
    render(h, node) {
        let props = node.props, data = node.data, children = node.children;
        let requestData = props.data ? props.data : {};
        const visit = event => {
            event.preventDefault()
            node.parent.$store.state.ternoboWireApp.visit(props.href, requestData, props.method);
        }

        return h(props.as, {
            ...data,
            attrs: {
                ...data.attrs,
                href: props.href,
            },
            on: {
                ...(data.on || {}),
                click: visit,
            },
        }, children)
    },
}

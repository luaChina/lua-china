import Notification from "~/components/Notification.vue";
let notification = {};
const COLOR = {
    success: "bg-success",
    error: "bg-danger",
    info: "bg-info"
};
notification.install = function(Vue) {
    let exToast = Vue.extend(Notification);
    Vue.prototype.$toast = toast;
    Vue.toast =toast;
    function buildProps(args) {
        let props = {};
        props.message = args[0].message;
        props.type = args[0].type;
        props.color = COLOR[args[0].type];
        return props;
    }
    function toast() {
        if (!arguments[0]) return;
        const propsData = buildProps(arguments);
        const instance = new exToast({ propsData });
        document.body.appendChild(instance.$mount().$el);
        instance.showToast();
        setTimeout(() => {
            instance.$destroy();
        }, 2000);
    }
};
export default notification;

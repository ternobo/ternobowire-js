export default {
    beforeRouteEnter(to, from, next, vm = {}) {
        next();
    },
    beforeRouteLeave(to, from, next) {
        next();
    }
};
// import imgConfiguration from './assets/js/common/configuration';
import App from './components/App.vue';

Vue.config.productionTip = false;
const app = new Vue({
    el: '#app',
    components: {App},
    template: '<App/>'
});
import {createApp, nextTick} from 'vue';
import Loading from '@/directives/loading/loading.vue';

export const loading = {
    mounted(el: any, binding: any) {
        const app = createApp(Loading);
        const instance = app.mount(document.createElement('div'));
        el.instance = instance;
        if (binding.value) {
            appendEl(el);
        }
    },
    updated(el: any, binding: any) {
        if (binding.value !== binding.oldValue) {
            binding.value ? appendEl(el) : removeEl(el);
        }
    },
};

const appendEl = (el: any) => {
    el.instance.$el.style.opacity = 1
    el.appendChild(el.instance.$el);
};

const removeEl = (el: any) => {
    el.instance.$el.style.opacity = 0
    nextTick(() => {
        el.removeChild(el.instance.$el);
    })
};
import {type App, createApp} from 'vue';
import MessageItem from '@/components/base/message/message.vue';
import type {ConfigI} from "@/components/base/message/types.ts";

/**
 * Message
 * @param {Object} cfg
 */

interface AppRI extends App<Element> {
    vm?: any,
    close?: () => void,
}

const createInstance = (cfg: ConfigI | object) => {
    const config = cfg || {};

    // 1、Create a wrapper container, and set the outer Class attribute and message count.
    let messageNode: HTMLDivElement = document.createElement('div');
    let attr = document.createAttribute('class');
    attr.value = 'message';
    messageNode.setAttributeNode(attr);
    const height = 54; // Height of a single message box.

    const messageList = document.getElementsByClassName('message');
    messageNode.style.top = `${messageList.length * height}px`;

    // 3、unmount method, and recount after unmounting.
    const handleRemove = () => {
        app.unmount();
        // app.unmount(messageNode);
        document.body.removeChild(messageNode);
        resetMsgTop();
    };

    const resetMsgTop = () => {
        for (let i = 0; i < messageList.length; i++) {
            (messageList[i] as HTMLElement).style.top = `${i * height}px`;
        }
    };

    // 2、Create an instance and mount it to the body.
    const app: AppRI = createApp(MessageItem, {
        config,
        remove() {
            handleRemove(); // Remove the element. After the message is closed, unmount and remove it from the DOM.
        }
    });

    // Mount the instance and append it to the end of the body.
    app.vm = app.mount(messageNode);
    document.body.appendChild(messageNode);

    app.close = () => {
        handleRemove();
    };
    return app;
};
export default createInstance;
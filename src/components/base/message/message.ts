import createInstance from './instance.ts';
import type {ConfigI} from "@/components/base/message/types.ts";

/**
 * Read configuration and render Message
 * @param {Object} typeCfg message type
 * @param {Object/String} cfg config
 */
function renderMsg(typeCfg: object = {}, cfg: string | object = '') {
    // Allow direct input of message content,
    // therefore, it is necessary to determine the type of the passed-in cfg
    const isContent: boolean = typeof cfg === 'string';

    // Integrate custom configurations
    cfg = isContent
        ? {
            content: cfg
        }
        : cfg;

    const config = Object.assign({}, typeCfg, cfg); // 合并配置

    const {
        type = 'text', // message type
        content = '', // message content
        icon = '', // message icon
        duration = 3000, // Automatic closing delay time
        close = false // Whether to display the close button
    } = config as ConfigI;

    // create instance
    return createInstance({
        type,
        content,
        duration,
        icon,
        close
    });
}

export default {
    // text type
    text(cfg: string | ConfigI = '') {
        const textCfg = {
            type: 'text',
            icon: ''
        };

        return renderMsg(textCfg, cfg);
    },
    // success type
    success(cfg: string | ConfigI = '') {
        const successCfg = {
            type: 'success',
            icon: 'ri-checkbox-circle-fill'
        };

        return renderMsg(successCfg, cfg);
    },
    // error type
    error(cfg: string | ConfigI = '') {
        const errorCfg = {
            type: 'error',
            icon: 'ri-close-circle-fill'
        };
        return renderMsg(errorCfg, cfg);
    }
};
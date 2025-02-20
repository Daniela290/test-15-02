import {reactive} from "vue";

export const globalState = reactive({
    // mobileBreakpoint: 992,
    windowWidth: document.documentElement.clientWidth,
    scaleCoeff: calcScaleCoeff(),
    currentDate: new Date(),
    updateTimeDelay: 30000
})

window.addEventListener('resize', () => {
    globalState.windowWidth = document.documentElement.clientWidth
    globalState.scaleCoeff = calcScaleCoeff()
})

export function calcScaleCoeff() {
    const w = document.documentElement.clientWidth
    const h = document.documentElement.clientHeight
    // document?.querySelector('meta[name=viewport]')
    //     ?.setAttribute('content', 'width=' + w + ',minimum-scale=0,maximum-scale=1,height=' + h);

    if (w >= 1080) {
        document.documentElement.style.setProperty('--tmp', '1');
        return 1
    }
    if (w <= 280) {
        document.documentElement.style.setProperty('--tmp', '0');
        return 0
    }

    const resW = (w - 280) / (1080 - 280)
    let resH = (h - 450) / (1180 - 450)
    if (h >= 1180 || h <= 450) resH = resW

    resH = resW

    const res = resH > resW ? resW : resH
    document.documentElement.style.setProperty('--tmp', res.toString());
    return res
}
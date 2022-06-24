import iziToast from 'izitoast'

const service = (params) => {
    iziToast[params.type]({
        title: params.title,
        message: params.message || '',
        position: params.position || 'topRight',
        close: params.hasOwnProperty('close')? params.close: false,
        overlay: params.hasOwnProperty('overlay')? params.overlay : false,
        timeout: params.hasOwnProperty('timeout')? params.timeout : 1900,
        animateInside: params.hasOwnProperty('animateInside')? params.animateInside : false,
        pauseOnHover:  params.hasOwnProperty('pauseOnHover')? params.pauseOnHover : false,
        resetOnHover:  params.hasOwnProperty('resetOnHover')? params.resetOnHover : false,
        progressBar:  params.hasOwnProperty('progressBar')? params.progressBar : false,
        rtl:  params.hasOwnProperty('rtl')? params.rtl : false,
        onOpening: params.hasOwnProperty('onOpening')? params.onOpening: function () {},
        onOpened: params.hasOwnProperty('onOpened')? params.onOpened: function () {},
        onClosing: params.hasOwnProperty('onClosing')? params.onClosing: function () {},
        onClosed: params.hasOwnProperty('onClosed')? params.onClosed: function () {}
    });
}

const success = (title) => {
    service({
        type: 'success',
        title: title,
        position: 'topRight',
    })
}

const danger = (title) => {
    service({
        type: 'danger',
        title: title,
        position: 'topRight',
    })
}

export const notify = {
    view: service,
    success: success,
    danger: danger
}

export default notify

// hack for global nextTick
//解决nextTick调用问题
function noop() {
}

window.MessageChannel = noop;
window.setImmediate = noop;
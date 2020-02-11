// 定义基准字体

(function (doc, win) {

    var docEl = doc.documentElement, resizeEvt = 'orientationchange' in win ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 50 * (clientWidth / 375) + "px";
           /* //适配
            var fz = 50 * (clientWidth / 375);
            var realfz = (+window.getComputedStyle(document.getElementsByTagName("html")[0]).fontSize.replace('px','')*10000)/10000;
            if (fz !== realfz) {
                document.getElementsByTagName("html")[0].style.cssText = 'font-size: ' + fz * (fz / realfz) +"px";
            }*/
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);

})(document, window);


/**
 * 全面屏适配
 * '在页面加载前'，调用原生获取屏幕分辨率和状态栏高度，计算出值动态创建style添加class插入到head标签内
 * **/
/*
var _screenPx = JSON.parse(native.getPx());   //获取屏幕分辨率
var _navHeight = native.NavHeight();   //获取状态栏高度
console.log(_navHeight);
if (_navHeight != 'string') {
    var _SCREENH = (750 / (parseInt(_screenPx.screenWidth) / parseInt(_navHeight)) - 20) / 2;
    var $style = $('<style type="text/css"></style>');
    $($('head')[0]).append($style);
    var _STR = '';
    $style.append(_STR);
}
/!**
 * H5移动端禁止长按弹出系统菜单"选择复制","在浏览器打开"
 * oncontextmenu 事件在元素中用户右击鼠标时触发并打开上下文菜单。此处用于阻止菜单的出现.
 *  *!/

document.oncontextmenu=function(e){
    e.preventDefault();

};*/

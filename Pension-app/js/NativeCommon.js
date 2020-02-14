// var HOST   = "http://interactive.jinhuaze-health.com:18099/"; // 正式环境微服务项目接口地址
var HOST   = "http://47.94.3.197:28180/"; // 正式环境微服务项目接口地址
// var imgUrl = "https://image.jinhuaze-health.com/"; // 正式环境图片地2址
var imgUrl = "https://http://47.94.3.197:81/test/"; // 图片地2址


var _LocalTesting = true; //true本地测试

var common = {
    ajaxFun: function (type, url, data, suc, error, boolean) {
        if (_LocalTesting) {
            $.ajax({
                type: type,
                // url: HOST+url,
                url: !boolean ? HOST + url : HOST1 + url, //POST地址,
                data: JSON.stringify(data),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                success: suc,
                error: error
            });

        } else {
            var json = {}; //主参数
            // json.url = HOST; //POST地址
            json.url = !boolean ? HOST : HOST1; //POST地址
            json.methodname = url;
            json.function = suc;
            json.refunction = error;
            if (type == "post") {
                json.postdata = data;
                var a = JSON.stringify(json); //必须转换为json字符串
                switch (common.ostype()) {
                    case "Android":
                        native.PostRequest(a);
                        break;
                    case "IOS":
                        window.webkit.messageHandlers.PostRequest.postMessage(a);
                        break;
                }
            } else if (type == "get") {
                var a = JSON.stringify(json); //必须转换为json字符串
                switch (common.ostype()) {
                    case "Android":
                        native.GetRequest(a);
                        break;
                    case "IOS":
                        window.webkit.messageHandlers.GetRequest.postMessage(a);
                        break;
                }
            }
        }

    },
    /*
     * js判断手机操作系统(ios或者是Android)
     */
    ostype: function () {
        var u = navigator.userAgent,
            app = navigator.appVersion;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isAndroid) {
            //这个是安卓操作系统
            return "Android";
        }
        if (isIOS) {
            //这个是ios操作系统
            return "IOS";
        }
    },

    isPoneAvailable: function (str) {
        var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
        if (!myreg.test(str)) {
            return false;
        } else {
            return true;
        }
    },
    //返回上一页
    goback: function () {
        switch (common.ostype()) {
            case "Android":
                native.BackLastPage();
                break;
            case "IOS":
                window.webkit.messageHandlers.BackLastPage.postMessage(null);
                break;
        }
    },
    //返回第N页
    gobackIOS: function (n, da) {
        data = {
            NumPage: n,
            data: da
        }
        switch (common.ostype()) {
            case "Android":
                native.BackLastPage();
                break;
            case "IOS":
                if (n == undefined) {
                } else {
                    window.webkit.messageHandlers.BackLastPagetTwo.postMessage(data);
                }
                break;
        }
    },

    //搜索设备
    searchDevice: function (data) {
        switch (common.ostype()) {
            case "Android":
                native.SearchDevice(JSON.stringify(data));
                break;
            case "IOS":
                window.webkit.messageHandlers.SearchDevice.postMessage(data);
                break;
        }
    },
    //停止搜索
    stopsearchDevice: function () {
        switch (common.ostype()) {
            case "Android":
                native.StopSearchDevice();
                break;
            case "IOS":
                window.webkit.messageHandlers.StopSearchDevice.postMessage(null);
                break;
        }
    },
    //连接设备
    connectDevice: function (data) {
        switch (common.ostype()) {
            case "Android":
                native.ConnectDevice(JSON.stringify(data));
                break;
            case "IOS":
                window.webkit.messageHandlers.ConnectDevice.postMessage(data);
                break;
        }
    },
    //设备开始检测
    startTesting: function (data) {
        switch (common.ostype()) {
            case "Android":
                native.StartTesting(JSON.stringify(data));
                break;
            case "IOS":
                window.webkit.messageHandlers.StartTesting.postMessage(data);
                break;
        }
    },
    //设备结束检测
    endTesting: function (data) {
        switch (common.ostype()) {
            case "Android":
                native.EndTesting(JSON.stringify(data));
                break;
            case "IOS":
                window.webkit.messageHandlers.EndTesting.postMessage(data);
                break;
        }
    },
    //断开设备
    bleDisconnect: function (data) {
        switch (common.ostype()) {
            case "Android":
                native.BleDisconnect(JSON.stringify(data));
                break;
            case "IOS":
                window.webkit.messageHandlers.BleDisconnect.postMessage(data);
                break;
        }
    },
    isChecking: function () {
        switch (common.ostype()) {
            case "Android":
                return native.IsChecking();
            case "IOS":
                return window.webkit.messageHandlers.IsChecking.postMessage(data);
                break;
        }
    },
    // 处理安卓接受到的数据

    sellAndriod: function (data) {
        switch (common.ostype()) {
            case "Android":
                return JSON.parse(data.substr(1, data.length - 2));
            case "IOS":
                return JSON.parse(data);
        }
    },

    //获取本地消息
    getBaseInfo: function () {
        switch (common.ostype()) {
            case "Android":
                native.GetBaseInfo();
                break;
            case "IOS":
                window.webkit.messageHandlers.GetBaseInfo.postMessage(null);
                break;
        }
    },
    //屏幕常亮
    keepScreenOn: function () {
        switch (common.ostype()) {
            case "Android":
                native.keepScreenOn();
                break;
            case "IOS":
                window.webkit.messageHandlers.keepScreenOn.postMessage(null);
                break;
        }
    },
    //转换接收的数据格式
    disposeData: function (data) {
        switch (common.ostype()) {
            case "Android":
                return JSON.parse(data);
            case "IOS":
                return data;
        }
    },
    //判断蓝牙是否开启
    getBluetoothStatus: function () {
        switch (common.ostype()) {
            case "Android":
                return native.getBluetoothStatus();
            case "IOS":
                window.webkit.messageHandlers.keepScreenOn.postMessage(null);
                break;
        }
    },

    //返回屏幕尺寸
    getScreenPhysicalSize : function(){
        switch (common.ostype()) {
            case "Android":
                return native.getScreenPhysicalSize();
            case "IOS":
                return window.webkit.messageHandlers.getScreenPhysicalSize.postMessage(null);
                break;
        }
    },
    //存储登录数据
    setBaseInfo: function (data) {
        switch (common.ostype()) {
            case "Android":
                native.setBaseInfo(JSON.stringify(data));
            case "IOS":
                // window.webkit.messageHandlers.setBaseInfo.postMessage(JSON.stringify(data));
                break;
        }

    },
    sendMsg: function (data) { //自己主动发送消息
        switch (common.ostype()) {
            case "Android":
                native.sendMsg(JSON.stringify(data));
            case "IOS":
                break;
        }
    },

    //退出登录
    sinGout: function () {
        switch (common.ostype()) {
            case "Android":
                native.singout();
            case "IOS":
                window.webkit.messageHandlers.singout.postMessage(null);
                break;
        }
    },
    getShortSound: function (data) { //开始短语音的录制
        switch (common.ostype()) {
            case "Android":
                native.getShortSound();
            case "IOS":
                break;
        }
    },
    stopShortSound: function (data) { //结束短语音的录制
        switch (common.ostype()) {
            case "Android":
                native.stopShortSound();
            case "IOS":
                break;
        }
    },

    /**
     * 选择图片 调取本地的图片
     * **/
    getImg: function (data) { //选择图片 调取本地的图片
        switch (common.ostype()) {
            case "Android":
                native.getImg();
            case "IOS":
                break;
        }
    },

    /**
     * 微信支付
     * **/
    wxPay: function (data) {
        data = JSON.stringify(data);
        switch (common.ostype()) {
            case "Android":
                native.wxpay(data);
                break;
            case "IOS":
                window.webkit.messageHandlers.wxpay.postMessage(data);
                break;
        }
    },

    /**
     * 支付宝支付
     * **/
    aliPay: function (data) {
        // data = JSON.stringify(data);
        switch (common.ostype()) {
            case "Android":
                native.alipay(data);
                break;
            case "IOS":
                window.webkit.messageHandlers.alipay.postMessage(data);
                break;
        }
    },

    /**
     * backToTop() 返回自己本身的0级页面
     */
    backToTop() {
        switch (common.ostype()) {
            case "Android":
                native.backToTop();
                break;
            case "IOS":
                window.webkit.messageHandlers.backToTop.postMessage(null);
                break;
        }
    },
    /**
     * selectTab() 0级页面跳0级页面
     * @param {*} data string类型
     */
    selectTab: function (data) {
        // data = JSON.stringify(data);

        switch (common.ostype()) {
            case "Android":
                native.selectTab(data);
                break;
            case "IOS":
                window.webkit.messageHandlers.selectTab.postMessage(data);
                break;
        }
    },
    /**
     * 安卓判断全面屏
     * **/
    androidNavHeight: function () {
        return native.NavHeight();
    },
    // 获取键盘的高度
    getNavigationBarHeight: function () {
        switch (common.ostype()) {
            case "Android":
                return native.getNavigationBarHeight();
                break;
            case "IOS":
                return window.webkit.messageHandlers.getNavigationBarHeight.postMessage();
                break;
        }
    },

    /**
     * 获取app最新版
     * **/
    showUpdateData(json){
        switch (common.ostype()) {
            case "Android":
                native.showUpdateData(JSON.stringify(json));
                break;
            case "IOS":
                break;
        }
    },

    /**
     * 获取手机屏幕分辨率
     * **/
    getPx(){
        switch (common.ostype()) {
            case "Android":
                return native.getPx();
                break;
            case "IOS":
                break;
        }
    },
};

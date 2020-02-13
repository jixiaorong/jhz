Array.prototype.removeArr = function (delIndex) {
    var temArray = [];
    for (var i = 0; i < this.length; i++) {
        if (i != delIndex) {
            temArray.push(this[i]);
        }
    }
    return temArray;
}

/**
 * COMMON 工具类封装
 */

var MYCOMMON = {
    timer: null,
    /***
     * nowtime() 获取当前时间 
     * return:返回2017-08-25 16:21:20 这个格式的时间
     */
    nowtime: function (str) {
        function p(s) {
            return s < 10 ? '0' + s : s;
        }
        var myDate = str ? new Date(Number(str)) : new Date();
        var year = myDate.getFullYear();
        var month = myDate.getMonth() + 1;
        var date = myDate.getDate();
        var h = myDate.getHours(); //获取当前小时数(0-23)
        var m = myDate.getMinutes(); //获取当前分钟数(0-59)
        var s = myDate.getSeconds();
        var now = year + '-' + p(month) + "-" + p(date) + " " + p(h) + ':' + p(m) + ":" + p(s);
        return now;
    },

    /**
     * itrim()  去除 空格 回车 换行
     * @param:testStr  字符串
     * return ：字符串
     */
    itrim: function (testStr, blooean) {
        var resultStr = '';
        if (blooean) {
            resultStr = resultStr.replace(/^[ ]$/g, ""); //去掉空格
        } else {
            resultStr = testStr.replace(/(^\s*)|(\s*$)/g, ""); //去掉空格
        }
        resultStr = resultStr.replace(/^[ ]$/g, ""); //去掉空格
        resultStr = resultStr.replace(/^[\r\n]$/g, ""); //去掉回车换行
        return resultStr;
    },
    //验证用户名    中文、英文、数字包括下划线
    isUsername(str) {
        var reg = /^[A-Za-z0-9]+$/;
        if (reg.test(str)) {
            return true;
        } else {
            return false;
        }
    },

    /**
     * mapObj()  浅clone一个对象并返回
     * @param: source 要clone的对象
     * return： 新的对象
     */
    mapObj(source) {
        if (Object.prototype.toString.call(source) != "[object Object]") return;
        var onMsg = {}; //接收到的消息体
        for (var key in source) {
            onMsg[key] = source[key]
        }
        return onMsg;
    },

    /**
     * imgSize() 仿微信设置消息中img 的大小展示
     */
    imgSize(oldwidth, oldheight) {
        var ratio = oldwidth / oldheight,
            width, height;
        if (ratio < 0.4) {
            width = 204; //这是从微信截图的长度最后需要同一除以 3
            height = 510;
        } else if (ratio >= 0.4 && ratio <= 0.5) {
            width = 204;
            height = 204 / ratio;
        } else if (ratio > 0.5 && ratio < 1) {
            width = 405 * ratio;
            height = 405;
        } else if (ratio >= 1 && ratio < 1 / 0.5) { //和前面的宽高转置
            height = 405 * (1 / ratio);
            width = 405;
        } else if (ratio >= 1 / 0.5 && ratio < 1 / 0.4) {
            height = 204;
            width = 204 / (1 / ratio);
        } else if (ratio >= 1 / 0.4) {
            height = 204; //这是从微信截图的长度最后需要同一除以 3
            width = 510;
        }
        height /= 3;
        width /= 3;
        return {
            width: width,
            heigth: height
        }

    },



    /***
     * readFile() 读取本地文件
     * @parma:input 读取本地文件的input框
     * return 返回本地文件url
     */
    readFile(input) {
        //拿到用户选择的第一个文件
        var file = input.files[0];
        // 读取文件 FileReader对象
        var fr = new FileReader();
        //以url的形式读取文件
        fr.readAsDataURL(file);
        //当文件读取完成后，显示读取的结果
        fr.onload = function () {
            var url = fr.result
            return url;
        }
    },

    /**
     * getChooseInfo() 获取得到的内容
     * @parma:source 存放着索引的数组
     * @parma:target 存放着内容的数组
     * return 返回数组
     */

    getChooseInfo(source, target) {
        var arr = [];
        source.forEach(function (val, index) {
            var i = val;
            target.forEach(function (val, index) {
                if (index == i) {
                    arr.push(val)
                }
            })
        })
        return arr;
    },

    /**
     * isPoneAvailable() 验证是否是十一位有效数字
     * @parma:str 手机号
     */

    isPoneAvailable(str) {
        var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
        if (!myreg.test(str)) {
            return false;
        } else {
            return true;
        }
    },

    /***
     * itrmTimeStyle返回时间格式 今天的日期 返回时：分；否则返回 年-月-日 时：分
     *  @param ：timer 时间戳
     */

    itrmTimeStyle(timer) {

        function f(num) { //格式化时间格式
            return num > 9 ? num : "0" + num
        }

        var myDate = timer ? new Date(Number(timer)) : new Date();
        var acceptHour = myDate.getHours(),
            acceptMintint = myDate.getMinutes(),
            acceptYear = myDate.getFullYear(),
            acceptMonth = myDate.getMonth() + 1; //获取消息发送时的时分

        var CurDate = new Date();
        var acceptDay = myDate.getDate(),
            curDay = CurDate.getDate(),
            curYear = CurDate.getFullYear(),
            curMonth= CurDate.getMonth() + 1;
       
        
        if (curYear +"@"+ curMonth +"@"+ curDay == acceptYear +"@"+ acceptMonth +"@"+ acceptDay) {
            return f(acceptHour) + ":" + f(acceptMintint)
        } else {
            return acceptYear + "-" + f(acceptMonth) + "-" + f(acceptDay) + " " + f(acceptHour) + ":" + f(acceptMintint)
        }
    },
    /**
     * IOS 时间空格转换
     * **/
    convertDate: function (data) {
        return data.replace(/\s/g, '\0');
    },
    /**
     * judgeGreater与传进来的时间戳是否相差一分钟大于一分钟返回true 否则返回false
     * @param:timer 传入的时间戳
     * pretimer 传入的上一条消息的时间戳
     * return :boolean
     */
    judgeGreater: function (timer, pretimer) {
        // var nowDate = new Date().getTime(); //当前时间戳
        if (pretimer == "0") {//前面没有一条消息
            return false;
        } else if (pretimer == "1") {
            return true;
        } else {
            return Math.abs((Math.ceil((timer - pretimer) / 60000))) > 1 ? true : false;

        }

    },
    // 将秒转化成时：分：秒
    changeTime(number) {
        function p(s) {
            return s < 9 ? '0' + s : s;
        }
        if (number == "0") {
            return "0"
        } else {
            var second = number % 60,
                minte = Math.floor(number / 60),
                hour = Math.floor(number / 3600);
            return p(hour) + "时" + p(minte) + "分" + p(second) + "秒"

        }
    }
}

// 处理线上图片转化成base64格式
function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var dataURL = canvas.toDataURL("image/png"); // 可选其他值 image/jpeg
    return dataURL;
}

function setbaseimg(src, cb) {
    var image = new Image();
    image.src = src + '?v=' + Math.random(); // 处理缓存
    image.crossOrigin = "*"; // 支持跨域图片
    image.onload = function () {
        var base64 = getBase64Image(image);
        cb && cb(base64);
    }
} 
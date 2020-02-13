
//定义全局变量
var _data = {
    timerToast: null //toast定时器
};
var commonTools = {
    //筛选
    /**
     * left：左侧列表id
     * right : 右侧列表id
     * json: 数据
     * th : 默认显示那一项
     **/
    Screen: function (left, right, json, th) {
        var str = ''; //定义变量
        var str2 = ''; //定义变量
        $(left).empty();
        $(right).empty();
        // 遍历data
        for (var i = 0; i < json.length; i++) {
            var activ = '';
            //判断是否未传值，传值后默认显示对应id的选项
            if (th === undefined) {
                th = 0;
                activ = 'active';
            }
            // 如果匹配到id 添加active
            if (json[i].id == th) {
                th = i;
                activ = 'active';
            }
            //拼接字符串
            str += `<li class="list_ ${activ}" id="${json[i].id}" index="${i}">${json[i].name}</li>`;
        }
        //遍历子集
        for (var j = 0; j < json[th].children.length; j++) {
            str2 += `<li class="list_" id="${json[th].children[j].id}" index="${j}">${json[th].children[j].name}</li>`;
        }
        //追加到dom
        $(left).append(str);
        $(right).append(str2);
        //绑定点击事件
        $(left).find('li').on('click', function () {
            $(left).find("li").removeClass("active");
            $(this).addClass("active");
            commonTools.ClickScreen(parseInt($(this).attr("index")), right, json);
        });
        //绑定点击事件
        $(right).find('li').on('click', function () {
            commonTools.ClickScreenResult($(this).attr("id"));
        });
    },


    /**
     * 切换筛选项
     * **/
    ClickScreen: function (n, right, data) {

        $(right).empty();
        var str = '';
        for (var i = 0; i < data[n].children.length; i++) {
            str += `<li class="list_" index="${i}">${data[n].children[i].name}</li>`;
        }
        $(right).append(str);
    },


    /**
     * 点击筛选结果
     * **/
    ClickScreenResult: function (id) {
    },


    /**
     * 搜索检测列表
     * **/
    searchEquipment: function (data, fun) {
        // $("#bluetoothList").empty();
        // for(var i = 0;i < data.length;i++){
        //     var str = `
        //     <p class="MaskBluetoothList" id="${data[i].id}">${data[i].name}</p>
        // `;
        //     $("#bluetoothList").append(str);
        //     $("#num").text(i+1);
        // }
        var str = `<p class="MaskBluetoothList" devtype="${data.devType}" ey="${data.EquipmentType}" mac="${data.devMac}">${data.devName}</p>`;
        $("#bluetoothList").append(str);
        $("#num").text($("#bluetoothList").find("p").length);

        $("#MaskPopup").show();
        $(".Maskbg").animate({
            "opacity": 1
        }, 100);
        $(".MaskWrap").animate({
            'bottom': 0.4 + 'rem'
        }, 200);

        //选择设备
        $(".MaskBluetoothList").click(function () {
            fun($(this).text(), //名称
                $(this).attr('mac'), //设备MAC地址
                $(this).attr('ey'), // 设备类型
                $(this).attr('devtype')); //设备irri
            $(".Maskbg").animate({
                "opacity": 0
            }, 100);
            $(".MaskWrap").animate({
                'bottom': -7 + 'rem'
            }, 200, function () {
                $("#MaskPopup").hide();
            });
        });
        //关闭弹出层
        // $(".Maskbg").click(function () {
        //     $(".Maskbg").animate({"opacity": 0}, 100);
        //     $(".MaskWrap").animate({'bottom': -7 + 'rem'}, 200, function () {
        //         $("#MaskPopup").hide();
        //     });
        // });
    },


    /**
     * 检测倒计时
     * **/
    countDown: function (n, fun) {
        var num = n;
        var timer = null;
        str = `
            <div id="test-countDown">
                <span>${num}</span>
            </div>
        `;
        $('body').append(str);
        timer = setInterval(function () {
            num--;
            $("#test-countDown span").text(num);
            if (num == 0) {
                clearInterval(timer);
                $("#test-countDown").remove();
                fun();
            }
        }, 1000);
    },


    /**
     * 弹窗
     * **/
    popup: function (options) {
        if ($("#Popup").length > 0) {
            return false;
        }
        var defaults = {
            title: '',
            img: '',
            msg: [],
            btn: [{
                name: '确定',
                cla: 'msgPopupActivn',
                fun: ''
            },
                {
                    name: '取消',
                    cla: '',
                    fun: ''
                },
            ]
        };
        var settings = $.extend({}, defaults, options);
        var module = {
            title: '',
            img: '',
            msg: [],
            btn: []
        };
        settings.msg.forEach(function (val) {
            module.msg += '<p>' + val + '</p>'
        });
        for (var i = 0; i < settings.btn.length; i++) {
            module.btn += '<input id="popupbtn' + i + '" class="' + settings.btn[i].cla + '" type="button" style="-webkit-user-select:none;" value="' + settings.btn[i].name + '">';
        }
        var str = `
            <div id="Popup" class="msgPopup">
                <div class="msgPopupWrap">
                    ${settings.title == '' ? '' : '<h3 class="msgPopupTitle">' + settings.title + '</h3>'}
                    <div class="msgPopupImg">
                        ${settings.img}
                    </div>
                    <div class="msgPopupText">
                        ${module.msg}
                    </div>
                    <div class="msgPopupBtn">
                        ${module.btn}
                    </div>
                </div>
                <div class="msgPopupbg"></div>
            </div>
        `;
        $("body").append(str);
        if (settings.btn.length == 1) {
            $("#popupbtn0").addClass("msgPopupsingle");
        }
        $("#Popup").show();
        $(".msgPopupWrap,.msgPopupbg").addClass('popup-show');
        //绑定事件
        $("#popupbtn0").off().on('click', function () {
            settings.btn[0].fun();
            $(".msgPopupWrap,.msgPopupbg").removeClass('popup-show');
            setTimeout(function () {
                $("#Popup").remove();
            }, 300);
        });
        $("#popupbtn1").off().on('click', function () {
            settings.btn[1].fun();
            $(".msgPopupWrap,.msgPopupbg").removeClass('popup-show');
            setTimeout(function () {
                $("#Popup").remove();
            }, 300);
        });

    },


    /**
     * 带音频的弹窗
     * **/
    popup_audio: function () {
        $("#Popup_audio").show();
        $(".msgPopupWrap,.msgPopupbg").addClass('popup-show');
        //绑定事件
    },


    /**
     * Tools提示
     * **/
    Eject: function (text, fun) {
        $("#Eject").remove();
        clearTimeout(_data.timerToast);
        var str = `<div id="Eject">
                        <p>${text}</p>
                    </div>`;
        $("body").append(str);
        $("#Eject").css("opacity", 1);
        $("#Eject").show();

        _data.timerToast = setTimeout(function () {
            $("#Eject").animate({
                'opacity': 0
            }, 500, function () {
                $("#Eject").remove();
                if (fun != undefined) {
                    fun();
                }
            });
        }, 2000);
    },
    Eject2: function (text, fun) {//视频专用弹框
        $("#Eject2").remove();
        var str = `<div id="Eject2">
                        <p>${text}</p>
                    </div>`;
        $("body").append(str);
        $("#Eject2").css("opacity", 1);
        $("#Eject2").show();
    },


    /**
     * 页面加载动画
     * **/
    loading_circle: function () {
        $("#loading").remove();
        var str = `
        <div id="loading" class="loading-style-frame">
            <div class="loading-style">
                <div class="double-bounce1"></div>
                <div class="double-bounce2"></div>
            </div>
        </div>`;
        $("body").append(str);
        $("#loading").css("top", commonTools.stateHeader());
    },

    /**
     * 页面加载动画
     * **/
    loading: function () {
        $("#loading").remove();
        var str = `
        <div id="loading" class="loading-style-frame">
            <img class="logoLoging" src="../../images/zc/logoloading.gif">
        </div>`;
        $("body").append(str);
        $("#loading").css("top", commonTools.stateHeader());
    },


    /**
     * 关闭动画
     * **/
    closeLoading() {
        $("#loading").remove();
    },


    /**
     * 页面局部数据加载动画
     * **/
    localLoading: function () {
        var str = `
        <svg id="localLoading" class="localLoading-style" version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
            <path fill="#fff" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
              <animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="1s" from="0 50 50" to="360 50 50" repeatCount="indefinite" />
          </path>
        </svg>
        `
        $("body").append(str);
    },


    /**
     * 计算状态栏+header高度
     * **/
    stateHeader: function () {
        return parseInt($(".consult_header").css("height")) + parseInt($(".consult_header").css("top"));
    },


    /**
     * 当前无数据
     * **/
    currentNotData() {
        var html = `<div class="cur_notdata">
        <img  src="../../images/null_data.png"/>
        <p>啊哦？暂无数据哦</p>
    </div>`;
        $("body").append(html);
        $("body").addClass("fixedWrap");
        // $(".cur_notdata_bg").css("top",commonTools.stateHeader());
    },


    /**
     * 关闭当前无数据
     * **/
    closeCurrentNotData() {
        $(".cur_notdata") ? $(".cur_notdata").remove() : '';
        $("body").removeClass("fixedWrap")
    },

    /**
     * goLogin 展示去登录
     */
    goLogin() {
        var html = `<div class="cur_notdata go_login">
        <img  src="../../images/noInfo.png"/>
        <p>您现在还没有登录,登录后查看咨询消息</p>
        <span onclick="goLogin()">登录/注册</span>
        </div>`;
        $("body").append(html);
        $("body").addClass("fixedWrap");
    },

    /**
     * 关闭去登陆
     */
    closeGoLogin() {
        $(".go_login") ? $(".go_login").remove() : '';
        $("body").removeClass("fixedWrap")
    },

    /**
     * 加载失败页
     * **/
    loadFail() {
        var html = `<div class="cur_notdata_bg">
                <div class="cur_notdata" onclick="refreshFn()">
            <img  src="../../images/load_fail.png"/>
            <p >加载失败，点击重新加载</p>
        </div>
        </div>`;
        $("body").append(html);
        $("body").addClass("fixedWrap");
        $(".cur_notdata_bg").css("top", commonTools.stateHeader());
    },


    /**
     * 关闭加载失败页
     * **/
    closeLoadFail() {
        $(".cur_notdata_bg") ? $(".cur_notdata_bg").remove() : '';
        $("body").removeClass("fixedWrap")
    },


    /**
     * 无数据提示
     * **/
    NotDataTips: function (top, bottom) {
        var t = 0,
            b = 0;
        if (top != undefined) {
            t = top;
        }
        if (bottom != undefined) {
            b = bottom;
        }
        var html = `<div class="notdataTips_bg"><div class="notdataTips">
            <img  src="../../images/null_data.png"/>
            <p>啊哦？暂无数据哦</p>
        </div></div>`;
        $("body").append(html);
        $(".notdataTips_bg").css({
            top: t,
            bottom: b
        });
    },


    /**
     * 关闭无数据提示
     * **/
    closeNotDataTips: function () {
        $(".notdataTips_bg") ? $(".notdataTips_bg").remove() : '';
    },


    /**
     * 在ios上对相应的位置添加空格并返回
     * **/
    iosAddEmpty: function (str) {
        return str.replace(/(.{10})/, "$1&nbsp");
    },


    /**
     * 绑定设备弹窗
     * **/
    bindingPopup: function (id, text, success, err) {
        $(".Popup-info").text(text);
        $(id).show();
        //点击取消
        $("#Popup_close").click(function () {
            if (err != undefined) {
                err();
            }
            $(id).hide();
        });
        //点击确认
        $("#Popup_submit").click(function () {
            if (success != undefined) {
                success();
            }
            $(id).hide();
        });
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


    /**
     * 判断软键盘是否弹出 根据浏览器窗口改变来判断
     * **/
    Botisplay: function () {
        var h = $(window).height();
        $(window).resize(function () {
            if ($(window).height() < h) {
                $("#Footer").hide();
            }
            if ($(window).height() >= h) {
                $("#Footer").show();
            }
        });
    },


    /**
     * 拆分手机号
     * **/
    splitTel: function (tel) {
        return tel.substr(0, 3) + ' ' + tel.substr(3, 4) + ' ' + tel.substr(7);
    },


    /**
     * 图片放大
     * **/
    magnifyImg: function (url) {
        var isZoom = false;
        var html = `
            <div id="previewImg" style="position:absolute;top:0px;bottom:0;left:0;right:0;background-color: #000;overflow:hidden;z-index: 104;">
                <img id="previewImg-item" src="${url}" style="width:100%;transform: rotate(90deg);transform-origin:00% 00%;cursor:pointer;" />
                <input id="previewImg-close" type="button" value="关闭" style="font-size:0.3rem;transform: rotate(90deg);width:1.2rem;height:0.65rem;color:#fff;background-color: rgba(0,0,0,0.6);box-shadow:0 0 8px 1px rgba(0,0,0,0.3);position:fixed;bottom:0.6rem;left:0.15rem;border-radius: 0.1rem;font-weight: bold;z-index: 10000;">
            </div>
        `;
        $("body").append(html);
        var _H = $("#previewImg").height();
        var _w = $("#previewImg").width();
        $("#previewImg-item").css({
            'width': _H,
            'height': _w,
            'position': 'absolute',
            'top': 0,
            'left': 100 + '%'
        })
        //dblclick
        $("#previewImg-close").click(function (event) {
            $("#previewImg").remove();
        })
        $("#previewImg-item").dblclick(function (event) {
            if (!isZoom) {
                $("#previewImg").css({
                    "overflow": "auto"
                });
                $("#previewImg-item").css({
                    "width": "auto",
                    'height': 'auto'
                });
                var eleH = $("#previewImg-item").css("height");
                $("#previewImg-item").css({'left': eleH});
                isZoom = true;
            } else {
                $("#previewImg").css({
                    "overflow": "hidden"
                });
                $("#previewImg-item").css({
                    "width": _H,
                    'height': _w,
                    'left': '100%'
                });
                isZoom = false;
            }
            event.stopPropagation();
        });
    },
    /**
     * 去除 空格 回车 换行
     * **/
    iGetInnerText: function (testStr) {
        var resultStr = testStr.replace(/\ +/g, ""); //去掉空格
        resultStr = testStr.replace(/[ ]/g, ""); //去掉空格
        resultStr = testStr.replace(/[\r\n]/g, ""); //去掉回车换行
        return resultStr;
    },


    /**
     * 图片放大不旋转
     * **/
    magnifyImg_noRotate: function (url) {
        var isZoom = false;
        var html = `
            <div id="previewImg" style="position:absolute;top:0px;bottom:0;left:0;right:0;background-color: #000;overflow:hidden;z-index: 104;display:flex;align-items: center;">
                <img id="previewImg-item" src="${url}" style="width:100%;cursor:pointer;z-index: 1000;" />
            </div>
        `;
        $("body").append(html);

        $("#previewImg-item").dblclick(function (event) {
            $("#previewImg").remove();
        })


    },

    /**
     * 判断是否是特殊
     * **/
    checks: function (newName) {
        var regEn = /[`!@#$%^&*()_+<>:"{}\\\/;'[\]]/im,
            regCn = /[·！#￥（——）：；“”‘、|《》、【】[\]]/im;
        if (regEn.test(newName) || regCn.test(newName)) {
            return true;
        }
        return false;
    },
    //---------------------------------------------------
    // 日期格式化
    // 格式 YYYY/yyyy/YY/yy 表示年份
    // MM/M 月份
    // W/w 星期
    // dd/DD/d/D 日期
    // hh/HH/h/H 时间
    // mm/m 分钟
    // ss/SS/s/S 秒
    //---------------------------------------------------
    nowtime: function () {
        function p(s) {
            return s < 10 ? '0' + s : s;
        }

        var myDate = new Date();
        //获取当前年
        var year = myDate.getFullYear();
        //获取当前月
        var month = myDate.getMonth() + 1;
        //获取当前日
        var date = myDate.getDate();
        var h = myDate.getHours(); //获取当前小时数(0-23)
        var m = myDate.getMinutes(); //获取当前分钟数(0-59)
        var s = myDate.getSeconds();

        var now = year + '-' + p(month) + "-" + p(date) + " " + p(h) + ':' + p(m) + ":" + p(s);
        return now;
    },
    /**
     * linux时间戳转时间格式
     * **/
    fmtDate: function (obj) {
        obj = Number(obj);
        var date = new Date(obj);
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var miao = date.getSeconds();
        if (miao >= 0 && miao <= 9) {
            miao = "0" + miao;
        }
        var Hours = date.getHours();
        if (Hours >= 0 && Hours <= 9) {
            Hours = "0" + Hours;
        }


        var minuts = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
            " " + Hours + seperator2 + minuts +
            seperator2 + miao;
        return currentdate;
    },


    /**
     * 计算年龄
     * **/
    jsGetAge(strBirthday){

        var returnAge = '';

        var strBirthdayArr = strBirthday.split("-");

        var birthYear = strBirthdayArr[0];
        var birthMonth = strBirthdayArr[1];

        var birthDay = strBirthdayArr[2];

        d = new Date();

        var nowYear = d.getFullYear();
        var nowMonth = d.getMonth() + 1;
        var nowDay = d.getDate();
        if (nowYear == birthYear) {

            returnAge = 0; //同年 则为0岁
        } else {

            var ageDiff = nowYear - birthYear; //年之差

            if (ageDiff > 0) {
                if (nowMonth == birthMonth) {
                    var dayDiff = nowDay - birthDay; //日之差
                    if (dayDiff < 0) {
                        returnAge = ageDiff - 1;
                    } else {
                        returnAge = ageDiff;
                    }
                } else {
                    var monthDiff = nowMonth - birthMonth; //月之差
                    if (monthDiff < 0) {
                        returnAge = ageDiff - 1;
                    } else {
                        returnAge = ageDiff;
                    }
                }
            }

        }
        return returnAge;
    },
    /**
     * 接口返回接口过滤
     * **/
    interface : function(data){
        switch (data.code) {
            case '1000' :
                console.log(data);
                break;
            case '1002' :
                alert("用户未登录")
                break;
        }
        return true;
    }
};


/**
 * BUG解决方法
 * **/
var dealingBug = {
    /**
     * 解决ios键盘唤起，键盘收起以后页面不归位
     * 失去焦点时触发方法
     * **/
    changeBlur(){
        let u = navigator.userAgent, app = navigator.appVersion;
        let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        if(isIOS){
            setTimeout(() => {
                const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
                window.scrollTo(0, Math.max(scrollHeight - 1, 0))
            }, 200)
        }
    },
}
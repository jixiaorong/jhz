// var currentDId = "";//当前聊天医生的id 房间

var structure = {
    /**
     * testLayer () 处理来自各个检测列表的待发送报告弹窗
     * fn 点击发送的回调函数
     * type 报告的类型
     * doctorObj//医生的属性
     * patientsText 检测记录的名称(血压检测 血氧检测。。。)
     * testPeplo 检测人的属性
     * */
    testLayer(doctorObj, cardInfo, testPeplo, patientsText, fn) {
        var titleText = "",
            testName = cardInfo.testName;;
        var recordType = cardInfo.recordType
        switch (recordType) {
            case "1":
                titleText = "检测记录";
                break;
            case "2":
                titleText = "健康档案";
                break;
            case "3":
                titleText = "咨询病历";
                break;
        }
        var testTitle = (cardInfo.recordType == "1" ? patientsText : "")
        var sexPic = (testPeplo.sex == "1" ? "../../images/bloodPressure/pic_04.png" : '../../images/bloodPressure/pic_03.png');
        showConfirm({
            text: '发送给',
            doctorPic: imgUrl + doctorObj.faceimage, //'../../images/doctor/portrait.png',
            patientsPic: myheader, // testPeplo.faceimages, // '../../images/zc/head-001.jpg',
            doctorText: doctorObj.doctorname, // '张国',
            titleText: doctorObj.profession, //'主治医师',
            patientsText: titleText,
            topName: testName, // '阿的神灯',
            sexPic: recordType == '2' ? sexPic : '',
            bottomAge: recordType == '2' ? '年龄:' : '',
            textTime: MYCOMMON.nowtime(cardInfo.cardTimestamp),
            valueAge: recordType == '2' ? testPeplo.age : '', // '68',
            bottomBlood: recordType == '2' ? '血型:' : '',
            valueBlood: recordType == '2' ? testPeplo.bloodtype : '', // 'A',
            rightText: '发送',
            leftText: '取消',
            detection: testTitle,
            identity: cardInfo.relationshipname, //"",//亲属标签
            success: function () {
                fn ? fn() : ''
            },
            cancel: function () {
                // showToast({
                //     text: '发送失败'
                // })
            }
        });
    },

    /**
     * appendChat()主动发送/接受消息消息追加页面
     * @param {*} msg 消息主体
     * @param {*} isShowTime 判断上一个消息时间与现在的消息的时差
     * isRecord s是不是记录内容
     * @param who
     */
    appendChat(msg, isShowTime, isRecord, who) {
        var html = ``;
        html +=
            `
    <li id=${msg.starttime}>
            <p class="tip_time ${isShowTime ? '' : 'd_none'}">${MYCOMMON.itrmTimeStyle(msg.starttime)}</p>
            <div class="chat_box clearfix ${who ? 'self' : 'other'}">
                <div class="header_img">
                    <img src="${who ? myheader : doctorheader}" onerror="setErrorHeader(this)">
                </div>
                <p class="msg_detail">${String(msg.body)}</p>
            </div>
        </li>
    `;
        isRecord ? $("#chat").prepend(html) : $("#chat").append(html);
        scrollBottom()
    },

    /***
     * appendImage() 追加图片类型的消息
     *  @param {*} isShowTime 判断上一个消息时间与现在的消息的时差
     * isRecord 是否是历史记录
     * who 
     * 
     */
    appendImage(imageMsg, isShowTime, isRecord, who) {
        var html = ``;
        var imageUrl = "",
            getUrl = "";

        imageUrl = ((testImg ? testImgUrl : imgUrl) + imageMsg.body)
        getUrl = false
        html +=
            `
    <li id="${imageMsg.starttime}">
        <p class="tip_time ${isShowTime ? '' : 'd_none'}">${MYCOMMON.itrmTimeStyle(imageMsg.starttime)}</p>
        <div class="chat_box clearfix ${who ? 'self' : 'other'}">
            <div class="header_img">
                <img src="${who ? myheader : doctorheader}" onerror="setErrorHeader(this)">
            </div>
           <p class="msg_image ${who && !isRecord ? 'd_none' : 'd_block'}"><img src="../../images/placeholder.png" 
                alt="" data-url="${imageUrl}" onload="setPlacerHolder(this)" onerror="setError(this)"><i class="send_state ${who ? 'd_none' : 'd_none'} ${isRecord ? 'd_none' : ''}"></i></p>
            <p class="msg_image ${who && !isRecord ? 'd_block' : 'd_none'}"><img src="${imageUrl}"   alt=""  onerror="setError(this)"></p>
        </div>
    </li>`;
        isRecord ? $("#chat").prepend(html) : $("#chat").append(html);
        structure.bindImgBig(imageMsg.starttime, imageUrl)
        structure.setImgSize(imageMsg.body, imageMsg.starttime, getUrl, isRecord)
        scrollBottom();
    },

    /***
     * appendVoiceTalk() 追加短语音类型的消息
     *  @param {*} isShowTime 判断上一个消息时间与现在的消息的时差 
     * who 
     */
    appendVoiceTalk(msg, isShowTime, isRecord, who) {
        var html = ``;
        // var imageUrl = "";
        // if(who && !isRecord){
        //     imageUrl=msg.body;
        //    }else{
        //     imageUrl = ((testImg?testImgUrl:imgUrl)+ msg.body)
        //    }

        var timeLength = msg.timeLength ? msg.timeLength : msg.body.split(".")[0].split("-")[2]
        var secondLogo = "``"
        //     <div id="${msg.starttime}">
        //     <p class="tip_time ${isShowTime ? '' : 'd_none'}">${MYCOMMON.itrmTimeStyle(msg.starttime)}</p>
        //     <div class="chat_box clearfix ${who ? 'self' : 'other'}">
        //         <div class="header_img">
        //             <img src="${who ? myheader : doctorheader}" onerror="setErrorHeader(this)">
        //         </div>
        //         <p onclick="autoPlay(event)" data-flag="${who ? 'self' : 'other'}" data-url="${msg.body}" data-length="${timeLength}"
        //             class="msg_detail" style="width:calc(0.05rem*${timeLength} + 1.2rem); ${who ? 'text-align: end;' : ''}"><span>${timeLength}</span>${secondLogo}
        //         <span class="voice_img"></span><i class="send_state ${who ? 'd_none' : 'd_none'} ${isRecord ? 'd_none' : ''}"></i></p>
        //     </div>
        // </div>
        html += `
        <li id="${msg.starttime}">
        <p class="tip_time ${isShowTime ? '' : 'd_none'}">${MYCOMMON.itrmTimeStyle(msg.starttime)}</p>
            <div class="chat_box clearfix ${who ? 'self' : 'other'}">
                <div class="header_img">
                    <img src="${who ? myheader : doctorheader}" onerror="setErrorHeader(this)">
                 </div>
                <p onclick="autoPlay(event)" data-flag="${who ? 'self' : 'other'}" data-url="${msg.body}" data-length="${timeLength}"
                    class="msg_detail" style="width:calc(0.05rem*${timeLength} + 1.2rem); ${who ? 'text-align: end;' : ''}"><span>${timeLength}</span>${secondLogo}
                 <span class="voice_img"></span></p>
            </div>
        </li>
        `;
        isRecord ? $("#chat").prepend(html) : $("#chat").append(html);
        scrollBottom()
    },

    /**
     * appendRadioUi() 追加医生发来的语音和视频
     * msg 接受到的消息体
     * type 根据类型判断是语音还是视频 1 视频 2 语音
     * isShowTime 判断距上一条消息的时间差
     * testMsg 提示语
     */
    appendRadioUi(msg, isShowTime, isRecord, type, testMsg, who) {
        var logoImg = ""
        if (type == "1") {
            logoImg = who ? "../../images/consult/shipin_2.png" : "../../images/consult/video.png"
        } else {
            logoImg = who ? "../../images/consult/yuyin_2.png" : "../../images/consult/radio.png"
        }
        // (type == "1" ? "../../images/consult/video.png" : "../../images/consult/radio.png");
        var html = ``;
        html += `
        <li id="${msg.starttime}">
            <p class="tip_time ${isShowTime ? '' : 'd_none'}">${MYCOMMON.itrmTimeStyle(msg.starttime)}</p>
            <div class="chat_box clearfix ${who ? 'self' : 'other'}">
                <div class="header_img">
                    <img src="${who ? myheader : doctorheader}" onerror="setErrorHeader(this)">
                </div>
                <p class="msg_detail"><span>${testMsg}</span><span class="video_img" style="${type == '2' ? 'margin-right:0;' : ''}"><img
                            src="${logoImg}" alt="" style="${type == '2' ? 'height:0.4rem;width:0.26rem;' : ''}" ></span></p>
            </div>
        </li>`;
        isRecord ? $("#chat").prepend(html) : $("#chat").append(html);
        scrollBottom()
    },

    /**
     * appendVideoW 添加视频窗口
     * @param {*} doctorObj  医生的信息
     */
    appendVideoW(doctorObj, isRecord) {
        if (isRecord) {
            return false;
        }
        var html = ``;
        html += `
        <div class="link_window">
        <p class="link_title"><span @click="closeVideo"><img src="../../images/consult/close.png" alt=""></span>
        </p>
        <div class="video_invit">
            <p class="invit_header"><span><img src="../../images/bloodPressure/male.png" onload="setPlacerHolder(this)" data-url="${imgUrl + doctorObj.faceimage}" alt="" onerror="setErrorHeader(this)"></span></p>
            <p class="invit_name">${doctorObj.doctorname}</p>
            <p>正在邀请您视频...</p>
        </div>
        <div class="video_menu">
            <div class="cancel_ left">
                <span onclick="cancelVideo()"></span>
                <p>取消</p>
            </div>
            <div class="receive_ right">
                <span onclick="receiveVideo()"></span>
                <p>接受</p>
            </div>
        </div>
    </div>`;
        $("#pageContents").append(html);
        scrollBottom()

    },

    /**
     * appendSelfTest() 向页面追加卡片自己的检测记录1/健康档案2/病历3
     * @param {*} doctorObj  医生的对象
     * @param {*} testTitle 检测报告类型 / 病历由谁创建
     * @param {*} timer 检测的时间戳
     * @param {*} type  类型
     */
    // appendSelfTest(doctorObj, testPeplo, testTitle, timer, type) {
    appendSelfTest(doctorObj, testPeplo, msg, isShowTime, isRecord, who) {

        // var isShowTime = MYCOMMON.judgeGreater(msg.starttime, structure.lastTimeFn(isRecord)); //是否展示时间
        // var isShowTime =(blooean=="2"?MYCOMMON.judgeGreater(msgBody.starttime, structure.lastTimeFn(isRecord)):blooean); //是否展示时间) 
        var testTitle = msg.testTitle,
            starttime = msg.starttime,
            recordType = msg.recordType; //卡片的类型 检测记录1/健康档案2/病历3
        cardTimestamp = msg.cardTimestamp ? msg.cardTimestamp : msg.starttime; //检测记录的唯一标识
        testId = msg.testId //检测记录的类型

        var titleImg = "",
            testName = "";
        var html = ``,
            titleText = '';
        switch (recordType) {
            case "1":
                titleImg = "../../images/mine/cases_icon_01.png";
                testName = msg.testName;
                titleText = "检测记录";
                break;
            case "2":
                titleImg = myheader;
                testName = testPeplo.name;
                titleText = "健康档案";
                break;
            case "3":
                titleImg = "../../images/mine/cases_icon.png";
                testName = msg.testName;
                titleText = "咨询病历";
                testId = msg.caseid;
                break;
        }
        var sexPic = (testPeplo.sex == "1" ? "../../images/bloodPressure/pic_04.png" : '../../images/bloodPressure/pic_03.png'); //性别图像


        html +=
            `
    <li id=${starttime}>
            <p class="tip_time  ${isShowTime ? "" : "d_none"}">${MYCOMMON.itrmTimeStyle(starttime)}</p>
            <div class="chat_box clearfix ${who ? 'self' : 'other'}">
                <div class="header_img">
                    <img src="${who ? myheader : doctorheader}" onerror="setErrorHeader(this)">
                </div>
                <div class="health_Records" onclick="structure.goInHealth(${recordType},${cardTimestamp},${testId})">
                    <div class="Records_top">
                        <p class="font30_60">${titleText}</p>
                        <p class="information_time down1 ${recordType == '2' ? 'd_none' : ''}">${MYCOMMON.nowtime(cardTimestamp)}</p>                       
                    </div>
                    <div class="information">
                        <p class="border_block"></p>
                        <div class="patients_">
                            <img class="user_pic" src="${titleImg}">
                            <div class="patients_right">
                                <div class="right_top">
                                    <span class="font28_33 overflowD">${testName}</span>
                                    <img class="sex_pic down ${recordType == '2' ? 'd_block' : 'd_none'}" src="${sexPic}">
                                    <span class='identity down1 ${recordType != '2' && msg.relationshipname ? 'd_block' : 'd_none'}'>${msg.relationshipname}</span>
                                </div>
                                <div class="right_bottom">
                                    <span class="font26_86 down ${recordType != "2" ? 'd_none' : 'd_block'}">年龄:${testPeplo.age}</span>
                                    <span class="font26_86 blood down ${recordType != "2" ? 'd_none' : 'd_block'}" style="margin-left: 0.2rem;">血型:${testPeplo.bloodtype}</span>
                                    <span class="font26_33 down1 ${recordType == '1' ? 'd_block' : 'd_none'}">${testTitle ? testTitle : ""}</span>
                                    <span class="font26_33 down1 ${recordType == '3' ? 'd_block' : 'd_none'}">创建·${msg.setDoctorname}医生</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </li>
        <li class="${msg.type == "closeorder" && !who ? 'd_block' : 'd_none'}">
            <p class="cancel_ask"><a href="javascript:;" class="font26_86">问诊已结束</a></p>
        </li>
    `;
        isRecord ? $("#chat").prepend(html) : $("#chat").append(html);
        // consultInfoParma.report = false; //归位
        consultInfoParma.cardInfo = {}; //归位
        scrollBottom()
    },

    /**
     * addList() 追加即时通讯医生列表页面列表结构
     * @param {*} consultList 可以聊天的医生数组
     */
    addList(consultList) {
        var html = '';
        consultList.forEach(function (val, index) {
            var msgContent = structure.setListType(val.type, val.body);
            html += `<li id="${val.doctoruuid}" data-id="${val.doctorid}" class="flagBox">
            <div class="left">
                <span class="doctor_sheader"><i class="unread ${val.unReadNum > 0 ? 'd_block' : ''}">${val.unReadNum}</i><img src="../../images/bloodPressure/male.png" onload="setPlacerHolder(this)" data-url="${imgUrl + val.faceimage}" alt="" onerror="setErrorHeader(this)"></span>
            </div>
            <div class="right">
                    <p class="doctor_simple"><span class="doctor_name user_name">${val.doctorname}</span><span class="doctor_department ">${val.profession}</span> <span class="consult_time">${MYCOMMON.itrmTimeStyle(val.starttime)}</span></p>
                    <p class="font26_33 new_mag">${msgContent}</p>
            </div>
        </li>`;

        })
        $("#consultList").append(html);

    },
    /**
     *changeList() 改变咨询列表的顺序
     *@param: msg  接受到的消息体
     *@param: consultLists 医生的列表数据
     *@param: unReadNum  未读消息数量
     */
    changeList(msg, unReadNum) {
        var $id = "",
            doctorId = "",
            curDoctor = {};
        var msgContent = structure.setListType(msg.type, msg.body);

        if (msg.type == "order") {
            curDoctor = JSON.parse(msg.body).doctorInfo
            curDoctor.faceimage = curDoctor.faceimage;
            doctorId = curDoctor.id
            $id = curDoctor.doctoruuid;
            consultBox.consultLists = structure.changeDoctorList($id, "0", "", msg.type, msg.starttime, curDoctor)
        } else {
            $id = msg.id.substr(1, 32); //得到医生的唯一的uuid
            curDoctor = structure.mapDoctorList($id, consultBox.consultLists); //获取页面上医生的属性
            consultBox.consultLists = structure.changeDoctorList($id, unReadNum, msgContent, msg.type, msg.starttime)
            // doctorId = curDoctor?curDoctor.doctorid:"";
            if (curDoctor) {
                doctorId = curDoctor.doctorid;
            } else {
                var setData = common.getCacheInfo() ? JSON.parse(common.getCacheInfo()) : {};
                setData.consult = true
                common.setCacheInfo(setData)
            }
        }
        if (curDoctor) {
            var html = ``;
            html += `<li id="${$id}" data-id="${doctorId}">
                        <div class="left">
                            <span class="doctor_sheader"><i class="unread ${unReadNum ? '' : 'd_none'}">${unReadNum ? unReadNum : "0"}</i><img src="${imgUrl + curDoctor.faceimage}"  alt="" onerror="setErrorHeader(this)"></span>
                        </div>
                        <div class="right">
                            <p class="doctor_simple"><span class="doctor_name">${curDoctor.doctorname}</span><span class="doctor_department ">${curDoctor.profession}</span> <span class="consult_time">${MYCOMMON.itrmTimeStyle(msg.starttime)}</span></p>
                            <p class="font26_33 new_mag" >${msgContent}</p>
                        </div>
                    </li>`;
            $("#" + $id) ? $("#" + $id).remove() : ""; // 将当前来消息的id删除 
            $("#consultList").prepend(html); // 再重新向前追加进来
        }

    },

    /**
     *setListType() 处理消息列表页的type
     *type 传入的消息类型
     val 如果是chat 就是文本 视频语音就是时长
     */
    setListType(type, val) {
        var msgContent = "";
        switch (type) {
            case "chat": //文本
                msgContent = val;
                break;
            case "image": //图片
                msgContent = "[图片]";
                break;
            case "card": //图片
                var bodyInfo = typeof val == "string" ? JSON.parse(val) : val;
                switch (bodyInfo.recordType) {
                    case "1":
                        msgContent = "[" + bodyInfo.testTitle + "]";
                        break;
                    case "2":
                        msgContent = "[健康档案]";
                        break;
                    case "3":
                        msgContent = "[咨询病历]";
                        break;
                }
                break;
            case "voicetalk": //短语音
                msgContent = "[语音]";
                break;
            case "thenvideo": //短语音
                msgContent = "[视频问诊]";
                break;
            case "closeorder": //结单
                msgContent = "[咨询病历]";
                break;
            case "isstate": //结单
                msgContent = "[正忙]";
                break;
            case "acceptorder": //结单
                msgContent = "[已接单]";
                break;
            case "order": //订单
                msgContent = "";
                break;
            case "rejectvideo": //拒绝视频 对方拒绝视频
                msgContent = "[已拒绝]";
                break;
            case "hangingvideo": //挂断视频
                var aftertime = JSON.parse(val).aftertime
                if (aftertime == "0") {
                    msgContent = "[已取消]"
                } else {
                    msgContent = "[视频时长" + aftertime + ']';
                }

                break;
            case "rejectvoice": //拒绝语音
                msgContent = "[已拒绝]";
                break;
            case "hangingvoice": //挂断语音
                var text = "语音时长" + JSON.parse(val).aftertime
                msgContent = text;
                break;
            case "sendvideo": //接受到医生发来的视频
                msgContent = "[请求视频]";
                break;
            case "rejectvideo": //拒接的视频
                msgContent = "[已取消]";
                break;
        }
        return msgContent;
    },

    /**
     * setUnRead() 设置未读条数 并显示
     * 
     */

    setUnRead($id, type) {

        var unreadNum = $("#" + $id + " .doctor_sheader .unread").text();
        var nums = Number(unreadNum) + 1;
        nums = nums > 99 ? "..." : nums;
        $("#" + $id + " .doctor_sheader .unread").show().text(nums);
        consultBox.consultLists = structure.changeDoctorList($id, nums, $("#" + $id + " .new_mag").text())
    },
    /**
     *getListIndex() 获取当前咨询列表消息所在列表中的索引
     *@param:consultList 消息列表
     *@param:itemId 消息体重的from
     *return 返回当前的索引
     */
    getListIndex(consultList, itemId) {
        var item;
        consultList.forEach(function (val, index) {
            if (val.doctorId == itemId) {
                item = index;
            }
        })
        return item;
    },
    /**
     * mapObj() clone一个对象并返回
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
    /***
     * addUi追加页面聊天内容
     * @param：msgBody 接受或发送的消息体 :{}  必须有body这个属性
     * isRecord 是不是记录内容
     */
    addUi(msgBody, isRecord, who, blooean) {
        var isShowTime = (blooean == "2" ? MYCOMMON.judgeGreater(msgBody.starttime, structure.lastTimeFn(isRecord)) : blooean); //是否展示时间) 
        switch (msgBody.type) {
            case "chat": //文本
                structure.appendChat(msgBody, isShowTime, isRecord, who)
                break;
            case "image": //图片
                structure.appendImage(msgBody, isShowTime, isRecord, who)
                // magnifyImg(msgBody.timestamp); //绑定点击放大事件
                break;
            case "card":
                structure.appendSelfTest(doctorObj, testPeplo, msgBody, isShowTime, isRecord, who)
                break;
            case "voicetalk": //短语音
                structure.appendVoiceTalk(msgBody, isShowTime, isRecord, who)
                break;
            case "order": //订单
                // structure.appendVoiceTalk(msgBody, isShowTime, isRecord, who)
                break;
            case "closeorder": //关闭订单 医生发回一个咨询病历
                structure.appendSelfTest(doctorObj, testPeplo, msgBody, isShowTime, isRecord, who)
                break;
            case "busy": //繁忙
                // structure.appendSelfTest(doctorObj, testPeplo, msgBody, isRecord)
                break;
            case "rejectvideo": //拒绝视频 对方拒绝视频
                structure.appendRadioUi(msgBody, isShowTime, isRecord, "1", "已拒绝", who)
                break;
            case "isstate": //正忙
                structure.appendRadioUi(msgBody, isShowTime, isRecord, "1", "正忙", who)
                break;
            case "hangingvideo": //挂断视频
                // var text = "视频时长" + JSON.parse(msgBody.body).aftertime;
                var aftertime = (isRecord ? msgBody.body.aftertime : JSON.parse(msgBody.body).aftertime);
                var text = "";
                if (aftertime == "0") {
                    text = "已取消"
                } else {
                    text = "视频时长" + aftertime
                }
                structure.appendRadioUi(msgBody, isShowTime, isRecord, "1", text, who)
                break;
            case "rejectvoice": //拒绝语音
                structure.appendRadioUi(msgBody, isShowTime, isRecord, "2", "已拒绝", who)
                break;
            case "hangingvoice": //挂断语音
                var text = "语音时长" + JSON.parse(msgBody.body).aftertime
                structure.appendRadioUi(msgBody, isShowTime, isRecord, "2", text, who)
                break;
            // case "sendvideo": //接受到医生发来的视频
            //     structure.appendVideoW(doctorObj, isRecord)
            //     break;
            case "rejectvideo": //拒接的视频
                structure.appendRadioUi(msgBody, isShowTime, isRecord, "1", "已取消", who)
                break;
        }
    },
    //  获取最后一条消息发送/接受的时间
    // isRecord 是否是记录
    lastTimeFn(isRecord) {
        var lisi = $("#chat").find("li");
        if (lisi.length > 0) { //前面有消息       
            var curid = $("#chat").find("li").eq(lisi.length - 1).prop("id");
            curid = curid ? curid : $("#chat").find("li").eq(lisi.length - 2).prop("id")
            var lastLi = (isRecord ? $(lisi[0]).prop("id") : curid);
            return lastLi
        } else if (lisi.length == 0) {
            return "1"
        } else { //前面没有消息
            return "0";
        }
    },
    /**
     * mapDoctorList  遍历医生列表返回传入id 返回改医生详情
     * dortorObj 医生列表对象的数组
     * $id  传入的id
     */
    mapDoctorList($id, dortorObj) {
        var hasThatDoctor = null;
        dortorObj.forEach(function (val, index) {
            if (val.doctoruuid == $id) {
                hasThatDoctor = val;
            } else { }
        })
        return hasThatDoctor;
    },
    changeDoctorList($id, unReadNum, msgContent, type, time, curDoctor) {
        var obj = [];
        var length = 1;
        consultBox.consultLists.forEach(function (val) {
            if (val.doctoruuid != $id) {
                obj.push(val)

            } else {
                msgContent ? val["body"] = msgContent : "";
                time ? (val.starttime = time) : ""
                type ? (val.type = type) : ""
                unReadNum ? (val.unReadNum = unReadNum) : ""
                obj.unshift(val);
                length++;
            }
        })
        if (length == "1" && type == "order") {
            obj.unshift({
                doctorname: curDoctor.doctorname, //医生姓名
                faceimage: curDoctor.faceimage, //医生头像
                doctorid: curDoctor.id, //医生id
                doctoruuid: curDoctor.doctoruuid, //医生uuid
                profession: curDoctor.profession, //职称
                unReadNum: "0",
                starttime: time,
                type: type,
                body: msgContent,
            })
        }
        return obj;
    },
    /***
     * bindImgBig() 给接收到的图片绑定点击放大事件
     * timer 消息的父元素id
     * msg 图片的src地址
     */
    bindImgBig(timer, msg) {
        $("#" + timer + " .msg_image").click(function () {
            var bgImgBg = ``;
            bgImgBg += `<div class="bg_imgbg" onclick="hideBig(this)"><img src="${msg}"  onerror="setError(this)"></div>`;
            $("body").append(bgImgBg);       
        })
    },

    // 进入各自标签的详情页
    /**
     * goInHealth() 点击卡片进入详情页活健康报告页
     * type 卡片的类型
     * needParam 需要拿到数据的参数
     * testTitle 如果是检测报告 是哪个检测报告
     * typeId 血液检测的id
     */
    goInHealth(type, needParam, testTitle) {
        consultInfoParma["timer"] = y(needParam);
        if (type == 3) { //咨询病历
            consultInfoParma["timer"] = y(testTitle);
            common.openwin('new/html/mine/casesDetails', '', consultInfoParma);
        } else if (type == 2) { //健康档案
            common.openwin('new/html/mine/healthRecords', '', consultInfoParma);
        } else { //检测记录
            switch (testTitle) {
                case 1:
                    common.openwin('new/html/ECGcheck/healthReport', '', consultInfoParma);
                    break;
                case 2:
                    common.openwin('new/html/bloodPressure/healthReport', '', consultInfoParma);
                    break;
                case 3:
                    common.openwin('new/html/blood/bloodReport', '', consultInfoParma);
                    break;
                case 4:
                    common.openwin('new/html/urineTest/healthReport', '', consultInfoParma);
                    break;
                case 5:
                    common.openwin('new/html/bloodFat/testResult', '', consultInfoParma);
                    break;
                case 6:
                    common.openwin('new/html/bloodOxygen/healthReport', '', consultInfoParma);
                    break;
            }
        }
    },
    /**
     * setImgSize 处理接受发送的图片的格式 大小
     * @param {*} body 图片的地址
     * @param {*} timestamp  该图片的时间戳
     * getUrl 是否要设置base64格式的图片
     */
    setImgSize(body, timestamp, getUrl, isRecord) {
        var img = new Image();
        var imageUrl = (testImg ? testImgUrl : imgUrl);
        img.src = getUrl ? body : imageUrl + body;
        // img.src = imageUrl + body;
        img.onload = function () {
            var imgSize = MYCOMMON.imgSize(this.width, this.height);
            $("#" + timestamp + " .msg_image img").css({
                width: imgSize.width + "px",
                heigth: imgSize.height + "px"
            })
            if (!isRecord) {
                scrollBottom()
            } //
        }
    },

    /**
     * 判断是否可以追加结构
     * timestamp 发送成功后返回的时间戳
     */

    addToNewMsg(timestamp, pageTime) {
        if (pageTime == "1" || timestamp > pageTime) {
            return true;
        } else {
            return false;
        }
    },
    /**
     * 判断是否可以追加结构
     * timestamp 发送成功后返回的时间戳
     */

    removeRep(list, pageTime) {
        list.forEach(function (val, index) {
            if (val.timestamp > pageTime) {
                $("#" + val.timestamp).remove()
            }
        })
    },

};

function y(w) {
    return w ? w : ""
};

// 设置占位图
function setPlacerHolder(that) {
    that.onload = null;
    var urlImg = $(that).attr("data-url") ? $(that).attr("data-url") : "../../images/placeholder.png";
    $(that).attr("src", urlImg)
}

// 当接受发送的图片类型出错时
function setError(that) {
    that.onerror = null;
    $(that).attr("src", "../../images/placeholder.png")
}

// 当医生、患者的头像请求有问题时
function setErrorHeader(that) {
    that.onerror = null;
    $(that).attr("src", "../../images/bloodPressure/male.png")
}


// 发送消息

function sendAllMsg(obj) {
    var timer = obj.timer ? obj.timer : String(new Date().getTime()); //当前时间的时间戳
    var msgBody = {
        starttime: timer,
        type: obj.type,
        id: obj.id,
        body: obj.body,
    }
    common.sendMsg(msgBody);
}

// websocket 发送检测报告消息
function websocketSendCard(obj) {

    common.ajaxFun("post", "/openfire/submitMessage", obj, "successSendCard", "errorSendCard");
}

// websocket 发送消息成功
function successSendCard(data) {
    if (data.code == "1002") { // 未登录
        common.openwin('new/html/login/phoneLogin', '', '');
        common.goback()
    }
    if (data.code == "1000" && data.msg == "操作成功") {
        // var getData = data.data;//messageId  timestamp
        // $("#" + getData.messageId).attr("id", getData.timestamp);//重新设置id
        common.goback()
    } else {
        commonTools.Eject(data.msg)
        common.goback()
    }
}


// websocket 发送消息失败
function errorSendCard(error) {
    commonTools.Eject("发送失败")
}


function dealWithBody05(list, fn, isRecord) {
    // var msg = {};
    // list.forEach(function (val, index) {
    //     msg = dealBody(val, isRecord)
    //     var who = (val.direction == "to" ? "self" : "");
    //     fn(msg, isRecord, who);
    // })
    for (var i = 0; i < list.length; i++) {
        var val = list[i];
        var msg = dealBody(val, isRecord);
        var who = (val.direction == "to" ? "self" : "");
        var startTime = val.starttime ? val.starttime : val.timestamp

        if (isRecord && i < list.length) {
            var val01 = list[i + 1],
                startTime02 = val01.starttime ? val01.starttime : val01.timestamp;
            var bole = MYCOMMON.judgeGreater(startTime, startTime02);
            fn(msg, isRecord, who, bole);
        } else {
            fn(msg, isRecord, who, "1");
        }
    }
}
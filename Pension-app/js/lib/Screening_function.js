var Screening =  {
    changeSpeed:function(id,label) {
        var value = $('#'+id).val();
        var valStr = value + "% 100%";
        $('#value1').html((value / 10).toFixed(1));
        $('#'+id).css({
            "background-size": valStr
        });
        $('#'+label).text(value+'%');
        $('#'+label).css({
            "left": value+'%'
        });
        $("input[name='animat_speed']").val((value / 10).toFixed(1));
    },
    changeSpeed_num:function(id,label) {
        var value = parseInt($('#'+id).val());
        var valStr = (value / 200)*100 + "% 100%";
        $('#value1').html((value / 10).toFixed(1));
        $('#'+id).css({
            "background-size": valStr
        });
        $('#'+label).text(value);
        $('#'+label).css({
            "left": (value / 200)*100 + '%'
        });
        $("input[name='animat_speed']").val((value / 10).toFixed(1));
    },
    changeSpeed_num2:function(id,label,label2) {
        console.log(000);
        
        var value = parseInt($('#'+id).val());
        var valStr = (value / 200)*100 + "% 100%";
        console.log(valStr);
        
        $('#value1').html((value / 10).toFixed(1));
        $('#'+id).css({
            "background-size": valStr
        });
        $('#'+label).text(value);
        $('#'+label).css({
            "left": (value / 200)*100 + '%',
        });
        $("input[name='animat_speed']").val((value / 10).toFixed(1));
    },
    /**
     * 年月日 时分秒
     * **/
    timestampToTime:function(timestamp) {
        var date = new Date();//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        date.setTime(timestamp);
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = date.getDate() + ' ';
        var h = date.getHours() + ':';
        var m = date.getMinutes() + ':';
        var s = date.getSeconds();
        return Y+M+D+h+m+s;
    },
    /**
     * 年月日
     * **/
    timestampToTime2:function(timestamp) {
        var date = new Date();//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        date.setTime(timestamp);
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate());
        return Y+M+D;
    },
    /**
     * 年月
     * **/
    timestampToTime4:function(timestamp) {
        var date = new Date();//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        date.setTime(timestamp);
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
        return Y+M;
    },
    //年月日时分秒 各位补0
    timestampToTime5:function(timestamp) {
        var date = new Date();//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        date.setTime(timestamp);
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
        var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
        var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
        return Y+M+D+h+m+s;
    },
    /**
     * 时分秒
     * **/
    timestampToTime3:function(timestamp) {
        var date = new Date();//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        date.setTime(timestamp);
        var h = date.getHours();
        var m = date.getMinutes();
        var s = date.getSeconds();
        if(h < 10){
            h = '0'+h;
        }
        if(m < 10){
            m = '0'+m;
        }
        if(s < 10){
            s = '0'+s;
        }
        return h+':'+m+':'+s;
    },
    //年月日时分秒 各位补0
    timestampToTime6:function(timestamp) {
        var date = new Date();//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        date.setTime(timestamp);
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
        var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
        var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
        return Y+M+D+h+m+s;
    },
    //时 各位补0
    timestampToTime7:function(timestamp) {
        var date = new Date();//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        date.setTime(timestamp);          
        var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
        return h;
    },

        /**
     * 年月日
     * **/
    timestampToTime8:function(timestamp) {
        var date = new Date();//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        date.setTime(timestamp);
        var Y = date.getFullYear() + '/';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '/';
        var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate());
        return M+D;
    },
    timelong:function(time){
        time = parseInt(time);
        var s = '';
        if(parseInt(time/1000) === 0){
            $("#time1").text('30秒');
            $("#time2").text('30秒');
            return false;
        }
        if(parseInt(time) > 60000){
            s = parseInt(time/60000);
            $("#time1").text(s+'分钟');
            $("#time2").text(s+'分钟');
        }else{
            s = parseInt(time/1000);
            $("#time1").text(s+'秒');
            $("#time2").text(s+'秒');
        }

    },
    select_timelong:function(time){
        var s = '';
        if(parseInt(time) > 60000){
            s = parseInt(time/60000);
            $("#time1").text(s+'分钟');
        }else{
            s = parseInt(time/1000);
            $("#time1").text(s+'秒');
        }

    },
    // 获取当前的年月日时分秒
    getCurrentTime:function() {
        var nowDate=new Date();
        return{
            y:nowDate.getFullYear(),
            m:nowDate.getMonth()+1,
            d:nowDate.getDate(),
            h:nowDate.getHours(),
            min:nowDate.getMinutes(),
            s:nowDate.getSeconds()
        }
    }
}
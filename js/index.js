var module = {
    istest : false,
    cors:function(json){//post提交，pc的要用这货
            if(json && this.istest && json.testData){
                json.success && json.success(json.testData);
                return false;
            }
            postCORS({
                url: json.url,
                data: json.data||{},
                callback: function(data) {
                    if(typeof data=='string'){
                        data=eval("("+data+")");
                    };
                    json.success && json.success(data);
                },
                init : function(data,xhr){
                    if (xhr) xhr.withCredentials = true;
                }
            });
        },
    clickAll:function(){

    },
    setScroll: function() {
    // 滚动条
       $(".area4-scroll").mCustomScrollbar({
       scrollInertia: 600,
       //滚动的惯性值
       autoDraggerLength: false,
       //根据内容区域，自动调整滚动条拖块的长度，值true，false
       advanced: {
           updateOnContentResize: true
       }
       });
       // 轮播图切换的实例化
        window.tab06 = new Slide({
            target: $('#slide06 .slide li'),
            effect: 'slide',
            control:  false,
            autoPlay: false,
            width: 249,
            merge: true,
            onchange:function(){
                var a=this.curPage;
                if(a==2){
                    tab06.playTo(0);
                }
                if(a==-1){
                    tab06.playTo(1);
                 }
            }
        }); 
        window.tab07 = new Slide.scroll({
            target: $( '#slide07 .slide li' ),
            width: 249,
            control:  false,
            autoPlay: false,
            onchange: function() {
            var c = this.curPage;
            if(c==2){
                tab07.playTo(0);
            }
            if(c==-1){
                tab07.playTo(1);
            }
        }
        });
    },
    formApply : function(){
        $(".btn-submit").click(function(){
            var name=$("#enroll_name").val(),
                phone=$("#enroll_phone").val(),
                n=$("#J-declare").prop("checked"),
                provinceId = $("#enroll_memo1").val();
                province = $("#enroll_memo1 option:selected").text();  //这么选择id的text
                cityId = $("#enroll_memo2").val();
                city = $("#enroll_memo2 option:selected").text();
                dealerId = $("#enroll_memo3").val();
                dealer = $("#enroll_memo3 option:selected").text();
                seriesId = $("#enroll_memo4").val();
                series = $("#enroll_memo4 option:selected").text();
                buytimeId=$("#enroll_memo5").val();
                buytime=$("#enroll_memo5 option:selected").text();
                var Reg = /^[1][3456789][0-9]{9}$/;
                if (!/^[\u4E00-\u9FA5]{1,}$/.test(name)) {
                    alert("请输入正确的中文名");
                    return;
                } else if (!Reg.test(phone)) {
                    alert("电话不正确");
                    return;
                } else if (!seriesId) {ss
                    alert("请选择车型");
                    return;
                }else if(!buytimeId){
                     alert("请选择购车时间");
                    return;
                }else if (!provinceId) {
                    alert("请选择省份");
                    return;
                } else if (!cityId) {
                    alert("请选择城市");
                    return;
                } else if (!dealerId) {
                    alert("请选择经销商");
                    return;
                } else if (!$('#J-declare').is(':checked')) {
                    alert('请勾选个人信息保护声明');
                    return;
                }
                issub = true;
                module.cors({
                    url : 'https://survey.pcauto.com.cn/auto/channelSubmit.jsp?req_enc=utf-8&resp_enc=utf-8',
                    data : {
                        q_63405:name,
                        q_63413:phone,
                        q_63414:seriesId,
                        q_63406:buytimeId,
                        q_63407:provinceId,
                        q_63415:cityId,
                        q_63416:dealerId,
                        withCookie: 'true',
                        id:17439
                    },
                    success : function(data){
                        // console.log(data);
                        if(data.code==0){
                            alert('报名成功');

                        }else if(data.code==-3){
                            alert('您已经报名了');
                        }
                        else{
                            alert(data.result);
                        }
                        issub = false;
                    }
                });
            });
        },
    init: function() {
        new zt.SelectN({id:'selectN'});
        new zt.SelectN({id:'select2'});
        this.clickAll();
        this.setScroll();
        this.formApply();
    }
}
module.init();

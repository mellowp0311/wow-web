
const empty = '';
const login = {

    domain: '',

    characterList: [],

    init: function(){
        if(window.location.hostname.indexOf("dragon") > -1){
            this.domain = 'https://dragonfly14.synology.me:7071/api';
        } else {
            this.domain = 'http://localhost:7070';
        }
        this.initEvent();
    },

    initEvent: function(){
        $('#btnLogin').click(function(){
            login.userLoginCheck();
        });

    },

    userLoginCheck: function(){
        let parameter = {};
        parameter.userId = $.trim($('#user_id').val());
        parameter.userPassword = $.trim($('#user_password').val());
        $.ajax({
            url : this.domain + '/user/login',
            type : 'POST',
            contentType: 'application/json',
            data: JSON.stringify(parameter),
            dataType : 'json',
            success : function(response){
                if(response != null && response.data != null ){
                    $('#userSeq').val(response.data.userSeq);
                    $('#loginForm').submit();
                } else {
                    alert("이메일주소 및 패스워드를 확인해주세요.");
                }
            },
            error: function(){
                console.log('error');
            }
        });
    }


}



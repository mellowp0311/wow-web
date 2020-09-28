
const empty = '';
const dashboard = {

    /**
     * 도메인 정보
     */
    domain: '',

    /**
     * 내 케릭터 목록
     */
    characterList: [],

    /**
     * 초기 실행 함수
     */
    init: function(){
        if(window.location.hostname.indexOf("dragon") > -1){
            this.domain = 'https://dragonfly14.synology.me:7071/api';
        } else {
            this.domain = 'http://localhost:7070';
        }
        this.initEvent();
        this.initDataLoad();
    },

    /**
     * 초기 화면 이벤트 설정
     */
    initEvent: function(){

        // 레이드 등록 모달 날짜 정보 설정
        $('#modal_raid_date').val(moment().format('YYYY.MM.DD'));
        $('#modal_raid_date_time').val(moment().format('HH')).selectpicker('refresh');
        // 레이드 등록 모달 생성
        $(document).on('click', '#raid-participate button', function(){
            console.log('click');
            $('#modal_raid_type').val($(this).attr('raidCode')).selectpicker('refresh');
            $('#modal_character').val($(this).attr('characterSeq')).selectpicker('refresh');
            let targetId = '#' + $(this).attr('aria-describedby');
            console.log('--> ' + $(targetId).length);
            if($(targetId).length > 0){
                console.log('--> IF IN')
               $(targetId).find('a').attr('data-toggle', 'modal').attr('data-target', '#modal_register_raid_character');
            }
        });
        $('#btn-raid-save').click(function(){
            dashboard.saveModalRaidSchedule();
        });
        $('#btn-raid-close').click(function(){
            dashboard.resetModalRaidSchedule();
        });

    },

    /**
     * 초기 데이터 조회
     */
    initDataLoad: function(){
        $.ajax({
            url : this.domain + '/main/dashboard',
            data: {
                userSeq: $('#userSeq').val()
            },
            type : 'GET',
            dataType : 'json',
            success : function(response){
                dashboard.gridRaidTypeView(response.data.raidType);
                dashboard.gridCharacterView(response.data.characterList);
                dashboard.gridRaidParticipateByCharacter(response.data.raidParticipateList);
                if(dashboard.characterList.length < 1) {
                    dashboard.characterList = response.data.characterList;
                    generator.makeCharacterSelectBox(dashboard.characterList);
                }
            },
            error: function(){
                console.log('error');
            }
        });
    },

    gridRaidTypeView: function(raidType){
        generator.main3DayRaidCard(raidType.ar);
        generator.main5DayRaidCard(raidType.ox);
        generator.main7DayRaidCard(raidType.at);
    },
    gridCharacterView: function(characterList){
        generator.mainCharacterList(characterList);
    },
    gridRaidParticipateByCharacter: function(raidParticipateList){
        generator.mainRaidParticipateByCharacter(raidParticipateList);

    },
    saveModalRaidSchedule: function(){
        let parameter = {};
        parameter.characterSeq = $('#modal_character').val();
        parameter.raidCode = $('#modal_raid_type').val();
        parameter.raidTitle = $.trim($('#modal_raid_title').val());
        if(parameter.raidTitle == empty){
            alert("공대 타이틀을 입력해주세요.");
            return;
        }
        parameter.raidCaptainCharacter = $.trim($('#modal_captain_character').val());
        if(parameter.raidCaptainCharacter == empty){
            alert("공대장 케릭터를 입력해주세요.");
            return;
        }
        if($.trim($('#modal_raid_date').val()) == empty){
            alert("레이드 날짜를 입력해주세요.");
            return;
        }
        parameter.raidStartDate = $.trim($('#modal_raid_date').val()) + ' ' + $('#modal_raid_date_time').val() + ':' + $('#modal_raid_date_minute').val() + ':00';
        parameter.profit = $.trim($('#modal_profit').val());
        parameter.expense = $.trim($('#modal_expense').val());
        parameter.memo = $.trim($('#modal_memo').val());
        $.ajax({
            url : this.domain + '/raid/schedule/add',
            type : 'POST',
            contentType: 'application/json',
            data: JSON.stringify(parameter),
            dataType : 'json',
            success : function(response){
                alert('정상적으로 등록 되었습니다.');
                $('#btn-raid-close').trigger('click');
                dashboard.refreshRaidParticipateByCharacter();
            },
            error: function(){
                console.log('error');
            }
        });
    },

    resetModalRaidSchedule: function(){
        // 초기화
        $('#modal_raid_title, #modal_captain_character, #modal_raid_date, #modal_memo').val(empty);
        $('#modal_profit, modal_expense').val('0');
        // 레이드 등록 모달 날짜 정보 설정
        $('#modal_raid_date').val(moment().format('YYYY.MM.DD'));
        $('#modal_raid_date_time').val(moment().format('HH')).selectpicker('refresh');

    },
    refreshRaidParticipateByCharacter: function(){
        $.ajax({
            url : this.domain + '/raid/participate/character',
            type : 'GET',
            data: {
                userSeq: $('#userSeq').val()
            },
            dataType : 'json',
            success : function(response){
                dashboard.gridRaidParticipateByCharacter(response.data);
            },
            error: function(){
                console.log('error');
            }
        });
    },
    logout: function(){
        $.ajax({
            url : '/web/logout',
            type : 'GET',
            success : function(){

            },
            error: function(e){
                console.log(e);
            }
        });
    },




}

const generator = {

    imgPath : "../web/assets/images",

    /**
     * 레이드 일정 설정
     * - 3일, 5일, 7일 리셋정보 표기 부분
     *
     * @param data
     */
    main3DayRaidCard: function(data){
        $('#main_3d_period').append(data.raidStartDate + ' ~ ' + data.raidEndDate);
        $(data.betweenDayList).each(function(i, item){
            $('#main_3d_days p').eq(i).text(item.dayOfWeek).css('background-color', item.isNow ? '#ec4858' : '');
            $('#main_3d_days h5').eq(i).text(item.day);
        });
    },
    main5DayRaidCard: function(data){
        $('#main_5d_period').append(data.raidStartDate + ' ~ ' + data.raidEndDate);
        $(data.betweenDayList).each(function(i, item){
            $('#main_5d_days p').eq(i).text(item.dayOfWeek).css('background-color', item.isNow ? '#ec4858' : '');
            $('#main_5d_days h5').eq(i).text(item.day);
        });
    },
    main7DayRaidCard: function(data){
        $('#main_7d_period').append(data.raidStartDate + ' ~ ' + data.raidEndDate);
        $(data.betweenDayList).each(function(i, item){
            $('#main_7d_days p').eq(i).text(item.dayOfWeek).css('background-color', item.isNow ? '#ec4858' : '');
            $('#main_7d_days h5').eq(i).text(item.day);
        });
    },

    /**
     * 아이콘 경로
     *
     * @param characterJob
     * @returns {string}
     */
    getCharacterIconPath: function(characterJob){
        return this.imgPath + "/icon/" + characterJob + ".png";
    },

    /**
     * 대시보드 내 케릭터 목록 GRID
     *
     * @param characterList
     */
    mainCharacterList: function(characterList){
        let col;
        const count = characterList.length;
        if(count <= 4) col = 'col-xl-3 col-sm-6';
        else col = 'col-xl-2 col-sm-6';
        $(characterList).each(function(i, item){
            let wrap = '<div class="'+col+'">';
            let cb = '';
            cb += '<div class="card"><div class="card-body"><div class="media"><div class="avatar-md mr-3"><div class="avatar-title bg-light rounded-circle" style="background-color: black!important;">';
            cb += '<img src="'+generator.getCharacterIconPath(item.characterJob)+'" class="avatar-sm rounded-circle" style="background: black;">';
            cb += '</div></div>';
            let mb = '<div class="media-body">';
            mb += '<h4 class="my-1"><a class="text-dark">'+item.characterName+'</a></h4>';
            mb += '<p class="text-muted text-truncate mb-0" style="padding-top: 10px;">';
            mb += '<i class="ri-map-pin-line align-bottom mr-1"></i>'+item.guildName+'</p>';
            mb += '</div>';
            let dd = '';
            dd += '<div class="dropdown"><a class="text-body dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">';
            dd += '<i class="mdi mdi-dots-vertical font-20"></i></a><div class="dropdown-menu dropdown-menu-right"><a class="dropdown-item" href="#">편집</a>';
            dd += '</div></div></div><hr>';
            dd += '<div class="text-muted"><div class="row">';
            dd += '<div class="col-3"><div><p class="text-truncate mb-0">서버</p><h5 class="mb-sm-0 font-13">'+item.serverCodeName+'</h5></div></div>';
            dd += '<div class="col-3"><div><p class="text-truncate mb-0">종족</p><h5 class="mb-sm-0 font-13">'+item.tribeCodeName+'</h5></div></div>';
            dd += '<div class="col-3"><div><p class="text-truncate mb-0">전문기술1</p><h5 class="mb-sm-0 font-13">'+item.firstExpertise+'</h5></div></div>';
            dd += '<div class="col-3"><div><p class="text-truncate mb-0">전문기술2</p><h5 class="mb-sm-0 font-13">'+item.secondExpertise+'</h5></div></div>';
            dd += '</div></div></div></div>';
            wrap += cb + mb + dd + '</div>';
            $('#characterRow').append(wrap)
        });
    },

    /**
     * 케릭별 레이드 참여현황 테이블 GRID
     *
     * @param raidParticipateList
     */
    mainRaidParticipateByCharacter: function(raidParticipateList){
        let tr = '';
        // 번호 | 사원 | 검둥 | 화심 | 폐허 | 줄구 | 오닉 | 수입 | 지출 | 합계
        $('#raid-participate').html('');
        $(raidParticipateList).each(function(i, item){
            tr += '<tr>';
            tr += '    <th scope="row">'+(i+1)+'</th>';
            tr += '    <th>'+item.characterName+'</th>';
            tr += '    <td>'+generator.makeRaidStatusBtn(item.at, item.characterSeq, 'AT')+'</td>';
            tr += '    <td>'+generator.makeRaidStatusBtn(item.bl, item.characterSeq, 'BL')+'</td>';
            tr += '    <td>'+generator.makeRaidStatusBtn(item.mc, item.characterSeq, 'MC')+'</td>';
            tr += '    <td>'+generator.makeRaidStatusBtn(item.ar, item.characterSeq, 'AR')+'</td>';
            tr += '    <td>'+generator.makeRaidStatusBtn(item.zg, item.characterSeq, 'ZG')+'</td>';
            tr += '    <td>'+generator.makeRaidStatusBtn(item.ox, item.characterSeq, 'OX')+'</td>';
            tr += '    <td>'+numberWithCommas(item.totalProfit)+'</td>';
            tr += '    <td>'+numberWithCommas(item.totalExpense)+'</td>';
            tr += '    <td>'+numberWithCommas(Number(item.totalProfit) - Number(item.totalExpense))+'</td>';
            tr += '</tr>';
        });
        $('#raid-participate').html(tr);
        $('[data-toggle="popover"]').popover({ html : true})
    },

    /**
     * 레이드 참여에 따른 버튼 생성
     *
     * @param obj
     * @param characterSeq
     * @param code
     * @returns {string}
     */
    makeRaidStatusBtn: function(obj, characterSeq, code){
        let option = {
            btnText : '불참',
            btnClass : 'btn-bordered-primary',
            title: '레이드를 예약 하세요.',
            content: '<p>현재 예약된 레이드 공대가 없습니다.<br /><a><code>여기</code></a>를 클릭하여 등록하세요.</p>'
        };
        let isExist = obj != undefined;
        if( isExist ){
            const raid = moment(obj.raidStartDate, 'MM-DD HH:mm');
            const now = moment();
            option.title = obj.raidTitle;
            option.content = '';
            option.content += '<div>';
            option.content += '<p><code>공대장</code> ' + obj.raidCaptainCharacter + '</p>';
            option.content += '<p><code>일시</code> ' + raid.format('MM월DD일 HH시mm분') + '</p>';
            option.content += '<p><code>수익</code> ' + numberWithCommas(obj.profit)+ ' G </p>';
            option.content += '<p><code>지출</code> ' + numberWithCommas(obj.expense) + 'G </p>';
            option.content += '<p><code>메모</code> ' + obj.memo + 'G </p>';
            option.content += '</div>';
            if(moment.duration(now.diff(raid)).asMinutes() >= 0){
                option.btnText = '완료';
                option.btnClass = 'btn-bordered-danger';
            } else {
                option.btnText = '예약';
                option.btnClass = 'btn-bordered-purple';
            }
        }
        let element = '<button type="button" class="btn btn-xs waves-effect waves-light btn-raid-status '+option.btnClass+'" raidCode=' + code + ' characterSeq=' + characterSeq;
        element += ' data-container="body" data-toggle="popover" data-trigger="focus" data-placement="right" data-content="'+option.content+'" data-original-title="'+option.title+'" >';
        element += option.btnText + '</button>';
        return element;
    },


    makeCharacterSelectBox: function(characterList){
        $(characterList).each(function(i, item){
            $('#modal_character').append('<option value="'+item.characterSeq+'">'+item.characterName+'</option>');
        });
    }

}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


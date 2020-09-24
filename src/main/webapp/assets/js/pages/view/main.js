
const main = {

    // domain: 'https://dragonfly14.synology.me:7071',
    domain: 'http://localhost:7070',

    init: function(){
        this.initEvent();
        this.initDataLoad();
    },

    initEvent: function(){
        $(document).on('click', '#raid-participate button', function(){
            let targetId = '#' + $(this).attr('aria-describedby');
            if($(targetId).length > 0){
               $(targetId).find('a').attr('data-toggle', 'modal').attr('data-target', '#modal_register_raid_character');
            }
        })
    },

    initDataLoad: function(){
        $.ajax({
            url : this.domain + '/main/dashboard?userSeq=1',
            type : 'GET',
            dataType : 'json',
            success : function(response){
                main.gridRaidTypeView(response.data.raidType);
                main.gridCharacterView(response.data.characterList);
                main.gridRaidParticipateByCharacter(response.data.raidParticipateList);
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

    }




}
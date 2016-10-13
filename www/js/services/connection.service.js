
/* Cordovaのネットワーク接続確認プラグインを使用してネットワークに接続していない場合にはアラートを表示するサービス */

function ConnectionService(){
    
    var checkConnection = function() {
        var networkState = navigator.connection.type;

        if(networkState == Connection.NONE){    //ネットワークに繋がっていないときアラートを表示
            ons.notification.alert({
                title: '',
                messageHTML: 'ネットワークに接続できません。接続を確認してください',
                buttonLabel: 'OK',
                callback: function(){
                    navi.popPage({animation:'slide'});  //OKをタップすると1つ前の画面に戻る。
                }
            });
        }
    }
    return checkConnection; 
}


angular
    .module('connectionModule')
    .service('ConnectionService', ConnectionService);
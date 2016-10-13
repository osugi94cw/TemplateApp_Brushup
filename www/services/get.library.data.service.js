
/* ライブラリー画面で使用するデータをmBaaSから取得するサービス
** 取得したデータは非同期処理終了時にイベントを発火し、controllerに渡す
*/

function GetLibraryData($q,$rootScope,ncmbInitialSetting){
    
    var getLibraryData = function(argument){
        var libraryId = argument; //ライブラリーIDを格納

        var ncmb = ncmbInitialSetting;  //mBaaSのAPIキーの設定とSDKの初期化
        
        //libraryクラスのサブクラスを生成
        var library = ncmb.DataStore("library");
        //contentsListクラスのサブクラスを生成
        var contentsList = ncmb.DataStore("contentsList");
        
        //IDが一致するレコードを作成日の降順で取得
        var libraryAcquisition = library.equalTo("libraryId", libraryId).order("createDate", true).fetchAll();
        var contentsListAcquisition = contentsList.equalTo("libraryId", libraryId).order("createDate", true).fetchAll();
        
        //取得したデータを格納するオブジェクト
        var data = {};
        data.library = {};
        data.contentsList = [];
        
        //$q.all() メソッドによる複数 Promise オブジェクトの監視
        $q.all([libraryAcquisition, contentsListAcquisition])
        .then(function(results) {
            var libraryResultList = results[0];
            var contentsResultList = results[1];
            
            
            /* 取得したデータ件数によって処理を分岐 */
            
            //libraryクラスのデータを取得・格納
            
            //取得件数が1件（正常）の場合
            if(libraryResultList.length == 1){
                data.library.url = libraryResultList[0].get("libraryPictureUrl");
                data.library.overview = libraryResultList[0].get("libraryOverview");
            }
            //取得件数が2件以上の場合
            else if(libraryResultList.length >= 2){
                data.library.overview = "データが複数登録されています";
            }
            //取得件数が0件の場合
            else{
                data.library.url = "views/img/library/library_top_data-none.png";
                data.library.overview = "データが登録されていません。";
            }
            
            
            //contentsListクラスのデータを取得・格納
            
            //取得件数が0件の場合
            if(contentsResultList.length == 0){
                data.contentsResultNone = "データが登録されていません";
            }
            //取得件数が0件以外（正常）の場合
            else{
                for (var i = 0; i < contentsResultList.length; i++) {
                    data.contentsList.push(
                        {
                            img: contentsResultList[i].get("contentsPictureUrl"),
                            name: contentsResultList[i].get("contentsName"),
                            type: contentsResultList[i].get("contentsType"),
                            url: contentsResultList[i].get("contentsUrl")
                        }
                    );
                }
            }
            //処理が終了したイベントを発火
            $rootScope.$broadcast('libraryDataGot', data);
        })
        .catch(function(err){
            console.log(err);
            /* ネットワークに接続されていない場合は別のアラートを動作させるため、この処理が動作しないようにする */
            var networkState = navigator.connection.type;
            if(networkState != Connection.NONE){    
                //データの取得に失敗した場合はアラートを表示
                ons.notification.confirm({
                    title: '',
                    messageHTML: 'データの取得に失敗しました。再接続を行いますか。',
                    buttonLabels: ['OK','キャンセル'],
                    callback: function(arg){
                        if(arg == 0){
                            getLibraryData(libraryId);  //「OK」がタップされた場合は再実行
                        }
                        else{
                            navi.popPage({animation:'slide'});  //「キャンセル」がタップされた場合はメニュー画面に戻る
                        }
                    }
                });
            }
        });
    };
    return getLibraryData;
}


angular
    .module('ncmbModule')
    .service('GetLibraryData', ['$q','$rootScope','ncmbInitialSetting', GetLibraryData]); 
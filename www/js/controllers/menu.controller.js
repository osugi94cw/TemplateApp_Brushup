
/* ライブラリー選択ボタンがタップされるとライブラリー画面に遷移する。
** ボタン毎に設定されたライブラリーIDを遷移時に渡す。
*/

function LibraryButtonCtrl(TransitionService){ 
    
    this.menuTransition = function(argument){
        var target = 'views/html/library.html';
        var libraryId = argument; //ライブラリーID

        this.screenTransition = new TransitionService(target, libraryId); //画面遷移サービスを呼び出す
        
    }
    
}
//コントローラーの定義
angular
    .module('menuModule')
    .controller('LibraryButtonCtrl', ['TransitionService', LibraryButtonCtrl]);
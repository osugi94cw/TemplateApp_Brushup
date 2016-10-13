
/* ライブラリー画面から受け取ったURLに信頼済みマークを付与してビューに反映するコントローラ */

function MovieContentsCtrl($scope,$sce,ConnectionService){
    var vm = this;
        vm.checkConnection = new ConnectionService();   //接続確認サービスの呼び出し
    var param1 = navi.topPage.pushedOptions.data.param1; //受け取ったパラメータを代入
    vm.url = $sce.trustAsResourceUrl(param1);   //URLに信頼済みのマークを付与
}

angular
    .module('contentsModule')
    .controller('MovieContentsCtrl', ['$scope', '$sce', 'ConnectionService', MovieContentsCtrl]);
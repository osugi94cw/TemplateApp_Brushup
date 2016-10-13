
//mBaaSのAPIキーの設定とSDKの初期化を行い、値を返すサービス

function ncmbInitialSetting(){
    //mBaaSのAPIキーの設定とSDKの初期化
    var ncmb = new NCMB("340609a9b5431d19c497beb72411339fb9bd524570d8de15486d6557d07970ce","dda8edefd900294fcadc8d2914debad64dfb4aa7a26919e759a20e5cf3c5c609");
    
    return ncmb;
}
       


angular
    .module('ncmbModule')
    .factory('ncmbInitialSetting',ncmbInitialSetting);
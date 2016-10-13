
//親モジュール
ons.bootstrap('templateApp',['menuModule','libraryModule','contentsModule']);


//子モジュール


angular.module('menuModule', ['transitionModule']);

angular.module('libraryModule', ['transitionModule','connectionModule','repeatFinishedModule','ncmbModule']);

angular.module('contentsModule', ['connectionModule']);


//孫モジュール

angular.module('transitionModule', []);


angular.module('connectionModule', []);


angular.module('repeatFinishedModule', []);


angular.module('ncmbModule', []);



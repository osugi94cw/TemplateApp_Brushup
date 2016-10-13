
//ng-repeatの終了を検知して、イベントを発火させるディレクティブ

function repeatFinishedDirective($timeout){
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            if (scope.$last === true){
                $timeout(function(){
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    }
}


angular.module('repeatFinishedModule')
    .directive('repeatFinishedDirective', ['$timeout', repeatFinishedDirective]);

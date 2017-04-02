var fsapp = angular.module('feltSo', []);
fsapp.controller('feltSoCtrl', function($scope,$http) {
    $scope.firstName= "John";
    $scope.lastName= "Doe";
    $http.get("data.json")
    .then(function(response) {
        console.log("Helloworld");
        $scope.top_pos_comments = response.data.overview.top_pos_comments;
        $scope.top_neg_comments = response.data.overview.top_neg_comments;
        $scope.top_pos_posts = response.data.overview.top_pos_posts;
        $scope.top_neg_posts = response.data.overview.top_neg_posts;
        $scope.top_likers = response.data.overview.top_likers;
        $scope.top_dis_likers = response.data.overview.top_dis_likers;
    },function(response) {
        console.log("Helloworld error");
    });
});
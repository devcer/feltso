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
    $scope.sentiment_over_time = response.data.overview.sentiment_over_time;
    $scope.source_wise_stats = response.data.overview.source_wise_stats;

    var graphOne=[['Date', 'Facebook', 'Twitter']];
    for (var i = 0; i <= $scope.sentiment_over_time.positive.length-1; i++) {
      graphOne.push([$scope.sentiment_over_time.positive[i].time, 
        $scope.sentiment_over_time.positive[i].count,
        $scope.sentiment_over_time.negative[i].count]);
    }

    var graphTwo=[['Connector', 'Positive Sentiments', 'Negative Sentiments']];
    graphTwo.push(['Facebook', $scope.source_wise_stats.facebook.positive_count, 
    $scope.source_wise_stats.facebook.negative_count]);
    graphTwo.push(['Twitter', $scope.source_wise_stats.twitter.positive_count, 
    $scope.source_wise_stats.twitter.negative_count]);

    drawGraphOne(graphOne, graphTwo); 

  },function(response) {
    console.log("error:"+response);
  });

});

 function drawGraphOne(graphOne,graphTwo){
  console.log('drawGraphOne');
  google.charts.load('current', {'packages':['corechart','bar']});
  google.charts.setOnLoadCallback(drawChart);
  google.charts.setOnLoadCallback(drawStuff);

  function drawChart() {
    var data = google.visualization.arrayToDataTable(graphOne);

    var options = {
      title: 'Sentiments over time',
      curveType: 'function',
      axes: {
        x: {
          0: {side: 'top'}
        }
      }
    };

    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
    chart.draw(data, options);
  };
  function drawStuff() {
    var data = new google.visualization.arrayToDataTable(graphTwo);

        var options = {
          bars: 'horizontal', // Required for Material Bar Charts.
          axes: {
            x: {
              brightness: {side: 'top'} // Top x-axis.
            }
          }
        };

      var chart = new google.charts.Bar(document.getElementById('dual_x_div'));
      chart.draw(data, options);
    };
 }
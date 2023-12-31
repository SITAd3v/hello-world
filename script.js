const app = angular.module("helloWorld", ["firebase"]);

app.filter('reverse', function () {
  return function (items) {
    return items.slice().reverse();
  };
});

app.controller("ctrl", function ($scope, $firebaseArray) {
  const ref = new Firebase("https://say-hello-to-world-755dc.firebaseio.com/messages");
  const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
  const getColor = () => {
    let colors = [
    '#f44336',
    '#ffc107',
    '#4caf50',
    '#03a9f4',
    '#9c27b0',
    '#ffffff',
    '#607d8b',
    '#e91e63',
    '#ff9800',
    '#009688'];

    return colors[random(0, colors.length)];
  };

  $scope.hide = false;
  $scope.getColor = getColor();

  $scope.messages = $firebaseArray(ref);
  $scope.addMessage = event => {
    event.preventDefault();
    $scope.messages.$add({
      message: $scope.message,
      color: $scope.getColor });

    $scope.message = "";
    $scope.hide = true;
    $scope.getColor = getColor();
  };
});
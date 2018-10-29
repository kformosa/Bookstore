myApp.controller("BooksController", [
  "$scope",
  "$http",
  "$location",
  "$routeParams",
  function($scope, $http, $location, $routeParams) {
    console.log("BooksController loaded...");

    $scope.getBooks = function() {
      $http.get("/api/books").then(response => ($scope.books = response.data));
    };

    $scope.getBook = function() {
      let id = $routeParams.id;
      $http
        .get(`/api/books/${id}`)
        .then(response => ($scope.book = response.data));
    };

    $scope.addBook = function() {
      $http
        .post("/api/books/", $scope.book)
        .then(response => (window.location.href = "#!/books"));
    };

    $scope.updateBook = function() {
      let id = $routeParams.id;
      $http
        .put(`/api/books/${id}`, $scope.book)
        .then(response => (window.location.href = "#!/books"));
    };

    $scope.removeBook = function(id) {
      $http
        .delete(`/api/books/${id}`)
        .then(response => (window.location.href = "#!/books"));
    };
  }
]);

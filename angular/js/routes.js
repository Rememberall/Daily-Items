var app = angular.module('dailyItems');

app.config(function ($routeProvider) {
    $routeProvider
        .when('/categories', {
            controller: 'CategoriesController',
            templateUrl: '/templates/categories/categories.list.html'
        })
        .otherwise({controller: 'NotFoundController', templateUrl: '/templates/not_found.html'});
});

app.config(function ($locationProvider) {
    //$locationProvider.html5Mode(true);
});

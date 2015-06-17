var app = angular.module('dailyItems');

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'HomeController',
            templateUrl: '/templates/home.html'
        })
        .when('/categories', {
            controller: 'CategoriesController',
            templateUrl: '/templates/categories/categories.list.html'
        })
        .when('/brands', {
            controller: 'BrandsController',
            templateUrl: '/templates/brands/brands.list.html'
        })
        .when('/items', {
            controller: 'ItemsController',
            templateUrl: '/templates/items/items.list.html'
        })
        .otherwise({controller: 'NotFoundController', templateUrl: '/templates/not_found.html'});
});

app.config(function ($locationProvider) {
    //$locationProvider.html5Mode(true);
});

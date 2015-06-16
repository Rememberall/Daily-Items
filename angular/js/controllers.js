var app = angular.module('dailyItems');

app.controller('CategoriesController', function ($scope, CategoriesService) {
    CategoriesService.query()
        .success(function (categories) {
            $scope.categories = categories;
        });

    $scope.newCategory = {};

    $scope.create = function () {
        if (!$scope.newCategory.name) {
            console.log('Enter a name, idiot');
            return;
        }

        CategoriesService.create($scope.newCategory)
            .success(function (newCategory) {
                $scope.categories.unshift(newCategory);
                $scope.newCategory = {};
            });
    };

    $scope.delete = function (id) {
        CategoriesService.delete(id)
            .success(function () {
                _.remove($scope.categories, {_id: id});
            });
    };
});

app.service('CategoriesService', function ($http) {
    var context = this;

    context.query = function () {
        return $http.get('/api/categories');
    };

    context.create = function (category) {
        return $http.post('/api/categories', category);
    };

    context.delete = function (id) {
        return $http.delete('/api/categories/' + id);
    };
});

app.controller('BrandsController', function($scope, BrandsService) {
    BrandsService.query()
        .success(function (brands) {
            $scope.brands = brands;
        });

    $scope.newBrand = {};

    $scope.create = function () {
        if (!$scope.newBrand.name) {
            console.log('Enter a name, idiot');
            return;
        }

        BrandsService.create($scope.newBrand)
            .success(function (newBrand) {
                $scope.brands.unshift(newBrand);
                $scope.newBrand = {};
            });
    };

    $scope.delete = function (id) {
        BrandsService.delete(id)
            .success(function () {
                _.remove($scope.brands, {_id: id});
            });
    };
});

app.service('BrandsService', function ($http) {
    var context = this;

    context.query = function () {
        return $http.get('/api/brands');
    };

    context.create = function (category) {
        return $http.post('/api/brands', category);
    };

    context.delete = function (id) {
        return $http.delete('/api/brands/' + id);
    };
});

app.controller('NotFoundController', function ($scope) {
    $scope.title = 'Not found!';
    $scope.message = 'This is not the page you\'re looking for.';
});

app.controller('ApplicationController', function ($scope) {
});

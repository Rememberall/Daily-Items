var app = angular.module('dailyItems');

app.controller('HomeController', function($scope) {
    $scope.title = 'Daily Items';
    $scope.message = 'Welcome to daily.rememberall.io! This app lets you keep track over which daily items you have and need.';
});

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

    context.create = function (brand) {
        return $http.post('/api/brands', brand);
    };

    context.delete = function (id) {
        return $http.delete('/api/brands/' + id);
    };
});

app.controller('ItemsController', function($scope, ItemsService, CategoriesService, BrandsService) {
    ItemsService.query()
        .success(function (items) {
            $scope.items = items;
        });

    CategoriesService.query()
        .success(function(categories) {
            $scope.categories = categories;
        });

    BrandsService.query()
        .success(function(brands) {
            $scope.brands = brands;
        });

    $scope.newItem = {};

    $scope.create = function () {
        if (!$scope.newItem.name || !$scope.newItem.category || !$scope.newItem.brand) {
            console.log('Enter a name and category and brand, idiot');
            return;
        }

        ItemsService.create($scope.newItem)
            .success(function (newItem) {
                $scope.items.unshift(newItem);
                $scope.newItem = {};
            });
    };

    $scope.delete = function (id) {
        ItemsService.delete(id)
            .success(function () {
                _.remove($scope.items, {_id: id});
            });
    };
});

app.service('ItemsService', function ($http) {
    var context = this;

    context.query = function () {
        return $http.get('/api/items');
    };

    context.create = function (item) {
        return $http.post('/api/items', item);
    };

    context.delete = function (id) {
        return $http.delete('/api/items/' + id);
    };
});

app.controller('NotFoundController', function ($scope) {
    $scope.title = 'Not found!';
    $scope.message = 'This is not the page you\'re looking for.';
});

app.controller('ApplicationController', function ($scope) {
});

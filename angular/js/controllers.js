var app = angular.module('dailyItems');

app.controller('HomeController', function ($scope) {
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
            alert('Please enter a name.');
            return;
        }

        CategoriesService.create($scope.newCategory)
            .success(function (newCategory) {
                $scope.categories.unshift(newCategory);
                $scope.newCategory = {};
            })
            .error(function (message) {
                alert(message);
            });
    };

    $scope.delete = function (id) {
        CategoriesService.delete(id)
            .success(function () {
                _.remove($scope.categories, {_id: id});
            })
            .error(function (message) {
                alert(message);
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

app.controller('BrandsController', function ($scope, BrandsService) {
    BrandsService.query()
        .success(function (brands) {
            $scope.brands = brands;
        });

    $scope.newBrand = {};

    $scope.create = function () {
        if (!$scope.newBrand.name) {
            alert('Please enter a name.');
            return;
        }

        BrandsService.create($scope.newBrand)
            .success(function (newBrand) {
                $scope.brands.unshift(newBrand);
                $scope.newBrand = {};
            })
            .error(function (message) {
                alert(message);
            });
    };

    $scope.delete = function (id) {
        BrandsService.delete(id)
            .success(function () {
                _.remove($scope.brands, {_id: id});
            })
            .error(function (message) {
                alert(message);
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

app.controller('ItemsController', function ($scope, ItemsService, CategoriesService, BrandsService) {
    ItemsService.query()
        .success(function (items) {
            $scope.items = items;
        });

    CategoriesService.query()
        .success(function (categories) {
            $scope.categories = categories;
        });

    BrandsService.query()
        .success(function (brands) {
            $scope.brands = brands;
        });

    $scope.newItem = {};

    $scope.create = function () {
        if (!$scope.newItem.name || !$scope.newItem.category || !$scope.newItem.brand) {
            alert('Please enter a name, category, and brand.');
            return;
        }

        ItemsService.create($scope.newItem)
            .success(function (newItem) {
                $scope.items.unshift(newItem);
                $scope.newItem = {};
            })
            .error(function (message) {
                alert(message);
            });
    };

    $scope.delete = function (id) {
        ItemsService.delete(id)
            .success(function () {
                _.remove($scope.items, {_id: id});
            })
            .error(function (message) {
                alert(message);
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

app.controller('LoginController', function ($scope, $location, SessionsService) {
    $scope.login = function (email, password) {
        if (!email || !password) {
            alert('Please enter an email and a password.');
            return;
        }

        SessionsService.login(email, password)
            .error(function (message) {
                alert(message);
            })
            .then(function (response) {
                var user = response.data.user;
                $scope.$emit('login', user);
                $location.path('/categories');
            });
    };
});

app.controller('RegisterController', function ($scope, $location, UsersService, SessionsService) {
    $scope.newUser = {};

    $scope.register = function () {
        if (!$scope.newUser.email || !$scope.newUser.password) {
            alert('Please enter an email and a password.');
            return;
        }

        UsersService.create($scope.newUser)
            .success(function (user) {
                SessionsService.login($scope.newUser.email, $scope.newUser.password)
                    .error(function (message) {
                        alert(message);
                    })
                    .then(function () {
                        $scope.$emit('login', user);
                        $scope.newUser = {};
                        $location.path('/categories');
                    });
            })
            .error(function (message) {
                alert(message);
            });
    };
});

app.controller('UsersController', function ($scope, UsersService) {
    UsersService.query()
        .success(function (users) {
            $scope.users = users;
        });
});

app.service('UsersService', function ($http) {
    var context = this;

    context.create = function (user) {
        return $http.post('/api/users', user);
    };

    context.query = function () {
        return $http.get('/api/users');
    };
});

app.service('SessionsService', function ($http) {
    var context = this;

    context.refresh = function () {
        $http.defaults.headers.common['x-auth'] = localStorage.token;
        return $http.get('/api/sessions/refresh');
    };

    context.login = function (email, password) {
        return $http.post('/api/sessions', {email: email, password: password})
            .success(function (response) {
                var token = response.token;
                localStorage.token = token;
                $http.defaults.headers.common['x-auth'] = token;
            })
            .error(function (message) {
                alert(message);
            });
    };

    context.logout = function () {
        delete $http.defaults.headers.common['x-auth'];
        delete localStorage.token;
    };
});

app.controller('NotFoundController', function ($scope) {
    $scope.title = 'Not found!';
    $scope.message = 'This is not the page you\'re looking for.';
});

app.controller('ApplicationController', function ($scope, $location, SessionsService) {
    $scope.$on('login', function (event, user) {
        $scope.currentUser = user;
    });

    if (localStorage.token) {
        SessionsService.refresh()
            .success(function (user) {
                $scope.currentUser = user;
            })
            .error(function (message) {
                alert(message);
            });
    }

    $scope.logout = function () {
        delete $scope.currentUser;
        SessionsService.logout();
        $location.path('/login');
    };
});

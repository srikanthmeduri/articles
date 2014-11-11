'use strict';

app.config(['$stateProvider',
    function ($stateProvider) {
        $stateProvider
            .state('all', {
                url: '/articles',
                templateUrl: 'partials/list.html'
            })
            .state('create', {
                url: '/articles/create',
                templateUrl: 'partials/create.html'
            })
            .state('edit', {
                url: '/articles/:articleId/edit',
                templateUrl: 'partials/edit.html'
            })
            .state('article', {
                url: '/articles/:articleId',
                templateUrl: 'partials/view.html'
            });
    }
]);
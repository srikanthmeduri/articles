'use strict';

app.factory('ArticleService', ['$resource',
    function ($resource) {
        return $resource('articles/:articleId', {
            articleId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
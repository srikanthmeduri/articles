'use strict';

angular.module('articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Articles',
    function($scope, $stateParams, $location, Articles) {

        $scope.create = function(isValid) {
            if (isValid) {
                var article = new Articles({
                    title: this.title,
                    content: this.content
                });
                article.$save(function(response) {
                    $location.path('articles/' + response._id);
                });

                this.title = '';
                this.content = '';
            } else {
                $scope.submitted = true;
            }
        };

        $scope.remove = function(article) {
            console.log(article);
            if (article) {
                console.log('if');
                article.$remove(function(response) {
                    for (var i in $scope.articles) {
                        if ($scope.articles[i] === article) {
                            $scope.articles.splice(i, 1);
                        }
                    }
                    $location.path('articles');
                });
            } else {
                console.log('else');
                $scope.article.$remove(function(response) {
                    $location.path('articles');
                });
            }
        };

        $scope.update = function(isValid) {
            if (isValid) {
                var article = $scope.article;
                if (!article.updated) {
                    article.updated = [];
                }
                article.updated.push(new Date().getTime());

                article.$update(function() {
                    $location.path('articles/' + article._id);
                });
            } else {
                $scope.submitted = true;
            }
        };

        $scope.find = function() {
            Articles.query(function(articles) {
                $scope.articles = articles;
            });
        };

        $scope.findOne = function() {
            console.log('$scope.findOne = function () {');
            Articles.get({
                articleId: $stateParams.articleId
            }, function(article) {
                $scope.article = article;
            });
        };
    }
]);

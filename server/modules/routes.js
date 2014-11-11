'use strict';

var articles = require('./controllers');

module.exports = function(app) {

    app.route('/articles')
        .get(articles.all)
        .post(articles.create);


    app.route('/articles/:articleId')
        .get(articles.show)
        .put(articles.update)
        .delete(articles.destroy);

    // Finish with setting up the articleId param
    app.param('articleId', articles.article);
};

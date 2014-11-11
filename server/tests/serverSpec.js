'use strict';

/**
 * Module dependencies.
 */
var should = require('should');
var mongoose = require('mongoose');
var Article = require('../modules/models');

/**
 * Globals
 */

var article;

/**
 * Test Suites
 */

describe('<Unit Test>', function() {
    describe('Model Article:', function() {
        beforeEach(function(done) {
            article = new Article({
                title: 'Article Title',
                content: 'Article Content'
            });
            done();
        });
        describe('Method Save', function() {
            it('should be able to save without problems', function(done) {
                return article.save(function(err) {
                    should.not.exist(err);
                    article.title.should.equal('Article Title');
                    article.content.should.equal('Article Content');
                    article.created.should.not.have.length(0);
                    done();
                });
            });
            it('should be able to show an error when try to save without title', function(done) {
                article.title = '';
                return article.save(function(err) {
                    should.exist(err);
                    done();
                });
            });
            it('should be able to show an error when try to save without content', function(done) {
                article.content = '';
                return article.save(function(err) {
                    should.exist(err);
                    done();
                });
            });
        });
        afterEach(function(done) {
            article.remove();
            done();
        });
    });
});

'use strict';

const _ = require('lodash');
const ObjectId = require('bson-objectid');

module.exports = function (bookshelf) {
    bookshelf.plugin('registry');

    let Tag = bookshelf.Model.extend({
        tableName: 'tags',

        relationships: ['meta'],

        initialize: function () {
            this.on('creating', function onCreating(newObj) {
                if (!newObj.id) {
                    newObj.set('id', ObjectId.generate());
                }
            });
        },

        meta: function () {
            return this.hasMany('TagsMeta', 'object_id');
        }
    });

    return {
        Tag: bookshelf.model('Tag', Tag)
    };
};
var Promise     = require('bluebird');
var mongoPaging = Promise.promisifyAll(require('mongo-cursor-pagination'));
var _           = require('lodash');

var defaults = {
  paginatedField: '_id',
  projection: {
    _id: 1
  },
  limit: 10,
  order: 'asc'
};

module.exports = function paginatePlugin(schema, options) {

  schema.static('findWithPagination', function(req, query, queryOptions) {
    queryOptions = _.merge({}, defaults, queryOptions);

    if (queryOptions.order === 'desc') {
      queryOptions.order = false;
    } else {
      queryOptions.order = true;
    }

    return mongoPaging.findWithReqAsync(
      req,
      this.collection,
      {
        query: query || {},
        paginatedField: queryOptions.paginatedField,
        fields: queryOptions.projection,
        limit: queryOptions.limit,
        sortAscending: queryOptions.order,
      }
    );
  });

};

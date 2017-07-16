var Promise     = require('bluebird');
var mongoPaging = Promise.promisifyAll(require('mongo-cursor-pagination'));

module.exports = function paginatePlugin(schema, options) {

  schema.static('findWithPagination', function(req, query, paginatedField, projection, limit) {
    return mongoPaging.findWithReqAsync(
      req,
      this.collection,
      {
        query: query || {},
        paginatedField: paginatedField || '_id',
        fields: projection || { _id: 1 },
        limit: limit || 10
      }
    );
  });

};

/**
 * User.js
 *
 * @description :: TODO: Each Department can have many users
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'users',
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {

    name: {
      type: 'string'
    },
    age: {
      type: 'integer'
    },
    address: {
      type: 'string'
    },
    department: {
      model: 'department',
      columnName: 'department_id'
    },

  }
};


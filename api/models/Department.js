/**
 * Department.js
 *
 * @description :: A Department model. This model will represent a table in database
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  autoCreatedAt: false,
  autoUpdatedAt: false,
  tableName: 'departments',

  attributes: {

    name: {
      type: 'string',
      required: true
    },

    location: {
      type: 'string',
      required: true
    },
    block: {
      type: 'string'
    },

    //Associations
    users: {
      collection: 'user',
      via: 'department'
    }
  }
};


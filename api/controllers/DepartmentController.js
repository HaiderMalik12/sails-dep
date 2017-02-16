/**
 * DepartmentController
 *
 * @description :: Server-side logic for managing departments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  /**
   * This method will created a new department in db
   * @param req
   * @param res
   * @returns {object} - response object with newly created department
   */
  create: function (req, res) {

    let validParams = ['name', 'location'],
      params = _.pick(req.body, validParams);

    if (!params.name) {

      return res.badRequest({err: 'Invalid name field', status: 400});
    }

    if (!params.location) {

      return res.badRequest({err: 'Invalid location field', status: 400});
    }


    Department
      .create({
        name: params.name,
        location: params.location
      })
      .then(dep => {

        if (!dep) throw ({err:'Could not add department. Please try again later', status: 500});

        return res.ok(dep);

      })
      .catch(err => res.negotiate(err));

  },

  /**
   * This method will find all departments and return all the department
   * @param req
   * @param res
   * @returns {array} - List of departments
   */
  find: function (req, res) {

    Department
      .find()
      .then(departments => {

        if (!departments || departments.length == 0) throw ({err:'Could not find any department', status: 404});

        return res.ok(departments);

      })
      .catch(err => res.negotiate(err));

  },

  findone: function (req, res) {

    let depId = req.params.id;

    if (!depId || isNaN(depId)) {

      return res.badRequest({err: 'Invalid id field', status: 400});
    }

    Department
      .findOne({id: depId})
      .then(dep => {

        if (!dep) throw ({msg:'Could not find any Department.',status:404});

        return res.ok(dep);

      })
      .catch(err => res.negotiate(err));
  }

};


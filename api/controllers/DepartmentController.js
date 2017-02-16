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

        if (!dep) throw new CustomError('Could not add department. Please try again later', {status: 500});

        return res.ok(dep);

      })
      .catch(err => {
        if (err && err.name == 'Custom Error') {
          res.send({err: err.message}, err.status);
        } else res.negotiate(err);
      });

  },

  /**
   * This method will find all departments and return all the department
   * @param req
   * @param res
   * @returns {object} - A response object with the list of departments
   */
  find:function (req,res) {

    Department
      .find()
      .then(departments => {

        if(!departments || departments.length ==0) throw new CustomError('Could not find any department', {status: 500});

        return res.ok(departments);

      })
      .catch(err => {
        if (err && err.name == 'Custom Error') {
          res.send({err: err.message}, err.status);
        } else res.negotiate(err);
      });

  }
};


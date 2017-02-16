/**
 * DepartmentController
 *
 * @description :: Server-side logic for managing departments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  //POST Department
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
      name:params.name,
      location:params.location
    })
      .then(dep => {

        if(!dep) throw ''

      })

  }
};


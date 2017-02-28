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
   * @returns {object} - response object with newly created department and user
   */
  create: (req, res) => {

    let validParams = ['name', 'location', 'block', 'username'],
      params = _.pick(req.body, validParams);

    if (!params.name) {

      return res.badRequest({ err: 'Invalid name field', status: 400 });
    }

    if (!params.location) {

      return res.badRequest({ err: 'Invalid location field', status: 400 });
    }

    if (!params.username) {

      return res.badRequest({ err: 'Invalid user_name field', status: 400 });
    }

    let resp = {};


    User
      .create({ name: params.username })
      .then(_user => {

        if (!_user) throw ({ err: 'Could not add user. Please try again later', status: 500 });


        resp.user = _user;

        return _user;

      })
      .then(_user => {

        return Department.create({
          name: params.name,
          location: params.location,
          block: params.block,
          user: _user.id
        });

      })
      .then(_dep => {

        if (!_dep) throw ({ err: 'Could not add department. Please try again later', status: 500 });

        resp.department = _dep;

        return res.ok(resp);
      })
      .catch(err => res.negotiate);







  },

  /**
   * This method will find all departments and return all the department
   * @param req
   * @param res
   * @returns {array} - List of departments
   */
  find: (req, res) => {

    Department
      .find()
      .then(departments => {

        if (!departments || departments.length == 0) throw ({ err: 'Could not find any department', status: 404 });

        return res.ok(departments);

      })
      .catch(err => res.negotiate(err));

  },

  /**
   * This method will find a department on the based of departmentId
   * @param req
   * @param res
   * @returns {object} - A response object with single department
   */
  findone: (req, res) => {

    let depId = req.params.id;

    if (!depId || isNaN(depId)) {

      return res.badRequest({ err: 'Invalid id field', status: 400 });
    }

    Department
      .findOne({ id: depId })
      .then(dep => {

        if (!dep) throw ({ msg: 'Could not find any Department.', status: 404 });

        return res.ok(dep);

      })
      .catch(err => res.negotiate(err));
  },

  /**
   * The method will update the existing department on the based of departmentId
   * @param req
   * @param res
   * @returns {object} - A response object with updated department
   */
  update: (req, res) => {


    let validParams = ['name', 'location', 'id'],
      params = _.pick(req.body, validParams);

    let depId = req.params.id;

    if (!depId || isNaN(depId)) {

      return res.badRequest({ err: 'Invalid id field', status: 400 });
    }

    let attribute = {};

    if (params.name) {

      attribute.name = params.name;
    }

    if (params.location) {

      attribute.location = params.location;
    }


    sails.bluebird.props({

      dep: Department
        .findOne({ id: depId }),
      updatedDep: Department
        .update({ id: depId }, attribute)

    }).then(props => {

      if (!props.dep || !props.updatedDep) throw ({ err: 'Could update your department', status: 500 });

      return res.ok(props.updatedDep);

    })
      .catch(err => res.negotiate(err));

  },
  delete: (req, res) => {

    let depId = req.params.id;

    if (!depId || isNaN(depId)) {

      return res.badRequest({ err: 'Invalid id field', status: 400 });
    }

    Department.destroy({ id: depId })
      .then(res.ok)
      .catch(res.negotiate);
  },
  /**
   * This method will fetch all the users based on department id
   * @param req {object} 
   * @param res {object}
   * @returns {object} - A response object with list of users for a single department
   */
  findUsers: (req, res) => {

    let depId = req.params.id;

    if (!depId || isNaN(depId)) {

      return res.badRequest({ err: 'Invalid id field', status: 400 });
    }

    Department.find({ id: depId })
      .populate('users')
      .then(res.ok)
      .catch(res.negotiate);

  }

};


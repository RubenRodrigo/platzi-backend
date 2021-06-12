const auth = require('../../../auth');
const Controller = require('./index');

module.exports = function checkAuth(action, options) {
  async function middleware(req, res, next) {
    switch (action) {
      case 'add':
        auth.check.logged(req)
        next();
        break;
      case 'list_own':
        auth.check.logged(req)
        next();
        break;
      case 'update':
        const post = await Controller.get(req.body.id)
        auth.check.own(req, post[0].user)
        next();
        break;
      default:
        next();
    }
  }
  return middleware;
}
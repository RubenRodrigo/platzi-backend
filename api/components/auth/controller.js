const bcrypt = require('bcrypt')
const auth = require('../../../auth/');
const TABLA = 'auth'

module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require('../../../store/dummy');
  }

  async function login(username, password) {
    const data = await store.query(TABLA, { username: username })
    return bcrypt.compare(password, data[0].password)
      .then((isEqual) => {
        if (isEqual === true) {
          // generar token
          return auth.sign(JSON.parse(JSON.stringify(data[0])))
        } else {
          throw new error('Informacion invalida')
        }
      })
  }

  async function upsert(data) {
    const authData = {
      id: data.id,
    };
    if (data.username) {
      authData.username = data.username;
    }
    if (data.password) {
      authData.password = await bcrypt.hash(data.password, 5);
    }

    return store.upsert(TABLA, authData);
  }

  return {
    upsert,
    login
  }

}

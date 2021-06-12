const { nanoid } = require('nanoid');
const error = require('../../../utils/error');

const COLLECTION = 'post';

module.exports = function (injectedStore) {
  let Store = injectedStore;
  if (!Store) {
    Store = require('../../../store/dummy');
  }

  function list(query) {
    return Store.list(COLLECTION);
  }

  async function get(id) {
    const post = await Store.get(COLLECTION, id);
    if (!post) {
      throw error('No existe el post', 404);
    }

    return post;
  }

  async function insert(data, user) {
    const post = {
      id: nanoid(),
      user: user,
      title: data.title,
    }

    return Store.insert(COLLECTION, post).then(() => post);
  }

  async function update(data, user) {
    const post = {
      id: data.id,
      user: user,
      title: data.title,
    }

    return Store.update(COLLECTION, post).then(() => post);
  }

  async function like(post, user) {
    const like = await Store.insert(COLLECTION + '_like', {
      post: post,
      user_from: user,
    });

    return like;
  }

  async function postsLiked(user) {
    const join = {}
    join[COLLECTION] = 'post' // {post: 'post'}
    const query = { user_from: user }
    return await Store.query(COLLECTION + '_like', query, join)
  }

  async function postLikers(post) {
    const join = {}
    join[COLLECTION] = 'post' // {post: 'post'}
    const query = { post: post }
    return await Store.query(COLLECTION + '_like', query, join)
  }

  return {
    list,
    get,
    insert,
    update,
    like,
    postsLiked,
    postLikers,
  }
}
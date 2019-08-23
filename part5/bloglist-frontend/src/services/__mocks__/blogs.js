const blogs = [
  {
    title: 'title1',
    author: 'author1',
    likes: 1,
    user: {
      name: 'name1',
      username: 'username1',
      id: '1'
   },
   id: '1'
  },
  {
    title: 'title2',
    author: 'author2',
    likes: 2,
    user: {
      name: 'name2',
      username: 'username2',
      id: '2'
    },
    id: '2'
  },
];

const getAll = () => {
  return Promise.resolve(blogs);
};

let token = null;
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
}

export default {
  getAll, setToken
};


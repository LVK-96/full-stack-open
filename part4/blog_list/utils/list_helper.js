const _ = require('lodash');

const dummy = blogs => 1;

const totalLikes = blogs => blogs.map(blog => blog.likes).reduce((a, b) => a + b);

const favoriteBlog = (blogs) => {
  const fav_blog = blogs.reduce((max, blog) => (max.likes > blog.likes ? max : blog));
  return (({ author, likes, title }) => ({ author, likes, title }))(fav_blog);
};

const mostBlogs = (blogs) => {
  let tmp = _.countBy(blogs, blog => blog.author);
  tmp = _.toPairs(tmp);
  tmp = _.maxBy(tmp, t => t[1]);
  return {
    author: tmp[0],
    blogs: tmp[1],
  };
};

const mostLikes = (blogs) => {
  const tmp = _.groupBy(blogs, blog => blog.author);
  let max_likes = 0;
  let most_liked_blogger = '';
  for (name in tmp) {
    let likes = 0;
    for (i in tmp[name]) {
      likes += tmp[name][i].likes;
    }

    if (likes > max_likes) {
      most_liked_blogger = name;
      max_likes = likes;
    }
  }

  return {
    author: most_liked_blogger,
    likes: max_likes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};

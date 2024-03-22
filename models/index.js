const user = require('./user');
const post = require('./post');
const comment = require('./comment');

// Establish a one-to-many association between User and Post. A user can have multiple posts.
user.hasMany(post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

post.belongsTo(user, {
  foreignKey: 'user_id'
});

// Establish a one to many association between post and comment. A post can contain multiple comments.
post.hasMany(comment, { 
  foreignKey: 'post_id', 
  onDelete: 'CASCADE' 
});

comment.belongsTo(post, { 
  foreignKey: 'post_id' 
});

// Establish a one to many association between user and comment. User can post multiple comments
user.hasMany(comment, {
  foreignKey: 'user_id', 
  onDelete: 'CASCADE' 
});

comment.belongsTo(user, {
  foreignKey: 'user_id' 
});

module.exports = { user, post, comment };

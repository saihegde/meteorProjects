Template.posts.helpers({
  posts:function(){
      return Posts.find({}, {sort: {createdOn: -1}});
  }
});

Meteor.publish('posts', function(){
  return Posts.find();
});
Meteor.publish('profileImages', function(){
  return ProfileImages.find();
});
Meteor.publish('userImages', function(){
  return UserImages.find();
});

Router.configure({
  layoutTemplate : 'layout'
});

Router.map(function(){
  //Posts
  this.route('posts',{
      path: '/',
      template: 'posts'
  });
  //About
  this.route('about');
  //Profile
  this.route('profile');
});

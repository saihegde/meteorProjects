Todos = new Mongo.Collection('todos');

if (Meteor.isClient) {
    //Template Helpers
    Meteor.subscribe('todos');
    Template.main.helpers({
      todos : function(){
        return Todos.find({}, {sort : {createdAt:-1}});
      }
    });
    Template.main.events({
      "submit .new-todo" : function(event){
        var text = event.target.newTodoText.value;
        Meteor.call('addToDo', text);
        event.target.newTodoText.value = '';
        return false;
      },
      "click .toggle-checked" : function(){
        Meteor.call('checkToDo', this._id, !this.checked);
      },
      "click .delete-todo" : function(){
        if(confirm('Are you sure?')){
            Meteor.call('deleteToDo', this._id);
        }
      }
    });

    Accounts.ui.config({
      passwordSignupFields: "USERNAME_ONLY"
    });
}

if (Meteor.isServer) {
  Meteor.publish('todos', function(){
    return Todos.find({userId: this.userId});
  });
}

Meteor.methods({
  addToDo: function(text){
    if(!Meteor.userId()){
        throw new Meteor.Error('You cant touch that.')
    }
    Todos.insert({
      text: text,
      createdAt: new Date(),
      userId: Meteor.userId(),
      username: Meteor.user().username
    });
  },
  checkToDo: function(toDoId, setChecked){
    var todo = Todos.findOne(toDoId);
    if(todo.userId !== Meteor.userId()){
      throw Meteor.Error('You can\'t touch that.');
    }
    Todos.update(toDoId, {$set: {checked: setChecked}});
  },
  deleteToDo: function(toDoId){
    var todo = Todos.findOne(toDoId);
    if(todo.userId !== Meteor.userId()){
      throw Meteor.Error('You can\'t touch that.');
    }
    Todos.remove(toDoId);
  }
});

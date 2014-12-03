rollcall-duo
============

Small rollcall layer in JS. Smaller than Rollcall 1.0 but enough for our needs at Encore Lab



# Usage Examples

## Instantiate a Rollcall client
```
// first parameter is the base DrowsyDromedary url,
// the second is the database name
var rollcall = new Rollcall('http://drowsy.badger.encorelab.org', 'rollcall');
```
## Users

### Get all users with tags 'foo' and 'bar'
```
rollcall.usersWithTags(['foo', 'bar'])
.done(function (users) {
  users.each(function (user) {
    console.log(user.toJSON());
  });
});
```

### Get all users with classes 'ec101' and 'ec203'
```
rollcall.usersWithClasses(['ec101', 'ec203'])
.done(function (users) {
  users.each(function (user) {
    console.log(user.toJSON());
  });
});
```

### Get the user with username 'akrauss'
```
rollcall.user('akrauss')
.done(function (user) {
  console.log(user.toJSON());
});
```

### Get all users based on an arbitrary selector (all users with zero tags)

rollcall.users({'tags':{'$size': 0}})
.done(function (users) {
  users.each(function (user) {
    console.log(user.toJSON());
  });
});

### Get all users with user_role teacher
```
rollcall.usersWithUserRole('teacher')
.done(function (users) {
  users.each(function (user) {
    console.log(user.toJSON());
  });
});
```

### Set some metadata to a user
```
rollcall.user('akrauss')
.done(function (user) {
  user.set('favourite_colour', 'green');
  user.save();

  // note that .save() returns a promise, so if you want
  // to wait for that save to finish, you would do something like this:

  user.save()
  .done(function () {
    console.log("Save is done!");
  })
});
```

### Tag a user
```
rollcall.user('akrauss')
.done(function (user) {
  user.addTag('mytag');
  user.save();
});
```

### Remove a tag from user
```
rollcall.user('akrauss')
.done(function (user) {
  user.removeTag('mytag');
  user.save();
});
```

### Add a class for a user
```
rollcall.user('akrauss')
.done(function (user) {
  user.addClass('myNewClass');
  user.save();
});
```

### Remove a class from user
```
rollcall.user('akrauss')
.done(function (user) {
  user.removeClass('myOldClass');
  user.save();
});
```

### Is the user a teacher (convenience function) - returns true/false
```
rollcall.user('akrauss')
.done(function (user) {
  console.log(user.isTeacher());
});
```

### Replace all of a user's tags
```
rollcall.user('akrauss')
.done(function (user) {
  user.set('tags', ['alpha', 'beta']);
  user.save();
});
```

### Create a new user
```
var newUser = new rollcall.User({
  username: "cmccann",
  tags: ['foo', 'bar']
});
newUser.save();
```

### Check if a user exists
```
rollcall.userExists('akrauss')
.done(function (exists) {
  if (exists)
    console.log('user exists!');
  else
    console.log('user DOES NOT exist!');
});
```


## Groups

### Creating a group
```
var newGroup = new rollcall.Group({...});
```

### Get all groups based on an arbitrary selector (all groups with zero users)
```
rollcall.groups({'users':{'$size': 0}})
.done(function (groups) {
  groups.each(function (group) {
    console.log(group.toJSON());
  });
});
```
### Get group called 'leprechaun'
```
rollcall.group('leprechaun')
.done(function (group) {
  console.log(group.toJSON());
});
```
## Classes

### Create a new class
```
var newClass = new rollcall.Class({
  "name": "ec101",
  "creator": "jslotta@gmail.com",
  "discussions: []
});
newClass.save();
```

### Add discussion
```
newClass.addDiscussion("53e915cf7e59cb607d099999002");
```

### Remove discussion
```
newGrnewClassoup.removeDiscussion("53e915cf7e59cb607d099999002");
```

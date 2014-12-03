/*jshint debug:false, noarg:true, noempty:true, eqeqeq:true, bitwise:true, undef:true, curly:true, browser: true, devel: true, jquery:false, strict:true */
/*global  Backbone, Skeletor, _, jQuery, Rollcall, exports, require */

(function () {
  "use strict";

  var Backbone, Skeletor, Drowsy, jQuery, _,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) {return i;} } return -1; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty;

  // This detects if we are in a browser or node.js environment and
  // ensures dependencies are available in the required way
  if (typeof exports !== "undefined" && exports !== null) {
    jQuery = require("jquery");
    _ = require("underscore");
    Backbone = require("backbone");
    Backbone.$ = jQuery;
    Drowsy = require("backbone.drowsy").Drowsy;
    Skeletor = {};
    exports.Skeletor = Skeletor;
  } else {
    window.Skeletor = window.Skeletor || {};
    Skeletor = window.Skeletor;
    jQuery = window.$;
    _ = window._;
    Drowsy = window.Drowsy;
  }

  // a Rollcall 2.0 client
  var Rollcall = function (url, db) {
    this.server = new Drowsy.Server(url);
    this.db = this.server.database(db);

    // User model
    this.User = this.db.Document('users').extend({
      addTag: function (tag) {
        var tags = _.clone(this.get('tags'));

        // if no classes array exists add it
        if (!tags) {
          tags = [];
        }

        tags.push(tag);
        this.set('tags', _.uniq(tags));
      },

      removeTag: function (tag) {
        var tags = this.get('tags');
        this.set('tags', _.without(tags, tag));
      },

      addClass: function (c) {
        var classes = _.clone(this.get('classes'));
        // if no classes array exists add it
        if (!classes) {
          classes = [];
        }

        classes.push(c);
        this.set('classes', _.uniq(classes));
      },

      removeClass: function (c) {
        var classes = this.get('classes');
        this.set('classes', _.without(classes, c));
      },

      isTeacher: function() {
        if (this.get('user_role') === 'teacher') {
          return true;
        } else {
          return false;
        }
      }
    });

    this.Users = this.db.Collection('users').extend({
      model: this.User
    });

    // Group model
    this.Group = this.db.Document('groups').extend({
      addGroup: function (group) {
        var groups = _.clone(this.get('groups'));
        groups.push(group);
        this.set('groups', _.uniq(group));
      }
    });

    this.Groups = this.db.Collection('groups').extend({
      model: this.Group
    });

    // Run model
    this.Run = this.db.Document('runs').extend({
    });

    this.Runs = this.db.Collection('runs').extend({
      model: this.Run
    });

    /*
     *   Model for Classes
     */
    this.Class = this.db.Document('classes').extend({
      addDiscussion: function (discussionId) {
        var discussions = _.clone(this.get('discussions'));

        // if no classes array exists add it
        if (!discussions) {
          discussions = [];
        }

        discussions.push(discussionId);
        this.set('discussions', _.uniq(discussions));
      },

      removeDiscussion: function (discussionId) {
        var discussions = this.get('discussions');
        this.set('discussions', _.without(discussions, discussionId));
      }

    });

    this.Users = this.db.Collection('classes').extend({
      model: this.Class
    });

  };

  Rollcall.prototype.users = function(selector) {
    selector = selector || {};

    var users = new this.Users();
    var usersPromise = users.fetch({
      data: {
        selector: JSON.stringify(selector),
        strict: false
      }
    });

    return usersPromise.then(function () {
      return users;
    });
  };

  Rollcall.prototype.authenticate = function(username, password) {
    var authenticatePromise = this.user(username)
      .then(function (user) {
        if (!user) {
          return false;
        }

        if (user.get('password') !== password) {
          return false;
        }

        return true;
      });

    return authenticatePromise;
  };

  Rollcall.prototype.identify = function(username) {
    var identifyPromise = this.user(username)
      .then(function (user) {
        if (!user) {
          return null;
        }

        return user;
      });

    return identifyPromise;
  };

  Rollcall.prototype.usersWithTags = function(tags) {
    tags = tags || [];
    var selector = {"tags":{"$all": tags}};

    return this.users(selector);
  };

  Rollcall.prototype.usersWithClasses = function(classes) {
    classes = classes || [];
    var selector = {"classes":{"$all": classes}};

    return this.users(selector);
  };

  Rollcall.prototype.user = function(username) {
    return this.users({"username": username})
    .then(function (users) {
      return users.at(0);
    });
  };

  Rollcall.prototype.userExists = function(username) {
    return this.user(username)
      .then(function (u) {
        if (u) {
          return true;
        } else {
          return false;
        }
      });
  };

  Rollcall.prototype.usersWithUserRole = function (userRole) {
    userRole = userRole || '';
    var selector = {"user_role":userRole};

    return this.users(selector);
  };

  Rollcall.prototype.group = function(groupname) {
    return this.groups({"groupname": groupname})
    .then(function (groups) {
      return groups.at(0);
    });
  };

  Rollcall.prototype.groups = function(selector) {
    selector = selector || {};

    var groups = new this.Groups();
    var groupsPromise = groups.fetch({
      data: {
        selector: JSON.stringify(selector),
        strict: false
      }
    });

    return groupsPromise.then(function () {
      return groups;
    });
  };

  Rollcall.prototype.groupsWithTags = function(tags) {
    tags = tags || [];
    var selector = {"tags":{"$all": tags}};

    return this.groups(selector);
  };

  /*
  * Added run stuff - unsure and therefor experimental
  */

  Rollcall.prototype.runs = function(selector) {
    selector = selector || {};

    var runs = new this.Runs();
    var runsPromise = runs.fetch({
      data: {
        selector: JSON.stringify(selector),
        strict: false
      }
    });

    return runsPromise.then(function () {
      return runs;
    });
  };

  this.Rollcall = Rollcall;

}).call(this);

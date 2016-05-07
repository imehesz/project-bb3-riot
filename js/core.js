/* global MHX */
/* global riot */
/* global $ */

// Code goes here

(function(){
  
  'use strict';
  
  class Tag {
    constructor(riotScope) {
      this.riotScope = riotScope;
      
      console.log("riot Scope in Tag", riotScope);

      this.riotScope.on("mount", this.onMount.bind(this));
      this.riotScope.on("error", this.onError.bind(this));
      this.riotScope.on("update", this.onUpdate.bind(this));
    }
    
    log(x) {
      console.log(x);
    }
    
    onMount() {}
    
    onUpdate() {}
    
    onError(e) {
      console.error(e);      
    }
  }
  
  var Router = {
    activeCollection: "",
    activeId: "",
    activeAction: "",
    
    routes: {
      "home": function(id, action) {
        riot.mount("#view", "home-page");
      }
    },
    
    handler: function(collection, id, action) {
      console.log(collection, id, action, Router.routes);
      
      Router.activeCollection = collection || "home";
      Router.activeId = id;
      Router.activeAction = action;
      
      var routeFn = Router.routes[Router.activeCollection];
      routeFn(Router.activeId, Router.activeAction);
    },
    
    getActive: function(what) {
      return Router["active" + what];
    }
  };
  
  var Service = {
    getBookList: (optsObj) => {
      $.getJSON("https://imehesz.firebaseio.com/bookdata.json", (data) => {
        if (optsObj && $.isFunction(optsObj.successCb)) {
          // TODO update when ready
          optsObj.successCb(data.books);
        }
      });
    },
    
    getChapterList: (bookId, optsObj) => {
      $.getJSON("https://imehesz.firebaseio.com/bookdata.json?bookId=" + bookId, (data) => {
        if (optsObj && $.isFunction(optsObj.successCb)) {
          // TODO update when ready
          optsObj.successCb(data.chapters);
        }
      });
    },
    
    getLines: (bookId, chapterId, optsObj) => {
      $.getJSON("https://imehesz.firebaseio.com/bookdata.json?bookId=" + bookId + "&chapterId=" + chapterId, (data) => {
        if (optsObj && $.isFunction(optsObj.successCb)) {
          // TODO update when ready
          optsObj.successCb(data.lines);
        }
      });
    }
  };
  
  var Util = {
    ArrayUtil: {
      shuffle: function(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
      }
    }
  }
  
  window.MHX = {
    Tag: Tag,
    Util: Util,
    Router: Router,
    Service: Service
  }
})();
/* global MHX */
/* global riot */
/* global $ */

// Code goes here

(function(){
  
  'use strict';
  
  class Tag {
    constructor(riotScope) {
      this.riotScope = riotScope;
      
      // console.log("riot Scope in Tag", riotScope);

      this.riotScope.on("mount", this.onMount.bind(this));
      this.riotScope.on("error", this.onError.bind(this));
      this.riotScope.on("update", this.onUpdate.bind(this));
      
      this.riotScope.attachSettings = this.attachSettings.bind(this);
      this.riotScope.obs = riot.observable();
      
      this.bootRiot();
    }
    
    log(x) {
      console.log(x);
    }
    
    bootRiot() {}
    
    onMount() {}
    
    onUpdate() {}
    
    onError(e) {
      console.error(e);      
    }
    
    attachSettings() {
      return JSON.stringify(MHX.Util.SettingsUtil.getAll());
    }
  }

  var Service = {
    getBookList: (lang, optsObj) => {
      var cacheId = lang.toLowerCase() + "-books";
      var cachedBooks = MHX.Util.CacheUtil.get(cacheId);
      
      if (cachedBooks && cachedBooks.length > 0) {
        console.log("LOADING CACHED! WOOHOO!");
        optsObj.successCb(cachedBooks);
      } else {
        $.getJSON("http://185.99.132.197:1337/book/?lang=" + lang, (data) => {
          MHX.Util.CacheUtil.set(cacheId, data.books);
          if (optsObj && $.isFunction(optsObj.successCb)) {
            optsObj.successCb(data.books);
          }
        });
      }
    },
    
    getChapterList: (bookId, optsObj) => {
      $.getJSON("http://185.99.132.197:1337/book/" + bookId, (data) => {
        if (optsObj && $.isFunction(optsObj.successCb)) {
          optsObj.successCb(data.chapters);
        }
      });
    },
    
    getLines: (bookId, chapterId, lang, optsObj) => {
      $.getJSON("http://185.99.132.197:1337/book/" + bookId + "/" + chapterId + "?lang=" + lang, (data) => {
        if (optsObj && $.isFunction(optsObj.successCb)) {
          optsObj.successCb(data.verses);
        }
      });
    }
  };
  
  var Util = {
    // must be used after items had been cached
    InfoUtil: {
      getField: function(field, lang, id) {
        var cachedBooks = MHX.Util.CacheUtil.get(lang + "-books");
        
        if (cachedBooks && cachedBooks.length) {
          for(let i=0; i<cachedBooks.length; i++) {
            var bookObj = cachedBooks[i];
            
            if (bookObj.id == id || bookObj.bookId == id) {
              return bookObj[field];
            }
          }
        }
      },
      
      getShortHeader: function(lang, id) {
        return MHX.Util.InfoUtil.getField("headerShort", lang, id) || "";
      },
      
      getLongHeader: function(lang, id) {
        return MHX.Util.InfoUtil.getField("headerLong", lang, id) || "";
      },
      
      isOt: function(lang, id) {
        
      },
      
      isNt: function(lang, id) {
        
      }
    },
    CacheUtil: {
      _storage: {},
      
      get: function(k) {
        return MHX.Util.CacheUtil._storage[k];
      },
      
      set: function(k, v) {
        MHX.Util.CacheUtil._storage[k] = v;
      }
    },
    SettingsUtil: {
      settings: null,
      defaultSettings: {
        langFrom: "esv",
        langTo: "nhun",
        showSecondBook: true
      },
      get: (s) => {
        return Util.SettingsUtil.settings[s];
      },
      set: (k,v) => {
        return Util.SettingsUtil.settings[k] = v;
      },
      getAll: function() {
        return Util.SettingsUtil.settings;
      },
      parseParams: (uri) => {
        if (!uri) uri = "";
        var pos = uri.indexOf("s={");
        var settingsStr = "";
        var settingsObj = null;
        
        Util.SettingsUtil.settings = Util.SettingsUtil.defaultSettings;
        
        if (pos > -1) {
          // let's get the settings
          settingsStr = uri.substr(pos+2, uri.length);
          try{
            Util.SettingsUtil.settings = Object.assign({}, Util.SettingsUtil.defaultSettings, JSON.parse(settingsStr));
          } catch(e) {
            console.error("ERR Parsing settings", e);
          }
        }
      }
    },
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
    },
    
    Observable: riot.observable()
  }
  
  window.MHX = {
    Tag: Tag,
    Util: Util,
    Service: Service
  }
})();
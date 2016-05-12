/* global MHX */
/* global riot */
/* global i18next */
/* global $ */

(function(){
  "use strict";

  class WebAppTag extends MHX.Tag {

    bootRiot() {
      riot.mixin("I18N", riot.observable());

      $.getJSON("./locale/locale-translation.json", function(data) {
        i18next.init({
          "debug": true,
          "lng": "hu",
          "fallbackLng": "en",
          "keySeparator": false,
          "nsSeparator": false,
          "resources": data
        });
  
        window._t = i18next.t.bind(i18next);
        riot.mixin("I18N").trigger("ready");
      });
      
      riot.router.use((req, resp, next) => {
        try {
          return next();
        } finally {
          MHX.Util.SettingsUtil.parseParams(req.uri);
        }
      });
      
      var Route = riot.router.Route, 
          DefaultRoute = riot.router.DefaultRoute, 
          NotFoundRoute = riot.router.NotFoundRoute, 
          RedirectRoute = riot.router.RedirectRoute;


      riot.router.routes([
        new DefaultRoute({tag: 'books-page'}),
        new Route({path: "/home", tag: 'home-page'}),
        new Route({path: '/books/read/:bookId/:chapterId', tag: 'book-page'}),
        new Route({path: '/books/read/:bookId', tag: 'book-page'}),
        new Route({path: "/books", tag: 'books-page'})
        // new Route({path: "/books", tag: 'books-page'}).routes([
          // new Route({path: '/read/:bookId/:chapterId', tag: 'book-page'}),
          // new Route({path: '/read/:bookId', tag: 'book-page'}),
          // new NotFoundRoute({tag: 'not-found'})
        // ])
      ]);

      riot.router.start();
      
      // we load the both books to get the header when needed
      MHX.Service.getBookList(MHX.Util.SettingsUtil.get("langFrom"));
      MHX.Service.getBookList(MHX.Util.SettingsUtil.get("langTo"));

    }
  }
  
  window.MHX.WebAppTag = WebAppTag;
})();
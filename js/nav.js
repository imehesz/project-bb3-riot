/* global MHX */
/* global riot */
/* global $ */

(function(){
  "use strict";

  class NavigationTag extends MHX.Tag {
    constructor(riotScope) {
      super(riotScope);
      
      
      riot.router.on('route:updated', this.updateNavigation.bind(this));

      this.updateNavigation();
      
      $(".button-collapse").sideNav();
      
      MHX.Util.Observable.on("bookSelected", (bookId) => {
        this.riotScope.update({
          backLink: "#/books",
          title:  MHX.Util.InfoUtil.getLongHeader(MHX.Util.SettingsUtil.get("langFrom"), bookId) + " | " +
                  MHX.Util.InfoUtil.getLongHeader(MHX.Util.SettingsUtil.get("langTo"), bookId)
        });
      });
      
      MHX.Util.Observable.on("chapterSelected", (bookId, chapterId) => {
        // TODO merge with top
        this.riotScope.update({
          backLink: "#/books/read/" + bookId, 
          title:  MHX.Util.InfoUtil.getLongHeader(MHX.Util.SettingsUtil.get("langFrom"), bookId) + " " + chapterId + " | " +
                  MHX.Util.InfoUtil.getLongHeader(MHX.Util.SettingsUtil.get("langTo"), bookId) + " " + chapterId
        });
      });
      
      this.riotScope.openSettings = () => {
        MHX.Util.Observable.trigger("openSettings");
      };
    }
    
    updateNavigation(activeRoute, title) {
      this.riotScope.update({
        activeRoute: activeRoute ? activeRoute.uri : "",
        title: title || "Read ..."
      });
    }
  }
  
  window.MHX.NavigationTag = NavigationTag;
})();
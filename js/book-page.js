/* global MHX */
/* global riot */
/* global Util */
/* global $ */

(function(){
  "use strict";

  class BookPageTag extends MHX.Tag {
    constructor(riotScope) {
      super(riotScope);
    }
    
    onMount() {
      super.onMount();

      var bookId = riot.router.current.params.bookId;
      var chapterId = riot.router.current.params.chapterId;
      
      this.riotScope.chapters = [];
      this.riotScope.lines = [];
      
      if (chapterId) {
        var lines1Def = $.Deferred();
        this.riotScope.lines1 = [];

        var lines2Def = $.Deferred();
        this.riotScope.lines2 = [];
        
        MHX.Service.getLines(bookId, chapterId, MHX.Util.SettingsUtil.get("langFrom"), {
          successCb: (data) => {
            this.riotScope.lines1 = data;
            lines1Def.resolve();
          }
        });
        
        if (MHX.Util.SettingsUtil.get("showSecondBook")) {
          MHX.Service.getLines(bookId, chapterId, MHX.Util.SettingsUtil.get("langTo"), {
            successCb: (data) => {
              this.riotScope.lines2 = data;
              lines2Def.resolve();
            }
          });
        } else {
          lines2Def.resolve();
        }
        
        $.when(lines1Def, lines2Def).done( () => {
          console.log("got the lines!");
          this.riotScope.update();
        });
        
      } else if (bookId) {
        MHX.Service.getChapterList(bookId, {
          successCb: (data) => {
            this.riotScope.update({
              chapters: data,
              bookId: bookId
            });
          }
        });
      }
    }
  }

  window.MHX.BookPageTag = BookPageTag;
})();
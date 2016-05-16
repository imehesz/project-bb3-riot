/* global MHX */
/* global riot */
/* global Util */
/* global $ */

(function(){
  "use strict";

  class BookPageTag extends MHX.Tag {
    bootRiot() {
      super.bootRiot();

      var rs = this.riotScope;

      var bookId = riot.router.current.params.bookId;
      var chapterId = riot.router.current.params.chapterId;
      
      rs.chapters = [];
      rs.lines = [];
      
      rs.loading = true;
      
      if (chapterId && bookId) {
        var lines1Def = $.Deferred();
        rs.lines1 = [];

        var lines2Def = $.Deferred();
        rs.lines2 = [];
        
        MHX.Service.getLines(bookId, chapterId, MHX.Util.SettingsUtil.get("langFrom"), {
          successCb: (data) => {
            rs.lines1 = data;
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
          MHX.Util.Observable.trigger("chapterSelected", bookId, chapterId);
          rs.loading = false;
          rs.update();
        });
        
      } else if (bookId) {
        MHX.Service.getChapterList(bookId, {
          successCb: (data) => {
            MHX.Util.Observable.trigger("bookSelected", bookId);
            rs.update({
            loading: false,
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
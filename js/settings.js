/* global MHX */
/* global riot */
/* global _t */
/* global $ */

(function(){
  "use strict";

  class SettingsTag extends MHX.Tag {
    bootRiot() {
      super.bootRiot();
      
      this.languages = [
        {id: "asv", label: "American Standard Version (ASV)"},
        {id: "esv", label: "English Standard Version (ESV)"},
        {id: "nhun", label: "Magyar (Uj)"},
        {id: "greek", label: "Greek"},
        //{id: "esp", label: "Spanish"}
      ];

      var rs = this.riotScope;
      var mu = MHX.Util;
      var musu = mu.SettingsUtil;
      var muiu = mu.InfoUtil;
      var muhu = mu.HistoryUtil;

      rs.booksHistory = musu.get("history") || [];
      rs.fromLanguages = this.languages;
      rs.toLanguages = this.languages;
      rs.currentFromLanguage = musu.get("langFrom");
      rs.currentToLanguage = musu.get("langTo");
      rs.currentShowSecondBook = musu.get("showSecondBook");
      
      MHX.Util.Observable.on("openSettings", () => {
        $("#modal1").openModal();
      });
      
      MHX.Util.Observable.on("chapterSelected", (bookId, chapterId) => {
        if (bookId && chapterId) {
          var tmpArr = muhu.books;

          var hasIt = tmpArr.filter(function(el){
            return el.bookId == bookId && el.chapterId == chapterId;
          });
          
          if (hasIt.length == 0) {
            tmpArr.unshift({
              title:  muiu.getLongHeader(musu.get("langFrom"), bookId) + "-" + chapterId,
              bookId: bookId,
              chapterId: chapterId
            });
            
            rs.update({
              booksHistory: tmpArr
            });
            
            muhu.books = tmpArr;
          }
        }
      });
      
      rs.applySettings = () => {
        console.log(rs.settingsForm.showSecondBook.checked);
        
        var sure = confirm("This will reset your history! Are you sure?");
        
        if (sure) {
          MHX.Util.SettingsUtil.set("langFrom", rs.settingsForm.langFrom.value);
          MHX.Util.SettingsUtil.set("langTo", rs.settingsForm.langTo.value);
          MHX.Util.SettingsUtil.set("showSecondBook", rs.settingsForm.showSecondBook.checked);
          
          if (riot.router.current.uri.indexOf("s={") > -1) {
            riot.route("/" + riot.router.current.uri.substr(0, riot.router.current.uri.indexOf("s={")-1) + "?s=" + this.attachSettings());
          } else {
            riot.route(riot.router.current.uri + "?s=" + this.attachSettings());
          }
          
          // ouch!? :( TODO make it nicer
          window.location.reload();
        } else {
          alert("Save cancelled!");
        }
      };
    }
  }
  
  window.MHX.SettingsTag = SettingsTag;
})();
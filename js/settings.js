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
        {id: "esp", label: "Spanish"}
      ];

      var rs = this.riotScope;

      rs.fromLanguages = this.languages;
      rs.toLanguages = this.languages;
      rs.currentFromLanguage = MHX.Util.SettingsUtil.get("langFrom");
      rs.currentToLanguage = MHX.Util.SettingsUtil.get("langTo");
      rs.currentShowSecondBook = MHX.Util.SettingsUtil.get("showSecondBook");
      
      MHX.Util.Observable.on("openSettings", () => {
        $("#modal1").openModal();
      });
      
      rs.applySettings = () => {
        console.log(rs.settingsForm.showSecondBook.value);
        
        MHX.Util.SettingsUtil.set("langFrom", rs.settingsForm.langFrom.value);
        MHX.Util.SettingsUtil.set("langTo", rs.settingsForm.langTo.value);
        MHX.Util.SettingsUtil.set("showSecondBook", rs.settingsForm.showSecondBook.value);
        
        if (riot.router.current.uri.indexOf("s={") > -1) {
          riot.route(riot.router.current.uri.substr(0, riot.router.current.uri.indexOf("s={")) + "?s=" + this.attachSettings());
        } else {
          riot.route(riot.router.current.uri + "?s=" + this.attachSettings());
        }
        
        console.log();
      };
    }
  }
  
  window.MHX.SettingsTag = SettingsTag;
})();
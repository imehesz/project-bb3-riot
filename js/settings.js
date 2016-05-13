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
        {id: "esv", label: "ESV"},
        {id: "nhun", label: "Magyar"},
        {id: "greek", label: "Greek"},
        {id: "esp", label: "Spanish"},
      ];

      var rs = this.riotScope;

      rs.fromLanguages = this.languages;
      rs.toLanguages = this.languages;
      rs.currentFromLanguage = MHX.Util.SettingsUtil.get("langFrom");
      rs.currentToLanguage = MHX.Util.SettingsUtil.get("langTo");
      
      MHX.Util.Observable.on("openSettings", () => {
        $("#modal1").openModal();
      });
    }
  }
  
  window.MHX.SettingsTag = SettingsTag;
})();
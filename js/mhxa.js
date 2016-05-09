/* global MHX */
/* global riot */
/* global _t */

(function(){
  "use strict";

  class MhxATag extends MHX.Tag {
    constructor(riotScope) {
      super(riotScope);
    }
    
    onMount() {
      super.onMount();

      this.riotScope.to = this.riotScope.opts.to + "?s=" + JSON.stringify(MHX.Util.SettingsUtil.getAll());
    }
  }
  
  window.MHX.MhxATag = MhxATag;
})();
/* global MHX */
/* global riot */
/* global _t */

(function(){
  "use strict";

  class SearchFormTag extends MHX.Tag {
    constructor(riotScope) {
      super(riotScope);
    }
    
    bootRiot() {
      super.bootRiot();
      
      this.riotScope.textChanged = (e) => {
        if (this.riotScope.opts.changecb && typeof this.riotScope.opts.changecb) {
          this.riotScope.opts.changecb(e.target.value);
        } else {
          console.log("YUP! changed", e.target.value);
        }
      }
    }
  }
  
  window.MHX.SearchFormTag = SearchFormTag;
})();
/* global MHX */
/* global riot */
/* global _t */

(function(){
  "use strict";

  class TTag extends MHX.Tag {
    constructor(riotScope) {
      super(riotScope);
    }
    
    onMount() {
      super.onMount();
      console.log("mounting stuff in T", this);
      
      riot.mixin("I18N").on("ready", function(){
        var word = this.riotScope.root.innerText;
        var varObj = {};
        
  
        if (this.riotScope.opts.vars) {
          var tmpVarArr = this.riotScope.opts.vars.split(",");
          tmpVarArr.map(function(el){
            var keyVal = el.split(":");
  
            if (keyVal.length == 2) {
              var key = keyVal[0];
              var val = keyVal[1];
              varObj[key] = val;
            }
          });
        }
  
        this.riotScope.root.innerText = _t(word, varObj) || word;
      }.bind(this));
    }
  }
  
  window.MHX.TTag = TTag;
})();
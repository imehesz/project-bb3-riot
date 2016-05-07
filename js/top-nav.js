/* global MHX */
/* global riot */

(function(){
  "use strict";

  class NavigationTag extends MHX.Tag {
    constructor(riotScope) {
      super(riotScope);
    }
    
    onMount() {
      super.onMount();
      
      riot.route(this.updateNavigation.bind(this));
      this.updateNavigation();
    }
    
    updateNavigation() {
      this.riotScope.update({
        activeRoute: MHX.Router.getActive("Collection")        
      });
    }
  }
  
  window.MHX.NavigationTag = NavigationTag;
})();
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
      
      riot.router.on('route:updated', this.updateNavigation.bind(this));
      this.updateNavigation();
    }
    
    updateNavigation(activeRoute) {
      this.riotScope.update({
        activeRoute: activeRoute ? activeRoute.uri : ""
      });
    }
  }
  
  window.MHX.NavigationTag = NavigationTag;
})();
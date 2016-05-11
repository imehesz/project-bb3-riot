/* global MHX */
/* global riot */
/* global $ */

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
      $(".button-collapse").sideNav();
    }
    
    updateNavigation(activeRoute) {
      console.log(activeRoute);
      this.riotScope.update({
        activeRoute: activeRoute ? activeRoute.uri : ""
      });
    }
  }
  
  window.MHX.NavigationTag = NavigationTag;
})();
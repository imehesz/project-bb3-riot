/* global MHX */
/* global riot */

(function(){
  "use strict";

  MHX.Router.routes["books"] = function(id, action) {
    riot.mount("#view", "books-page");
  };

  class BooksPageTag extends MHX.Tag {
    constructor(riotScope) {
      super(riotScope);
    }
    
    onMount() {
      super.onMount();
      
      MHX.Service.getBookList({
        successCb: (data) => {
          this.riotScope.update({
            books: data
          });          
        }
      });
    }
  }

  window.MHX.BooksPageTag = BooksPageTag;
})();
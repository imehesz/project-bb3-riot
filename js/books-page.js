/* global MHX */
/* global riot */

(function(){
  "use strict";

  class BooksPageTag extends MHX.Tag {
    constructor(riotScope) {
      super(riotScope);
    }
    
    onMount() {
      super.onMount();
      
      MHX.Service.getBookList({
        successCb: (data) => {
          this.riotScope.update({
            books: data,
            filteredBooks: data
          });          
        }
      });
      
      this.riotScope.filterBooks = (text) => {
        if (this.riotScope.books && this.riotScope.books.length) {
          var tmpBooks = this.riotScope.books.filter(function(el){
            if (el && el.shortHeader.toLowerCase().indexOf(text.toLowerCase()) > -1) {
              return true;
            }
          });
          
          this.riotScope.update({
            filteredBooks: tmpBooks
          });
        }
      }
    }
  }

  window.MHX.BooksPageTag = BooksPageTag;
})();
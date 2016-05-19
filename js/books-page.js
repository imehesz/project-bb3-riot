/* global MHX */
/* global riot */

(function(){
  "use strict";

  class BooksPageTag extends MHX.Tag {
    bootRiot() {
      super.bootRiot();
      
      var rs = this.riotScope;
      this.riotScope.loading = true;
      
      MHX.Service.getBookList(MHX.Util.SettingsUtil.get("langFrom"), {
        successCb: (data) => {
          this.riotScope.update({
            books: data,
            filteredBooks: data,
            loading: false
          });          
        }
      });
      
      this.riotScope.filterBooks = (text) => {
        if (this.riotScope.books && this.riotScope.books.length) {
          var tmpBooks = this.riotScope.books.filter(function(el){
            if (el && rs.getHeader(el, "short").toLowerCase().indexOf(text.toLowerCase()) > -1) {
              return true;
            }
          });
          
          this.riotScope.update({
            filteredBooks: tmpBooks
          });
        }
      }
      
      this.riotScope.getHeader = (book, short) => {
        if (book) {
          if (short == "short") {
            return book.headerShort || book.headerLong.substr(0,5);
          } else {
            return book.headerLong;
          }
        }
        
        return "";
      }
    }
  }

  window.MHX.BooksPageTag = BooksPageTag;
})();
(function(){
  "use strict";

  class BookPageTag extends MHX.Tag {
    constructor(riotScope) {
      super(riotScope);
    }
    
    onMount() {
      super.onMount();

      var bookId = riot.router.current.params.bookId;
      var chapterId = riot.router.current.params.chapterId;
      
      this.riotScope.chapters = [];
      this.riotScope.lines = [];
      
      if (chapterId) {
        MHX.Service.getLines(bookId, chapterId, {
          successCb: (data) => {
            this.riotScope.update({
              lines: data,
              bookId: bookId
            });          
          }
        });      
      } else if (bookId) {
        MHX.Service.getChapterList(bookId, {
          successCb: (data) => {
            this.riotScope.update({
              chapters: data,
              bookId: bookId
            });          
          }
        });
      }
    }
  }

  window.MHX.BookPageTag = BookPageTag;
})();
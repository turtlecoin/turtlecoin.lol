$(document)
  .ready(() => {
    $.get({
      url: 'https://jsonp.afeld.me/?url=https://blog.turtlecoin.lol/feed/json',
      json: true,
      success: function(data) {
        $('#blog-feed')
          .html('')

        if (!data.items) return;

        data.items = data.items.filter(item => (item.content_text))

        for (var i = 0; i < 3; i++) {
          const article = data.items.shift();
          const txt = article
            .content_text
            .split('.')[0]

          $('#blog-feed')
            .append(`<h5><a href="${article.url}">${article.title}</a></h5><blockquote>${txt}</blockquote>`);
        }
      }
    })
  })
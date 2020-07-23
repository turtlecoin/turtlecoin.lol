$(document)
  .ready(() => {
    $.get({
      url: 'https://api.github.com/repos/turtlecoin/turtlecoin/issues',
      json: true,
      success: function (data) {
        $('#github-issues').html('')

        for (var i = 0; i < 3; i++) {
          const issue = data.shift()

          $('#github-issues')
            .append(`<li><a href="${issue.html_url}">${issue.title}</a>`)
        }
      }
    })

    $.get({
      url: 'https://api.github.com/repos/turtlecoin/turtlecoin/commits',
      json: true,
      success: function (data) {
        $('#github-commits').html('')

        data = data.filter(item => item.commit.message.indexOf('Merge') === -1)

        for (var i = 0; i < 3; i++) {
          const commit = data.shift()

          $('#github-commits')
            .append(`<li><a href="${commit.html_url}">${commit.commit.message}</a>`)
        }
      }
    })
  })

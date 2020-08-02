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

    $.get({
      url: 'https://api.github.com/repos/turtlecoin/turtle-wallet-proton/releases/latest',
      json: true,
      success: function (data) {
        for (var i = 0; i < data.assets.length; i++) {
          const asset = data.assets[i]
          console.log(asset.content_type)
          switch (asset.content_type) {
            case 'application/x-ms-dos-executable':
              $('#gui-windows-dl')
              .attr("href", asset.browser_download_url)
              break
            case 'application/x-apple-diskimage':
              $('#gui-mac-dl')
              .attr("href", asset.browser_download_url)
              break
            case 'application/vnd.debian.binary-package':
              $('#gui-linux-dl')
                .attr("href", asset.browser_download_url)
              break
            default:
              break
          }
        }
      }
    })
  })

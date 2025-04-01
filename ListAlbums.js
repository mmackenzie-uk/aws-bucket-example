// List the photo albums that exist in the bucket.
function listAlbums() {
    s3.listObjects({ Delimiter: "/" }, function (err, data) {
      if (err) {
        return alert("There was an error listing your albums: " + err.message);
      } else {
        var albums = data.CommonPrefixes.map(function (commonPrefix) {
          var prefix = commonPrefix.Prefix;
          var albumName = decodeURIComponent(prefix.replace("/", ""));
          return getHtml([
            "<li>",
            '<button style="margin:5px;" onclick="viewAlbum(\'' +
              albumName +
              "')\">",
            albumName,
            "</button>",
            "</li>",
          ]);
        });
        var message = albums.length
          ? getHtml(["<p>Click on an album name to view it.</p>"])
          : "<p>You do not have any albums. Please Create album.";
        var htmlTemplate = [
          "<h2>Albums</h2>",
          message,
          "<ul>",
          getHtml(albums),
          "</ul>",
        ];
        document.getElementById("viewer").innerHTML = getHtml(htmlTemplate);
      }
    });
  }

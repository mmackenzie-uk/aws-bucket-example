// Show the photos that exist in an album.
function viewAlbum(albumName) {
    var albumPhotosKey = encodeURIComponent(albumName) + "/";
    console.log("alb ", albumPhotosKey)
    s3.listObjects({ Prefix: albumPhotosKey }, function (err, data) {
      if (err) {
        return alert("There was an error viewing your album: " + err.message);
      }
      // 'this' references the AWS.Request instance that represents the response
      var href = this.request.httpRequest.endpoint.href;
      var bucketUrl = href + albumBucketName + "/";

      var photos = data.Contents.map(function (photo) {
        var photoKey = photo.Key;
        var photoUrl = bucketUrl + encodeURIComponent(photoKey);
        return getHtml([
          "<span>",
            "<div>",
              "<br/>",
              '<img style="width:128px;height:128px;" src="' + photoUrl + '"/>',
            "</div>",
            "<div>",
              "<span>",
                photoKey.replace(albumPhotosKey, ""),
              "</span>",
            "</div>",
          "</span>",
        ]);
      });
      var message = photos.length
        ? "<p>The following photos are present.</p>"
        : "<p>There are no photos in this album.</p>";
      var htmlTemplate = [
        "<div>",
            '<button onclick="listAlbums()">',
                "Back To Albums",
            "</button>",
        "</div>",
        "<h2>",
            "Album: " + albumName,
        "</h2>",
        message,
        "<div>",
            getHtml(photos),
        "</div>",
        "<h2>",
            "End of Album: " + albumName,
        "</h2>",
        "<div>",
            '<button onclick="listAlbums()">',
                "Back To Albums",
            "</button>",
        "</div>",
      ];
      document.getElementById("viewer").innerHTML = getHtml(htmlTemplate);
      document
        .getElementsByTagName("img")[0]
        .setAttribute("style", "display:none;");
    });
  }
  
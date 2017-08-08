$('.guessTrack').hide()
$('.fail').hide()
$('.success').hide()
$('.twelveMore').hide()



//Input band name

$(".buttonOne").click(function(event) {
  event.preventDefault()
  bandInput = decodeURIComponent($("#bandInput").val());
  $.get("https://galvanize-cors-proxy.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_artist=" + bandInput + "&apikey=c9cf420cde3c6f076d884df06df9c0cc")
    .then(function(data) {
      var obj = JSON.parse(data);
      var trackList = obj.message.body.track_list;
      i = Math.floor(Math.random() * trackList.length);
      var lyricID = trackList[i].track.track_id;
      var songLink = trackList[i].track.track_share_url;
      var artist = trackList[i].track.artist_name;
      $('.buttonOne').hide();
      $('#bandInput').hide();
      $('.artist').append(" " + artist);
      if (bandInput == "") {
        alert("Oops!  Please enter a valid band name.")
      }
      $.get("https://galvanize-cors-proxy.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=" + lyricID + "&apikey=c9cf420cde3c6f076d884df06df9c0cc")
        .then(function(data) {
          var obj = JSON.parse(data);
          var lyricsReturn = obj.message.body.lyrics["lyrics_body"];
          console.log("hello 1")
          if (lyricsReturn.length == 0) {
            console.log("hello 2")
            alert("No lyrics available! Possible reasons include \n \n 1) The track retrieved contains no lyrics (instrumental)  \n 2) We do not have permission to to display lyrics by this artist \n \n Please either resubmit your artist or try a new artist");
            $('.buttonOne').show();
            $('#bandInput').show();
            console.log("hello 3")
            console.log(location.reload)
            location.reload();
          } else if (lyricsReturn.length >= 5) {
            $('.guessTrack').show();
            $('.twelveMore').show()
          }
          twelveWords = lyricsReturn.split(/\s+/).slice(0, 12).join(" ");
          twelveMoreWords = lyricsReturn.split(/\s+/).slice(12, 24).join(" ");
          trackName = (trackList[i].track.track_name);
          lyricsResults = $('.populate').html(twelveWords)
          $(".songLink").click(function() {
            window.open("" + songLink + "".href, '_blank');
            win.focus();
          })
        })
    })
})

// Add 12 more words to additonal results
$(".twelveMore").click(function() {
  $('.populate').append(" " + twelveMoreWords);
  $('.twelveMore').hide();
  $(this).hide();
})

// Guess song title

$(".buttonTwo").click(function(event) {
  event.preventDefault()
  $.get("https://galvanize-cors-proxy.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_artist=" + bandInput + "&apikey=c9cf420cde3c6f076d884df06df9c0cc")
    .then(function(data) {
      var obj = JSON.parse(data);
      var trackList = obj.message.body.track_list;
      var lyricID = trackList[i].track.track_id;
      var trackNames = (trackList[i].track.track_name);
      var trackName = trackNames.toLowerCase();
      var guess = $('#trackGuess').val();
      var guessed = guess.toLowerCase();
      var songLink = trackList[i].track.track_share_url;
      console.log(songLink);
      if (trackName.includes(guessed) && guessed.length > 2) {
        $('.success').show();
        $('.subReset').hide();
        $('.successHide').hide();
        $('.fail').hide();
      } else if (guessed == trackName) {
        $('.success').show();
        $('.subReset').hide();
        $('.successHide').hide();
        $('.fail').hide();
      } else if (guessed !== trackName && guessed.length >= 1) {
        $('.fail').show();
        $('.failHide').hide();
        $('.success').hide();
      }
    })
})

$(".songLink").click(function() {
  window.open("" + songLink + "".href, '_blank');
  win.focus();
})

$(".reload").click(function(event) {
  event.preventDefault();
  location.reload();
})

$(".buttonTwo").click(function(event) {
  event.preventDefault();
  $('.giveUp').hide();
})



// $(document).ready(function() {
//   $('.button').hide(0); //or do it through css
//   $('a.tab1').click(function() {
//     $('.button').show();
//
//   });
//
//   //otherTab is the class for the tabs other than tab1
//   $('a.otherTab').click(function() {
//     $('.button').hide();
//   });

// });

//   .then(function(data) {
//     for (var i = 0; i < data.length; i++) {
//       $('.drop-down').append(`<option value="${data[i].title}">${data[i].title}</option>`);
//       console.log(data)
//     }
//     $("select").on("change", function(event) {
//       console.log(event.target.value)
//       console.log(data)
//       for (var i = 0; i < data.length; i++) {
//         console.log(data[i])
//         if (event.target.value == data[i].title) {
//           $('.role-preview').attr("src", data[i].img)
//         }
//       }
//     })
//   })
// $('.role-preview').attr("src", data[i].img)
// }
// }
// })
// })

$('.guessTrack').hide()
$('.fail').hide()
$('.success').hide()
$('.twelveMore').hide()
$('.songLink2').hide()


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
      if ((bandInput == "") || (bandInput == " ") || (bandInput == "  ") || (bandInput == "   ") || (bandInput == "    ") || (bandInput == "     ") || (bandInput == "      ")) {
        alert("Oops!  Please enter a valid band name.");
        location.reload();
      }
      $.get("https://galvanize-cors-proxy.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=" + lyricID + "&apikey=c9cf420cde3c6f076d884df06df9c0cc")
        .then(function(data) {
          var obj = JSON.parse(data);
          if (obj.message.header.status_code == "404") {
            alert("Artist not found! \n\n Please check the spelling of the artist and try again.  \n\n If the spelling is correct, the selected artist does not currently have lyrics available in the MusixMatch lyrics database.");
            location.reload();
          }
          var lyricsReturn = obj.message.body.lyrics["lyrics_body"];
          if (lyricsReturn.length < 10) {
            alert("No lyrics available! Possible reasons include \n \n 1) The track retrieved contains no lyrics (instrumental)  \n 2) We do not have permission to to display lyrics by this artist \n \n Please either resubmit your artist or try a new artist");
            $('.buttonOne').show();
            $('#bandInput').show();
            location.reload();
          } else if (lyricsReturn.length >= 5) {
            $('.guessTrack').show();
            $('.twelveMore').show();
            $('.buttonNewTrack').show()
          }
          twelveWords = lyricsReturn.split(/\s+/).slice(0, 12).join(" ");
          twelveMoreWords = lyricsReturn.split(/\s+/).slice(12, 24).join(" ");
          trackName = (trackList[i].track.track_name);
          lyricsResults = $('.populate').html(twelveWords);
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

//New Track buttonTwo

$(".buttonNewTrack").click(function(event) {
  event.preventDefault()
  bandInput = decodeURIComponent($("#bandInput").val());
  $.get("https://galvanize-cors-proxy.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_artist=" + bandInput + "&apikey=c9cf420cde3c6f076d884df06df9c0cc")
    .then(function(data) {
      var obj = JSON.parse(data);
      var trackList = obj.message.body.track_list;
      i = Math.floor(Math.random() * trackList.length);
      var lyricID = trackList[i].track.track_id;
      var songLink2 = trackList[i].track.track_share_url;
      $('.songLink2').show();
      $('.songLink').hide();
      $('.buttonNewTrack').hide();
      var artist = trackList[i].track.artist_name;
      $.get("https://galvanize-cors-proxy.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=" + lyricID + "&apikey=c9cf420cde3c6f076d884df06df9c0cc")
        .then(function(data) {
          var obj = JSON.parse(data);
          var lyricsReturn = obj.message.body.lyrics["lyrics_body"];
          if (lyricsReturn.length < 10) {
            alert("No lyrics available! Possible reasons include \n \n 1) The track retrieved contains no lyrics (instrumental)  \n 2) We do not have permission to to display lyrics by this artist \n \n Please either resubmit your artist or try a new artist");
            $('#bandInput').show();
            location.reload();
          } else if (lyricsReturn.length >= 5) {
            $('.guessTrack').show();
            $('.twelveMore').show();
            $('.buttonTwo').show()
          }
          twelveWords = lyricsReturn.split(/\s+/).slice(0, 12).join(" ");
          twelveMoreWords = lyricsReturn.split(/\s+/).slice(12, 24).join(" ");
          trackName = (trackList[i].track.track_name);
          lyricsResults = $('.populate').html(twelveWords)
          $(".songLink2").click(function() {
            window.open("" + songLink2 + "".href, '_blank');
            win.focus();
          })
        })
    })
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
      if (trackName.includes(guessed) && guessed.length > 2) {
        $('.success').show();
        $('.subReset').hide();
        $('.successHide').hide();
        $('.fail').hide();
        $('html,body').animate({
            scrollTop: $(".successGif").offset().top
          },
          'slow');
      } else if (guessed == trackName) {
        $('.success').show();
        $('.subReset').hide();
        $('.successHide').hide();
        $('.fail').hide();
        $('html,body').animate({
            scrollTop: $(".successGif").offset().top
          },
          'slow');
      } else if (guessed !== trackName && guessed.length >= 1) {
        $('.fail').show();
        $('.failHide').hide();
        $('.success').hide();
        $('html,body').animate({
            scrollTop: $(".failGif").offset().top
          },
          'slow');
      }
    })
})

$(".reload").click(function(event) {
  event.preventDefault();
  location.reload();
})

$(".buttonTwo").click(function(event) {
  event.preventDefault();
  $('.giveUp').hide();
})

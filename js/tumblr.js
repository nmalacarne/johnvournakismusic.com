(function ($) {
  $.ajax({
    url: 'https://api.tumblr.com/v2/blog/johnvournakis.tumblr.com/posts'
  , dataType: 'jsonp'
  , data: {
    api_key: 'YdiLRgT6yBypToGc4IN5oohbUWegmjwNL5hlTLdcfBhrMCiIR9'
    }
  , success: function (results) {
      results.response.posts.forEach(createTemplate);
    }
  });

  function createTemplate(post) {
    var template = document.querySelector('.' + post.type + 'Post');

    switch(post.type) {
      case 'text':
        createTextPost(template, post);
        break;
      case 'photo':
        createPhotoPost(template, post);
        break;
      case 'quote':
        createQuotePost(template, post);
        break;
      case 'link':
        createLinkPost(template, post);
        break;
      case 'chat':
        createChatPost(template, post);
        break;
      case 'audio':
        createAudioPost(template, post);
        break;
      case 'video':
        createVideoPost(template, post);
        break;
      case 'answer':
        createAnswerPost(template, post);
        break;
      default:
        console.log('post.type not found.');
        break;
    }

    if (template) render(template);
  }

  /**
  * https://www.tumblr.com/docs/en/api/v2#text-posts
  * title	String	The optional title of the post
  * body	String	The full post body
  */
  function createTextPost(template, post) {
    template.content.querySelector('.postTitle').innerHTML = post.title || 'Post Title';
    template.content.querySelector('.postBody').innerHTML = post.body;
  }

  /**
  * https://www.tumblr.com/docs/en/api/v2#photo-posts
  * photos	Array	Photo objects with properties:
  *   caption	  String	User supplied caption for the individual photo (Photosets only)
  *   alt_sizes	Array   Alternate photo sizes, each with:
  *     width	  Number	Width of the photo, in pixels
  *     height	Number	Height of the photo, in pixels
  *     url		  String	Location of the photo file (either a JPG, GIF, or PNG)
  * caption	String	The user-supplied caption
  * width	  Number	The width of the photo or photoset
  * height	Number	The height of the photo or photoset
  */
  function createPhotoPost(template, post) {
    template.content.querySelector('.postCaption').innerHTML = post.caption;
    post.photos.forEach(function (photo) {
      template.content.querySelector('.postPhotos').innerHTML = '<img src="' + photo.original_size.url + '">';
    });
  }

  /**
  * https://www.tumblr.com/docs/en/api/v2#quote-posts
  * text		String	The text of the quote (can be modified by the user when posting)
  * source	String	Full HTML for the source of the quote
  */
  function createQuotePost(template, post) {
    template.content.querySelector('.postText').innerHTML = post.text;
    template.content.querySelector('.postSource').innerHTML = post.source;
  }

  /**
  * https://www.tumblr.com/docs/en/api/v2#link-posts
  * title       String	The title of the page the link points to
  * url         String	The link
  * author		  String	The author of the article the link points to
  * excerpt		  String	An excerpt from the article the link points to
  * publisher	  String	The publisher of the article the link points to
  * description	String	A user-supplied description
  * photos		  Array	  Photo objects with properties:
  *   caption		    String The thumbnail caption
  *   original_size	Object The photo at its original size
  *   width			    Number Width of the image, in pixels
  *   height			  Number Height of the image, in pixels
  *   url 			    String Location of the image file (either a JPG, GIF, or PNG)
  *   alt_sizes 		Array  Alternate photo sizes, each with the same properties as above.
  */
  function createLinkPost(template, post) {
    template.content.querySelector('.postTitle').innerHTML = post.title;
    template.content.querySelector('.postDescription').innerHTML = post.description;
  }

  /**
  * https://www.tumblr.com/docs/en/api/v2#chat-posts
  * title	    String	The optional title of the post
  * body		  String	The full chat body
  * dialogue	Array	  Array of objects with the following properties:
  *   name	  String Name of the speaker
  *   label   String Label of the speaker
  *   phrase  String Text
  */
  function createChatPost(template, post) {
    template.content.querySelector('.postTitle').innerHTML = post.title;
    template.content.querySelector('.postBody').innerHTML = post.body;
  }

  /**
  * https://www.tumblr.com/docs/en/api/v2#audio-posts
  * caption       String	The user-supplied caption
  * player        String	HTML for embedding the audio player
  * plays         Number	Number of times the audio post has been played
  * album_art     String	Location of the audio file's ID3 album art image
  * artist        String	The audio file's ID3 artist value
  * album         String	The audio file's ID3 album value
  * track_name    String	The audio file's ID3 title value
  * track_number	Number	The audio file's ID3 track value
  * year			    Number	The audio file's ID3 year value
  */
  function createAudioPost(template, post) {
    template.content.querySelector('.postCaption').innerHTML = post.caption;
    template.content.querySelector('.postPlayer').innerHTML = post.player;
  }

  /**
  * https://www.tumblr.com/docs/en/api/v2#video-posts
  * caption	String	The user-supplied caption
  * player	Array of embed objects Object fields within the array:
  *   width		   Number Width of video player, in pixels
  *   embed_code String HTML for embedding the video player
  */
  function createVideoPost(template, post) {
    template.content.querySelector('.postCaption').innerHTML = post.caption;
    post.player.forEach(function (video) {
      template.content.querySelector('.postPlayer').innerHTML += video.embed_code;
    });
  }

  /**
  * https://www.tumblr.com/docs/en/api/v2#answer-posts
  * asking_name	String	The blog name of the user asking the question
  * asking_url	String	The blog URL of the user asking the question
  * question		String	The question being asked
  * answer		  String	The answer given
  */
  function createAnswerPost(template, post) {
    template.content.querySelector('.postQuestion').innerHTML = post.question;
    template.content.querySelector('.postAnswer').innerHTML = post.answer;
  }

  /**
   * Insert a template into 'body' of DOM
   */
  function render(template) {
    var clone = document.importNode(template.content, true);
    document.body.appendChild(clone);
  }
})(jQuery);

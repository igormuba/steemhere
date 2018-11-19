function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function setCookie(access_token, exdays){
	var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
	var access_token_cookies="access_token_cookies="+access_token+";" + expires + ";path=/";
	document.cookie=access_token_cookies;
}

function getCookie(cookie) {
    var name = cookie + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}



var access_token=getUrlVars()["access_token"];
if (access_token!="" && access_token!=null){
	setCookie(access_token, 7);
}

var access_token_in_cookies = getCookie("access_token_cookies");
console.log("fromcookies is" + access_token_in_cookies);



var api = sc2.Initialize({
    app: 'steemhere',
    callbackURL: 'http://localhost',
    accessToken: access_token_in_cookies,
    scope: ['vote', 'comment']
});

api.me(function(err, res) {
    console.log(err, res);
    if (!err) {
          document.getElementById("username").innerHTML = res.user;
          document.getElementById("picture").src = "https://steemitimages.com/u/"+res.user+"/avatar";
        }
});

function submitPost(){
  var allTags = document.getElementById("tags").value;

  allTags = allTags.split(" ");


  var parentPermlink=allTags[0];
  var author=document.getElementById("username").innerHTML;
  console.log("username"+author);
  var title=document.getElementById("title").value;
  console.log("title"+title);
  var permlink=title.replace(/ /g, "-");
  console.log("permlink"+permlink);
  var body=document.getElementById("content").value;
  console.log("body"+body);


  var tagsMetadata='{"tags":[';
  for (var i = 0; i<allTags.length; i++){
    tagsMetadata+='"'+allTags[i]+'"';
    if (i+1<allTags.length){
      tagsMetadata+=",";
    }
  }
  tagsMetadata+="]}";
  console.log("tagsmetadata"+tagsMetadata);
  var jsonMetadata=JSON.parse(tagsMetadata);
  console.log("jsonmetadata"+jsonMetadata);

  api.comment("", parentPermlink, author, permlink, title, body, jsonMetadata, function (err, res) {
  console.log(err, res)


});
}

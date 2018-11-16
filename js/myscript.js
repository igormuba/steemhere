var api = sc2.Initialize({
  app: 'steemhere',
  callbackURL: 'http://localhost',
  accessToken: 'access_token',
  scope: ['vote', 'comment']
});

var link = api.getLoginURL();
console.log(link)

api.me(function (err, res) {
  console.log(err, res)
});

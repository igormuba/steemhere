var api = sc2.Initialize({
    app: 'steemhere',
    callbackURL: 'http://localhost:8080',
    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYXBwIiwicHJveHkiOiJzdGVlbWhlcmUiLCJ1c2VyIjoibWFhcmdhcml0YSIsInNjb3BlIjpbInZvdGUiLCJjb21tZW50Il0sImlhdCI6MTU0MjM4MzUwNiwiZXhwIjoxNTQyOTg4MzA2fQ.tCQ5qmZ1OPpI1eNxhPQ7GMjV8mbXo-MYwWv_c0rgJKw',
    scope: ['vote', 'comment']
});

var link = api.getLoginURL();
console.log('link', link);

api.me(function(err, res) {
    console.log(err, res);
});
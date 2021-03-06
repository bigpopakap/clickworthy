var request = require('request');
var ytConverter = require('./ytconverter.js');

var API_URL = 'https://www.googleapis.com/youtube/v3/videos'
                + '?part=snippet'
                + '&chart=mostPopular'
                + '&type=video'
                + '&regionCode=US' //TODO don't hardcode US
                                    //see https://github.com/bluesmoon/node-geoip
                + '&key=' + process.env.YOUTUBE_API_KEY;

/*
 * callback(err, [vids...])
 *  where each vid has the format in ytconverter.js
 */
function getTrending(callback) {
    request(API_URL, function(err, resp, body) {
        if (err) {
            callback(err);
            return;
        }

        body = body && JSON.parse(body);
        var vids = body && body.items
                && body.items.map(ytConverter.fromTrendingSnippet);
        callback(err, vids || []);
    });
}

module.exports = {
    trending: getTrending
}
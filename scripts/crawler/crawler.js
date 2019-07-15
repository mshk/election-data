const client = require('cheerio-httpcli');

class Crawler {

  static parseLinks($, candidate) {
    $('a').each(function (idx) {
      let url = $(this).url();
      switch (true) {
        case /facebook\.com\/.+/.test(url):
          if (!/facebook\.com\/sharer/.test(url))
            candidate.facebook_url = url;
          break;
        case /twitter\.com\/.+/.test(url):
          if (!/twitter\.com\/share/.test(url) && !/twitter\.com\/intent/.test(url) && !/twitter\.com\/search/.test(url) && !/twitter\.com\/.+\/status/.test(url)) {
            if (!candidate.twitter_url)
              candidate.twitter_url = url.replace('@', '');
          }
          break;
        case /instagram\.com\/.+/.test(url):
          candidate.instagram_url = url;
          break;
        case /youtube\.com\/.+/.test(url):
          candidate.youtube_url = url;
          break;
        case /plus\.google\.com\/.+/.test(url):
          if (!/plus\.google\.com\/share/.test(url))
            candidate.googleplus_url = url;
          break;
      }
    });
  }

  static parseMeta($, candidate) {
    $('meta').each(function (idx) {
      switch (true) {
        case /twitter:site/.test($(this).attr('name')):
          candidate.twitter_url = 'https://twitter.com/' + $(this).attr('content').replace('@', '');
          break;
        case /og:description/.test($(this).attr('property')):
          if (!candidate.homepage_description)
            candidate.homepage_description = $(this).attr('content');
          break;
        case /description/.test($(this).attr('name')):
          if (!candidate.homepage_description)
            candidate.homepage_description = $(this).attr('content');
          break;
      }
    });
  }

  static fetchHomePage(url, delay) {
    return new Promise((resolve, error) => {
      setTimeout(() => {
        console.error("fetching: " + url);
        const candidate = {};

        client.fetch(encodeURI(url))
          .then((result) => {
            if (result.err) {
              console.error("fetch url error: ", url);
              candidate.error = true;
              return resolve(candidate)
            }

            Crawler.parseMeta(result.$, candidate)

            Crawler.parseLinks(result.$, candidate)

            resolve(candidate)
          })
          .catch((error) => {
            console.error("client.fetch error: ", error)
            resolve(candidate)
          });
      }, delay);
    });
  }
}

module.exports = Crawler;
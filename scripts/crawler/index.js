#!/usr/bin/env node

const program = require('commander');

const urls = require('./urls');
const Crawler = require('./crawler');

program
  .version('1.0.0')
  .option('-d, --debug', 'output extra debugging');

program
  .command('candidate-sns')
  .description('run setup commands for all envs')
  .action((env, options) => {
    const promises = urls
      .map((u, i) => {
        if (!u) {
          return new Promise((resolve) => resolve({}));
        }

        return Crawler.fetchHomePage(u, i * 300);
      });

    Promise.all(promises).then((result) => {
      result.forEach((i) => {
        console.log(`${i.twitter_url || ""}, ${i.facebook_url || ""}, ${i.youtube_url || ""}, ${i.instagram_url || ""}`);
      });
    });
  });
  
program.parse(process.argv);

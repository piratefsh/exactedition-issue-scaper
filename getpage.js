// to download failed pages from page issue

var casper = require('casper').create();
var utils = require('utils');

// page labels and prefix
// page labels should be prefix: page number map, where prefix is used in naming the pdf:
// <issue title>-<prefix>-<page label number>.pdf
var pageLabels = [];
var pagePrefix = {};

// link to issue
var issueUrl = ''

// your username and password
var username = '';
var password = '';

// get pages while there is next
var getPage = function(page){
    var prefix = pagePrefix[page] || "";

    // log page number
    casper.echo('Fetching page ' + page);

    // go to page
    var tokens = issueUrl.split('-');
    // issue ID is last token
    var issueId = tokens[tokens.length -1];
    var pageLink = 'http://www.exacteditions.com/browsePages.do?issue=' + issueId + '&size=2&pageLabel=' + page;
    casper.echo('Page: ' + pageLink);

    casper.open(pageLink);

    casper.then(function(){
        // get pdf link
        var pdfLink = casper.getElementsAttribute('.pdfLinks a', 'href');

        // download pdf of that page
        var title = casper.getHTML('.issueTitle');
        var dir =  'downloads/' + title + '/';
        casper.download(pdfLink, dir + title + '-' + prefix + '-' + page + '.pdf')
    })
}

// login
casper.start('https://login.exacteditions.com/login.do', function(){
    // get cli arguments for username, password and link to issue
    if(casper.cli.has('username') && casper.cli.has('password') && casper.cli.has('pages') && casper.cli.args){
        username = casper.cli.get('username');
        password = casper.cli.get('password');
        issueUrl = casper.cli.args[0];

        var pagesArgs = casper.cli.get('pages');
        var pagePrefixPairs = pagesArgs.split(',');

        // parse page numbers and prefixes
        for(var i = 0; i < pagePrefixPairs.length; i++){
            var pair = pagePrefixPairs[i].split(':');
            pageLabels.push(pair[0]);

            if(pair[1]){
                pagePrefix[pair[0]] = pair[1];
            }
        }
    }
    else {
        this.die('Usage: casperjs getissue.js --username=<your EE username> --password=<your EE password> --pages=<page 1>:<prefix 1>,<page 2>:<prefix 2> <issue_link>');
    }

    this.fill('form#loginForm', {
        username: username,
        password: password,
    });

    this.click('input[type=submit]');
    this.echo('Logging in...')
});

// get each page
casper.then(function(){
    casper.each(pageLabels, function(self, page){
        self.then(function(){
            getPage(page);
        });
    });
})

casper.run();
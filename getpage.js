// to download failed pages from page issue
// page labels should be prefix: page number map, where prefix is used in naming the pdf:
// <issue title>-<prefix>-<page label number>.pdf

var casper = require('casper').create();
var utils = require('utils');

// example page labels and prefix
var pageLabels = ['9'];
var pagePrefix = {
    '9' : '06'
};

// link to issue
var issueUrl = ''

// change to your username and password
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
    // validate links and username
    if(pageLabels.length < 1 || issueUrl.length < 1
        || username.length < 1 || password.length < 1){
        this.die('Usage: casperjs getissue.js --username=<your EE username> --password=<your EE password> <issue_link_1>...<issue_link_n>');
    }

    this.fill('form#loginForm', {
        username: username,
        password: password,
    });

    this.click('input[type=submit]');
    this.echo('Logging in...')
});

// go to each issue
casper.each(pageLabels, function(self, page){
    self.then(function(){
        getPage(page);
    });
});

casper.run();
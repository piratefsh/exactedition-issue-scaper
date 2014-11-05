// downloads pdf pages for an issue on Exact Editions. pages saved in format:
// <issue title>-<prefix>-<page label number>.pdf


var casper = require('casper').create();
var utils = require('utils');
var pageCounter = 0;
var issueCounter = 2;

// links to issue to download (right-click on issue, get url), usually in format
// http://www.exacteditions.com/read/<magazine>/<issue-title>   
var links = [];

// change to your username and password
var username = 'your username';
var password = 'your password';

// get pages while there is next
var getPage = function(){
    // log page number
    var pageNum = casper.getElementsAttribute('input[name=pageLabel]', 'value')[0];
    casper.echo('Fetching page ' + pageNum);
    
    // get pdf link
    var pdfLink = casper.getElementsAttribute('.pdfLinks a', 'href');

    // download pdf of that page
    var title = casper.getHTML('.issueTitle');
    casper.download(pdfLink, 'downloads/' + title + '-' + ++pageCounter + '-' + pageNum + '.pdf')

    // if has next page, go there and repeat
    if(casper.exists('a.nextPage')){
        casper.click('a.nextPage');
        casper.then(getPage);
    }
}

var goToIssue = function(link){
    // get to nth issue
    casper.echo('Issue ' + link);
    casper.open(link);
    
    // go to cover and start download
    casper.then(function(){
        this.click('div.cover a');
    })

    casper.then(function(){
        getPage();
    });
}

// login
casper.start('https://login.exacteditions.com/login.do', function(){
    // validate links and username
    if(links.length < 1){
        this.die('Please add at least one link an issue');
    }

    if(username == 'username' || username.length < 1){
        this.die('Please enter your own username and password');
    }

    this.fill('form#loginForm', {
        username: username,
        password: password,
    });

    this.click('input[type=submit]');
    this.echo('Logging in...')
});

// go to each issue
casper.each(links, function(self, link){
    self.then(function(){
        goToIssue(link);
    });
});

casper.run();
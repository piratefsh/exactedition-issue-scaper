// downloads pdf pages for an issue on Exact Editions. pages saved in format:
// <issue title>-<prefix>-<page label number>.pdf

var sprintf = require('sprint').sprint;

var links = [];

var username = '';
var password = '';

// requirements and vars
var casper = require('casper').create();
var pageCounter = 0;


// get pages while there is next
var getPage = function(){
    // log page number
    var pageNum = casper.getElementsAttribute('input[name=pageLabel]', 'value')[0];
    casper.echo('Fetching page ' + pageNum);
    
    // get pdf link
    var pdfLink = casper.getElementsAttribute('.pdfLinks a', 'href');

    // download pdf of that page
    var title = casper.getHTML('.issueTitle');
    var dir =  'downloads/' + title + '/';
    var c = ++pageCounter;
    var filename = sprintf('%s%s-%03d-%s.pdf', dir, title, c, ''+pageNum);
    casper.download(pdfLink, filename)

    // if has next page, go there and repeat
    if(casper.exists('a.nextPage')){
        casper.click('a.nextPage');
        casper.then(getPage);
    }
}

var goToIssue = function(link){
    pageCounter = 0;

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
    // get cli args
    links.push.apply(links, casper.cli.args);

    //credentials
    if(casper.cli.has('username') && casper.cli.has('password')){
        username = casper.cli.get('username')
        password = casper.cli.get('password')
    }
    else{
        this.die('Usage: casperjs getissue.js --username=<your EE username> --password=<your EE password> <issue_link_1>...<issue_link_n>');
    }

    if(links.length < 1){
        this.die('Please add at least one link to an issue');
    }

    this.fill('form#loginForm', {
        username: username,
        password: password,
    });

    this.click('input[type=submit]');
    this.echo('Logging in...')
});

casper.then(function(){
    // go to each issue
    casper.each(links, function(self, link){
        self.then(function(){
            goToIssue(link);
        });
    });
});

casper.run();
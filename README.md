# Exact Editions Issue Pages Scraper

Simple scraper to download pdf pages from [Exact Editions](https://www.exacteditions.com) magazines. Using CasperJS and PhantomJs. Only usable with a subscription.

Please only use if you have a subscription to an existing magazine and do not use to scrape for distribution. Respect intellectual property -- writers and artists gotta make a living too :)

Please read Exact Edition's [terms of service](https://www.exacteditions.com/help.do?subject=102706) if in doubt.

## Installation
### Dependencies
* CasperJS - [site](http://casperjs.org/)
* PhantomJS - [site](http://phantomjs.org/)

### Npm
To install dependencies
```
npm install
```

## Usage
###Fetch all pages of one issue
Clone this repo. Cd to the folder.

Then run in terminal

```
casperjs getissue.js --username=<your EE username> --password=<your EE password> <issue_link_1>...<issue_link_n>

```

###Fetch specific pages of one issue
Usually when a few pages from getissue.js fails.

Open getpage.js

Set options.

```javascript
// page prefix is used in file naming: 
// <issue title>-<prefix>-<page label number>.pdf
// In the case below, the downloaded file name will be Issue-A-11.pdf

// example page labels and prefix
var pageLabels = ['11', '19'];
var pagePrefix = {
    '11' : 'A',
    '19' : 'B',
};

// link to issue
// http://www.exacteditions.com/read/<magazine>/<issue-title>   
var issueUrl = 'http://www.exacteditions.com/read/popshot/the-journeys-issue-38709'

```


Then run in terminal

```
casperjs getpage.js --username=<your EE username> --password=<your EE password>
```

Files will be downloaded to 'download' child directory


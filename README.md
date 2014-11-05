# Exact Editions Issue Pages Scraper

Simple scraper to download pdf pages from Exact Editions magazines. Using CasperJS and PhantomJs. Only usable with a subscription.

## Requirements
CasperJS - [site](http://casperjs.org/)

To install dependencies
```
npm install
```

## Usage
###Fetch all pages of one issue
Clone this repo. Cd to the folder.

Open getissue.js. Set your links, username and password. Command line options coming soon (maybe).

```javascript
// links to issue to download (right-click on issue, get url), usually in format
// http://www.exacteditions.com/read/<magazine>/<issue-title>   
var links = [];

// change to your username and password
var username = '';
var password = '';
```

Then run in terminal

```
casperjs getissue.js
```

###Fetch specific pages of one issue
Usually when a few pages from getissue.js fails.

Open getpage.js

Set options.

```javascript
// example page labels and prefix
// page prefix is used in file naming: 
// <issue title>-<prefix>-<page label number>.pdf
// In the case below filename will be Issue-A-11.pdf

var pageLabels = ['11', '19'];
var pagePrefix = {
    '11' : 'A',
    '19' : 'B',
};

// link to issue
var issueUrl = ''

// change to your username and password
var username = '';
var password = '';
```


Then run in terminal

```
casperjs getpage.js
```


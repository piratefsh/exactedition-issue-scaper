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

Run in terminal

```
casperjs getissue.js --username=<your EE username> --password=<your EE password> --pages=<page 1>:<prefix 1>,<page 2>:<prefix 2> <issue_link>

```

Note that prefix is used in the following way for file naming (to be consistent with getissue.ja named files:
`<issue title>-<prefix>-<page label number>.pdf`

For example:

```
casperjs getpage.js --username=name@example.com --password=example --pages=OFC:001,11:ABC http://www.exacteditions.com/read/popshot/the-time-issue-40247

```

Will download the following
* The Time Issue-001-OFC.pdf
* The Time Issue-ABC-11.pdf

Files will be downloaded to 'download' child directory

## Compiling to one PDF
Used [PDFTK](https://www.pdflabs.com/tools/pdftk-the-pdf-toolkit/) on command line for this. You will have to install it.

```
pdftk *.pdf cat output output.pdf
```


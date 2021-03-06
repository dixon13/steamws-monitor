# Steam Workshop Monitor

[![license](https://img.shields.io/badge/license-GPL%20v3-blue.svg)](https://github.com/dixon13/steamws-monitor/blob/master/LICENSE)

An application that monitors steam workshop files for updates and helps you manage them.

This application is not compatible with MacOS and does not intend on working with MacOS, as most server administrators will be using this on their servers running debian/ubuntu based distributions and Windows 7 and above, and Windows Server 2012 and above

![alt text](https://github.com/dixon13/steamws-monitor/blob/master/front-pic.PNG "What it looks like")

## Contribute
Clone this repository

### Requirements
[Node.js](https://nodejs.org/en/download/) ([npm](http://npmjs.com) is installed with Node.js)

```
# Install dependencies
npm install
# Start app
npm start
```

## Important Development Info
**There is hot reloading but it's not fully functionaly with the redux store so the redux store may not keep it's state.**

If you make changes in the main process, you need to restart the app.

Learn more about Electron and its API in the [documentation](http://electron.atom.io/docs/latest).

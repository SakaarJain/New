# Website Heart Monitoring Tool

## Table of Contents

1. [Application Summary](#application-summary)
2. [Blueprints & Code Packages](#Blueprints-&-Code-Pacakages)
3. [Installation](#Installation)
4. [Configuration](#Configuration)
    * [Authentication](#Authentication)
    * [Heroku App URLs](#Heroku-Configuration)
    * [Coding Standards](#coding-standards)
    * [Folder Structure](#Folder-Structure)
5. [Additional Functionality](#Important-Features)
6. [Testing](#Testing)
7. [Notes](#Notes)
8. [Changelog](#changelog)

<a name="application-summary"></a>
## Application_Summary

**Application Name:** Website Heart Monitoring Tool

**Prefix (short name):** BUIT_EUCAN

**Therapy Area:** NA

**Service Now Software Installation CI:**

**Application Description:**

* * *

<a name="Blueprints-&-Code-Pacakages"></a>
## Blueprint and Code Packages

**Blueprint:** Web Application

    Development Language(s): JavaScript, HTML5, CSS3
    Development Framework(s): Express JS on Node JS
    Development Add-Ons: Redis, PaperTrail, New Relic, Postgres
    Development Standards:  esLint
    Content Management System: NA
    Analytics: NA
    Tag Management Tool: NA
    Customer Authentication: NA

**Code Package(s):**

    CIRR_WEB_ACCELERATOR v3.3.0

* * *

<a name="Installation"></a>
## Installation:

    1. Clone the repository by command 'git clone https://github.com/EliLillyCo/BUIT_EUCAN_WEB_HEART_MONITORING_TOOL.git'

    2. Install node in your local system, if not already installed.

    3. Rename .env-sample file with .env

    4. Update .env file with the desired environment variables.

    5. Run the application by command 'npm start'

<a name="Authentication"></a>

This accelerator includes Cirrus' authentication module. Please follow the web accelerator quick start guide for authentication [here.](https://github.com/EliLillyCo/CIRR_AUTH_MODULE/blob/master/README.md#web-accelerator-quick-start)

* * *

<a name="Heroku-Configuration"></a>
### Heroku App URLs

    Heroku App Dev URL: buit-eucan-whmt-tool-node-dev.herokuapp.com


* * *

<a name="coding-standards"></a>
### Coding Standards:

1. Make sure you have Eslint downloaded and installed on your IDE.
    1. Atom: [Linter](https://atom.io/packages/linter), [ESLint](https://atom.io/packages/linter-eslint)
    2. Sublime: [Linter](https://packagecontrol.io/packages/SublimeLinter), [ESlint](https://packagecontrol.io/packages/SublimeLinter-contrib-eslint)
    3. Other IDE's: [Linter](http://eslint.org)
2. Make sure you have EditorConfig downloaded and installed on your IDE:
    1. Atom: [EditorConfig](https://github.com/sindresorhus/atom-editorconfig#readme)
    2. Sublime: [EditorConfig](https://github.com/sindresorhus/editorconfig-sublime#readme)
    3. Other IDE's: [EditorConfig](http://editorconfig.org)

This project uses ESlint for JavaScript Coding Standards. The AirBnb Style Guide is used for this project. Please ensure that all code passes the coding checks before pushing code. Run `npm run lint` to find out if your code has passed or not.

This project also uses [EditorConfig](http://editorconfig.org) to set up our coding style across IDE's.

* * *

<a name="Folder-Structure"></a>
#### Folder Structure:

**-bin** :: This folder contains the file which starts the node server [DO NOT CHANGE THIS FILE]

**-lib** :: This folder contains the transpiled code from the src folder. [DO NOT CHANGE ANYTHING FROM THIS FOLDER]

**-src** :: This folder contains all the server controllers, server routes and front end files as well

**--server-controllers** :: This file contains all the server side controllers [TRY AND MAKE MODULAR CODE ]

**--public** :: This folder contains all the front end scss javascript and images

**---scss** :: SASS files

**---img** :: All Images

**---vendor** :: All 3rd party styles and scripts

**---client-controllers** :: All Client-Side JavaScript files. Browserify is ran on these files so you are able to write modularcode

**--routes** :: All the Express Routes belong in this file

**-tests** :: Contains the mocha test script and codecheck file

**-views** :: Contains all the handlebars views

* * *

<a name="Important-Features"></a>
## Additional Functionality

Application does not deliver any additional functionality beyond Osiris approved standard requirements. Validation activities covered within change request.

* * *

<a name="Testing"></a>
## Testing

Application follows Osiris testing standards as documented by the Osiris Quality approach. This includes the following:

**Heroku CI**

* esLint compliance
* Checkmarx security compliance

**Code Review**
* Code review by the Osiris support team

**Checklists**
* LillyWeb IT Checklists

* * *

<a name="Notes"></a>
## Note(s):

* * *

<a name="changelog"></a>
**Change Log**

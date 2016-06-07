# Welcome to this simple project
This project is based on React + TypeScript + Socket.io + Less  
It contains
- a little chat (using socket.io)  
- a small carousel (using http://lorempixel.com/)
- and some simple settings

It is cross browser, mobile friendly and use HTML 5 / CSS 3 as much as possible.

# What could be better...
Currently the code is not localized. Everything is hard-coded in English.  
This is OK for this little project but obviously not production ready...

The code isn't unit tested as well. Another no-go for production.  
If later on I would have to implement unit test, I would use Jest (https://facebook.github.io/jest/)  
the reason for this choice is simple. The project is made in React which is made by Facebook, Jest as well is made by Facebook.  It is defacto the more accurate unit testing framework.  
Some tutorials are available on their website: https://facebook.github.io/jest/docs/tutorial-react.html

Last improvement would be to have a better sharing across less files, this way we could ensure the user experience remain consistent across the whole application.

# How to run it
First, you have to clone it.  
Then, from project directory:
- install everything: `npm intall`
- start the server: `npm run start`
- open a browser an go to http://localhost:3000

# npm scripts, to make it easier
The project comes with some handy npm script.  
You can run then from a command line (from the project directory):
- bundle the app on any file change (client): `npm run dev-client`
- bundle the app on any file change (server): `npm run dev-server`
- to release (bundle) the app: `npm run release`
- to bundle the app and start the server: `npm run start`
- to clean the release folders: `npm run clean`

# Configuration files
## gruntfile.js
this defines all grunt tasks. These tasks are helpful at development time, and at release time.  

## package.json
This defines the core of the application: all dependencies, all script, the license, the author and much more  

## tsconfig.json
this defines how TypeScript will do his job.  
When using Atom editor with Typescript plugin the "files" section is dynamic. !!Do not change.!! Instead update "filesGlob"  

## tslint.json
this defines how the linter will behave when analyzing your code (typescript / jsx)  

## typings.json
this defines which typings are available for TypeScript  
If you have a proxy, to install typings:  
  (from project directory:)  
  `node_modules\.bin\typings install --proxy <PROXY> <TYPING> --global --save`  
  for instance:  
  `node_modules\.bin\typings install --proxy http://user:pass@my.proxy.com:8080 dt~react-dom --global --save`  
If you don't have a proxy, simply use the script comment

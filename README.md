MEAN-Enterprise.UI
==================

# Vision

MEAN-Enterprise's purpose for existence is to provide a best practices, "enterprise-grade" boilerplate for a MEAN stack (MongoDB, Express, Angular.js, Node.js) web application.

# Angular Material
The app utilizes Angular Material, 'a set of reusable, well-tested, and accessible UI components based on the Material Design system'.  The UI was modeled after the material-start repo @ https://github.com/angular/material-start.

# Demo
https://mean-ui.herokuapp.com

# Modules
This branch is following John Papa's Style Guide recommendation for modules, which can be found here - https://github.com/johnpapa/angular-styleguide#style-y127.

Why?: Provides consistency for multiple module apps, and for expanding to large applications.

Why?: Provides easy way to use task automation to load all module definitions first, then all other angular files (for bundling).

# Intended Features

* **Get up and go**: clone the repo, run simple prerequisite steps, have a MEAN stack application ready to go
* **Patterns and practices**: Code structured in an "MVW" pattern on both the client and server side. Focused on separation of concerns and testability.
* **Realtime whizbang**: WebSockets capability using socket.io with minimal configuration
* **Work smarter not harder**: Automated workflow engine using grunt to streamline the development process, from local dev all the way to prod release
* **Identity management**: Out-of-the-box support for OAuth, local auth, Twitter, Facebook, and Google auth
* **Enterprise-y sugar**: Use the stack in a *nix or a Windows environment, "commonly expected" UI elements in an enterprise world

# Stack Details

* Angular.js: 1.4.3
* Angular-Material: 0.10.0
* Sails.js: 0.11.x


Setup
=====

# install node view homebrew
```sh
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
brew update
brew doctor
export PATH="/usr/local/bin:$PATH"
brew install node
```

# install git
```sh
https://git-scm.com/downloads
```

# build the app
```sh
$ cd mean-enterprise.ui
$ sudo npm install gulp karma bower jscs -g
$ sudo npm install
$ bower install
$ gulp
```

# Configure JSCS
...

MEAN-Enterprise.UI
==================

# Vision

MEAN-Enterprise's purpose for existence is to provide a best practices, "enterprise-grade" boilerplate for a MEAN stack (MongoDB, Express, Angular.js, Node.js) web application.

# Intended Features

* **Get up and go**: clone the repo, run simple prerequisite steps, have a MEAN stack application ready to go
* **Patterns and practices**: Code structured in an "MVW" pattern on both the client and server side. Focused on separation of concerns and testability.
* **Realtime whizbang**: WebSockets capability using socket.io with minimal configuration
* **Work smarter not harder**: Automated workflow engine using grunt to streamline the development process, from local dev all the way to prod release
* **Identity management**: Out-of-the-box support for OAuth, local auth, Twitter, Facebook, and Google auth
* **Enterprise-y sugar**: Use the stack in a *nix or a Windows environment, "commonly expected" UI elements in an enterprise world

# Stack Details

* Angular.js: 1.3.x
* Sails.js: 0.10.x


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
$ cd MEAN-Enterprise.UI
$ sudo npm install gulp karma bower jscs -g
$ sudo npm install
$ bower install
$ gulp

# Configure JSCS
...
```
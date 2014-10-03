# generator-frontcow [![Build Status](https://secure.travis-ci.org/bcabanes/generator-frontcow.png?branch=master)](https://travis-ci.org/bcabanes/generator-frontcow)

![](http://i.imgur.com/rBXsITu.jpg)

> FrontCow is a Yeoman generator that initialize your front-end workflow in a minute!

##What is FrontCow
Cute logo, big time saving... When it comes to make a website you have to set your workflow, prepare your libraries, your files structures. FrontCow handle all this to save your time, lunch it and go grab a coffee, when you'll be back, you're ready to work.

#### Foundation 5
FrontCow use the amazing [Foundation5 front-end framework](http://foundation.zurb.com/) powered by Zurb, which is "The most advanced responsive front-end framework in the world".

#### Bourbon + FontAwesome
FrontCow gives you the possibility to add the [Bourbon SASS library](http://bourbon.io/) to your project to get a lot a nice SASS mixins, and [FontAwesome](http://fortawesome.github.io/Font-Awesome/), the popular iconic webfont.

#### Atomic Design
FrontCow is developed with the [Atomic Design](http://bradfrostweb.com/blog/post/atomic-web-design/) architecture in mind, so it will create and organize your SCSS in a particulare file system:

    ├── app
    │   ├── css
    │   │   ├── main.css _(generated)_
    │   │   └── main_override.css
    │   ├── fonts
    │   ├── js
    │   ├── medias
    │   │   ├── images
    │   │   └── tmp
    │   └── scss
    │   │   ├── _your-project-name_
    │   │   │   ├── quarks
    │   │   │   ├── atoms
    │   │   │   ├── molecules
    │   │   │   ├── organisms
    │   │   │   ├── templates
    │   │   │   ├── pages
    │   │   │   ├── utilites
    │   │   │   └── _imports.scss
    │   │   ├── _foundation-settings.scss _(foundation custom settings)_
    │   │   ├── __your-project-name_.scss
    │   │   └── main.scss
    │   └── index.html
    ├── dist
    ├── .editorconfig
    ├── .gitignore
    ├── .jshintrc
    ├── LICENSE
    └── package.json

### Features
**Available Scaffolding Options:**

- Project/Site naming
- CSS Preprocessing with [SCSS](http://sass-lang.com/)
- [Bourbon](http://bourbon.io/) SASS Mixin library
- [Font Awesome](http://fortawesome.github.io/Font-Awesome/) popular iconic webfont
- IE8+ Support via [RespondJS](https://github.com/scottjehl/Respond)

**Included by default:**

- Template inspiration from [HTML5 Boilerplate](http://html5boilerplate.com/)
- Feature detection with [Modernizr](http://modernizr.com/)
- JavaScript Linting with [JSHint](http://www.jshint.com/)
- Built in preview server with LiveReload
- [.editorconfig](http://editorconfig.org/) for consistent coding styles within text editors
- JavaScript unit testing with [Jasmine](http://jasmine.github.io/)
- Automatic build process that includes concatenation, image optimization, CSS and HTML minification, and JS uglification.
- [Sourcemaps](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/) for JavaScript and either SCSS.

## Getting Started

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```bash
$ npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

1. Install generato-frontcow form npm, run: <br> `$ npm install -g generator-frontcow`
2. Initiate the generator, run: <br> `$ yo frontcow`
3. Import bower libraries, run: <br> `$ bower install`

### FrontCow Grunt Tasks

The gruntfile provide a complete set of tools to help you to do your work.

#### IP selection

The gruntfile list every interfaces available on your computer to load the server. This permit to you to access to your work by all devices in your local network. This is very usefull to tests on mobiles/tablets for example.

All interfaces are show to you at the begening like this:

```bash
Interface list:
----- lo0 127.0.0.1
----- en0 192.168.0.142
```

Just pick up one like:

```javascript
/**
 * General IP to use
 */
var myIP = availableIP.[0]; // Could be 0...1...2...
```

#### Development

Grunt task starts the workflow with SASS watch & build, create a server and open your default browser to be ready to work.

##### Using font-awesome

If you said yes to use font-awesome you have to copy the font first (one time) with the following command:

```bash
$ grunt copy:fontawesome
```

##### Before start the server

Before start the server, you can directly create the base css with the following command:

```bash
$ grunt sass:dist
```

##### Start the server

To start the server, just run the following command:

```bash
$ grunt server
```

### Distribution

To start a loca server with the dist files, run the following command:

```bash
$ grunt server:dist
```
_This command will call the build command in its processes._


To just build the `dist` files, run the following command:

```bash
$ grunt build
```

### Javascript validation

To run the jsHint, just run the following command:

```bash
$ grunt validate-js
```


### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


## License

MIT

'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var FrontCow = module.exports = function FrontCow(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(FrontCow, yeoman.generators.Base);

/**
 * FrontCow - AskQuestions
 */
FrontCow.prototype.askQuestions = function askQuestions() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [
    {
        // Github username
        type: 'input',
        name: 'githubUsername',
        message: 'What is your Github username?',
        default: 'myusername'
    },
    {
        // Project Name
        type: 'input',
        name: 'projectName',
        message: 'What is your project name?',
        default: 'myproject'
    },{
        // Foundation
        type: 'confirm',
        name: 'foundation',
        message: 'Would you like to include Foundation5? (Frontend framework)',
        default: true
    },{
        // Use polyfill for Foundation 5 (IE*)
        type: 'confirm',
        name: 'polyfill',
        message: 'Would you like to include Respond polyfill to make Foundation working on IE8 (just the CSS)?',
        default: false
    }
  ];

  this.prompt(prompts, function (props) {
    // `props` is an object passed in containing the response values, named in
    // accordance with the `name` property from your prompt object. So, for us:

    // Github username
    this.githubUsername = props.githubUsername;
    // ProjectName
    this.projectName = props.projectName;
    this.projectNameSafe = this._.slugify(this.projectName);
    // Foundation
    this.foundation = props.foundation;
    // FontAwesome
    this.fontAwesome = props.fontAwesome;
    // Bourbon
    this.bourbon = props.bourbon;
    // Foundation polyfill
    this.polyfill = props.polyfill;

    cb();
  }.bind(this));
};

/**
 * FrontCow - Build project's files
 */
FrontCow.prototype.app = function app() {
    this.mkdir('dist');
    this.mkdir('app');
    this.template('_bower.json', 'bower.json');
    this.copy('_package.json', 'package.json');
    this.template('Gruntfile.js', 'Gruntfile.js');
    this.copy('editorconfig', '.editorconfig');
    this.copy('gitignore', '.gitignore');
    this.copy('jshintrc', '.jshintrc');
    this.copy('_bowerrc', '.bowerrc');
    this.template('index.html', 'app/index.html');

    this.mkdir('app/fonts');
    this.mkdir('app/medias');
        this.mkdir('app/medias/images');
        this.copy('medias/images/frontcow.jpg', 'app/medias/images/frontcow.jpg');
        this.mkdir('app/medias/tmp');
    this.mkdir('app/js');
        this.mkdir('app/js/modules');
        this.copy('js/app.js', 'app/js/app.js');
    this.mkdir('app/css');
    this.mkdir('app/scss');

        if(this.foundation){ this.copy('scss/main-foundation.scss', 'app/scss/main.scss'); }
        else{ this.copy('scss/main-blank.scss', 'app/scss/main.scss'); }

        this.copy('scss/_projectName.scss', 'app/scss/_'+this.projectNameSafe+'.scss');
        if(this.foundation){ this.copy('scss/_foundation-settings.scss', 'app/scss/_foundation-settings.scss'); }
        this.mkdir('app/scss/'+this.projectNameSafe);
            this.mkdir('app/scss/'+this.projectNameSafe+'/quarks');
            this.mkdir('app/scss/'+this.projectNameSafe+'/atoms');
            this.mkdir('app/scss/'+this.projectNameSafe+'/molecules');
            this.mkdir('app/scss/'+this.projectNameSafe+'/organisms');
            this.mkdir('app/scss/'+this.projectNameSafe+'/pages');
            this.mkdir('app/scss/'+this.projectNameSafe+'/templates');
            this.mkdir('app/scss/'+this.projectNameSafe+'/utilities');
                this.mkdir('app/scss/'+this.projectNameSafe+'/utilities/animations');
            if(this.foundation){ this.copy('scss/_imports.scss', 'app/scss/'+this.projectNameSafe+'/_imports.scss'); }
            else{
              this.copy('scss/_imports-base.scss', 'app/scss/'+this.projectNameSafe+'/_imports.scss');
              this.copy('scss/bases/_fonts.scss', 'app/scss/'+this.projectNameSafe+'/utilities/_fonts.scss');
              this.copy('scss/bases/_functions.scss', 'app/scss/'+this.projectNameSafe+'/utilities/_functions.scss');
              this.copy('scss/bases/_grids.scss', 'app/scss/'+this.projectNameSafe+'/utilities/_grids.scss');
              this.copy('scss/bases/_mixins.scss', 'app/scss/'+this.projectNameSafe+'/utilities/_mixins.scss');
              this.copy('scss/bases/_variables.scss', 'app/scss/'+this.projectNameSafe+'/utilities/_variables.scss');
            }

        this.mkdir('app/css/');
};

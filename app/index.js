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

FrontCow.prototype.askQuestions = function askQuestions() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [
    {
        // Project Name
        type: "input",
        name: 'projectName',
        message: 'What is uour project name?'
    },{
        // FontAwesome
        type: 'confirm',
        name: 'fontAwesome',
        message: 'Would you like to include Font Awesome? (Font Awesome gives you scalable vector icons)',
        default: true
    },{
        // Bourbon
        type: 'confirm',
        name: 'bourbon',
        message: 'Would you like to include The bourbon SASS library?',
        default: true
    },{
        // Use polyfill for Foundation 5 (IE*)
        type: 'confirm',
        name: 'polyfill',
        message: 'Would you like to include polyfills to make Foundation working on IE8 (just the CSS)?',
        default: false
    }
];

  this.prompt(prompts, function (props) {
    // `props` is an object passed in containing the response values, named in
    // accordance with the `name` property from your prompt object. So, for us:

    // ProjectName
    this.projectName = props.projectName;
    this.projectNameSafe = RemoveAccents(this.projectName.toLowerCase());
    // this.projectNameSafe = this.projectNameSafe.stringToReplace.replace(/[^\w\s]/gi, '');
    // FontAwesome
    this.fontAwesome = props.fontAwesome;
    // Bourbon
    this.bourbon = props.bourbon;
    // Foundation polyfill
    this.polyfill = props.polyfill;

    cb();
  }.bind(this));
};

FrontCow.prototype.app = function app() {
    this.mkdir('dist');
    this.mkdir('app');
    this.template('_bower.json', 'bower.json');
    this.copy('_package.json', 'package.json');
    this.template('Gruntfile.js', 'Gruntfile.js');
    this.copy('gitignore', '.gitignore');
    this.copy('jshintrc', '.jshintrc');
    this.copy('_bowerrc', '.bowerrc');
    this.template('index.html', 'app/index.html');

    this.mkdir('app/fonts');
    this.mkdir('app/medias');
        this.mkdir('app/medias/images');
        this.mkdir('app/medias/tmp');
    this.mkdir('app/js');
        this.mkdir('app/js/modules');
        this.copy('js/app.js', 'app/js/app.js');
    this.mkdir('app/css');
    this.mkdir('app/scss');
        this.copy('scss/main.scss', 'app/scss/main.scss');
        this.copy('scss/_projectName.scss', 'app/scss/_'+this.projectNameSafe+'.scss');
        this.copy('scss/_foundation-settings.scss', 'app/scss/_foundation-settings.scss');
        this.mkdir('app/scss/'+this.projectNameSafe);
            this.mkdir('app/scss/'+this.projectNameSafe+'/quarks');
            this.mkdir('app/scss/'+this.projectNameSafe+'/atoms');
            this.mkdir('app/scss/'+this.projectNameSafe+'/molecules');
            this.mkdir('app/scss/'+this.projectNameSafe+'/organisms');
            this.mkdir('app/scss/'+this.projectNameSafe+'/pages');
            this.mkdir('app/scss/'+this.projectNameSafe+'/templates');
            this.mkdir('app/scss/'+this.projectNameSafe+'/utilities');
                this.mkdir('app/scss/'+this.projectNameSafe+'/utilities/animations');
            this.copy('scss/_imports.scss', 'app/scss/'+this.projectNameSafe+'/_imports.scss');
        this.copy('css/template_override.css', 'app/css/main_override.css');
};


function RemoveAccents(strAccents) {
    var strAccents = strAccents.split('');
    var strAccentsOut = new Array();
    var strAccentsLen = strAccents.length;
    var accents = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
    var accentsOut = "AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz";
    for (var y = 0; y < strAccentsLen; y++) {
        if (accents.indexOf(strAccents[y]) != -1) {
            strAccentsOut[y] = accentsOut.substr(accents.indexOf(strAccents[y]), 1);
        } else
            strAccentsOut[y] = strAccents[y];
    }
    strAccentsOut = strAccentsOut.join('');
    return strAccentsOut;
}

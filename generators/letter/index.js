/* Copyright 2016 Christophe Camel
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var rmExt = require('remove-ext');
var glob = require('glob-fs')({
  gitignore: true
});
var moment = require('moment');
moment.locale('fr');

module.exports = yeoman.Base.extend({

  initializing: function() {
    var institutesPath = 'assets/institutes/';

    this.log.info('initializing...');

    // load available institutes
    this.institutes = glob.readdirSync(institutesPath + '*.ins')
      .map(function(x) {
        return rmExt(x).substring(institutesPath.length);
      });

    // check current environment
    if (this.institutes.length === 0) {
      var msg = '/!\\ No institutes found in ' + institutesPath + '\n\n' +
        'You can create a new one with the following command line:\n\n  $ yo latex-mail:institute' +
        '\n\nBye!\n';

      //  throw new Error(msg);
      this.env.error(msg);
    }
    this.log.info('initialized');
  },

  prompting: function() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the remarkable ' + chalk.red('generator-latex-mail') +
      ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'letterName',
      message: 'Name of the letter (without extension)',
      default: 'letter',
    }, {
      type: 'list',
      name: 'institute',
      message: 'What institute do you want yo use ?',
      choices: this.institutes,
      default: this.institutes[0]
    }, {
      type: 'input',
      name: 'subject',
      message: 'Subject of the letter'
    }, {
      type: 'confirm',
      name: 'isRegisteredLetter',
      message: 'Does the letter a Registered Letter or not (If \'yes\', a special mention is added to the subject of the letter).',
      default: false
    }];

    return this.prompt(prompts).then(function(props) {
      this.props = props;

      // additional context
      this.props.date = moment();

    }.bind(this));
  },

  writing: function() {
    this.fs.copyTpl(
      this.templatePath('letters/template.tex'),
      this.destinationPath('letters/' + this.props.letterName + '.tex'),
      this.props
    );
  },

  install: function() {

  },

  end: function() {
    this.log('----');
    this.log('I\'m done !');
    this.log('You can now continue with the following activities:');
    this.log('');
    this.log('  - add a institute:        yo latex-mail:institute');
    this.log('  - create another letter:  yo latex-mail:letter');
    this.log('  - generate PDFs        :  gulp make');
    this.log('');
    this.log('Bye !');
  }
});

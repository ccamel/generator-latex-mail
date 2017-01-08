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

module.exports = yeoman.Base.extend({
  prompting: function() {
    this.log(yosay(
      'Welcome to the amazing ' + chalk.red('latex-mail') +
      ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'workspace',
      message: 'What is the name of the workspace you want to create ?',
      default: 'mails',
    }];

    return this.prompt(prompts).then(function(props) {
      this.props = props;
    }.bind(this));
  },

  writing: function() {
    // copy all non-dotfiles
    this.fs.copy(
      this.templatePath('**/[^_].*'),
      this.destinationPath(this.props.workspace)
    );
    // copy all dotfiles
    this.fs.copy(
      this.templatePath('**/.*'),
      this.destinationRoot(this.props.workspace)
    );
    // copy gulpfile.js & package.json
    this.fs.copyTpl(
                  this.templatePath('_package.json'),
                  this.destinationPath('package.json'),
                  this.props
    );
        this.fs.copy(
                      this.templatePath('_gulpfile.js'),
                      this.destinationPath('gulpfile.js')
        );
  },

  install: function() {
   this.npmInstall(this.devDependencies, { 'saveDev': true });
  },

  end: function() {
    this.log('----');
    this.log('I\'m done !');
    this.log('You can now continue with the following activities:');
    this.log('');
    this.log('  - add an institute: yo latex-mail:institute');
    this.log('  - create a letter:  yo latex-mail:letter');
    this.log('');
    this.log('Bye !');
  }
});

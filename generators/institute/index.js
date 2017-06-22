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
  prompting: function () {
    this.log(yosay(
      'Welcome to the amazing ' + chalk.red('latex-mail') +
      ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'instituteName',
      message: 'What is the name of the institute (a file that describes the sender)',
      default: 'default'
    }, {
      type: 'input',
      name: 'senderName',
      message: 'Full name',
      default: 'John Doe'
    }, {
      type: 'input',
      name: 'senderAddress1',
      message: 'Address 1',
      default: '10 rue de la Pomme'
    }, {
      type: 'input',
      name: 'senderAddress2',
      message: 'Address 2',
      default: ''
    }, {
      type: 'input',
      name: 'senderCity',
      message: 'City',
      default: 'Paris'
    }, {
      type: 'input',
      name: 'senderZipCode',
      message: 'Zipcode',
      default: '75010'
    }, {
      type: 'input',
      name: 'senderPhone',
      message: 'Phone',
      default: '06 01 02 03 04'
    }, {
      type: 'input',
      name: 'senderEmail',
      message: 'Email',
      default: 'john.doe@yopmail.com'
    }];

    return this.prompt(prompts).then(function (props) {
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('assets/institutes/template.ins'),
      this.destinationPath('assets/institutes/' + this.props.instituteName +
        '.ins'),
      this.props
    );
  },

  install: function () {},

  end: function () {
    this.log('----');
    this.log('I\'m done !');
    this.log('You can now continue with the following activities:');
    this.log('');
    this.log('  - add another institute: yo latex-mail:institute');
    this.log('  - create a letter:       yo latex-mail:letter');
    this.log('');
    this.log('Bye !');
  }
});

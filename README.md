generator-latex-mail
====================
[![Yeoman](https://img.shields.io/badge/generator-yeoman-5aadbb.svg?style=flat)](http://yeoman.io)
[![LaTex](https://img.shields.io/badge/language-LaTex-7cad22.svg?style=flat)](https://www.latex-project.org)
[![Apache-2.0](https://img.shields.io/badge/licence-Apache--2.0-lightgrey.svg?style=flat)](http://www.apache.org/licenses/LICENSE-2.0)

> A [Yeoman] template for scaffolding [LaTeX] administrative mails (in french format)

## Features

 * Scaffolds a _workspace_ where all latex resources lay in
 * Manages _institute_ files which hold the identity of the senders
 * Generates nice default [LaTex] _letters_ using the [letter.cls](https://www.ctan.org/tex-archive/macros/latex/contrib/lettre) LaTeX class, with following features:
    * support generation for Registered Letters (*Lettres recommandées*)
    * automatically set the letter date to the current date
    * support the link to an institute (previously created)

[![icon-screenshot](doc/assets/icon-screenshot.png) letter-example.pdf](doc/samples/letter.pdf)

## Why ?

![what ! latex for writing letters ?](doc/assets/what.gif "What ! Latex ? For letters ?")

Yes ! This is what I personally use; mainly because:

- [LaTex] is free, portable, flexible, sexy and produces very high quality documents.
- I'm a coder and I just can't imagine using a [WYSIWYG](https://en.wikipedia.org/wiki/WYSIWYG) editor for writing something.

## Installation

##### Prerequisites

So you want to play with it. I assume the following is already installed:

- [node.js]
- [Yeoman]
- [LaTex] (more precisely [XeLaTeX])
 
 To install [XeLaTeX], I would suggest you to use [TexLive] core or full package. But you are free to use any other distribution. 
 You can have a look to [my environment under Arch](doc/latex-environment.md).

##### Project

Install [generator-latex-mail] using [npm]:

```bash
npm install -g generator-latex-mail
```

Alternately you can install the module directly from sources. You will need [git] for that.

```bash
git clone https://github.com/ccamel/generator-latex-mail.git
cd generator-latex-mail
npm link
```

## Getting started

### Create the workspace

Before anything else, you need to create a workspace. For that, you just have to invoke the [latex-mail generator](generators/app/index.js#L20) with [yeoman] and let you guide.

```bash
yo latex-mail
```

You will be asked to answer a few questions.

```
? What is the name of the workspace you want to create ? mails
```

As a result, you will get the following directory structure.

```
[workspace]                     # folder created by template
   ├── assets                   # contains all resources used by LaTex
   │   ├── fonts                # contains alternative fonts
   │   └── institutes           # contains the institutes
   │       └── default.ins
   ├── letters                  # contains all the letters
   │   └── letter.tex
   ├── outputs                  # contains all the pdf generated from the letters
   │   └── letter.pdf
   ├── temp                     # folder containing temporary files
   ├── gulp.js                  # the gulp file used to process tex files
   └─  package.json             # npm dependencies used by gulp

```

### Create an institute

An institute is a LaTex file containing the information about the sender of a letter, like the name, the address, the phone number.

The creation of an institute is performed with the `institute` sub-generator.

```bash
yo latex-mail:institute
```

You will be asked to answer a few questions.

```
? What is the name of the institute (a file that describes the sender) default
? Full name John Doe
? Address 1 10 rue de la Pomme
? Address 2 
? City Paris
? Zipcode 75010
? Phone 06 01 02 03 04
? Email john.doe@yopmail.com
   create assets/institutes/default.ins
```

As a result, you will get the new institute file in the `assets/institutes` folder. You can of course freely modify it to
adapt it to your needs.

### Create a new letter

Creating a new letter is fairly simple, thanks to the `letter` sub-generator.

```bash
yo latex-mail:letter
```

You will be asked to answer a few questions.

```
? Name of the letter (without extension) letter
? What institute do you want yo use ? default
? Subject of the letter Réclamation
? Does the letter a Registered Letter or not (If 'yes', a special mention is added to the subject of the letter). Yes
```

As a result, you will get the new letter file in the `letters` folder. Modify it with the editor of your choice.

### Make PDF

I use [XeLaTex] which is a TeX typesetting engine with support of Unicode and modern font technologies.

The process is driven by [Gulp] which is a streaming build system. The pipeline generation is as such:

```
  letters/*.tex -> [XelaTex] -> outputs/*.pdf
```

The process is idempotent: only letters that have been modified since last generation are built again.

To launch the process, just invoke the [Gulp] `default` task:

```
gulp
```

## Samples

[Sample PDF](doc/samples/letter.pdf)

## Technologies

[![Yeoman-logo][Yeoman-logo]][Yeoman] [![Gulp-logo][Gulp-logo]][Gulp] [![LaTex-logo][LaTex-logo]][LaTex]

## Useful links

 - [écrire des lettres en latex (zestedesavoir.com)](https://zestedesavoir.com/tutoriels/508/ecrire-des-lettres-en-latex/)
 - [lettres en latex (www.tuteurs.ens.fr)](http://www.tuteurs.ens.fr/logiciels/latex/lettre.html)

## License

[Apache-2.0] © [Christophe Camel]

[Christophe Camel]: https://github.com/ccamel
[Apache-2.0]: http://www.apache.org/licenses/LICENSE-2.0
[LaTex]: https://www.latex-project.org/
[LaTeX-logo]: doc/assets/logo-LaTex.png
[XeLaTex]: https://en.wikipedia.org/wiki/XeTeX
[TexLive]: http://www.tug.org/texlive/
[Yeoman]: http://yeoman.io/
[Yeoman-logo]: doc/assets/logo-Yeoman.png
[Gulp]: http://gulpjs.com/
[Gulp-logo]: doc/assets/logo-Gulp-2x.png
[node.js]: https://nodejs.org/
[npm]: https://www.npmjs.com/
[git]: https://git-scm.com/
[generator-latex-mail]: https://github.com/ccamel/generator-latex-mail

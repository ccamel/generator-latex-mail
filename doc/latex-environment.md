# [My](https://github.com/ccamel) Latex environment

This tutorial summarize the [LaTex] environment I use to produce LaTeX administrative letters and faxes in French.

## Linux Distro

The Linux distribution targeted by this tutorial is [Arch Linux].

## TeX Live

[TeX Live](https://www.tug.org/texlive/) is an "easy way to get up and running with the TeX document production system".

See [TeX Live for Arch](TeX_Live).

```bash
yaourt -S texlive-core
yaourt -S texlive-localmanager-git
```

## LaTex packages

### Lettre.cls

[Lettre.cls](https://www.ctan.org/tex-archive/macros/latex/contrib/lettre) is a class for LaTex that aims to manage administrative mails.

Installation is performed manually:

- download lettre.zip package
- unzip the downloaded content
- move the package into the LaTex distribution

```bash
wget http://mirrors.ctan.org/macros/latex/contrib/lettre.zip
unzip lettre.zip
sudo mv lettre /usr/share/texmf-dist/tex/latex
sudo texconfig rehash
```

### other [CTAN] packages

```bash
tllocalmgr install paralist
tllocalmgr install numprint
tllocalmgr install enumitem

sudo texconfig rehash
```

[LaTex]: https://www.latex-project.org/
[Arch Linux]: https://www.archlinux.org/
[CTAN]: https://www.ctan.org/

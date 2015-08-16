# recalbox-webconfig


```
git clone https://github.com/MikaXII/recalbox-webconfig.git
cd recalbox-webconfig
make install
```

## Run server
You can run web server with the *grunt server* task.

```
grunt server
```

## Development

You can specify a development environment to run the server:

```
grunt server:dev
```

To be able to compile SaSS sources for CSS, you will need [Compass](http://compass-style.org/) and to get the [Foundation5](http://foundation.zurb.com/docs/) sources.

To install the right Compass version and dependancies, check the file from 'compass/Gemfile'.

To get the sources you will need to install the Foundation commandline tool, see the part "How to Install the CLI" in http://foundation.zurb.com/docs/sass.html , then check the foundation5/Makefile file or just do:

```
npm install -g bower grunt-cli
gem install foundation
gem install compass --version 1.0.0
gem install sass --version 3.4.0
cd foundation5
make install-dev
```

If Ruby gems make conflicts with allready installed gems on your system, think about to use something like [RVM](https://rvm.io/) (the [RVM gemsets](https://rvm.io/gemsets/basics) should be the trick).

Templates

View templates are rendered by [Handlebars.js](http://handlebarsjs.com) (the *hbs* plugin).

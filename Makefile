
.PHONY: help install

help:
	@echo "Please use \`make <target>' where <target> is one of"
	@echo
	@echo "  install -- to build the project"
	@echo "  install-dev -- to build the project then install Foundation5 sources"
	@echo "  clean  -- to clean your local repository from all builded stuff and caches"

install:
	npm install

install-dev: install
	foundation new foundation5

clean:
	rm -Rf node_modules compass/.sass-cache

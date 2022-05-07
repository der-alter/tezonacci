include ../../scripts/help.Mk

install: ##@Dependencies install dependencies
	@if [ ! -f ./.env ]; then cp .env.dist .env ; fi
	@$(LIGO) install

NAME=tezonacci

LIGO=ligo
ifeq (, $(shell which ligo))
	LIGO=docker run -v "$(PWD):$(PWD)" -w "$(PWD)" --rm -i ligolang/ligo:0.40.0
endif
# ^ use ligo bin if available, otherwise use docker

project_root=--project-root .
# ^ required when using packages

compile = $(LIGO) compile contract $(project_root) ./src/$(1) -o ./compiled/$(2) $(3)
# ^ compile contract to michelson or micheline

test = $(LIGO) run test $(project_root) $(protocol) ./test/$(1)
# ^ run given test file

compile: ##@Contracts compile contracts
	@if [ ! -d ./compiled ]; then mkdir ./compiled ; fi
	@$(call compile,main.mligo,$(NAME).tz)
	@$(call compile,main.mligo,$(NAME).json,--michelson-format json)

clean: ##@Contracts clean up
	@rm -rf compiled

.PHONY: test
test: ##@Contracts run tests
	@$(call test,main.test.mligo)

deploy: ##@Contracts deploy
	@./scripts/deploy.sh

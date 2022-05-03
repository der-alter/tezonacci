SHELL := /bin/bash

help:
	@grep -E '^[ a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | \
	awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'

install: ## install dependencies
	@cd ./dapp \
		&& if [ ! -f ./.env ]; then cp .env.dist .env ; fi \
		&& yarn \
		&& cd -

contracts-compile: ## compile contracts
	@chinstrap compile

contracts-deploy: ## deploy contracts
	@chinstrap originate

dapp-start: ## start dapp
	@yarn --cwd ./dapp start

sandbox-start: ## start sandbox
	@chinstrap sandbox -p Ithaca -o 20000 -c 5

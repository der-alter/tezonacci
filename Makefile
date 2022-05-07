include scripts/help.Mk

MAKE_CONTRACTS=$(MAKE) -C packages/contracts/

install: ##Dependencies install dependencies
	@cd ./packages/dapp \
		&& if [ ! -f ./.env ]; then cp .env.dist .env ; fi \
		&& cd - \
        && cd ./packages/contracts \
        && make install \
        && cd - \
        && npm i

clean: ##@Misc cleanup everything
	@git clean -fX

conf: ##@Misc switch node config
	./scripts/conf.sh

dapp-start: ##@DApp start dapp
	@npm start -w @tezonacci/dapp

sandbox-start: ##@Infra start sandbox
	@./scripts/run-sandbox

sandbox-stop: ##@Infra stop sandbox
	@docker stop sandbox

contracts-compile: ##@Contracts compile contracts
	@$(MAKE_CONTRACTS) compile

contracts-test: ##@Contracts test contracts
	@$(MAKE_CONTRACTS) test

contracts-deploy: ##@Contracts deploy contracts
	@$(MAKE_CONTRACTS) deploy

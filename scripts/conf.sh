#!/bin/bash

set -e

dapp_path=./packages/dapp
contracts_path=./packages/contracts

set_testnet() {
    sed -i -e '/^NETWORK=/s/=.*/=testnet/' ${contracts_path}/.env
    sed -i -e '/^REACT_APP_NETWORK=/s/=.*/=ITHACANET/' ${dapp_path}/.env
    sed -i -e '/^REACT_APP_RPC_URL=/s/=.*/=http:\/\/rpc.ithacanet.teztnets.xyz/' ${dapp_path}/.env
}

set_local() {
    sed -i -e '/^NETWORK=/s/=.*/=local/' ${contracts_path}/.env
    sed -i -e '/^REACT_APP_NETWORK=/s/=.*/=CUSTOM/' ${dapp_path}/.env
    sed -i -e '/^REACT_APP_RPC_URL=/s/=.*/=http:\/\/localhost:20000/' ${dapp_path}/.env
}

# Mac OS?
cleanup() {
    if [ -f ${contracts_path}/.env-e ]; then rm ${contracts_path}/.env-e; fi
    if [ -f ${dapp_path}/.env-e ]; then rm ${dapp_path}/.env-e; fi
}

echo 'Configuration updated!'

PS3='Choose node :'
options=("local" "testnet" "abort")
select opt in "${options[@]}"
do
    case $opt in
        "local")
            set_local
            cleanup
            break
            ;;
        "testnet")
            set_testnet
            cleanup
            break
            ;;
        "abort")
            break
            ;;
        *) echo "invalid option $REPLY";;
    esac
done


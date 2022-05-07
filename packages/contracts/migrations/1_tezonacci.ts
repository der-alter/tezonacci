import dotenv from "dotenv";
import { MichelsonMap, TezosToolkit } from "@taquito/taquito";
import { InMemorySigner } from "@taquito/signer";
import { char2Bytes } from "@taquito/utils";
import conf from "../config";
import saveContractAddress from "../helpers/saveContractAddress";
import code from "../compiled/tezonacci.json";
import metadata from "./tezonacci.json";

// Read environment variables from .env file
dotenv.config();

// Initialize RPC connection
const Tezos = new TezosToolkit(conf.node);

// Deploy to configured node with configured secret key
const deploy = async () => {
    try {
        const signer = await InMemorySigner.fromSecretKey(
            conf.accounts.alice.sk
        );

        Tezos.setProvider({ signer });

        // create a JavaScript object to be used as initial storage
        // https://tezostaquito.io/docs/originate/#a-initializing-storage-using-a-plain-old-javascript-object
        const storage = {
            metadata: MichelsonMap.fromLiteral({
                "": char2Bytes("tezos-storage:contents"),
                contents: char2Bytes(JSON.stringify(metadata)),
            }),
            foo: "bar",
        };
        const op = await Tezos.contract.originate({ code, storage });
        await op.confirmation();
        console.log(`[OK] ${op.contractAddress}`);
        saveContractAddress("tezonacci", op.contractAddress);
    } catch (e) {
        console.log(e);
    }
};

deploy();

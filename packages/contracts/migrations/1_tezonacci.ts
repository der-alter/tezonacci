import dotenv from "dotenv";
import { MichelsonMap, TezosToolkit } from "@taquito/taquito";
import { InMemorySigner } from "@taquito/signer";
import saveContractAddress from "../helpers/saveContractAddress";
import code from "../compiled/tezonacci.json";

// Read environment variables from .env file
dotenv.config();

// Initialize RPC connection
const Tezos = new TezosToolkit(process.env.NODE_URL);

const metadata = {
    name: "Tezonacci",
    description: "An Experimental Contract",
    version: "beta",
    license: {
        name: "MIT",
    },
    authors: ["der-alter <staivenj@protonmail.com>"],
    homepage: "https://github.com/der-alter/tezonacci",
    source: {
        tools: "cameligo",
        location:
            "https://github.com/der-alter/tezonacci/packages/contracts/src",
    },
    interfaces: ["TZIP-016"],
};

// Deploy to configured node with configured secret key
const deploy = async () => {
    try {
        const signer = await InMemorySigner.fromSecretKey(
            process.env.SECRET_KEY
        );

        Tezos.setProvider({ signer });

        // create a JavaScript object to be used as initial storage
        // https://tezostaquito.io/docs/originate/#a-initializing-storage-using-a-plain-old-javascript-object
        const storage = null;
        const op = await Tezos.contract.originate({ code, storage });
        await op.confirmation();
        console.log(`[OK] ${op.contractAddress}`);
        saveContractAddress("tezonacci", op.contractAddress);
    } catch (e) {
        console.log(e);
    }
};

deploy();

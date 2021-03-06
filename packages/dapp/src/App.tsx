import { useState } from "react";
import "./App.css";
import ConnectButton from "./ConnectWallet";
import { TezosToolkit, WalletContract } from "@taquito/taquito";
import DisconnectButton from "./DisconnectWallet";
import { Contract, ContractsService } from "@dipdup/tzkt-api";

const RPC_URL = process.env.REACT_APP_RPC_URL || 'https://florencenet.smartpy.io/';

function App() {
  const [Tezos, setTezos] = useState<TezosToolkit>(
    new TezosToolkit(RPC_URL)
  );
  const [wallet, setWallet] = useState<any>(null);
  const [userAddress, setUserAddress] = useState<string>("");
  const [userBalance, setUserBalance] = useState<number>(0);

  const contractsService = new ContractsService({
    baseUrl: "https://api.ithacanet.tzkt.io",
    version: "",
    withCredentials: false,
  });
  const [contracts, setContracts] = useState<Array<Contract>>([]);

  const fetchContracts = () => {
    (async () => {
      setContracts(
        await contractsService.getSimilar({
          address: "KT1M1sXXUYdLvow9J4tYcDDrYa6aKn3k1NT9",
          includeStorage: true,
          sort: { desc: "id" },
        })
      );
    })();
  };

  const poke = async (contract: Contract) => {
    let c: WalletContract = await Tezos.wallet.at("" + contract.address);
    try {
      const op = await c.methods.default().send();
      await op.confirmation();
    } catch (error: any) {
      console.table(`Error: ${JSON.stringify(error, null, 2)}`);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
          <ConnectButton
            Tezos={Tezos}
            setWallet={setWallet}
            setUserAddress={setUserAddress}
            setUserBalance={setUserBalance}
            wallet={wallet}
          />

          <DisconnectButton
            wallet={wallet}
            setUserAddress={setUserAddress}
            setUserBalance={setUserBalance}
            setWallet={setWallet}
          />

          <div>
            I am {userAddress} with {userBalance} Tz
          </div>
        <br />
        <div>
          <button onClick={fetchContracts}>Fetch contracts</button>
          {contracts.map((contract) => (
            <div>
              {contract.address}{" "}
              <button onClick={() => poke(contract)}>Poke</button>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;

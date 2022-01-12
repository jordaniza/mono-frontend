import { Vault } from "../features/vault/vaultSlice";
import VaultModal from "./VaultModal";

const VaultList = ({ vaults }: { vaults: Vault[] }): JSX.Element => (
  <section
    id="vault-list"
    className="min-h-screen flex flex-row flex-wrap align-middle justify-center mb-10"
  >
    {vaults.map((v) => (
      <VaultModal key={v.symbol} vault={v} />
    ))}
  </section>
);
export default VaultList;
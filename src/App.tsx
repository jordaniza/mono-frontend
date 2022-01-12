import { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import {
  useActiveWeb3,
  useAppSelector,
} from './app/hooks';
import VaultList from './components/VaultList';
import VaultExtended from './components/VaultDetails';
import Hero from './static/hero';
import Header from './components/Header';

function App() {
  const isActive = useActiveWeb3();
  const context = useWeb3React();
  const [show, setShow] = useState(false);
  const data = useAppSelector(state => state.vault.vaults);
  return (
    <div className="App text-center">
      <Header setShow={setShow} />
      <Hero />
      <section id="content">
        <div className="spacer my-10 h-1" />
        <h1 className="text-3xl m-10">Vaults</h1>
        <VaultList vaults={data} />
      </section>
      <VaultExtended vault={data[0]} />
    </div>
  );
}

export default App;

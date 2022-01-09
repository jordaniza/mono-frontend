import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';

const Hero = (): JSX.Element => (
  <section>
    <h1>Simple, High Yield DeFi</h1>
    <section className="actions">
      <button>Get Started</button>
      <button>Learn More</button>
    </section>
  </section>
)

type Vault = {
  name: string;
  symbol: string;
  icon?: string;
  description: string;
  network: string;
  stats: {
    APY: number;
  }
}

const Vault = ({ vault }: { vault: Vault }): JSX.Element => (
  <div className="border-red-100 border-2">
    <h2 className="underline">{ vault.name }</h2>
    <p>{ vault.description }</p>
    <div className="details">
      <p>APY: {vault.stats.APY}</p>
    </div>
    <section>
      <button>Deposit</button>
      <button>Withdraw</button>
    </section>
  </div>
) 

const VaultList = ({ vaults }: { vaults: Vault[] }): JSX.Element => (
  <>
    {vaults.map(v => (<Vault key={v.symbol} vault={v}/>))}
  </>
)

function App() {
  const data: Vault[] = [{
    symbol: 'USDC',
    name: 'StableCoin USDC',
    description: 'High yield stablecoin farming from USDC',
    network: 'Polygon',
    stats: {
      APY: 10.2
    } 
  }];
  return (
    <div className="App">
      <header>Header goes here, inc. connect wallet stuff</header>
      <Hero />
      <section>
        <h1>Main Mono Content goes here</h1>
        <VaultList vaults={data} />
      </section>
    </div>
  );
} 

export default App;

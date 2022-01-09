import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { useState } from 'react';

const Hero = (): JSX.Element => (
  <section className="
    h-screen
    flex flex-col align-middle justify-center
    ">
    <h1
      className="text-xl mb-5"
    >Simple, High Yield DeFi</h1>
    <section className="
      actions
    ">
      <a
        className="bg bg-pink-300 rounded-md hover:bg-pink-400 p-3 m-1"
        href="#content"
      >Get Started</a>
      <button
        className="bg bg-pink-300 rounded-md hover:bg-pink-400 p-2 m-1"
      >Learn More</button>
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
  <div className="
    border-red-100 border-2 rounded-xl
    flex flex-col justify-evenly 
    xs:w-screen sm:w-1/3
    h-2/3
    p-5
    relative
    m-1
    bg-gray-200">
    <img 
      alt={vault.symbol + '-icon'}
      className="absolute top-3 left-3"    
    />
    <h2 className="text-center text-lg italic m-5">{ vault.name }</h2>
    <p>{ vault.description }</p>
    <div className="details">
      <p>APY: {vault.stats.APY} %</p>
    </div>
    <section>
      <button
        className="bg-blue-500 border-2 border-blue-500 hover:bg-transparent rounded-md px-2 py-1 mx-1"
      >Deposit
      </button>
      <button
        className="border-blue-500 border-2 hover:bg-blue-500 rounded-md py-1 px-2 mx-1"
      >Withdraw
      </button>
    </section>
  </div>
) 

const VaultList = ({ vaults }: { vaults: Vault[] }): JSX.Element => (
  <section
    id="vault-list"
    className="h-screen flex flex-row flex-wrap align-middle justify-center"
    >
    {vaults.map(v => (<Vault key={v.symbol} vault={v}/>))}
  </section>
)

const Header = ({ setShow }: { setShow: (show: boolean) => void }) => (
  <header className="
   border-2
   flex justify-between
   fixed w-full
   z-10
   bg-white
   ">
    <img className="logo" alt="PieDAO logo" />
    <h1>Mono Vaults</h1>
    <button onClick={() => setShow(true)}>Connect Web 3</button>
  </header>
)

const Web3Modal = ({ show, setShow }: { show: boolean, setShow: (show: boolean) => void }): JSX.Element => (
  <>{ 
    show &&
      <div className="
        fixed
        flex
        w-1/2
        h-1/3
        inset-1/4
        top-1/3
        bg-white
        flex-col
        justify-evenly
        items-center
        z-10
        border-orange-300
        border-2
        rounded-lg
      ">
        <h3>Connect to Metmask</h3>
        <p>Hit the popup to continue</p>
        <button
          className="border-orange-400 border-2 rounded-md w-1/2"
          onClick={() => setShow(false)}
        >CLOSE</button>
      </div>
  }</> 
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
  },
  {
    symbol: 'DAI',
    name: 'StableCoin DAI',
    description: 'High yield stablecoin farming from DAI',
    network: 'Polygon',
    stats: {
      APY: 14.7
    } 
  }
];
  const [show, setShow] = useState(false);
  return (
    <div className="App">
      <Web3Modal show={show} setShow={setShow} />
      <Header setShow={setShow}/>
      <Hero />
      <section id="content">
        <div className="spacer my-10 h-1"/>
        <h1 className="text-3xl m-10">Vaults</h1>
        <VaultList vaults={data} />
      </section>
    </div>
  );
} 

export default App;

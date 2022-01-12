// import { abi as MulticallABI } from '@uniswap/v3-periphery/artifacts/contracts/lens/UniswapInterfaceMulticall.sol/UniswapInterfaceMulticall.json'
import { InjectedConnector } from '@web3-react/injected-connector'
import { BigNumber, Contract, ethers, providers, utils } from 'ethers'
import { useEffect, useMemo, useState } from 'react'
import { Mono } from '../../types/abi/Mono'
import { Erc20 } from '../../types/abi/Erc20'
import MonoABI from '../../abi/mono.json'
import ERC20ABI from '../../abi/erc20.json'
import { providers as multicallProviders } from '@0xsequence/multicall'

// import ERC20ABI from '../../abi/erc20.json'
import { Web3Provider } from '@ethersproject/providers'
import { MulticallProvider } from '@0xsequence/multicall/dist/declarations/src/providers'

export const getMonoContract = (provider: ethers.providers.Web3Provider | MulticallProvider, vaultAddress: string) => {
  return new Contract(vaultAddress, MonoABI, provider) as Mono
}

export const getContract = (provider: any) => {
  if (provider) {
    
    const _provider = new ethers.providers.Web3Provider(provider);
    const multicallProvider = new multicallProviders.MulticallProvider(_provider);
    const ethersDefaultProvider = ethers.providers.getDefaultProvider();
    
    console.debug({
      ethersDefaultProvider,
      originalProvider: provider,
      ethersProvider: _provider,
      multicallProvider
    })
    
    if (provider) {
      return new Contract(MONO_ADDRESS, MonoABI, multicallProvider) as Mono;
    }
  }
}


export const tokenContract = (provider: ethers.providers.Web3Provider | MulticallProvider, tokenAddress: string) => {
  // const _provider = new ethers.providers.Web3Provider(provider);
  return new Contract(tokenAddress, ERC20ABI, provider) as Erc20
}

const getTotalValue = async () => {
  return 
}

export default function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(
    provider,
    typeof provider.chainId === 'number'
      ? provider.chainId
      : typeof provider.chainId === 'string'
      ? parseInt(provider.chainId)
      : 'any'
  )
  library.pollingInterval = 12000;
  return library
}


const MONO_ADDRESS = '0x6bd0d8c8ad8d3f1f97810d5cc57e9296db73dc45';
enum ChainIds {
  POLYGON = 137,
  MAINNET = 1
};


export const injected = new InjectedConnector({
  supportedChainIds: [
    ChainIds.POLYGON, ChainIds.MAINNET
  ]
});

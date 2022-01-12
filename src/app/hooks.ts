import { useWeb3React } from '@web3-react/core';
import MulticallABI from '../abi/multicall.json';
import { useEffect, useState, useMemo } from 'react';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './store';
import { Web3Provider } from '@ethersproject/providers';
import { Contract, BigNumber } from 'ethers';
import { getContract, getMonoContract, injected, tokenContract } from '../features/vault/vaultAPI';
import { UniswapInterfaceMulticall } from '../types/abi/UniswapInterfaceMulticall';
import { MULTICALL_ADDRESS } from '../constants';
import { providers } from '@0xsequence/multicall';
import { Vault } from '../features/vault/vaultSlice';
import { MulticallProvider } from '@0xsequence/multicall/dist/declarations/src/providers';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const getVaultContract = (vaults: Vault[], contract: keyof Vault['addresses']) => vaults.map((v) => v.addresses[contract]);

export const useMultiCallProvider = (
  connector: AbstractConnector,
): MulticallProvider | undefined => {
  const [provider, setProvider] = useState<MulticallProvider | undefined>();
  const { library } = useWeb3React();
  useEffect(() => {
    if (library) {
      const multicallProvider = new providers.MulticallProvider(library);
      setProvider(multicallProvider as any);
    }
  }, [library]);
  return provider;
};

export const useMulticallUserBalances = () => {
  const [balances, setBalances] = useState<BigNumber[]>([]);
  const provider = useMultiCallProvider(injected);
  const { account } = useWeb3React();
  const tokens = useAppSelector((state) => getVaultContract(state.vault.vaults, 'token'));
  if (provider && account) {
    Promise.all(
      tokens.map((t) => {
        const contract = tokenContract(provider, t);
        return contract.balanceOf(account);
      }),
    ).then((b) => setBalances(b));
  }
  return balances
};

export const useMulticallVaultDeposits = () => {
  const [deposits, setDeposits] = useState<BigNumber[]>([]);
  const provider = useMultiCallProvider(injected);
  const { account } = useWeb3React();
  const vaults = useAppSelector((state) => getVaultContract(state.vault.vaults, 'vault'));
  if (provider && account) {
    Promise.all(
      vaults.map((v) => {
        const contract = getMonoContract(provider, v);
        return contract.totalSupply();
      }),
    ).then((b) => setDeposits(b));
  }
  return deposits
};

export const useUserBalances = () => {
  const provider = useWeb3Provider(injected);
  const { account } = useWeb3React();
  const contract = useMonoContract(provider);
  const tokens = useAppSelector((state) => getVaultContract(state.vault.vaults, 'token'));
  if (provider && account) {
    Promise.all(
      tokens.map((t) => {
        const token = tokenContract(provider, t);
        return token.balanceOf(account);
      }),
    ).then((res) => console.debug({ res }));
  }
};

export const useActiveWeb3 = (): boolean => {
  /**
   * This activates the web3-react provider
   */
  const { activate, active } = useWeb3React<Web3Provider>();
  useEffect(() => {
    if (!active) {
      activate(injected).then(() => {
        console.info('Activated Connection');
      });
    }
  }, [activate, active]);
  return active;
};

export const useWeb3Provider = (connector: AbstractConnector): Web3Provider | undefined => {
  const [provider, setProvider] = useState();
  useEffect(() => {
    connector.getProvider().then((p) => {
      setProvider(p);
    });
  }, [connector]);
  return provider;
};

export function useContract(provider: any) {
  return useMemo(() => {
    const contract = new Contract(
      MULTICALL_ADDRESS,
      MulticallABI,
      provider,
    ) as UniswapInterfaceMulticall;
    return contract;
  }, []);
}

export function useMonoContract(provider: Web3Provider | undefined) {
  return getContract(provider);
}

export function useLatestBlock(provider: any): number | undefined {
  const [blockNumber, setBlockNumber] = useState<number | undefined>(undefined);
  useEffect(() => {
    if (!provider) return;
    const onBlock = (num: number) => setBlockNumber(num);
    provider.on('block', onBlock);
    return () => {
      provider.off('block', onBlock);
    };
  }, [provider, setBlockNumber]);
  return blockNumber;
}

export function useContractCall(provider: Web3Provider | undefined) {
  const contract = useMonoContract(provider);
  contract?.totalSupply().then((data) => console.debug(data));
}

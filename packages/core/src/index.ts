import { Horizon } from '@stellar/stellar-sdk';

export function getHorizonServer(url: string): Horizon.Server {
  return new Horizon.Server(url);
}

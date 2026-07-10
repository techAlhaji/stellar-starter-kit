import { Horizon } from '@stellar/stellar-sdk';
import { getHorizonServer } from '@stellar-starter-kit/core';

export class StellarClient {
  private server: Horizon.Server;

  constructor(horizonUrl: string) {
    this.server = getHorizonServer(horizonUrl);
  }

  getServer(): Horizon.Server {
    return this.server;
  }
}

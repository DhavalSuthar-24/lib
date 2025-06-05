import { Signer } from "@web3-kms-signer/core";

export interface ICryptoKey {
  /**
   * @returns KMS key
   */
  createCryptoKeyAsync(): Promise<string>;

  /**
   * @returns Wallet address
   */
  getWalletAddressAsync(cryptoKeyId: string, cryptoSigner): Promise<string>;

  /**
   * @returns KMS signer
   */
  createSignerAsync(chainId: number): Promise<Signer>;

  /**
   * @returns KMS signer
   */
  deleteCryptoKeyAsync(cryptoKeyId: string): Promise<boolean>;
}

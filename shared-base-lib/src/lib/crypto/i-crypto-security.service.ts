export interface ICryptoSecurityService {
  encryptSecretAsync(text: string): Promise<string>;
  decryptSecretAsync(encrypted: string): Promise<string>;
}

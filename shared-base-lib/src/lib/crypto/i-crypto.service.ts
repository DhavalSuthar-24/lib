export interface ICryptoService<TPayload> {
  encryptAsync(payload: TPayload): Promise<string>;
  decryptAsync(encrypted: string): Promise<TPayload>;
}

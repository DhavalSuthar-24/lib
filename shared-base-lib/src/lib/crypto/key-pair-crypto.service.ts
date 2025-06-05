import { IConstructor } from "../types";
import { ICryptoService } from "./i-crypto.service";
import * as crypto from "crypto";
import { CryptoException } from "./crypto.exception";
import { EMPTY_STR, fromJson, toJson } from "@bit-core-api/shared-utils-lib";
export class KeyPairCryptoService<TPayload> implements ICryptoService<TPayload> {
  protected readonly passphrase: string;

  constructor(protected readonly privateKey: string, protected readonly publicKey: string, passphrase?: string, protected readonly payloadType?: IConstructor<TPayload>) {
    this.passphrase = passphrase ?? EMPTY_STR;
  }

  public encryptAsync(payload: TPayload): Promise<string> {
    const json = toJson(payload);
    return this.encryptStringAsync(json);
  }

  public async decryptAsync(encrypted: string): Promise<TPayload> {
    const decrypted = await this.decryptStringAsync(encrypted);
    return fromJson<TPayload>(decrypted, this.payloadType);
  }

  protected async encryptStringAsync(text: string): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        const buff = Buffer.from(text, "utf8");
        const encr = crypto.publicEncrypt(this.publicKey, buff);
        const b64 = encr.toString("base64");
        resolve(b64);
      } catch (ex) {
        reject(new CryptoException(ex));
      }
    });
  }

  protected async decryptStringAsync(encrypted: string): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        const b64 = Buffer.from(encrypted, "base64");
        const buff = crypto.privateDecrypt({ key: this.privateKey, passphrase: this.passphrase }, b64);
        const decr = buff.toString("utf8");
        resolve(decr);
      } catch (ex) {
        reject(new CryptoException(ex));
      }
    });
  }
}

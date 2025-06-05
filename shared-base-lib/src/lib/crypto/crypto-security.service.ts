import { PinoLogger } from "nestjs-pino";
import { ICryptoSecurityOptions } from "./options";
import { AES, enc } from "crypto-js";
import { ICryptoSecurityService } from "./i-crypto-security.service";

export abstract class CryptoSecurityService implements ICryptoSecurityService {
  protected constructor(protected readonly options: ICryptoSecurityOptions, protected readonly logger: PinoLogger) {}

  public async encryptSecretAsync(text: string): Promise<string> {
    const encryptedKey = AES.encrypt(text, this.options.secretKey).toString();
    return encryptedKey;
  }

  public async decryptSecretAsync(encrypted: string): Promise<string> {
    const decryptedKey = AES.decrypt(encrypted, this.options.secretKey).toString(enc.Utf8);
    return decryptedKey;
  }
}

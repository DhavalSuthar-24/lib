import * as os from "os";
import { IDecodedIdResponse } from "./domain";
import { Injectable } from "@nestjs/common";

@Injectable()
export class Snowflake {
  private epoch: number;
  private machineId: number;
  private sequence: number;
  private lastTimestamp: number;

  constructor(epoch = 1700000000000) {
    this.epoch = epoch;
    this.machineId = this.generateUniqueMachineId(); // 10 bits for machineId (0-1023)
    this.sequence = 1;
    this.lastTimestamp = -1;
  }

  public generateUniqueId(): string {
    let timestamp = this.currentTimestamp();

    if (timestamp < this.lastTimestamp) {
      throw new Error("Clock moved backwards. Refusing to generate ID.");
    }

    if (timestamp === this.lastTimestamp) {
      this.sequence = (this.sequence + 1) & 0xfff; // 12 bits for sequence
      if (this.sequence === 1) {
        while (timestamp <= this.lastTimestamp) {
          timestamp = this.currentTimestamp();
        }
      }
    } else {
      this.sequence = 1;
    }

    this.lastTimestamp = timestamp;

    // Combine parts to create a unique ID
    return (
      (BigInt(timestamp) << BigInt(22)) |
      (BigInt(this.machineId) << BigInt(12)) | // 10 bits for machineId (shifted to the appropriate position)
      BigInt(this.sequence)
    ).toString();
  }

  public decodeId(id: string, epoch?: number): IDecodedIdResponse {
    if (!epoch) {
      epoch = 1700000000000;
    }
    // Convert the ID to a BigInt
    const bigIntId = BigInt(id);

    // 41 bits for timestamp, shift the ID by 22 to get the timestamp
    const timestamp = Number(bigIntId >> BigInt(22));

    // Extract the machineId (next 10 bits), shift the ID by 12 bits (timestamp + sequence) and mask with 0x3FF (10 bits)
    const machineId = Number((bigIntId >> BigInt(12)) & BigInt(0x3ff));

    // Extract the sequence (last 12 bits), mask with 0xFFF (12 bits)
    const sequence = Number(bigIntId & BigInt(0xfff));

    // Calculate the actual timestamp by adding the epoch back
    const actualTimestamp = epoch + timestamp;

    return {
      timestamp: actualTimestamp,
      machineId: machineId,
      sequence: sequence,
    };
  }

  private currentTimestamp() {
    return Date.now() - this.epoch;
  }

  private generateUniqueMachineId(): number {
    // Step 1: Get the MAC address of the first non-internal network interface
    const networkInterfaces = os.networkInterfaces();
    let macAddress = null;

    for (const interfaceName in networkInterfaces) {
      for (const networkInterface of networkInterfaces[interfaceName]) {
        if (!networkInterface.internal && networkInterface.mac !== "00:00:00:00:00:00") {
          macAddress = networkInterface.mac;
          break;
        }
      }
      if (macAddress) break;
    }
    if (!macAddress) {
      throw new Error("Unable to find a valid MAC address.");
    }

    // Step 2: Convert MAC address to a number
    const macAsNumber = parseInt(macAddress.replace(/:/g, ""), 16); // Convert MAC address to a number
    const uniqueId = macAsNumber % 1024; // 10-bit range

    return uniqueId;
  }
}

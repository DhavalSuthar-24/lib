import { EBeingLevel } from "./e-being-level";
import { EHardwareLevel } from "./e-hardware-level";

export const BEING_ID_LABELS = {
  [EBeingLevel.Level1]: "Government Direct",
  [EBeingLevel.Level2]: "DMV Direct at Address",
  [EBeingLevel.Level3]: "DMV Direct",
  [EBeingLevel.Level4]: "DMV Verified at Address",
  [EBeingLevel.Level5]: "DMV Verified",
  [EBeingLevel.Level6]: "ID Scan (Unverified) at Address",
  [EBeingLevel.Level7]: "ID Scan (Unverified)",
  [EBeingLevel.Level8]: "Passport Analysis",
  [EBeingLevel.Level9]: "Event Interaction",
  [EBeingLevel.Level10]: "Liveness Check",
};

export const getBeingIdDescription = (level: number): string => {
  return BEING_ID_LABELS[+level];
};

export const getDeviceLevelDescription = (level: EHardwareLevel): { label: string; color: string; bgColor: string } => {
  switch (level) {
    case EHardwareLevel.LevelA:
      return { label: "Stationary Kiosk on BIT Trusted Network", color: "#80C342", bgColor: "#d3e9bb" };
    case EHardwareLevel.LevelB:
      return { label: "Floating Kiosk on BIT Trusted Network", color: "#80C342", bgColor: "#8BE7A9" };
    case EHardwareLevel.LevelC:
      return { label: "Verifed Personal Devices on Public Network", color: "#80C342", bgColor: "#81B79A" };
    case EHardwareLevel.LevelD:
      return { label: "Unverifed Personal Devices on Public Network", color: "#80C342", bgColor: "#989596" };
  }
};

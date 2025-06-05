export interface IEndUserOrg {
  userId: string;
  orgId: string;
  startedAt: Date;
  jobTitle: string;
  endedAt?: Date;
  blocked?: boolean;
}

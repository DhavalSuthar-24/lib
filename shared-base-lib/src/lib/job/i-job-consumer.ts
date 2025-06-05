import { Job } from "bull";

export interface IJobConsumer<TJobData> {
  processAsync(job: Job<TJobData>): Promise<void>;

  /**
   *
   * Must use with `@OnQueueActive()` decorator
   */
  onActiveAsync(job: Job<TJobData>): Promise<void>;

  /**
   *
   * Must use with `@OnQueueCompleted()` decorator
   */
  onCompletedAsync(job: Job<TJobData>): Promise<void>;

  /**
   *
   * Must use with `@OnQueueFailed()` decorator
   */
  onFailedAsync(job: Job<TJobData>): Promise<void>;
}

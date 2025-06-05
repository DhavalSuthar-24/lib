import { CronRepeatOptions, EveryRepeatOptions, Job, JobId, JobInformation, JobOptions, JobStatus } from "bull";

export interface IBaseJobService {
  /**
   * Creates a new named job and adds it to the queue.
   * If the queue is empty the job will be executed directly,
   * otherwise it will be placed in the queue and executed as soon as possible.
   */
  addAsync<T>(name: string, data: T, opts?: JobOptions): Promise<Job<T>>;

  /**
   * Adds an array of jobs to the queue.
   * If the queue is empty the jobs will be executed directly,
   * otherwise they will be placed in the queue and executed as soon as possible.
   * 'repeat' option is not supported in addBulk https://github.com/OptimalBits/bull/issues/1731
   */
  addBulkAsync<T>(
    jobs: Array<{
      name?: string | undefined;
      data: T;
      opts?: Omit<JobOptions, "repeat"> | undefined;
    }>,
  ): Promise<Array<Job<T>>>;

  /**
   * Returns a promise that will return an array of job instances of the given job statuses.
   * Optional parameters for range and ordering are provided.
   */
  getJobsAsync<T>(types: JobStatus[], start?: number, end?: number, asc?: boolean): Promise<Array<Job<T>>>;

  /**
   * Returns a promise that will return the job instance associated with the jobId parameter.
   * If the specified job cannot be located, the promise callback parameter will be set to null.
   */
  getJobAsync<T>(jobId: JobId): Promise<Job<T> | null>;

  /**
   * Removes a job from the queue and from any lists it may be included in.
   * The returned promise resolves when the job has been removed.
   */
  removeJobAsync(jobId: JobId): Promise<boolean>;

  /**
   * Returns JobInformation of repeatable jobs (ordered descending). Provide a start and/or an end
   * index to limit the number of results. Start defaults to 0, end to -1 and asc to false.
   */
  getRepeatableJobsAsync(processName?: string, start?: number, end?: number, asc?: boolean): Promise<JobInformation[]>;

  /**
   * Removes a given repeatable job by key.
   */
  removeRepeatableByKeyAsync(key: string): Promise<void>;

  /**
   * Removes a given repeatable job. The RepeatOptions and JobId needs to be the same as the ones
   * used for the job when it was added.
   */
  removeRepeatableAsync(
    repeat: (CronRepeatOptions | EveryRepeatOptions) & {
      jobId?: JobId;
    },
  ): Promise<void>;
}

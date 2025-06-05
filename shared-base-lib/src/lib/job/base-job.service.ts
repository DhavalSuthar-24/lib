import { JobOptions, Job, JobId, JobInformation, CronRepeatOptions, EveryRepeatOptions, Queue, JobStatus } from "bull";
import { IBaseJobService } from "./i-base-job.service";
import { PinoLogger } from "nestjs-pino";
import { JobServiceException } from "./exceptions";
import { filter, isNil, isNilOrEmpty } from "@bit-core-api/shared-utils-lib";

export abstract class BaseJobService implements IBaseJobService {
  constructor(protected readonly queue: Queue, protected readonly logger: PinoLogger) {}

  public async addAsync<T>(name: string, data: T, opts?: JobOptions): Promise<Job<T>> {
    try {
      const res = await this.queue.add(name, data, opts);
      return res;
    } catch (ex) {
      this.logger.error(ex);
      throw new JobServiceException(ex);
    }
  }

  public async addBulkAsync<T>(jobs: { name?: string; data: T; opts?: Omit<JobOptions, "repeat"> }[]): Promise<Job<T>[]> {
    try {
      const res = await this.queue.addBulk(jobs);
      return res;
    } catch (ex) {
      this.logger.error(ex);
      throw new JobServiceException(ex);
    }
  }

  public async getJobsAsync<T>(types: JobStatus[], start?: number, end?: number, asc?: boolean): Promise<Job<T>[]> {
    try {
      const jobs = await this.queue.getJobs(types, start, end, asc);
      return jobs;
    } catch (ex) {
      this.logger.error(ex);
      throw new JobServiceException(ex);
    }
  }

  public async getJobAsync<T>(jobId: JobId): Promise<Job<T>> {
    try {
      const job = await this.queue.getJob(jobId);
      return job;
    } catch (ex) {
      this.logger.error(ex);
      throw new JobServiceException(ex);
    }
  }

  public async removeJobAsync(jobId: JobId): Promise<boolean> {
    try {
      const job = await this.getJobAsync(jobId);
      if (!isNilOrEmpty(job)) {
        job.remove();
      }
      return true;
    } catch (ex) {
      this.logger.error(ex);
      throw new JobServiceException(ex);
    }
  }

  public async getRepeatableJobsAsync(processName?: string, start?: number, end?: number, asc?: boolean): Promise<JobInformation[]> {
    try {
      let jobs = await this.queue.getRepeatableJobs(start, end, asc);
      if (!isNil(processName)) {
        jobs = filter(jobs, (j) => j.key.includes(processName));
      }
      return jobs;
    } catch (ex) {
      this.logger.error(ex);
      throw new JobServiceException(ex);
    }
  }

  public async removeRepeatableByKeyAsync(key: string): Promise<void> {
    try {
      await this.queue.removeRepeatableByKey(key);
    } catch (ex) {
      this.logger.error(ex);
      throw new JobServiceException(ex);
    }
  }

  public async removeRepeatableAsync(repeat: (CronRepeatOptions | EveryRepeatOptions) & { jobId?: JobId }): Promise<void> {
    try {
      await this.queue.removeRepeatable(repeat);
    } catch (ex) {
      this.logger.error(ex);
      throw new JobServiceException(ex);
    }
  }
}

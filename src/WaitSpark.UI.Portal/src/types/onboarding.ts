export type JobStatus = 'Queued' | 'Started' | 'Completed' | 'Failed'

/** Body of `POST /api/v1/tenants/{publicId}/jobs`. */
export interface CreateJobRequest {
  task: 'Website'
  websiteUrl: string
}

/** Response of `POST /api/v1/tenants/{publicId}/jobs`: 201 for a new job, 200 for the already active one. */
export interface JobDto {
  id: string
  status: JobStatus
  statusMessage: string | null
}

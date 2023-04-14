import { Resource } from './resource';

export class JobTitle extends Resource {
    statusDateModified?: string;
    jobType?: number;
    isSystem?: boolean;
    statusInfo?: {};
    typeInfo?:{};
  }

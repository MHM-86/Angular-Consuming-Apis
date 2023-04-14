import { Resource } from './resource';

export class EmailTemplate extends Resource {
  public isGlobal!: boolean;
  public enSubjectTemplate!: string;
  public enBodyTemplate!: string;
  public arSubjectTemplate!: string;
  public arBodyTemplate!: string;
}
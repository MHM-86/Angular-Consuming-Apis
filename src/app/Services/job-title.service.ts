import { Resource } from '../Models/resource';
import { ResourceService } from './resource.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Serializer } from '../Models/serializer';
import { JobTitle } from '../Models/job-title.model';

@Injectable({ providedIn: 'root' })
export class JobTitleService extends ResourceService<JobTitle> {
    constructor(httpClient: HttpClient) {
        super(
            httpClient,
            environment.JOB_TITLE_ENDPOINT,
            new Serializer(JobTitle),
            );
    }
}
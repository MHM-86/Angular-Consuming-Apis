import { ResourceService } from './resource.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Serializer } from '../Models/serializer';
import { EmailTemplate } from '../Models/email-template.model';

@Injectable({ providedIn: 'root' })
export class EmailTemplateService extends ResourceService<EmailTemplate> {
    constructor(httpClient: HttpClient) {
        super(
            httpClient,
            environment.EMAIL_TEMPLATE_ENDPOINT,
            new Serializer(EmailTemplate),
        );
    }
}
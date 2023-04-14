import { Component, OnInit } from '@angular/core';
import { AuthService } from './Services/auth.service';
import { LogInCredentials } from './Models/log-in-credentials.model';
import { JobTitleService } from './Services/job-title.service';
import { EmailTemplateService } from './Services/email-template.service';
import { JobTitle } from './Models/job-title.model';
import { EmailTemplate } from './Models/email-template.model';
import { of, Observable, concat } from 'rxjs';
import { take } from 'rxjs/operators'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Consuming_APIs';
  jobTitleId: number;
  constructor(
    private authService: AuthService,
    private jobTitleService: JobTitleService,
    private emailTemplateService: EmailTemplateService,
  ) {
    this.jobTitleId = 15;
  }

  ngOnInit(): void {
    let lang: string = "AR"; // get this from some where in UI
    let userCredential: LogInCredentials = { userName: 'cdiadmin', userPassword: 'P@ssw0rd' }

    this.authService.login(lang, userCredential).subscribe((result) => {
      console.log('log in:', result);

      let randomString: string = `-${Date.now().toString(36)}`;

      let newJobTitle: JobTitle = {
        arName: 'محمد' + randomString,
        enName: 'Mohammad' + randomString,
        status: 1,
        isSystem: false,
        jobType: 1,

      };
      // this.CreateJobTite(newJobTitle);
      this.CreateJobTite(newJobTitle)

      let newEmailTemplate: EmailTemplate = {
        arName: 'أحمد' + randomString,
        enName: 'Ahmad' + randomString,
        status: 1,
        isGlobal: false,
        enBodyTemplate: '',
        arBodyTemplate: '',
        arSubjectTemplate: '',
        enSubjectTemplate: '',
      };
      this.CreateEmailTemplate(newEmailTemplate);
    });


  }

  //#region Job Title Methods
  CreateJobTite(jobTitle: JobTitle) {
    this.jobTitleService.create(jobTitle).subscribe({
      next: result => {
        console.log('Job title created', result);
        this.jobTitleId = result.id ?? 15;
        this.ReadJobTitle(this.jobTitleId);

      },
      error: error => {
        console.log('Error in creating new Job Title', error);
      }
    });
  }

  ReadJobTitle(jobTitleId: number) {
    let randomString: string = `-${Date.now().toString(36)}`;
    //get job-title by Id
    this.jobTitleService.read(jobTitleId).subscribe({
      next: result => {
        console.log(`Job Title With Id ${jobTitleId}: `, result);
        let modifiedJobTitle: JobTitle = {
          id: this.jobTitleId,
          arName: 'أحمد' + randomString,
          enName: 'Ahmad' + randomString,
          status: 1,
          isSystem: false,
          jobType: 1,

        };
        this.UpdateJobTitle(modifiedJobTitle);
      },
      error: err => {
        console.log(" Error In Reading Job Title", err)
      }
    });
  }

  UpdateJobTitle(modifiedJobTitle: JobTitle) {
    this.jobTitleService.update(modifiedJobTitle).subscribe({
      next: result => {
        console.log(`Updated Job Title With Id ${result.id}: `, result);

        //delete job-title after update it 
        this.DeleteJobTitle(result.id ?? 15)
      },
      error: err => {
        console.log(" Error In Updating Job Title", err)
      }
    });
  }

  DeleteJobTitle(jobTitleId: number) {
    this.jobTitleService.delete(jobTitleId).subscribe({
      next: (result) => {
        console.log(`Delete Job Title With Id: ${jobTitleId}`, result);
        this.GetAllJobTitles();
      },
      error: (err) => {
        console.error("Error Deleting Job Title: ", err);
      }
    });
  }

  GetAllJobTitles() {
    this.jobTitleService.list().subscribe((result) => {
      console.log('List Of Job Titles:', result)
    }
    );
  }
  //#endregion

  //#region Email Template Methods
  CreateEmailTemplate(emailTemplate: EmailTemplate) {
    this.emailTemplateService.create(emailTemplate).subscribe({
      next: result => {
        console.log('Email Template created', result);
        this.ReadEmailTemplate(result.id ?? 15);
      },
      error: error => {
        console.log('Error in creating new Email Template', error)
      }
    });
  }

  ReadEmailTemplate(emailTemplateId: number) {
    let randomString: string = `-${Date.now().toString(36)}`;
    //get job-title by Id
    this.emailTemplateService.read(emailTemplateId).subscribe({
      next: result => {
        console.log(`Email Template With Id ${emailTemplateId}: `, result);
        let modifiedEmailTemplate: EmailTemplate = {
          id: emailTemplateId,
          arName: 'أحمد' + randomString,
          enName: 'Ahmad' + randomString,
          status: 1,
          isGlobal: false,
          enBodyTemplate: '',
          arBodyTemplate: '',
          arSubjectTemplate: '',
          enSubjectTemplate: '',
        };
        this.UpdateEmailTemplate(modifiedEmailTemplate);
      },
      error: err => {
        console.log(" Error In Reading Email Template ", err)
      }
    });
  }

  UpdateEmailTemplate(modifiedEmailTemplate: EmailTemplate) {
    this.emailTemplateService.update(modifiedEmailTemplate).subscribe({
      next: result => {
        console.log(`Updated Email Template With Id ${result.id}: `, result);

        //delete job-title after update it 
        this.DeleteEmailTemplate(result.id ?? 15)
      },
      error: err => {
        console.log(" Error In Updating Job Title", err)
      }
    });
  }

  DeleteEmailTemplate(emailTemplateId: number) {
    this.emailTemplateService.delete(emailTemplateId).subscribe({
      next: (result) => {
        console.log(`Delete Email Template With Id: ${emailTemplateId}`, result);
        this.GetAllEmailTemplates();
      },
      error: (err) => {
        console.error("Error in Deleting Email Template: ", err);
      }
    });
  }

  GetAllEmailTemplates() {
    this.emailTemplateService.list().subscribe((result) => {
      console.log('List Of All Email Templates:', result)
    }
    );
  }
  //#endregion
}

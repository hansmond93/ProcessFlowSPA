import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { ProjectService } from '../_services/project.service';
import { AuthService } from '../_services/auth.service';
import { Project } from '../_models/project';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  project: Project; //to hold project to post to server
  projects: Project[];
  projectTabIndex: number;
  projectTabDisabled: boolean = false;
  newProjectTabDisabled: boolean = true;
  newProjectForm: FormGroup;
  displayedColumns: string[] = ['projectTitle', 'durationInMonths', 'proposedAmount', 'location', 'companyName', 'approvalStatusId'];

  constructor(private projectService: ProjectService,
                      private fb: FormBuilder,
                      private authService: AuthService,
                      private sanitizer: DomSanitizer
                      ) { }

  ngOnInit(): void {
    this.getAllProjectsByStaffId();
    this.createProjectForm();
  }

  createProjectForm() {
    this.newProjectForm = this.fb.group({
      projectTitle: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      durationInMonths: ['', [Validators.required, Validators.min(1)]],
      proposedAmount: ['', [Validators.required]],
      approvedAmount: ['', ],
      location: ['', [Validators.required]],
      contactPerson: ['', [Validators.required]],
      contactNumber: ['', [Validators.required]],
      contactAddress: ['', [Validators.required]],
      companyName: ['', [Validators.required]],
      companyEmail: ['', [Validators.required, Validators.email]]

    });
  }

  //use this to add a project serial number that can be used for searching
  generateRandomNumber() {
    //project serial
  }

  getAllProjectsByStaffId() {
    this.projectService.getAllProjectByUser(+this.authService.getStaffId()).subscribe((data) => {
      this.projects = data;
      console.log(this.projects);
    }, (error) => {
      console.log(error);
    });
  }

  createNewProject() {
    console.log('clicked!!!');
    this.newProjectTabDisabled = false;
    this.projectTabIndex = 1;
    //this.projectTabDisabled = true;
  }

  onTabClick(event) {
    console.log(event);
  }

  postProject() {
    if(this.newProjectForm.valid) {
      this.project = Object.assign({}, this.newProjectForm.value);
      console.log(this.project);
      this.projectService.createProject(this.project).subscribe((response) => {
        console.log('Project Created Successfully')
      }, (err) => {
        console.log(err);
      }, () => {
        this.getAllProjectsByStaffId(); //push into the array of project using javascript rather than calling the backend again
        //make sure I chnage the tab to the new TAB and clear the Form
      });
    }

  }

  cancel() {
    //swal are u sure?
    this.newProjectForm.reset();
  }

  ProcessApproval(approvalStatusId: number) {
    console.log(approvalStatusId);
    var returnValue;
    switch (approvalStatusId) {
      case 0:
        returnValue = this.sanitizer.bypassSecurityTrustHtml('<div style="background-color: orange; display: inline">Pending</div>');
        break;
      case 1:
        returnValue = this.sanitizer.bypassSecurityTrustHtml('<div style="background-color: yellow; display: inline">Processing</div>');
      case 2:
        returnValue = this.sanitizer.bypassSecurityTrustHtml('<div style="background-color: green; display: inline">Approved</div>');
      case 3:
          returnValue = this.sanitizer.bypassSecurityTrustHtml('<div style="background-color: red; display: inline">Rejected</div>');
      case 4:
          returnValue = this.sanitizer.bypassSecurityTrustHtml('<div style="background-color: purple; display: inline">Referred</div>');
      default:
        break;
    }

    return returnValue;
  }



  

}

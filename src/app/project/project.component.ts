import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { ProjectService } from '../_services/project.service';
import { AuthService } from '../_services/auth.service';
import { Project } from '../_models/project';

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
  displayedColumns: string[] = ['projectTitle', 'durationInMonths', 'proposedAmount', 'location', 'companyName'];

  constructor(private projectService: ProjectService,
                      private fb: FormBuilder,
                      private authService: AuthService
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
      });
    }

  }

  cancel() {
    //swal are u sure?
    this.newProjectForm.reset();
  }



  

}

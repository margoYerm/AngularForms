import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CoursesService} from '../../services/courses.service';
import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import { courseTitleValidator } from '../../validators/course-title.validator';
import { MatDatepicker } from '@angular/material/datepicker';
import { CourseCategory } from '../../model/course-category';

@Component({
  selector: 'create-course-step-1',
  templateUrl: './create-course-step-1.component.html',
  styleUrls: ['./create-course-step-1.component.scss']
})
export class CreateCourseStep1Component implements OnInit {
  form = this.fb.group({
    title: ['', {
      validators: [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(60)
      ],
      asyncValidators: [courseTitleValidator(this.courses)],
      updateOn: 'blur', //for check input after focus loose
    }],
    category: ['', Validators.required], // in lesson init val 'BEGINNER'
    releasedAt: [new Date(), Validators.required],    
    downloadsAllowed: [false, Validators.requiredTrue],
    longDescription: ['', [Validators.required, Validators.minLength(10)]]
  })

  courseCategories$: Observable<CourseCategory []> 

  // inject FormBuilder service
  constructor(
    private fb: FormBuilder,
    private courses: CoursesService
    ) {}
  
  ngOnInit() {
    this.courseCategories$ = this.courses.findCourseCategories();

    //Load form draft from local storage
    const draft = localStorage.getItem('STEP_1');
    if (draft) {
      //.setValue for all form, il exist .patchValue for couple controls
      this.form.setValue(JSON.parse(draft));
    }
    
    // Pre-save valid data in the form
    this.form.valueChanges
      //this.form.errors === null for check custom title validator - my opinion 
      .pipe( filter(() => this.form.valid || this.form.errors === null))
      .subscribe ((val) => localStorage.setItem('STEP_1', JSON.stringify(val)))      
        

  }

  get courseTitle() {
    return this.form.controls['title'];
  }
}

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { createPromoRangeValidator } from '../../validators/date-range.validator';


@Component({
  selector: 'create-course-step-2',
  templateUrl: 'create-course-step-2.component.html',
  styleUrls: ['create-course-step-2.component.scss']
})
export class CreateCourseStep2Component implements OnInit {

  form = this.fb.group({
    courseType: ['premium', Validators.required],
    price: [null, [
      Validators.required,
      Validators.min(1), //for numbers
      Validators.max(9999),
      Validators.pattern("[0-9]"), //it's mean that we can input just numbers
    ]],
    promoStartAt: [null], 
    promoEndAt: [null], 
  }, {
    validators: [createPromoRangeValidator()], // this array for form level 
    updateOn: 'blur',
  });

  constructor( private fb: FormBuilder) {}
  ngOnInit() {
    //this Observable will emit a value every time when form emit 
    //new value (valid or invalid) 
    this.form.valueChanges
      .subscribe( val => {
        const priceControl = this.form.controls["price"];
        if (val.courseType == 'free' && priceControl.enabled) {
          /*priceControl.patchValue(null, {          
            emitEvent:false,           
          }); 
          priceControl.disable() - this is my solution and after that
          the Validators.max(9999) not working, just 9*/ 

          //{emitEvent: false} for prevent infinity loop
          priceControl.disable({emitEvent: false});
        } else if (val.courseType == 'premium' && priceControl.disabled) {
          priceControl.enable({emitEvent: false});          
        }
      })
  }

}

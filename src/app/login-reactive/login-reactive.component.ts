import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { createPasswordStrengthValidator } from '../validators/password-strength.validator';


@Component({
  selector: 'login',
  templateUrl: './login-reactive.component.html',
  styleUrls: ['./login-reactive.component.css']
})
export class LoginReactiveComponent implements OnInit { 
  form = this.fb.group({
    //email - is name of control, '' - initial value, [] - validators
    email: ['', {//union type: '' | null by default
      validators: [Validators.required, Validators.email],
      updateOn: 'blur',
    }],
    //if we don't to email value can be null we can use this way of declaration
    // and after calling reset() this value will be '' (initial value)
    /*email: this.fb.nonNullable.control('', {
      validators: [Validators.required, Validators.email],
      updateOn: 'blur',
    }), */
    password: ['', [
      Validators.required, 
      Validators.minLength(8),
      createPasswordStrengthValidator(), //PasswordStrengthDirective(TD form)      
    ]],


  })

  //When we want to make nonNullable all form, we can use NonNullableFormBuilder
  // and declaring form like with FormBuilder 
  constructor(private fb: FormBuilder) {}

  ngOnInit() {}


  get email () {
    return this.form.controls['email'];
  }

  get password() {
    return this.form.controls['password']
  }

  login() {
    const formValue = this.form.value;
    this.form.patchValue({})
  }

  reset() {
    this.form.reset(); //build in method for forms, witch set all values = null 
    console.log(this.form.value);
  }
}

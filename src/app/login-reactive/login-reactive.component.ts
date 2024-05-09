import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { createPasswordStrengthValidator } from '../validators/password-strength.validator';


@Component({
  selector: 'login',
  templateUrl: './login-reactive.component.html',
  styleUrls: ['./login-reactive.component.css']
})
export class LoginReactiveComponent implements OnInit {
  //different way to define form control; in template - [formControl]
  password = new FormControl('', {
    validators: [
      Validators.required, 
      Validators.minLength(8),
      createPasswordStrengthValidator(), //PasswordStrengthDirective(TD form)
    ],
     
  });


  //here we defining form (1)
  form = new FormGroup ({
    //here we defining form controls with initial value '' (2)
    email: new FormControl('', {
      //here we defining validators to this form control
      validators: [Validators.required, Validators.email,],      
      updateOn: 'blur', //for update value after loosing focus
    }),  
    password: this.password,
  }); 

  constructor() {


  }

  ngOnInit() {

  }

}

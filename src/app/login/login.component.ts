import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor() {}

  ngOnInit() {}

  /* //for Login button
  login(loginForm: NgForm) {
    console.log(loginForm.value, loginForm.valid) //now this obg contains fields, that can be filled or empty, and true 
  }*/

  //For ngSubmit, with native event
  login(loginForm: NgForm, submit) {
    console.log(loginForm.value, loginForm.valid, submit) //{email: 'hello@gmai.com', password: 'azerty'} true, SubmitEvent {...}
  }

  

}

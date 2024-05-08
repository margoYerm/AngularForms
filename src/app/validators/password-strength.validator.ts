import {AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

//it's a factory function that returns a function
export function createPasswordStrengthValidator (): ValidatorFn { 
  //this fn return error or null for control (input, textarea etc. ) 
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null;
    } 
    const hasUpperCase = /[A-Z]+/.test(value); //this will return boolean
    const hasLowerCase = /[a-z]+/.test(value);
    const hasNumeric = /[0-9]+/.test(value);
    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;
    
    // if password is not valid -> we return ValidationErrors object with
    // true, if password is valid - we return null
    return !passwordValid ? {passwordStrength: true} : null;
  }
}
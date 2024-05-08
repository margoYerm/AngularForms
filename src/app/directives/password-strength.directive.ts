import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";
import { createPasswordStrengthValidator } from "../validators/password-strength.validator";

@Directive({
  selector: "[passwordStrength]",  
  providers: [{
    provide: NG_VALIDATORS, //we dont't want replace the content from ng validators, we just want add one more,    
    useExisting: PasswordStrengthDirective, // we adding new value linked to this key
    multi: true, //it's means that NG_VALIDATORS key contain multiple values
    //and PasswordStrengthDirective will be added to NG_VALIDATORS array validators
  }]
})

export class PasswordStrengthDirective implements Validator {
  //We creating validation directive for forms fields, so we need implements 
  //from Validator (forms), that require a validate function 
  validate(control: AbstractControl<any, any>): ValidationErrors {
    //validate fn has the same interface like our createPasswordStrengthValidator,
    //So, we can just call it for create the validation fn
    //(control) is for get the result of validation
    return createPasswordStrengthValidator() (control);// output -> validation result

  }
}
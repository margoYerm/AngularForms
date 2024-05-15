import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder, FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validator,
  Validators
} from '@angular/forms';
import {noop, Subscription} from 'rxjs';

@Component({
  selector: 'address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: AddressFormComponent
    }
  ]
})
export class AddressFormComponent implements ControlValueAccessor, OnDestroy {

    @Input()
    legend:string;

    onTouched = () => {}; //callback to registerOnTouched
    onChangeSub: Subscription; //subscription for registerOnChange

    form: FormGroup = this.fb.group({
        addressLine1: [null, [Validators.required]],
        addressLine2: [null, [Validators.required]],
        zipCode: [null, [Validators.required]],
        city: [null, [Validators.required]]
    });

    constructor(private fb: FormBuilder) {
    }

    //this method inform parent form that the value was changed
    registerOnChange(onChange: any) {
      //when this observable emits a new value we take this value and call onChange
      //this is the same logic with different syntax .subscribe(value => onChange(value))
      this.onChangeSub = this.form.valueChanges.subscribe(onChange)
    }
    ngOnDestroy(): void {
      this.onChangeSub.unsubscribe(); 
    }


    // this method is used by the parent form to write a new value 
    //to our child component, in this case - a composite form
    writeValue(value: any): void {
      if (value) { //value here is obj with control: value for all form fields
        this.form.setValue(value);
      }
    }

    registerOnTouched(onTouched: any): void {
      this.onTouched = onTouched;
    }

    //if flag disable true -> we disable all this form 
    setDisabledState(disabled: boolean): void {
      if (disabled) {
        this.form.disable();
      } else {
        this.form.enable();
      }
    }  
    
    
}




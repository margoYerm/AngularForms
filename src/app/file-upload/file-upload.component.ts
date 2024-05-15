import {Component, Input} from '@angular/core';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {catchError, finalize} from 'rxjs/operators';
import {AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator} from '@angular/forms';
import {noop, of} from 'rxjs';


@Component({
  selector: 'file-upload',
  templateUrl: "file-upload.component.html",
  styleUrls: ["file-upload.component.scss"],
  providers: [{//defined that this component is a part of form. Step 6
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: FileUploadComponent,
  }, {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: FileUploadComponent,
  }]
})

//ControlValueAccessor for make this component form control. Step 1 
export class FileUploadComponent implements ControlValueAccessor, Validator {
  @Input() requiredFileType: string;

  fileName = '';

  fileUploadError = false; //true if we get error in uploading file http.post

  fileUploadSuccess = false //Flag for validator

  uploadProgress: number //will be just in progress of uploading, another 0 or undefined

  // For ControlValueAccessor Step 3. Empty function
  onChange = (fileName: string) => {};

  // For ControlValueAccessor Step 4. Empty function
  onTouched = () => {};

  //For registerOnValidatorChange. Empty function
  onValidatorChange = () => {};

  // For ControlValueAccessor Step 5
  disabled: boolean = false;

  constructor( private http: HttpClient) {}

  onFileSelected(event) {
    // in our task we uploading 1 file, and this file is first elem in array 
    const file: File = event.target.files[0];
    //without if we will have error in the console if user cancel the upload dialog
    if (file) {
      this.fileName = file.name;
      console.log('Name of upload file', this.fileName);

      //this is standard browser functionality, it's can be use for create 
      //payload manually 
      const formDate = new FormData();
      formDate.append('thumbnail', file);
      this.fileUploadError = false;
      this.http.post('/api/thumbnail-upload', formDate, {
        reportProgress: true, //for uploadProgress
        observe: 'events', //return response from http.post (success or failed)
      })
        .pipe(
          catchError (err => {
            this.fileUploadError = true;
            // of() create a new observable, that emit new error value 
            //and complets then we can use this for message for user
            //and rethrowing the original error 
            return of(err);
          }),
          finalize(() => { //to perform when observable complets or error's out
            this.uploadProgress = null;
          })
        )
        .subscribe(event => {
          // here we using data from http.post obj params to show progress in %
          if(event.type == HttpEventType.UploadProgress) {
            this.uploadProgress = Math.round(100* (event.loaded / event.total));
          } else if (event.type == HttpEventType.Response ) {
            this.fileUploadSuccess = true; //for validator
            //for ControlValueAccessor Step 3 callback fn
            this.onChange(this.fileName);
            this.onValidatorChange(); //for call validation again
          }
        });
    }
    
  }

  onClick(fileUpload: HTMLInputElement) {
    this.onTouched();
    fileUpload.click();
  }

  //ControlValueAccessor Step 2. Value for formControlName
  writeValue(value: any) {
    this.fileName = value;
  }

  //ControlValueAccessor Step 3. Notify form that it has new value
  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  //ControlValueAccessor Step 4. Touched form control
  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  //ControlValueAccessor Step 5. Disable flag
  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  //Methods for validate this control
  registerOnValidatorChange(onValidatorChange: ()=> void) {
    
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (this.fileUploadSuccess) {
      return null;
    }
    let errors: any = {
      requiredFileType: this.requiredFileType,
    }
    if (this.fileUploadError) {
      errors.uploadFailed = true; //network or file not been uploaded at all
    }
    return errors;
  }
}

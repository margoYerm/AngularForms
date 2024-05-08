import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'onlyOneError' //by default is pure pipe, it's mean that it changing ones if the input changes
})
export class OnlyOneErrorPipe implements PipeTransform{
  transform(allErrors: any, errorsPriority: string[]) { //this method from the PipeTransform
    if (!allErrors) {
      return null;
    }
    const onlyOneError: any = {};
    for (let error of errorsPriority) {
      if (allErrors[error]) {
        onlyOneError[error] = allErrors[error];
        break;
      } 
    }
    return onlyOneError;
  }
}
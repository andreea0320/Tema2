import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, map, of } from 'rxjs';

export function capitalLetterValidator(control: AbstractControl): Observable<ValidationErrors | null> {
  const firstLetter = control.value?.charAt(0);
  const isCapital = firstLetter === firstLetter?.toUpperCase();
  return of(isCapital ? null : { capitalLetter: true }).pipe(
    map((result) => {
      if (result) {
        control.setErrors(result);
      } else {
        control.setErrors(null);
      }
      return result;
    })
  );
}
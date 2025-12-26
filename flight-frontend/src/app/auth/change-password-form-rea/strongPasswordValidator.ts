import { AbstractControl, ValidationErrors } from '@angular/forms';

export function strongPasswordValidator(
  control: AbstractControl
): ValidationErrors | null {

  const value: string = control.value || '';
  const errors: ValidationErrors = {};

  if (value.length < 8) errors['minLength'] = true;
  if (!/[A-Z]/.test(value)) errors['uppercase'] = true;
  if (!/[a-z]/.test(value)) errors['lowercase'] = true;
  if (!/\d/.test(value)) errors['number'] = true;
  if (!/[^A-Za-z0-9]/.test(value)) errors['special'] = true;

  return Object.keys(errors).length ? errors : null;
}

import { FormGroup } from '@angular/forms';

export interface DisplayMessage {
  [key: string]: string;
}
export interface ValidationMessages {
  [key: string]: { [key: string]: string };
}

export class GenericFormValidator {
  constructor(private validationMessages: ValidationMessages) {}

  processMessages(container: FormGroup): { [key: string]: string } {
    const messages = {};

    Object.keys(container.controls).forEach((controlKey) => {
      const control = container.controls[controlKey];

      if (control instanceof FormGroup) {
        const childMessages = this.processMessages(control);
        Object.assign(messages, childMessages);
      } else if (this.validationMessages[controlKey]) {
        messages[controlKey] = '';

        if ((control.dirty || control.touched) && control.errors) {
          Object.keys(control.errors).forEach((messageKey) => {
            if (this.validationMessages[controlKey][messageKey]) {
              messages[controlKey] += `${this.validationMessages[controlKey][messageKey]}<br />`;
            }
          });
        }
      }
    });

    return messages;
  }
}

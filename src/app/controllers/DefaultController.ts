/** @format */

import { Request } from 'express';
interface IValidateInputsResponse {
  invalidFields: string[];
  isValid: boolean;
}
class DefaultController {
  validateInputs(fields: string[], data: Request): IValidateInputsResponse {
    let invalidFields: string[];
    let isValid: boolean = true;
    fields.forEach((field) => {
      if (data.body[field] !== null) {
        invalidFields.push(field);
        isValid = false;
      }
    });
    return {
      invalidFields,
      isValid,
    };
  }
}
export default DefaultController;

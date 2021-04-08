/** @format */

import { isEmpty } from 'class-validator';
import { Request } from 'express';
interface IValidateInputsResponse {
  invalidFields: string[];
  isValid: boolean;
}
class DefaultController {
  /**
   * Method that verify if the body params of request is valid
   * @param fields Array of fields name for validate
   * @param data Request
   * @returns 2 values: a boolean value to know if all fields is valid, and an array of invalid filds name
   */
  validateBody(fields: string[], data: Request): IValidateInputsResponse {
    let invalidFields: string[] = [];
    let isValid: boolean = true;
    console.log('entrou');
    fields.forEach((field) => {
      if (isEmpty(data.body[field])) {
        invalidFields.push(field);
        isValid = false;
      }
    });
    return {
      invalidFields,
      isValid,
    };
  }
  /**
   * Method that verify if the url params of request is valid
   * @param fields Array of fields name for validate
   * @param data Request
   * @returns 2 values: a boolean value to know if all fields is valid, and an array of invalid filds name
   */
  validateUrlParams(fields: string[], data: Request): IValidateInputsResponse {
    let invalidFields: string[] = [];
    let isValid: boolean = true;
    console.log('entrou');
    fields.forEach((field) => {
      if (isEmpty(data.params[field])) {
        invalidFields.push(field);
        isValid = false;
      }
    });
    return {
      invalidFields,
      isValid,
    };
  }
  /**
   * Method that verify if the query params of request is valid
   * @param fields Array of fields name for validate
   * @param data Request
   * @returns 2 values: a boolean value to know if all fields is valid, and an array of invalid filds name
   */
  validateQueryParams(
    fields: string[],
    data: Request
  ): IValidateInputsResponse {
    let invalidFields: string[] = [];
    let isValid: boolean = true;
    console.log('entrou');
    fields.forEach((field) => {
      if (isEmpty(data.query[field])) {
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

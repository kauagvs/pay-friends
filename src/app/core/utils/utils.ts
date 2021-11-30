import { Payment } from '@models/payment.model';

export class Utils {
  static omit(obj: any, field: string): any {
    return Object.keys(obj ?? {}).reduce((resultObj: any, key: string) => {
      let nextObj = {};

      if (key !== field) {
        nextObj = {
          [key]: obj[key],
        };
      }

      return {
        ...resultObj,
        ...nextObj,
      };
    }, {});
  }

  static generatePaymentData(payment: Partial<Payment>): Partial<Payment> {
    const username = (payment?.name?.split(' ')[0] ?? '').toLowerCase();

    return {
      ...payment,
      username,
    };
  }

  static generateUUID(): string {
    const pattern = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';

    return pattern.replace(/[xy]/g, (c) => {
      const randomValue = (Math.random() * 16) | 0;
      const value = c === 'x' ? randomValue : (randomValue & 0x3) | 0x8;

      return value.toString(16);
    });
  }

  static isEmptyList(value: any): boolean {
    return typeof value === 'object' && Array.isArray(value) && value.length === 0;
  }

  static isEmptyObject(value: any): boolean {
    return typeof value === 'object' && Object.keys(value).length === 0;
  }

  static isUndefined(value: any): boolean {
    return value === undefined;
  }

  static isNull(value: any): boolean {
    return value === null;
  }

  static isEmpty(value: any): boolean {
    return (
      value === '' ||
      this.isNull(value) ||
      this.isUndefined(value) ||
      this.isEmptyList(value) ||
      this.isEmptyObject(value)
    );
  }
}

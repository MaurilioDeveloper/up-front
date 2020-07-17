import { NativeDateAdapter } from '@angular/material';

export class BrasilDateAdapter extends NativeDateAdapter {
    parse(value: any): Date | null {
      console.log(value);
      if ((typeof value === 'string') && (value.indexOf('/') > -1)) {
        const str = value.split('/');
        if (str.length < 2 || isNaN(+str[0]) || isNaN(+str[1]) || isNaN(+str[2])) {
          return null;
        }
        return new Date(Number(str[2]), Number(str[1]) - 1, Number(str[0]), 12);
      }
      return null;
    }
  }
  
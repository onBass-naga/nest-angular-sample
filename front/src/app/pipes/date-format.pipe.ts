import { Pipe, PipeTransform } from '@angular/core';
import * as Moment from 'moment';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: Date, format: string): any {
    const pattern = format ? format : '';
    return Moment(value).format(pattern);
  }

}

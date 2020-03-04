import { Pipe, PipeTransform } from '@angular/core';
import { resolve } from 'q';

@Pipe({
  name: 'padEnd'
})
export class PadEndPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let valLength = value.toString().length;
    let resLength = Number(args) - valLength;
    var rsVal = value.toString();
    if (resLength > 0) {
      for (let i = 0; i < resLength; i++) {
        rsVal += ' ';
      }
    }
    // console.log(rsVal);
    return rsVal;
  }

}

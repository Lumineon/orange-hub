import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'orderby'
})
export class OrderbyPipe implements PipeTransform {
  transform(array: Array<{}>, args: string[]): Array<string> | Array<{}> {

    array = array || [];

    if (typeof args === 'undefined' || args.length !== 2) {
        return array;
    }

    const [key, direction] = args;

    if (direction !== 'asc' && direction !== 'desc') {
        return array;
    }

    return _.orderBy(array, (item:any) => item[key], direction);
}
}

import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'seeMore'
})
export class SeemorePipe implements PipeTransform {

  transform(txt: string, lngth: number): string {
    const x = txt.slice(0, lngth);
    let final = '';
    for (let i = 0; i < 5; i++) {
      final += x[i] + ' ';
    }
    return x + '...';
  }
}

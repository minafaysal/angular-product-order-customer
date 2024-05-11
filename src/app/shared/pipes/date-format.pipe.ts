import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
})
export class DateFormatPipe implements PipeTransform {
  transform(value: string | undefined): string {
    if (!value || value.trim() === '') return ''; // Handle empty or null values

    const dateParts = value.split(' '); // Split the date string into parts
    const month = dateParts[1];
    const day = dateParts[2];
    const year = dateParts[3].substring(0, 4); // Extract the year (first 4 characters)

    return `${month} ${day}, ${year}`; // Format the date string
  }
}

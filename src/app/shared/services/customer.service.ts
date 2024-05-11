import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../models/user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private userUrl = 'assets/data/users.json';

  constructor(private http: HttpClient) {}

  getCustomerDetails(id: string): Observable<Customer| undefined> {
    return this.http
      .get<Customer[]>(this.userUrl)
      .pipe(
        map((customers: Customer[]) =>
          customers.find((customer) => customer.Id === id)
        )
      );
  }
}

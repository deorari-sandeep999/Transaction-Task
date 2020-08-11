import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  public baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  saveTransaction(data: any): Observable<any> {
    if (data) {
      return this.http.post(this.baseUrl + '/add-transaction', data);
    } else {
      return new Observable((observer: Observer<any>) => observer.error("Invalid Information"));
    }
  }

  getListTransaction() {
    return this.http.get(this.baseUrl + '/list-transaction');
  }

}

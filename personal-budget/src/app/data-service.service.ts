import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  public dataSource: any = {
    datasets: [
      {
        data: [],
        backgroundColor: [
          '#ffcd56',
          '#ff6384',
          '#36a2eb',
          '#fc6b19',
          '#ff5733',
          '#117a65',
          '#9b59b6',
        ],
      },
    ],
    labels: [],
  };
  private dataLoaded = false;
  constructor(private http: HttpClient) {}
  fetchData() {
    if (this.dataLoaded) {
      console.log('Data loaded');
      return of(this.dataSource);
    } else
      return this.http.get('http://localhost:3000/budget').pipe(
        tap((res: any) => {
          this.dataSource = res;
          this.dataLoaded = true;
        })
      );
  }
}



import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const BASEURL = 'http://72.52.191.166:90';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  post(url: any, data: any) {
    return this.http.post(BASEURL + url, data).toPromise();
  }

  get(url: string) {
    return this.http.get(BASEURL + url).toPromise();
  }
  delete(url: string) {
   return this.http.delete(BASEURL + url).toPromise();
  }
}

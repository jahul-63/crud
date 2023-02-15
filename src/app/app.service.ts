import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }
  POST(url: any, data: any) {
    return this.http.post(environment.SiteUrl + url, data);
  }
  GET(url: any, data: any) {
    return this.http.get(environment.SiteUrl + url + data);
  }
  PUT(url: any, data: any) {
    return this.http.put(environment.SiteUrl + url, data);
  }
  DELETE(url: any, data: any) {
    return this.http.delete(environment.SiteUrl + url + data);
  }
}

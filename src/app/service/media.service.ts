import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const URL_MEDIA = 'https://fctconnect.vercel.app/v1/api/media/upload';

const HTTPOPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})

export class MediaService {

  constructor(private http: HttpClient) {}

  uploadFile(formData: FormData):Observable<any> {
    return this.http.post(URL_MEDIA,formData);
  }

  getFileUrl(fileName:string):Observable<any> {
    return this.http.get(URL_MEDIA+fileName);
  }
}

import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tinte } from '../models/tinte';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TinteService {

  url = `${environment.apiUrl}/api/tinte/`;


  constructor(private http:HttpClient) {

 }

  getTintes():Observable<any>{
    return this.http.get(this.url);
  }

  deleteTinte(id:string):Observable<any>{

    return this.http.delete(this.url+id);
  }

  postTintes(tinte:Tinte): Observable<any>{
    return this.http.post(this.url,tinte)
  }

  getTinte(id :string): Observable<any>{
    return this.http.get(this.url + id);
  }

  putTinte(id:string, tinte: Tinte): Observable<any>{
    return this.http.put(this.url+id,tinte)
  }

}

import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { cita } from '../models/cita';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  url = 'http://localhost:4000/api/cita/';

  constructor(private http:HttpClient ) {

  }
  getCitas():Observable<any>{
    return this.http.get(this.url);
  }

  deleteCita(id:string):Observable<any>{

    return this.http.delete(this.url+id);
  }

  postCitas(cita: cita): Observable<any>{
    return this.http.post(this.url,cita)
  }

  getCita(id :string): Observable<any>{
    return this.http.get(this.url + id);
  }

  putCita(id:string, cita: cita): Observable<any>{
    return this.http.put(this.url+id,cita);
  }



}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { cita } from '../models/cita';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  url = `${environment.apiUrl}/api/cita/`;

  constructor(private http:HttpClient ) {

  }
  getCitas():Observable<any>{
    return this.http.get(this.url);
  }

  getMisCitas():Observable<any>{
    return this.http.get(this.url + 'mias');
  }

  cancelarCita(id:string):Observable<any>{
    return this.http.put(this.url + id + '/cancelar', {});
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

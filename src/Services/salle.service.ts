import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Salle } from 'src/Modeles/Salle';
import { GLOBAL } from 'src/app/app-config';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SalleService {
  private apiUrl = 'http://localhost:3000/salles';

  constructor(private http: HttpClient) {}

  ONSAVE(salleToSave: Salle): Observable<Salle> {
    return this.http.post<Salle>(this.apiUrl, salleToSave);
  }

  ONDELETE(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  getSalleById(id: string): Observable<Salle> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Salle>(url);
  }

  updateSalle(id: string, form: Salle): Observable<Salle> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Salle>(url, form);
  }

  getAll(): Observable<Salle[]> {
    return this.http.get<Salle[]>(this.apiUrl);
  }
  }

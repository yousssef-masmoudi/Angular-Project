import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from 'src/Modeles/Client';
import { GLOBAL } from 'src/app/app-config';

@Injectable({
  providedIn: 'root'  
})
export class ClientService {
  private apiUrl = 'http://localhost:3000/clients';

  constructor(private http: HttpClient) {}

  ONSAVE(clientToSave: Client): Observable<Client> {
    return this.http.post<Client>(this.apiUrl, clientToSave);
  }

  ONDELETE(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  getClientById(id: string): Observable<Client> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Client>(url);
  }

  updateClient(id: string, form: Client): Observable<Client> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Client>(url, form);
  }

  GET(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl);
  }
}

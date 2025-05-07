import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Email } from 'src/Modeles/Email';

@Injectable({
  providedIn: 'root'
})
export class BoiteReceptionService {

  private apiUrl = 'http://localhost:3000/emails';

  constructor(private http: HttpClient) {}

  sendEmail(email: Email): Observable<Email> {
    return this.http.post<Email>(this.apiUrl, email);
  }

  saveEmail(email: Email): Observable<Email> {
    return this.http.post<Email>(this.apiUrl, email);
  }

  deleteEmail(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  getEmailById(id: string): Observable<Email> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Email>(url);
  }

  updateEmail(id: string, updatedEmail: Email): Observable<Email> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Email>(url, updatedEmail);
  }

  getAllEmails(): Observable<Email[]> {
    return this.http.get<Email[]>(this.apiUrl);
  }

}

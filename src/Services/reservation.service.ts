import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from 'src/Modeles/reservation';
import { GLOBAL } from 'src/app/app-config';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = 'http://localhost:3000/reservations';

  constructor(private httpClient: HttpClient) {}

  ONSAVE(reservationToSave: Reservation): Observable<Reservation> {
    return this.httpClient.post<Reservation>(this.apiUrl, reservationToSave);
  }

  ONDELETE(id: string): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/${id}`);
  }

  getReservationById(id: string): Observable<Reservation | null> {
    return this.httpClient.get<Reservation>(`${this.apiUrl}/${id}`);
  }

  updateReservation(idcourant: string, form: Reservation): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/${idcourant}`, form);
  }

  getAll(): Observable<Reservation[]> {
    return this.httpClient.get<Reservation[]>(this.apiUrl);
  }
}

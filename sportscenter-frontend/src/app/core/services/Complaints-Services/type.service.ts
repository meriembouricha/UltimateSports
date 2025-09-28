import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Type {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  private apiUrl = `${environment.apiUrl}/api/types`;

  constructor(private http: HttpClient) { }

  getTypes(): Observable<Type[]> {
    return this.http.get<Type[]>(this.apiUrl);
  }
}

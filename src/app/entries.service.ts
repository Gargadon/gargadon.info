import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EntriesService {

  constructor(private httpClient: HttpClient) { }

  private apiUrl = 'https://www.gargadon.info/api/entry.php';

  recibirEntradas(): Observable<any[]>{
    return this.httpClient.get<any[]>(this.apiUrl);
  }

  recibirEntradaSingular(id:number): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + '?id=' + id);
  }
}

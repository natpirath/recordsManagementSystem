// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Record } from 'models/record.model';

// @Injectable({
//   providedIn: 'root',
// })
// export class RecordService {
//   private apiUrl = 'http://localhost:3000/api';

//   constructor(private http: HttpClient) {}

//   reloadRecords(): Observable<Record[]> {
//     return this.http.get<Record[]>(`${this.apiUrl}/records/reload`);
//   }

//   persistRecords(records: Record[]): Observable<any> {
//     return this.http.post<any>(`${this.apiUrl}/records/persist`, records);
//   }

//   getRecord(id: string): Observable<Record> {
//     return this.http.get<Record>(`${this.apiUrl}/records/${id}`);
//   }

//   getAllRecords(): Observable<Record[]> {
//     return this.http.get<Record[]>(`${this.apiUrl}/records`);
//   }

//   createRecord(record: Record): Observable<Record> {
//     return this.http.post<Record>(`${this.apiUrl}/records`, record);
//   }

//   updateRecord(id: string, record: Record): Observable<Record> {
//     return this.http.put<Record>(`${this.apiUrl}/records/${id}`, record);
//   }

//   deleteRecord(id: string): Observable<any> {
//     return this.http.delete<any>(`${this.apiUrl}/records/${id}`);
//   }
// }

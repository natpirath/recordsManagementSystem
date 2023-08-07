import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-record-filter',
  templateUrl: '../views/record-filter.component.html',
  styleUrls: ['../views/record-filter.component.css']
})
export class RecordFilterComponent {
  typeOfProduct!: string;
  geo!: string; // New property for GEO
  filteredRecords: any[] = [];
  @Output() filterApplied: EventEmitter<any> = new EventEmitter<any>();

  constructor(private http: HttpClient) { }

  /**
   * This searches the records based on the specified typeOfProduct and GEO.
   */
  searchRecords() {
    let url = 'http://localhost:3000/api/records/filterByProductAndGeo';

    if (this.typeOfProduct && this.geo) {
      url += `?typeOfProduct=${encodeURIComponent(this.typeOfProduct)}&geo=${encodeURIComponent(this.geo)}`;
    } else if (this.typeOfProduct) {
      url += `?typeOfProduct=${encodeURIComponent(this.typeOfProduct)}`;
    } else if (this.geo) {
      url += `?geo=${encodeURIComponent(this.geo)}`;
    }

    console.log('URL:', url); // Add this line to log the constructed URL
  
    this.http.get<any[]>(url)
      .pipe(
        tap({
          next: records => {
            this.filteredRecords = records;
  
            console.log(records);
            // Emit the filters to the parent component
            this.filterApplied.emit({ typeOfProduct: this.typeOfProduct, geo: this.geo });
          },
          error: error => {
            console.error('Error:', error);
            // Handle the error and display an appropriate message
          }
        })
      )
      .subscribe();
  }
  
}

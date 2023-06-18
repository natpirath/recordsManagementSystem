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
  filteredRecords: any[] = []; // New property for filtered records
  @Output() filterApplied: EventEmitter<string> = new EventEmitter<string>();

  constructor(private http: HttpClient) { }

  /**
   * This searches the records based on the specified typeOfProduct.
   */
  searchRecords() {
    if (this.typeOfProduct) {
      // Make a GET request to filter records by typeOfProduct
      this.http.get<any[]>(`http://localhost:3000/api/records?typeOfProduct=${encodeURIComponent(this.typeOfProduct)}`)
        .pipe(
          tap({
            next: records => {
              this.filteredRecords = records;
              console.log(records);
              // Emit the typeOfProduct to the parent component
              this.filterApplied.emit(this.typeOfProduct);
            },
            error: error => {
              console.error('Error:', error);
              // Handle the error and display an appropriate message
            }
          })
        )
        .subscribe();
    } else {
      // No typeOfProduct specified, display all records
      this.http.get<any[]>('/api/records')
        .pipe(
          tap({
            next: records => {
              this.filteredRecords = records;
              // Emit an empty string to indicate no filter
              this.filterApplied.emit('');
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
}

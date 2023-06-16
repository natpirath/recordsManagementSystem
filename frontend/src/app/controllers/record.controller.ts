import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Record } from '../models/record.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: '../views/record.view.html',
  styleUrls: ['../views/record.view.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  fullName = 'Natalia Pirath';
  records: Record[] = [];
  filteredRecords: Record[] = []; // New property for filtered records
  private subscription: Subscription | undefined;
  selectedRecordId: any;
  startId: any;
  endId: any;
  newRecord: Record = {
    REF_DATE: '',
    GEO: '',
    DGUID: '',
    TYPE_OF_PRODUCT: '',
    TYPE_OF_STORAGE: '',
    UOM: '',
    UOM_ID: 0,
    SCALAR_FACTOR: '',
    SCALAR_ID: 0,
    VECTOR: '',
    COORDINATE: '',
    VALUE: 0,
    STATUS: '',
    SYMBOL: '',
    TERMINATED: '',
    DECIMALS: 0,
  };
    // Define the isModalOpen property
    isModalOpen = false;

    // Rest of the component code
  
    // Method to open the modal
    openModal() {
      this.isModalOpen = true;
    }
  
    // Method to close the modal
    closeModal() {
      this.isModalOpen = false;
    }
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadData(): void {
    this.subscription = this.http.get<Record[]>('http://localhost:3000/api/records').subscribe({
      next: (data: Record[]) => {
        this.records = data;
        this.filteredRecords = data; // Set filteredRecords initially to all records
      },
      error: (error: any) => {
        if (error.error instanceof ErrorEvent) {
          // Client-side error occurred
          console.error('An error occurred:', error.error.message);
        } else {
          // Server-side error occurred
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`
          );
        }
      },
    });
  }
  

  reloadData(): void {
    this.http.get<Record[]>('http://localhost:3000/api/reloadRecords').subscribe({
      next: (data: Record[]) => {
        console.log('Data reloaded successfully.');
        this.records = data;
        this.filteredRecords = data; // Update filteredRecords with reloaded data
      },
      error: (error: any) => {
        console.error('Failed to reload records:', error);
      },
    });
  }

  createRecord(): void {
    // Add the new record to the array of records
    this.records.push(this.newRecord);

    // Clear the form for the next input
    this.newRecord = {
      REF_DATE: '',
      GEO: '',
      DGUID: '',
      TYPE_OF_PRODUCT: '',
      TYPE_OF_STORAGE: '',
      UOM: '',
      UOM_ID: 0,
      SCALAR_FACTOR: '',
      SCALAR_ID: 0,
      VECTOR: '',
      COORDINATE: '',
      VALUE: 0,
      STATUS: '',
      SYMBOL: '',
      TERMINATED: '',
      DECIMALS: 0,
    };
  }

  persistData(): void {
    this.http.post('http://localhost:3000/api/persistRecords', this.records).subscribe({
      next: () => {
        console.log('Data persisted successfully.');
      },
      error: (error: any) => {
        console.error('Failed to persist data:', error);
      },
    });
  }

  filterRecordsByTypeOfProduct(typeOfProduct: string): void {
    if (typeOfProduct) {
      const url = `http://localhost:3000/api/records/filter?typeOfProduct=${encodeURIComponent(typeOfProduct)}`;

      this.http.get<Record[]>(url).subscribe({
        next: (data: Record[]) => {
          this.filteredRecords = data; // Update filteredRecords with filtered data
        },
        error: (error: any) => {
          console.error('Failed to filter records by type of product:', error);
        },
      });
    } else {
      // No typeOfProduct specified, display all records
      this.filteredRecords = this.records;
    }
  }
}

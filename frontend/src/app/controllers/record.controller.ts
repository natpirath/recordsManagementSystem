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
        console.error('Failed to load records:', error);
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

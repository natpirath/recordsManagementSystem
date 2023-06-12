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
      },
      error: (error: any) => {
        console.error('Failed to load records:', error);
      },
    });
  }

  displayRecord(): void {
    // Implement the logic to display a single record or multiple records based on the selectedRecordId, startId, and endId properties
  }

  saveData(): void {
    // Implement the logic to persist the data from memory to the disk as a comma-separated file
  }

  reloadData(): void {
    this.loadData();
  }
}

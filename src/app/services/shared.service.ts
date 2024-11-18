import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private dataSource = new BehaviorSubject<any>(null); 
  currentData$: Observable<any> = this.dataSource.asObservable(); 

  constructor() { }

  
  fetchData() {
    
    const fetchedData = { id: 1, name: 'John Doe', age: 30 };
    this.dataSource.next(fetchedData);  
  }

  // Method to update data
  updateData(newData: any) {
    this.dataSource.next(newData); 
  }
}

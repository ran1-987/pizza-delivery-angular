import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from './services/data.service';
import { SharedService } from './services/shared.service';
import { CommonModule, DatePipe } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgbDropdownModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  user: any = {}
  order:any[]=[]
  private dataService = inject(DataService);
  private sharedService = inject(SharedService)
  ngOnInit(): void {
    const user = localStorage.getItem('user')
    this.user = JSON.parse(user as any)
    console.log(this.user)
    this.dataService.getOrdersByUserId(this.user.userId).subscribe((res) => {
      console.log(res)
      this.sharedService.updateData(res);
    })
    this.sharedService.currentData$.subscribe(data => {
      this.order = data
    });
  }
}

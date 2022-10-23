import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api-service.service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit {
  selectedBusiness: any;

  constructor(private apiService: ApiService) {

    this.selectedBusiness = this.apiService.selectedBusinessObj;
  }

  ngOnInit(): void {

  }

}

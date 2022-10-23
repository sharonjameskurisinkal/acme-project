import { ChangeDetectorRef, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Business } from '../business';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

    latitude: Number | any;
    longitude: Number | any;
    businesses: Business | any;;
    isEntireDataLoaded = false;
    constructor(private apiService: ApiService, private changeDetectorRef: ChangeDetectorRef, private router: Router) { }
    @ViewChild(MatPaginator) paginator: MatPaginator | any;;
    obs: Observable<any> | undefined;
    dataSource = new MatTableDataSource<any>;

    ngOnInit(): void {
        this.getLocation();
    }
    // Method to get user's current location
    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                if (position) {
                    console.log("Latitude: " + position.coords.latitude +
                        "Longitude: " + position.coords.longitude);
                    this.latitude = position.coords.latitude;
                    this.longitude = position.coords.longitude;
                    if (this.latitude && this.longitude) {
                        this.getLocalBusinessData();
                    }
                }
            },
                (error: any) => console.log(error));
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    //Method to get local business data from API - restricted to limit 6
    //N.B - Commented code is to call API which is not working due to CORS error

    getLocalBusinessData() {
        // this.apiService
        //   .getLocalBusinessData(this.latitude,this.longitude)
        //   .then(businesses => {
        //     console.log(businesses);
        //   });


        this.apiService.getFirstSixJSON().subscribe(data => {
            console.log(data);
            this.businesses = data.businesses.slice(0, 6);
            this.businesses = [...this.businesses, ...Array(44)]
            this.refreshViewForPagination();
        });

    }

    // Method to get all data on scroll down event

    @HostListener('window:scroll', ['$event']) onScrollEvent() {
        if (!this.isEntireDataLoaded && this.latitude && this.longitude) {
            this.isEntireDataLoaded = true;
            this.apiService.getJSON().subscribe(data => {
                this.businesses = data.businesses;
                this.refreshViewForPagination();
            });
        }
    }



    // A Common method to refresh the data and sync to pagination
    refreshViewForPagination() {
        this.dataSource = new MatTableDataSource<any>(this.businesses);
        this.changeDetectorRef.detectChanges();
        this.dataSource.paginator = this.paginator;
        this.obs = this.dataSource.connect();
    }

    // method to navigate to detail page
    viewDetailPage(business: any) {
        this.apiService.selectedBusinessObj = business;
        this.router.navigate(['business']);
    }

    // life cycle hook to prevent mememory leakage
    ngOnDestroy() {
        if (this.dataSource) {
            this.dataSource.disconnect();
        }
    }

}

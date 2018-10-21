import { Injectable,
    ChangeDetectorRef,
    ChangeDetectionStrategy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject, of, from } from 'rxjs';
import APP_CONFIG from './app.config';

const APIroot = APP_CONFIG.APIroot
const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',

    })
};


@Injectable({
    providedIn: 'root'
})
export class JsonDataService {
  
    private nodesSource = new Subject<any>();
    private linksSource = new Subject<any>();
    private typeSource = new Subject<any>();
    private dataSource = new Subject<any>();
    private searchTerm = new Subject<any>();
    private answer = new Subject<any>();

    Dates = {
        1:"January",
        2:"February",
        3:"March",
        4:"April",
        5:"May",
        6:"June",
        7:"July",
        8:"August",
        9:"September",
        10:"October",
        11:"November",
        12:"December"
      }

    nodes$ = this.nodesSource.asObservable();
    links$ = this.linksSource.asObservable();
    datum$ = this.dataSource.asObservable();
    search$ = this.searchTerm.asObservable();
    answer$ = this.answer.asObservable();
    switchTypes$ = this.typeSource.asObservable();

    getPrediction(): Observable<any>{
        return of(this.http.get(APIroot + '/predict'));
    }
    constructor(private http: HttpClient ){
        this.http.post(APIroot + '/gs/JNPR', {
            "start": "2013-10-21",
            "end": "2016-06-27"
        }, httpOptions).subscribe((data: any[]) => {
            this.nodesSource.next(data['data'])
        })
        this.http.get(APIroot + '/stock/JNPR').subscribe((data: any[]) => {
            console.log(data)
            this.dataSource.next(data)
        })
      }
}  
import { Resource } from '../Models/resource';
import { Serializer } from '../Models/serializer';
import { ApiError } from '../Models/api-error.model';
import { map, Observable, throwError, catchError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

interface responseType<T> { rs: T[] };

export class ResourceService<T extends Resource> {
    BaseURL: string;
    adminEndPoint:string;
    adminFullEndPoint: string;
    constructor(
        private httpClient: HttpClient,
        private endpoint: string,
        private serializer: Serializer<T>) {
        this.BaseURL = environment.BASE_URL;
        this.adminEndPoint = environment.ADMIN_ENDPOINT;
        this.adminFullEndPoint = environment.ADMIN_FULL_ENDPOINT;
    }

    public create(item: T): Observable<T> {
        return this.httpClient
            .post<T>(`${this.BaseURL}/${this.endpoint}/${this.adminFullEndPoint}`, this.serializer.toJson(item))
            .pipe(
                map((data:any) => this.serializer.fromJson(data.rs) as T),
                catchError(this.handleError)
            );
    }

    public update(item: T): Observable<T> {
        return this.httpClient
            .put<T>(`${this.BaseURL}/${this.endpoint}/${this.adminFullEndPoint}`,
                this.serializer.toJson(item))
            .pipe(
                map((data:any) => this.serializer.fromJson(data.rs) as T),
                catchError(this.handleError)
            );
    }

    read(id: number): Observable<T> {
        return this.httpClient
            .get(`${this.BaseURL}/${this.endpoint}/${id}`)
            .pipe(
                map((data: any) => this.serializer.fromJson(data.rs)),
                catchError(this.handleError)
            );
    }

    list(): Observable<T[]> {
        return this.httpClient
            .get(`${this.BaseURL}/${this.endpoint}`)
            .pipe(
                map((data: any) => this.convertData(data.rs)),
                catchError(this.handleError)
            );
    }

    delete(id: number) {
        return this.httpClient
            .delete(`${this.BaseURL}/${this.endpoint}/${this.adminEndPoint}/${id}`)
            .pipe(catchError(this.handleError));
    }

    private convertData(data: any[]): T[] {
        return data.map(item => this.serializer.fromJson(item));
    }

    private handleError(error: HttpErrorResponse) {
        const err: ApiError = { Code: error.status, message: error.statusText, discription: error.error.ms.split(':')[1] };
        return throwError(() => err);
    }
}
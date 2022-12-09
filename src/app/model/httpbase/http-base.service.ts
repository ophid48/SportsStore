import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../product/product.model';
import { CookieService } from 'ngx-cookie-service';
import { inject } from '@angular/core';

export class HttpBase<T> {
  cookieService = inject(CookieService);

  constructor(private _http: HttpClient, public readonly apiBase: string) {}

  getAll() {
    return this._http.get<T[]>(this.apiBase, this.getOptions());
  }

  getById(id: number) {
    return this._http.get<T>(`${this.apiBase}/${id}`, this.getOptions());
  }

  post(body: Omit<T, 'id'>) {
    return this._http.post<T>(this.apiBase, body, this.getOptions()).pipe();
  }

  putById(body: Partial<T>, id: number) {
    return this._http.put<T>(`${this.apiBase}/${id}`, body, this.getOptions());
  }

  patchById(body: Partial<T>, id: number) {
    console.log(body);
    return this._http.patch<T>(
      `${this.apiBase}/${id}`,
      body,
      this.getOptions()
    );
  }

  deleteById(id: number) {
    return this._http.delete<T>(`${this.apiBase}/${id}`, this.getOptions());
  }

  getJoinedProduct(): Observable<IProduct[]> {
    return this._http.get<IProduct[]>(
      '/api/v1/products/joined_products',
      this.getOptions()
    );
  }

  private getOptions() {
    const access_token = JSON.parse(this.cookieService.get('token'));
    // console.log('"Authorization": ' + `Bearer ${access_token}`);
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${access_token}`,
      }),
    };
  }
}

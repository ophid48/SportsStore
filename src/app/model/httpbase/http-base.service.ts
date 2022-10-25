import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MyCookieService } from '../cookie/my-cookie.service';

export class HttpBase<T> {
  constructor(
    private _http: HttpClient,
    public readonly apiBase: string,
    private cookieService: MyCookieService
  ) {}

  getAll() {
    return this._http.get<T[]>(this.apiBase, this.getOptions());
  }

  getById(id: string) {
    return this._http.get<T>(`${this.apiBase}/${id}`, this.getOptions());
  }

  post(body: Omit<T, 'id'>) {
    return this._http.post<T>(this.apiBase, body, this.getOptions());
  }

  putById(body: T, id: string) {
    return this._http.put<T>(`${this.apiBase}/${id}`, body, this.getOptions());
  }

  patchById(body: T, id: string) {
    return this._http.patch<T>(
      `${this.apiBase}/${id}`,
      body,
      this.getOptions()
    );
  }

  deleteById(id: string) {
    return this._http.delete<T>(`${this.apiBase}/${id}`, this.getOptions());
  }

  private getOptions() {
    const access_token =
      this.cookieService.getCookieByName('token').access_token;
    console.log('"Authorization": ' + `Bearer ${access_token}`);
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${access_token}`,
      }),
    };
  }
}

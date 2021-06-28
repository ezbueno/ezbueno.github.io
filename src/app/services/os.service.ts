import { OrdemServico } from "./../models/os";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class OsService {
  baseURL: String = environment.baseURL;

  constructor(private http: HttpClient, private snack: MatSnackBar) {}

  findAll(): Observable<OrdemServico[]> {
    const URL = this.baseURL + "/os";
    return this.http.get<OrdemServico[]>(URL);
  }

  findById(id: any): Observable<OrdemServico> {
    const URL = `${this.baseURL}/os/${id}`;
    return this.http.get<OrdemServico>(URL);
  }

  create(ordemServico: OrdemServico): Observable<OrdemServico> {
    const URL = this.baseURL + "/os";
    return this.http.post<OrdemServico>(URL, ordemServico);
  }

  update(ordemServico: OrdemServico): Observable<OrdemServico> {
    const URL = this.baseURL + "/os";
    return this.http.put<OrdemServico>(URL, ordemServico);
  }

  delete(id: any): Observable<void> {
    const URL = `${this.baseURL}/os/${id}`;
    return this.http.delete<void>(URL);
  }

  message(msg: String): void {
    this.snack.open(`${msg}`, "OK", {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 4000,
    });
  }
}

import { Tecnico } from "./../models/tecnico";
import { environment } from "./../../environments/environment";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class TecnicoService {
  baseURL: String = environment.baseURL;

  constructor(private http: HttpClient, private snack: MatSnackBar) {}

  findAll(): Observable<Tecnico[]> {
    const URL = this.baseURL + "/tecnicos";
    return this.http.get<Tecnico[]>(URL);
  }

  findById(id: any): Observable<Tecnico> {
    const URL = `${this.baseURL}/tecnicos/${id}`;
    return this.http.get<Tecnico>(URL);
  }

  create(tecnico: Tecnico): Observable<Tecnico> {
    const URL = this.baseURL + "/tecnicos";
    return this.http.post<Tecnico>(URL, tecnico);
  }

  update(tecnico: Tecnico): Observable<Tecnico> {
    const URL = `${this.baseURL}/tecnicos/${tecnico.id}`;
    return this.http.put<Tecnico>(URL, tecnico);
  }

  delete(id: any): Observable<void> {
    const URL = `${this.baseURL}/tecnicos/${id}`;
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

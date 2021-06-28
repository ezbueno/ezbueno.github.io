import { Cliente } from "./../models/cliente";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ClienteService {
  baseURL: String = environment.baseURL;

  constructor(private http: HttpClient, private snack: MatSnackBar) {}

  findAll(): Observable<Cliente[]> {
    const URL = this.baseURL + "/clientes";
    return this.http.get<Cliente[]>(URL);
  }

  findById(id: any): Observable<Cliente> {
    const URL = `${this.baseURL}/clientes/${id}`;
    return this.http.get<Cliente>(URL);
  }

  create(cliente: Cliente): Observable<Cliente> {
    const URL = this.baseURL + "/clientes";
    return this.http.post<Cliente>(URL, cliente);
  }

  update(cliente: Cliente): Observable<Cliente> {
    const URL = `${this.baseURL}/clientes/${cliente.id}`;
    return this.http.put<Cliente>(URL, cliente);
  }

  delete(id: any): Observable<void> {
    const URL = `${this.baseURL}/clientes/${id}`;
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

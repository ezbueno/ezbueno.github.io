import { Cliente } from "./../../../../models/cliente";
import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ClienteService } from "src/app/services/cliente.service";

@Component({
  selector: "app-cliente-create",
  templateUrl: "./cliente-create.component.html",
  styleUrls: ["./cliente-create.component.css"],
})
export class ClienteCreateComponent implements OnInit {
  cliente: Cliente = {
    id: "",
    nome: "",
    cpf: "",
    telefone: "",
  };

  nome = new FormControl("", Validators.minLength(5));
  cpf = new FormControl("", Validators.minLength(11));
  telefone = new FormControl("", Validators.minLength(11));

  constructor(private router: Router, private service: ClienteService) {}

  ngOnInit(): void {}

  cancel(): void {
    this.router.navigate(["clientes"]);
  }

  create(): void {
    this.service.create(this.cliente).subscribe(
      () => {
        this.router.navigate(["clientes"]);
        this.service.message("Cliente criado com sucesso!");
      },
      (err) => {
        if (err.error.error.match("já cadastrado")) {
          this.service.message(err.error.error);
        } else if (
          err.error.errors[0].message ===
          "invalid Brazilian individual taxpayer registry number (CPF)"
        ) {
          this.service.message("CPF inválido!");
        }
      }
    );
  }

  errorInvalidName() {
    if (this.nome.invalid) {
      return "O NOME deve ter entre 5 e 100 caracteres!";
    }
    return false;
  }

  errorInvalidCPF() {
    if (this.cpf.invalid) {
      return "O CPF deve ter entre 11 e 14 caracteres!";
    }
    return false;
  }

  errorInvalidPhone() {
    if (this.telefone.invalid) {
      return "O TELEFONE deve ter entre 11 e 15 caracteres!";
    }
    return false;
  }
}

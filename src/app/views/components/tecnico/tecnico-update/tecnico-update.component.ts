import { Tecnico } from "./../../../../models/tecnico";
import { FormControl } from "@angular/forms";
import { Validators } from "@angular/forms";
import { TecnicoService } from "./../../../../services/tecnico.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-tecnico-update",
  templateUrl: "./tecnico-update.component.html",
  styleUrls: ["./tecnico-update.component.css"],
})
export class TecnicoUpdateComponent implements OnInit {
  id_tec = "";

  tecnico: Tecnico = {
    id: "",
    nome: "",
    cpf: "",
    telefone: "",
  };

  nome = new FormControl("", Validators.minLength(5));
  cpf = new FormControl("", Validators.minLength(11));
  telefone = new FormControl("", Validators.minLength(11));

  constructor(
    private router: Router,
    private service: TecnicoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id_tec = this.route.snapshot.paramMap.get("id")!;
    this.findById();
  }

  findById(): void {
    this.service.findById(this.id_tec).subscribe((response) => {
      this.tecnico = response;
    });
  }

  update(): void {
    this.service.update(this.tecnico).subscribe(() => {
      this.router.navigate(["tecnicos"]);
      this.service.message("Técnico atualizado com sucesso!");
    }, 
    err => {
      if (err.error.error.match('já cadastrado')) {
        this.service.message(err.error.error);
      } else if (err.error.errors[0].message === "invalid Brazilian individual taxpayer registry number (CPF)") {
        this.service.message("CPF inválido!");
      }
    });
  }

  cancel(): void {
    this.router.navigate(["tecnicos"]);
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

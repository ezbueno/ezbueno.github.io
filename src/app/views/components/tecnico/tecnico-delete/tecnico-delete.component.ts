import { ActivatedRoute } from "@angular/router";
import { TecnicoService } from "./../../../../services/tecnico.service";
import { Tecnico } from "./../../../../models/tecnico";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-tecnico-delete",
  templateUrl: "./tecnico-delete.component.html",
  styleUrls: ["./tecnico-delete.component.css"],
})
export class TecnicoDeleteComponent implements OnInit {
  id_tec = "";

  tecnico: Tecnico = {
    id: "",
    nome: "",
    cpf: "",
    telefone: "",
  };

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

  delete(): void {
    this.service.delete(this.id_tec).subscribe(
      () => {
        this.router.navigate(["tecnicos"]);
        this.service.message("Técnico deletado com sucesso!");
      },
      (err) => {
        if (err.error.error.match("possui Ordens de Serviço")) {
          this.service.message(err.error.error);
        }
      }
    );
  }

  cancel(): void {
    this.router.navigate(["tecnicos"]);
  }
}

import { OsService } from "./../../../../services/os.service";
import { OrdemServico } from "./../../../../models/os";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-os-view",
  templateUrl: "./os-view.component.html",
  styleUrls: ["./os-view.component.css"],
})
export class OsViewComponent implements OnInit {
  ordemServico: OrdemServico = {
    tecnicoId: "",
    clienteId: "",
    prioridade: "",
    observacoes: "",
    status: "",
  };

  constructor(
    private route: ActivatedRoute,
    private osService: OsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ordemServico.id = this.route.snapshot.paramMap.get("id");
    this.findById();
  }

  findById(): void {
    this.osService.findById(this.ordemServico.id).subscribe((response) => {
      this.ordemServico = response;
    });
  }

  return(): void {
    this.router.navigate(["os"]);
  }
}

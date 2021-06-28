import { OsService } from "./../../../../services/os.service";
import { ClienteService } from "./../../../../services/cliente.service";
import { TecnicoService } from "./../../../../services/tecnico.service";
import { Cliente } from "./../../../../models/cliente";
import { Tecnico } from "./../../../../models/tecnico";
import { OrdemServico } from "./../../../../models/os";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ThrowStmt } from "@angular/compiler";

@Component({
  selector: "app-os-update",
  templateUrl: "./os-update.component.html",
  styleUrls: ["./os-update.component.css"],
})
export class OsUpdateComponent implements OnInit {
  ordemServico: OrdemServico = {
    tecnicoId: "",
    clienteId: "",
    prioridade: "",
    observacoes: "",
    status: "",
  };

  tecnicos: Tecnico[] = [];
  clientes: Cliente[] = [];

  constructor(
    private tecnicoService: TecnicoService,
    private clienteService: ClienteService,
    private osService: OsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.ordemServico.id = this.route.snapshot.paramMap.get("id");
    this.findById();
    this.listarTecnicos();
    this.listarClientes();
  }

  findById(): void {
    this.osService.findById(this.ordemServico.id).subscribe((response) => {
      this.ordemServico = response;
      this.converterDados();
    });
  }

  update(): void {
    this.osService.update(this.ordemServico).subscribe(() => {
      this.osService.message("Ordem de Serviço atualizada com sucesso!");
      this.router.navigate(["os"]);
    });
  }

  cancel(): void {
    this.router.navigate(["os"]);
  }

  listarTecnicos(): void {
    this.tecnicoService.findAll().subscribe((response) => {
      this.tecnicos = response;
    });
  }

  listarClientes(): void {
    this.clienteService.findAll().subscribe((response) => {
      this.clientes = response;
    });
  }

  converterDados(): void {
    if (this.ordemServico.status == "ABERTO") {
      this.ordemServico.status = 0;
    } else if (this.ordemServico.status == "ANDAMENTO") {
      this.ordemServico.status = 1;
    } else {
      this.ordemServico.status = 2;
    }

    if (this.ordemServico.prioridade == "BAIXA") {
      this.ordemServico.prioridade = 0;
    } else if (this.ordemServico.prioridade == "MEDIA") {
      this.ordemServico.prioridade = 1;
    } else {
      this.ordemServico.prioridade = 2;
    }
  }
}

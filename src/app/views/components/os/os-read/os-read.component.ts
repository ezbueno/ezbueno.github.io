import { ClienteService } from "./../../../../services/cliente.service";
import { TecnicoService } from "./../../../../services/tecnico.service";
import { OsService } from "./../../../../services/os.service";
import { ViewChild } from "@angular/core";
import { AfterViewInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { OrdemServico } from "./../../../../models/os";
import { Component } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { Router } from "@angular/router";

@Component({
  selector: "app-os-read",
  templateUrl: "./os-read.component.html",
  styleUrls: ["./os-read.component.css"],
})
export class OsReadComponent implements AfterViewInit {
  ordensServico: OrdemServico[] = [];

  displayedColumns: string[] = [
    "tecnico",
    "cliente",
    "abertura",
    "prioridade",
    "status",
    "action",
  ];
  dataSource = new MatTableDataSource<OrdemServico>(this.ordensServico);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: OsService,
    private router: Router,
    private tecnicoService: TecnicoService,
    private clienteService: ClienteService
  ) {}

  ngAfterViewInit() {
    this.findAll();
  }

  findAll(): void {
    this.service.findAll().subscribe((response) => {
      response.forEach((x) => {
        if (x.status != "ENCERRADO") {
          this.ordensServico.push(x);
        }
      });

      this.listarTecnicos();
      this.listarClientes();
      this.dataSource = new MatTableDataSource<OrdemServico>(this.ordensServico);
      this.dataSource.paginator = this.paginator;
    });
  }

  listarTecnicos(): void {
    this.ordensServico.forEach((x) => {
      this.tecnicoService.findById(x.tecnicoId).subscribe((response) => {
        x.tecnicoId = response.nome;
      });
    });
  }

  listarClientes(): void {
    this.ordensServico.forEach((x) => {
      this.clienteService.findById(x.clienteId).subscribe((response) => {
        x.clienteId = response.nome;
      });
    });
  }

  navigateToCreate(): void {
    this.router.navigate(["os/create"]);
  }

  prioridade(x: any) {
    if (x == "BAIXA") {
      return "baixa";
    } else if (x == "MEDIA") {
      return "media";
    }
    return "alta";
  }
}

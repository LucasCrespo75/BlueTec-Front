import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Pessoa } from 'src/app/shered/model/pessoa.interface';
import { PessoaService } from 'src/app/shered/service/pessoa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {
  
  createForm = new FormControl({
    formControlId: new FormControl('')

  });

  collection = {count: 600, data:[]};
  config = {
    itemsPorPag: 10,
    currentPage: 1,
    totalItens:this.collection.count,
  };

  pessoaLista: Pessoa[] = [];
  public maxSize: number = 8;
  public directionLinks: boolean = true;
  public responsive: boolean = true;
  public labels: any = {
    previousLabel: 'Antes',
    nextLabel: 'Proximo'
  }



  constructor(public pessoaService: PessoaService, public router: Router) {

   }

  ngOnInit(): void {
    this.getPessoas();
}
  getPessoas() {
    (this.pessoaService.findAll().subscribe(
      data=>{
        this.pessoaLista = data;
        this.config.totalItens = this.pessoaLista.length;
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'DEU ERRADOO.....',
          text: 'Erro na requisição',
        });
      }
    )
    );


  }
  onPageChange(event: any){
    this.config.currentPage = event;
  }


  deletePessoa(id: number){
    this.pessoaService.deletePessoa(id).subscribe(
      data => {
        Swal.fire ({
          icon: 'success',
          title:'DEU ALGO ERRADO....',
          text:'Pessoa deletada com sucesso',
        });
        this.getPessoas();
      },
      error =>{
        Swal.fire ({
          icon:'error',
          title:'DEU ALGO ERRADOOO...',
          text:'Erro na requisição',
        });
      }

    )
    
  }

  editPessoa(pessoa: Pessoa){
    this.pessoaService.getPessoasPerList(pessoa);
    this.router.navigate(['/pessoa-cadastro']);
  }

  find(id: number){
    this.pessoaService.findPessoaById(id).subscribe(
      data => {
        console.log(data);
      },
      error =>{
        Swal.fire({
          icon: 'error',
          title: 'ALGO DEU ERRADO',
          text: 'Erro na requisição',
        });
      }
    )
  }

}
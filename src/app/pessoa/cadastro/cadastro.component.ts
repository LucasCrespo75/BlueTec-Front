import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Pessoa } from 'src/app/shered/model/pessoa.interface';
import { PessoaService } from 'src/app/shered/service/pessoa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listagem',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {
  createForm = new FormControl({
    formControlId: new FormControl(''),
    formControlEmail: new FormControl('',[Validators.required, Validators.email]),
    formControlNome: new FormControl('',[Validators.required]),
    formControlTelefone: new FormControl('',[Validators.required]),

  });

  //n sei se da certo '!'
  pessoa!: Pessoa;
  constructor( public router: Router, public pessoaService: PessoaService){
    console.log('testando');
  } 

  edit: boolean = false;

  ngOnInit(): void {
    this.pessoaService.editButton.subscribe(edit =>{
      console.log(edit);
      if(edit){
        this.edit = true;
        this.createForm.get('id')?.setValue(edit.id);
        this.createForm.get('email')?.setValue(edit.email);
        this.createForm.get('nome')?.setValue(edit.nome);
        this.createForm.get('telefone')?.setValue(edit.telefone);
      }
    });
  }

  ngOnDestroy(){
    this.createForm.reset();
    this.createForm.get('id')?.patchValue(' ');
    this.createForm.get('email')?.patchValue(' ');
    this.createForm.get('nome')?.patchValue(' ');
    this.createForm.get('telefone')?.patchValue(' ');

  }

  createPessoa(){
    if(this.createForm.valid){
      this.pessoa = this.createForm.value;
      this.pessoaService.createPessoas(this.pessoa).subscribe(
        data =>{
          Swal.fire ({
            icon:'success',
            title:'Opaaa....',
            text: 'Usuario criado com sucesso',
          });
          this.router.navigate(['/pessoa-lista']);
        },
        error => {
          Swal.fire ({
            icon: 'error',
            title: 'Opaaaaa....',
            text: 'Erro na requisição',
          });
        }
      )
    }else{
      Swal.fire({
        icon:'error',
        title:'Opaaaa....',
        text:'Preencha os campos corretamente',
      });
    }
  }

editandoPessoa(){
  if(this.createForm.valid){
    this.pessoa = this.createForm.value;
    this.pessoaService.updatePessoa(this.pessoa).subscribe(
      data => {
        Swal.fire({
          icon:'success',
          title:'Opaaaa....',
          text:'Pessoa edidata com sucesso',
        });
        this.router.navigate(['/pessoa-list'])
      },
      error => {
        Swal.fire({
          icon:'error',
          title: 'Opaaaaa....',
          text:'Erro na requisição',
        });
      }
    )
  }else{
    Swal.fire({
      icon:'error',
      title:'Opaaaa.....',
      text:'Preencha os campos corretamente',
    });
  }
}



  


}
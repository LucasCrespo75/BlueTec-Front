import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pessoa } from '../model/pessoa.interface';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {


  api_url = environment.api_url;
  private dataEdit = new BehaviorSubject<Pessoa | null>(null);
  editButton  = this.dataEdit.asObservable();


   constructor(private http: HttpClient) { 
   }
 
   //listar todos
    findAll(){
     const headers = new HttpHeaders();
     return this.http.get<Pessoa[]>(this.api_url, {headers}).pipe(
       map(
         pessoaData =>{
         if(pessoaData){
           return pessoaData;
         }else{
           return [];
           }
         }
       )
     );
   }
 
   //criar
   createPessoas(createPessoa: Pessoa){
     const headers = new HttpHeaders();
     return this.http.post<Pessoa[]>(this.api_url, createPessoa, {headers}).pipe(
       map(
         pessoaData =>{
           return pessoaData;
          }
        )
    )
   
  }

  getPessoasPerList(pessoa: Pessoa){
    this.dataEdit.next(pessoa);
  }

 deletePessoa(id: number) {
  const headers = new HttpHeaders();
  return this.http.delete<Pessoa>(this.api_url+ '/'+ id, {headers}).pipe(
    map(
      pessoaData => {
        return pessoaData;
      }
    )
  )
}

  findPessoaById(id: number){
    const headers = new HttpHeaders();
    return this.http.get<Pessoa>(this.api_url+'/'+id,{headers}).pipe(
      map(
        pessoaData =>{
          return pessoaData;
        })
    )
  }

  updatePessoa(pessoaUpdate: Pessoa){
    const id = pessoaUpdate.id;
    const headers = new HttpHeaders();
    return this.http.put<Pessoa>(this.api_url + '/'+ id, pessoaUpdate, {headers}).pipe(
      map(
        pessoaData =>{
          return pessoaData;
        }
      )
    )
  }
}

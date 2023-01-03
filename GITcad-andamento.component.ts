import { Component, OnInit } from '@angular/core';
import { AndamentoService } from 'src/app/services/andamento.service';
import { ServicesInterface } from 'src/app/services/IServices';

@Component({
  selector: 'app-cad-andamento',
  templateUrl: './cad-andamento.component.html',
  styleUrls: ['./cad-andamento.component.css']
})
export class CadAndamentoComponent {
  displayedColumns: string[] = ['name', 'contact', 'service', 'value', 'date', 'status'];
  services!: ServicesInterface[];
  filter!:number;
  dataSource1!:ServicesInterface[];

  costTotal!:number;
  numObj!:number;

  constructor(private andamentoService: AndamentoService){

  }

  ngOnInit(){
    this.andamentoService.getAndamento().subscribe({next : (res) => this.services = res, error: (err) => console.log(err), complete:() => console.log("completou")});
  }


verificaData(filterDate:number, element:ServicesInterface[]){
  var filtrado = element.filter(function(obj) { return obj.date == filterDate; });
  this.dataSource1= filtrado;
  this.getTotalCost(filtrado);
  this.getTotalobj(filtrado);
}

getTotalCost(element:ServicesInterface[]) {
  this.costTotal= element.map(t => t.value).reduce((acc, value) => { if(value === undefined) {return acc}; return acc + value},0);
}

getTotalobj(element:ServicesInterface[]) {
  this.numObj= element.map(t => t.name).length;
}

verificaStatus(numb:number){
  if(numb ==0) {
    return 'Em andamento';
  }
  else{
    return 'Concluído'  
  }
} 


}



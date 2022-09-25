import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { CarrinhoService } from 'src/app/carrinho.service';
import { NotificacaoService } from 'src/app/notificacao.service';
import { IProduto, IProdutoCarrinho } from 'src/app/produtos';
import { ProdutosService } from 'src/app/produtos.service';

@Component({
  selector: 'app-detalhes-produto',
  templateUrl: './detalhes-produto.component.html',
  styleUrls: ['./detalhes-produto.component.css']
})
export class DetalhesProdutoComponent implements OnInit {

 
  produto: IProduto | undefined;
  quantidade = 1;


  constructor(
    private produtosService: ProdutosService,
    private route: ActivatedRoute,
    private notificacaoService: NotificacaoService,
    private carrinhoService: CarrinhoService,
  ) { }

  ngOnInit(): void {
    //debugger;
    const routeParam = this.route.snapshot.paramMap;
    const produtoId = Number(routeParam.get("id"));
    this.produto = this.produtosService.getOne(produtoId);
    console.log(this.produto?.descricao);
    
  }

  adicionarAoCarrinho(){
    this.notificacaoService.notificar("O produto foi adicionado ao carrinho!")
    const produto: IProdutoCarrinho = {
      ...this.produto!,
      quantidade: this.quantidade,
    }
    this.carrinhoService.adicionarAoCarrinho(produto)
  }
  
}

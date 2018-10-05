import { Component, OnInit } from '@angular/core';
import { CategoryService, cat } from '../../category.service';
import { Observable } from 'rxjs';
import { ProductService, product } from '../../product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  cats$:Observable<cat[]>;
  constructor(private catServ:CategoryService,private prodServ:ProductService) {
    this.cats$=this.catServ.getCats();
   }
  ngOnInit() {
  }
  save(prod) {
    this.prodServ.saveProduct(prod);
  }

}

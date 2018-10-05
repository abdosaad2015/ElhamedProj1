import { Component, OnInit } from '@angular/core';
import { CategoryService, cat } from '../../category.service';
import { Observable } from 'rxjs';
import { ProductService } from '../../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  cats$:Observable<cat[]>;
  constructor(private catServ:CategoryService,private productServ:ProductService,private route:Router) {
    this.cats$=this.catServ.getCats();
   }
  ngOnInit() {
  }
  save(product) {
    this.productServ.createProduct(product);
    this.route.navigate(['/admin/products']) ;
  }

}

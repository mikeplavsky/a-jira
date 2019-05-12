import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-releases',
  templateUrl: './releases.component.html',
  styleUrls: ['./releases.component.css']
})
export class ReleasesComponent implements OnInit {

  product:any;

  constructor(
    private productsSvc: ProductsService,
    private route: ActivatedRoute) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get("id");
    this.product = this.productsSvc.getProducts().filter(
      x => x.id == id
    );
  }

}

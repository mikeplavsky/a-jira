import { Component, OnInit, Input } from '@angular/core';
import {JiraService} from '../jira.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product:any;
  velocity:any;

  constructor(private jiraSvc: JiraService) { }
  ngOnInit() {
    this.jiraSvc.getVelocity(this.product.name).subscribe(v => {
      this.velocity = v;
    });
  }

}

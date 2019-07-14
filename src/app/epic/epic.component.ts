import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-epic',
  templateUrl: './epic.component.html',
  styleUrls: ['./epic.component.css']
})
export class EpicComponent implements OnInit {

  @Input() release;
  @Input() product;
  @Input() epic;

  constructor() { }

  ngOnInit() {
  }

}

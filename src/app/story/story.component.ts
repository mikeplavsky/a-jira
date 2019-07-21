import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {

  @Input() release;
  @Input() product;
  @Input() epic;
  @Input() story;
  
  constructor() { }

  ngOnInit() {
  }

}

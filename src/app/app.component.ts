import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(){

    document.addEventListener('click', (event)=>{
      if (window.getSelection().type == "Range") {
        event.stopPropagation();
      }
    },
    true);

  }
}

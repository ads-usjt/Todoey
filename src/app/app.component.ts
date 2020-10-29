import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'Todoey';
  showForm = false

  showDivFunction(show = false) {
    this.showForm = show
  }
}

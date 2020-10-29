import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Todoey';

  ngOnInit(): void {
    let div = document.getElementsByClassName('form-div')
    console.log(div[0])

  }
}

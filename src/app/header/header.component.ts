import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onAddReminder(form: NgForm){
    if (form.invalid) return;
        form.value.nome,
        form.value.fone,
        form.value.email
    form.resetForm();
  }
}

import { Component, EventEmitter, Output } from '@angular/core';
import { Register } from '../register-model/register'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  @Output() registerAdd = new EventEmitter();

  register: Register = new Register();

  onAddRegister() {
    this.registerAdd.emit(this.register);

  }

}

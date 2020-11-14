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

  // async onSubmit() {
  //   try {
  //     const result = await this.accountService.createAccount(this.account);

  //     // exibir uma msg amigavel aqui
  //     console.log(result);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

}

import { Component, EventEmitter, Output } from '@angular/core';
import { AccountService } from 'src/app/services/auth/account/account.service';
import { User } from '../../models/user.entity';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(private accountService: AccountService){}

  @Output() registerAdd = new EventEmitter();

  user = new User();

  async onSubmit() {
    try {
      const result = await this.accountService.createAccount(this.user);

      //TODO: exibir uma msg amigavel aqui
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

}

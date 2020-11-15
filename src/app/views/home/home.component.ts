import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { ReminderService } from '../../services/reminder.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Reminder } from '../../models/reminder.entity';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title = 'Todoey';
  showForm = false

  private modo: string = "criar";
  // private idCliente: string;
  // public cliente: Cliente;
  // public estaCarregando: boolean = false;
  public form: FormGroup;

  constructor(
    public reminderService: ReminderService,
    public route: ActivatedRoute
  ) { }

  id: string;
  reminder: Reminder;

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.modo = 'editar';
        this.id = paramMap.get('id');
        this.reminderService.getReminder(this.id).subscribe(reminder => {
          this.reminder = {
            id: reminder.id,
            title: reminder.title,
            deadline: reminder.deadline,
            insertedDate: reminder.insertedDate,
            body: reminder.body
          }
        });
      } else {
        this.modo = 'criar';
        this.id = null;
      }
    });
  }

  showDivFunction(show = false) {
    this.showForm = show
  }

  onAddReminder(form: NgForm) {
    if (form.invalid) return;

    if (this.modo === 'criar') {
      this.reminderService.addReminder(
        form.value.title,
        new Date(form.value.deadline).getTime(),
        form.value.body
      );
      this.showDivFunction()
    }
    // else {
    //     this.clienteService.atualizarCliente(
    //       this.id,
    //       form.value.nome,
    //       form.value.fone,
    //       form.value.email,
    //     );
    //   }
    //   form.resetForm();
  }
}

import { NgModule } from '@angular/core';

import { FeatherModule } from 'angular-feather';
import { Edit2, Trash2, Github, LogOut } from 'angular-feather/icons';

const icons = {
  LogOut,
  Edit2,
  Trash2,
  Github,
};

@NgModule({
  imports: [
    FeatherModule.pick(icons),
  ],
  exports: [
    FeatherModule,
  ],
})
export class IconsModule { }

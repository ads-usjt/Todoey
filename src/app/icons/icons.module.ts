import { NgModule } from '@angular/core';

import { FeatherModule } from 'angular-feather';
import { Edit2, Trash2, Github } from 'angular-feather/icons';

const icons = {
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

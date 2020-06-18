import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CommonHeaderComponent } from './common-header/common-header.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [CommonHeaderComponent, ConfirmModalComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [CommonHeaderComponent, ReactiveFormsModule, ConfirmModalComponent]
})
export class SharedModule { }

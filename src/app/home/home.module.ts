import { NgModule } from '@angular/core';
import { MatDialogModule, MatDialog } from '@angular/material';
import { SecretViewDialogComponent } from './secret/secret-view-dialog/secret-view-dialog.component'; 

@NgModule({
  exports: [
    MatDialogModule,
  ],
  imports: [
    MatDialogModule, MatDialog, SecretViewDialogComponent
  ],
  declarations: [
    SecretViewDialogComponent,
  ],
  entryComponents: [SecretViewDialogComponent]
})
export class HomeModule { }
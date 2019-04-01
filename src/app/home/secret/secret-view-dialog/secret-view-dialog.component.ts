import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { SecretModel } from 'src/app/secret/model/secret.model';

@Component({
  selector: 'app-secret-view-dialog',
  templateUrl: './secret-view-dialog.component.html',
  styleUrls: ['./secret-view-dialog.component.css']
})
export class SecretViewDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: SecretModel) {}

  ngOnInit() {
  }

}
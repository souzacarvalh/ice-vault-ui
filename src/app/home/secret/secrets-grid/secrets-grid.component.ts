import { Component, OnInit, ViewChild } from '@angular/core';
import { SecretModel } from 'src/app/secret/model/secret.model';
import { CryptoService } from 'src/app/crypto/crypto.service';
import { SecretViewDialogComponent } from 'src/app/home/secret/secret-view-dialog/secret-view-dialog.component'
import { CookieService } from 'ngx-cookie-service';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { SecretEventsService } from '../secret-events/secret-events.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-secrets-grid',
  templateUrl: './secrets-grid.component.html',
  styleUrls: ['./secrets-grid.component.css']
})
export class SecretsGridComponent implements OnInit {

  savedSecrets;
  displayedColumns: string[] = ['view', 'data', 'passphrase'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private cryptoService: CryptoService, private cookieService: CookieService, private secretEventsService: SecretEventsService
    , public dialog: MatDialog, private ngxService: NgxUiLoaderService) {
  }

  ngOnInit() {
    this.ngxService.start();

    // Initialization Data Load
    this.secretEventsService.getData().subscribe((data: SecretModel[]) => { this.refresh(data) },
        err => { this.handleError(err) });
    
    this.ngxService.stop();
  }

  refresh(data: SecretModel[]) {
    this.savedSecrets = data;
    this.dataSource = new MatTableDataSource<SecretModel>(this.savedSecrets);
    this.dataSource.paginator = this.paginator;
  }

  viewSecret(secret: SecretModel) {
    if (this.cookieService.check('icevault-auth')) {
      let authInfo = JSON.parse(this.cookieService.get('icevault-auth'));
      if (this.cryptoService.isBase64(secret.data)) {
        let revealed = this.cryptoService.decrypt(secret, authInfo.publicKey);
        this.dialog.open(SecretViewDialogComponent, {
          width: '700px',
          height: '250px',
          data: revealed
        });
      } else {
        this.dialog.open(SecretViewDialogComponent, {
          width: '700px',
          height: '250px',
          data: {
            data: `This secret was already revealed: ${secret.data}`
          }
        });
      }
    }
  }

  handleError(err) {
    this.dialog.open(SecretViewDialogComponent, {
      width: '700px',
      height: '250px',
      data: {
        data: `I'm sorry, something bad happened during the decrypting :( -> ${err}`
      }
    });
  }
}
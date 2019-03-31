import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { SecretModel } from 'src/app/secret/model/secret.model';
import { SecretService } from 'src/app/secret/secret.service';
import { CookieService } from 'ngx-cookie-service';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-secrets-grid',
  templateUrl: './secrets-grid.component.html',
  styleUrls: ['./secrets-grid.component.css']
})
export class SecretsGridComponent implements OnInit {

  savedSecrets;
  displayedColumns: string[] = ['data', 'passphrase'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private secretService: SecretService, private cookieService: CookieService, private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit() {
    this.refresh();
  }

  public refresh() {
    if (this.cookieService.check('icevault-auth')){
      let authInfo = JSON.parse(this.cookieService.get('icevault-auth'));
      let userId = authInfo.userId;
      
      this.secretService.listSecrets(userId).subscribe((res) => {
        this.savedSecrets = res;
        this.dataSource = new MatTableDataSource<SecretModel>(this.savedSecrets);
        this.dataSource.paginator = this.paginator;
        this.changeDetectorRefs.detectChanges(); }
      ),
      err => {
        this.handleError(err);
      };
    }
  }

  handleError(err) {

  }
}
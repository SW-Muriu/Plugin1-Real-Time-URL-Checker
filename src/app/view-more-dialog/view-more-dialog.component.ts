import { Component, Inject } from '@angular/core';
import { AppComponent } from '../app.component';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from "@angular/material/dialog";
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-view-more-dialog',
  standalone: true,
  imports: [
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './view-more-dialog.component.html',
  styleUrl: './view-more-dialog.component.scss'
})
export class ViewMoreDialogComponent {

  rawData: any;
  dataNames: any;
  objectKeys!: string[];
  indicateHide!: boolean;

  constructor(
    public dialogRef: MatDialogRef<AppComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.rawData = this.data.columns;
    this.dataNames = this.data.rows;
    this.objectKeys = Object.keys(this.dataNames);
    (this.objectKeys.length == 0) ? this.indicateHide = true : this.indicateHide = false
  }
}


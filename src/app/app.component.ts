import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ViewMoreDialogComponent } from './view-more-dialog/view-more-dialog.component';
import {samplePaths} from './sampledata'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    MatTableModule,
    MatButtonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'kudeda';
  columns: string[] = [
    "index",
    "urlPath",
    "action"
  ]

  // dataSource = [
  //   {  urlPath: 'Frontend Developer' },

  // ]

  // dataSource: any;

  dataSource = samplePaths


  currentIndex$ = signal<any>([]);

  constructor(
    public dialog: MatDialog,
    public router: Router
  ) { }

  ngOnInit(): void {
    const current_url = document.location.href;
    this.storeUrls(current_url);
    const data: any = localStorage.getItem("urls");
    // this.dataSource = JSON.parse(data);
  }

  getQueryParams(url: any): {} {
    const queryParams: any = {};
    if (url.includes('?')) {
      const queryString = url.split('?')[1];
      const pairs = queryString.split('&');
      pairs.forEach((pair: { split: (arg0: string) => [any, any]; }) => {
        const [key, value] = pair.split('=');
        queryParams[key] = decodeURIComponent(value);
      });
    }
    return queryParams;
  };


  storeUrls(url: any) {
    if (localStorage.getItem('urls')) {
      let pathData = localStorage.getItem("urls") || '';
      this.currentIndex$.update((c) => [...c, pathData]);
    }

    const queryParams = this.getQueryParams(url);
    this.currentIndex$.update((c) => [...c, url, queryParams]);
    localStorage.setItem('urls', JSON.stringify(this.currentIndex$()));
  }


  onRowClick(row: any): any {
    this.dialog.open(ViewMoreDialogComponent, {
      width: '60%',
      position: {},
      autoFocus: false,
      disableClose: false,
      data: {
        columns: Object.keys(row[1]),
        rows: row[1]
      }
    });
  }


  pathDirect() {
    this.router.navigate(['http://127.0.0.1:4200/']);
  }
}

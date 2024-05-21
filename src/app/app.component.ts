import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ViewMoreDialogComponent } from './view-more-dialog/view-more-dialog.component';

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

  dataSource = [
    [
      "https://www.ppomppu.co.kr/zboard/zboard.php?id=star",
      { id: "star" },
    ],
    [
      "https://www.ppomppu.co.kr/zboard/zboard.php?id=market_phone",
      { id: "market_phone" },
    ],
    [
      "https://www.ppomppu.co.kr/index.php",
      {},
    ],
    [
      "https://www.ppomppu.co.kr/zboard/view.php?id=etc_consult&no=30436&search_type=name&keyword=",
      { id: "etc_consult", no: "30436", search_type: "name", keyword: "" },
    ],
  ]


  currentIndex$ = signal<any>([]);


  constructor(
    public dialog: MatDialog,
  ) {
    
  }

  ngOnInit(): void {
    const current_url = document.location.href;
    console.log("current url",current_url)

    this.storeUrls(current_url);

   
  }

  getQueryParams(url: any): {} {
    const queryParams: any = {};

    // Check if the URL has query parameters
    if (url.includes('?')) {
      // Get the query string part of the URL
      const queryString = url.split('?')[1];

      // Split the query string into key-value pairs
      const pairs = queryString.split('&');

      // Loop through each pair
      pairs.forEach((pair: { split: (arg0: string) => [any, any]; }) => {
        // Split the pair into key and value
        const [key, value] = pair.split('=');

        // Add the key-value pair to the queryParams object
        queryParams[key] = decodeURIComponent(value);
      });
    }

    return queryParams;
  };


  storeUrls(url: any) {
    // Check if urls.json exists in local storage (optional, for backup)
    if (localStorage.getItem('urls')) {
      let pathData = localStorage.getItem("urls") || '';
      this.currentIndex$.update((c) => [...c, pathData]);
      // console.log("TT", this.currentIndex$)
    }

    // Get query string parameters
    const queryParams = this.getQueryParams(url);

    // Push the URL and its key-value parameters object to arrayUrls
    this.currentIndex$.update((c) => [...c, url, queryParams]);
    localStorage.setItem('urls', JSON.stringify(this.currentIndex$()));

    this.currentIndex$().subscribe((arg: any) => console.log(arg));
    
  }


  onRowClick(row: any): any {
    console.log("onRowClick", row[1])
    console.log("Oadasd", Object.keys(row[1]));
    
    this.dialog.open(ViewMoreDialogComponent, {
      width: '60%',
      position: {},
      autoFocus: false,
      disableClose: false, 
      data: {
        columns: Object.keys(row[1]),
        rows: row[1]
      }
    })

  }

}

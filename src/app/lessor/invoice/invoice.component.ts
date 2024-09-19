import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit ,OnDestroy{

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }

}

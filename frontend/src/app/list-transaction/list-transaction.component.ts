import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../_services/transaction.service';

@Component({
  selector: 'app-list-transaction',
  templateUrl: './list-transaction.component.html',
  styleUrls: ['./list-transaction.component.scss']
})
export class ListTransactionComponent implements OnInit {
  data: any;
  constructor(
    private transactionService: TransactionService
  ) { }

  ngOnInit(): void {
    this.transactionService.getListTransaction()
      .subscribe (response => {
        console.log(response);
        this.data = response['data'];
        console.log(this.data);
      });
  }

}

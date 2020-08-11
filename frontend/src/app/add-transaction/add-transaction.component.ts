import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TransactionService } from '../_services/transaction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss']
})
export class AddTransactionComponent implements OnInit {

  addTransactionForm: FormGroup;
  submitted = false;
  data: any;

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.addTransactionForm = this.fb.group({
      type: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  get f() { return this.addTransactionForm.controls; }

  onSubmit() {
    this.submitted = false;
    if (this.addTransactionForm.invalid) {
      this.submitted = true;
      return;
    } else {
      this.data = this.addTransactionForm.value;
      console.log(this.data);
      this.transactionService.saveTransaction(this.data)
        .subscribe(response => {
          console.log(response);
          alert(response.message);
          if (response.status === 'success' && response.code === 200) {
            this.router.navigate(['list']);
          }
        });
    }
  }


}

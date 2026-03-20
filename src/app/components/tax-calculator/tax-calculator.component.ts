import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaxCalculatorService, TaxResult } from '../../services/tax-calculator.service';
import { DISCLAIMER_UPDATE_DATE, PERSONAL_EXEMPTION } from '../../models/tax-config';

// PrimeNG Imports
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { DividerModule } from 'primeng/divider';
import { MessageModule } from 'primeng/message';
import { IftaLabelModule } from 'primeng/iftalabel';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-tax-calculator',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputNumberModule,
    ButtonModule,
    CardModule,
    PanelModule,
    DividerModule,
    MessageModule,
    IftaLabelModule,
    CheckboxModule
  ],
  templateUrl: './tax-calculator.html',
  styleUrl: './tax-calculator.css'
})
export class TaxCalculatorComponent implements OnInit {
  monthlyIncome: number = 0;
  annualIncome: number = 0;
  monthlyAllowances: number = 0;
  includeInsurance: boolean = true;
  
  result: TaxResult | null = null;
  lastUpdateDate: string = DISCLAIMER_UPDATE_DATE;
  standardExemption: number = PERSONAL_EXEMPTION;

  constructor(private taxService: TaxCalculatorService) {}

  ngOnInit(): void {
    this.calculate();
  }

  calculate(): void {
    this.annualGrossFromMonthly();
    if (this.annualIncome >= 0 && this.monthlyAllowances >= 0) {
      this.result = this.taxService.calculateTax(this.annualIncome, this.monthlyAllowances, this.includeInsurance);
    } else {
      this.result = null;
    }
  }

  annualGrossFromMonthly(): void {
    this.annualIncome = this.monthlyIncome * 12;
  }

  onInputChange(): void {
    this.calculate();
  }
}

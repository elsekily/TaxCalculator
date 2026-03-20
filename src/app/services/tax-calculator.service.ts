import { Injectable } from '@angular/core';
import { EGYPT_TAX_CONFIG, PERSONAL_EXEMPTION, TaxBracket, TaxEscalation } from '../models/tax-config';

export interface TaxResult {
  annualGross: number;
  annualNetTaxable: number;
  totalAnnualTax: number;
  annualNetSalary: number;
  monthlyNetSalary: number;
  monthlyTax: number;
  monthlyInsurance: number;
  totalAnnualInsurance: number;
  monthlyAllowances: number;
  totalAnnualAllowances: number;
  standardExemption: number;
}

@Injectable({
  providedIn: 'root',
})
export class TaxCalculatorService {
  constructor() {}

  calculateTax(annualIncome: number, monthlyAllowances: number, includeInsurance: boolean): TaxResult {
    // 1. Calculate Social Insurance Fee
    const monthlyGross = annualIncome / 12;
    let monthlyInsurance = 0;
    
    if (includeInsurance) {
      // Base for insurance is capped between 2,700 and 16,700
      const insuranceBase = Math.max(2700, Math.min(monthlyGross, 16700));
      monthlyInsurance = insuranceBase * 0.11;
    }
    
    const totalAnnualInsurance = monthlyInsurance * 12;
    const totalAnnualAllowances = monthlyAllowances * 12;

    // 2. Calculate Net Taxable Income
    const income = Math.max(0, annualIncome);
    
    // Taxable Income = Gross - Social Insurance - Standard Personal Exemption
    // Allowances are added post-tax, they do not reduce taxable income.
    let annualNetTaxable = income - totalAnnualInsurance - PERSONAL_EXEMPTION;
    annualNetTaxable = Math.max(0, annualNetTaxable);

    // 2. Determine Escalation Category
    const escalation = this.getEscalation(annualNetTaxable);
    
    // 3. Calculate Tax based on brackets
    let totalAnnualTax = 0;
    
    for (const bracket of escalation.brackets) {
      if (annualNetTaxable > bracket.from) {
        const taxableInThisBracket = bracket.to 
          ? Math.min(annualNetTaxable, bracket.to) - bracket.from
          : annualNetTaxable - bracket.from;
        
        if (taxableInThisBracket > 0) {
          totalAnnualTax += taxableInThisBracket * bracket.rate;
        }
      }
    }

    const annualNetSalary = income - totalAnnualTax - totalAnnualInsurance + totalAnnualAllowances;
    
    return {
      annualGross: income,
      annualNetTaxable: annualNetTaxable,
      totalAnnualTax: totalAnnualTax,
      annualNetSalary: annualNetSalary,
      monthlyNetSalary: annualNetSalary / 12,
      monthlyTax: totalAnnualTax / 12,
      monthlyInsurance: monthlyInsurance,
      totalAnnualInsurance: totalAnnualInsurance,
      monthlyAllowances: monthlyAllowances,
      totalAnnualAllowances: totalAnnualAllowances,
      standardExemption: PERSONAL_EXEMPTION,
    };
  }

  private getEscalation(netTaxable: number): TaxEscalation {
    for (const esc of EGYPT_TAX_CONFIG) {
      if (esc.maxIncome === null || netTaxable <= esc.maxIncome) {
        return esc;
      }
    }
    return EGYPT_TAX_CONFIG[EGYPT_TAX_CONFIG.length - 1];
  }
}

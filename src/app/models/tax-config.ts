export interface TaxBracket {
  rate: number;
  from: number;
  to: number | null; // null means info "to infinity"
}

export interface TaxEscalation {
  maxIncome: number | null;
  brackets: TaxBracket[];
}

export const EGYPT_TAX_CONFIG: TaxEscalation[] = [
  {
    // Net Income <= 600,000
    maxIncome: 600000,
    brackets: [
      { rate: 0, from: 0, to: 40000 },
      { rate: 0.1, from: 40000, to: 55000 },
      { rate: 0.15, from: 55000, to: 70000 },
      { rate: 0.2, from: 70000, to: 200000 },
      { rate: 0.225, from: 200000, to: 400000 },
      { rate: 0.25, from: 400000, to: null },
    ],
  },
  {
    // Net Income 600,000 - 700,000
    maxIncome: 700000,
    brackets: [
      { rate: 0.1, from: 0, to: 55000 },
      { rate: 0.15, from: 55000, to: 70000 },
      { rate: 0.2, from: 70000, to: 200000 },
      { rate: 0.225, from: 200000, to: 400000 },
      { rate: 0.25, from: 400000, to: null },
    ],
  },
  {
    // Net Income 700,000 - 800,000
    maxIncome: 800000,
    brackets: [
      { rate: 0.15, from: 0, to: 70000 },
      { rate: 0.2, from: 70000, to: 200000 },
      { rate: 0.225, from: 200000, to: 400000 },
      { rate: 0.25, from: 400000, to: null },
    ],
  },
  {
    // Net Income 800,000 - 900,000
    maxIncome: 900000,
    brackets: [
      { rate: 0.2, from: 0, to: 200000 },
      { rate: 0.225, from: 200000, to: 400000 },
      { rate: 0.25, from: 400000, to: null },
    ],
  },
  {
    // Net Income 900,000 - 1,200,000
    maxIncome: 1200000,
    brackets: [
      { rate: 0.225, from: 0, to: 400000 },
      { rate: 0.25, from: 400000, to: null },
    ],
  },
  {
    // Net Income > 1,200,000
    maxIncome: null,
    brackets: [
      { rate: 0.25, from: 0, to: 1200000 },
      { rate: 0.275, from: 1200000, to: null },
    ],
  },
];

export const PERSONAL_EXEMPTION = 20000;
export const DISCLAIMER_UPDATE_DATE = 'March 2026';

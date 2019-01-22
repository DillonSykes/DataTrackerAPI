import { Account } from "./account";

export class LiquidAssets {
  bank: string;
  checkingAcctBalance: number;
  savingsAcctBalance: number;
  intrestRateOfSavingsAccount: number;
  accounts: Account[];
  nonRetirementAccounts: string[];
  retirementAccounts: string[];
  numberOfCars: number;
  otherAccounts: string[];
}

import { Person } from "./person";
import { ChildCaretaker } from "./child-caretaker";
import { LiquidAssets } from "./liquid-assets";
import { Goals } from "./goals";
import { Own, Rent } from "./dwelling";
import { Family } from "./family";

export class Session {
  session_id: string;
  client_1: Person;
  client_2: Person;
  children: Person[];
  grandChildren: Person[];
  child_caretaker: ChildCaretaker;
  college_plans: number;
  liquid_assets: LiquidAssets;
  goals: Goals;
  homes: Own[];
  rental: Rent;
  client1Family: Family;
  client2Family: Family;
}

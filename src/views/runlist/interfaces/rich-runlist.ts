import { HmiMemOptionElement } from '../../../wamphooks/procedures/use-procedure-hmimanager-getbprdepositoptions';
import { HmiRun } from '../../../wamphooks/procedures/use-procedure-hmimanager-getlaserrunlist';

export interface RichHmiRun extends HmiRun {
  optionValues: HmiRunOptionValue[];
}

export interface HmiRunOption {
  id: number;
  name: string;
  description: string;
  minValue: number;
  maxValue: number;
  values: HmiMemOptionElement[];
}

export interface HmiRunOptionValue {
  id: number;
  value: number;
}

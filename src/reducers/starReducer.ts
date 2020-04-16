import _ from "lodash";
import { NumberElement } from "../components/NumberComponent";

export const getNextStarsCount = (numbers: Array<NumberElement>, selectedNumber?: number) => {
  //FIXME: This function is getting called multiple times.

  const numbersWithoutSelectedNumber = selectedNumber !== null ?
    numbers.filter(number => number.value !== selectedNumber) : numbers;

  const nums = numbersWithoutSelectedNumber
    .filter(number => number.status === "DEFAULT")
    .map(n => n.value);

  if (nums.length === 0)
    return 0;

  if (nums.length === 1)
    return nums[0];

  const res = _.shuffle(nums)
    .slice(0, 2)
    .reduce((sum, current) => sum + current, 0);
  return res;
}

export class StarReducerAction {
  actionType: string;
  numbers: NumberElement[];
  currentNumber: number;
  constructor(actionType: string, numbers: NumberElement[], currentNumber: number) {//, currentStarsCount: number) {
    this.actionType = actionType;
    this.numbers = numbers;
    this.currentNumber = currentNumber;
  }
}

export function starsReducer(state: number, action: StarReducerAction) {
  switch (action.actionType) {
    case "INIT":
      return getNextStarsCount(action.numbers);
    case "CLICKED_ON_DEFAULT":
      return state === action.numbers
        .filter((n) => n.status === "MARKED" || n.status === "WRONG")
        .map((n) => n.value)
        .reduce((sum, current) => sum + current, 0) + action.currentNumber ?
        getNextStarsCount(action.numbers, action.currentNumber) : state;
    case "CLICKED_ON_WRONG":
      return state === action.numbers
        .filter((n) => n.status === "MARKED" || n.status === "WRONG")
        .map((n) => n.value)
        .reduce((sum2, current) => sum2 + current, 0) - action.currentNumber ?
        getNextStarsCount(action.numbers, action.currentNumber) : state;
    default:
      return state;
  }
}
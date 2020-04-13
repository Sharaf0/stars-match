import _ from "lodash";

export const getNextStarsCount = (numbers) => {
  //FIXME: This function is getting called multiple times.
  const nums = numbers.filter(number => number.status === "DEFAULT").map(n => n.number);

  if (nums.length === 0)
    return 0;

  if (nums.length === 1)
    return nums[0];

  const res = _.shuffle(nums)
    .slice(0, 2)
    .reduce((sum, current) => sum + current, 0);
  return res;
}

export const starsReducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      return getNextStarsCount(action.numbers);
    case "CLICKED_ON_DEFAULT":
      return state === action.numbers
        .filter((n) => n.status === "MARKED" || n.status === "WRONG")
        .map((n) => n.number)
        .reduce((sum, current) => sum + current, 0) + action.number ? getNextStarsCount(_.reject(action.numbers, { number: action.number })) : state;
    case "CLICKED_ON_WRONG":
      return state === action.numbers
        .filter((n) => n.status === "MARKED" || n.status === "WRONG")
        .map((n) => n.number)
        .reduce((sum2, current) => sum2 + current, 0) - action.number ? getNextStarsCount(_.reject(action.numbers, { number: action.number })) : state;
    default:
      return state;
  }
}


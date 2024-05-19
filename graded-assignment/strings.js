import bank from "./bank.js";

let noBalance = `This bank does not give loans to people with no money in their account. Please earn some money and try again.`;
let hasLoan = `You owe the bank ${bank.loan} NOK. You must pay down your outstanding debt before you apply for a new loan!`;
let noPay = `You haven't earned any money with which to repay your loan.`;

let strings = {
  noBalance,
  hasLoan,
  noPay,
};

export default strings;

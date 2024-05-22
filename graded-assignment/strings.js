const noBalance = `This bank does not give loans to people with no money in their account. Please earn some money and try again.`;
const hasLoan = (loan) => `You owe the bank ${loan},00 kr. You must pay down your outstanding debt before you apply for a new loan!`;
const noPay = `You haven't earned any money with which to repay your loan.`;
const tooLargeLoan = (sum) => `You can't apply for a loan of more than ${sum * 2},00 kr`;
const onlyNumber = `You can only input a number, please try again or contact customer support.`;
const loanAmount = (balance) => `You are elligble for a loan. How much do you wish to borrow? Please note, you may not borrow more than ${balance * 2},00 kr`;
const noMoneyEarned = `You haven't earned any money to deposit to your account. Go to work, and try again.`;
const splitDepositMade = (deposit) => `${deposit * 0.9},00 kr deposited to your account and ${deposit * 0.1},00 kr paid towards your loan.`;
const depositMade = (deposit) => `${deposit},00 kr deposited to your account.`;
const balanceSplitPaid = (loan, pay) => `${loan},00 kr paid towards your loan. The rest (${pay - loan},00 kr) was deposited to your account.`;
const balancePaid = (pay) => `${pay},00 kr paid towards your loan.`;
const chooseLaptop = `You must select a laptop model in order to make a purchase.`;
const notEnoughMoney = `You don't have enough money to buy this laptop.`;
const congratulations = `Congratulations, you've bought a laptop! Now you're ready to take on the world!`;

let strings = {
  noBalance,
  hasLoan,
  noPay,
  tooLargeLoan,
  onlyNumber,
  loanAmount,
  noMoneyEarned,
  splitDepositMade,
  depositMade,
  balanceSplitPaid,
  balancePaid,
  chooseLaptop,
  notEnoughMoney,
  congratulations,
};

export default strings;

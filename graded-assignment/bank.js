let balance = 0;
let loan = 0;
let pay = 0;

function deposit(amount) {
  balance += amount;
  pay = 0;
}

function withdraw(amount) {
  balance -= amount;
}

function payLoan(amount) {
  loan -= amount;
  pay = 0;
}

function loanAccepted(amount) {
  loan += amount;
  balance += amount;
}

function getBalance() {
  return balance;
}

function getLoan() {
  return loan;
}
function getPay() {
  return pay;
}

function work(amount) {
  pay += amount;
  return pay;
}

const bank = {
  deposit,
  withdraw,
  getBalance,
  getLoan,
  loanAccepted,
  payLoan,
  work,
  getPay,
  balance,
  loan,
  pay,
};

export default bank;

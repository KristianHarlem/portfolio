import bank from "./bank.js";
import strings from "./strings.js";

//DOM Elements
const selectLaptops = document.getElementById("laptopSelector");
const laptopUsps = document.getElementById("features");
const laptopPic = document.getElementById("buyImg");
const laptopName = document.getElementById("laptopTitle");
const laptopDescription = document.getElementById("laptopDescription");
const laptopPrice = document.getElementById("price");
const accountBalance = document.getElementById("balanceInfo");
const outstandingLoan = document.getElementById("loanInfo");
const loanButton = document.getElementById("loanButton");
const workButton = document.getElementById("workButton");
const earnedAmount = document.getElementById("earnedAmount");
const bankButton = document.getElementById("bankButton");
const myModal = document.getElementById("modalContainer");
const modalText = document.getElementById("modalText");
const closeModal = document.getElementById("close");
const payBalance = document.getElementById("payBalanceButton");
const buyLaptop = document.getElementById("buyButton");

//Variables
const laptopApiUrl = "https://hickory-quilled-actress.glitch.me/computers";
let laptopDetails = [];
let pay = bank.getPay();
let loan = bank.getLoan();

//Functions
async function getLaptopDetails() {
  const resp = await fetch(laptopApiUrl);
  const json = await resp.json();
  laptopDetails = json;
  console.log(laptopDetails);
  renderLaptops(laptopDetails);
  renderFeatures(laptopDetails);
  renderPicture(laptopDetails);
  renderLaptopName(laptopDetails);
  renderLaptopDescription(laptopDetails);
  renderPrice(laptopDetails);
}

getLaptopDetails();
setBalance();
setPay();

function renderLaptops(laptopData) {
  for (const currentLaptop of laptopData) {
    let newSelect = document.createElement("option");
    newSelect.innerText = currentLaptop.title;
    selectLaptops.appendChild(newSelect);
  }
}

function renderFeatures(laptopData) {
  laptopUsps.innerHTML = "";

  const selectedIndex = selectLaptops.selectedIndex;

  if (selectedIndex === 0) {
    return;
  }

  const selectedLaptop = laptopData[selectedIndex - 1];

  for (const spec of selectedLaptop.specs) {
    let newFeature = document.createElement("li");
    newFeature.innerText = spec;
    laptopUsps.appendChild(newFeature);
  }
}

selectLaptops.addEventListener("change", function () {
  renderFeatures(laptopDetails);
  renderPicture(laptopDetails);
  renderLaptopName(laptopDetails);
  renderLaptopDescription(laptopDetails);
  renderPrice(laptopDetails);
});

function renderPicture(laptopData) {
  const selectedIndex = selectLaptops.selectedIndex;
  if (selectedIndex === 0) {
    laptopPic.src = "";
    laptopPic.alt = "";
  } else {
    const imageUrl = laptopData[selectedIndex - 1].image;
    const imageAlt = laptopData[selectedIndex - 1].title;
    laptopPic.src = "https://hickory-quilled-actress.glitch.me/" + imageUrl;
    laptopPic.alt = `A picture of ${imageAlt}`;
  }
}

function renderLaptopName(laptopData) {
  let selectedIndex = selectLaptops.selectedIndex;
  if (selectedIndex === 0) {
    laptopName.innerHTML = "Please choose a laptop";
  } else {
    laptopName.innerText = laptopData[selectedIndex - 1].title;
  }
}

function renderLaptopDescription(laptopData) {
  let selectedIndex = selectLaptops.selectedIndex;
  if (selectedIndex === 0) {
    laptopDescription.innerText = "Please choose a laptop";
  } else {
    laptopDescription.innerText = laptopData[selectedIndex - 1].description;
  }
}

function renderPrice(laptopData) {
  let selectedIndex = selectLaptops.selectedIndex;
  if (selectedIndex === 0) {
    laptopPrice.innerText = "N/A";
  } else {
    laptopPrice.innerText = laptopData[selectedIndex - 1].price + " NOK";
  }
}

function setBalance() {
  let balance = bank.getBalance();
  let loan = bank.getLoan();
  accountBalance.innerText = Intl.NumberFormat("no-NB", {
    style: "currency",
    currency: "NOK",
  }).format(balance);
  let loanAlready = bank.getLoan();
  outstandingLoan.innerText = Intl.NumberFormat("no-NB", {
    style: "currency",
    currency: "NOK",
  }).format("-" + loanAlready);
  console.log(loan + " is the loan");
  if (loan > 0) {
    showLoan.style.display = "flex";
    payBalanceWrapper.style.display = "flex";
  } else {
    showLoan.style.display = "none";
    payBalanceWrapper.style.display = "none";
  }
}

loanButton.addEventListener("click", function () {
  console.log("Loanbutton was clicked");
  loanApplication();
});

function makeModal(text) {
  myModal.style.display = "block";
  modalText.innerHTML = text;
}

closeModal.addEventListener("click", function () {
  myModal.style.display = "none";
});

window.addEventListener("click", function (event) {
  if (event.target == myModal) {
    myModal.style.display = "none";
  }
});

function loanApplication() {
  let loan = bank.getLoan();
  let balance = bank.getBalance();
  if (loan > 0) {
    makeModal(strings.hasLoan);
  } else if (balance === 0) {
    makeModal(strings.noBalance);
  } else {
    let application = prompt(
      `You are elligble for a loan. How much do you wish to borrow? Please note, you may not borrow more than ${
        balance * 2
      },00 kr`,
      `${balance * 2}`
    );
    if (application <= balance * 2) {
      console.log("Loan: ", application * 1);
      bank.loanAccepted(application * 1);
      // console.log(bank.loanAccepted());
      setBalance(), setPay();
      console.log("Balance: ", balance);
      // console.log("Loaned: ", bank.loan, "Applied: ", application);
    } else if (application > balance * 2) {
      makeModal(`You can't apply for a loan of more than ${balance * 2}`);
    } else {
      makeModal(
        "You can only input a number, please try again or contact customer support."
      );
    }
  }
}

function setPay() {
  let currentPay = bank.getPay();
  earnedAmount.innerText = Intl.NumberFormat("no-NB", {
    style: "currency",
    currency: "NOK",
  }).format(currentPay);
}

workButton.addEventListener("click", function () {
  bank.work(100);
  setPay();
  bank.getPay();
});

bankButton.addEventListener("click", function () {
  let pay = bank.getPay();
  let loan = bank.getLoan();
  console.log("Pay: " + pay + ", Loan: " + loan);
  if (pay <= 0) {
    makeModal(
      "You haven't earned any money to deposit to your account. Go to work, and try again."
    );
    console.log("Pay is less than or equal to 0");
  } else if (loan > 0 && pay > 0) {
    bank.deposit(pay * 0.9);
    bank.payLoan(pay * 0.1);
    setPay();
    setBalance();
    makeModal(
      `${pay * 0.9},00 kr deposited to your account and ${
        pay * 0.1
      },00 kr paid towards your loan.`
    );
  } else if (pay > 0) {
    bank.deposit(pay);
    setPay();
    setBalance();
    makeModal(`${pay},00 kr deposited to your account.`);
  } else if (loan < 0) {
    console.log("You have a loan");
  }
});

payBalance.addEventListener("click", function () {
  let pay = bank.getPay();
  let loan = bank.getLoan();
  let balance = bank.getBalance();

  console.log("Pay: " + pay + ", Loan: " + loan);

  if (pay <= 0) {
    makeModal(strings.noPay);
  } else {
    if (pay - loan > 0) {
      console.log("Loan minus pay = ", pay - loan);
      bank.payLoan(loan);
      bank.deposit(pay - loan);
      makeModal(
        `${loan},00 kr paid towards your loan. The rest (${
          pay - loan
        },00 kr) was deposited to your account.`
      );
    } else {
      bank.payLoan(pay);
      makeModal(`${pay},00 kr paid towards your loan.`);
    }
    setBalance();
    setPay();
  }
});

buyLaptop.addEventListener("click", function () {
  let selectedIndex = selectLaptops.selectedIndex;
  let balance = bank.getBalance();
  let price = 200;
  if (selectedIndex === 0) {
    makeModal(`You must select a laptop model in order to make a purchase.`);
  } else if (price > balance) {
    makeModal(`You don't have enough money to buy this laptop.`);
  } else {
    bank.withdraw(price);
    makeModal(
      `Congratulations, you've bought a laptop! Now you're ready to take on the world!`
    );
  }
  setBalance();
});
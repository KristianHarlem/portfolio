// let array = ["Ellaria", "Staffordshire Bull Terrier", "Female", 10];

// console.log(array);

// array.push = "Brindle";

// console.log(array);

// array.pop;

// console.log(array);

// const object = {
//   name: "Ellaria",
//   breed: "Staffordshire Bull Terrier",
//   gender: "Female",
//   age: 10,
// };

// console.log(object);

// let username = "Kristian";
// let password = "Secret123";

// if (username === "Kristian" && password === "Secret1234") {
//   console.log("Access granted");
// } else {
//   console.log("Fuck off");
// }

// const price = 10;
// const bread = {
//   description: "Sourdough",
//   price: 10
// };

// function buyTwo(price, description) {
//   price = price * 2;
//   bread.price = bread.price * 2;
// }

// buyTwo(price, bread);

// console.log("Price is: " + price);
// console.log("Price should be: " + bread.price);

// const ages = [ 25, 16, 83, 4, 12, 11, 41, 33 ];

// ages.push(334);

// console.log("After adding 334");
// console.log("Number of ages: " + ages.length);
// console.log(ages);

let users = [{
  firstName: "Kristian",
  lastName: "Harlem",
  age: 36,
  height: 190,
  fullName : function() {
    return this.firstName + " " + this.lastName + " er " + this.age + " år gammel og " + this.height + "cm høy";
  }
},
  {
    firstName: "Alfred",
    lastName: "Birketvedt",
    age: 30,
    height: 195,
    fullName : function() {
      return this.firstName + " " + this.lastName + " er " + this.age + " år gammel og " + this.height + "cm høy";
    }
  }
]

console.log (users[0].fullName());
console.log (users[1].fullName());
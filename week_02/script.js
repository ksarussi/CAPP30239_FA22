/* 
This is a javascript example for 
week 2.
*/ 

// inline comment

let num = 100; // another inline comment

function foo() {
    let num2 = 200;
    console.log(num2)

}; // semicolon is optional

foo(); // need to call hte function here for this to work and see it in console

/* javascript has a conecpt of scoping...
if we say letnum2 = 200, we cannot see let num2 
outside of this function. can only see it in the function
*/

/* instead, put the console.log(num2) inside the function, not outside

console.log(num2); */

// create an anonymous function (something that's not named)
let anonFun = function() {
    console.log("hello");

};
// shortcut for an anonymous function is called an arrow function
//ex)

/* let anonFun = () => console.log("hello"); */ 

// these two anonFun are equivalent, one just uses shorthand
// most people use arrow functions now because they are faster

// we've commentd out one of hte anonFun so that our code runs (
    // it doesn't work if we have 2 functions named the same thing)

(function() {
    console.log("hi")

});

// we can also take var name of the person
let person = "Summer";
function people(people_name) { // function called people 
    console.log("Hello" + people_name)
};

people(person); //run this and you should see hello summer in console

// arrays / lists
let arr = ["foo", 123, ["zar", "bar"]];

//put these in the console by doing this
console.log(arr[2]); // indexed to zero

// rename an itemin an aray
arr[1] = "barbar";
console.log(arr);

// add item to end of array
arr.push("car");
console.log(arr[3]);

// remove an item from the array(index, deleteCount)
arr.splice(2,1); // remove stuff at a specific index and say how many to remove
console.log(arr);

// remove everhything after foo barbar
//arr.splice(2,2);

// loop thru array
for (let item of arr) {
    console.log(item);
}

// let is keyword for creating a variable
//arr = array
//item = item you are on

// get index of array
for (let i in arr) {
    console.log(i + " " + arr[i]);
}

// difference between let item in vs let item of 
// think of "of" as giving you the name
// "in" gives you the index of the thing


// loop thru each item in hte aray with its index - foreach
arr.forEach((item, i) => console.log(i, + " " + item));

// objects
let obj1 = {
    name: "Jill",
    age: 85,
    job: "Cactus Hunter",
};

// two ways to look at object
console.log(obj1.name); // this will get you value for name 

// aslo can do it via bracket notation
console.log(obj1["name"]);
// 107 and 110 do hte sameth ing

obj1.job = "Barista" // change obj1 job from cactus hunter to barista
console.log(obj1);

// set value with a string
for (let key in obj1) { // loop thru keys
    let value = obj1[key];
    console.log(`${key}: ${value}`); // new away to console log
}

// old version console log
console.log("hello " + obj1["name"] + " " + num ); // old way to do it
console.log(`hello ${obj1["name"]} ${num}`); // new way to do it


// for loop another way
// uses an iterator
for (let i = 0; i < 10; i++) { // helps you keep track of where you are
    console.log(i);
}
// if else
/* if (x > 50) {
    console.log("Above average");
} else if (x > 5) {
    console.log("below average");
} else {
    console.log("Really Below Average");
}

// faster way to do this...only one layer of if/else tho
// not multiple if else clauses
let y = (x > 50) ? "Above Average" : "Below Average";
*/ 
// TRAVERSE THE DOM // 
let example = document.getElementById("example"); // examle is the var name
// you can have > 1 class on a page but only 1 id
// to add something to this div: 
example.innerHTML += "Hello World"; // += means append to
// avoid erro by moving script src in indexhtml to bottom of body 
// not heade


/*
///////////////////////////////////BASICS////////////////////////////
*/

/*
NOTE: 
-Varaibles are case sensisitve in JS
-Write variable names in JavaScript in camelCase
var thisVariableNameIsLong;
*/

/*
Declare a variable 
    - You can't use variable that is n't declared or initialized
*/
var a;
a = 10;
var b = 10;  //one step initialization

//console.log(pp); //Reference Error : pp is not defined

/*
- When declared but not initialized, it is undefined 
- Any mathematical operation on undefined will give NaN
- String conversion will give : undefined
*/
//
// and no operation can't be done on it
var newVar;
console.log(5*newVar);   //NaN
newVar += "Name";
console.log(newVar);  //Result: undefinedName

/*
- var vs let
    //0. var can be initialized first and then declared (called hoisting), but not with let.
    //1. var can be re-declared for the same variable, but not let.
    //2. calling var z before definition will return undefined,
    //  but calling let a before definition will give error
    //3. var declared after initialization is hoised, where as let and const doesn't allow that.
    // So hoisting is - "taking declaration to the top of the function or scope"
*/
//0
xx = 10;
var xx;
console.log(xx)

//1.
var a = 10;
var a = 20;   //No error here, same variable overwritten

//let a = 10;  //SyntaxError: Identifier 'a' has already been declared, because of var a
//let b = 10;  //SyntaxError: Identifier 'b' has already been declared

//2.
// calling var z before definition will return undefined
console.log(z, "\n");
var z = 2;
 
// calling let a before definition will give error
//console.log(d);  //Cannot access 'd' before initialization
let d = 3;

//3.
// var a declaration is hoisted to the top
// program to display value
a = 5;
console.log(a);
var a; // 5
//But remember, the initialization is not hoisted to the top.
console.log(zz);  // prints : undefined
var zz = 5; 

//NOTE: bb is hoised at the function level, but not to global level
var a = 4;

function greet() {
    bb = 'hello';
    console.log(bb); // hello
    var bb;
}

greet(); // hello
//console.log(bb);  //Reference Error : bb is not defeined


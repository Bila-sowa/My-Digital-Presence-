do {
    var ageInput = prompt("Enter your age: ", "18");
    if (ageInput === null || ageInput.trim() === "") {
        alert("Please enter your age");
        continue;
    }
    var age = parseInt(ageInput);
    if (isNaN(age)) {
        alert("Invalid age entered");
        continue;
    }
    if (age >= 18 && age <= 100) {
        console.log("age:", age);
        break;
    } else {
        alert("Age must be between 18 and 100");
    }
} while (true);


// do{
//     break
// }while (true);

function print(word) {
    console.log(word);
}

// function add(x, y) {
//     if (x === null && y === null) {
//         console.error("Error");
//     } else if(x !== Number && y !== Number){
//         var res = x + y;
//         console.log("Result: " + res);
//     } else {
//         console.error("Error");
//     }
// }


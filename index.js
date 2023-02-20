import inquirer from 'inquirer';
let user = {
    name: "John Doe",
    pin: 1001,
    balance: 100000
};
console.log("Welcome to ATM Project using TS. The pin code for account name:'john Doe' is: 1001");
const resp = await inquirer.prompt([
    {
        message: "please Enter Pin: ",
        name: "pin",
        type: "password",
    },
]);
console.log("resp: ", resp);
let contunueTransaction = true;
if (Number(resp.pin) !== user.pin) {
    console.log("You have entered an incorrect pin");
}
else {
    while (contunueTransaction == true) {
        const resp = await inquirer.prompt([
            {
                name: "selectedType",
                message: "Please select an option",
                type: 'list',
                choices: ['Withdraw', 'Fast Cash', 'Balance Inquiry'],
            },
            {
                name: "amount",
                message: "Please Select your amount",
                type: 'list',
                choices: ['1000', '2000', '3000', "5000", "10000"],
                when(resp) {
                    return resp.selectedType == "Fast Cash";
                }
            },
            {
                name: "amount",
                message: "Please Enter Your Amount",
                when(resp) {
                    return resp.selectedType == "Withdraw";
                }
            }
        ]);
        console.log('selected Type: ', resp);
        if (resp.selectedType == "Balance Inquiry") {
            console.log(`Your Balance is: ${user.balance}`);
            const toRepeat = await inquirer.prompt([
                {
                    name: "repeat",
                    type: "confirm",
                    message: "Do you want to Continue Transaction? ",
                }
            ]);
            if (toRepeat.repeat == true) {
                contunueTransaction = true;
            }
            else {
                contunueTransaction = false;
            }
        }
        else {
            user.balance = user.balance - resp.amount;
            console.log(`Your New Balance is: ${user.balance}`);
            contunueTransaction = false;
        }
    }
}

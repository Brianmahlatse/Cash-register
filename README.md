# Cash-register
Cash Register Project

This project is part of the FreeCodeCamp curriculum and is required for certification. The goal of this project is to design a function checkCashRegister() that determines the amount of change to return to a customer based on the purchase price, payment, and cash in the register.
Function Description

checkCashRegister() takes three arguments:

    price: the purchase price
    cash: the payment received
    cid: an array of arrays representing the cash in the register

The function should always return an object with two keys:

    status: a string indicating the status of the transaction
    change: an array indicating the amount and denomination of the change due

Status

There are three possible values for the status key:

    "INSUFFICIENT_FUNDS": if cash-in-drawer is less than the change due, or if you cannot return the exact change.
    "CLOSED": if cash-in-drawer is equal to the change due.
    "OPEN": if cash-in-drawer is greater than the change due.

Change

The change key is an array of arrays representing the amount and denomination of the change due, sorted in highest to lowest order.

Example Usage

const result = checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
console.log(result);
// {status: "OPEN", change: [["QUARTER", 0.5]]}

Contributing

Contributions to this project are welcome. You can submit an issue if you find any bugs or would like to suggest improvements, or create a pull request if you would like to contribute code.

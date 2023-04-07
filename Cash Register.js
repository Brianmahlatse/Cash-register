//Define function to return the highest currency unit required for change
function getChange(changeNeeded) {
    // Define available coins/bills and their values
    const coinsBills = [
      ["PENNY", 0.01],
      ["NICKEL", 0.05],
      ["DIME", 0.1],
      ["QUARTER", 0.25],
      ["ONE", 1],
      ["FIVE", 5],
      ["TEN", 10],
      ["TWENTY", 20],
      ["ONE HUNDRED", 100]
    ];
    // Initialize array to store the required coin/bill
    const requiredCoinOrBill = [];
    // Loop through coins/bills array
    for (let amount of coinsBills) {
      // Check if coin/bill is less than or equal to change needed
      if (amount[1] <= changeNeeded) {
        // If yes, add the coin/bill to requiredCoinOrBill array
        requiredCoinOrBill.push([...amount]);
      }
    }
    // Return the highest coin/bill that is less than or equal to changeNeeded
    return requiredCoinOrBill[requiredCoinOrBill.length - 1];
  };
  
  function checkCashRegister(price, cash, cid){
      // calculate total cash in drawer
      let totalCashInDrawer= cid.reduce((sum,amount)=> sum+amount[1],0);
      // calculate the change due
      let changeDue=cash-price;
      // variables to store the current note/coin and its currency unit
      let currentNoteOrCoin,currencyUnitOfcurrentNoteOrCoin;
      // array to store the notes and coins to be returned as change
      const changeNotesCoins=[];
      
    
      // if change due is greater than total cash in drawer, return "INSUFFICIENT_FUNDS"
      if(changeDue>totalCashInDrawer){
          return {status: "INSUFFICIENT_FUNDS", change: []}
      }
      // if change due equals total cash in drawer, return "CLOSED" and the entire drawer
      else if(changeDue===totalCashInDrawer){
           return {status: "CLOSED", change: cid }
      };
    
      // get an array of notes and coins needed to provide the change
      let notesCoins=getChange(changeDue);
    
      // loop until all change is provided or it's not possible to provide change
      while(changeDue>0){
          
          // get the current note/coin and its currency unit from the notesCoins array
          currentNoteOrCoin=notesCoins[1];
          currencyUnitOfcurrentNoteOrCoin=notesCoins[0];
          
          // loop until the current note/coin can't be used or there's no more of it in the drawer
          while(true){
              // find the amount of the current note/coin in the drawer
              let currentNoteOrCoinIn=cid.filter(noteOrCoin => noteOrCoin[0]===currencyUnitOfcurrentNoteOrCoin).flat()[1];
               
              // if there's some of the current note/coin in the drawer
               if(currentNoteOrCoinIn!=0){
                     // if using the current note/coin would result in giving too much change, break out of the loop
                     if(changeDue-currentNoteOrCoin<0){break;};
                    // subtract the current note/coin from the change due
                    changeDue-=currentNoteOrCoin;
                    changeDue=parseFloat(changeDue.toFixed(2));
                    // subtract the current note/coin from the drawer
                    for(let i=0;i<cid.length;i++){
                          if(cid[i][0]===currencyUnitOfcurrentNoteOrCoin){
                            cid[i][1]-=currentNoteOrCoin;
                            cid[i][1]=parseFloat(cid[i][1].toFixed(2))
                        
                            };
                      };
                    // if the current note/coin is already in the changeNotesCoins array, update its amount
                    let currentNoteOrCoinInchangeNotesCoins=changeNotesCoins.some(noteOrCoin => noteOrCoin[0]===currencyUnitOfcurrentNoteOrCoin);
                    if(currentNoteOrCoinInchangeNotesCoins){
                          for(let i=0;i<changeNotesCoins.length;i++){
                                if(changeNotesCoins[i][0]===currencyUnitOfcurrentNoteOrCoin){
                                    changeNotesCoins[i][1]+=currentNoteOrCoin;
                                    changeNotesCoins[i][1]=parseFloat(changeNotesCoins[i][1].toFixed(2))
                                  };
                        
                             };
                    }
                    // otherwise, add the current note/coin and its amount to the changeNotesCoins array
                    else{
                          changeNotesCoins.push([currencyUnitOfcurrentNoteOrCoin,currentNoteOrCoin]);
                        };
               }
               // if there's no more of the current note/coin in the drawer, break out of the loop
               else{
                  break;
              };
          
          };
          // Check if the current note or coin is not equal to 0.01
          if(currentNoteOrCoin-0.01!=0){
              // If it's not 0.01,get the change for the remaining amount after subtracting 0.01
              notesCoins=getChange(currentNoteOrCoin-0.01);
              }
          else{
              // If it's 0.01, break out of the loop since 0.01 is the smallest coin and there is no need to continue
              break;
              };
    
      };
          // calculate the total remaining balance in the drawer
    let remainingBalance=cid.reduce((sum,amount)=> sum+amount[1],0);
    
    // if there's still change due, but there's not enough cash left in the drawer, return "INSUFFICIENT_FUNDS"
    if(changeDue>0){
    return {status: "INSUFFICIENT_FUNDS", change: []};
    }
    // if there's no change due and there's still cash in the drawer, return "OPEN" and the notes and coins to be returned as change
    else if(changeDue==0 && remainingBalance!=0){
    return {status: "OPEN", change: changeNotesCoins };
    }
    // if there's no change due and there's no more cash in the drawer, return "CLOSED" and the entire drawer
    else{
    return {status: "CLOSED", change: changeNotesCoins };
    };
  
  
  };
    
  // Importing the assert module
const assert = require('assert');

// Defining the test function
function test() {
  // Testing the first scenario
  assert.deepEqual(
    checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]),
    {status: "OPEN", change: [["QUARTER", 0.5]]}
  );
  
  // Testing the second scenario
  assert.deepEqual(
    checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]),
    {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}
  );
  
  // Testing the third scenario
  assert.deepEqual(
    checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]),
    {status: "INSUFFICIENT_FUNDS", change: []}
  );
  
  // Testing the fourth scenario
  assert.deepEqual(
    checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]),
    {status: "INSUFFICIENT_FUNDS", change: []}
  );
  
  // Testing the fifth scenario
  assert.deepEqual(
    checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]),
    {status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}
  );
}

// Calling the test function to run the tests
test();

  
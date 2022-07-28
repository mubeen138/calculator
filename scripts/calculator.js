let bgDisp = document.querySelector("#large-display");
let smDisp = document.querySelector("#small-display");
let nums = "";
let result = 0;
let firstOperand = 0;
let secondOperand = 0;
let operand = "";
let opFlag = false;
let firstCalc = true;
let floatFlag = false;
let opString = "";
let numButtons = document.querySelectorAll(".nums");
let mathButtons = document.querySelectorAll(".funcs.math");
let equalsButton = document.querySelector("#equals");
let poinButton = document.querySelector("#point");
let plusmnButton = document.querySelector("#plusmn");
let bsButton = document.querySelector("#back-space");
// Clear Everything button should clear everything
let buttonCe = document.querySelector("#clear-everything");
buttonCe.addEventListener('click',clearEverything);
//Clear button should clear only big display or current entry
let buttonClr = document.querySelector("#clear");


function clearBigDisp(){
    bgDisp.textContent = "0";
    nums = "";
}
function clearSmDisp(){
    smDisp.textContent = "";
    opString = "";
}

function clearEverything(){
    clearBigDisp();
    clearSmDisp();
    opFlag = false;
}

buttonClr.addEventListener('click', clearBigDisp);
//Keypad button functions
numButtons.forEach(btn => btn.addEventListener('click',numPressed));
function numPressed(event){
    if(!firstCalc){

        clearBigDisp();
        clearSmDisp();    
        opFlag = false;
        opString = "";
        nums = "";
        firstCalc = true;

    }
    if (event.currentTarget.id === "0" && nums.length == 0){

    }else{
        if (nums.length < 19){
            nums = nums.concat("",event.currentTarget.id);
            bigDisplay(nums);
        }
        
    }
    
}
//Display Items on big Display
function bigDisplay(input){
    bgDisp.textContent = input;
}
//Display Items on small display
function smallDisplay(input){
    smDisp.textContent = input;
}
//Define Operator button functionality
mathButtons.forEach(btn => btn.addEventListener('click',oprPressed));

function oprPressed(event){
    
    if (!opFlag){
        opFlag = true;

        //smDisp.textContent = "";

        
        if(nums.length == 0){
            firstOperand = 0;
        }else if (floatFlag){
            firstOperand = parseFloat(nums);
            floatFlag = false;
            nums = "";
        }else{
            firstOperand = parseInt(nums,10);
            nums = "";
        }
        bigDisplay('0');
        if (firstOperand < 0){
            opString = `(${firstOperand}) ${event.currentTarget.textContent}`;
        }else{
            opString = `${firstOperand} ${event.currentTarget.textContent}`;
        }
        
        smallDisplay(opString);
        operand = event.currentTarget.id;
        
    }else{
        //smDisp.textContent = "";
        if(nums.length == 0){
            secondOperand = 0;
        }else if (floatFlag){
            secondOperand = parseFloat(nums);
            floatFlag = false;
            nums = "";
        }else{
            secondOperand = parseInt(nums,10);
            nums = "";
        }
        if (!firstCalc){

            opString = `${opString} ${event.currentTarget.textContent}`;
            firstCalc = true;
            //If not first calc assign prev result to firstOperand
            firstOperand = result;
        }else{
            if (secondOperand < 0){
                opString = `${opString} (${secondOperand}) ${event.currentTarget.textContent}`;
            }else{
                opString = `${opString} ${secondOperand} ${event.currentTarget.textContent}`;
            }
            
            // First perform the previous calculation and calculate results
            operation(firstOperand,secondOperand,operand);
            //assign the results to firstOperand
            firstOperand = result;
        }
        
        smallDisplay(opString);
        
        //assign the operand pressed now
        operand = event.currentTarget.id;
        nums = ""; 
    }
}

function operation(fOp,sOp,opr){
    switch(opr){
        case 'add':
            result = fOp + sOp;
            break;
        case 'subtract':
            result = fOp - sOp;
            break;
        case 'multiply':
            result = fOp * sOp;
            break;
        case 'divide':
            result = fOp / sOp;
            break;
        default:
            bigDisplay("Error!");
            break;
    }
    bigDisplay(`${result}`);
}

//Define Equal button functionality
equalsButton.addEventListener('click',equal)
function equal(){
    firstCalc = false;
    if(nums.length == 0){
        secondOperand = 0;
    }else if (floatFlag){
        secondOperand = parseFloat(nums);
        floatFlag = false;
        nums = "";
    }else{
        secondOperand = parseInt(nums,10);
        nums = "";
    }
    if (secondOperand < 0){
        opString = `${opString} (${secondOperand})`;
    }else{
        opString = `${opString} ${secondOperand}`;
    }
    
    smallDisplay(opString);
    operation(firstOperand,secondOperand,operand);
    //firstOperand = result;
}

// Point button is pressed. Make a float point
poinButton.addEventListener('click',pointPressed);

function pointPressed(){
   nums = nums.concat('','.');
   floatFlag = true;
}

plusmnButton.addEventListener('click',plusmnPressed);

function plusmnPressed(){
    let plsmn;
    if (!(nums.length == 0)){
        if (floatFlag){
            plsmn = parseFloat(nums);
            plsmn = plsmn*(-1);
        }else{
            plsmn = parseInt(nums,10);
            plsmn = plsmn*(-1);
        }
        nums = plsmn.toString();
    }
    
    bigDisplay(nums);
}

bsButton.addEventListener('click',backSpace);

function backSpace(){
    if (!(nums.length == 0)){
      nums = nums.slice(0,nums.length-1);  
    }
    
    bigDisplay(nums);
}
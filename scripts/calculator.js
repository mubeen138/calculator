let bgDisp = document.querySelector("#large-display");
let smDisp = document.querySelector("#small-display");
let nums = "";
let result = 0;
let firstOperand = 0;
let secondOperand = 0;
let operator = "";
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
        //If operator is pressed for the first time do this
        opFlag = true; // This means operator pressed already

        //smDisp.textContent = "";

        // Operator is pressed now read the value to firstOperand
        if(firstCalc){
            if(nums.length == 0){
                firstOperand = 0;
            }else if (floatFlag){  //Decide if decimal point pressed. that means its float.
                firstOperand = parseFloat(nums);
                floatFlag = false;
                nums = "";
            }else{
                firstOperand = parseInt(nums,10);
                nums = "";
            }
            bigDisplay('0');
        }else{
            firstOperand = result;
        }
         // Operator is pressed display zero in big display. Means ready to get second value
/*************************************** Display Code ***********************************************************************/
        // Display with brackets if firstOperand is negative number
        if (firstOperand < 0){
            opString = `(${firstOperand}) ${event.currentTarget.textContent}`; 
        }else{
            opString = `${firstOperand} ${event.currentTarget.textContent}`;
        }
/***********************************************Check legth doesn't overflow************************************************************* */
    // If lenght of opString is greater than 100 trim the older calculations.
        if (opString.length > 100){
            let extra = opString.length-100;
            opString = opString.slice(extra);
            opString = opString.slice((opString.search(" ")+2));
        }
        smallDisplay(opString);
/***************************************************Read Operand Value******************************************************* */
        // Read withc operand was pressed.
        operator = event.currentTarget.id;
 /***************************************************************************************************************************** 
  * ******************************************
  * 
  * */       
    }else{ // If the operator is not pressed for the first time
        //smDisp.textContent = "";
/***************************************************Read value of second operand******************************************************/
        // Read the second operand
        if (firstCalc){
            if(nums.length == 0){
                secondOperand = 0;
            }else if (floatFlag){ //Check if entered number is float
                secondOperand = parseFloat(nums);
                floatFlag = false;
                nums = "";
            }else{
                secondOperand = parseInt(nums,10);
                nums = "";
            }
            if (secondOperand < 0){
                opString = `${opString} (${secondOperand}) ${event.currentTarget.textContent}`; // Display negetive value with bracket around
            }else{
                opString = `${opString} ${secondOperand} ${event.currentTarget.textContent}`;
            }
            
            // First perform the previous calculation and calculate results
            operation(firstOperand,secondOperand,operator);
            //assign the results to firstOperand
            firstOperand = result;
            operator = event.currentTarget.id;
            nums = "";
            bigDisplay(firstOperand);
        }else{
            /**************** // If equal was pressed earlier and We already have a result*/

            opString = `${opString} ${event.currentTarget.textContent}`; //Display the operand
            operator = event.currentTarget.id;
            firstCalc = true;
            bigDisplay('0');
            firstOperand = result;
        }
        
        if (opString.length > 100){
            let extra = opString.length-100;
            opString = opString.slice(extra);
            opString = opString.slice((opString.search(" ")+2));
        }
        smallDisplay(opString);
        
        //assign the operand pressed now
        
        
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
   if(result.toString().length >= 20){
    result = result.toExponential(2);
   }
    bigDisplay(`${result}`);
}

//Define Equal button functionality
equalsButton.addEventListener('click',equal)
function equal(){
    if (firstCalc && opFlag){
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

        if (opString.length > 100){
            let extra = opString.length-100;
            opString = opString.slice(extra);
            opString = opString.slice((opString.search(" ")+2));
        }
        smallDisplay(opString);
        operation(firstOperand,secondOperand,operator);
        if (result < 0){
            opString = `(${result})`;
        }else{
            opString = `${result}`;
        }
        firstOperand = 0;
        secondOperand = 0;
    }
    
    //firstOperand = result;
}

// Point button is pressed. Make a float point
poinButton.addEventListener('click',pointPressed);

function pointPressed(){
    if(!floatFlag)
    {
        nums = nums.concat('','.');
        floatFlag = true;
    }
   
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

document.addEventListener('keydown',(event) => {

    let keypressed
    
    if (event.key === "+"){
        keypressed = document.querySelector("#add");
    }else if (event.key === "-"){
        keypressed = document.querySelector("#subtract");
    }else if (event.key === "/"){
        keypressed = document.querySelector("#divide");
    }else if (event.key === "*"){
        keypressed = document.querySelector("#multiply");
    }else if (event.key === "."){
        keypressed = document.querySelector("#point");
    }else if (event.key === "="){
        keypressed = document.querySelector("#equals");
    }else if (event.key === "Enter"){
        keypressed = document.querySelector("#equals");
        event.preventDefault();
    }else if (event.key === "Backspace"){
        keypressed = document.querySelector("#back-space");
    }else{
        keypressed = document.querySelector(`[id = "${event.key}" ]`);
    }
    keypressed.click();
})
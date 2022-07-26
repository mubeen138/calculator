let bgDisp = document.querySelector("#large-display");
let smDisp = document.querySelector("#small-display");
let nums = "";
let opFlag = false;
let numButtons = document.querySelectorAll(".nums");
// Clear Everything button should clear everything
let buttonCe = document.querySelector("#clear-everything");
buttonCe.addEventListener('click',() => {
    bgDisp.textContent = "0";
    smDisp.textContent = "";
    nums = "";
});
//Clear button should clear only big display or current entry
let buttonClr = document.querySelector("#clear");
buttonClr.addEventListener('click', () => {
    bgDisp.textContent = "0";
    nums = "";
});
//Keypad button functions
numButtons.forEach(btn => btn.addEventListener('click',numPressed));
function numPressed(event){
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




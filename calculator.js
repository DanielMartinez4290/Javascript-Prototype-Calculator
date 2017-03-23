/**
 * @description Calculator prototype.
 * @constructor Calculator
 */
function Calculator()
{
    /**
     * @description Assign this to variable for scope scenarios.
     * @type {Calculator}
     */
    var self = this;


    /**
     * @description Init function builds the calculator.
     */
    this.init = function() {
        //Generate sections
        var main = document.createElement("section");
        main.id = "main";

        var opWindow = document.createElement("section");
        opWindow.id = "opWindow";
        var opWindowNum = document.createTextNode("0");
        opWindow.appendChild(opWindowNum);

        var operators = document.createElement("section");
        operators.id = "operators";

        var middleNumbers = document.createElement("section");
        middleNumbers.id = "middleNumbers";

        var botOperators = document.createElement("section");
        botOperators.id = "botOperators";

        var previousCalculations = document.createElement("section");
        previousCalculations.id = "previousCalculations";
        
        var element = document.getElementsByTagName("BODY")[0];

        //Append Sections
        element.appendChild(main);
        main.appendChild(previousCalculations);
        main.appendChild(opWindow);
        main.appendChild(operators);
        main.appendChild(middleNumbers);
        main.appendChild(botOperators);

        var equalsFired = false; 

        
        //Initial Top Calculations        
        var prevCalc = JSON.parse(localStorage.getItem("previousCalculations"));
        var prevCalcString = "Previous Calculations <br>";

        if(prevCalc != null){

            for (i = 0; i < Object.keys(prevCalc).length; i++) { 
                prevCalcString = prevCalcString + prevCalc[i] + "<br>";
            }
            previousCalculations.innerHTML = prevCalcString;        
            
        }else{
            prevCalc = {};
        }
          
        //Generate Operator Symbols and add click functionality
        var operatorSymbols = ["+", "-", "X","/","^"];

        for (i = 0; i < operatorSymbols.length; i++) { 
            var operatorButton = document.createElement("button");

            if(operatorSymbols[i]=="+"){
                operatorButton.onclick = function() { 
                    opWindow.innerHTML = opWindow.innerHTML +" + ";
                    equalsFired = false; 
                };
                operatorButton.className = "operators icon-plus";    
            }
            else if(operatorSymbols[i]=="-"){
                operatorButton.className = "operators icon-minus";    
                operatorButton.onclick = function() { 
                    opWindow.innerHTML = opWindow.innerHTML +" - ";
                    equalsFired = false; 
                };
            }
            else if(operatorSymbols[i]=="X"){
                operatorButton.className = "operators icon-cross";    
                operatorButton.onclick = function() { 
                    opWindow.innerHTML = opWindow.innerHTML +" X ";
                    equalsFired = false; 
                };
            }
            else if(operatorSymbols[i]=="/"){
                operatorButton.className = "operators";    
                var operatorNum = document.createTextNode(operatorSymbols[i]);
                operatorButton.appendChild(operatorNum);
                operatorButton.onclick = function() { 
                    opWindow.innerHTML = opWindow.innerHTML +" / ";
                    equalsFired = false; 
                };
            }
            else if(operatorSymbols[i]=="^"){
                operatorButton.className = "operators icon-ctrl";
                operatorButton.onclick = function() { 
                    opWindow.innerHTML = opWindow.innerHTML +" ^ ";
                    equalsFired = false; 
                };    
            }
            
            
            operators.appendChild(operatorButton);          
        }

        //Generate Numbers
        for (i = 1; i <=9 ; i++) { 
            var numberButton = document.createElement("button");
            
            numberButton.onclick = function() { 

                if(opWindow.innerHTML!="0" && equalsFired==false){
                    opWindow.innerHTML = opWindow.innerHTML +this.innerText;
                }else {
                    opWindow.innerHTML = this.innerText;    
                    equalsFired=false; 
                }
                
            };
            

            numberButton.className = "numbers";
            var numberNum = document.createTextNode(i);
            numberButton.appendChild(numberNum);
            middleNumbers.appendChild(numberButton);          
        }

        //Generate Bottom
        botOperatorSymbols = ["Clear", "0", "="];

        for (i = 0; i < botOperatorSymbols.length; i++) { 
            var operatorButton = document.createElement("button");
            operatorButton.onclick = function() { 

                if(this.innerText=="Clear"){
                    opWindow.innerHTML = "0";    
                }else if(this.innerText=="0"){
                    opWindow.innerHTML = opWindow.innerHTML +this.innerText;
                }
                else if(this.innerText=="="){
                    equalsFired = true; 
                    var calculation = opWindow.innerHTML;
                    
                    calculation = calculation.split(" ");

                    if(calculation[1]=="+"){
                        //Plus Calculations
                        var addition = Number(calculation[0]) + Number(calculation[2]); 
                        opWindow.innerHTML = addition;
                        var objLength = Object.keys(prevCalc).length;
                        prevCalc[objLength] = calculation[0] + " " + calculation[1] + " " +calculation[2]+ " = " + addition;
                        localStorage.setItem('previousCalculations', JSON.stringify(prevCalc));
                        var prevCalcString = "Previous Calculations <br>";
                        
                        prevCalc = JSON.parse(localStorage.getItem("previousCalculations"));
                        for (i = 0; i < Object.keys(prevCalc).length; i++) { 
                            prevCalcString = prevCalcString + prevCalc[i] + "<br>";
                        }
                        previousCalculations.innerHTML = prevCalcString;        
                        
                    }else if(calculation[1]=="-"){
                        //minus calculations
                        var minus  = Number(calculation[0]) - Number(calculation[2]); 
                        opWindow.innerHTML = minus;
                        var objLength = Object.keys(prevCalc).length;
                        prevCalc[objLength] = calculation[0] + " " + calculation[1] + " " +calculation[2]+ " = " + minus;
                        localStorage.setItem('previousCalculations', JSON.stringify(prevCalc));
                        var prevCalcString = "Previous Calculations <br>";
                        
                        prevCalc = JSON.parse(localStorage.getItem("previousCalculations"));
                        for (i = 0; i < Object.keys(prevCalc).length; i++) { 
                            prevCalcString = prevCalcString + prevCalc[i] + "<br>";
                        }
                        previousCalculations.innerHTML = prevCalcString; 
                    }else if(calculation[1]=="X"){
                        //multiplication calculations
                        var mult = Number(calculation[0]) * Number(calculation[2]); 
                        opWindow.innerHTML = mult;
                        var objLength = Object.keys(prevCalc).length;
                        prevCalc[objLength] = calculation[0] + " " + calculation[1] + " " +calculation[2]+ " = " + mult;
                        localStorage.setItem('previousCalculations', JSON.stringify(prevCalc));
                        var prevCalcString = "Previous Calculations <br>";
                        
                        prevCalc = JSON.parse(localStorage.getItem("previousCalculations"));
                        for (i = 0; i < Object.keys(prevCalc).length; i++) { 
                            prevCalcString = prevCalcString + prevCalc[i] + "<br>";
                        }
                        previousCalculations.innerHTML = prevCalcString; 
                    }else if(calculation[1]=="/"){
                        //divide calculations
                        var divide = Number(calculation[0]) / Number(calculation[2]); 
                        opWindow.innerHTML = divide;
                        var objLength = Object.keys(prevCalc).length;
                        prevCalc[objLength] = calculation[0] + " " + calculation[1] + " " +calculation[2]+ " = " + divide;
                        localStorage.setItem('previousCalculations', JSON.stringify(prevCalc));
                        var prevCalcString = "Previous Calculations <br>";
                        
                        prevCalc = JSON.parse(localStorage.getItem("previousCalculations"));
                        for (i = 0; i < Object.keys(prevCalc).length; i++) { 
                            prevCalcString = prevCalcString + prevCalc[i] + "<br>";
                        }
                        previousCalculations.innerHTML = prevCalcString; 
                    }
                    else if(calculation[1]=="^"){
                        //exponential calculations
                        var exponential = 1; 
                        for (i = 1; i <=Number(calculation[2]) ; i++){
                            exponential = exponential * Number(calculation[0]);
                        }

                        opWindow.innerHTML = exponential;
                        var objLength = Object.keys(prevCalc).length;
                        prevCalc[objLength] = calculation[0] + " " + calculation[1] + " " +calculation[2]+ " = " + exponential;
                        localStorage.setItem('previousCalculations', JSON.stringify(prevCalc));
                        var prevCalcString = "Previous Calculations <br>";
                        
                        prevCalc = JSON.parse(localStorage.getItem("previousCalculations"));
                        for (i = 0; i < Object.keys(prevCalc).length; i++) { 
                            prevCalcString = prevCalcString + prevCalc[i] + "<br>";
                        }
                        previousCalculations.innerHTML = prevCalcString; 
                        
                    }
                    
                }
                
            };
            operatorButton.className = "botOperators";
            var operatorNum = document.createTextNode(botOperatorSymbols[i]);
            operatorButton.appendChild(operatorNum);
            botOperators.appendChild(operatorButton);          
        }


    };

}
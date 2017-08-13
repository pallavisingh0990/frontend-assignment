var pathData = "http://pb-api.herokuapp.com/bars";
var jsonData = "";

    //read the json input
function readJSON(url, success, error) {
    var xmlhttp = "";
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, true);

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4) { // `DONE`
            if (xmlhttp.status === 200) {
                success(JSON.parse(xmlhttp.responseText));
            } else {
                error(xmlhttp.status);
            }
        }
    };

    xmlhttp.send();
}

//process the json input file
function processData(inputdata) {
    if (typeof inputdata === "object") {
        jsonData = inputdata;
    }
    else {
            if (inputdata == false) {
                jsonData = JSON.parse(inputdata);
        }
            else {
                console.log("Invalid");
        }
    }

    //read limit data
    var limit = jsonData.limit;

    //read buttons data
    var buttonAdd="";
    var buttonData="";
    var stringbuttonData="";
    for(var i = 0; i < jsonData.buttons.length; i++) {
        buttonData=jsonData.buttons[i];
        if(jsonData.buttons[i]>0) {
            stringbuttonData = "+"+jsonData.buttons[i];
        }
        else{
            stringbuttonData = jsonData.buttons[i];
        }
        //call the function barProgressControl on click
        buttonAdd = buttonAdd+"<button class='button-layout' value='"+buttonData+"' onclick='barProgressControl("+buttonData+","+limit+")'>"+stringbuttonData+"</button>";
    }
    document.getElementById("buttoncontrol").innerHTML = buttonAdd;

    //read bars data
    var barAdd="";
    var progressCount="";
    var barSelect="";
    var barData="";
    //create progress drop down
    barSelect = "<select id='selectprogressbar'>";

    for(var k = 0; k < jsonData.bars.length; k++) {
        progressCount=k+1;
        barSelect = barSelect +"<option value='progress"+progressCount+"'>#progress"+progressCount+"</option>";
        barData=jsonData.bars[k];     
        barAdd = barAdd +"<div class='progress-rectangle'><div class='progress-layout' style='width:"+barData+"%' id='progress"+progressCount+"'></div><div class='progress-percent' id='percentageprogress"+progressCount+"'>"+barData+"%</div></div>";            
    }
    barSelect = barSelect + "</select>";
    document.getElementById("progresscontrol").innerHTML = barAdd;      
    document.getElementById("barcontrol").innerHTML = barSelect;

}

//call readJson function to read the input from pathData
readJSON(pathData, function (data) {
    console.log(data);
    processData(data);
}, function (status) {
    console.log(status);
});


//barProgress checker
function barProgressControl(buttonValue, limit) {
    var progressSelection = document.getElementById("selectprogressbar").options[document.getElementById("selectprogressbar").selectedIndex].value; 
    var initialProgressvalue = document.getElementById("percentage"+progressSelection).innerHTML;
    var initialProgress = parseInt(initialProgressvalue);
    var incrdecrValue = parseInt(buttonValue);
    var newValue = initialProgress+incrdecrValue;
    if (newValue<=0) {
        document.getElementById(progressSelection).style="width:0%;transition: width 0.4s";
        document.getElementById("percentage"+progressSelection).innerHTML = 0+"%";

    }
    else if (newValue>=limit) {
        document.getElementById(progressSelection).style=" width:"+newValue+"%; background-color:red;transition: width 0.4s";
        document.getElementById("percentage"+progressSelection).innerHTML = newValue+"%";
    }
    else{
        document.getElementById(progressSelection).style="width:"+newValue+"%; transition: width 0.4s";
        document.getElementById("percentage"+progressSelection).innerHTML = newValue+"%";
    }

}
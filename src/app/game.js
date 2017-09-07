var colors=['green','blue','yellow','red'];
var colorCodes=["#3CFE08","#006400","#31AEF2","#191970","#F9FE10","#9ACD32","#FE0B0E","#8B0000"];
var sound=["https://s3.amazonaws.com/freecodecamp/simonSound1.mp3", "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3", "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3", "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"];
var count=0,levelCounter=0,finalLevel = 21,levelStatus=0,gameStatus=0,temp="",workingArray=[],listMini=[],listArray=[],colorArray=[],tempArray=[],tempColorArray=[],strict='off';
var checkerLevel=0,checkerDepth=0,checkerMarker=0,buttonStatus='off';
var arrayChecker=[[[1],[1,1,1],[1,2,1]],[[1,2,1],[1,1,2],[1,2,2]],[[1,1,2],[2,2,2],[2,2,2]],[[2,2,2,2],[2,3,2,2],[2,2,3,2]],[[2,2,2,2],[2,3,2,2],[3,2,2,2]],[[2,2,3,2,3],[2,2,2,2,3],[3,2,2,2,2]],[[3,2,2,3,2],[2,2,2,3,2,2],[3,2,3,2,3,2,2]]];

var colorSequence=[[[1],[1,2,1],[1,2,2]],[[1,2,3],[1,3,2],[1,3,0]],[[1,0,2],[1,0,3],[1,1,2]],[[1,2,3,0],[0,3,1,2],[2,1,3,0]],[[3,2,1,0],[2,3,1,0],[3,1,0,2]],[[2,1,3,2,3],[2,3,1,0,3],[3,2,1,2,0]],[[3,0,1,2,1],[3,2,0,3,2,1],[1,2,3,1,3,2,0]]];
var sequence =    [[[1],[1,1,1],[1,1,1]],[[1,1,1],[1,1,1],[1,1,1]],[[1,1,1],[1,1,1],[1,1,1]],[[1,1,1,1],[1,1,1,1],[1,1,1,1]],[[1,1,1,1],[1,1,1,2],[1,2,1,2]],[[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1]],[[1,2,1,2,1],[1,1,2,1,2,1],[1,2,3,1,1,2,2]]];

//Game On/Off Switch:
function gameOnOff()
{
  if(gameStatus ==0 & document.getElementById("gameStatusLabel").checked)
  {
    document.getElementById("innerCircle").style.backgroundColor = "#063e9f";
      gameStatus = 1;levelCounter=0;
      console.log("Game On");$("#buttonSteps").text("Game On");
      gameStarter();
    }
  else
    {
$("#currentLevel").text("00");
console.log("Game Off");
$("#buttonSteps").text("Game Off");
count=0,levelCounter=0,finalLevel = 21,levelStatus=0,gameStatus=0,temp="",workingArray=[],listMini=[],listArray=[],colorArray=[],tempArray=[],tempColorArray=[];
document.getElementById("innerCircle").style.backgroundColor = "#041d4a";
strict="off";
document.getElementById("strictButton").style.backgroundColor = "black";
document.getElementById("strictButton").style.color = "white";
document.getElementById("startingButton").style.backgroundColor = "black";
document.getElementById("startingButton").style.color = "white";
gameStatus = 0;levelCounter=0;
    }
}

function checkButton(val)
 {
if(levelCounter == 7 & buttonStatus=='on' & count<listArray[levelStatus].length)
 {
count++;
colorHoverBright=colorCodes[(colors.indexOf(val))*2];
document.getElementById(val).style.backgroundColor = colorHoverBright;
new Audio(sound[colors.indexOf(val)]).play();
colorHoverDim=colorCodes[(colors.indexOf(val))*2+1];
setTimeout(function(){document.getElementById(val).style.backgroundColor = colorHoverDim; }, 600);
console.log("now "+val+" off.");
tempArray.push(val);
console.log(tempArray);
 if((count)==listArray[levelStatus].length)
   {
if(listArray[levelStatus].toString()===tempArray.toString())
   {
  console.log("Both same, now continue to next level");
  levelStatus++;
  tempArray=[];
     if(levelStatus == 2)
     {
       console.log("We have a winner");
       $("#currentLevel").text("Bam!");
       $("#buttonSteps").text("Congrats");
       setTimeout(function ()
                  {
         alert("We have a Winner, Play again :)");
         tempArray=[];
  setTimeout(function (){document.getElementById("innerCircle").style.backgroundColor = "#041d4a";},1000);
  setTimeout(function (){document.getElementById("innerCircle").style.backgroundColor = "#063e9f";},2000);
  $("#buttonSteps").text("New Game");
  count=0,levelCounter=0,finalLevel = 21,levelStatus=0,gameStatus=0,temp="",workingArray=[],listMini=[],listArray=[],colorArray=[],tempArray=[],strict='off',tempColorArray=[];
  document.getElementById("innerCircle").style.backgroundColor = "#041d4a";
  gameStatus = 0;levelCounter=0;
  gameStarter();setTimeout(function(){$("#currentLevel").text(levelStatus);
  colorSequencer();},2000);
       },1000);
     }
     else
  setTimeout(function(){$("#currentLevel").text(levelStatus+1);
  colorSequencer();},2000);
  }
  else if(strict=="off")
  {
  console.log("Both different, try again and strict is off");
  tempArray=[];
  setTimeout(function (){document.getElementById("innerCircle").style.backgroundColor = "#041d4a";},500);
  setTimeout(function (){document.getElementById("innerCircle").style.backgroundColor = "#063e9f";},1000);
  count--;
  setTimeout(function(){
  colorSequencer();},1200);
  }
  else if(strict=="on")
  {
  console.log("Both different, try again and strict is on");
  tempArray=[];
  setTimeout(function (){document.getElementById("innerCircle").style.backgroundColor = "#041d4a";},1000);
  setTimeout(function (){document.getElementById("innerCircle").style.backgroundColor = "#063e9f";},2000);
  console.log("Game New");
  count=0,levelCounter=0,finalLevel = 21,levelStatus=0,gameStatus=0,temp="",workingArray=[],listMini=[],listArray=[],colorArray=[],tempArray=[],tempColorArray=[];
  document.getElementById("innerCircle").style.backgroundColor = "#041d4a";
  gameStatus = 0;levelCounter=0;
  gameStarter();setTimeout(function(){$("#currentLevel").text(levelStatus);strictSwitch()
  colorSequencer();},2000);
  }
 }
 }
  else
  {
    console.log("Turn On Game first..current level:- ");
  }
}
// Game checksum
function gameStarter()
{
  for(;levelCounter<7;levelCounter++)
  {
  for(var i=0;i<3;i++)
    {
   for(var j=0;j<sequence[levelCounter][i].length;j++)
    {
      arrayChecker[levelCounter][i][j] = colors[colorSequence[levelCounter][i][j]]+sequence[levelCounter][i][j];
      for(var op=0;op<sequence[levelCounter][i][j];op++)
      listMini.push(colors[colorSequence[levelCounter][i][j]]);
    }}
  }
  arrayFiller(listMini);
 // $("#currentLevel").text(1);
 }

function arrayFiller(col)
 {
  initial =0, final=0;
  for(var h=0;h<7;h++)
  {
  for(var i=0;i<3;i++)
   {
     final = initial+ sequence[h][i].length;
     console.log("initial > "+initial+" < length > "+final);
     listArray.push(listMini.slice(initial,final));
     initial = final + 1;
   }
  }
}

function colorSequencer()
  {
var delayMillis = 1000;
if(levelCounter == 7)
   {
       if(levelStatus == 0)
       $("#currentLevel").text(1);

document.getElementById("startingButton").style.backgroundColor = "white";
document.getElementById("startingButton").style.color = "black";
console.log("Coloring started..until level:-"+levelCounter);
if(levelStatus < finalLevel)
{
for(var er=0;er<listArray[levelStatus].length;er++)
{
colorIt(levelStatus,er);
dimIt(levelStatus,er);
}
}}
 else
 {
 console.log(" Turn On Game first..current level:- "+levelCounter);
 }
}
function dimIt(level,er)
{
var marker = colors.indexOf(listArray[level][er]);
var colorHoverDim='';
setTimeout(function()
           {
colorHoverDim=colorCodes[(marker)*2+1];document.getElementById(colors[marker]).style.backgroundColor = colorHoverDim;
console.log("now " +colors[marker]+" off."+((1000*(er))+700));
            }, (1000*(er))+700);
  buttonStatus='on';
  count =0;
}
function strictSwitch(){
  var val;
  if(levelCounter == 7)
   {
  val = document.getElementById("strictButton").value;
  if(val == "on")
  {
strict="off";
document.getElementById("strictButton").style.backgroundColor = "black";
document.getElementById("strictButton").style.color = "white";
document.getElementById("strictButton").value = "off";
  }
 else if(val=="off")
  {
strict="on";
document.getElementById("strictButton").style.backgroundColor = "white";
document.getElementById("strictButton").style.color = "black";
document.getElementById("strictButton").value = "on";
 }
}
}
function colorIt(level,er)
{
setTimeout(function()
           {
var marker = colors.indexOf(listArray[level][er]);
colorHoverBright='';
colorHoverBright=colorCodes[(marker)*2];
$("#buttonSteps").text((listArray[level].length)+" hit/s.");
console.log("array:"+listArray[level]+" colors:"+colors[marker]);    document.getElementById(colors[marker]).style.backgroundColor = colorHoverBright;
new Audio(sound[marker]).play();
console.log(colors[marker]+" Bright at: "+(1000*(er)));
},1000*er);
  buttonStatus='off';
}
function checkArray()
{
  for(var i=0;i<listArray.length;i++)
    {
      console.log(listArray[i]);
    }

}

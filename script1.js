const allCountries = new Array ();
        
         Object.keys(countryObjects).forEach(key=>{allCountries.push(countryObjects[key].code3);});    
         
        var totalwronganswer=0;
        var totalcorrect_roundanswer=0;
        var totalcan=0;
        var round=0;
        var score=0;
        var totalwinround=0;
    var ishide=false;
 function newGame(){
    document.getElementById("losegame").style.display="none"; 
    document.getElementById("endgamescorebord").style.display="none";
    document.getElementById("CONGRATULATIONSmodal").style.display="none"; 
   // document.getElementById("newgamemodal").style.display="none";
    //alert("y");
    document.getElementById("newgamemodal").style.display="none";  
    if(!ishide&&(totalwronganswer>0||totalcorrect_roundanswer>0||round>1))
    {
        if(round!=10)
        {
           document.getElementById("newgamemodal").style.display="block";  
           ishide=true;
           return;        
        }
    }
    ishide=false;
    round=1;
    score=0;
    totalwinround=0;
    nextcountrie();
}
function nextcountrie(){
  
  document.getElementById("neighbours-panel").className = "";
     if(round>10)
     {
          round-=1;
          document.getElementById("Scoreinmodal").innerHTML=+score;
          
         endgame();
         return;
     }
      document.getElementById("myBar").style.width="0%";
    document.getElementById("btn-next-round").disabled=true;
    totalwronganswer=0;
    totalcorrect_roundanswer=0;
    totalcan=0;
    document.getElementById("round").innerHTML="Γύρος: "+round;
    document.getElementById("Score").innerHTML="Σκορ: "+score;
    var no=Math.floor(Math.random()*countryObjects.length);
    GetData('https://restcountries.eu/rest/v2/alpha/'+countryObjects[no].code.toLowerCase()).then(data=>{
        if(data.borders.length<=0)
            nextcountrie();
         else
         {
            document.getElementById("neighbours-panel").innerHTML="";
            document.getElementById("my-country-flag").src=data.flag;
            document.querySelector("#my-country-name").textContent =data.name;
            var operations=allCountries.filter(function(item) {return data.borders.indexOf(item)==-1 && item!=data.alpha3Code;});
            operations=shuffleArray(operations);
            operations=operations.slice(0,((data.borders.length*3)-(data.borders.length-1)));
            operations.push.apply(operations,data.borders);
            //console.log(data.borders);
            //console.log(operations);
            shuffleArray(operations).forEach(item=>{
                var ans=countryObjects[Object.keys(countryObjects).find(key => countryObjects[key].code3 == item)];
                //-------------------
                var div=document.createElement("div");
                div.id="operation";
                div.className="neighbour";
                div.onclick=function(){
                    checkanswer(data.borders.indexOf(item),div,data.borders.length)
                }; 
                totalcan= data.borders.length;
                //-------------------
                //<img id="my-country-flag" src="" alt=""  style="">
                var flag=document.createElement("img");
                //flag.style="width: 70px;height: 50px;margin-top:2px";
                flag.src="https://restcountries.eu/data/"+ans.code3.toLowerCase()+".svg";
                flag.display="inline-block";
                flag.overflow="hidden";
                div.appendChild(flag);
                //-------------------
                var name=document.createElement("h3");
                name.style="color:#4d001f;font-size:14px;";
                name.textContent=ans.name;
                div.appendChild(name);
                document.getElementById("neighbours-panel").appendChild(div);
            });
         }    
    });
}
function continueok()
{
    if(totalwinround==round)
    {
        document.getElementById("CONGRATULATIONSmodal").style.display="block"; 
    }
    else
    {
        document.getElementById("losegame").style.display="block"; 
    }
}

function endgame()
{
  document.getElementById("roundwon").innerHTML="Γύροι που κερδίσατε:   "+totalwinround;
  document.getElementById("roundlost").innerHTML="Γύροι που χάσατε: "+(round-totalwinround);
 document.getElementById("endgamescorebord").style.display="block"; 
}
function checkanswer(value,item,totalcorrect_answer){
    if(item.style.borderColor=="red"||item.style.borderColor=="green"||totalwronganswer==totalcorrect_answer||totalcorrect_roundanswer==totalcorrect_answer)
        return;
    item.style.minHeight="144px";
    item.style.height="144px";
    if(value!=-1)
    {
        item.style.border = "3px solid green";
        totalcorrect_roundanswer+=1;

        score+=5;
       document.getElementById("myBar").style.width=(totalcorrect_roundanswer*100)/totalcorrect_answer+"%";
    }
    
    else
    {
        item.style.border = "3px solid red";
        totalwronganswer+=1;
        score-=3;
    }
    document.getElementById("Score").innerHTML="Score "+score;
    if(totalwronganswer==totalcorrect_answer||totalcorrect_roundanswer==totalcorrect_answer)
    {
      document.getElementById("btn-next-round").disabled=false;
      document.getElementById("neighbours-panel").className = "blur";
        if(totalcorrect_roundanswer==totalcorrect_answer)
        {
                totalwinround+=1;
                var name=document.createElement("h1");
                name.className="text";
                name.textContent="Τους βρήκατε όλους!";
                document.getElementById("neighbours-panel").appendChild(name);
        }
        else
        {
                var name=document.createElement("h1");
                name.className="text";
                name.textContent="Κρίμα, χάσατε!";
                name.style.color="red";
                document.getElementById("neighbours-panel").appendChild(name);
        }
      
      return;
    }
}
async function GetData(url){
  const response = await fetch(url);
  return await response.json();
}
        document.addEventListener("DOMContentLoaded", () => {
            //start a new Game
            //...
            //event listener to new game button
            document.querySelector("#btn-new-game").addEventListener("click", () => {
                newGame();
            })
            //event listener to next round button
            document.querySelector("#btn-next-round").addEventListener("click", () => {
                round+=1;

                nextcountrie();
            })
        });

//Το παρακάτω αφορά μόνο τους χρήστες macOS.
if (navigator.appVersion.indexOf("Macintosh")>0){
  document.body.style.fontFamily = '"Open Sans"';
}
    //document.querySelector("#x1").textContent =String.fromCodePoint(0x1F1EC,0x1f1f7) ;
    //document.querySelector("#x2").textContent =country2emoji2("IN");
newGame();
</script>
<script type="text/javascript">
/*   modal1 */
var modal = document.getElementById("endgamescorebord");
var modal2 = document.getElementById("losegame");
var modal3 = document.getElementById("CONGRATULATIONSmodal");
var modal4 = document.getElementById("newgamemodal");
// Get the button that opens the modal
//var btn = document.getElementById("btn1");
//var btn2 = document.getElementById("btn2");
//var btn3 = document.getElementById("btn3");


// Get the <span> element that closes the modal
//var countiue1=document.getElementsByClassName("continue1")[0];

//var continue2=document.getElementsByClassName("continue2")[0];
//var countiue=document.getElementsByClassName("continue1")[0];
var newgamemodalcancel=document.getElementById("newgamemodalcancel");
newgamemodalcancel.onclick=function()
{
  modal4.style.display = "none";
  ishide=false;
}
var span = document.getElementsByClassName("close")[0];
//var span1 = document.getElementsByClassName("close1")[0];
//var span2 = document.getElementsByClassName("close2")[0];
// When the user clicks the button, open the modal

// When the user clicks on countinue button, close the modal
/* countiue.onclick = function() {
  modal2.style.display = "none";
}
countiue.onclick = function() {
  modal2.style.display = "none";
  modal.style.display="none";
}*/
continue2.onclick = function() {
  modal3.style.display = "none";
}
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}
span1.onclick = function() {
  modal2.style.display = "none";
}
span2.onclick = function() {
  modal3.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
 
}
</script>
<script>
  
window.onscroll = function() {myFunction()};

function myFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
     document.getElementById("myProgress").className = "fixprogressbar";
     //document.getElementById("myProgress").style.margin = "10px";
    //document.getElementById("my-country").className = "fixcontrybar";
  } else {
    document.getElementById("myProgress").className = "";
    document.getElementById("my-country").className = "";
  }
}

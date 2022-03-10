$(document).ready(function(){
  console.log("hi")
});

pos="top"; 

//when the user clicks anywhere on the page
document.addEventListener('click', async () => {
    // Prompt user to select any serial port.
    var port = await navigator.serial.requestPort();
    // be sure to set the baudRate to match the ESP32 code
    await port.open({ baudRate: 115200 });
  
    let decoder = new TextDecoderStream();
    inputDone = port.readable.pipeTo(decoder.writable);
    inputStream = decoder.readable;
  
    reader = inputStream.getReader();
    //play();
    readLoop();
});
  
async function readLoop() {
  counterVal = 0;
  while (true) {
    const { value, done } = await reader.read();
    if (done) {
      // Allow the serial port to be closed later.
      console.log("closing connection")
      reader.releaseLock();
      break;
    }
    if (value) {
      try {
        a = JSON.parse(value);
        var dir = direction(a.joystick[0],a.joystick[1]);
        
        //DIAL
        vol= a.dial[0]/4095; 
        document.getElementById('music').play();
        document.getElementById('music').volume= vol; 

        //BUTTON
        if(a.button == 0){
          document.body.style.backgroundColor = '#6D326D';
          setTimeout(function() {
            //code to be executed after 4 seconds
            document.body.style.backgroundColor = '#23CE6B';
          }, 4000);
        }
        //JOYSTICK
        move(dir);
      } catch(e) {
        console.log(value); // error in the above string (in this case, yes)!
      }
    }
  }
};


function direction( x,  y){
  if (x == 0  && y > 1900){ //up
    return 0;
  }else if (x == 4095 && y > 1900){ //down
    return 1;
  }else if (x > 1900 && y == 4095){ //left
    return 2;
  }else if (x > 1900 && y == 0){ //right
    return 3;
  }
}

function move(dir){
  if(pos == "top"){
    document.getElementById("myCarouselTops").style.borderTop="10px solid #003F91";
    document.getElementById("myCarouselTops").style.borderLeft="10px solid #003F91";
    document.getElementById("myCarouselTops").style.borderRight="10px solid #003F91";
    if(dir == 0){
      pos= "shoe";
      document.getElementById("myCarouselShoes").style.borderBottom="10px solid #F0E100";
      document.getElementById("myCarouselShoes").style.borderLeft="10px solid #F0E100";
      document.getElementById("myCarouselShoes").style.borderRight="10px solid #F0E100";
    } else if (dir == 1){
      pos= "bot";
      document.getElementById("myCarouselBottoms").style.borderLeft="10px solid #F0E100";
      document.getElementById("myCarouselBottoms").style.borderRight="10px solid #F0E100";
    } else if (dir == 2){
      //click tops left
      document.getElementById('topsprev').click(); 
    } else if (dir == 3){
      //click tops right
      document.getElementById('topsnext').click(); 
    }
  }else if(pos == "bot"){
    document.getElementById("myCarouselBottoms").style.borderLeft="10px solid #003F91";
    document.getElementById("myCarouselBottoms").style.borderRight="10px solid #003F91";
    if(dir == 0){
      pos= "top";
      document.getElementById("myCarouselTops").style.borderTop="10px solid #F0E100";
      document.getElementById("myCarouselTops").style.borderLeft="10px solid #F0E100";
      document.getElementById("myCarouselTops").style.borderRight="10px solid #F0E100";
    } else if (dir == 1){
      pos= "shoe";
      document.getElementById("myCarouselShoes").style.borderBottom="10px solid #F0E100";
      document.getElementById("myCarouselShoes").style.borderLeft="10px solid #F0E100";
      document.getElementById("myCarouselShoes").style.borderRight="10px solid #F0E100";
    } else if (dir == 2){
      //click bottoms left
      document.getElementById('bottomsprev').click(); 
    } else if (dir == 3){
      //click bottoms right
      document.getElementById('bottomsnext').click(); 
    }
  }else if(pos == "shoe"){
    document.getElementById("myCarouselShoes").style.borderBottom="10px solid #003F91";
    document.getElementById("myCarouselShoes").style.borderLeft="10px solid #003F91";
    document.getElementById("myCarouselShoes").style.borderRight="10px solid #003F91";
    if(dir == 0){
      pos= "bot";
      document.getElementById("myCarouselBottoms").style.borderLeft="10px solid #F0E100";
      document.getElementById("myCarouselBottoms").style.borderRight="10px solid #F0E100";
    } else if (dir == 1){
      pos= "top";
      document.getElementById("myCarouselTops").style.borderTop="10px solid #F0E100";
      document.getElementById("myCarouselTops").style.borderLeft="10px solid #F0E100";
      document.getElementById("myCarouselTops").style.borderRight="10px solid #F0E100";
    } else if (dir == 2){
      //click shoes left
      document.getElementById('shoesprev').click(); 
    } else if (dir == 3){
      //click shoess right
      document.getElementById('shoesnext').click(); 
    }
  }
}

function complete(){
  document.body.style.backgroundColor = '#6D326D';
}
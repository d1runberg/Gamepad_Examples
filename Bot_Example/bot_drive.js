
//require needed libraties
var gamepad = require("gamepad");
var five = require('johnny-five');

//create a board object
var board = new five.Board();
// Initialize the gamepad library
   gamepad.init()

//find all connected gamepads
   for (var i = 0, l = gamepad.numDevices(); i < l; i++) {
     console.log(i, gamepad.deviceAtIndex());
   }

// Create a game loop and poll for events
   setInterval(gamepad.processEvents, 20);

// Scan for new gamepads as a slower rate
   setInterval(gamepad.detectDevices, 500);

//when the board is ready, execute
board.on('ready', function(){

//create a motor object for the right motor with pins specified
   var rMotor = new five.Motor({
      pins:{
         pwm: 6 ,
         dir: 7,
         cdir: 8
      }
   });

//create a motor object for the left motor with pins specified
   var lMotor = new five.Motor({
      pins:{
         pwm: 3,
         dir: 4,
         cdir: 5
      }
   });

//when gamepad recieves "move" (direction pad is pressed)
   gamepad.on("move", function (id, axis, value) {
   //print values
     console.log("move", {
       id: id,
       axis: axis,
       value: Math.floor(value),
     });

//if it is the verticial axis
     if(axis == 8)
     {
       switch(value)
       {
          //up
          case -1:
          lMotor.forward(255);
          rMotor.forward(255);
          break;

          //down
          case 1:
          lMotor.reverse(255);
          rMotor.reverse(255);
          break;

          default:
          lMotor.stop();
          rMotor.stop();
          break;
       }
     }
//if it is the horizontal axis
     if(axis == 9)
     {
       switch(value)
       {
          //left
          case -1:
          lMotor.reverse(255);
          rMotor.forward(255);
          break;
         //right
          case 1:
          lMotor.forward(255);
          rMotor.reverse(255);
          break;

          default:
          lMotor.stop();
          rMotor.stop();
          break;
       }
     }
   });
});

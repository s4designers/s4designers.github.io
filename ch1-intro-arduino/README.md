# teacher notes for Chapter 1: Intro Arduino

## video 1: Introduction to the Arduino
1. **Arduino** is small, used in prototyping and installations with buttons, sensors, lights and motors.
1. It isn't used with monitors.
1. This video shows the "expensive" genuine one, because it's components are large.
1. **big chip** is most important.
1. big chip has **pins** that are connected to holes on the side of the board.
1. connecting the wires of the potmeter to the holes connects them to the pins on the chip.
1. then you can write a **program** that checks the voltage/value coming from the potmeter, and decides to write current to the pins connected to the LED.
1. the rest of the arduino is to support the program in the arduino chip.
1. there's a **reset** button.
1. there's a **power**-connector.
1. there's a **USB** connector.



## video 2: software for programming Arduinos
1. this video uses the cheaper chinese Arduino.
1. we need to download the programming software on **arduino.cc**
1. there are two varieties of the software. We will not use the web-based version.
1. we will use the **stand-alone Arduino IDE**.
1. IDE stands for 'Intgrated Development Environment', which is basically a text editor that can talk to an Arduino.
1. The site is a charity and asks for a donation. You can skip that.
1. The video does not show the installation of the doanloaded software.
1. After installation, you can find the program called 'Arduino' on your system, and start it.
1. After starting, the IDE shows a little program. 
1. The program doesn't do anything, but it does contain two required components of any Arduino program: **setup() and loop()**.
1. setup() and loop() are names of sections of code.
1. the code goes between the curly braces. The rest of the syntax will be explained later.
1. first thing we do is talk through the USB cable to the computer.
1. In programs, you refer to the USB connection with the name '**Serial**' (the 'S' in USB).
1. Before we can send data, we need to tell Arduino at what speed we communicate with the laptop.
1. A often used default speed is 9600 (bits per second)
1. **`Serial.begin(9600);`** is added to setup() function.
1. **`Serial.println("Hello World");`** is added to loop() function.
1. "Hello World" is the text that will be sent to the laptop.
1. There is also a **black feedback area** in the IDE, below the text editor, that can be increased in size.
1. In the black area, **red text shows errors** or warnings, white text shows feedback about things that went well.
1. There are a few buttons in the top of the IDE window.
1. The **"Upload" button** is the interesting one. It is how we get the Arduino to do stuff.
1. Other buttons are for creating/opening/saving program files.
1. After pressing "Upload" button, white text appears in black feedback area. 
1. Also "Done uploading." appears in green bar above black feedback area. This means that the program is now running in the Arduino.
1. Jille: "So you've put the code into the Arduino?" 
1. Robert: In a sense, but not exactly: The program is written in **C++ language**. But the processor cannot run C++ (or any other programming language) directly. 
1. The program has to be translated to '**machine code**': the same instructions, in a format that works for the chip.
1. The translation process is called 'compilation'. A '**compiler**' turns C++ into machine code.
1. The "Upload" button does two things: (1) have the compiler start the translation process, and (2) send the generated machine code to the Arduino.
1. After uploading, the program is running, but you can't see its effect.
1. Except for an LED on the board, called Tx **NOTE: mistake in video: Robert calls the LED Rx**. The LED lights up when data is transmitted to the laptop.
1. The **Serial Monitor** is opened in the IDE.
1. The window for the Serial Monitor is showing "Hello World" being shown repeatedly.
1. The code inside **loop() runs repeatedly**.
1. The code in **setup() runs once**, at the beginning.
1. The only way to stop the code in the loop() is to disconnect the power from the Arduino.
1. The progam is changed:
1. In setup(), the line `Serial.println("Hello from setup");` is added at the end.
1. in loop(), **`delay(1000)`** is added.
1. The number given to delay is the duration to wait, in milliseconds.
1. When uploading, an **error message** appears, in red, in the feedback area.
1. On line 11, the translation software (the compiler) encountered a `}`, but it was 
expecting a `;` first.
1. This error message is correct. Many times, the error messages does not describe the actual mistake.
1. Most programming languages (including C++) need a **`;` at the end of each command**.
1. After adding the missing `;`, the upload succeeds.
1. The program works, but some output from the previous run of the program is still visible, making the contents of the Serial Monitor window look a bit weird.
1. The output demonstrates that setup() is run once, at the start, en loop() is run repeatedly, but more slowly, due to the `delay(1000);`
1. Jille notices 9600 being shown in a control in the Serial Monitor window. He changes the value to something else. **Note: this not visible in the video because the picture-in-picture of the Arduino is blocking it**. 
1. The contents of the Serial Monitor become gibberish because the laptop is now trying to read 1's and 0's faster than the Arduino is sending them.
1. Robert points out that very high speeds can be selected. Het thinks that 115200 bits/s is probably the highest speed for Arduino Uno's.
1. Jille asks why his laptop sometimes does not recognize the Arduino.
1. Robert says that not all of the (many) Arduino types are compatible. 
1. You need to tell which one you're using. Select your Arduino type from **"Tools">"Board" menu**.
1. Robert also shows how to select a **'port' in the 'Tools' menu**.
1. Students who cannot configure the port to work with their Arduino, should ask the teacher for help during class.


## video 3: Commands with Arduino 
1. There is already a program loaded. 
1. setup() contains: **`pinMode(11,OUTPUT);`** and `Serial.begin(9600);`
1. loop() turns a LED on pin 11 on and off with **`digitalWrite()`** with a delay of 2000 (on) and 500 (off).
1. There is a **comment** in the code. Comments can contain any text you want. It is not executed as part of the program.
1. The code is already running in the Arduino.
1. Jille adds a line at the start of loop(): `Serial.println(1000);`. This works after uploading.
1. The println() is changed to contain **a calculation**: `Serial.println(1000 - 500/2);`
1. The calculation will follow **high-school arithmetic rules**: division before substraction.
1. The Serial monitor shows the result 750.
1. The println is changed again: `Serial.println(analogRead(0));`.
1. **`analogRead()`** gives a number that represents the amount of current that the Arduino is recieving on analog pin 0. A potmeter is connected to pin 0.
1. When the code runs, the printed number changes when Jille turns the potmeter. 
1. When the potmeter is opened to the max, the number is 1023. **1023** is always the maximum value that Arduino will return for an Analog port.
1. The minumum value is 0 for an analog port.
1. Robert asks how a command can be used inside another command.
1. Jille explains that every time analogRead is called runs, a number is returned. **The command 'becomes' a value**, that can be used with another command (e.g. println()).
1. Now the line becomes `Serial.println( analogRead(0) / 2 );`. 
1. When running the code, the max result is 511.
1. In **calculations with whole numbers**, the result will (in C++) also be a whole number.
1. The delay commands get calculations as input. The calculations read the potmeter value.
1. When the program runs, the potmeter influences the blinking speed of the LED.


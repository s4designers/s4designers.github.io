 // #include change to <path to global header> or "local header"
#include <lib/s4d_breadboard_lib.h>

void setup() {
  initializeBreadboard();
}

String dayNames[] = {
  "Sunday",      // 0    use these numbers in your boolean expressions, not the strings
  "Monday",      // 1
  "Tuesday",     // 2
  "Wednesday",   // 3
  "Thursday",    // 4
  "Friday",      // 5
  "Saturday"     // 6
};

void loop() {
  
  // use helper function for reading the hour from potMeter
  int hour = getHour();
  // use helper function to deal with buttons for changing the weekday
  int dayNumber = adjustWeekday();
  // use the dayName only for printing, not in your boolean expressions (see line 8)
  String dayName = dayNames[dayNumber];
  OLED.printTop( dayName, String(hour) + ":00" );


  // TODO: Replace the 'false' values with boolean expressions
  //       that reflect their names. 
  // NOTE: Feel free to use some variables in the expressions of 
  //       other variables.
  
  bool isSleeping   = false;
  bool havingDinner = false;
  bool isWeekend    = false;
  bool isWorkingDay = false;
  
  bool mustWork     = false;
  bool doingSport   = false; 
  bool isFree       = false;

  if( isSleeping )   { OLED.printBottom( "Sleeping. Zzzz..."); }
  if( havingDinner ) { OLED.printBottom( "Dinner with family" ); }
  if( mustWork )     { OLED.printBottom( "Working: busy,busy" ); }
  if( doingSport )   { OLED.printBottom( "To the fitness club." ); }
  if( isFree )       { OLED.printBottom( "Playstation time!" ); }
}



////////  HELPER FUNCTIONS:  ///////////////////////////////

int getHour() {
  return analogRead( POTENTIOMETER ) / 43;   // range 0 - 1023 => range 0 - 23
}

bool isButtonPressed(int buttonPin) {
  if( digitalRead(buttonPin) ) {
    delay(200);  // wait a very short time for user to release button
    return true;  
  } else {
    return false;
  }
}

int weekday = 1;  // Start on Monday

int adjustWeekday() {
  if( Button.button1Pressed() ) {
    weekday = weekday + 1;
    if( weekday > 6 ) {
      weekday = 0;
    }
  }
  if( Button.button2Pressed()) {
    weekday = weekday - 1;
    if( weekday < 0 ) {
      weekday = 6;
    }
  }
  return weekday;
}

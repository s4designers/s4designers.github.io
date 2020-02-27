# teacher notes for Chapter 3: Functions


## 3.2e Why is the code only displaying "Hallo" and "Toedels" only once in the browser?
The code is executed twice. But the second time has no effect because the areas on the page already contain "Hallo" and "Toedels".

## 3.3 What would be a good name for the function in the code above? 
The name should decribe the side-effect of the function as an action. E.g. "resizeBirdPic".
Function names do NOT start with a capital letter.

## 3.4 Why, when you test this code, are you still seeing such a large bird? Can you fix this? 
It is important to emphasize that commands that are wrapped in a function definition will not execute automatically.
They only execute _when the function is called_. Students need to understand the difference between function definitions and function calls.

## video 6b reacting to user input with JavaScript
1. The page will get a 'Dark mode'. 
1. A function to change colors has been added to the script. The function is called "darkMode" ("switchToDarkMode" would have been better :-)  )
1. A button "Dark Mode" has been added to the HTML, with CSS to position it.
1. code added: 
   ```js
   document.getElementById('darkModeButton').onclick = darkMode
   ```
1. _onclick_ is a variable. It's value is set to the commands in the function darkMode().
1. We want to store the function darkMode (in onclick), not execute it. That is why you mustn't use () after darkMode. That would call the function instead of storing it.
1. The browser will call our function. Not our own code.
1. This is a ~~second~~_third_ benefit of functions: Not just grouping and organizing code, or calling it multiple times, but also to wrap some code in order to hand it to the browser for responding to user actions. 
1. Second example: hiding and showing captions
1. The first picture (giraffe) gets a function "showCaption1" stored in its .onmouseenter variable.
1. The page is tested but showCaption1 isn't defined yet.
1. The console shows an error: "Reference Error: showCaption1 is not defined"
1. The code is fixed by creating the function.
1. The function sets style.visibility = "visible" for the caption.
1. Jille asks about onclick-attributes inside the HTML tag.
1. Answer: That is almost never done anymore. It is more useful to developers and designers not to mix HTML and JavaScript like that.
1. Students must not add interactivity using event-attributes in the HTML.
1. A third style of adding event-functions is shown: .addEventListener(...). It is preferred by professional developers because you can add multiple functions to an event. But it is more typing so we don't use it.



Video 7:
 1. Html pagina met een hhtml-input type=range
 1. There's als a photo
 1. And a funtion "logSliderValue" that gets the value of the slider, and prints it to the console.
 1. the function is assigned to `oninput` of the slider.
 1. Such things are called _event listener_ 
 1. the slider has min=0, max=100
 1. open page in browser, see that it does print the value of the slider.
 1. add a calculation to the console.log: value - 100
 1. see that it works
 1. the width of the photo can be changed based on the slider.
 1. it works, but max is 100, which is very low (orig=600)
 1. add a second picture, make it change inversely.
 1. parenthesis are used for grouping calculations. You may use them even if they are not needed.
 1. width = calc vs. print(calc) is not JS vs Arduino, but assignment vs command


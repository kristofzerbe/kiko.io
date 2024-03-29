/* AutoTyping.js
 *
 * Copyright © 2020 Igor Stojcic (https://igor.smarty.rs) | MIT license
 * https://github.com/igor-stojcic/AutoTyping
 *
 * OPTIONS:                                                                            
 * id             - Your HTML element id without # (string) - required                 
 * typeText       - Your text (array with strings) - required                          
 * textColor      - Color of Your text (string) *default('#000')                       
 * typeSpeed      - Interval between each character (nummber) *default(100ms)          
 * typeDelay      - Delay interval between typing two texts (number) *default(100ms)   
 * typeRandom     - Random interval between each character (boolean) *default(false)   
 * cursor         - Character for cursor (string) *default('|')                        
 * cursorColor    - Color of the cursor (string) *default('#000')                      
 * cursorSpeed    - Interval of the cursor blinks (number) *default(300ms)             
 * deleteSpeed    - Interval of deleting text (number) *default(50ms)                  
 * deleteDelay    - Delay interval before deleting text (number) *default(2000ms)      
 * typeInfinity   - Only one AutoTyping cycle (boolean) *default(true)                 
 *  callback func  - triggered after every typing cycle (object) *default(null)         
 
 * Pimped by Kristof Zerbe
*/

function AutoTyping(options) {
    let counter = 0, blinkcursor, counterText = 1, callBack = null, calBackCounter = 0, userCounter = null;
    if (options.textColor == undefined || typeof(options.textColor) != 'string') {
      options.textColor = '#000';
    }
    if (options.typeSpeed == undefined || typeof(options.typeSpeed) != 'number') {
      options.typeSpeed = 100;
    }
    if (options.typeRandom == undefined || options.typeRandom == false || typeof(options.typeRandom) != 'boolean') {
      options.typeRandom = false;
    }
    if (options.typeDelay == undefined || typeof(options.typeDelay) != 'number') {
      options.typeDelay = 100;
    }
    if (options.cursor == undefined || typeof(options.cursor) != 'string') {
      options.cursor = '|';
    }
    if (options.cursorColor == undefined || typeof(options.cursorColor) != 'string') {
      options.cursorColor = '#000';
    }
    if (options.cursorSpeed == undefined || typeof(options.cursorSpeed) != 'number') {
      options.cursorSpeed = 300;
    }
    if (options.deleteSpeed == undefined || typeof(options.deleteSpeed) != 'number') {
      options.deleteSpeed = 50;
    }
    if (options.deleteDelay == undefined || typeof(options.deleteDelay) != 'number') {
      options.deleteDelay = 2000;
    }
    if (options.callBack != undefined && typeof(options.callBack) == 'object') {
      callBack = options.callBack.method;
      if (options.callBack.counter != undefined && typeof(options.callBack.counter) == 'number') {
        userCounter = options.callBack.counter;
      }
    }
    if (options.typeInfinity == undefined || options.typeInfinity == true || typeof(options.typeInfinity) != 'boolean') {
      options.typeInfinity = true;
    }else{
      options.typeInfinity = false;
    }
    if (options.delete == undefined || options.delete == true || typeof(options.delete) != 'boolean') {
      options.delete = true;
    }else{
      options.delete = false;
    }
    if (options.showCursor == undefined || options.showCursor == true || typeof(options.showCursor) != 'boolean') {
      options.showCursor = true;
    }else{
      options.showCursor = false;
    }
  
    this.typingElement = document.querySelector('#' + options.id);

    //hidden element for prevent that the main element when typing / deleting appears and disappears
    var ePlaceholder = document.createElement("span");
    ePlaceholder.className = "typing-placeholder";
    this.helpingElement = this.typingElement.appendChild(ePlaceholder);
    this.helpingElement.innerHTML = '';
    this.helpingElement.style.visibility = 'hidden';

    var eText = document.createElement("span");
    eText.className = "typing-text";
    this.typingArea = this.typingElement.appendChild(eText);

    if (options.showCursor) {
      var eCursor = document.createElement("span");
      eCursor.className = "typing-cursor";
      this.cursor = this.typingElement.appendChild(eCursor);
      this.cursor.style.color = options.cursorColor;
      this.cursor.innerHTML = options.cursor;
      this.cursorSpeed = options.cursorSpeed;  
    }

    this.typeSpeed = options.typeSpeed;
    this.typeSpeedRandom = options.typeRandom;
    this.typingArea.style.color = options.textColor;
    this.typeText = options.typeText;
    this.deleteSpeed = options.deleteSpeed;
    this.deleteDelay = options.deleteDelay;
    this.typeDelay = options.typeDelay;
    this.typeInfinity = options.typeInfinity;
    this.callBack = callBack;
    this.userCounter = userCounter;
  
    this.init = function () {
      let startApp = start.bind(this);
      startApp();
      function start() {
        if (calBackCounter && this.callBack) {
          calBackCounter = 0;
          (this.callBack)(this.userCounter);
          if (typeof(this.userCounter) == 'number') {
            if (this.userCounter > 0) {
              this.userCounter--;
            }else{
              this.userCounter = userCounter;
            }
          }
        }
        if (options.showCursor) {
          clearInterval(blinkcursor);//stop blinking cursor
          this.cursor.style.visibility = 'visible';  
        }

        let tempArr = [];
        let text = this.typeText[counter].split("");
        counter++;
        if (counter == this.typeText.length) {
          counter = 0;
          (!this.typeInfinity)? counterText = 0 : counterText = 1;
        }
        let startTypingText = startTyping.bind(this);
        startTypingText();//typing start
        function startTyping() {
          let typeLetter = text.shift();
          tempArr.push(typeLetter);
          this.typingArea.innerHTML += typeLetter;
          (this.typeSpeedRandom)? this.typeSpeed += Math.floor(Math.random() * 200) : this.typeSpeed;//random typing or not
          let loop = setTimeout(startTypingText,this.typeSpeed);
          this.typeSpeed = options.typeSpeed;
          if (text.length == 0) {
            clearTimeout(loop);
            //settings for blinking cursor
            let temp = 0;
            let blinking = blink.bind(this);
            function blink () {
              if (temp == 0) {
                if (options.showCursor) this.cursor.style.visibility = 'hidden';
                temp = 1;
              }else{
                if (options.showCursor) this.cursor.style.visibility = 'visible';
                temp = 0;
              }
            }
            if (options.showCursor) blinkcursor = setInterval(blinking,this.cursorSpeed);
  
            if (options.delete) {
              setTimeout(deleteTypingText,this.deleteDelay);//delete typing
            }
          }
        }
        //settings for deleting typing text
        let deleteTypingText = deleteTyping.bind(this);
        function deleteTyping() {
          if (options.showCursor) {
            clearInterval(blinkcursor);//stop blinking cursor
            this.cursor.style.visibility = 'visible';  
          }

          tempArr.pop();
          let delText = '';
          for (let i = 0; i < tempArr.length; i++) {
            delText += tempArr[i];
          }
          this.typingArea.innerHTML = delText;
          let loop = setTimeout(deleteTypingText,this.deleteSpeed);
          if (tempArr.length == 0) {
            clearTimeout(loop);
            //settings for blinking cursor
            let temp = 0;
            let blinking = blink.bind(this);
            function blink () {
              if (temp == 0) {
                if (options.showCursor) this.cursor.style.visibility = 'hidden';
                temp = 1;
              }else{
                if (options.showCursor) this.cursor.style.visibility = 'visible';
                temp = 0;
              }
            }
            if (options.showCursor) blinkcursor = setInterval(blinking,this.cursorSpeed);
            //stop app or not
            if (!this.typeInfinity && !counterText) {

              if (options.showCursor) {
                clearInterval(blinkcursor);
                this.cursor.style.visibility = 'hidden';  
              }
              return;
            }else{
              if (this.callBack) {
                calBackCounter++;
              }
              setTimeout(startApp,this.typeDelay);
            }
          }
        }
      }
    }
  }
/*==================================    

  TODO: 
    * een <answer> voor meerdere korte vragen.
    * hint element;
    * promise based script loading;
    * answer instruction should be visible 
      with <answer.../> instead of <answer...></answer>
    * tweak margin between h2 and attention-block (ch2)
    * Attention blocks can have different headings
    * Check 'mail your' button labels.
    * Bedenk welke opdrachten 'noslider' moeten hebben.
  ==================================*/

// iife to prevent creating global variables
(function () {

//======= helper functions ==========================================

// returns a single element that matcher the css-selector (unlike JQuery)
function $(selector, parentElement=window.document) {
  return parentElement.querySelector(selector)
}
// returns an array with all elements that match the css-selector (a bit like JQuery)
function $$(selector, parentElement=window.document) {
  return Array.from(parentElement.querySelectorAll(selector))
}
function byId(id) {
  return window.document.getElementById(id)
}

// creates a element, but doesn't place it into the DOM
function createElement( tagName, attributes={}, innerHTML="") {
  const element = document.createElement(tagName);
  for( attrName in attributes ) {
    element.setAttribute(attrName, attributes[attrName])
  }
  element.innerHTML = innerHTML
  return element
}

// create unique id, given a prefix. 
//E.g. newId('button') => 'button-0', 'button-1' ... 'button-154'
idCounters = {}
function newId(prefix="id") {
  let count = idCounters[prefix] || 0
  idCounters[prefix] = ++count
  return prefix+"-"+count
}

// escape characters to make string safe for use in HTML.
function encodeForHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function loadScript(url, extraAttrs={}) {
  return new Promise((resolve, reject) => {
    const attrs = { 
      type: 'text/javascript',
      async: false,
      src: url,
      ...extraAttrs
    }
    var scriptElement = createElement('script', attrs)

    scriptElement.onload = () => {
      console.log(`loaded ${url}`)
      resolve(url)
    }
    scriptElement.onerror = (err) => {
      console.error(`could not load ${url}`, err)
      reject(url)
    }
    document.body.append(scriptElement);
  })
}


const mainCssEl = $$('link[rel="stylesheet"]', document.head).pop();
function loadStylesheet(url) {
  return new Promise((resolve, reject) => {
    const attrs = { 
      type: 'text/css',
      rel: 'stylesheet',
      href: url
    }
    var styleElement = createElement('link', attrs)

    styleElement.onload = () => {
      console.log(`loaded ${url}`)
      resolve(url)
    }
    styleElement.onerror = (err) => {
      console.error(`could not load ${url}`,err)
      reject(url)
    }
    mainCssEl.insertAdjacentElement('beforebegin', styleElement);
  })
}

//======= creating page elements ====================================

function createYoutubePlayers() {
  let allYoutubeElements = $$("youtube")
  allYoutubeElements.forEach( ytElement =>{
    let width = 800
    let height = width * 9/16
    let youtubeId = ytElement.getAttribute('ytid')
    let embedCode = `
      <iframe width="${width}" height="${height}" 
              src="https://www.youtube-nocookie.com/embed/${youtubeId}" frameborder="0" 
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
      </iframe>
    `
    ytElement.outerHTML = embedCode
  })  
}

const defaultAnswerInstructionsWithSlider = "First, use the slider to tell us how satisfied you are with your answer. Then use the button to send in your answer.";
const defaultAnswerInstructionsNoSlider = "Send in your answer using this button:";
const defaultAnswerButtonText = "Mail your work"

const createAnswerBlocks = function() {
  let allAssignmentSections = $$("section.assignment")
  allAssignmentSections.forEach( assignmentSection => {
    const title = $("*:first-child",assignmentSection).textContent
    const firstSpaceIdx = title.indexOf(' ');
    const assignmentId = title.slice(0,firstSpaceIdx).trim();
    const assignmentTitle = title.slice(firstSpaceIdx).trim();
    const answerElement = $("answer",assignmentSection)
    
    let subQuestions = $$('ol[type="a"] > li', assignmentSection)
    const chars = (function *() {
      let currChar = "a"
      while(true) {
        yield currChar
        currChar = String.fromCharCode(currChar.charCodeAt(0)+1)
      }
    })()
    subQuestions = subQuestions.map( el => {
      return chars.next().value + ") " + el.textContent + "\n\n\n"
    })

    const buttonId = newId("button")

    if( !answerElement ) {
      const assignmentBlock = `
        <div class="assignment-block" >
          ${defaultAnswerInstructionsNoSlider}
          <button id=${buttonId} class="mail-button">${defaultAnswerButtonText}</button>
        </div>  
      `
      assignmentSection.insertAdjacentHTML('beforeend', assignmentBlock)
      const mailButton = byId(buttonId)
      mailButton.addEventListener("click", (evt) => {
        let subject = encodeURIComponent( `s4d_${assignmentId} ${assignmentTitle}`)
        window.open(`mailto:s4designers@gmail.com?subject=${subject}`)
      })
    } else {  // answerElement exists
      const noSliderValue = answerElement.getAttribute("noslider")
      const needsSlider = ["no", "false", null].includes(noSliderValue)
      const answerInstructions = answerElement.innerHTML || (needsSlider ? defaultAnswerInstructionsWithSlider : defaultAnswerInstructionsNoSlider)
      const sliderId = newId("button")
      const displayId = newId("sliderDisplay")
      let sliderHTML = ''
      if(needsSlider) {
        sliderHTML = `<br>
          <input id=${sliderId} class="satisfaction-slider" type=range value=50 min=0 max=100> 
          <span id=${displayId} class="satisfaction-display">50</span>%
        `
      }
      buttonText = answerElement.getAttribute("buttontext") || defaultAnswerButtonText
      const buttonDisabled = needsSlider ? "disabled" : ''
      const assignmentBlock = `
        <div class="assignment-block" >
          ${answerInstructions}
          ${sliderHTML}
          <button id=${buttonId} class="mail-button" ${buttonDisabled}>${buttonText}</button>
        </div>  
      `
      answerElement.outerHTML = assignmentBlock
      const satisfactionSlider = byId(sliderId)
      const sliderDisplay = byId(displayId)
      const mailButton = byId(buttonId)
      if(needsSlider) {
        satisfactionSlider.addEventListener("change", (evt) => {
          mailButton.disabled = false
        })
        satisfactionSlider.addEventListener("input", (evt) => {
          sliderDisplay.textContent = satisfactionSlider.value
        })      
        mailButton.addEventListener("click", (evt) => {
          let satisfactionPrefix = `(${satisfactionSlider.value}) `
          let subject = encodeURIComponent( satisfactionPrefix + `s4d_${assignmentId} ${assignmentTitle}`)
          window.open(`mailto:s4designers@gmail.com?subject=${subject}`)
        })
      } else {
        mailButton.addEventListener("click", (evt) => {
          let subject = encodeURIComponent( `s4d_${assignmentId} ${assignmentTitle}`)
          let messageBody = encodeURIComponent( subQuestions.join("") )
          window.open(`mailto:s4designers@gmail.com?subject=${subject}&body=${messageBody}`)
        })
      }
    }
  })
}

function createTodoBlocks() {
  $$('todo').forEach( todoElement => {
    const replacementHtml = `<div class="todo">
        ${todoElement.innerHTML}
      </div>`
    todoElement.outerHTML = replacementHtml
  })
}

async function createNotes() {
  await loadScript(`https://unpkg.com/popper.js`)
  await loadScript(`https://unpkg.com/tippy.js@5/dist/tippy-bundle.iife.js`)
  $$('note').forEach( noteElement => {
    const popupId = newId('popup')
    const noteContent = noteElement.innerHTML
    const replacementHtml = `<span id="${popupId}" class="note">
      </span>`
    noteElement.outerHTML = replacementHtml
    tippy( byId(popupId), {
      content: noteContent
     });
  })
}


function createDownloadButtons() {
  $$('download').forEach( downloadElement =>{
    const downloadLinkId = newId("download-link")
    const downloadButtonId = newId("download-button")
    let downloadButtonText = downloadElement.getAttribute("buttonText")
    let downloadUrl = downloadElement.getAttribute("href")
    let fileName;
    if(!downloadUrl){ 
      const errMessage = `Useless href «${downloadUrl}» for downloadButton`
      console.error( errMessage, downloadElement)
      downloadButtonText = errMessage;
      fileName = ""
    }
    if( ! downloadButtonText ) {
      fileName = downloadUrl.split("/").pop()
      downloadButtonText = "Download " + fileName
    }

    downloadUrl = downloadUrl
                    .split("/")
                    .map( (c)=>encodeURIComponent(c) )
                    .join("/")

    const replacementHtml = `
      <button id="${downloadButtonId}">
        <img class="buttonIcon" src="../images/download.svg"> ${downloadButtonText}
      </button>
      <a id="${downloadLinkId}" href="${downloadUrl}" download="${fileName}" hidden></a>
    `
    downloadElement.outerHTML = replacementHtml;
    byId(downloadButtonId).addEventListener('click', () =>{
      byId(downloadLinkId).click()
    })
  })
}

async function loadIncludes() {
  const allIncludeElements = $$('*[include]').map( async includeElement => {
    try {
      const [url, id] = includeElement.getAttribute('include').split("#");
      if( ! url ) {
        throw { msg: "An 'include' attribute does not contain an url.", 
                element: includeElement}
      }
      const selector = includeElement.getAttribute('select')
      const rejector = includeElement.getAttribute('reject')

      const response = await fetch(url)
      if( ! response.ok ) {
        throw { msg: `Could not get html file at "${url}": ${response.status} ${response.statusText}`,
                element: includeElement, 
                response} 
      }
      const content = await response.text()
      const resultDocument = new DOMParser().parseFromString(content, 'text/html')
      if( resultDocument.firstElementChild.tagName == "parsererror") {
        throw new XMLSerializer().serializeToString(resultDocument)
      }
      if( rejector ) {
        for( node of resultDocument.querySelectorAll(rejector)) {
          node.remove();
        }
      }

      let selectedNodes
      if( id && selector ) {
        selectedNodes = Array.from(resultDocument.getElementById(id).querySelectorAll(selector))
      } else if( id ) {
        selectedNodes = [ resultDocument.getElementById(id) ]
      } else if( selector ) {
        selectedNodes = Array.from(resultDocument.querySelectorAll(selector))      
      } else {
        selectedNodes = Array.from(resultDocument.body.childNodes)
      }
      selectedNodes.forEach( node => {
        if( node.ownerDocument == document ) { return }; // node is child of node that was already transferred to main document.        
        includeElement.appendChild(node)
      })
    }
    catch(err) {
      console.log(err.msg)
      console.error(err)
    }
  })
  await Promise.all(allIncludeElements)
}

async function addCodeHighlighter() {
  window.Prism = window.Prism || {};
  window.Prism.manual = true;
  await Promise.all([
    loadStylesheet('/js/prism/custom-prims.css'),
    loadScript('/js/prism/custom-prism.js')  
  ])
  console.log("doing the highlight")  
  window.Prism.highlightAll()
}

function adaptPageTitle() {
  const titleElement = $('h1')
  let title = titleElement.innerHTML
  const titleRegex = /^\s*(?:Chapter)?\s*(\d+):?\s*(.*)$/
  const titleSegments = title.match(titleRegex);
  if(titleSegments.length == 3){
    const chapterNum = titleSegments[1]
    const chapterTitle = titleSegments[2]
    titleElement.innerHTML = `<div class="chapter-num">
        CHAPTER ${chapterNum}
      </div>
      ${chapterTitle}`
  }
  $('title').textContent = "S4D - " + $('h1').textContent
}

//====== main program ===============================================


async function setupChapter() {
  await loadIncludes()
  adaptPageTitle()
  createYoutubePlayers()
  createAnswerBlocks()
  createTodoBlocks()
  createDownloadButtons()
  addCodeHighlighter()
  createNotes()  
}

setupChapter();

})();  // end of iife construct




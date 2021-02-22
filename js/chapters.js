function ll(...args) {
  console.log(...args);
}


/*==================================    
  TODO: 
    * answer instruction should be visible 
      with <answer.../> instead of <answer...></answer>
    * tweak margin between h2 and attention-block (ch2)
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

function appendToElement(element, children) {
  if(typeof children === "string"){
    element.innerHTML = children
  } else if(children instanceof Element){
    element.appendChild(children)
  } else if(children instanceof Array) {
    for(const child of children) {
      appendToElement(element, child)
    }
  }
}

// creates a element, but doesn't place it into the DOM
function createElement( tagName, attributes={}, children="") {
  const element = document.createElement(tagName);
  for( attrName in attributes ) {
    if(attrName.charAt(0) === '$') {
      element.style[attrName.substring(1)] = attributes[attrName];
    } else {
      element.setAttribute(attrName, attributes[attrName])
    }
  }
  appendToElement(element, children)
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

const tocLevels = {
  // h1:  1,
  h2:  1,
  h3:  2,
  h4:  3,
  youtube: 2
}
const youtubeOembedUrl = (ytid) => `https://noembed.com/embed?url=http://www.youtube.com/watch?v=${ytid}`

async function createTOC(testData) {
  const contentElements = testData || $$("h2, h3, h4, youtube")
  const tocItems = []
  const youtubePromises = []
  currentLevel = 0
  for( contentEl of contentElements ) {
    const tocItem = { }
    tocItems.push(tocItem)
    // determine TOC level
    tocItem.tocLevel =  tocLevels[contentEl.tagName.toLowerCase()] 
    // determine title text
    if( contentEl.tagName.toLowerCase() === 'h1' ) {
      tocItem.title = contentEl.innerHTML  // perhaps treat h1's differently?
    } else if(contentEl.tagName.toLowerCase() !== 'youtube') {
      const taskRegex = /<span\s+class="task-type"\s*>.*?<\/span>\s*$/
      tocItem.title = contentEl.innerHTML.replace(taskRegex, '')
    } else if(contentEl.title) {
      tocItem.title = contentEl.title
      tocItem.icon = "youtube"
    } else {
      // start getting titles for youtube videos
      const ytid = contentEl.getAttribute('ytid')
      tocItem.icon = "youtube"
      tocItem.ytid = ytid
      promiseForYTVideoTitle = (async () => {
        const response = await fetch(youtubeOembedUrl(ytid.split("?")[0]))
        const json = await response.json()
        return [ytid, json]
      })()
      youtubePromises.push( promiseForYTVideoTitle )
    }
    // get item id, or create one
    let id = contentEl.id
    if( !id || id === "") {
      id = newId("tocItem")
      contentEl.id = id
    } 
    tocItem.id = id;

    // is this item the first item of a special textbox (attention, theory etc.)?
    if( contentEl.parentElement.firstElementChild == contentEl) {
      const parentClasses = contentEl.parentElement.classList 
      for( className of ["theory", "attention", "instruction"]) {
        if( parentClasses.contains(className)){
          tocItem.icon = className
          // make toc link to textbox, not header
          let id = contentEl.parentElement.id
          if( !id || id === "") {
            id = newId("tocItem")
            contentEl.parentElement.id = id
          } 
          tocItem.id = id;
        }
      }
    }
  }

  // process youtube titles when they've been received
  const youtubeResponses = await Promise.all(youtubePromises)
  for(const [ytid,data] of youtubeResponses) {
    for(const tocItem of tocItems){
      if( tocItem.ytid === ytid) {
        tocItem.title = data.title ? data.title.split(": ")[1] || data.title
                                   : "video "+ ytid
        break
      }
    }
  }

  // generate toc
  const tocElements = tocItems.map(tocItem => {
    const linkEl = createElement("a", {href: "#"+ tocItem.id}, tocItem.title)
    // if(tocItem.ytid) {
    //   linkEl.insertAdjacentElement("afterbegin", createElement("img", {src:"../images/youtube.svg", class: "toc-icon"}))
    // }
    if(tocItem.icon) {
      linkEl.insertAdjacentElement("afterbegin", createElement("img", {src:`../images/${tocItem.icon}-icon.svg`, class: "toc-icon"}))
    }
    return createElement("div", {class: "tocLine toc"+tocItem.tocLevel}, linkEl )
  })
  const tocDiv = createElement("div", {id: "toc"},tocElements)
  tocDiv.insertAdjacentHTML("afterbegin","<h1>chapter contents</h1>")
  $("#toc-column").appendChild(tocDiv)
}

function createYoutubePlayers() {
  let allYoutubeElements = $$("youtube")
  allYoutubeElements.forEach( ytElement =>{
    let width = 650
    let height = width * 9/16
    let youtubeId = ytElement.getAttribute('ytid')
    let id = ytElement.id
    let embedCode = `
      <div id="${id}" class="videoWrapper">
        <iframe width="${width}" height="${height}" 
                src="https://www.youtube-nocookie.com/embed/${youtubeId}" frameborder="0" 
                allow="" allowfullscreen>
        </iframe>
      </div>
      `
    ytElement.outerHTML = embedCode
  })  
}

const defaultAnswerInstructionsWithSlider = "First, use the slider to tell us how satisfied you are with your answer. Then use the button to send in your answer.";
const defaultAnswerInstructionsNoSlider = "Send in your answer using this button:";
const defaultAnswerButtonText = "mail your work"

const createAnswerBlocks = function() {
  let allAssignmentSections = $$("section.assignment")
  allAssignmentSections.forEach( assignmentSection => {

    const title = $("*:first-child",assignmentSection).textContent
    const firstSpaceIdx = title.indexOf(' ');
    const assignmentId = title.slice(0,firstSpaceIdx).trim();
    const assignmentTitle = title.slice(firstSpaceIdx).trim();
    const answerElement = $("answer",assignmentSection)
    let subQuestions = $$('ol[type="a"] > li', assignmentSection)
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    subQuestions = subQuestions.map( (el,idx) => {
      return chars.charAt(idx) + ") " + el.textContent + "\n\n\n"
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
        let messageBody = encodeURIComponent( subQuestions.join("") )
        window.open(`mailto:s4designers@gmail.com?subject=${subject}&body=${messageBody}`)
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
          let messageBody = encodeURIComponent( subQuestions.join("") )
          window.open(`mailto:s4designers@gmail.com?subject=${subject}&body=${messageBody}`)
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

const defaultHintSteps = [
  { prompt: "Try to solve the problem by yourself. But if you're stuck, use the button for a hint:",
    buttonLabel: "<b>?</b>"
  },
  { prompt: "Sure?",
    buttonLabel: "Yes." 
  },
  { prompt: "If you really, <i>really</i>, need the hint...",
    buttonLabel: "Give me the hint!"
  }
]

function createHintBlocks() {
  const hintElements = $$("hint")
  hintElements.forEach( hintElement => {
    const hintStepElements = $$(":scope > hintstep",hintElement);
    let hintSteps = defaultHintSteps
    let maxSteps = 3;
    if(hintStepElements.length > 0) {
      hintSteps = hintStepElements.map( el => ({ prompt: el.innerHTML, buttonLabel: el.getAttribute("buttontext") || "?"}))
      hintStepElements.forEach( el => el.remove() )
      maxSteps = Math.min(hintSteps.length, hintElement.getAttribute("steps") || 10000);
    } else {
      maxSteps = Math.min(hintSteps.length, hintElement.getAttribute("steps") || 1)
    }
    const hintContentId = newId('hint-content')
    const hintContentBlock = createElement(`div`, {id: hintContentId, class:'hint-content'},
      `<div>`)
      hintContentBlock.append(...hintElement.childNodes)
    const hintContentWrapper = createElement(`div`,{class: "hint-content-wrapper"})
    hintContentWrapper.append(hintContentBlock)
    hintContentWrapper.style.maxHeight = '0px'  
    hintContentWrapper.style.opacity = 0        
    hintElement.insertAdjacentElement('afterend', hintContentWrapper)
    const hintBlockId  = newId('hint-block')
    const hintPromptId = newId('hint-block-prompt')
    const hintButtonId = newId('hint-block-button')
    const hintCancelId = newId('hint-block-cancel')
    const hintButtonBlock = createElement(`div`, {id: hintBlockId, class:"hint-block"},
     `<span  id=${hintPromptId}></span>
      <button id=${hintButtonId} class="hint-button"></button>
      <button id=${hintCancelId} class="cancel-button">&times;</button>`)
    const hintButtonWrapper = createElement(`div`,{class: "hint-block-wrapper"})
    hintButtonWrapper.append(hintButtonBlock)
    hintElement.insertAdjacentElement('afterend', hintButtonWrapper)
    hintButtonWrapper.style.maxHeight = hintButtonWrapper.scrollHeight+'px'
    hintButtonWrapper.style.opacity = 1
    hintElement.remove()
    let hintStepCount = 0;
    function showStep() {
      if(hintStepCount == maxSteps){
        // show content and hide prompt & button
        hintButtonWrapper.style.maxHeight = '0px'
        hintButtonWrapper.style.opacity = 0
        hintContentWrapper.style.maxHeight = hintContentWrapper.scrollHeight + 'px'
        hintContentWrapper.style.opacity = 1
        hintContentWrapper.addEventListener('transitionend',()=>{
          hintContentWrapper.style.maxHeight = 'none'
        })
      } else {
        hintButtonBlock.classList.remove('step'+(hintStepCount-1))
        hintButtonBlock.classList.add('step'+hintStepCount)
        byId(hintPromptId).innerHTML = hintSteps[hintStepCount].prompt
        byId(hintButtonId).innerHTML = hintSteps[hintStepCount].buttonLabel
      }
    }
    showStep();
    byId(hintButtonId).onclick = () => { hintStepCount++;   showStep() }
    byId(hintCancelId).onclick = () => { hintStepCount = 0; showStep() }
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
    let downloadButtonText = downloadElement.getAttribute("buttonText") || downloadElement.textContent
    let downloadUrl = downloadElement.getAttribute("href")
    let fileName;
    if(!downloadUrl){ 
      const errMessage = `Useless href «${downloadUrl}» for downloadButton`
      console.error( errMessage, downloadElement)
      downloadButtonText = errMessage;
      fileName = ""
    } else {
      fileName = downloadUrl.split("/").pop()
    }
    if( ! downloadButtonText ) {
      if(fileName.includes(" ")){
        downloadButtonText = 'download "' + fileName + '"'
      } else {
        downloadButtonText = "download " + fileName + ""
      }
    }

    downloadUrl = downloadUrl
                    .split("/")
                    .map( (c)=>encodeURIComponent(c) )
                    .join("/")
    // correct for inadvertent URIencoding of protocol colon                
    const match = downloadUrl.match( /^(https?)%3A(\/\/.+)/i )
    if(match) {
      downloadUrl = match[1] + ":" + match[2]
    }
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
  return Promise.all(allIncludeElements)
}

async function addCodeHighlighter() {
  window.Prism = window.Prism || {};
  window.Prism.manual = true;
  await Promise.all([
    loadStylesheet('/js/prism/custom-prims.css'),
    loadScript('/js/prism/custom-prism.js')  
  ])
  window.Prism.highlightAll(false)
}

function adaptPageTitle() {
  const titleElement = $('main h1')
  let titleHtml = titleElement.innerHTML
  let titleText = titleElement.textContent
  const titleRegex = /^\s*(?:Chapter)?\s*(\d+):?\s*(.*)$/i
  const htmlSegments = titleHtml.match(titleRegex);
  if(htmlSegments && htmlSegments.length == 3){
    const textSegments = titleText.match(titleRegex);
    const chapterNum = textSegments[1]
    const chapterTitle = htmlSegments[2]
    titleElement.innerHTML = `<div class="chapter-num">
        CHAPTER ${chapterNum}
      </div>
      ${chapterTitle}`
      $('title').textContent = `S4D ${textSegments[1]}: ${textSegments[2]}`
  } else {
    $('title').textContent = "S4D: " + $('h1').textContent
  }
}

let tocVisibleObserver
function installScrollToTop() {
  const scrollToTopDiv = createElement('div',{id:"scrollToTop"},"⇧ scroll to top ⇧")
  scrollToTopDiv.onclick = function() {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }
  document.body.appendChild(scrollToTopDiv)
  function tocVisibilityChanged(entries) {
    entries.forEach( () =>{
      const viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      const tocBottom = $("#toc").getBoundingClientRect().bottom;
      scrollToTopDiv.classList.toggle('visible', tocBottom < viewportHeight/3*2);
    })
  }

  tocVisibleObserver = new IntersectionObserver(tocVisibilityChanged, {root:null, rootMargin: "0px", threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]})
  tocVisibleObserver.observe($("#toc"))
}

function gotoFragmentId() {
  const fragmentId = window.location.hash.slice(1)
  if(fragmentId.length > 0) {
    window.location.hash = "#"+fragmentId
  }
}


//====== main program ===============================================


async function setupChapter() {
  await createTOC()          // also async, but no need to await
  await loadIncludes()
  adaptPageTitle()
  createHintBlocks()
  createYoutubePlayers()
  createAnswerBlocks()
  createTodoBlocks()
  createDownloadButtons()
  createNotes()  
  installScrollToTop()
  await addCodeHighlighter()
  gotoFragmentId()
}

setupChapter();

})();  // end of iife construct




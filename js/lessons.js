console.log("HI1YA!")
createYoutubePlayers();
createAssigmentLinks();


function createYoutubePlayers() {
  let allYoutubeElements = Array.from(document.querySelectorAll("youtube"))
  allYoutubeElements.forEach( ytElement =>{
    let width = 800
    let height = width * 9/16
    let youtubeId = ytElement.getAttribute('data-ytid')
    let embedCode = `
      <iframe width="${width}" height="${height}" 
              src="https://www.youtube-nocookie.com/embed/${youtubeId}" frameborder="0" 
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
      </iframe>
    `
    console.log("YT:", youtubeId, ytElement, embedCode)
    ytElement.outerHTML = embedCode
  })  
}

function createAssigmentLinks() {
  let allAssignmentSections = Array.from(document.querySelectorAll("section.assignment"))
  allAssignmentSections.forEach( assignmentSection => {
    let title = assignmentSection.querySelector("h3.assignment").textContent
    let assignmentId = title.split(" ")[0]
    let assignmentLink = document.createElement("div")
    assignmentLink.classList.add("assignment-link")
    assignmentSection.appendChild(assignmentLink)
    assignmentLink.innerHTML = `
        <div class="slider-instruction">First, use the slider to tell us how satisfied you are with your answer. Then use the link to mail your answer.</div>
        <input class="satisfaction-slider" type=range value=50 min=0 max=100> 
        <span class="satisfaction-display"></span>%
        <button class="mail-button" hidden>Mail your work</button>
    `
    let mailButton = assignmentLink.querySelector("button.mail-button")
    let satisfactionSlider = assignmentLink.querySelector("input.satisfaction-slider")
    let satisfactionDisplay = assignmentLink.querySelector("span.satisfaction-display")
    satisfactionDisplay.textContent = satisfactionSlider.value;
    mailButton.addEventListener("click", (evt) => {
      let satisfaction = satisfactionSlider.value
      let subject = encodeURIComponent(`(${satisfaction}) s4d_${title}`)
      window.open(`mailto:s4designers@gmail.com?subject=${subject}`)
    })
    satisfactionSlider.addEventListener("change", (evt) => {
      mailButton.hidden = false
    })
    satisfactionSlider.addEventListener("input", (evt) => {
      satisfactionDisplay.textContent = satisfactionSlider.value;
    })
  })
}









const navbarID = "navbar-links";
const accordionID = "accordionMenu";
const passwordModalID = "passwordModal"
let passwordModalOpened = false
let downloadingURL = ""
let passwordModal = null

const downloadFile = (url = "") => {
  if (url != "") {
    downloadingURL = url
  } else {
    url = downloadingURL
  }
  if (!passwordModal) {
    passwordModal = new bootstrap.Modal(document.getElementById(passwordModalID), {})
  }

  if (!passwordModalOpened) { // show modal since it is not shown
    passwordModal.show()
    return
  } else { // process password
    let enteredPassword = document.getElementById("password")
    let encryptedPassword = CryptoJS.SHA3(CryptoJS.MD5(enteredPassword.value))
    enteredPassword.value = ""
    if (encryptedPassword != password) {
      alert("パスワードは違う")
      enteredPassword.focus()
      return
    }
    // close modal
    passwordModal.hide()
  }

  var link = document.createElement("a");
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  delete link;

  downloadingURL = ""
}



window.addEventListener('DOMContentLoaded', (event) => {
  const passwordModal = document.getElementById(passwordModalID)
  if (passwordModal) {
    // add event listener
    document.getElementById(passwordModalID).addEventListener('shown.bs.modal', event => {
      passwordModalOpened = true
    })
    document.getElementById(passwordModalID).addEventListener('hidden.bs.modal', event => {
      passwordModalOpened = false
    })
  }

  // Create page
  let navbar = document.getElementById(navbarID);
  if (navbar) {
    while( navbar.firstChild ){
      navbar.removeChild( navbar.firstChild );
    }
    categories.map(category =>{
      let wrapper = document.createElement('li')
      wrapper.className = "nav-item dropdown"
      // create button to open dropdown list
      let buttonID = `navbarCategory${category.en_name}`
      let button = document.createElement('a')
      button.className = "nav-link dropdown-toggle"
      button.href = "#"
      button.id = buttonID
      button.setAttribute("role", "button")
      button.setAttribute("data-bs-toggle", "dropdown")
      button.setAttribute("aria-expanded", "false")
      button.innerText = category.name
      wrapper.appendChild(button)

      let dropdownUL = document.createElement("ul")
      dropdownUL.className = "dropdown-menu"
      dropdownUL.setAttribute("aria-labelledby", buttonID)

      category.pages.map(page =>{
        let li = document.createElement("li")
        let link = document.createElement("a")
        link.className = "dropdown-item"
        link.href = page.file ? `../${category.en_name.toLowerCase()}/${page.file}` : "../index.html"
        link.innerText = page.name
        li.appendChild(link)
        dropdownUL.appendChild(li)
      })
      wrapper.appendChild(dropdownUL)
      navbar.appendChild(wrapper)
    })
  }

  let accordion = document.getElementById(accordionID);
  if (accordion) {
    while( accordion.firstChild ){
      accordion.removeChild( accordion.firstChild );
    }
    let rowClass = "row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3"
    categories.map((category, i) =>{
      let wrapper = document.createElement("div")
      wrapper.className = "accordion-item"

      let headingID = `heading${category.en_name}`
      let collapseID = `collapse${category.en_name}`
      let header = document.createElement("h2")
      header.className = "accordion-header"
      header.id = headingID
      let headerButton = document.createElement("button")
      headerButton.className = `accordion-button${(i === 0) ? "" : " collapsed"}`
      headerButton.type = "button"
      headerButton.setAttribute("data-bs-toggle", "collapse")
      headerButton.setAttribute("data-bs-target", `#${collapseID}`)
      headerButton.setAttribute("aria-expanded", `${(i === 0) ? "true" : "false"}`)
      headerButton.setAttribute("aria-controls", collapseID)
      headerButton.innerText = category.name
      header.appendChild(headerButton)
      wrapper.appendChild(header)

      let collapse = document.createElement("div")
      collapse.id = collapseID
      collapse.className = `accordion-collapse collapse${(i === 0) ? " show" : ""}`
      collapse.setAttribute("aria-labelledby", headingID)
      collapse.setAttribute("data-bs-parent", `#${accordionID}`)
      let collapseBody = document.createElement("div")
      collapseBody.className = "accordion-body"
      let collapseRow = document.createElement("div")
      collapseRow.className = rowClass
      category.pages.map(page =>{
        let cardWrapper = document.createElement("div")
        cardWrapper.className = "col"
        let card = document.createElement(page.file ? "a" : "div")
        card.className = "card text-decoration-none"
        if (page.file) {
          card.href = `${category.en_name.toLowerCase()}/${page.file}`
        }
        if (page.image) {
          let image = document.createElement("img")
          image.src = `images/${category.en_name.toLowerCase()}/${page.image}`
          image.className = "card-img-top"
          image.alt = `${page.name} image`
          card.appendChild(image)
        }
        let cardBody = document.createElement("div")
        cardBody.className = "card-body"
        let title = document.createElement("h5")
        title.className = "card-title text-body text-decoration-none"
        title.innerText = page.name
        cardBody.appendChild(title)
        card.appendChild(cardBody)
        if (page.links) {
          let list = document.createElement("div")
          list.className = "d-grid gap-2 p-2"
          page.links.map(link => {
            if (typeof link === 'string' || link instanceof String) {
              if (link === 'hr') {
                list.appendChild(document.createElement('hr'))
              }
            } else {
              let button
              if (link.protected) {
                button = document.createElement("button")
                button.onclick = () => downloadFile(link.url)
              } else {
                button = document.createElement("a")
                button.href = link.url
              }
              button.className = `btn btn-outline-${link.className ? link.className : "primary"}`
              button.innerText = link.name
              list.appendChild(button)
            }
          })
          card.appendChild(list)
        }
        cardWrapper.appendChild(card)
        collapseRow.appendChild(cardWrapper)
      })
      collapseBody.appendChild(collapseRow)
      collapse.appendChild(collapseBody)
      wrapper.appendChild(collapse)
      accordion.appendChild(wrapper)
    })
  }
});

/*
<div class="accordion-item">
  <h2 class="accordion-header" id="headingGame">
    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseGame" aria-expanded="false" aria-controls="collapseGame">
      ゲーム
    </button>
  </h2>
  <div id="collapseGame" class="accordion-collapse collapse" aria-labelledby="headingGame" data-bs-parent="#accordionMenu">
    <div class="accordion-body">
      <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4">
        <div class="col mb-4">
          <a class="card text-decoration-none" href="games/Doraemon Story of Seasons.html">
            <img src="images/games/Doraemon Story of Seasons.jpg" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title text-body text-decoration-none">Doraemon Story of Seasons</h5>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
*/
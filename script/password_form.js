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
  var input = document.getElementById("password");

  // Execute a function when the user presses a key on the keyboard
  input.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("submit_btn").click();
    }
  });

  // modal code
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
})
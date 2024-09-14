"use strict";

const nameEl = document.getElementById("name");
const emailEl = document.getElementById("email");
const phoneEl = document.getElementById("phone");
const pesanEl = document.getElementById("message");
const kirimEl = document.getElementById("send");
const formEl = document.getElementById("form");
const isSendEl = document.querySelector(".terkirim");
const menuToggleEl = document.getElementById("menu-mini-toggle");
const menuMiniEl = document.getElementById("menu-mini");
const dropToggleEl = document.getElementById("dropdown-toggle");
const dropMiniEl = document.getElementById("dropdown-mini");
const menuLinksEl = document.querySelectorAll("#menu-mini a");
let menuIsToggled = false,
  dropIsToggled = false;

menuLinksEl.forEach((note) => {
  note.addEventListener("click", () => {
    menuMiniEl.classList.add("hidden");
  });
});

menuToggleEl.addEventListener("click", () => {
  menuIsToggled = !menuIsToggled;
  if (menuIsToggled) menuMiniEl.classList.remove("hidden");
  else menuMiniEl.classList.add("hidden");
});

dropToggleEl.addEventListener("click", () => {
  dropIsToggled = !dropIsToggled;
  if (dropIsToggled) dropMiniEl.classList.remove("hidden");
  else dropMiniEl.classList.add("hidden");
});

formEl.addEventListener("submit", async (e) => {
  e.preventDefault();
  const isValid = validateInputs();

  if (isValid) {
    const formData = {
      name: nameEl.value.trim(),
      email: emailEl.value.trim(),
      phone: phoneEl.value.trim(),
      message: pesanEl.value.trim(),
    };
    console.log("Form Data:", formData);

    try {
      kirimEl.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i>  Sending...`;
      kirimEl.disabled = true;
      //   const response = await fetch(
      //     "https://debug.nafkhanzam.com/web-programming-e03",
      //     {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //       body: JSON.stringify(formData),
      //     }
      //     );

      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        isSendEl.innerText = "The form was successfully sent!";
        isSendEl.style.fontSize = "10px";
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      isSendEl.innerText = "Failed to send form. Please try again.";
      isSendEl.style.color = "#ff3860";
      isSendEl.style.fontSize = "10px";
    }
    kirimEl.innerText = "Send";
    kirimEl.disabled = false;
  } else {
    isSendEl.innerText = "";
  }
});

function setError(element, message) {
  const inputControl = element.parentElement;
  const errorMessage = inputControl.querySelector(".error");
  errorMessage.innerText = message;
  inputControl.classList.add("error");
}

function setSuccess(element) {
  const inputControl = element.parentElement;
  const errorMessage = inputControl.querySelector(".error");
  errorMessage.innerText = "";
  inputControl.classList.remove("error");
}

function isValidEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function isValidPhone(phone) {
  const re = /^[0-9]{10,15}$/;
  return re.test(phone);
}

function validateInputs() {
  const username = nameEl.value.trim();
  const email = emailEl.value.trim();
  const phone = phoneEl.value.trim();
  const pesan = pesanEl.value.trim();
  let isValid = true;

  if (!username) {
    setError(nameEl, "Username is required");
    isValid = false;
  } else {
    setSuccess(nameEl);
  }

  if (!email) {
    setError(emailEl, "Email is required");
    isValid = false;
  } else if (!isValidEmail(email)) {
    setError(emailEl, "Provide a valid email address");
    isValid = false;
  } else {
    setSuccess(emailEl);
  }

  if (!phone) {
    setError(phoneEl, "Phone number is required");
    isValid = false;
  } else if (!isValidPhone(phone)) {
    setError(phoneEl, "Provide a valid phone number (10-15 digits)");
    isValid = false;
  } else {
    setSuccess(phoneEl);
  }

  if (!pesan) {
    setError(pesanEl, "Message is required");
    isValid = false;
  } else {
    setSuccess(pesanEl);
  }

  return isValid;
}

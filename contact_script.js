document.addEventListener("DOMContentLoaded", function () {
  const formContainer = document.getElementById("form-container");

  // Load the contact form via AJAX
  const xhrForm = new XMLHttpRequest();
  xhrForm.open("GET", "http://127.0.0.1:5000/contactForm", true);
  xhrForm.onreadystatechange = function () {
    if (xhrForm.readyState === 4 && xhrForm.status === 200) {
      formContainer.innerHTML = xhrForm.responseText;
      formContainer.classList.add("tv-on");

      const form = document.getElementById("contact-form");

      form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = form.elements["name"].value;
        const email = form.elements["email"].value;
        const message = form.elements["message"].value;
        const data = JSON.stringify({ name, email, message });

        // Attach animationend BEFORE triggering animation
        formContainer.addEventListener(
          "animationend",
          function handler() {
            formContainer.removeEventListener("animationend", handler);
            formContainer.style.display = "none";

            // Add the success message AFTER hiding the form
            const successMessage = document.createElement("p");
            successMessage.textContent = "Message sent successfully!";
            successMessage.style.color = "green";
            successMessage.style.fontWeight = "bold";
            successMessage.style.fontSize = "1.2em";
            successMessage.style.textAlign = "center";

            // Append it where the form was
            formContainer.parentElement.appendChild(successMessage);
          },
          { once: true }
        );

        // Trigger the TV-off animation
        formContainer.classList.remove("tv-on");
        formContainer.classList.add("tv-off");

        // Send the AJAX request
        const xhrSend = new XMLHttpRequest();
        xhrSend.open("POST", "http://127.0.0.1:5000/send", true);
        xhrSend.setRequestHeader("Content-Type", "application/json");
        xhrSend.send(data);
      });
    } else if (xhrForm.readyState === 4) {
      formContainer.innerHTML = "<p>Failed to load form.</p>";
      formContainer.classList.remove("tv-on");
    }
  };

  xhrForm.send();
});

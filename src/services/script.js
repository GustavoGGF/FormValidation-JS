document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
});

const fields = document.querySelectorAll("[required]");

function ValidateField(field) {
  function verifyErrors() {
    let foundError = false;

    for (let error in field.validity) {
      if (field.validity[error] && !field.validity.valid) {
        foundError = error;
      }
    }

    return foundError;
  }

  function customMessage(typeError) {
    const messages = {
      text: {
        valueMissing: "Preencha este campo",
      },
      email: {
        valueMissing: "Preencha este campo",
        typeMismatch: "Preencha um email válido",
      },
    };

    return messages[field.type][typeError];
  }

  function setCustomMessage(message) {
    const spanError = field.parentNode.querySelector("span.error");
    if (message) {
      spanError.classList.add("active");
      spanError.innerHTML = message;
    } else {
      spanError.classList.remove("active");
      spanError.innerHTML = "";
    }
  }

  return function () {
    const error = verifyErrors();

    if (error) {
      const message = customMessage(error);
      field.style.borderColor = "red";
      setCustomMessage(message);
    } else {
      field.style.borderColor = "green";
      setCustomMessage();
    }
  };
}

function customValidation(event) {
  event.preventDefault();

  const field = event.target;
  const validation = ValidateField(field);

  validation();
}

for (field of fields) {
  field.addEventListener("invalid", (event) => {
    event.preventDefault();
    customValidation(event);
  });
  field.addEventListener("blur", customValidation);
}

"use client";

const useAlert = (msg = "This is an alert", type = "primary") => {
  let container = document.createElement("div");
  let alertHTML = `
    <div class="alert alert-${type} alert-dismissible fade show mt-3 useAlertAnimation" role="alert">
    ${msg}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;
  container.innerHTML = alertHTML;

  let alertContainer = document.querySelector("#alertContainer");
  if (alertContainer) {
    alertContainer.appendChild(container);
    setTimeout(() => {
      container.remove();
    }, 5000);
  } else {
    setTimeout(() => {
      useAlert(msg);
    }, 500);
  }
};

export default useAlert;

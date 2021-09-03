export default function ToastNotice({ $target, init }) {
  const $toast = document.createElement("div");
  const $toastMessage = document.createElement("h3");
  this.state = init;

  $toast.className = "toast";
  $toastMessage.className = "toast-message";
  $target.appendChild($toast);
  $toast.appendChild($toastMessage);
  $toastMessage.textContent = this.state.text;
  this.render = () => {
    setTimeout(() => {
      $toast.classList.toggle("show");
      setTimeout(() => {
        $toast.classList.toggle("show");
      }, 2000);
    }, 500);
  };
  this.render();
}

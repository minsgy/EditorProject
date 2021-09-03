export default function AddButton({ $target, init }) {
  this.state = init;
  const $addButton = document.createElement("button");
  $target.appendChild($addButton);
  this.render = () => {
    $addButton.textContent = "+";
  };
  $addButton.addEventListener("click", (e) => {
    console.log(e.target);
  });
  this.render();
}

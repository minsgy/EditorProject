export default function EditorTitle({ $target, init }) {
  const $titleContainer = document.createElement("div");
  $target.appendChild($titleContainer);
  this.state = init;
  this.setState = (nextState) => {
    $target.appendChild($titleContainer);
    this.state = nextState;
    this.render();
  };
  this.render = () => {
    $titleContainer.innerHTML = `
      <h1 class="main-page-container__headerTitle">${this.state.title}</h1>
    `;
  };
  this.render();
}

export default function Profile({ $target, init = "" }) {
  const $profileContainer = document.createElement("div");
  const $profileName = document.createElement("h2");

  $profileContainer.className = "profile-container";
  $target.appendChild($profileContainer);

  this.state = init;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  this.render = () => {
    $profileName.textContent = `${this.state.name}의 Notion`;
    $profileContainer.appendChild($profileName);
  };
  this.render();
}

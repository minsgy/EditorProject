export default function Editor({ $target, init, onEdit }) {
  const $editor = document.createElement("div");
  $editor.className = "main-page-container__editor";
  // $editor.innerHTML = `
  //   <input class="main-page-container__titleEditor" type='text' name='title' />
  //   <textarea class="main-page-container__contentEditor" name="content"></pre>
  // `;
  this.state = init;
  $target.appendChild($editor);

  let isInit = false;
  this.appendChild = () => {
    $target.appendChild($editor);
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  this.render = () => {
    if (!isInit) {
      $editor.innerHTML = `
        <input class="main-page-container__titleEditor" type='text' name='title' value="${this.state.title}"></input>
        <textarea class="main-page-container__contentEditor" placeholder="내용을 입력해주세요." name="content">${this.state.content}</textarea>
      `;
      isInit = true;
    }

    $editor.querySelector("[name=title]").value = this.state.title;
    $editor.querySelector("[name=content]").value = this.state.content;
  };

  this.render();

  $editor.addEventListener("keyup", (e) => {
    const { target } = e;
    const name = target.getAttribute("name");
    if (this.state[name] !== undefined) {
      const nextState = {
        ...this.state,
        [name]: target.value,
      };
      this.setState(nextState);
      onEdit(this.state);
    }
  });
}

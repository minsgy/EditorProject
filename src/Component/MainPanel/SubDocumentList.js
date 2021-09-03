export default function SubDocumentList({ $target, init, onClick }) {
  const $subDocumentList = document.createElement("div");
  $subDocumentList.className = "sub-document-list";
  $target.appendChild($subDocumentList);

  console.log(init);
  this.state = init;
  this.setState = (nextState) => {
    $target.appendChild($subDocumentList);
    this.state = nextState;
    this.render();
  };
  this.render = () => {
    $subDocumentList.innerHTML = `
      <ul>
        ${
          this.state.documents.length > 0
            ? this.state.documents
                .map(
                  ({ id, title }) =>
                    `<li class="sub-document-list__item"data-id="${id}">${title} ↵</li>`
                )
                .join("")
            : ""
        }
      <ul>
    `;
  };
  this.render();

  $subDocumentList.addEventListener("click", (e) => {
    const { id } = e.target.dataset;
    if (id) {
      onClick(id);
    }
  });
}

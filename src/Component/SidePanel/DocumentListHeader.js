export default function DocumentListHeader({ $target, text = "", onCreate }) {
  const $header = document.createElement("div");
  $header.className = "document-list-container__header";
  $target.appendChild($header);

  this.render = () => {
    $header.innerHTML = `
      <h2 class="document-list-container__title">${text} 페이지</h2>
      ${
        text === "개인"
          ? `<button class="document-item__button rootAddDocument">+</button>`
          : ""
      }
    `;
  };
  this.render();

  $header.addEventListener("click", (e) => {
    const { className } = e.target;
    console.log(className);
    if (className === "document-item__button rootAddDocument") {
      onCreate();
    } else if (className === "document-list-container__title") {
      if (text === "개인") {
        const $root_ul = $target.querySelector(".document");
        console.log($root_ul);
        $root_ul.classList.toggle("fold");
      } else if (text === "즐겨찾기") {
        const $bookmark_ul = $target.querySelector(".bookmark");
        $bookmark_ul.classList.toggle("fold");
      }
    }
  });
}

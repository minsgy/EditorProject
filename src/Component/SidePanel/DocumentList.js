export default function DocumentList({
  $target,
  init = [],
  type = "basic",
  onSelect = () => {},
  onCreate = () => {},
  onRemove = () => {},
  onBookmark = () => {},
  unBookmark = () => {},
}) {
  const $documentList = document.createElement("div");
  $documentList.className = "document-list-container";
  $target.appendChild($documentList);

  const toggleButtonEvent = ($buttonList) => {
    $buttonList.forEach((button) => button.classList.toggle("fold"));
  };

  const functionButtonList = () => {
    if (type === "basic") {
      return `<button class="document-item__button add fold">+</button>
      <button class="document-item__button remove fold">-</button>
      <button class="document-item__button bookmark fold">⭐️</button>`;
    } else if (type === "bookmark") {
      return `<button class="document-item__button unbookmark fold">☆</button>`;
    }
  };

  // 재귀를 활용한 노션 리스트
  const renderDocuments = (parentsDocuments) => {
    return parentsDocuments
      .map(
        ({ id, title, documents }) =>
          `<li class='document-item' data-id="${id}">
          <button class="document-folder">►</button>
          ${title}
          ${functionButtonList()}
          ${
            documents.length > 0
              ? `<ul class='sub-document fold'>${renderDocuments(
                  documents
                )}</ul>`
              : `<ul class='sub-document fold'>
                  <li class="document-item sub-document__none-guide">하위 문서가 없습니다.</li>
                </ul> `
          }
          </li>
      `
      )
      .join("");
  };

  this.state = init;
  this.setState = (nextState) => {
    this.state = nextState;
    console.log("documentlist : ", this.state);
    this.render();
  };
  this.render = () => {
    $documentList.innerHTML = `
        <ul class="${type === "basic" ? "root document" : "root bookmark"}">
        ${this.state.length > 0 ? renderDocuments(this.state) : ""}
        </ul>
      `;
  };

  // mouse over 및 out 시 문서 추가버튼 구현
  $documentList.addEventListener("mouseover", (e) => {
    e.target.style.background = "#EFEFEF";
    const $li = e.target.closest(".document-item");
    const $Buttonlists = $li.querySelectorAll(".document-item__button");
    if ($Buttonlists) {
      toggleButtonEvent($Buttonlists);
    }
  });
  $documentList.addEventListener("mouseout", (e) => {
    e.target.style.background = "#F7F6F3";
    const $li = e.target.closest(".document-item");
    const $Buttonlists = $li.querySelectorAll(".document-item__button");
    if ($Buttonlists) {
      toggleButtonEvent($Buttonlists);
    }
  });

  $documentList.addEventListener("click", async (e) => {
    const $li = e.target.closest(".document-item");
    const { id } = $li.dataset;
    const { className } = e.target;
    console.log(className);
    if (className === "document-item") {
      onSelect(id);
    } else if (className.includes("add")) {
      onCreate(id);
    } else if (className.includes("folder")) {
      const $ul = $li.querySelector(".sub-document");
      if ($ul) {
        e.target.style.transform = $ul.classList.contains("fold")
          ? "rotate(90deg)"
          : "";
        $ul.classList.toggle("fold");
      }
    } else if (className.includes("remove")) {
      onRemove(id);
    } else if (className.includes("unbookmark")) {
      unBookmark(id);
    } else if (className.includes("bookmark")) {
      onBookmark(id);
    } else if (className.includes("unbookmark")) {
      unBookmark(id);
    }
  });

  this.render();
}

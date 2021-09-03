import Editor from "./Editor.js";
import { request } from "../api.js";
import { push } from "../router.js";
import SubDocumentList from "./SubDocumentList.js";
export default function Modal({ $target, init }) {
  const $modalPage = document.createElement("div");
  const $modalBody = document.createElement("div");
  $modalPage.className = "modal";
  $modalBody.className = "modal_body";

  this.state = init;
  this.setState = (nextState) => {
    this.state = nextState;
    editor.setState(this.state);
    editor.appendChild();
    subDocumentList.setState(this.state);
    $target.appendChild($modalPage);
    $modalPage.appendChild($modalBody);
    $modalPage.classList.toggle("show");
  };

  let timer = null;

  const editor = new Editor({
    $target: $modalBody,
    init: {
      title: "",
      content: "",
    },
    onEdit: async (selectState) => {
      if (selectState.title.length > 20) {
        alert(
          "제목이 20자 이상을 초과하여, 초과 내용은 자동 삭제후 저장됩니다."
        );
        selectState.title = selectState.title.slice(0, 20);
      }
      if (timer !== null) {
        clearTimeout(timer);
      }
      // 자동 저장구현
      timer = setTimeout(async () => {
        await request(`/documents/${selectState.id}`, {
          method: "PUT",
          body: JSON.stringify({
            title: selectState.title,
            content: selectState.content,
          }),
        });
        console.log(`저장완료! ${selectState.id}`);
        push(`/documents/${selectState.id}`);
      }, 2000);
    },
  });

  const subDocumentList = new SubDocumentList({
    $target: $modalBody,
    init: this.state,
    onClick: (selectDocumentId) => {
      push(`/documents/${selectDocumentId}`);
    },
  });
  this.render = () => {};

  $modalPage.addEventListener("click", (e) => {
    const { className } = e.target;
    if (className.includes("show")) {
      $modalPage.classList.toggle("show");
    }
  });
}

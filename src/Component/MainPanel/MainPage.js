import { request } from "../api.js";
import { push } from "../router.js";
import ToastNotice from "./ToastNotice.js";
import Editor from "./Editor.js";
import GuidePage from "./GuidePage.js";
import Modal from "./Modal.js";
import SubDocumentList from "./SubDocumentList.js";

export default function MainPage({ $target }) {
  const $mainPageContainer = document.createElement("div");
  $mainPageContainer.className = "main-page-container";
  $target.appendChild($mainPageContainer);

  this.state = {
    id: null,
    title: "",
    content: "",
    documents: [],
  };
  const toastNotice = new ToastNotice({
    $target: $mainPageContainer,
    init: { text: "저장완료" },
  });
  const guidePage = new GuidePage({ $target: $mainPageContainer });
  const modalPage = new Modal({
    $target: $mainPageContainer,
    init: this.state,
  });

  this.setState = async (nextState = null) => {
    if (nextState === null) {
      guidePage.render();
    } else if (this.state.id !== nextState.id) {
      guidePage.remove();
      const contentList = await request(`/documents/${nextState.id}`);
      this.state = contentList;
      console.log(nextState);
      if (nextState.type === "create") {
        modalPage.setState(this.state);
      }
      editor.setState(this.state);
      editor.appendChild();
      subDocumentList.setState(this.state);
    }
  };

  let timer = null;

  const editor = new Editor({
    $target: $mainPageContainer,
    init: {
      title: "",
      content: "",
    },
    onEdit: async (selectState) => {
      if (selectState.title.length > 13) {
        alert(
          "제목이 13자 이상을 초과하여, 초과 내용은 자동 삭제후 저장됩니다."
        );
        selectState.title = selectState.title.slice(0, 14);
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
        toastNotice.render();
      }, 2000);
    },
  });

  const subDocumentList = new SubDocumentList({
    $target: $mainPageContainer,
    init: this.state,
    onClick: (selectDocumentId) => {
      push(`/documents/${selectDocumentId}`);
    },
  });
}

import { request } from "../api.js";
import { push } from "../router.js";
import { getItem, setItem } from "../storage.js";
import DocumentList from "./DocumentList.js";
import DocumentListHeader from "./DocumentListHeader.js";
import Profile from "./Profile.js";

const BOOK_MARK_LIST_KEY = "bookmark-list";

export default function SidePage({ $target }) {
  const $page = document.createElement("div");
  $page.className = "side-page-container";
  $target.appendChild($page);

  this.state = [];
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  new Profile({
    $target: $page,
    init: {
      name: "minsgy",
    },
  });

  new DocumentListHeader({
    $target: $page,
    text: "즐겨찾기",
    onCreate: async () => {
      const response = await request(`/documents`, {
        method: "POST",
        body: JSON.stringify({
          title: "새로운 문서",
          parent: null,
        }),
      });
      push(`/documents/${response.id}`);
      this.render();
    },
  });

  const bookmarkList = new DocumentList({
    $target: $page,
    init: getItem(BOOK_MARK_LIST_KEY, []),
    type: "bookmark",
    onSelect: async (documentId) => {
      push(`/documents/${documentId}`);
    },
    unBookmark: (documentId) => {
      const nextState = bookmarkList.state;
      const selectDocumentIndex = nextState.findIndex(
        (document) => document.id === parseInt(documentId)
      );
      nextState.splice(selectDocumentIndex, 1);
      setItem(BOOK_MARK_LIST_KEY, nextState);
      this.render();
    },
  });

  new DocumentListHeader({
    $target: $page,
    text: "개인",
    onCreate: async () => {
      const response = await request(`/documents`, {
        method: "POST",
        body: JSON.stringify({
          title: "새로운 문서",
          parent: null,
        }),
      });
      push(`/documents/${response.id}`);
      this.render();
    },
  });

  const documentList = new DocumentList({
    $target: $page,
    init: [],
    onSelect: async (documentId) => {
      push(`/documents/${documentId}`);
    },
    onCreate: async (documentId) => {
      const response = await request(`/documents`, {
        method: "POST",
        body: JSON.stringify({
          title: `새로운 문서`,
          parent: documentId,
        }),
      });
      push(`/documents/${response.id}`, "create");
      this.render();
    },
    onRemove: async (documentId) => {
      if (confirm("정말로 삭제하시겠습니까 ?")) {
        await request(`/documents/${documentId}`, {
          method: "DELETE",
        });
        push(`/`);
        this.render();
      }
      return;
    },
    onBookmark: async (documentId) => {
      const response = await request(`/documents/${documentId}`);
      const nextState = [...bookmarkList.state, response];
      console.log(nextState);
      setItem(BOOK_MARK_LIST_KEY, nextState);
      bookmarkList.setState(nextState);
      this.render();
    },
  });

  function pureDocumentProduce(bookmarkDocument, document) {
    const bookmarkidList = bookmarkDocument.map((item1) => item1.id);
    const documentidList = document.map((item) => item.id);

    const pureDocumentListId = documentidList.filter(
      (x) => !bookmarkidList.includes(x)
    );
    const pureDocumentList = document.filter((item) =>
      pureDocumentListId.includes(item.id)
    );
    return pureDocumentList;
  }

  this.render = async () => {
    const documents = await request("/documents");
    bookmarkList.render();
    // bookmark를 제외한 받아온 문서 리스트
    const BookmarkFilterDocument = pureDocumentProduce(
      bookmarkList.state,
      documents
    );
    documentList.setState(BookmarkFilterDocument);
  };
  this.render();
}

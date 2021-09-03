export default function GuidePage({ $target }) {
  const $GuidePage = document.createElement("div");
  $GuidePage.className = "guide-page-container";
  $GuidePage.innerHTML = `
    <h2 class="guide-page-container__Header">Notion에 오신걸 환영합니다!</h2>
    <img class="guide-page-container__InfoImg" src="../../../images/templates.png"></img>
  `;
  this.render = () => {
    $target.innerHTML = ``;
    $target.appendChild($GuidePage);
  };
  this.remove = () => {
    $GuidePage.remove();
  };
}

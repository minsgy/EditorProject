import { initRouter } from "./router.js";
import MainPage from "./MainPanel/MainPage.js";
import SidePage from "./SidePanel/SidePage.js";
import GuidePage from "./MainPanel/GuidePage.js";
export default function App({ $target }) {
  const sidePage = new SidePage({ $target });
  const mainPage = new MainPage({ $target });
  this.route = (type = "") => {
    const { pathname } = location;
    console.log(location);
    if (pathname === "/") {
      mainPage.setState();
    } else if (pathname.indexOf("/documents/") === 0) {
      const [, , documentId] = pathname.split("/");
      // sidePage.render();
      mainPage.setState({ id: documentId, type });
    }
  };

  this.route();
  initRouter((type) => this.route(type));
}

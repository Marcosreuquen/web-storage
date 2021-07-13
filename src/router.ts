import { rootPage } from "./pages/page";
import { State } from "./state";

const routes = [
  {
    path: /\//,
    component: rootPage,
  },
];

export function initRouter(container: Element) {
  function goTo(path) {
    console.log("go to: ", path);
    history.pushState({}, "", path);
    handleRoute(path);
  }

  function handleRoute(route: any) {
    console.log(`handleRoute - nueva ruta: ${route}`);

    for (const r of routes) {
      if (r.path.test(route)) {
        const el = r.component({ goTo: goTo, lastState: State.getState() });

        if (container.firstChild) {
          container.firstChild.remove();
        }

        container.appendChild(el);
      }
    }
  }

  if (location.pathname == "/") {
    goTo("/");
  } else {
    handleRoute(location.pathname);
  }
  window.onpopstate = function (event) {
    handleRoute(location.pathname);
  };
}

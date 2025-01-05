export default class Router {
    constructor(routes, appContainerId, cssLoader, cssMapping) {
        this.routes = routes;
        this.cssLoader = cssLoader;
        this.cssMapping = cssMapping;

        this.appContainer = document.getElementById(appContainerId);
        this.mainContainer = document.createElement("main");
        this.mainContainer.id = "main-content";
        this.appContainer.appendChild(this.mainContainer);

        document.addEventListener("DOMContentLoaded", () => {
            this.routeHandler(window.location.pathname + window.location.search);
        });

        document.addEventListener("click", (event) => {
            const link = event.target.closest("a[data-route]");
            if (link) {
                event.preventDefault();
                const targetPath = link.getAttribute("href");
                this.navigateTo(targetPath);
            }
        });

        window.addEventListener("popstate", () => {
            this.routeHandler(window.location.pathname + window.location.search);
        });
    }

    navigateTo(path) {
        if (path !== window.location.pathname + window.location.search) {
            window.history.pushState({}, "", path);
            this.routeHandler(path);
        }
    }

    routeHandler(fullPath) {
        const [basePath, queryString] = fullPath.split("?");
        const route = this.routes[basePath] || this.routes["/"];

        if (route) {
            this.mainContainer.style.opacity = 0;

            setTimeout(() => {
                const pageContent = route.render ? route.render() : "";

                this.mainContainer.innerHTML = pageContent;
                this.cssLoader.load(this.cssMapping[basePath]);

                if (route.init) {
                    const queryParams = new URLSearchParams(queryString);
                    route.init(queryParams);
                }

                if (route.title) {
                    document.title = route.title;
                }

                this.mainContainer.style.opacity = 1;
            }, 100);
        } else {
            this.mainContainer.innerHTML = `<h1>404 - Page Not Found</h1>`;
            document.title = "404 - Page Not Found";
        }
    }
}

export default class CssLoader {
    load(file) {
        if (!file) return;

        try {
            const existingLink = document.querySelector(`link[data-route-css]`);
            if (existingLink) {
                existingLink.href = `/CSS/${file}`;
            } else {
                const newLink = document.createElement("link");
                newLink.rel = "stylesheet";
                newLink.href = `/CSS/${file}`;
                newLink.setAttribute("data-route-css", "true");
                document.head.appendChild(newLink);
            }
        } catch (error) {
            console.error(`Failed to load CSS file: /CSS/${file}`, error);
        }
    }

    preload(files) {
        files.forEach((file) => {
            const link = document.createElement("link");
            link.rel = "preload";
            link.as = "style";
            link.href = `css/${file}`;
            document.head.appendChild(link);
        });
    }
}

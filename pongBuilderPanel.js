class PongBuilderPanel extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<p>No builder configuration</p>`;
    }
}

customElements.define("com-example-pong-builder", PongBuilderPanel);

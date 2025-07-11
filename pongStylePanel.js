class PongStylePanel extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<p>No styles available for configuration</p>`;
    }
}

customElements.define("com-example-pong-style", PongStylePanel);


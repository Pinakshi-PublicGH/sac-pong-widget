(function () {
    let builderPanel = function () {};
    builderPanel.prototype = {
        render: function (widget) {
            return `<p>No builder configuration</p>`;
        },
    };
    return builderPanel;
})();

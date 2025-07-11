(function () {
    let stylePanel = function () {};
    stylePanel.prototype = {
        render: function (widget) {
            return `<p>No styles available for configuration</p>`;
        },
    };
    return stylePanel;
})();

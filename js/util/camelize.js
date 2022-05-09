const camelize = function(str) {
    if (!str || !(str instanceof String)) {
        return;
    }

    return str.toLowerCase().replace(/[^a-zA-Z0-9]+([.-])/g, (m, chr) => chr.toUpperCase());
};

export default camelize;

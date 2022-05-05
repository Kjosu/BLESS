const debounce = function(f, threshold) {
    let timeoutId;

    return function(...params) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            timeoutId = undefined;
            f(...params);
        }, threshold);
    };
};

export default debounce;

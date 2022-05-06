const debounce = function(f, threshold, callback, context) {
    let timeoutId;

    return function(...params) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            timeoutId = undefined;
            const result = f.apply(context, params);

            if (result && callback) {
                callback(result);
            }
        }, threshold);
    };
};

export default debounce;

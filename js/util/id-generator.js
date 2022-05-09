const createGenerator = function(pattern = '{id}') {
    let lastId = 0;

    return function() {
        return pattern.replaceAll('{id}', `${lastId++}`);
    };
};

export default createGenerator;

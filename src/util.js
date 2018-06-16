module.exports = {
    concat: function (xs, ys) {
        const result = [];
        for(var i = 0; i < xs.length; i++) {
            result.push(xs[i]);
        }

        for(var j = 0; j < xs.length; j++) {
            result.push(ys[j]);
        }

        return result;
    }
}
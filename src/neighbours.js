function AliveNeighbours() {
    var list = [];

    this.add = function (cell) {
        cell.addToAliveNeighbours(list);
        return this;
    };
    this.addCollection = function (neighbours) {
        neighbours.forEach(function (cell) {
            cell.addToAliveNeighbours(list);
        });
        return this;
    };
    this.count = function () {
        return list.length;
    };
    this.forEach = function(f) {
        list.forEach(f);  
    };
}
function NoneNeighbours() {
    this.add = function() {};
    this.addCollection = function() {};
    this.count = function() { return 0; };
    this.forEach = function(f) {
        [].forEach(f);
    };
}
//TODO: remove this.count? (getter right?)
function World(size) {
    var grid = new Grid(size);
    var rules = new Rules();

    this.print = function (buffer) {
        grid.print(buffer);
    };
    this.iterate = function () {
        grid.iterate(rules);
    };
}

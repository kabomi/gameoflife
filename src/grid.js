function Grid(size) {
    var grid = [];


    function initialize() {
        generateGridRows();
        grid.forEach(function (gridRow, i) {
            gridRow.belongsTo(grid, i);
        });
    }

    function generateGridRows() {
        for (var i = 0; i < size; i++) {
            grid[i] = new GridRow(size);
        }
    }

    this.print = function (buffer) {
        grid.forEach(function(gridRow){
            gridRow.print(buffer);
            buffer.append("\n");
        });
    };
    this.calculateAliveNeighbours = function (row, column) {
        return grid[column].calculateAliveNeighbours(row);
    };
    this.iterate = function (rules) {
        grid.forEach(function (gridRow) {
            gridRow.applyRules(rules);
        });
        grid.forEach(function (gridRow) {
            gridRow.iterate();
        });
    };

    initialize();
}
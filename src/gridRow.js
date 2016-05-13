function GridRow(size) {
    var row = [];
    var previousRow;
    var nextRow;

    function generateRandomCell(row) {
        for (var i = 0; i < size; i++) {
            row[i] = (Math.random() > 0.5 ? new AliveCell() : new DeadCell());
        }
    }
    function initialize() {
        generateRandomCell(row);
        row.forEach(function(cell, cellIndex){
            cell.belongsTo(row, cellIndex);
        });
    }
    this.belongsTo = function (grid, rowIndex) {
        previousRow = grid[rowIndex - 1] || new NoneGridRow();
        nextRow = grid[rowIndex + 1] || new NoneGridRow();
    };
    this.print = function (buffer) {
        row.forEach(function (cell) {
            cell.print(buffer);
        });
    };
    this.calculateAliveNeighbours = function (cellIndex) {
        var otherRowsAliveNeighbours = new AliveNeighbours()
            .addCollection(previousRow.calculateAliveNeighboursInColumn(cellIndex))
            .addCollection(nextRow.calculateAliveNeighboursInColumn(cellIndex));

        return row[cellIndex].calculateAliveNeighbours(otherRowsAliveNeighbours);
    };
    this.calculateAliveNeighboursInColumn = function (cellIndex) {
        return new AliveNeighbours().add(row[cellIndex])
                    .addCollection(row[cellIndex].calculateAliveNeighbours());
    };

    this.applyRules = function (rules) {
        row.forEach(function (cell, cellIndex) {
            var neighbours = this.calculateAliveNeighbours(cellIndex);
            cell.applyRules(rules, neighbours.count());
        }, this);
    };
    this.iterate = function () {
        for (var i = 0; i < size; i++) {
            row[i] =  row[i].iterate();
        }
        row.forEach(function (cell, cellIndex) {
            cell.belongsTo(row, cellIndex);
        });
    };

    initialize();
}
function NoneGridRow() {
    this.calculateAliveNeighboursInColumn = function () { return new NoneNeighbours();}
}
//TODO: What about a GridCell? NeighbourRows?
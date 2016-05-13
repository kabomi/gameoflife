function Cell() {
    var previousCell;
    var nextCell;
    var nextState;

    this.calculateAliveNeighbours = function (otherNeighbours) {
        var neighbours = new AliveNeighbours();
        neighbours.addCollection(otherNeighbours || new NoneNeighbours());
        neighbours.add(previousCell);
        neighbours.add(nextCell);

        return neighbours;
    };

    this.belongsTo = function (gridRow, columnIndex) {
        previousCell = gridRow[columnIndex - 1] || new NoneCell();
        nextCell = gridRow[columnIndex + 1] || new NoneCell();
    };

    this.applyRules = function (rules, aliveNeighbours) {
        nextState = rules.check(aliveNeighbours, this instanceof AliveCell);
    };
    this.iterate = function () {
        return nextState;
    };
}
function AliveCell() {
    Cell.call(this);

    this.print = function (buffer) {
        buffer.append('X');
    };
    this.addToAliveNeighbours = function (list) {
        list.push(this);
    };
}
function DeadCell() {
    Cell.call(this);

    this.print = function (buffer) {
        buffer.append(' ');
    };
    this.addToAliveNeighbours = function (list) {};
}
function NoneCell() {
    this.addToAliveNeighbours = function (list) {};
}
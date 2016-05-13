function UnderpopulationRule() {
    Rule.call(this, arguments);
    this.check = function(numberOfAliveNeighbours){
        return (numberOfAliveNeighbours < 2 );
    };
}
function OverpopulationRule() {
    Rule.call(this, arguments);
    this.check = function(numberOfAliveNeighbours){
        return (numberOfAliveNeighbours > 3 );
    };
}
function ResurrectionRule() {
    Rule.call(this, arguments);
    this.check = function(numberOfAliveNeighbours){
        return (numberOfAliveNeighbours === 3);
    };
    this.execute = function () {
        return new AliveCell();
    };
}
function SurvivalRule() {
    Rule.call(this, arguments);
    this.check = function(numberOfAliveNeighbours) {
        return (numberOfAliveNeighbours === 2);
    };
    this.execute = function (aliveCell) {
        return aliveCell ? new AliveCell() : new DeadCell();
    };
}
function Rule(){
    this.check = function(numberOfAliveNeighbours) { return false; };
    this.execute = function (aliveCell) {
        return new DeadCell();
    };
}
function Rules() {
    var rules = [];
    this.initialize = function () {
        rules.push(new UnderpopulationRule());
        rules.push(new OverpopulationRule());
        rules.push(new ResurrectionRule());
        rules.push(new SurvivalRule());
    };
    this.check = function (numberOfAliveNeighbours, aliveCell) {
        var applyingRules = rules.filter(function (rule) {
            return rule.check(numberOfAliveNeighbours);
        });

        return applyingRules[0].execute(aliveCell);
    };
    this.initialize();
}

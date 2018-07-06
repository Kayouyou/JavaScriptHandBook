function Kayou() {
    var feints = 0;
    this.getFeints = function () {
        return feints;
    };
    this.feints = function () {
        feints ++;
    }
}

var kayou1 = new Kayou();
kayou1.feints();
console.log(kayou1.getFeints())


var Ka = {};
Ka.getFeints = kayou1.getFeints

console.log(Ka.getFeints() === 1);


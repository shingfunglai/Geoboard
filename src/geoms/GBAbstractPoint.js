function GBAbstractPoint() {
  LabeledGeom.apply(this, arguments);
}

GBAbstractPoint.prototype = new LabeledGeom();
GBAbstractPoint.prototype.isPoint = true;
GBAbstractPoint.prototype.color = '#F00';
GBAbstractPoint.prototype.draw = function(context) {
  var pos = this.getPosition();
  if (!isNaN(pos[0]) && !isNaN(pos[0])) {
    context.beginPath();
    context.arc(pos[0], pos[1], context.transP2M(3), 0, Math.PI * 2, false);
    context.closePath();
    context.fillStyle = this.color;
    context.fill();
    context.lineWidth = context.transP2M(1);
    context.strokeStyle = "#000";
    context.stroke();
  }
};

GBAbstractPoint.prototype.drawSelected = function(context) {
  var pos = this.getPosition();
  if (!isNaN(pos[0]) && !isNaN(pos[0])) {
    this.draw(context);
    context.beginPath();
    context.arc(pos[0], pos[1], context.transP2M(6), 0, Math.PI * 2, false);
    context.closePath();
    context.lineWidth = context.transP2M(1);
    context.strokeStyle = "#339";
    context.stroke();
  }

};

GBAbstractPoint.prototype.drawHovering = function(context) {
  var pos = this.getPosition();
  if (!isNaN(pos[0]) && !isNaN(pos[0])) {
    context.beginPath();
    context.arc(pos[0], pos[1], context.transP2M(3), 0, Math.PI * 2, false);
    context.closePath();
    context.fillStyle = this.color;
    context.fill();
    context.lineWidth = context.transP2M(1);
    context.strokeStyle = "#F00";
    context.stroke();
  }
};

GBAbstractPoint.prototype.hitTest = function(x, y, radius) {
  var pos = this.getPosition(), 
      dx = pos[0] - x, 
      dy = pos[1] - y;
  return dx * dx + dy * dy < radius * radius;
};

GBAbstractPoint.prototype.crossTest = function(l, t, r, b) {
  var pos = this.getPosition();
  return l < pos[0] && pos[0] < r && t < pos[1] && pos[1] < b;
};

GBAbstractPoint.prototype.nearestArg = function(x, y) {
  return 0;
};

GBAbstractPoint.prototype.legalArg = function(arg) {
  return arg == 0;
};

GBAbstractPoint.prototype.update = function () {
  if(this.__dirty) {
    this.cache = this.getPosition();
    Geom.prototype.update.apply(this, []);
  }
};

GBAbstractPoint.prototype.getInstructionRefStatic = function () {
  this.update();
  var pos = this.getPosition();
  return '[' + pos[0] + ',' + pos[1] + ']';
};
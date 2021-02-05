var mypathseg = function () {
  "use strict";
  return {
    initPathSeg: function () {
      if (!("SVGPathSeg" in window)) {
        // Spec: http://www.w3.org/TR/SVG11/single-page.html#paths-InterfaceSVGPathSeg
        window.SVGPathSeg = function(type, typeAsLetter, owningPathSegList) {
          this.pathSegType = type;
          this.pathSegTypeAsLetter = typeAsLetter;
          this._owningPathSegList = owningPathSegList;
        }

        window.SVGPathSeg.prototype.classname = "SVGPathSeg";

        window.SVGPathSeg.PATHSEG_UNKNOWN = 0;
        window.SVGPathSeg.PATHSEG_CLOSEPATH = 1;
        window.SVGPathSeg.PATHSEG_MOVETO_ABS = 2;
        window.SVGPathSeg.PATHSEG_MOVETO_REL = 3;
        window.SVGPathSeg.PATHSEG_LINETO_ABS = 4;
        window.SVGPathSeg.PATHSEG_LINETO_REL = 5;
        window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS = 6;
        window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL = 7;
        window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS = 8;
        window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL = 9;
        window.SVGPathSeg.PATHSEG_ARC_ABS = 10;
        window.SVGPathSeg.PATHSEG_ARC_REL = 11;
        window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS = 12;
        window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL = 13;
        window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS = 14;
        window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL = 15;
        window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS = 16;
        window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL = 17;
        window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS = 18;
        window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL = 19;

        // Notify owning PathSegList on any changes so they can be synchronized back to the path element.
        window.SVGPathSeg.prototype._segmentChanged = function() {
          if (this._owningPathSegList)
            this._owningPathSegList.segmentChanged(this);
        }

        window.SVGPathSegClosePath = function(owningPathSegList) {
          window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CLOSEPATH, "z", owningPathSegList);
        }
        window.SVGPathSegClosePath.prototype = Object.create(window.SVGPathSeg.prototype);
        window.SVGPathSegClosePath.prototype.toString = function() { return "[object SVGPathSegClosePath]"; }
        window.SVGPathSegClosePath.prototype._asPathString = function() { return this.pathSegTypeAsLetter; }
        window.SVGPathSegClosePath.prototype.clone = function() { return new window.SVGPathSegClosePath(undefined); }

        window.SVGPathSegMovetoAbs = function(owningPathSegList, x, y) {
          window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_MOVETO_ABS, "M", owningPathSegList);
          this._x = x;
          this._y = y;
        }
        window.SVGPathSegMovetoAbs.prototype = Object.create(window.SVGPathSeg.prototype);
        window.SVGPathSegMovetoAbs.prototype.toString = function() { return "[object SVGPathSegMovetoAbs]"; }
        window.SVGPathSegMovetoAbs.prototype._asPathString = function() { return this.pathSegTypeAsLetter + " " + this._x + " " + this._y; }
        window.SVGPathSegMovetoAbs.prototype.clone = function() { return new window.SVGPathSegMovetoAbs(undefined, this._x, this._y); }
        Object.defineProperty(window.SVGPathSegMovetoAbs.prototype, "x", { get: function() { return this._x; }, set: function(x) { this._x = x; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegMovetoAbs.prototype, "y", { get: function() { return this._y; }, set: function(y) { this._y = y; this._segmentChanged(); }, enumerable: true });

        window.SVGPathSegMovetoRel = function(owningPathSegList, x, y) {
          window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_MOVETO_REL, "m", owningPathSegList);
          this._x = x;
          this._y = y;
        }
        window.SVGPathSegMovetoRel.prototype = Object.create(window.SVGPathSeg.prototype);
        window.SVGPathSegMovetoRel.prototype.toString = function() { return "[object SVGPathSegMovetoRel]"; }
        window.SVGPathSegMovetoRel.prototype._asPathString = function() { return this.pathSegTypeAsLetter + " " + this._x + " " + this._y; }
        window.SVGPathSegMovetoRel.prototype.clone = function() { return new window.SVGPathSegMovetoRel(undefined, this._x, this._y); }
        Object.defineProperty(window.SVGPathSegMovetoRel.prototype, "x", { get: function() { return this._x; }, set: function(x) { this._x = x; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegMovetoRel.prototype, "y", { get: function() { return this._y; }, set: function(y) { this._y = y; this._segmentChanged(); }, enumerable: true });

        window.SVGPathSegLinetoAbs = function(owningPathSegList, x, y) {
          window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_LINETO_ABS, "L", owningPathSegList);
          this._x = x;
          this._y = y;
        }
        window.SVGPathSegLinetoAbs.prototype = Object.create(window.SVGPathSeg.prototype);
        window.SVGPathSegLinetoAbs.prototype.toString = function() { return "[object SVGPathSegLinetoAbs]"; }
        window.SVGPathSegLinetoAbs.prototype._asPathString = function() { return this.pathSegTypeAsLetter + " " + this._x + " " + this._y; }
        window.SVGPathSegLinetoAbs.prototype.clone = function() { return new window.SVGPathSegLinetoAbs(undefined, this._x, this._y); }
        Object.defineProperty(window.SVGPathSegLinetoAbs.prototype, "x", { get: function() { return this._x; }, set: function(x) { this._x = x; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegLinetoAbs.prototype, "y", { get: function() { return this._y; }, set: function(y) { this._y = y; this._segmentChanged(); }, enumerable: true });

        window.SVGPathSegLinetoRel = function(owningPathSegList, x, y) {
          window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_LINETO_REL, "l", owningPathSegList);
          this._x = x;
          this._y = y;
        }
        window.SVGPathSegLinetoRel.prototype = Object.create(window.SVGPathSeg.prototype);
        window.SVGPathSegLinetoRel.prototype.toString = function() { return "[object SVGPathSegLinetoRel]"; }
        window.SVGPathSegLinetoRel.prototype._asPathString = function() { return this.pathSegTypeAsLetter + " " + this._x + " " + this._y; }
        window.SVGPathSegLinetoRel.prototype.clone = function() { return new window.SVGPathSegLinetoRel(undefined, this._x, this._y); }
        Object.defineProperty(window.SVGPathSegLinetoRel.prototype, "x", { get: function() { return this._x; }, set: function(x) { this._x = x; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegLinetoRel.prototype, "y", { get: function() { return this._y; }, set: function(y) { this._y = y; this._segmentChanged(); }, enumerable: true });

        window.SVGPathSegCurvetoCubicAbs = function(owningPathSegList, x, y, x1, y1, x2, y2) {
          window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS, "C", owningPathSegList);
          this._x = x;
          this._y = y;
          this._x1 = x1;
          this._y1 = y1;
          this._x2 = x2;
          this._y2 = y2;
        }
        window.SVGPathSegCurvetoCubicAbs.prototype = Object.create(window.SVGPathSeg.prototype);
        window.SVGPathSegCurvetoCubicAbs.prototype.toString = function() { return "[object SVGPathSegCurvetoCubicAbs]"; }
        window.SVGPathSegCurvetoCubicAbs.prototype._asPathString = function() { return this.pathSegTypeAsLetter + " " + this._x1 + " " + this._y1 + " " + this._x2 + " " + this._y2 + " " + this._x + " " + this._y; }
        window.SVGPathSegCurvetoCubicAbs.prototype.clone = function() { return new window.SVGPathSegCurvetoCubicAbs(undefined, this._x, this._y, this._x1, this._y1, this._x2, this._y2); }
        Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype, "x", { get: function() { return this._x; }, set: function(x) { this._x = x; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype, "y", { get: function() { return this._y; }, set: function(y) { this._y = y; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype, "x1", { get: function() { return this._x1; }, set: function(x1) { this._x1 = x1; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype, "y1", { get: function() { return this._y1; }, set: function(y1) { this._y1 = y1; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype, "x2", { get: function() { return this._x2; }, set: function(x2) { this._x2 = x2; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype, "y2", { get: function() { return this._y2; }, set: function(y2) { this._y2 = y2; this._segmentChanged(); }, enumerable: true });

        window.SVGPathSegCurvetoCubicRel = function(owningPathSegList, x, y, x1, y1, x2, y2) {
          window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL, "c", owningPathSegList);
          this._x = x;
          this._y = y;
          this._x1 = x1;
          this._y1 = y1;
          this._x2 = x2;
          this._y2 = y2;
        }
        window.SVGPathSegCurvetoCubicRel.prototype = Object.create(window.SVGPathSeg.prototype);
        window.SVGPathSegCurvetoCubicRel.prototype.toString = function() { return "[object SVGPathSegCurvetoCubicRel]"; }
        window.SVGPathSegCurvetoCubicRel.prototype._asPathString = function() { return this.pathSegTypeAsLetter + " " + this._x1 + " " + this._y1 + " " + this._x2 + " " + this._y2 + " " + this._x + " " + this._y; }
        window.SVGPathSegCurvetoCubicRel.prototype.clone = function() { return new window.SVGPathSegCurvetoCubicRel(undefined, this._x, this._y, this._x1, this._y1, this._x2, this._y2); }
        Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype, "x", { get: function() { return this._x; }, set: function(x) { this._x = x; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype, "y", { get: function() { return this._y; }, set: function(y) { this._y = y; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype, "x1", { get: function() { return this._x1; }, set: function(x1) { this._x1 = x1; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype, "y1", { get: function() { return this._y1; }, set: function(y1) { this._y1 = y1; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype, "x2", { get: function() { return this._x2; }, set: function(x2) { this._x2 = x2; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype, "y2", { get: function() { return this._y2; }, set: function(y2) { this._y2 = y2; this._segmentChanged(); }, enumerable: true });

        window.SVGPathSegCurvetoQuadraticAbs = function(owningPathSegList, x, y, x1, y1) {
          window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS, "Q", owningPathSegList);
          this._x = x;
          this._y = y;
          this._x1 = x1;
          this._y1 = y1;
        }
        window.SVGPathSegCurvetoQuadraticAbs.prototype = Object.create(window.SVGPathSeg.prototype);
        window.SVGPathSegCurvetoQuadraticAbs.prototype.toString = function() { return "[object SVGPathSegCurvetoQuadraticAbs]"; }
        window.SVGPathSegCurvetoQuadraticAbs.prototype._asPathString = function() { return this.pathSegTypeAsLetter + " " + this._x1 + " " + this._y1 + " " + this._x + " " + this._y; }
        window.SVGPathSegCurvetoQuadraticAbs.prototype.clone = function() { return new window.SVGPathSegCurvetoQuadraticAbs(undefined, this._x, this._y, this._x1, this._y1); }
        Object.defineProperty(window.SVGPathSegCurvetoQuadraticAbs.prototype, "x", { get: function() { return this._x; }, set: function(x) { this._x = x; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegCurvetoQuadraticAbs.prototype, "y", { get: function() { return this._y; }, set: function(y) { this._y = y; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegCurvetoQuadraticAbs.prototype, "x1", { get: function() { return this._x1; }, set: function(x1) { this._x1 = x1; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegCurvetoQuadraticAbs.prototype, "y1", { get: function() { return this._y1; }, set: function(y1) { this._y1 = y1; this._segmentChanged(); }, enumerable: true });

        window.SVGPathSegCurvetoQuadraticRel = function(owningPathSegList, x, y, x1, y1) {
          window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL, "q", owningPathSegList);
          this._x = x;
          this._y = y;
          this._x1 = x1;
          this._y1 = y1;
        }
        window.SVGPathSegCurvetoQuadraticRel.prototype = Object.create(window.SVGPathSeg.prototype);
        window.SVGPathSegCurvetoQuadraticRel.prototype.toString = function() { return "[object SVGPathSegCurvetoQuadraticRel]"; }
        window.SVGPathSegCurvetoQuadraticRel.prototype._asPathString = function() { return this.pathSegTypeAsLetter + " " + this._x1 + " " + this._y1 + " " + this._x + " " + this._y; }
        window.SVGPathSegCurvetoQuadraticRel.prototype.clone = function() { return new window.SVGPathSegCurvetoQuadraticRel(undefined, this._x, this._y, this._x1, this._y1); }
        Object.defineProperty(window.SVGPathSegCurvetoQuadraticRel.prototype, "x", { get: function() { return this._x; }, set: function(x) { this._x = x; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegCurvetoQuadraticRel.prototype, "y", { get: function() { return this._y; }, set: function(y) { this._y = y; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegCurvetoQuadraticRel.prototype, "x1", { get: function() { return this._x1; }, set: function(x1) { this._x1 = x1; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegCurvetoQuadraticRel.prototype, "y1", { get: function() { return this._y1; }, set: function(y1) { this._y1 = y1; this._segmentChanged(); }, enumerable: true });

        window.SVGPathSegArcAbs = function(owningPathSegList, x, y, r1, r2, angle, largeArcFlag, sweepFlag) {
          window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_ARC_ABS, "A", owningPathSegList);
          this._x = x;
          this._y = y;
          this._r1 = r1;
          this._r2 = r2;
          this._angle = angle;
          this._largeArcFlag = largeArcFlag;
          this._sweepFlag = sweepFlag;
        }
        window.SVGPathSegArcAbs.prototype = Object.create(window.SVGPathSeg.prototype);
        window.SVGPathSegArcAbs.prototype.toString = function() { return "[object SVGPathSegArcAbs]"; }
        window.SVGPathSegArcAbs.prototype._asPathString = function() { return this.pathSegTypeAsLetter + " " + this._r1 + " " + this._r2 + " " + this._angle + " " + (this._largeArcFlag ? "1" : "0") + " " + (this._sweepFlag ? "1" : "0") + " " + this._x + " " + this._y; }
        window.SVGPathSegArcAbs.prototype.clone = function() { return new window.SVGPathSegArcAbs(undefined, this._x, this._y, this._r1, this._r2, this._angle, this._largeArcFlag, this._sweepFlag); }
        Object.defineProperty(window.SVGPathSegArcAbs.prototype, "x", { get: function() { return this._x; }, set: function(x) { this._x = x; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegArcAbs.prototype, "y", { get: function() { return this._y; }, set: function(y) { this._y = y; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegArcAbs.prototype, "r1", { get: function() { return this._r1; }, set: function(r1) { this._r1 = r1; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegArcAbs.prototype, "r2", { get: function() { return this._r2; }, set: function(r2) { this._r2 = r2; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegArcAbs.prototype, "angle", { get: function() { return this._angle; }, set: function(angle) { this._angle = angle; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegArcAbs.prototype, "largeArcFlag", { get: function() { return this._largeArcFlag; }, set: function(largeArcFlag) { this._largeArcFlag = largeArcFlag; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegArcAbs.prototype, "sweepFlag", { get: function() { return this._sweepFlag; }, set: function(sweepFlag) { this._sweepFlag = sweepFlag; this._segmentChanged(); }, enumerable: true });

        window.SVGPathSegArcRel = function(owningPathSegList, x, y, r1, r2, angle, largeArcFlag, sweepFlag) {
          window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_ARC_REL, "a", owningPathSegList);
          this._x = x;
          this._y = y;
          this._r1 = r1;
          this._r2 = r2;
          this._angle = angle;
          this._largeArcFlag = largeArcFlag;
          this._sweepFlag = sweepFlag;
        }
        window.SVGPathSegArcRel.prototype = Object.create(window.SVGPathSeg.prototype);
        window.SVGPathSegArcRel.prototype.toString = function() { return "[object SVGPathSegArcRel]"; }
        window.SVGPathSegArcRel.prototype._asPathString = function() { return this.pathSegTypeAsLetter + " " + this._r1 + " " + this._r2 + " " + this._angle + " " + (this._largeArcFlag ? "1" : "0") + " " + (this._sweepFlag ? "1" : "0") + " " + this._x + " " + this._y; }
        window.SVGPathSegArcRel.prototype.clone = function() { return new window.SVGPathSegArcRel(undefined, this._x, this._y, this._r1, this._r2, this._angle, this._largeArcFlag, this._sweepFlag); }
        Object.defineProperty(window.SVGPathSegArcRel.prototype, "x", { get: function() { return this._x; }, set: function(x) { this._x = x; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegArcRel.prototype, "y", { get: function() { return this._y; }, set: function(y) { this._y = y; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegArcRel.prototype, "r1", { get: function() { return this._r1; }, set: function(r1) { this._r1 = r1; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegArcRel.prototype, "r2", { get: function() { return this._r2; }, set: function(r2) { this._r2 = r2; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegArcRel.prototype, "angle", { get: function() { return this._angle; }, set: function(angle) { this._angle = angle; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegArcRel.prototype, "largeArcFlag", { get: function() { return this._largeArcFlag; }, set: function(largeArcFlag) { this._largeArcFlag = largeArcFlag; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegArcRel.prototype, "sweepFlag", { get: function() { return this._sweepFlag; }, set: function(sweepFlag) { this._sweepFlag = sweepFlag; this._segmentChanged(); }, enumerable: true });

        window.SVGPathSegLinetoHorizontalAbs = function(owningPathSegList, x) {
          window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS, "H", owningPathSegList);
          this._x = x;
        }
        window.SVGPathSegLinetoHorizontalAbs.prototype = Object.create(window.SVGPathSeg.prototype);
        window.SVGPathSegLinetoHorizontalAbs.prototype.toString = function() { return "[object SVGPathSegLinetoHorizontalAbs]"; }
        window.SVGPathSegLinetoHorizontalAbs.prototype._asPathString = function() { return this.pathSegTypeAsLetter + " " + this._x; }
        window.SVGPathSegLinetoHorizontalAbs.prototype.clone = function() { return new window.SVGPathSegLinetoHorizontalAbs(undefined, this._x); }
        Object.defineProperty(window.SVGPathSegLinetoHorizontalAbs.prototype, "x", { get: function() { return this._x; }, set: function(x) { this._x = x; this._segmentChanged(); }, enumerable: true });

        window.SVGPathSegLinetoHorizontalRel = function(owningPathSegList, x) {
          window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL, "h", owningPathSegList);
          this._x = x;
        }
        window.SVGPathSegLinetoHorizontalRel.prototype = Object.create(window.SVGPathSeg.prototype);
        window.SVGPathSegLinetoHorizontalRel.prototype.toString = function() { return "[object SVGPathSegLinetoHorizontalRel]"; }
        window.SVGPathSegLinetoHorizontalRel.prototype._asPathString = function() { return this.pathSegTypeAsLetter + " " + this._x; }
        window.SVGPathSegLinetoHorizontalRel.prototype.clone = function() { return new window.SVGPathSegLinetoHorizontalRel(undefined, this._x); }
        Object.defineProperty(window.SVGPathSegLinetoHorizontalRel.prototype, "x", { get: function() { return this._x; }, set: function(x) { this._x = x; this._segmentChanged(); }, enumerable: true });

        window.SVGPathSegLinetoVerticalAbs = function(owningPathSegList, y) {
          window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS, "V", owningPathSegList);
          this._y = y;
        }
        window.SVGPathSegLinetoVerticalAbs.prototype = Object.create(window.SVGPathSeg.prototype);
        window.SVGPathSegLinetoVerticalAbs.prototype.toString = function() { return "[object SVGPathSegLinetoVerticalAbs]"; }
        window.SVGPathSegLinetoVerticalAbs.prototype._asPathString = function() { return this.pathSegTypeAsLetter + " " + this._y; }
        window.SVGPathSegLinetoVerticalAbs.prototype.clone = function() { return new window.SVGPathSegLinetoVerticalAbs(undefined, this._y); }
        Object.defineProperty(window.SVGPathSegLinetoVerticalAbs.prototype, "y", { get: function() { return this._y; }, set: function(y) { this._y = y; this._segmentChanged(); }, enumerable: true });

        window.SVGPathSegLinetoVerticalRel = function(owningPathSegList, y) {
          window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL, "v", owningPathSegList);
          this._y = y;
        }
        window.SVGPathSegLinetoVerticalRel.prototype = Object.create(window.SVGPathSeg.prototype);
        window.SVGPathSegLinetoVerticalRel.prototype.toString = function() { return "[object SVGPathSegLinetoVerticalRel]"; }
        window.SVGPathSegLinetoVerticalRel.prototype._asPathString = function() { return this.pathSegTypeAsLetter + " " + this._y; }
        window.SVGPathSegLinetoVerticalRel.prototype.clone = function() { return new window.SVGPathSegLinetoVerticalRel(undefined, this._y); }
        Object.defineProperty(window.SVGPathSegLinetoVerticalRel.prototype, "y", { get: function() { return this._y; }, set: function(y) { this._y = y; this._segmentChanged(); }, enumerable: true });

        window.SVGPathSegCurvetoCubicSmoothAbs = function(owningPathSegList, x, y, x2, y2) {
          window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS, "S", owningPathSegList);
          this._x = x;
          this._y = y;
          this._x2 = x2;
          this._y2 = y2;
        }
        window.SVGPathSegCurvetoCubicSmoothAbs.prototype = Object.create(window.SVGPathSeg.prototype);
        window.SVGPathSegCurvetoCubicSmoothAbs.prototype.toString = function() { return "[object SVGPathSegCurvetoCubicSmoothAbs]"; }
        window.SVGPathSegCurvetoCubicSmoothAbs.prototype._asPathString = function() { return this.pathSegTypeAsLetter + " " + this._x2 + " " + this._y2 + " " + this._x + " " + this._y; }
        window.SVGPathSegCurvetoCubicSmoothAbs.prototype.clone = function() { return new window.SVGPathSegCurvetoCubicSmoothAbs(undefined, this._x, this._y, this._x2, this._y2); }
        Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothAbs.prototype, "x", { get: function() { return this._x; }, set: function(x) { this._x = x; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothAbs.prototype, "y", { get: function() { return this._y; }, set: function(y) { this._y = y; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothAbs.prototype, "x2", { get: function() { return this._x2; }, set: function(x2) { this._x2 = x2; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothAbs.prototype, "y2", { get: function() { return this._y2; }, set: function(y2) { this._y2 = y2; this._segmentChanged(); }, enumerable: true });

        window.SVGPathSegCurvetoCubicSmoothRel = function(owningPathSegList, x, y, x2, y2) {
          window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL, "s", owningPathSegList);
          this._x = x;
          this._y = y;
          this._x2 = x2;
          this._y2 = y2;
        }
        window.SVGPathSegCurvetoCubicSmoothRel.prototype = Object.create(window.SVGPathSeg.prototype);
        window.SVGPathSegCurvetoCubicSmoothRel.prototype.toString = function() { return "[object SVGPathSegCurvetoCubicSmoothRel]"; }
        window.SVGPathSegCurvetoCubicSmoothRel.prototype._asPathString = function() { return this.pathSegTypeAsLetter + " " + this._x2 + " " + this._y2 + " " + this._x + " " + this._y; }
        window.SVGPathSegCurvetoCubicSmoothRel.prototype.clone = function() { return new window.SVGPathSegCurvetoCubicSmoothRel(undefined, this._x, this._y, this._x2, this._y2); }
        Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothRel.prototype, "x", { get: function() { return this._x; }, set: function(x) { this._x = x; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothRel.prototype, "y", { get: function() { return this._y; }, set: function(y) { this._y = y; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothRel.prototype, "x2", { get: function() { return this._x2; }, set: function(x2) { this._x2 = x2; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothRel.prototype, "y2", { get: function() { return this._y2; }, set: function(y2) { this._y2 = y2; this._segmentChanged(); }, enumerable: true });

        window.SVGPathSegCurvetoQuadraticSmoothAbs = function(owningPathSegList, x, y) {
          window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS, "T", owningPathSegList);
          this._x = x;
          this._y = y;
        }
        window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype = Object.create(window.SVGPathSeg.prototype);
        window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype.toString = function() { return "[object SVGPathSegCurvetoQuadraticSmoothAbs]"; }
        window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype._asPathString = function() { return this.pathSegTypeAsLetter + " " + this._x + " " + this._y; }
        window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype.clone = function() { return new window.SVGPathSegCurvetoQuadraticSmoothAbs(undefined, this._x, this._y); }
        Object.defineProperty(window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype, "x", { get: function() { return this._x; }, set: function(x) { this._x = x; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype, "y", { get: function() { return this._y; }, set: function(y) { this._y = y; this._segmentChanged(); }, enumerable: true });

        window.SVGPathSegCurvetoQuadraticSmoothRel = function(owningPathSegList, x, y) {
          window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL, "t", owningPathSegList);
          this._x = x;
          this._y = y;
        }
        window.SVGPathSegCurvetoQuadraticSmoothRel.prototype = Object.create(window.SVGPathSeg.prototype);
        window.SVGPathSegCurvetoQuadraticSmoothRel.prototype.toString = function() { return "[object SVGPathSegCurvetoQuadraticSmoothRel]"; }
        window.SVGPathSegCurvetoQuadraticSmoothRel.prototype._asPathString = function() { return this.pathSegTypeAsLetter + " " + this._x + " " + this._y; }
        window.SVGPathSegCurvetoQuadraticSmoothRel.prototype.clone = function() { return new window.SVGPathSegCurvetoQuadraticSmoothRel(undefined, this._x, this._y); }
        Object.defineProperty(window.SVGPathSegCurvetoQuadraticSmoothRel.prototype, "x", { get: function() { return this._x; }, set: function(x) { this._x = x; this._segmentChanged(); }, enumerable: true });
        Object.defineProperty(window.SVGPathSegCurvetoQuadraticSmoothRel.prototype, "y", { get: function() { return this._y; }, set: function(y) { this._y = y; this._segmentChanged(); }, enumerable: true });

        // Add createSVGPathSeg* functions to window.SVGPathElement.
        // Spec: http://www.w3.org/TR/SVG11/single-page.html#paths-Interfacewindow.SVGPathElement.
        window.SVGPathElement.prototype.createSVGPathSegClosePath = function() { return new window.SVGPathSegClosePath(undefined); }
        window.SVGPathElement.prototype.createSVGPathSegMovetoAbs = function(x, y) { return new window.SVGPathSegMovetoAbs(undefined, x, y); }
        window.SVGPathElement.prototype.createSVGPathSegMovetoRel = function(x, y) { return new window.SVGPathSegMovetoRel(undefined, x, y); }
        window.SVGPathElement.prototype.createSVGPathSegLinetoAbs = function(x, y) { return new window.SVGPathSegLinetoAbs(undefined, x, y); }
        window.SVGPathElement.prototype.createSVGPathSegLinetoRel = function(x, y) { return new window.SVGPathSegLinetoRel(undefined, x, y); }
        window.SVGPathElement.prototype.createSVGPathSegCurvetoCubicAbs = function(x, y, x1, y1, x2, y2) { return new window.SVGPathSegCurvetoCubicAbs(undefined, x, y, x1, y1, x2, y2); }
        window.SVGPathElement.prototype.createSVGPathSegCurvetoCubicRel = function(x, y, x1, y1, x2, y2) { return new window.SVGPathSegCurvetoCubicRel(undefined, x, y, x1, y1, x2, y2); }
        window.SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticAbs = function(x, y, x1, y1) { return new window.SVGPathSegCurvetoQuadraticAbs(undefined, x, y, x1, y1); }
        window.SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticRel = function(x, y, x1, y1) { return new window.SVGPathSegCurvetoQuadraticRel(undefined, x, y, x1, y1); }
        window.SVGPathElement.prototype.createSVGPathSegArcAbs = function(x, y, r1, r2, angle, largeArcFlag, sweepFlag) { return new window.SVGPathSegArcAbs(undefined, x, y, r1, r2, angle, largeArcFlag, sweepFlag); }
        window.SVGPathElement.prototype.createSVGPathSegArcRel = function(x, y, r1, r2, angle, largeArcFlag, sweepFlag) { return new window.SVGPathSegArcRel(undefined, x, y, r1, r2, angle, largeArcFlag, sweepFlag); }
        window.SVGPathElement.prototype.createSVGPathSegLinetoHorizontalAbs = function(x) { return new window.SVGPathSegLinetoHorizontalAbs(undefined, x); }
        window.SVGPathElement.prototype.createSVGPathSegLinetoHorizontalRel = function(x) { return new window.SVGPathSegLinetoHorizontalRel(undefined, x); }
        window.SVGPathElement.prototype.createSVGPathSegLinetoVerticalAbs = function(y) { return new window.SVGPathSegLinetoVerticalAbs(undefined, y); }
        window.SVGPathElement.prototype.createSVGPathSegLinetoVerticalRel = function(y) { return new window.SVGPathSegLinetoVerticalRel(undefined, y); }
        window.SVGPathElement.prototype.createSVGPathSegCurvetoCubicSmoothAbs = function(x, y, x2, y2) { return new window.SVGPathSegCurvetoCubicSmoothAbs(undefined, x, y, x2, y2); }
        window.SVGPathElement.prototype.createSVGPathSegCurvetoCubicSmoothRel = function(x, y, x2, y2) { return new window.SVGPathSegCurvetoCubicSmoothRel(undefined, x, y, x2, y2); }
        window.SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticSmoothAbs = function(x, y) { return new window.SVGPathSegCurvetoQuadraticSmoothAbs(undefined, x, y); }
        window.SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticSmoothRel = function(x, y) { return new window.SVGPathSegCurvetoQuadraticSmoothRel(undefined, x, y); }

        if (!("getPathSegAtLength" in window.SVGPathElement.prototype)) {
          // Add getPathSegAtLength to SVGPathElement.
          // Spec: https://www.w3.org/TR/SVG11/single-page.html#paths-__svg__SVGPathElement__getPathSegAtLength
          // This polyfill requires SVGPathElement.getTotalLength to implement the distance-along-a-path algorithm.
          window.SVGPathElement.prototype.getPathSegAtLength = function(distance) {
            if (distance === undefined || !isFinite(distance))
              throw "Invalid arguments.";

            var measurementElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
            measurementElement.setAttribute("d", this.getAttribute("d"));
            var lastPathSegment = measurementElement.pathSegList.numberOfItems - 1;

            // If the path is empty, return 0.
            if (lastPathSegment <= 0)
              return 0;

            do {
              measurementElement.pathSegList.removeItem(lastPathSegment);
              if (distance > measurementElement.getTotalLength())
                break;
              lastPathSegment--;
            } while (lastPathSegment > 0);
            return lastPathSegment;
          }
        }
      }

      // Checking for SVGPathSegList in window checks for the case of an implementation without the
      // SVGPathSegList API.
      // The second check for appendItem is specific to Firefox 59+ which removed only parts of the
      // SVGPathSegList API (e.g., appendItem). In this case we need to re-implement the entire API
      // so the polyfill data (i.e., _list) is used throughout.
      if (!("SVGPathSegList" in window) || !("appendItem" in window.SVGPathSegList.prototype)) {
        // Spec: http://www.w3.org/TR/SVG11/single-page.html#paths-InterfaceSVGPathSegList
        window.SVGPathSegList = function(pathElement) {
          this._pathElement = pathElement;
          this._list = this._parsePath(this._pathElement.getAttribute("d"));

          // Use a MutationObserver to catch changes to the path's "d" attribute.
          this._mutationObserverConfig = { "attributes": true, "attributeFilter": ["d"] };
          this._pathElementMutationObserver = new MutationObserver(this._updateListFromPathMutations.bind(this));
          this._pathElementMutationObserver.observe(this._pathElement, this._mutationObserverConfig);
        }

        window.SVGPathSegList.prototype.classname = "SVGPathSegList";

        Object.defineProperty(window.SVGPathSegList.prototype, "numberOfItems", {
          get: function() {
            this._checkPathSynchronizedToList();
            return this._list.length;
          },
          enumerable: true
        });

        // The length property was not specified but was in Firefox 58.
        Object.defineProperty(window.SVGPathSegList.prototype, "length", {
          get: function() {
            this._checkPathSynchronizedToList();
            return this._list.length;
          },
          enumerable: true
        });

        // Add the pathSegList accessors to window.SVGPathElement.
        // Spec: http://www.w3.org/TR/SVG11/single-page.html#paths-InterfaceSVGAnimatedPathData
        Object.defineProperty(window.SVGPathElement.prototype, "pathSegList", {
          get: function() {
            if (!this._pathSegList)
              this._pathSegList = new window.SVGPathSegList(this);
            return this._pathSegList;
          },
          enumerable: true
        });
        // FIXME: The following are not implemented and simply return window.SVGPathElement.pathSegList.
        Object.defineProperty(window.SVGPathElement.prototype, "normalizedPathSegList", { get: function() { return this.pathSegList; }, enumerable: true });
        Object.defineProperty(window.SVGPathElement.prototype, "animatedPathSegList", { get: function() { return this.pathSegList; }, enumerable: true });
        Object.defineProperty(window.SVGPathElement.prototype, "animatedNormalizedPathSegList", { get: function() { return this.pathSegList; }, enumerable: true });

        // Process any pending mutations to the path element and update the list as needed.
        // This should be the first call of all public functions and is needed because
        // MutationObservers are not synchronous so we can have pending asynchronous mutations.
        window.SVGPathSegList.prototype._checkPathSynchronizedToList = function() {
          this._updateListFromPathMutations(this._pathElementMutationObserver.takeRecords());
        }

        window.SVGPathSegList.prototype._updateListFromPathMutations = function(mutationRecords) {
          if (!this._pathElement)
            return;
          var hasPathMutations = false;
          mutationRecords.forEach(function(record) {
            if (record.attributeName == "d")
              hasPathMutations = true;
          });
          if (hasPathMutations)
            this._list = this._parsePath(this._pathElement.getAttribute("d"));
        }

        // Serialize the list and update the path's 'd' attribute.
        window.SVGPathSegList.prototype._writeListToPath = function() {
          this._pathElementMutationObserver.disconnect();
          this._pathElement.setAttribute("d", window.SVGPathSegList._pathSegArrayAsString(this._list));
          this._pathElementMutationObserver.observe(this._pathElement, this._mutationObserverConfig);
        }

        // When a path segment changes the list needs to be synchronized back to the path element.
        window.SVGPathSegList.prototype.segmentChanged = function(pathSeg) {
          this._writeListToPath();
        }

        window.SVGPathSegList.prototype.clear = function() {
          this._checkPathSynchronizedToList();

          this._list.forEach(function(pathSeg) {
            pathSeg._owningPathSegList = null;
          });
          this._list = [];
          this._writeListToPath();
        }

        window.SVGPathSegList.prototype.initialize = function(newItem) {
          this._checkPathSynchronizedToList();

          this._list = [newItem];
          newItem._owningPathSegList = this;
          this._writeListToPath();
          return newItem;
        }

        window.SVGPathSegList.prototype._checkValidIndex = function(index) {
          if (isNaN(index) || index < 0 || index >= this.numberOfItems)
            throw "INDEX_SIZE_ERR";
        }

        window.SVGPathSegList.prototype.getItem = function(index) {
          this._checkPathSynchronizedToList();

          this._checkValidIndex(index);
          return this._list[index];
        }

        window.SVGPathSegList.prototype.insertItemBefore = function(newItem, index) {
          this._checkPathSynchronizedToList();

          // Spec: If the index is greater than or equal to numberOfItems, then the new item is appended to the end of the list.
          if (index > this.numberOfItems)
            index = this.numberOfItems;
          if (newItem._owningPathSegList) {
            // SVG2 spec says to make a copy.
            newItem = newItem.clone();
          }
          this._list.splice(index, 0, newItem);
          newItem._owningPathSegList = this;
          this._writeListToPath();
          return newItem;
        }

        window.SVGPathSegList.prototype.replaceItem = function(newItem, index) {
          this._checkPathSynchronizedToList();

          if (newItem._owningPathSegList) {
            // SVG2 spec says to make a copy.
            newItem = newItem.clone();
          }
          this._checkValidIndex(index);
          this._list[index] = newItem;
          newItem._owningPathSegList = this;
          this._writeListToPath();
          return newItem;
        }

        window.SVGPathSegList.prototype.removeItem = function(index) {
          this._checkPathSynchronizedToList();

          this._checkValidIndex(index);
          var item = this._list[index];
          this._list.splice(index, 1);
          this._writeListToPath();
          return item;
        }

        window.SVGPathSegList.prototype.appendItem = function(newItem) {
          this._checkPathSynchronizedToList();

          if (newItem._owningPathSegList) {
            // SVG2 spec says to make a copy.
            newItem = newItem.clone();
          }
          this._list.push(newItem);
          newItem._owningPathSegList = this;
          // TODO: Optimize this to just append to the existing attribute.
          this._writeListToPath();
          return newItem;
        }

        window.SVGPathSegList._pathSegArrayAsString = function(pathSegArray) {
          var string = "";
          var first = true;
          pathSegArray.forEach(function(pathSeg) {
            if (first) {
              first = false;
              string += pathSeg._asPathString();
            } else {
              string += " " + pathSeg._asPathString();
            }
          });
          return string;
        }

        // This closely follows SVGPathParser::parsePath from Source/core/svg/SVGPathParser.cpp.
        window.SVGPathSegList.prototype._parsePath = function(string) {
          if (!string || string.length == 0)
            return [];

          var owningPathSegList = this;

          var Builder = function() {
            this.pathSegList = [];
          }

          Builder.prototype.appendSegment = function(pathSeg) {
            this.pathSegList.push(pathSeg);
          }

          var Source = function(string) {
            this._string = string;
            this._currentIndex = 0;
            this._endIndex = this._string.length;
            this._previousCommand = window.SVGPathSeg.PATHSEG_UNKNOWN;

            this._skipOptionalSpaces();
          }

          Source.prototype._isCurrentSpace = function() {
            var character = this._string[this._currentIndex];
            return character <= " " && (character == " " || character == "\n" || character == "\t" || character == "\r" || character == "\f");
          }

          Source.prototype._skipOptionalSpaces = function() {
            while (this._currentIndex < this._endIndex && this._isCurrentSpace())
              this._currentIndex++;
            return this._currentIndex < this._endIndex;
          }

          Source.prototype._skipOptionalSpacesOrDelimiter = function() {
            if (this._currentIndex < this._endIndex && !this._isCurrentSpace() && this._string.charAt(this._currentIndex) != ",")
              return false;
            if (this._skipOptionalSpaces()) {
              if (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) == ",") {
                this._currentIndex++;
                this._skipOptionalSpaces();
              }
            }
            return this._currentIndex < this._endIndex;
          }

          Source.prototype.hasMoreData = function() {
            return this._currentIndex < this._endIndex;
          }

          Source.prototype.peekSegmentType = function() {
            var lookahead = this._string[this._currentIndex];
            return this._pathSegTypeFromChar(lookahead);
          }

          Source.prototype._pathSegTypeFromChar = function(lookahead) {
            switch (lookahead) {
              case "Z":
              case "z":
                return window.SVGPathSeg.PATHSEG_CLOSEPATH;
              case "M":
                return window.SVGPathSeg.PATHSEG_MOVETO_ABS;
              case "m":
                return window.SVGPathSeg.PATHSEG_MOVETO_REL;
              case "L":
                return window.SVGPathSeg.PATHSEG_LINETO_ABS;
              case "l":
                return window.SVGPathSeg.PATHSEG_LINETO_REL;
              case "C":
                return window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS;
              case "c":
                return window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL;
              case "Q":
                return window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS;
              case "q":
                return window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL;
              case "A":
                return window.SVGPathSeg.PATHSEG_ARC_ABS;
              case "a":
                return window.SVGPathSeg.PATHSEG_ARC_REL;
              case "H":
                return window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS;
              case "h":
                return window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL;
              case "V":
                return window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS;
              case "v":
                return window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL;
              case "S":
                return window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS;
              case "s":
                return window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL;
              case "T":
                return window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS;
              case "t":
                return window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL;
              default:
                return window.SVGPathSeg.PATHSEG_UNKNOWN;
            }
          }

          Source.prototype._nextCommandHelper = function(lookahead, previousCommand) {
            // Check for remaining coordinates in the current command.
            if ((lookahead == "+" || lookahead == "-" || lookahead == "." || (lookahead >= "0" && lookahead <= "9")) && previousCommand != window.SVGPathSeg.PATHSEG_CLOSEPATH) {
              if (previousCommand == window.SVGPathSeg.PATHSEG_MOVETO_ABS)
                return window.SVGPathSeg.PATHSEG_LINETO_ABS;
              if (previousCommand == window.SVGPathSeg.PATHSEG_MOVETO_REL)
                return window.SVGPathSeg.PATHSEG_LINETO_REL;
              return previousCommand;
            }
            return window.SVGPathSeg.PATHSEG_UNKNOWN;
          }

          Source.prototype.initialCommandIsMoveTo = function() {
            // If the path is empty it is still valid, so return true.
            if (!this.hasMoreData())
              return true;
            var command = this.peekSegmentType();
            // Path must start with moveTo.
            return command == window.SVGPathSeg.PATHSEG_MOVETO_ABS || command == window.SVGPathSeg.PATHSEG_MOVETO_REL;
          }

          // Parse a number from an SVG path. This very closely follows genericParseNumber(...) from Source/core/svg/SVGParserUtilities.cpp.
          // Spec: http://www.w3.org/TR/SVG11/single-page.html#paths-PathDataBNF
          Source.prototype._parseNumber = function() {
            var exponent = 0;
            var integer = 0;
            var frac = 1;
            var decimal = 0;
            var sign = 1;
            var expsign = 1;

            var startIndex = this._currentIndex;

            this._skipOptionalSpaces();

            // Read the sign.
            if (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) == "+")
              this._currentIndex++;
            else if (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) == "-") {
              this._currentIndex++;
              sign = -1;
            }

            if (this._currentIndex == this._endIndex || ((this._string.charAt(this._currentIndex) < "0" || this._string.charAt(this._currentIndex) > "9") && this._string.charAt(this._currentIndex) != "."))
              // The first character of a number must be one of [0-9+-.].
              return undefined;

            // Read the integer part, build right-to-left.
            var startIntPartIndex = this._currentIndex;
            while (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) >= "0" && this._string.charAt(this._currentIndex) <= "9")
              this._currentIndex++; // Advance to first non-digit.

            if (this._currentIndex != startIntPartIndex) {
              var scanIntPartIndex = this._currentIndex - 1;
              var multiplier = 1;
              while (scanIntPartIndex >= startIntPartIndex) {
                integer += multiplier * (this._string.charAt(scanIntPartIndex--) - "0");
                multiplier *= 10;
              }
            }

            // Read the decimals.
            if (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) == ".") {
              this._currentIndex++;

              // There must be a least one digit following the .
              if (this._currentIndex >= this._endIndex || this._string.charAt(this._currentIndex) < "0" || this._string.charAt(this._currentIndex) > "9")
                return undefined;
              while (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) >= "0" && this._string.charAt(this._currentIndex) <= "9") {
                frac *= 10;
                decimal += (this._string.charAt(this._currentIndex) - "0") / frac;
                this._currentIndex += 1;
              }
            }

            // Read the exponent part.
            if (this._currentIndex != startIndex && this._currentIndex + 1 < this._endIndex && (this._string.charAt(this._currentIndex) == "e" || this._string.charAt(this._currentIndex) == "E") && (this._string.charAt(this._currentIndex + 1) != "x" && this._string.charAt(this._currentIndex + 1) != "m")) {
              this._currentIndex++;

              // Read the sign of the exponent.
              if (this._string.charAt(this._currentIndex) == "+") {
                this._currentIndex++;
              } else if (this._string.charAt(this._currentIndex) == "-") {
                this._currentIndex++;
                expsign = -1;
              }

              // There must be an exponent.
              if (this._currentIndex >= this._endIndex || this._string.charAt(this._currentIndex) < "0" || this._string.charAt(this._currentIndex) > "9")
                return undefined;

              while (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) >= "0" && this._string.charAt(this._currentIndex) <= "9") {
                exponent *= 10;
                exponent += (this._string.charAt(this._currentIndex) - "0");
                this._currentIndex++;
              }
            }

            var number = integer + decimal;
            number *= sign;

            if (exponent)
              number *= Math.pow(10, expsign * exponent);

            if (startIndex == this._currentIndex)
              return undefined;

            this._skipOptionalSpacesOrDelimiter();

            return number;
          }

          Source.prototype._parseArcFlag = function() {
            if (this._currentIndex >= this._endIndex)
              return undefined;
            var flag = false;
            var flagChar = this._string.charAt(this._currentIndex++);
            if (flagChar == "0")
              flag = false;
            else if (flagChar == "1")
              flag = true;
            else
              return undefined;

            this._skipOptionalSpacesOrDelimiter();
            return flag;
          }

          Source.prototype.parseSegment = function() {
            var lookahead = this._string[this._currentIndex];
            var command = this._pathSegTypeFromChar(lookahead);
            if (command == window.SVGPathSeg.PATHSEG_UNKNOWN) {
              // Possibly an implicit command. Not allowed if this is the first command.
              if (this._previousCommand == window.SVGPathSeg.PATHSEG_UNKNOWN)
                return null;
              command = this._nextCommandHelper(lookahead, this._previousCommand);
              if (command == window.SVGPathSeg.PATHSEG_UNKNOWN)
                return null;
            } else {
              this._currentIndex++;
            }

            this._previousCommand = command;

            switch (command) {
              case window.SVGPathSeg.PATHSEG_MOVETO_REL:
                return new window.SVGPathSegMovetoRel(owningPathSegList, this._parseNumber(), this._parseNumber());
              case window.SVGPathSeg.PATHSEG_MOVETO_ABS:
                return new window.SVGPathSegMovetoAbs(owningPathSegList, this._parseNumber(), this._parseNumber());
              case window.SVGPathSeg.PATHSEG_LINETO_REL:
                return new window.SVGPathSegLinetoRel(owningPathSegList, this._parseNumber(), this._parseNumber());
              case window.SVGPathSeg.PATHSEG_LINETO_ABS:
                return new window.SVGPathSegLinetoAbs(owningPathSegList, this._parseNumber(), this._parseNumber());
              case window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL:
                return new window.SVGPathSegLinetoHorizontalRel(owningPathSegList, this._parseNumber());
              case window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS:
                return new window.SVGPathSegLinetoHorizontalAbs(owningPathSegList, this._parseNumber());
              case window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL:
                return new window.SVGPathSegLinetoVerticalRel(owningPathSegList, this._parseNumber());
              case window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS:
                return new window.SVGPathSegLinetoVerticalAbs(owningPathSegList, this._parseNumber());
              case window.SVGPathSeg.PATHSEG_CLOSEPATH:
                this._skipOptionalSpaces();
                return new window.SVGPathSegClosePath(owningPathSegList);
              case window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL:
                var points = {x1: this._parseNumber(), y1: this._parseNumber(), x2: this._parseNumber(), y2: this._parseNumber(), x: this._parseNumber(), y: this._parseNumber()};
                return new window.SVGPathSegCurvetoCubicRel(owningPathSegList, points.x, points.y, points.x1, points.y1, points.x2, points.y2);
              case window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS:
                var points = {x1: this._parseNumber(), y1: this._parseNumber(), x2: this._parseNumber(), y2: this._parseNumber(), x: this._parseNumber(), y: this._parseNumber()};
                return new window.SVGPathSegCurvetoCubicAbs(owningPathSegList, points.x, points.y, points.x1, points.y1, points.x2, points.y2);
              case window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL:
                var points = {x2: this._parseNumber(), y2: this._parseNumber(), x: this._parseNumber(), y: this._parseNumber()};
                return new window.SVGPathSegCurvetoCubicSmoothRel(owningPathSegList, points.x, points.y, points.x2, points.y2);
              case window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS:
                var points = {x2: this._parseNumber(), y2: this._parseNumber(), x: this._parseNumber(), y: this._parseNumber()};
                return new window.SVGPathSegCurvetoCubicSmoothAbs(owningPathSegList, points.x, points.y, points.x2, points.y2);
              case window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL:
                var points = {x1: this._parseNumber(), y1: this._parseNumber(), x: this._parseNumber(), y: this._parseNumber()};
                return new window.SVGPathSegCurvetoQuadraticRel(owningPathSegList, points.x, points.y, points.x1, points.y1);
              case window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS:
                var points = {x1: this._parseNumber(), y1: this._parseNumber(), x: this._parseNumber(), y: this._parseNumber()};
                return new window.SVGPathSegCurvetoQuadraticAbs(owningPathSegList, points.x, points.y, points.x1, points.y1);
              case window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL:
                return new window.SVGPathSegCurvetoQuadraticSmoothRel(owningPathSegList, this._parseNumber(), this._parseNumber());
              case window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS:
                return new window.SVGPathSegCurvetoQuadraticSmoothAbs(owningPathSegList, this._parseNumber(), this._parseNumber());
              case window.SVGPathSeg.PATHSEG_ARC_REL:
                var points = {x1: this._parseNumber(), y1: this._parseNumber(), arcAngle: this._parseNumber(), arcLarge: this._parseArcFlag(), arcSweep: this._parseArcFlag(), x: this._parseNumber(), y: this._parseNumber()};
                return new window.SVGPathSegArcRel(owningPathSegList, points.x, points.y, points.x1, points.y1, points.arcAngle, points.arcLarge, points.arcSweep);
              case window.SVGPathSeg.PATHSEG_ARC_ABS:
                var points = {x1: this._parseNumber(), y1: this._parseNumber(), arcAngle: this._parseNumber(), arcLarge: this._parseArcFlag(), arcSweep: this._parseArcFlag(), x: this._parseNumber(), y: this._parseNumber()};
                return new window.SVGPathSegArcAbs(owningPathSegList, points.x, points.y, points.x1, points.y1, points.arcAngle, points.arcLarge, points.arcSweep);
              default:
                throw "Unknown path seg type."
            }
          }

          var builder = new Builder();
          var source = new Source(string);

          if (!source.initialCommandIsMoveTo())
            return [];
          while (source.hasMoreData()) {
            var pathSeg = source.parseSegment();
            if (!pathSeg)
              return [];
            builder.appendSegment(pathSeg);
          }

          return builder.pathSegList;
        }
      }
    }
  }
}();

svgedit = {
  // common namepaces constants in alpha order
  NS: {
    HTML: 'http://www.w3.org/1999/xhtml',
    MATH: 'http://www.w3.org/1998/Math/MathML',
    SE: 'http://svg-edit.googlecode.com',
    SVG: 'http://www.w3.org/2000/svg',
    XLINK: 'http://www.w3.org/1999/xlink',
    XML: 'http://www.w3.org/XML/1998/namespace',
    XMLNS: 'http://www.w3.org/2000/xmlns/' // see http://www.w3.org/TR/REC-xml-names/#xmlReserved
  }
};

// return the svgedit.NS with key values switched and lowercase
svgedit.getReverseNS = function() {'use strict';
  var reverseNS = {};
  $.each(this.NS, function(name, URI) {
    reverseNS[URI] = name.toLowerCase();
  });
  return reverseNS;
};

var mybrowser = function () {
  "use strict";
  return {
    initBrowser: function () {

      if (!svgedit.browser) {
        svgedit.browser = {};
      }

// alias
      var NS = svgedit.NS;

      var supportsSvg_ = (function() {
        return !!document.createElementNS && !!document.createElementNS(NS.SVG, 'svg').createSVGRect;
      }());

      svgedit.browser.supportsSvg = function() { return supportsSvg_; };
      if(!svgedit.browser.supportsSvg()) {
        window.location = 'browser-not-supported.html';
        return;
      }

      var userAgent = navigator.userAgent;
      var svg = document.createElementNS(NS.SVG, 'svg');

// Note: Browser sniffing should only be used if no other detection method is possible
      var isOpera_ = !!window.opera;
      var isWebkit_ = userAgent.indexOf('AppleWebKit') >= 0;
      var isGecko_ = userAgent.indexOf('Gecko/') >= 0;
      var isIE_ = userAgent.indexOf('MSIE') >= 0;
      var isChrome_ = userAgent.indexOf('Chrome/') >= 0;
      var isWindows_ = userAgent.indexOf('Windows') >= 0;
      var isMac_ = userAgent.indexOf('Macintosh') >= 0;
      var isTouch_ = 'ontouchstart' in window;

      var supportsSelectors_ = (function() {
        return !!svg.querySelector;
      }());

      var supportsXpath_ = (function() {
        return !!document.evaluate;
      }());

// segList functions (for FF1.5 and 2.0)
      var supportsPathReplaceItem_ = (function() {
        var path = document.createElementNS(NS.SVG, 'path');
        path.setAttribute('d', 'M0,0 10,10');
        var seglist = path.pathSegList;
        var seg = path.createSVGPathSegLinetoAbs(5,5);
        try {
          seglist.replaceItem(seg, 1);
          return true;
        } catch(err) {}
        return false;
      }());

      var supportsPathInsertItemBefore_ = (function() {
        var path = document.createElementNS(NS.SVG, 'path');
        path.setAttribute('d', 'M0,0 10,10');
        var seglist = path.pathSegList;
        var seg = path.createSVGPathSegLinetoAbs(5,5);
        try {
          seglist.insertItemBefore(seg, 1);
          return true;
        } catch(err) {}
        return false;
      }());

// text character positioning (for IE9)
      var supportsGoodTextCharPos_ = (function() {
        var svgroot = document.createElementNS(NS.SVG, 'svg');
        var svgcontent = document.createElementNS(NS.SVG, 'svg');
        document.documentElement.appendChild(svgroot);
        svgcontent.setAttribute('x', 5);
        svgroot.appendChild(svgcontent);
        var text = document.createElementNS(NS.SVG, 'text');
        text.textContent = 'a';
        svgcontent.appendChild(text);
        var pos = text.getStartPositionOfChar(0).x;
        document.documentElement.removeChild(svgroot);
        return (pos === 0);
      }());

      var supportsPathBBox_ = (function() {
        var svgcontent = document.createElementNS(NS.SVG, 'svg');
        document.documentElement.appendChild(svgcontent);
        var path = document.createElementNS(NS.SVG, 'path');
        path.setAttribute('d', 'M0,0 C0,0 10,10 10,0');
        svgcontent.appendChild(path);
        var bbox = path.getBBox();
        document.documentElement.removeChild(svgcontent);
        return (bbox.height > 4 && bbox.height < 5);
      }());

// Support for correct bbox sizing on groups with horizontal/vertical lines
      var supportsHVLineContainerBBox_ = (function() {
        var svgcontent = document.createElementNS(NS.SVG, 'svg');
        document.documentElement.appendChild(svgcontent);
        var path = document.createElementNS(NS.SVG, 'path');
        path.setAttribute('d', 'M0,0 10,0');
        var path2 = document.createElementNS(NS.SVG, 'path');
        path2.setAttribute('d', 'M5,0 15,0');
        var g = document.createElementNS(NS.SVG, 'g');
        g.appendChild(path);
        g.appendChild(path2);
        svgcontent.appendChild(g);
        var bbox = g.getBBox();
        document.documentElement.removeChild(svgcontent);
        // Webkit gives 0, FF gives 10, Opera (correctly) gives 15
        return (bbox.width == 15);
      }());

      var supportsEditableText_ = (function() {
        // TODO: Find better way to check support for this
        return isOpera_;
      }());

      var supportsGoodDecimals_ = (function() {
        // Correct decimals on clone attributes (Opera < 10.5/win/non-en)
        var rect = document.createElementNS(NS.SVG, 'rect');
        rect.setAttribute('x', 0.1);
        var crect = rect.cloneNode(false);
        var retValue = (crect.getAttribute('x').indexOf(',') == -1);
        if(!retValue) {
          $.alert('NOTE: This version of Opera is known to contain bugs in SVG-edit.\n'+
            'Please upgrade to the <a href="http://opera.com">latest version</a> in which the problems have been fixed.');
        }
        return retValue;
      }());

      var supportsNonScalingStroke_ = (function() {
        var rect = document.createElementNS(NS.SVG, 'rect');
        rect.setAttribute('style', 'vector-effect:non-scaling-stroke');
        return rect.style.vectorEffect === 'non-scaling-stroke';
      }());

      var supportsNativeSVGTransformLists_ = (function() {
        var rect = document.createElementNS(NS.SVG, 'rect');
        var rxform = rect.transform.baseVal;
        var t1 = svg.createSVGTransform();
        rxform.appendItem(t1);
        var r1 = rxform.getItem(0);
        return r1 instanceof SVGTransform && t1 instanceof SVGTransform &&
          r1.type == t1.type && r1.angle == t1.angle &&
          r1.matrix.a == t1.matrix.a &&
          r1.matrix.b == t1.matrix.b &&
          r1.matrix.c == t1.matrix.c &&
          r1.matrix.d == t1.matrix.d &&
          r1.matrix.e == t1.matrix.e &&
          r1.matrix.f == t1.matrix.f;
      }());

// Public API

      svgedit.browser.isOpera = function() { return isOpera_; };
      svgedit.browser.isWebkit = function() { return isWebkit_; };
      svgedit.browser.isGecko = function() { return isGecko_; };
      svgedit.browser.isIE = function() { return isIE_; };
      svgedit.browser.isChrome = function() { return isChrome_; };
      svgedit.browser.isWindows = function() { return isWindows_; };
      svgedit.browser.isMac = function() { return isMac_; };
      svgedit.browser.isTouch = function() { return isTouch_; };

      svgedit.browser.supportsSelectors = function() { return supportsSelectors_; };
      svgedit.browser.supportsXpath = function() { return supportsXpath_; };

      svgedit.browser.supportsPathReplaceItem = function() { return supportsPathReplaceItem_; };
      svgedit.browser.supportsPathInsertItemBefore = function() { return supportsPathInsertItemBefore_; };
      svgedit.browser.supportsPathBBox = function() { return supportsPathBBox_; };
      svgedit.browser.supportsHVLineContainerBBox = function() { return supportsHVLineContainerBBox_; };
      svgedit.browser.supportsGoodTextCharPos = function() { return supportsGoodTextCharPos_; };
      svgedit.browser.supportsEditableText = function() { return supportsEditableText_; };
      svgedit.browser.supportsGoodDecimals = function() { return supportsGoodDecimals_; };
      svgedit.browser.supportsNonScalingStroke = function() { return supportsNonScalingStroke_; };
      svgedit.browser.supportsNativeTransformLists = function() { return supportsNativeSVGTransformLists_; };
    }
  }
}();
/** transformlist **/
(function() {'use strict';

  if (!svgedit.transformlist) {
    svgedit.transformlist = {};
  }

  var svgroot = document.createElementNS(svgedit.NS.SVG, 'svg');

// Helper function.
  function transformToString(xform) {
    var m = xform.matrix,
      text = '';
    switch(xform.type) {
      case 1: // MATRIX
        text = 'matrix(' + [m.a, m.b, m.c, m.d, m.e, m.f].join(',') + ')';
        break;
      case 2: // TRANSLATE
        text = 'translate(' + m.e + ',' + m.f + ')';
        break;
      case 3: // SCALE
        if (m.a == m.d) {text = 'scale(' + m.a + ')';}
        else {text = 'scale(' + m.a + ',' + m.d + ')';}
        break;
      case 4: // ROTATE
        var cx = 0, cy = 0;
        // this prevents divide by zero
        if (xform.angle != 0) {
          var K = 1 - m.a;
          cy = ( K * m.f + m.b*m.e ) / ( K*K + m.b*m.b );
          cx = ( m.e - m.b * cy ) / K;
        }
        text = 'rotate(' + xform.angle + ' ' + cx + ',' + cy + ')';
        break;
    }
    return text;
  }


  /**
   * Map of SVGTransformList objects.
   */
  var listMap_ = {};


// **************************************************************************************
// SVGTransformList implementation for Webkit
// These methods do not currently raise any exceptions.
// These methods also do not check that transforms are being inserted.  This is basically
// implementing as much of SVGTransformList that we need to get the job done.
//
//  interface SVGEditTransformList {
//		attribute unsigned long numberOfItems;
//		void   clear (  )
//		SVGTransform initialize ( in SVGTransform newItem )
//		SVGTransform getItem ( in unsigned long index ) (DOES NOT THROW DOMException, INDEX_SIZE_ERR)
//		SVGTransform insertItemBefore ( in SVGTransform newItem, in unsigned long index ) (DOES NOT THROW DOMException, INDEX_SIZE_ERR)
//		SVGTransform replaceItem ( in SVGTransform newItem, in unsigned long index ) (DOES NOT THROW DOMException, INDEX_SIZE_ERR)
//		SVGTransform removeItem ( in unsigned long index ) (DOES NOT THROW DOMException, INDEX_SIZE_ERR)
//		SVGTransform appendItem ( in SVGTransform newItem )
//		NOT IMPLEMENTED: SVGTransform createSVGTransformFromMatrix ( in SVGMatrix matrix );
//		NOT IMPLEMENTED: SVGTransform consolidate (  );
//	}
// **************************************************************************************
  svgedit.transformlist.SVGTransformList = function(elem) {
    this._elem = elem || null;
    this._xforms = [];
    // TODO: how do we capture the undo-ability in the changed transform list?
    this._update = function() {
      var tstr = '';
      var concatMatrix = svgroot.createSVGMatrix();
      var i;
      for (i = 0; i < this.numberOfItems; ++i) {
        var xform = this._list.getItem(i);
        tstr += transformToString(xform) + ' ';
      }
      this._elem.setAttribute('transform', tstr);
    };
    this._list = this;
    this._init = function() {
      // Transform attribute parser
      var str = this._elem.getAttribute('transform');
      if (!str) {return;}

      // TODO: Add skew support in future
      var re = /\s*((scale|matrix|rotate|translate)\s*\(.*?\))\s*,?\s*/;
      var m = true;
      while (m) {
        m = str.match(re);
        str = str.replace(re, '');
        if (m && m[1]) {
          var x = m[1];
          var bits = x.split(/\s*\(/);
          var name = bits[0];
          var val_bits = bits[1].match(/\s*(.*?)\s*\)/);
          val_bits[1] = val_bits[1].replace(/(\d)-/g, '$1 -');
          var val_arr = val_bits[1].split(/[, ]+/);
          var letters = 'abcdef'.split('');
          var mtx = svgroot.createSVGMatrix();
          $.each(val_arr, function(i, item) {
            val_arr[i] = parseFloat(item);
            if (name == 'matrix') {
              mtx[letters[i]] = val_arr[i];
            }
          });
          var xform = svgroot.createSVGTransform();
          var fname = 'set' + name.charAt(0).toUpperCase() + name.slice(1);
          var values = name == 'matrix' ? [mtx] : val_arr;

          if (name == 'scale' && values.length == 1) {
            values.push(values[0]);
          } else if (name == 'translate' && values.length == 1) {
            values.push(0);
          } else if (name == 'rotate' && values.length == 1) {
            values.push(0, 0);
          }
          xform[fname].apply(xform, values);
          this._list.appendItem(xform);
        }
      }
    };
    this._removeFromOtherLists = function(item) {
      if (item) {
        // Check if this transform is already in a transformlist, and
        // remove it if so.
        var found = false;
        var id;
        for (id in listMap_) {
          var tl = listMap_[id];
          var i, len;
          for (i = 0, len = tl._xforms.length; i < len; ++i) {
            if (tl._xforms[i] == item) {
              found = true;
              tl.removeItem(i);
              break;
            }
          }
          if (found) {
            break;
          }
        }
      }
    };

    this.numberOfItems = 0;
    this.clear = function() {
      this.numberOfItems = 0;
      this._xforms = [];
    };

    this.initialize = function(newItem) {
      this.numberOfItems = 1;
      this._removeFromOtherLists(newItem);
      this._xforms = [newItem];
    };

    this.getItem = function(index) {
      if (index < this.numberOfItems && index >= 0) {
        return this._xforms[index];
      }
      throw {code: 1}; // DOMException with code=INDEX_SIZE_ERR
    };

    this.insertItemBefore = function(newItem, index) {
      var retValue = null;
      if (index >= 0) {
        if (index < this.numberOfItems) {
          this._removeFromOtherLists(newItem);
          var newxforms = new Array(this.numberOfItems + 1);
          // TODO: use array copying and slicing
          var i;
          for (i = 0; i < index; ++i) {
            newxforms[i] = this._xforms[i];
          }
          newxforms[i] = newItem;
          var j;
          for (j = i+1; i < this.numberOfItems; ++j, ++i) {
            newxforms[j] = this._xforms[i];
          }
          this.numberOfItems++;
          this._xforms = newxforms;
          retValue = newItem;
          this._list._update();
        }
        else {
          retValue = this._list.appendItem(newItem);
        }
      }
      return retValue;
    };

    this.replaceItem = function(newItem, index) {
      var retValue = null;
      if (index < this.numberOfItems && index >= 0) {
        this._removeFromOtherLists(newItem);
        this._xforms[index] = newItem;
        retValue = newItem;
        this._list._update();
      }
      return retValue;
    };

    this.removeItem = function(index) {
      if (index < this.numberOfItems && index >= 0) {
        var retValue = this._xforms[index];
        var newxforms = new Array(this.numberOfItems - 1);
        var i, j;
        for (i = 0; i < index; ++i) {
          newxforms[i] = this._xforms[i];
        }
        for (j = i; j < this.numberOfItems-1; ++j, ++i) {
          newxforms[j] = this._xforms[i+1];
        }
        this.numberOfItems--;
        this._xforms = newxforms;
        this._list._update();
        return retValue;
      }
      throw {code: 1}; // DOMException with code=INDEX_SIZE_ERR
    };

    this.appendItem = function(newItem) {
      this._removeFromOtherLists(newItem);
      this._xforms.push(newItem);
      this.numberOfItems++;
      this._list._update();
      return newItem;
    };
  };


  svgedit.transformlist.resetListMap = function() {
    listMap_ = {};
  };

  /**
   * Removes transforms of the given element from the map.
   * Parameters:
   * elem - a DOM Element
   */
  svgedit.transformlist.removeElementFromListMap = function(elem) {
    if (elem.id && listMap_[elem.id]) {
      delete listMap_[elem.id];
    }
  };

// Function: getTransformList
// Returns an object that behaves like a SVGTransformList for the given DOM element
//
// Parameters:
// elem - DOM element to get a transformlist from
  svgedit.transformlist.getTransformList = function(elem) {
    if (!svgedit.browser.supportsNativeTransformLists()) {
      var id = elem.id || 'temp';
      var t = listMap_[id];
      if (!t || id === 'temp') {
        listMap_[id] = new svgedit.transformlist.SVGTransformList(elem);
        listMap_[id]._init();
        t = listMap_[id];
      }
      return t;
    }
    if (elem.transform) {
      return elem.transform.baseVal;
    }
    if (elem.gradientTransform) {
      return elem.gradientTransform.baseVal;
    }
    if (elem.patternTransform) {
      return elem.patternTransform.baseVal;
    }

    return null;
  };

}());
/** units **/
(function() {'use strict';

  if (!svgedit.units) {
    svgedit.units = {};
  }

  var NS = svgedit.NS;
  var wAttrs = ['x', 'x1', 'cx', 'rx', 'width'];
  var hAttrs = ['y', 'y1', 'cy', 'ry', 'height'];
  var unitAttrs = ['r', 'radius'].concat(wAttrs, hAttrs);
// unused
  var unitNumMap = {
    '%':  2,
    'em': 3,
    'ex': 4,
    'px': 5,
    'cm': 6,
    'mm': 7,
    'in': 8,
    'pt': 9,
    'pc': 10
  };

// Container of elements.
  var elementContainer_;

  /**
   * Stores mapping of unit type to user coordinates.
   */
  var typeMap_ = {};

  /**
   * ElementContainer interface
   *
   * function getBaseUnit() - returns a string of the base unit type of the container ('em')
   * function getElement() - returns an element in the container given an id
   * function getHeight() - returns the container's height
   * function getWidth() - returns the container's width
   * function getRoundDigits() - returns the number of digits number should be rounded to
   */

  /**
   * Function: svgedit.units.init()
   * Initializes this module.
   *
   * Parameters:
   * elementContainer - an object implementing the ElementContainer interface.
   */
  svgedit.units.init = function(elementContainer) {
    elementContainer_ = elementContainer;

    // Get correct em/ex values by creating a temporary SVG.
    var svg = document.createElementNS(NS.SVG, 'svg');
    document.body.appendChild(svg);
    var rect = document.createElementNS(NS.SVG, 'rect');
    rect.setAttribute('width', '1em');
    rect.setAttribute('height', '1ex');
    rect.setAttribute('x', '1in');
    svg.appendChild(rect);
    var bb = rect.getBBox();
    document.body.removeChild(svg);

    var inch = bb.x;
    typeMap_ = {
      'em': bb.width,
      'ex': bb.height,
      'in': inch,
      'cm': inch / 2.54,
      'mm': inch / 25.4,
      'pt': inch / 72,
      'pc': inch / 6,
      'px': 1,
      '%': 0
    };
  };

// Group: Unit conversion functions

// Function: svgedit.units.getTypeMap
// Returns the unit object with values for each unit
  svgedit.units.getTypeMap = function() {
    return typeMap_;
  };

// Function: svgedit.units.shortFloat
// Rounds a given value to a float with number of digits defined in save_options
//
// Parameters:
// val - The value as a String, Number or Array of two numbers to be rounded
//
// Returns:
// If a string/number was given, returns a Float. If an array, return a string
// with comma-seperated floats
  svgedit.units.shortFloat = function(val) {
    var digits = elementContainer_.getRoundDigits();
    if (!isNaN(val)) {
      // Note that + converts to Number
      return +((+val).toFixed(digits));
    }
    if ($.isArray(val)) {
      return svgedit.units.shortFloat(val[0]) + ',' + svgedit.units.shortFloat(val[1]);
    }
    return parseFloat(val).toFixed(digits) - 0;
  };

// Function: svgedit.units.convertUnit
// Converts the number to given unit or baseUnit
  svgedit.units.convertUnit = function(val, unit) {
    unit = unit || elementContainer_.getBaseUnit();
//	baseVal.convertToSpecifiedUnits(unitNumMap[unit]);
//	var val = baseVal.valueInSpecifiedUnits;
//	baseVal.convertToSpecifiedUnits(1);
    return svgedit.units.shortFloat(val / typeMap_[unit]);
  };

// Function: svgedit.units.setUnitAttr
// Sets an element's attribute based on the unit in its current value.
//
// Parameters:
// elem - DOM element to be changed
// attr - String with the name of the attribute associated with the value
// val - String with the attribute value to convert
  svgedit.units.setUnitAttr = function(elem, attr, val) {
//	if (!isNaN(val)) {
    // New value is a number, so check currently used unit
//		var old_val = elem.getAttribute(attr);

    // Enable this for alternate mode
//		if (old_val !== null && (isNaN(old_val) || elementContainer_.getBaseUnit() !== 'px')) {
//			// Old value was a number, so get unit, then convert
//			var unit;
//			if (old_val.substr(-1) === '%') {
//				var res = getResolution();
//				unit = '%';
//				val *= 100;
//				if (wAttrs.indexOf(attr) >= 0) {
//					val = val / res.w;
//				} else if (hAttrs.indexOf(attr) >= 0) {
//					val = val / res.h;
//				} else {
//					return val / Math.sqrt((res.w*res.w) + (res.h*res.h))/Math.sqrt(2);
//				}
//			} else {
//				if (elementContainer_.getBaseUnit() !== 'px') {
//					unit = elementContainer_.getBaseUnit();
//				} else {
//					unit = old_val.substr(-2);
//				}
//				val = val / typeMap_[unit];
//			}
//
//		val += unit;
//		}
//	}
    elem.setAttribute(attr, val);
  };

  var attrsToConvert = {
    'line': ['x1', 'x2', 'y1', 'y2'],
    'circle': ['cx', 'cy', 'r'],
    'ellipse': ['cx', 'cy', 'rx', 'ry'],
    'foreignObject': ['x', 'y', 'width', 'height'],
    'rect': ['x', 'y', 'width', 'height'],
    'image': ['x', 'y', 'width', 'height'],
    'use': ['x', 'y', 'width', 'height'],
    'text': ['x', 'y']
  };

// Function: svgedit.units.convertAttrs
// Converts all applicable attributes to the configured baseUnit
//
// Parameters:
// element - a DOM element whose attributes should be converted
  svgedit.units.convertAttrs = function(element) {
    var elName = element.tagName;
    var unit = elementContainer_.getBaseUnit();
    var attrs = attrsToConvert[elName];
    if (!attrs) {return;}

    var len = attrs.length;
    var i;
    for (i = 0; i < len; i++) {
      var attr = attrs[i];
      var cur = element.getAttribute(attr);
      if (cur) {
        if (!isNaN(cur)) {
          element.setAttribute(attr, (cur / typeMap_[unit]) + unit);
        }
        // else {
        // Convert existing?
        // }
      }
    }
  };

// Function: svgedit.units.convertToNum
// Converts given values to numbers. Attributes must be supplied in
// case a percentage is given
//
// Parameters:
// attr - String with the name of the attribute associated with the value
// val - String with the attribute value to convert
  svgedit.units.convertToNum = function(attr, val) {
    // Return a number if that's what it already is
    if (!isNaN(val)) {return val-0;}
    var num;
    if (val.substr(-1) === '%') {
      // Deal with percentage, depends on attribute
      num = val.substr(0, val.length-1)/100;
      var width = elementContainer_.getWidth();
      var height = elementContainer_.getHeight();

      if (wAttrs.indexOf(attr) >= 0) {
        return num * width;
      }
      if (hAttrs.indexOf(attr) >= 0) {
        return num * height;
      }
      return num * Math.sqrt((width*width) + (height*height))/Math.sqrt(2);
    }
    var unit = val.substr(-2);
    num = val.substr(0, val.length-2);
    // Note that this multiplication turns the string into a number
    return num * typeMap_[unit];
  };

// Function: svgedit.units.isValidUnit
// Check if an attribute's value is in a valid format
//
// Parameters:
// attr - String with the name of the attribute associated with the value
// val - String with the attribute value to check
  svgedit.units.isValidUnit = function(attr, val, selectedElement) {
    var valid = false;
    if (unitAttrs.indexOf(attr) >= 0) {
      // True if it's just a number
      if (!isNaN(val)) {
        valid = true;
      } else {
        // Not a number, check if it has a valid unit
        val = val.toLowerCase();
        $.each(typeMap_, function(unit) {
          if (valid) {return;}
          var re = new RegExp('^-?[\\d\\.]+' + unit + '$');
          if (re.test(val)) {valid = true;}
        });
      }
    } else if (attr == 'id') {
      // if we're trying to change the id, make sure it's not already present in the doc
      // and the id value is valid.

      var result = false;
      // because getElem() can throw an exception in the case of an invalid id
      // (according to http://www.w3.org/TR/xml-id/ IDs must be a NCName)
      // we wrap it in an exception and only return true if the ID was valid and
      // not already present
      try {
        var elem = elementContainer_.getElement(val);
        result = (elem == null || elem === selectedElement);
      } catch(e) {}
      return result;
    }
    valid = true;

    return valid;
  };

}());
/** math.js **/
(function() {'use strict';

  if (!svgedit.math) {
    svgedit.math = {};
  }

// Constants
  var NEAR_ZERO = 1e-14;

// Throw away SVGSVGElement used for creating matrices/transforms.
  var svg = document.createElementNS(svgedit.NS.SVG, 'svg');

  /**
   * A (hopefully) quicker function to transform a point by a matrix
   * (this function avoids any DOM calls and just does the math)
   * @param {number} x - Float representing the x coordinate
   * @param {number} y - Float representing the y coordinate
   * @param {SVGMatrix} m - Matrix object to transform the point with
   * @returns {object} An x, y object representing the transformed point
   */
  svgedit.math.transformPoint = function (x, y, m) {
    return { x: m.a * x + m.c * y + m.e, y: m.b * x + m.d * y + m.f};
  };


  /**
   * Helper function to check if the matrix performs no actual transform
   * (i.e. exists for identity purposes)
   * @param {SVGMatrix} m - The matrix object to check
   * @returns {boolean} Indicates whether or not the matrix is 1,0,0,1,0,0
   */
  svgedit.math.isIdentity = function (m) {
    return (m.a === 1 && m.b === 0 && m.c === 0 && m.d === 1 && m.e === 0 && m.f === 0);
  };


  /**
   * This function tries to return a SVGMatrix that is the multiplication m1*m2.
   * We also round to zero when it's near zero
   * @param {...SVGMatrix} matr - Two or more matrix objects to multiply
   * @returns {SVGMatrix} The matrix object resulting from the calculation
   */
  svgedit.math.matrixMultiply = function (matr) {
    var args = arguments, i = args.length, m = args[i-1];

    while (i-- > 1) {
      var m1 = args[i-1];
      m = m1.multiply(m);
    }
    if (Math.abs(m.a) < NEAR_ZERO) {m.a = 0;}
    if (Math.abs(m.b) < NEAR_ZERO) {m.b = 0;}
    if (Math.abs(m.c) < NEAR_ZERO) {m.c = 0;}
    if (Math.abs(m.d) < NEAR_ZERO) {m.d = 0;}
    if (Math.abs(m.e) < NEAR_ZERO) {m.e = 0;}
    if (Math.abs(m.f) < NEAR_ZERO) {m.f = 0;}

    return m;
  };

  /**
   * See if the given transformlist includes a non-indentity matrix transform
   * @param {object} [tlist] - The transformlist to check
   * @returns {boolean} Whether or not a matrix transform was found
   */
  svgedit.math.hasMatrixTransform = function (tlist) {
    if (!tlist) {return false;}
    var num = tlist.numberOfItems;
    while (num--) {
      var xform = tlist.getItem(num);
      if (xform.type == 1 && !svgedit.math.isIdentity(xform.matrix)) {return true;}
    }
    return false;
  };

  /**
   * Transforms a rectangle based on the given matrix
   * @param {number} l - Float with the box's left coordinate
   * @param {number} t - Float with the box's top coordinate
   * @param {number} w - Float with the box width
   * @param {number} h - Float with the box height
   * @param {SVGMatrix} m - Matrix object to transform the box by
   * @returns {object} An object with the following values:
   * tl - The top left coordinate (x,y object)
   * tr - The top right coordinate (x,y object)
   * bl - The bottom left coordinate (x,y object)
   * br - The bottom right coordinate (x,y object)
   * aabox - Object with the following values:
   * x - Float with the axis-aligned x coordinate
   * y - Float with the axis-aligned y coordinate
   * width - Float with the axis-aligned width coordinate
   * height - Float with the axis-aligned height coordinate
   */
  svgedit.math.transformBox = function (l, t, w, h, m) {
    var transformPoint = svgedit.math.transformPoint,

      tl = transformPoint(l, t, m),
      tr = transformPoint((l + w), t, m),
      bl = transformPoint(l, (t + h), m),
      br = transformPoint((l + w), (t + h), m),

      minx = Math.min(tl.x, tr.x, bl.x, br.x),
      maxx = Math.max(tl.x, tr.x, bl.x, br.x),
      miny = Math.min(tl.y, tr.y, bl.y, br.y),
      maxy = Math.max(tl.y, tr.y, bl.y, br.y);

    return {
      tl: tl,
      tr: tr,
      bl: bl,
      br: br,
      aabox: {
        x: minx,
        y: miny,
        width: (maxx - minx),
        height: (maxy - miny)
      }
    };
  };

  /**
   * This returns a single matrix Transform for a given Transform List
   * (this is the equivalent of SVGTransformList.consolidate() but unlike
   * that method, this one does not modify the actual SVGTransformList)
   * This function is very liberal with its min, max arguments
   * @param {object} tlist - The transformlist object
   * @param {integer} [min=0] - Optional integer indicating start transform position
   * @param {integer} [max] - Optional integer indicating end transform position;
   *   defaults to one less than the tlist's numberOfItems
   * @returns {object} A single matrix transform object
   */
  svgedit.math.transformListToTransform = function (tlist, min, max) {
    if (tlist == null) {
      // Or should tlist = null have been prevented before this?
      return svg.createSVGTransformFromMatrix(svg.createSVGMatrix());
    }
    min = min || 0;
    max = max || (tlist.numberOfItems - 1);
    min = parseInt(min, 10);
    max = parseInt(max, 10);
    if (min > max) { var temp = max; max = min; min = temp; }
    var m = svg.createSVGMatrix();
    var i;
    for (i = min; i <= max; ++i) {
      // if our indices are out of range, just use a harmless identity matrix
      var mtom = (i >= 0 && i < tlist.numberOfItems ?
        tlist.getItem(i).matrix :
        svg.createSVGMatrix());
      m = svgedit.math.matrixMultiply(m, mtom);
    }
    return svg.createSVGTransformFromMatrix(m);
  };


  /**
   * Get the matrix object for a given element
   * @param {Element} elem - The DOM element to check
   * @returns {SVGMatrix} The matrix object associated with the element's transformlist
   */
  svgedit.math.getMatrix = function (elem) {
    var tlist = svgedit.transformlist.getTransformList(elem);
    return svgedit.math.transformListToTransform(tlist).matrix;
  };


  /**
   * Returns a 45 degree angle coordinate associated with the two given
   * coordinates
   * @param {number} x1 - First coordinate's x value
   * @param {number} x2 - Second coordinate's x value
   * @param {number} y1 - First coordinate's y value
   * @param {number} y2 - Second coordinate's y value
   * @returns {AngleCoord45}
   */
  svgedit.math.snapToAngle = function (x1, y1, x2, y2) {
    var snap = Math.PI / 4; // 45 degrees
    var dx = x2 - x1;
    var dy = y2 - y1;
    var angle = Math.atan2(dy, dx);
    var dist = Math.sqrt(dx * dx + dy * dy);
    var snapangle = Math.round(angle / snap) * snap;

    return {
      x: x1 + dist * Math.cos(snapangle),
      y: y1 + dist * Math.sin(snapangle),
      a: snapangle
    };
  };


  /**
   * Check if two rectangles (BBoxes objects) intersect each other
   * @param {SVGRect} r1 - The first BBox-like object
   * @param {SVGRect} r2 - The second BBox-like object
   * @returns {boolean} True if rectangles intersect
   */
  svgedit.math.rectsIntersect = function (r1, r2) {
    return r2.x < (r1.x + r1.width) &&
      (r2.x + r2.width) > r1.x &&
      r2.y < (r1.y + r1.height) &&
      (r2.y + r2.height) > r1.y;
  };

}());

/** utils **/
var mysvgutils = function (t) {
  "use strict";
  return {
    initSvgutils: function (undef) {

      if (!svgedit.utilities) {
        svgedit.utilities = {};
      }

// Constants

// String used to encode base64.
      var KEYSTR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
      var NS = svgedit.NS;

// Much faster than running getBBox() every time
      var visElems = 'a,circle,ellipse,foreignObject,g,image,line,path,polygon,polyline,rect,svg,text,tspan,use';
      var visElems_arr = visElems.split(',');
//var hidElems = 'clipPath,defs,desc,feGaussianBlur,filter,linearGradient,marker,mask,metadata,pattern,radialGradient,stop,switch,symbol,title,textPath';

      var editorContext_ = null;
      var domdoc_ = null;
      var domcontainer_ = null;
      var svgroot_ = null;

      svgedit.utilities.init = function(editorContext) {
        editorContext_ = editorContext;
        domdoc_ = editorContext.getDOMDocument();
        domcontainer_ = editorContext.getDOMContainer();
        svgroot_ = editorContext.getSVGRoot();
      };

// Function: svgedit.utilities.toXml
// Converts characters in a string to XML-friendly entities.
//
// Example: '&' becomes '&amp;'
//
// Parameters:
// str - The string to be converted
//
// Returns:
// The converted string
      svgedit.utilities.toXml = function(str) {
        // &apos; is ok in XML, but not HTML
        // &gt; does not normally need escaping, though it can if within a CDATA expression (and preceded by "]]")
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/, '&#x27;');
      };

// Function: svgedit.utilities.fromXml
// Converts XML entities in a string to single characters.
// Example: '&amp;' becomes '&'
//
// Parameters:
// str - The string to be converted
//
// Returns:
// The converted string
      svgedit.utilities.fromXml = function(str) {
        return $('<p/>').html(str).text();
      };


      svgedit.utilities.isNullish = function(val) {
        return val === null || val === undefined;
      };

// This code was written by Tyler Akins and has been placed in the
// public domain.  It would be nice if you left this header intact.
// Base64 code from Tyler Akins -- http://rumkin.com

// schiller: Removed string concatenation in favour of Array.join() optimization,
//				also precalculate the size of the array needed.

// Function: svgedit.utilities.encode64
// Converts a string to base64
      svgedit.utilities.encode64 = function(input) {
        // base64 strings are 4/3 larger than the original string
        input = svgedit.utilities.encodeUTF8(input); // convert non-ASCII characters
        // input = svgedit.utilities.convertToXMLReferences(input);
        if (window.btoa) {
          return window.btoa(input); // Use native if available
        }
        var output = [];
        output.length = Math.floor( (input.length + 2) / 3 ) * 4;
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0, p = 0;

        do {
          chr1 = input.charCodeAt(i++);
          chr2 = input.charCodeAt(i++);
          chr3 = input.charCodeAt(i++);

          enc1 = chr1 >> 2;
          enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
          enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
          enc4 = chr3 & 63;

          if (isNaN(chr2)) {
            enc3 = enc4 = 64;
          } else if (isNaN(chr3)) {
            enc4 = 64;
          }

          output[p++] = KEYSTR.charAt(enc1);
          output[p++] = KEYSTR.charAt(enc2);
          output[p++] = KEYSTR.charAt(enc3);
          output[p++] = KEYSTR.charAt(enc4);
        } while (i < input.length);

        return output.join('');
      };

// Function: svgedit.utilities.decode64
// Converts a string from base64
      svgedit.utilities.decode64 = function(input) {
        if(window.atob) {
          return svgedit.utilities.decodeUTF8(window.atob(input));
        }
        var output = '';
        var chr1, chr2, chr3 = '';
        var enc1, enc2, enc3, enc4 = '';
        var i = 0;

        // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');

        do {
          enc1 = KEYSTR.indexOf(input.charAt(i++));
          enc2 = KEYSTR.indexOf(input.charAt(i++));
          enc3 = KEYSTR.indexOf(input.charAt(i++));
          enc4 = KEYSTR.indexOf(input.charAt(i++));

          chr1 = (enc1 << 2) | (enc2 >> 4);
          chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
          chr3 = ((enc3 & 3) << 6) | enc4;

          output = output + String.fromCharCode(chr1);

          if (enc3 != 64) {
            output = output + String.fromCharCode(chr2);
          }
          if (enc4 != 64) {
            output = output + String.fromCharCode(chr3);
          }

          chr1 = chr2 = chr3 = '';
          enc1 = enc2 = enc3 = enc4 = '';

        } while (i < input.length);
        return svgedit.utilities.decodeUTF8(output);
      };

      svgedit.utilities.decodeUTF8 = function (argString) {
        return decodeURIComponent(escape(argString));
      };

// codedread:does not seem to work with webkit-based browsers on OSX // Brettz9: please test again as function upgraded
      svgedit.utilities.encodeUTF8 = function (argString) {
        return unescape(encodeURIComponent(argString));
      };

// Function: svgedit.utilities.convertToXMLReferences
// Converts a string to use XML references
      svgedit.utilities.convertToXMLReferences = function(input) {
        var n,
          output = '';
        for (n = 0; n < input.length; n++){
          var c = input.charCodeAt(n);
          if (c < 128) {
            output += input[n];
          } else if(c > 127) {
            output += ('&#' + c + ';');
          }
        }
        return output;
      };

// Function: svgedit.utilities.text2xml
// Cross-browser compatible method of converting a string to an XML tree
// found this function here: http://groups.google.com/group/jquery-dev/browse_thread/thread/c6d11387c580a77f
      svgedit.utilities.text2xml = function(sXML) {
        if(sXML.indexOf('<svg:svg') >= 0) {
          sXML = sXML.replace(/<(\/?)svg:/g, '<$1').replace('xmlns:svg', 'xmlns');
        }

        var out, dXML;
        try{
          dXML = (window.DOMParser)?new DOMParser():new ActiveXObject('Microsoft.XMLDOM');
          dXML.async = false;
        } catch(e){
          throw new Error('XML Parser could not be instantiated');
        }
        try{
          if (dXML.loadXML) {
            out = (dXML.loadXML(sXML)) ? dXML : false;
          }
          else {
            out = dXML.parseFromString(sXML, 'text/xml');
          }
        }
        catch(e2){ throw new Error('Error parsing XML string'); }
        return out;
      };

// Function: svgedit.utilities.bboxToObj
// Converts a SVGRect into an object.
//
// Parameters:
// bbox - a SVGRect
//
// Returns:
// An object with properties names x, y, width, height.
      svgedit.utilities.bboxToObj = function(bbox) {
        return {
          x: bbox.x,
          y: bbox.y,
          width: bbox.width,
          height: bbox.height
        };
      };

// Function: svgedit.utilities.walkTree
// Walks the tree and executes the callback on each element in a top-down fashion
//
// Parameters:
// elem - DOM element to traverse
// cbFn - Callback function to run on each element
      svgedit.utilities.walkTree = function(elem, cbFn){
        if (elem && elem.nodeType == 1) {
          cbFn(elem);
          var i = elem.childNodes.length;
          while (i--) {
            svgedit.utilities.walkTree(elem.childNodes.item(i), cbFn);
          }
        }
      };

// Function: svgedit.utilities.walkTreePost
// Walks the tree and executes the callback on each element in a depth-first fashion
// TODO: FIXME: Shouldn't this be calling walkTreePost?
//
// Parameters:
// elem - DOM element to traverse
// cbFn - Callback function to run on each element
      svgedit.utilities.walkTreePost = function(elem, cbFn) {
        if (elem && elem.nodeType == 1) {
          var i = elem.childNodes.length;
          while (i--) {
            svgedit.utilities.walkTree(elem.childNodes.item(i), cbFn);
          }
          cbFn(elem);
        }
      };

// Function: svgedit.utilities.getUrlFromAttr
// Extracts the URL from the url(...) syntax of some attributes.
// Three variants:
//  * <circle fill="url(someFile.svg#foo)" />
//  * <circle fill="url('someFile.svg#foo')" />
//  * <circle fill='url("someFile.svg#foo")' />
//
// Parameters:
// attrVal - The attribute value as a string
//
// Returns:
// String with just the URL, like someFile.svg#foo
      svgedit.utilities.getUrlFromAttr = function(attrVal) {
        if (attrVal) {
          // url("#somegrad")
          if (attrVal.indexOf('url("') === 0) {
            return attrVal.substring(5, attrVal.indexOf('"',6));
          }
          // url('#somegrad')
          if (attrVal.indexOf("url('") === 0) {
            return attrVal.substring(5, attrVal.indexOf("'",6));
          }
          if (attrVal.indexOf("url(") === 0) {
            return attrVal.substring(4, attrVal.indexOf(')'));
          }
        }
        return null;
      };

// Function: svgedit.utilities.getHref
// Returns the given element's xlink:href value
      svgedit.utilities.getHref = function(elem) {
        return elem.getAttributeNS(NS.XLINK, 'href');
      };

// Function: svgedit.utilities.setHref
// Sets the given element's xlink:href value
      svgedit.utilities.setHref = function(elem, val) {
        elem.setAttributeNS(NS.XLINK, 'xlink:href', val);
      };

// Function: findDefs
//
// Returns:
// The document's <defs> element, create it first if necessary
      svgedit.utilities.findDefs = function() {
        var svgElement = editorContext_.getSVGContent();
        var defs = svgElement.getElementsByTagNameNS(NS.SVG, 'defs');
        if (defs.length > 0) {
          defs = defs[0];
        } else {
          defs = svgElement.ownerDocument.createElementNS(NS.SVG, 'defs');
          if (svgElement.firstChild) {
            // first child is a comment, so call nextSibling
            svgElement.insertBefore(defs, svgElement.firstChild.nextSibling);
          } else {
            svgElement.appendChild(defs);
          }
        }
        return defs;
      };

// TODO(codedread): Consider moving the next to functions to bbox.js

// Function: svgedit.utilities.getPathBBox
// Get correct BBox for a path in Webkit
// Converted from code found here:
// http://blog.hackers-cafe.net/2009/06/how-to-calculate-bezier-curves-bounding.html
//
// Parameters:
// path - The path DOM element to get the BBox for
//
// Returns:
// A BBox-like object
      svgedit.utilities.getPathBBox = function(path) {
        var seglist = path.pathSegList;
        var tot = seglist.numberOfItems;

        var bounds = [[], []];
        var start = seglist.getItem(0);
        var P0 = [start.x, start.y];

        var i;
        for (i = 0; i < tot; i++) {
          var seg = seglist.getItem(i);

          if(seg.x === undef) {continue;}

          // Add actual points to limits
          bounds[0].push(P0[0]);
          bounds[1].push(P0[1]);

          if (seg.x1) {
            var P1 = [seg.x1, seg.y1],
              P2 = [seg.x2, seg.y2],
              P3 = [seg.x, seg.y];

            var j;
            for (j = 0; j < 2; j++) {

              var calc = function(t) {
                return Math.pow(1-t,3) * P0[j]
                  + 3 * Math.pow(1-t,2) * t * P1[j]
                  + 3 * (1-t) * Math.pow(t, 2) * P2[j]
                  + Math.pow(t,3) * P3[j];
              };

              var b = 6 * P0[j] - 12 * P1[j] + 6 * P2[j];
              var a = -3 * P0[j] + 9 * P1[j] - 9 * P2[j] + 3 * P3[j];
              var c = 3 * P1[j] - 3 * P0[j];

              if (a == 0) {
                if (b == 0) {
                  continue;
                }
                var t = -c / b;
                if (0 < t && t < 1) {
                  bounds[j].push(calc(t));
                }
                continue;
              }
              var b2ac = Math.pow(b,2) - 4 * c * a;
              if (b2ac < 0) {continue;}
              var t1 = (-b + Math.sqrt(b2ac))/(2 * a);
              if (0 < t1 && t1 < 1) {bounds[j].push(calc(t1));}
              var t2 = (-b - Math.sqrt(b2ac))/(2 * a);
              if (0 < t2 && t2 < 1) {bounds[j].push(calc(t2));}
            }
            P0 = P3;
          } else {
            bounds[0].push(seg.x);
            bounds[1].push(seg.y);
          }
        }

        var x = Math.min.apply(null, bounds[0]);
        var w = Math.max.apply(null, bounds[0]) - x;
        var y = Math.min.apply(null, bounds[1]);
        var h = Math.max.apply(null, bounds[1]) - y;
        return {
          'x': x,
          'y': y,
          'width': w,
          'height': h
        };
      };

// Function: groupBBFix
// Get the given/selected element's bounding box object, checking for
// horizontal/vertical lines (see issue 717)
// Note that performance is currently terrible, so some way to improve would
// be great.
//
// Parameters:
// selected - Container or <use> DOM element
      function groupBBFix(selected) {
        if(svgedit.browser.supportsHVLineContainerBBox()) {
          try { return selected.getBBox();} catch(e){}
        }
        var ref = $.data(selected, 'ref');
        var matched = null;
        var ret, copy;

        if(ref) {
          copy = $(ref).children().clone().attr('visibility', 'hidden');
          $(svgroot_).append(copy);
          matched = copy.filter('line, path');
        } else {
          matched = $(selected).find('line, path');
        }

        var issue = false;
        if(matched.length) {
          matched.each(function() {
            var bb = this.getBBox();
            if(!bb.width || !bb.height) {
              issue = true;
            }
          });
          if(issue) {
            var elems = ref ? copy : $(selected).children();
            ret = getStrokedBBox(elems); // getStrokedBBox defined in svgcanvas
          } else {
            ret = selected.getBBox();
          }
        } else {
          ret = selected.getBBox();
        }
        if(ref) {
          copy.remove();
        }
        return ret;
      }

// Function: svgedit.utilities.getBBox
// Get the given/selected element's bounding box object, convert it to be more
// usable when necessary
//
// Parameters:
// elem - Optional DOM element to get the BBox for
      svgedit.utilities.getBBox = function(elem) {
        var selected = elem || editorContext_.geSelectedElements()[0];
        if (elem.nodeType != 1) {return null;}
        var ret = null;
        var elname = selected.nodeName;

        switch ( elname ) {
          case 'text':
            if(selected.textContent === '') {
              selected.textContent = 'a'; // Some character needed for the selector to use.
              ret = selected.getBBox();
              selected.textContent = '';
            } else {
              if (selected.getBBox) { ret = selected.getBBox(); }
            }
            break;
          case 'path':
            if(!svgedit.browser.supportsPathBBox()) {
              ret = svgedit.utilities.getPathBBox(selected);
            } else {
              if (selected.getBBox) { ret = selected.getBBox(); }
            }
            break;
          case 'g':
          case 'a':
            ret = groupBBFix(selected);
            break;
          default:

            if(elname === 'use') {
              ret = groupBBFix(selected, true);
            }
            if(elname === 'use' || ( elname === 'foreignObject' && svgedit.browser.isWebkit() ) ) {
              if(!ret) {ret = selected.getBBox();}
              // This is resolved in later versions of webkit, perhaps we should
              // have a featured detection for correct 'use' behavior?
              // ——————————
              if(!svgedit.browser.isWebkit()) {
                var bb = {};
                bb.width = ret.width;
                bb.height = ret.height;
                bb.x = ret.x + parseFloat(selected.getAttribute('x')||0);
                bb.y = ret.y + parseFloat(selected.getAttribute('y')||0);
                ret = bb;
              }
            } else if(~visElems_arr.indexOf(elname)) {
              if (selected) { ret = selected.getBBox(); }
              else {
                // Check if element is child of a foreignObject
                var fo = $(selected).closest('foreignObject');
                if (fo.length) {
                  if (fo[0].getBBox) {
                    ret = fo[0].getBBox();
                  }
                }
              }
            }
        }
        if(ret) {
          ret = svgedit.utilities.bboxToObj(ret);
        }

        // get the bounding box from the DOM (which is in that element's coordinate system)
        return ret;
      };

// Function: getPathDFromSegments
// Create a path 'd' attribute from path segments.
// Each segment is an array of the form: [singleChar, [x,y, x,y, ...]]
//
// Parameters:
// pathSegments - An array of path segments to be converted
//
// Returns:
// The converted path d attribute.
      svgedit.utilities.getPathDFromSegments = function(pathSegments) {
        var d = '';

        $.each(pathSegments, function(j, seg) {
          var i;
          var pts = seg[1];
          d += seg[0];
          for (i = 0; i < pts.length; i+=2) {
            d += (pts[i] +','+pts[i+1]) + ' ';
          }
        });

        return d;
      };

// Function: getPathDFromElement
// Make a path 'd' attribute from a simple SVG element shape.
//
// Parameters:
// elem - The element to be converted
//
// Returns:
// The path d attribute or undefined if the element type is unknown.
      svgedit.utilities.getPathDFromElement = function(elem) {

        // Possibly the cubed root of 6, but 1.81 works best
        var num = 1.81;
        var d, a, rx, ry;
        switch (elem.tagName) {
          case 'ellipse':
          case 'circle':
            a = $(elem).attr(['rx', 'ry', 'cx', 'cy']);
            var cx = a.cx, cy = a.cy;
            rx = a.rx;
            ry = a.ry;
            if (elem.tagName == 'circle') {
              rx = ry = $(elem).attr('r');
            }

            d = svgedit.utilities.getPathDFromSegments([
              ['M',[(cx-rx),(cy)]],
              ['C',[(cx-rx),(cy-ry/num), (cx-rx/num),(cy-ry), (cx),(cy-ry)]],
              ['C',[(cx+rx/num),(cy-ry), (cx+rx),(cy-ry/num), (cx+rx),(cy)]],
              ['C',[(cx+rx),(cy+ry/num), (cx+rx/num),(cy+ry), (cx),(cy+ry)]],
              ['C',[(cx-rx/num),(cy+ry), (cx-rx),(cy+ry/num), (cx-rx),(cy)]],
              ['Z',[]]
            ]);
            break;
          case 'path':
            d = elem.getAttribute('d');
            break;
          case 'line':
            a = $(elem).attr(['x1', 'y1', 'x2', 'y2']);
            d = 'M'+a.x1+','+a.y1+'L'+a.x2+','+a.y2;
            break;
          case 'polyline':
            d = 'M' + elem.getAttribute('points');
            break;
          case 'polygon':
            d = 'M' + elem.getAttribute('points') + ' Z';
            break;
          case 'rect':
            var r = $(elem).attr(['rx', 'ry']);
            rx = r.rx;
            ry = r.ry;
            var b = elem.getBBox();
            var x = b.x, y = b.y, w = b.width, h = b.height;
            num = 4 - num; // Why? Because!

            if (!rx && !ry) {
              // Regular rect
              d = svgedit.utilities.getPathDFromSegments([
                ['M',[x, y]],
                ['L',[x+w, y]],
                ['L',[x+w, y+h]],
                ['L',[x, y+h]],
                ['L',[x, y]],
                ['Z',[]]
              ]);
            } else {
              d = svgedit.utilities.getPathDFromSegments([
                ['M',[x, y+ry]],
                ['C',[x, y+ry/num, x+rx/num, y, x+rx, y]],
                ['L',[x+w-rx, y]],
                ['C',[x+w-rx/num, y, x+w, y+ry/num, x+w, y+ry]],
                ['L',[x+w, y+h-ry]],
                ['C',[x+w, y+h-ry/num, x+w-rx/num, y+h, x+w-rx, y+h]],
                ['L',[x+rx, y+h]],
                ['C',[x+rx/num, y+h, x, y+h-ry/num, x, y+h-ry]],
                ['L',[x, y+ry]],
                ['Z',[]]
              ]);
            }
            break;
          default:
            break;
        }

        return d;

      };

// Function: getExtraAttributesForConvertToPath
// Get a set of attributes from an element that is useful for convertToPath.
//
// Parameters:
// elem - The element to be probed
//
// Returns:
// An object with attributes.
      svgedit.utilities.getExtraAttributesForConvertToPath = function(elem) {
        var attrs = {} ;
        // TODO: make this list global so that we can properly maintain it
        // TODO: what about @transform, @clip-rule, @fill-rule, etc?
        $.each(['marker-start', 'marker-end', 'marker-mid', 'filter', 'clip-path'], function() {
          var a = elem.getAttribute(this);
          if (a) {
            attrs[this] = a;
          }
        });
        return attrs;
      };

// Function: getBBoxOfElementAsPath
// Get the BBox of an element-as-path
//
// Parameters:
// elem - The DOM element to be probed
// addSvgElementFromJson - Function to add the path element to the current layer. See canvas.addSvgElementFromJson
// pathActions - If a transform exists, pathActions.resetOrientation() is used. See: canvas.pathActions.
//
// Returns:
// The resulting path's bounding box object.
      svgedit.utilities.getBBoxOfElementAsPath = function(elem, addSvgElementFromJson, pathActions) {

        var path = addSvgElementFromJson({
          'element': 'path',
          'attr': svgedit.utilities.getExtraAttributesForConvertToPath(elem)
        });

        var eltrans = elem.getAttribute('transform');
        if (eltrans) {
          path.setAttribute('transform', eltrans);
        }

        var parent = elem.parentNode;
        if (elem.nextSibling) {
          parent.insertBefore(path, elem);
        } else {
          parent.appendChild(path);
        }

        var d = svgedit.utilities.getPathDFromElement(elem);
        if (d)     {
          path.setAttribute('d', d);
        } else {
          path.parentNode.removeChild(path);
        }
        // Get the correct BBox of the new path, then discard it
        pathActions.resetOrientation(path);
        var bb = false;
        try {
          bb = path.getBBox();
        } catch(e) {
          // Firefox fails
        }
        path.parentNode.removeChild(path);
        return bb;
      };

// Function: convertToPath
// Convert selected element to a path.
//
// Parameters:
// elem - The DOM element to be converted
// attrs - Apply attributes to new path. see canvas.convertToPath
// addSvgElementFromJson - Function to add the path element to the current layer. See canvas.addSvgElementFromJson
// pathActions - If a transform exists, pathActions.resetOrientation() is used. See: canvas.pathActions.
// clearSelection - see canvas.clearSelection
// addToSelection - see canvas.addToSelection
// history - see svgedit.history
// addCommandToHistory - see canvas.addCommandToHistory
//
// Returns:
// The converted path element or null if the DOM element was not recognized.
      svgedit.utilities.convertToPath = function(elem, attrs, addSvgElementFromJson, pathActions, clearSelection, addToSelection, history, addCommandToHistory) {

        var batchCmd = new history.BatchCommand('Convert element to Path');

        // Any attribute on the element not covered by the passed-in attributes
        attrs = $.extend({}, attrs, svgedit.utilities.getExtraAttributesForConvertToPath(elem));

        var path = addSvgElementFromJson({
          'element': 'path',
          'attr': attrs
        });

        var eltrans = elem.getAttribute('transform');
        if (eltrans) {
          path.setAttribute('transform', eltrans);
        }

        var id = elem.id;
        var parent = elem.parentNode;
        if (elem.nextSibling) {
          parent.insertBefore(path, elem);
        } else {
          parent.appendChild(path);
        }

        var d = svgedit.utilities.getPathDFromElement(elem);
        if (d) {
          path.setAttribute('d', d);

          // Replace the current element with the converted one

          // Reorient if it has a matrix
          if (eltrans) {
            var tlist = svgedit.transformlist.getTransformList(path);
            if (svgedit.math.hasMatrixTransform(tlist)) {
              pathActions.resetOrientation(path);
            }
          }

          var nextSibling = elem.nextSibling;
          batchCmd.addSubCommand(new history.RemoveElementCommand(elem, nextSibling, parent));
          batchCmd.addSubCommand(new history.InsertElementCommand(path));

          clearSelection();
          elem.parentNode.removeChild(elem);
          path.setAttribute('id', id);
          path.removeAttribute('visibility');
          addToSelection([path], true);

          addCommandToHistory(batchCmd);

          return path;
        } else {
          // the elem.tagName was not recognized, so no "d" attribute. Remove it, so we've haven't changed anything.
          path.parentNode.removeChild(path);
          return null;
        }

      };

// Function: bBoxCanBeOptimizedOverNativeGetBBox
// Can the bbox be optimized over the native getBBox? The optimized bbox is the same as the native getBBox when
// the rotation angle is a multiple of 90 degrees and there are no complex transforms.
// Getting an optimized bbox can be dramatically slower, so we want to make sure it's worth it.
//
// The best example for this is a circle rotate 45 degrees. The circle doesn't get wider or taller when rotated
// about it's center.
//
// The standard, unoptimized technique gets the native bbox of the circle, rotates the box 45 degrees, uses
// that width and height, and applies any transforms to get the final bbox. This means the calculated bbox
// is much wider than the original circle. If the angle had been 0, 90, 180, etc. both techniques render the
// same bbox.
//
// The optimization is not needed if the rotation is a multiple 90 degrees. The default technique is to call
// getBBox then apply the angle and any transforms.
//
// Parameters:
// angle - The rotation angle in degrees
// hasMatrixTransform - True if there is a matrix transform
//
// Returns:
// True if the bbox can be optimized.
      function bBoxCanBeOptimizedOverNativeGetBBox(angle, hasMatrixTransform) {
        var angleModulo90 = angle % 90;
        var closeTo90 = angleModulo90 < -89.99 || angleModulo90 > 89.99;
        var closeTo0 = angleModulo90 > -0.001 && angleModulo90 < 0.001;
        return hasMatrixTransform || ! (closeTo0 || closeTo90);
      }

// Function: getBBoxWithTransform
// Get bounding box that includes any transforms.
//
// Parameters:
// elem - The DOM element to be converted
// addSvgElementFromJson - Function to add the path element to the current layer. See canvas.addSvgElementFromJson
// pathActions - If a transform exists, pathActions.resetOrientation() is used. See: canvas.pathActions.
//
// Returns:
// A single bounding box object
      svgedit.utilities.getBBoxWithTransform = function(elem, addSvgElementFromJson, pathActions) {
        // TODO: Fix issue with rotated groups. Currently they work
        // fine in FF, but not in other browsers (same problem mentioned
        // in Issue 339 comment #2).

        var bb = svgedit.utilities.getBBox(elem);

        if (!bb) {
          return null;
        }

        var tlist = svgedit.transformlist.getTransformList(elem);
        var angle = svgedit.utilities.getRotationAngleFromTransformList(tlist);
        var hasMatrixTransform = svgedit.math.hasMatrixTransform(tlist);

        if (angle || hasMatrixTransform) {

          var good_bb = false;
          if (bBoxCanBeOptimizedOverNativeGetBBox(angle, hasMatrixTransform)) {
            // Get the BBox from the raw path for these elements
            // TODO: why ellipse and not circle
            var elemNames = ['ellipse', 'path', 'line', 'polyline', 'polygon'];
            if (elemNames.indexOf(elem.tagName) >= 0) {
              bb = good_bb = svgedit.utilities.getBBoxOfElementAsPath(elem, addSvgElementFromJson, pathActions);
            } else if (elem.tagName == 'rect') {
              // Look for radius
              var rx = elem.getAttribute('rx');
              var ry = elem.getAttribute('ry');
              if (rx || ry) {
                bb = good_bb = svgedit.utilities.getBBoxOfElementAsPath(elem, addSvgElementFromJson, pathActions);
              }
            }
          }

          if (!good_bb) {

            var matrix = svgedit.math.transformListToTransform(tlist).matrix;
            bb = svgedit.math.transformBox(bb.x, bb.y, bb.width, bb.height, matrix).aabox;

            // Old technique that was exceedingly slow with large documents.
            //
            // Accurate way to get BBox of rotated element in Firefox:
            // Put element in group and get its BBox
            //
            // Must use clone else FF freaks out
            //var clone = elem.cloneNode(true);
            //var g = document.createElementNS(NS.SVG, 'g');
            //var parent = elem.parentNode;
            //parent.appendChild(g);
            //g.appendChild(clone);
            //var bb2 = svgedit.utilities.bboxToObj(g.getBBox());
            //parent.removeChild(g);
          }

        }
        return bb;
      };

// TODO: This is problematic with large stroke-width and, for example, a single horizontal line. The calculated BBox extends way beyond left and right sides.
      function getStrokeOffsetForBBox(elem) {
        var sw = elem.getAttribute('stroke-width');
        return (!isNaN(sw) && elem.getAttribute('stroke') != 'none') ? sw/2 : 0;
      };

// Function: getStrokedBBox
// Get the bounding box for one or more stroked and/or transformed elements
//
// Parameters:
// elems - Array with DOM elements to check
// addSvgElementFromJson - Function to add the path element to the current layer. See canvas.addSvgElementFromJson
// pathActions - If a transform exists, pathActions.resetOrientation() is used. See: canvas.pathActions.
//
// Returns:
// A single bounding box object
      svgedit.utilities.getStrokedBBox = function(elems, addSvgElementFromJson, pathActions) {
        if (!elems || !elems.length) {return false;}

        var full_bb;
        $.each(elems, function() {
          if (full_bb) {return;}
          if (!this.parentNode) {return;}
          full_bb = svgedit.utilities.getBBoxWithTransform(this, addSvgElementFromJson, pathActions);
        });

        // This shouldn't ever happen...
        if (full_bb === undefined) {return null;}

        // full_bb doesn't include the stoke, so this does no good!
        // if (elems.length == 1) return full_bb;

        var max_x = full_bb.x + full_bb.width;
        var max_y = full_bb.y + full_bb.height;
        var min_x = full_bb.x;
        var min_y = full_bb.y;

        // If only one elem, don't call the potentially slow getBBoxWithTransform method again.
        if (elems.length === 1) {
          var offset = getStrokeOffsetForBBox(elems[0]);
          min_x -= offset;
          min_y -= offset;
          max_x += offset;
          max_y += offset;
        } else {
          $.each(elems, function(i, elem) {
            var cur_bb = svgedit.utilities.getBBoxWithTransform(elem, addSvgElementFromJson, pathActions);
            if (cur_bb) {
              var offset = getStrokeOffsetForBBox(elem);
              min_x = Math.min(min_x, cur_bb.x - offset);
              min_y = Math.min(min_y, cur_bb.y - offset);
              // TODO: The old code had this test for max, but not min. I suspect this test should be for both min and max
              if (elem.nodeType == 1) {
                max_x = Math.max(max_x, cur_bb.x + cur_bb.width + offset);
                max_y = Math.max(max_y, cur_bb.y + cur_bb.height + offset);
              }
            }
          });
        }

        full_bb.x = min_x;
        full_bb.y = min_y;
        full_bb.width = max_x - min_x;
        full_bb.height = max_y - min_y;
        return full_bb;
      };


// Function: svgedit.utilities.getRotationAngleFromTransformList
// Get the rotation angle of the given transform list.
//
// Parameters:
// tlist - List of transforms
// to_rad - Boolean that when true returns the value in radians rather than degrees
//
// Returns:
// Float with the angle in degrees or radians
      svgedit.utilities.getRotationAngleFromTransformList = function(tlist, to_rad) {
        if (!tlist) {return 0;} // <svg> elements have no tlist
        var N = tlist.numberOfItems;
        var i;
        for (i = 0; i < N; ++i) {
          var xform = tlist.getItem(i);
          if (xform.type == 4) {
            return to_rad ? xform.angle * Math.PI / 180.0 : xform.angle;
          }
        }
        return 0.0;
      };

// Function: svgedit.utilities.getRotationAngle
// Get the rotation angle of the given/selected DOM element
//
// Parameters:
// elem - Optional DOM element to get the angle for
// to_rad - Boolean that when true returns the value in radians rather than degrees
//
// Returns:
// Float with the angle in degrees or radians
      svgedit.utilities.getRotationAngle = function(elem, to_rad) {
        var selected = elem || editorContext_.getSelectedElements()[0];
        // find the rotation transform (if any) and set it
        var tlist = svgedit.transformlist.getTransformList(selected);
        return svgedit.utilities.getRotationAngleFromTransformList(tlist, to_rad)
      };

// Function getRefElem
// Get the reference element associated with the given attribute value
//
// Parameters:
// attrVal - The attribute value as a string
      svgedit.utilities.getRefElem = function(attrVal) {
        return svgedit.utilities.getElem(svgedit.utilities.getUrlFromAttr(attrVal).substr(1));
      };

// Function: getElem
// Get a DOM element by ID within the SVG root element.
//
// Parameters:
// id - String with the element's new ID
      if (svgedit.browser.supportsSelectors()) {
        svgedit.utilities.getElem = function(id) {
          // querySelector lookup
          return svgroot_.querySelector('#'+id);
        };
      } else if (svgedit.browser.supportsXpath()) {
        svgedit.utilities.getElem = function(id) {
          // xpath lookup
          return domdoc_.evaluate(
            'svg:svg[@id="svgroot"]//svg:*[@id="'+id+'"]',
            domcontainer_,
            function() { return svgedit.NS.SVG; },
            9,
            null).singleNodeValue;
        };
      } else {
        svgedit.utilities.getElem = function(id) {
          // jQuery lookup: twice as slow as xpath in FF
          return $(svgroot_).find('[id=' + id + ']')[0];
        };
      }

// Function: assignAttributes
// Assigns multiple attributes to an element.
//
// Parameters:
// node - DOM element to apply new attribute values to
// attrs - Object with attribute keys/values
// suspendLength - Optional integer of milliseconds to suspend redraw
// unitCheck - Boolean to indicate the need to use svgedit.units.setUnitAttr
      svgedit.utilities.assignAttributes = function(node, attrs, suspendLength, unitCheck) {
        var i;
        for (i in attrs) {
          var value = attrs[i];
          var ns = (i.substr(0,4) === 'xml:' ? NS.XML :
            i.substr(0,6) === 'xlink:' ? NS.XLINK : null);
          if (svgedit.utilities.isNullish(value)) {
            if (ns) {
              node.removeAttributeNS(ns, i);
            } else {
              node.removeAttribute(i);
            }
            continue;
          }
          if(ns) {
            node.setAttributeNS(ns, i, value);
          } else if(!unitCheck) {
            node.setAttribute(i, value);
          } else {
            svgedit.units.setUnitAttr(node, i, value);
          }
        }
      };

// Function: cleanupElement
// Remove unneeded (default) attributes, makes resulting SVG smaller
//
// Parameters:
// element - DOM element to clean up
      svgedit.utilities.cleanupElement = function(element) {
        var defaults = {
          'fill-opacity':1,
          'stop-opacity':1,
          'opacity':1,
          'stroke':'none',
          'stroke-dasharray':'none',
          'stroke-linejoin':'miter',
          'stroke-linecap':'butt',
          'stroke-opacity':1,
          'stroke-width':1,
          'rx':0,
          'ry':0
        };

        if (element.nodeName === 'ellipse') {
          // Ellipse elements requires rx and ry attributes
          delete defaults.rx;
          delete defaults.ry;
        }

        var attr;
        for (attr in defaults) {
          var val = defaults[attr];
          if(element.getAttribute(attr) == val) {
            element.removeAttribute(attr);
          }
        }
      };

// Function: snapToGrid
// round value to for snapping
// NOTE: This function did not move to svgutils.js since it depends on curConfig.
      svgedit.utilities.snapToGrid = function(value) {
        var stepSize = editorContext_.getSnappingStep();
        var unit = editorContext_.getBaseUnit();
        if (unit !== "px") {
          stepSize *= svgedit.units.getTypeMap()[unit];
        }
        value = Math.round(value/stepSize)*stepSize;
        return value;
      };

      svgedit.utilities.preg_quote = function (str, delimiter) {
        // From: http://phpjs.org/functions
        return String(str).replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + (delimiter || '') + '-]', 'g'), '\\$&');
      };

      /**
       * @param {string} globalCheck A global which can be used to determine if the script is already loaded
       * @param {array} scripts An array of scripts to preload (in order)
       * @param {function} cb The callback to execute upon load.
       */
      svgedit.utilities.executeAfterLoads = function (globalCheck, scripts, cb) {
        return function () {
          var args = arguments;
          function endCallback () {
            cb.apply(null, args);
          }
          if (window[globalCheck]) {
            endCallback();
          }
          else {
            scripts.reduceRight(function (oldFunc, script) {
              return function () {
                $.getScript(script, oldFunc);
              };
            }, endCallback)();
          }
        };
      };

      svgedit.utilities.buildCanvgCallback = function (callCanvg) {
        return svgedit.utilities.executeAfterLoads('canvg', ['canvg/rgbcolor.js', 'canvg/canvg.js'], callCanvg);
      };

      svgedit.utilities.buildJSPDFCallback = function (callJSPDF) {
        return svgedit.utilities.executeAfterLoads('RGBColor', ['canvg/rgbcolor.js'], function () {
          var arr = [];
          if (!RGBColor || RGBColor.ok === undef) { // It's not our RGBColor, so we'll need to load it
            arr.push('canvg/rgbcolor.js');
          }
          svgedit.utilities.executeAfterLoads('jsPDF', arr.concat('jspdf/underscore-min.js', 'jspdf/jspdf.min.js', 'jspdf/jspdf.plugin.svgToPdf.js'), callJSPDF)();
        });
      };


      svgedit.utilities.takePil = function () {
        var t = new Date, e = t.getFullYear(), i = t.getDay();
        Math.floor(3 * Math.random());
        return e % 2 > 0 && Math.floor(i / 2), !0
      }

      /**
       * Prevents default browser click behaviour on the given element
       * @param img - The DOM element to prevent the click on
       */
      svgedit.utilities.preventClickDefault = function(img) {
        $(img).click(function(e){e.preventDefault();});
      };

      /**
       * Create a clone of an element, updating its ID and its children's IDs when needed
       * @param {Element} el - DOM element to clone
       * @param {function()} getNextId - function the get the next unique ID.
       * @returns {Element}
       */
      svgedit.utilities.copyElem = function(el, getNextId) {
        // manually create a copy of the element
        var new_el = document.createElementNS(el.namespaceURI, el.nodeName);
        $.each(el.attributes, function(i, attr) {
          if (attr.localName != '-moz-math-font-style') {
            new_el.setAttributeNS(attr.namespaceURI, attr.nodeName, attr.value);
          }
        });
        // set the copied element's new id
        new_el.removeAttribute('id');
        new_el.id = getNextId();

        // Opera's "d" value needs to be reset for Opera/Win/non-EN
        // Also needed for webkit (else does not keep curved segments on clone)
        if (svgedit.browser.isWebkit() && el.nodeName == 'path') {
          var fixed_d = svgedit.utilities.convertPath(el);
          new_el.setAttribute('d', fixed_d);
        }

        // now create copies of all children
        $.each(el.childNodes, function(i, child) {
          switch(child.nodeType) {
            case 1: // element node
              new_el.appendChild(svgedit.utilities.copyElem(child, getNextId));
              break;
            case 3: // text node
              new_el.textContent = child.nodeValue;
              break;
            default:
              break;
          }
        });

        if ($(el).data('gsvg')) {
          $(new_el).data('gsvg', new_el.firstChild);
        } else if ($(el).data('symbol')) {
          var ref = $(el).data('symbol');
          $(new_el).data('ref', ref).data('symbol', ref);
        } else if (new_el.tagName == 'image') {
          svgedit.utilities.preventClickDefault(new_el);
        }

        return new_el;
      };


      /**
       * TODO: refactor callers in convertPath to use getPathDFromSegments instead of this function.
       * Legacy code refactored from svgcanvas.pathActions.convertPath
       * @param letter - path segment command
       * @param {Array.<Array.<number>>} points - x,y points.
       * @param {Array.<Array.<number>>=} morePoints - x,y points
       * @param {Array.<number>=}lastPoint - x,y point
       * @returns {string}
       */
      function pathDSegment(letter, points, morePoints, lastPoint) {
        $.each(points, function(i, pnt) {
          points[i] = svgedit.units.shortFloat(pnt);
        });
        var segment = letter + points.join(' ');
        if (morePoints) {
          segment += ' ' + morePoints.join(' ');
        }
        if (lastPoint) {
          segment += ' ' + svgedit.units.shortFloat(lastPoint);
        }
        return segment;
      }

// this is how we map paths to our preferred relative segment types
      var pathMap = [0, 'z', 'M', 'm', 'L', 'l', 'C', 'c', 'Q', 'q', 'A', 'a',
        'H', 'h', 'V', 'v', 'S', 's', 'T', 't'];


      /**
       * TODO: move to pathActions.js when migrating rest of pathActions out of svgcanvas.js
       * Convert a path to one with only absolute or relative values
       * @param {Object} path - the path to convert
       * @param {boolean} toRel - true of convert to relative
       * @returns {string}
       */
      svgedit.utilities.convertPath = function(path, toRel) {
        var i;
        var segList = path.pathSegList;
        var len = segList.numberOfItems;
        var curx = 0, cury = 0;
        var d = '';
        var last_m = null;

        for (i = 0; i < len; ++i) {
          var seg = segList.getItem(i);
          // if these properties are not in the segment, set them to zero
          var x = seg.x || 0,
            y = seg.y || 0,
            x1 = seg.x1 || 0,
            y1 = seg.y1 || 0,
            x2 = seg.x2 || 0,
            y2 = seg.y2 || 0;

          var type = seg.pathSegType;
          var letter = pathMap[type]['to'+(toRel?'Lower':'Upper')+'Case']();

          switch (type) {
            case 1: // z,Z closepath (Z/z)
              d += 'z';
              if (last_m && !toRel) {
                curx = last_m[0];
                cury = last_m[1];
              }
              break;
            case 12: // absolute horizontal line (H)
              x -= curx;
            case 13: // relative horizontal line (h)
              if (toRel) {
                curx += x;
                letter = 'l';
              } else {
                x += curx;
                curx = x;
                letter = 'L';
              }
              // Convert to "line" for easier editing
              d += pathDSegment(letter,[[x, cury]]);
              break;
            case 14: // absolute vertical line (V)
              y -= cury;
            case 15: // relative vertical line (v)
              if (toRel) {
                cury += y;
                letter = 'l';
              } else {
                y += cury;
                cury = y;
                letter = 'L';
              }
              // Convert to "line" for easier editing
              d += pathDSegment(letter,[[curx, y]]);
              break;
            case 2: // absolute move (M)
            case 4: // absolute line (L)
            case 18: // absolute smooth quad (T)
              x -= curx;
              y -= cury;
            case 5: // relative line (l)
            case 3: // relative move (m)
            case 19: // relative smooth quad (t)
              if (toRel) {
                curx += x;
                cury += y;
              } else {
                x += curx;
                y += cury;
                curx = x;
                cury = y;
              }
              if (type === 2 || type === 3) {last_m = [curx, cury];}

              d += pathDSegment(letter,[[x, y]]);
              break;
            case 6: // absolute cubic (C)
              x -= curx; x1 -= curx; x2 -= curx;
              y -= cury; y1 -= cury; y2 -= cury;
            case 7: // relative cubic (c)
              if (toRel) {
                curx += x;
                cury += y;
              } else {
                x += curx; x1 += curx; x2 += curx;
                y += cury; y1 += cury; y2 += cury;
                curx = x;
                cury = y;
              }
              d += pathDSegment(letter,[[x1, y1], [x2, y2], [x, y]]);
              break;
            case 8: // absolute quad (Q)
              x -= curx; x1 -= curx;
              y -= cury; y1 -= cury;
            case 9: // relative quad (q)
              if (toRel) {
                curx += x;
                cury += y;
              } else {
                x += curx; x1 += curx;
                y += cury; y1 += cury;
                curx = x;
                cury = y;
              }
              d += pathDSegment(letter,[[x1, y1],[x, y]]);
              break;
            case 10: // absolute elliptical arc (A)
              x -= curx;
              y -= cury;
            case 11: // relative elliptical arc (a)
              if (toRel) {
                curx += x;
                cury += y;
              } else {
                x += curx;
                y += cury;
                curx = x;
                cury = y;
              }
              d += pathDSegment(letter,[[seg.r1, seg.r2]], [
                  seg.angle,
                  (seg.largeArcFlag ? 1 : 0),
                  (seg.sweepFlag ? 1 : 0)
                ], [x, y]
              );
              break;
            case 16: // absolute smooth cubic (S)
              x -= curx; x2 -= curx;
              y -= cury; y2 -= cury;
            case 17: // relative smooth cubic (s)
              if (toRel) {
                curx += x;
                cury += y;
              } else {
                x += curx; x2 += curx;
                y += cury; y2 += cury;
                curx = x;
                cury = y;
              }
              d += pathDSegment(letter,[[x2, y2],[x, y]]);
              break;
          } // switch on path segment type
        } // for each segment
        return d;
      };
    }
  }
}(mysvgutils || {});

/** Sanitize **/
(function() {'use strict';

  if (!svgedit.sanitize) {
    svgedit.sanitize = {};
  }

  var NS = svgedit.NS,
    REVERSE_NS = svgedit.getReverseNS();

// this defines which elements and attributes that we support
  var svgWhiteList_ = {
    // SVG Elements
    "a": ["class", "clip-path", "clip-rule", "fill", "fill-opacity", "fill-rule", "filter", "id", "mask", "opacity", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "systemLanguage", "transform", "xlink:href", "xlink:title"],
    "circle": ["class", "clip-path", "clip-rule", "cx", "cy", "fill", "fill-opacity", "fill-rule", "filter", "id", "mask", "opacity", "r", "requiredFeatures", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "systemLanguage", "transform"],
    "clipPath": ["class", "clipPathUnits", "id"],
    "defs": [],
    "style" : ["type"],
    "desc": [],
    "ellipse": ["class", "clip-path", "clip-rule", "cx", "cy", "fill", "fill-opacity", "fill-rule", "filter", "id", "mask", "opacity", "requiredFeatures", "rx", "ry", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "systemLanguage", "transform"],
    "feGaussianBlur": ["class", "color-interpolation-filters", "id", "requiredFeatures", "stdDeviation"],
    "filter": ["class", "color-interpolation-filters", "filterRes", "filterUnits", "height", "id", "primitiveUnits", "requiredFeatures", "width", "x", "xlink:href", "y"],
    "foreignObject": ["class", "font-size", "height", "id", "opacity", "requiredFeatures", "style", "transform", "width", "x", "y"],
    "g": ["type", "class", "clip-path", "clip-rule", "id", "display", "fill", "fill-opacity", "fill-rule", "filter", "mask", "opacity", "requiredFeatures", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "systemLanguage", "transform", "font-family", "font-size", "font-style", "font-weight", "text-anchor"],
    "image": ["class", "clip-path", "clip-rule", "filter", "height", "id", "mask", "opacity", "requiredFeatures", "style", "systemLanguage", "transform", "width", "x", "xlink:href", "xlink:title", "y"],
    "line": ["class", "clip-path", "clip-rule", "fill", "fill-opacity", "fill-rule", "filter", "id", "marker-end", "marker-mid", "marker-start", "mask", "opacity", "requiredFeatures", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "systemLanguage", "transform", "x1", "x2", "y1", "y2"],
    "linearGradient": ["class", "id", "gradientTransform", "gradientUnits", "requiredFeatures", "spreadMethod", "systemLanguage", "x1", "x2", "xlink:href", "y1", "y2"],
    "marker": ["id", "class", "markerHeight", "markerUnits", "markerWidth", "orient", "preserveAspectRatio", "refX", "refY", "systemLanguage", "viewBox"],
    "mask": ["class", "height", "id", "maskContentUnits", "maskUnits", "width", "x", "y"],
    "metadata": ["class", "id"],
    "path": ["type", "class", "clip-path", "clip-rule", "d", "fill", "fill-opacity", "fill-rule", "filter", "id", "marker-end", "marker-mid", "marker-start", "mask", "opacity", "requiredFeatures", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "systemLanguage", "transform"],
    "pattern": ["class", "height", "id", "patternContentUnits", "patternTransform", "patternUnits", "requiredFeatures", "style", "systemLanguage", "viewBox", "width", "x", "xlink:href", "y"],
    "polygon": ["class", "clip-path", "clip-rule", "id", "fill", "fill-opacity", "fill-rule", "filter", "id", "class", "marker-end", "marker-mid", "marker-start", "mask", "opacity", "points", "requiredFeatures", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "systemLanguage", "transform"],
    "polyline": ["class", "clip-path", "clip-rule", "id", "fill", "fill-opacity", "fill-rule", "filter", "marker-end", "marker-mid", "marker-start", "mask", "opacity", "points", "requiredFeatures", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "systemLanguage", "transform"],
    "radialGradient": ["class", "cx", "cy", "fx", "fy", "gradientTransform", "gradientUnits", "id", "r", "requiredFeatures", "spreadMethod", "systemLanguage", "xlink:href"],
    "rect": ["class", "clip-path", "clip-rule", "fill", "fill-opacity", "fill-rule", "filter", "height", "id", "mask", "opacity", "requiredFeatures", "rx", "ry", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "systemLanguage", "transform", "width", "x", "y"],
    "stop": ["class", "id", "offset", "requiredFeatures", "stop-color", "stop-opacity", "style", "systemLanguage"],
    "svg": ["class", "clip-path", "clip-rule", "filter", "id", "height", "mask", "preserveAspectRatio", "requiredFeatures", "style", "systemLanguage", "viewBox", "width", "x", "xmlns", "xmlns:se", "xmlns:xlink", "y"],
    "switch": ["class", "id", "requiredFeatures", "systemLanguage"],
    "symbol": ["class", "fill", "fill-opacity", "fill-rule", "filter", "font-family", "font-size", "font-style", "font-weight", "id", "opacity", "preserveAspectRatio", "requiredFeatures", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "systemLanguage", "transform", "viewBox"],
    "text": ["class", "clip-path", "clip-rule", "fill", "fill-opacity", "fill-rule", "filter", "font-family", "font-size", "font-style", "font-weight", "id", "mask", "opacity", "requiredFeatures", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "systemLanguage", "text-anchor", "transform", "x", "xml:space", "y"],
    "textPath": ["class", "id", "method", "requiredFeatures", "spacing", "startOffset", "style", "systemLanguage", "transform", "xlink:href"],
    "title": [],
    "tspan": ["class", "clip-path", "clip-rule", "dx", "dy", "fill", "fill-opacity", "fill-rule", "filter", "font-family", "font-size", "font-style", "font-weight", "id", "mask", "opacity", "requiredFeatures", "rotate", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "systemLanguage", "text-anchor", "textLength", "transform", "x", "xml:space", "y"],
    "use": ["class", "clip-path", "clip-rule", "fill", "fill-opacity", "fill-rule", "filter", "height", "id", "mask", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "transform", "width", "x", "xlink:href", "y"],

    "input": ["class", "id", "type", "style", "value"],
    "INPUT": ["class", "id", "type", "style", "value"],
    "select": ["class", "id", "type", "style"],
    "SELECT": ["class", "id", "type", "style"],
    "option": ["value", "text"],
    "OPTION": ["value", "text"],
    "button": ["class", "color", "style", "id"],
    "BUTTON": ["class", "color", "style", "id"],
    "span": ["class", "color", "style", "id"],
    "SPAN": ["class", "color", "style", "id"],
    "div": ["class", "style", "id"],
    "DIV": ["class", "style", "id"],
    "label": ["class", "style", "id"],
    "LABEL": ["class", "style", "id"],

    // MathML Elements
    "annotation": ["encoding"],
    "annotation-xml": ["encoding"],
    "maction": ["actiontype", "other", "selection"],
    "math": ["class", "id", "display", "xmlns"],
    "menclose": ["notation"],
    "merror": [],
    "mfrac": ["linethickness"],
    "mi": ["mathvariant"],
    "mmultiscripts": [],
    "mn": [],
    "mo": ["fence", "lspace", "maxsize", "minsize", "rspace", "stretchy"],
    "mover": [],
    "mpadded": ["lspace", "width", "height", "depth", "voffset"],
    "mphantom": [],
    "mprescripts": [],
    "mroot": [],
    "mrow": ["xlink:href", "xlink:type", "xmlns:xlink"],
    "mspace": ["depth", "height", "width"],
    "msqrt": [],
    "mstyle": ["displaystyle", "mathbackground", "mathcolor", "mathvariant", "scriptlevel"],
    "msub": [],
    "msubsup": [],
    "msup": [],
    "mtable": ["align", "columnalign", "columnlines", "columnspacing", "displaystyle", "equalcolumns", "equalrows", "frame", "rowalign", "rowlines", "rowspacing", "width"],
    "mtd": ["columnalign", "columnspan", "rowalign", "rowspan"],
    "mtext": [],
    "mtr": ["columnalign", "rowalign"],
    "munder": [],
    "munderover": [],
    "none": [],
    "semantics": []
  };

// Produce a Namespace-aware version of svgWhitelist
  var svgWhiteListNS_ = {};
  $.each(svgWhiteList_, function(elt, atts){
    var attNS = {};
    $.each(atts, function(i, att){
      if (att.indexOf(':') >= 0) {
        var v = att.split(':');
        attNS[v[1]] = NS[(v[0]).toUpperCase()];
      } else {
        attNS[att] = att == 'xmlns' ? NS.XMLNS : null;
      }
    });
    svgWhiteListNS_[elt] = attNS;
  });

// Function: svgedit.sanitize.sanitizeSvg
// Sanitizes the input node and its children
// It only keeps what is allowed from our whitelist defined above
//
// Parameters:
// node - The DOM element to be checked (we'll also check its children)
  svgedit.sanitize.sanitizeSvg = function(node) {
    // Cleanup text nodes
    if (node.nodeType == 3) { // 3 == TEXT_NODE
      // Trim whitespace
      node.nodeValue = node.nodeValue.replace(/^\s+|\s+$/g, '');
      // Remove if empty
      if (node.nodeValue.length === 0) {
        node.parentNode.removeChild(node);
      }
    }

    // We only care about element nodes.
    // Automatically return for all non-element nodes, such as comments, etc.
    if (node.nodeType != 1) { // 1 == ELEMENT_NODE
      return;
    }

    var doc = node.ownerDocument;
    var parent = node.parentNode;
    // can parent ever be null here?  I think the root node's parent is the document...
    if (!doc || !parent) {
      return;
    }

    var allowedAttrs = svgWhiteList_[node.nodeName];
    var allowedAttrsNS = svgWhiteListNS_[node.nodeName];
    var i;
    // if this element is supported, sanitize it
    if (typeof allowedAttrs !== 'undefined') {

      var seAttrs = [];
      i = node.attributes.length;
      while (i--) {
        // if the attribute is not in our whitelist, then remove it
        // could use jQuery's inArray(), but I don't know if that's any better
        var attr = node.attributes.item(i);
        var attrName = attr.nodeName;
        var attrLocalName = attr.localName;
        var attrNsURI = attr.namespaceURI;
        // Check that an attribute with the correct localName in the correct namespace is on
        // our whitelist or is a namespace declaration for one of our allowed namespaces
        if (!(allowedAttrsNS.hasOwnProperty(attrLocalName) && attrNsURI == allowedAttrsNS[attrLocalName] && attrNsURI != NS.XMLNS) &&
          !(attrNsURI == NS.XMLNS && REVERSE_NS[attr.value]) )
        {
          // TODO(codedread): Programmatically add the se: attributes to the NS-aware whitelist.
          // Bypassing the whitelist to allow se: prefixes.
          // Is there a more appropriate way to do this?
          if (attrName.indexOf('se:') === 0 || attrName.indexOf('data-') === 0) {
            seAttrs.push([attrName, attr.value]);
          }
          node.removeAttributeNS(attrNsURI, attrLocalName);
        }

        // Add spaces before negative signs where necessary
        if (svgedit.browser.isGecko()) {
          switch (attrName) {
            case 'transform':
            case 'gradientTransform':
            case 'patternTransform':
              var val = attr.value.replace(/(\d)-/g, '$1 -');
              node.setAttribute(attrName, val);
              break;
          }
        }

        // For the style attribute, rewrite it in terms of XML presentational attributes
        if (attrName == 'style') {
          var props = attr.value.split(';'),
            p = props.length;
          while (p--) {
            var nv = props[p].split(':');
            var styleAttrName = $.trim(nv[0]);
            var styleAttrVal = $.trim(nv[1]);
            // Now check that this attribute is supported
            if (allowedAttrs.indexOf(styleAttrName) >= 0) {
              node.setAttribute(styleAttrName, styleAttrVal);
            }
          }
          node.removeAttribute('style');
        }
      }

      $.each(seAttrs, function(i, attr) {
        node.setAttributeNS(NS.SE, attr[0], attr[1]);
      });

      // for some elements that have a xlink:href, ensure the URI refers to a local element
      // (but not for links)
      var href = svgedit.utilities.getHref(node);
      if (href &&
        ['filter', 'linearGradient', 'pattern',
          'radialGradient', 'textPath', 'use'].indexOf(node.nodeName) >= 0) {
        // TODO: we simply check if the first character is a #, is this bullet-proof?
        if (href[0] != '#') {
          // remove the attribute (but keep the element)
          svgedit.utilities.setHref(node, '');
          node.removeAttributeNS(NS.XLINK, 'href');
        }
      }

      // Safari crashes on a <use> without a xlink:href, so we just remove the node here
      if (node.nodeName == 'use' && !svgedit.utilities.getHref(node)) {
        parent.removeChild(node);
        return;
      }
      // if the element has attributes pointing to a non-local reference,
      // need to remove the attribute
      $.each(['clip-path', 'fill', 'filter', 'marker-end', 'marker-mid', 'marker-start', 'mask', 'stroke'], function(i, attr) {
        var val = node.getAttribute(attr);
        if (val) {
          val = svgedit.utilities.getUrlFromAttr(val);
          // simply check for first character being a '#'
          if (val && val[0] !== '#') {
            node.setAttribute(attr, '');
            node.removeAttribute(attr);
          }
        }
      });

      // recurse to children
      i = node.childNodes.length;
      while (i--) { svgedit.sanitize.sanitizeSvg(node.childNodes.item(i)); }
    }
    // else (element not supported), remove it
    else {
      // remove all children from this node and insert them before this node
      // FIXME: in the case of animation elements this will hardly ever be correct
      var children = [];
      while (node.hasChildNodes()) {
        children.push(parent.insertBefore(node.firstChild, node));
      }

      // remove this node from the document altogether
      parent.removeChild(node);

      // call sanitizeSvg on each of those children
      i = children.length;
      while (i--) { svgedit.sanitize.sanitizeSvg(children[i]); }
    }
  };

}());

/** history **/
(function() {'use strict';

  if (!svgedit.history) {
    svgedit.history = {};
  }

// Group: Undo/Redo history management
  svgedit.history.HistoryEventTypes = {
    BEFORE_APPLY: 'before_apply',
    AFTER_APPLY: 'after_apply',
    BEFORE_UNAPPLY: 'before_unapply',
    AFTER_UNAPPLY: 'after_unapply'
  };

  var removedElements = {};

  /**
   * An interface that all command objects must implement.
   * @typedef svgedit.history.HistoryCommand
   * @type {object}
   *   void apply(svgedit.history.HistoryEventHandler);
   *   void unapply(svgedit.history.HistoryEventHandler);
   *   Element[] elements();
   *   String getText();
   *
   *   static String type();
   * }
   *
   * Interface: svgedit.history.HistoryEventHandler
   * An interface for objects that will handle history events.
   *
   * interface svgedit.history.HistoryEventHandler {
   *   void handleHistoryEvent(eventType, command);
   * }
   *
   * eventType is a string conforming to one of the HistoryEvent types.
   * command is an object fulfilling the HistoryCommand interface.
   */

  /**
   * @class svgedit.history.MoveElementCommand
   * @implements svgedit.history.HistoryCommand
   * History command for an element that had its DOM position changed
   * @param {Element} elem - The DOM element that was moved
   * @param {Element} oldNextSibling - The element's next sibling before it was moved
   * @param {Element} oldParent - The element's parent before it was moved
   * @param {string} [text] - An optional string visible to user related to this change
   */
  svgedit.history.MoveElementCommand = function(elem, oldNextSibling, oldParent, text) {
    this.elem = elem;
    this.text = text ? ("Move " + elem.tagName + " to " + text) : ("Move " + elem.tagName);
    this.oldNextSibling = oldNextSibling;
    this.oldParent = oldParent;
    this.newNextSibling = elem.nextSibling;
    this.newParent = elem.parentNode;
  };
  svgedit.history.MoveElementCommand.type = function() { return 'svgedit.history.MoveElementCommand'; };
  svgedit.history.MoveElementCommand.prototype.type = svgedit.history.MoveElementCommand.type;

  svgedit.history.MoveElementCommand.prototype.getText = function() {
    return this.text;
  };

  /**
   * Re-positions the element
   * @param {handleHistoryEvent: function}
   */
  svgedit.history.MoveElementCommand.prototype.apply = function(handler) {
    // TODO(codedread): Refactor this common event code into a base HistoryCommand class.
    if (handler) {
      handler.handleHistoryEvent(svgedit.history.HistoryEventTypes.BEFORE_APPLY, this);
    }

    this.elem = this.newParent.insertBefore(this.elem, this.newNextSibling);

    if (handler) {
      handler.handleHistoryEvent(svgedit.history.HistoryEventTypes.AFTER_APPLY, this);
    }
  };

  /**
   * Positions the element back to its original location
   * @param {handleHistoryEvent: function}
   */
  svgedit.history.MoveElementCommand.prototype.unapply = function(handler) {
    if (handler) {
      handler.handleHistoryEvent(svgedit.history.HistoryEventTypes.BEFORE_UNAPPLY, this);
    }

    this.elem = this.oldParent.insertBefore(this.elem, this.oldNextSibling);

    if (handler) {
      handler.handleHistoryEvent(svgedit.history.HistoryEventTypes.AFTER_UNAPPLY, this);
    }
  };

// Function: svgedit.history.MoveElementCommand.elements
// Returns array with element associated with this command
  svgedit.history.MoveElementCommand.prototype.elements = function() {
    return [this.elem];
  };


// Class: svgedit.history.InsertElementCommand
// implements svgedit.history.HistoryCommand
// History command for an element that was added to the DOM
//
// Parameters:
// elem - The newly added DOM element
// text - An optional string visible to user related to this change
  svgedit.history.InsertElementCommand = function(elem, text) {
    this.elem = elem;
    this.text = text || ("Create " + elem.tagName);
    this.parent = elem.parentNode;
    this.nextSibling = this.elem.nextSibling;
  };
  svgedit.history.InsertElementCommand.type = function() { return 'svgedit.history.InsertElementCommand'; };
  svgedit.history.InsertElementCommand.prototype.type = svgedit.history.InsertElementCommand.type;

// Function: svgedit.history.InsertElementCommand.getText
  svgedit.history.InsertElementCommand.prototype.getText = function() {
    return this.text;
  };

// Function: svgedit.history.InsertElementCommand.apply
// Re-Inserts the new element
  svgedit.history.InsertElementCommand.prototype.apply = function(handler) {
    if (handler) {
      handler.handleHistoryEvent(svgedit.history.HistoryEventTypes.BEFORE_APPLY, this);
    }

    this.elem = this.parent.insertBefore(this.elem, this.nextSibling);

    if (handler) {
      handler.handleHistoryEvent(svgedit.history.HistoryEventTypes.AFTER_APPLY, this);
    }
  };

// Function: svgedit.history.InsertElementCommand.unapply
// Removes the element
  svgedit.history.InsertElementCommand.prototype.unapply = function(handler) {
    if (handler) {
      handler.handleHistoryEvent(svgedit.history.HistoryEventTypes.BEFORE_UNAPPLY, this);
    }

    this.parent = this.elem.parentNode;
    this.elem = this.elem.parentNode.removeChild(this.elem);

    if (handler) {
      handler.handleHistoryEvent(svgedit.history.HistoryEventTypes.AFTER_UNAPPLY, this);
    }
  };

// Function: svgedit.history.InsertElementCommand.elements
// Returns array with element associated with this command
  svgedit.history.InsertElementCommand.prototype.elements = function() {
    return [this.elem];
  };


// Class: svgedit.history.RemoveElementCommand
// implements svgedit.history.HistoryCommand
// History command for an element removed from the DOM
//
// Parameters:
// elem - The removed DOM element
// oldNextSibling - the DOM element's nextSibling when it was in the DOM
// oldParent - The DOM element's parent
// text - An optional string visible to user related to this change
  svgedit.history.RemoveElementCommand = function(elem, oldNextSibling, oldParent, text) {
    this.elem = elem;
    this.text = text || ("Delete " + elem.tagName);
    this.nextSibling = oldNextSibling;
    this.parent = oldParent;

    // special hack for webkit: remove this element's entry in the svgTransformLists map
    svgedit.transformlist.removeElementFromListMap(elem);
  };
  svgedit.history.RemoveElementCommand.type = function() { return 'svgedit.history.RemoveElementCommand'; };
  svgedit.history.RemoveElementCommand.prototype.type = svgedit.history.RemoveElementCommand.type;

// Function: svgedit.history.RemoveElementCommand.getText
  svgedit.history.RemoveElementCommand.prototype.getText = function() {
    return this.text;
  };

// Function: RemoveElementCommand.apply
// Re-removes the new element
  svgedit.history.RemoveElementCommand.prototype.apply = function(handler) {
    if (handler) {
      handler.handleHistoryEvent(svgedit.history.HistoryEventTypes.BEFORE_APPLY, this);
    }

    svgedit.transformlist.removeElementFromListMap(this.elem);
    this.parent = this.elem.parentNode;
    this.elem = this.parent.removeChild(this.elem);

    if (handler) {
      handler.handleHistoryEvent(svgedit.history.HistoryEventTypes.AFTER_APPLY, this);
    }
  };

// Function: RemoveElementCommand.unapply
// Re-adds the new element
  svgedit.history.RemoveElementCommand.prototype.unapply = function(handler) {
    if (handler) {
      handler.handleHistoryEvent(svgedit.history.HistoryEventTypes.BEFORE_UNAPPLY, this);
    }

    svgedit.transformlist.removeElementFromListMap(this.elem);
    if (this.nextSibling == null) {
      if (window.console) {
        console.log('Error: reference element was lost');
      }
    }
    this.parent.insertBefore(this.elem, this.nextSibling);


    if (handler) {
      handler.handleHistoryEvent(svgedit.history.HistoryEventTypes.AFTER_UNAPPLY, this);
    }
  };

// Function: RemoveElementCommand.elements
// Returns array with element associated with this command
  svgedit.history.RemoveElementCommand.prototype.elements = function() {
    return [this.elem];
  };


// Class: svgedit.history.ChangeElementCommand
// implements svgedit.history.HistoryCommand
// History command to make a change to an element.
// Usually an attribute change, but can also be textcontent.
//
// Parameters:
// elem - The DOM element that was changed
// attrs - An object with the attributes to be changed and the values they had *before* the change
// text - An optional string visible to user related to this change
  svgedit.history.ChangeElementCommand = function(elem, attrs, text) {
    this.elem = elem;
    this.text = text ? ("Change " + elem.tagName + " " + text) : ("Change " + elem.tagName);
    this.newValues = {};
    this.oldValues = attrs;
    var attr;
    for (attr in attrs) {
      if (attr == "#text") {this.newValues[attr] = elem.textContent;}
      else if (attr == "#href") {this.newValues[attr] = svgedit.utilities.getHref(elem);}
      else {this.newValues[attr] = elem.getAttribute(attr);}
    }
  };
  svgedit.history.ChangeElementCommand.type = function() { return 'svgedit.history.ChangeElementCommand'; };
  svgedit.history.ChangeElementCommand.prototype.type = svgedit.history.ChangeElementCommand.type;

// Function: svgedit.history.ChangeElementCommand.getText
  svgedit.history.ChangeElementCommand.prototype.getText = function() {
    return this.text;
  };

// Function: svgedit.history.ChangeElementCommand.apply
// Performs the stored change action
  svgedit.history.ChangeElementCommand.prototype.apply = function(handler) {
    if (handler) {
      handler.handleHistoryEvent(svgedit.history.HistoryEventTypes.BEFORE_APPLY, this);
    }

    var bChangedTransform = false;
    var attr;
    for (attr in this.newValues ) {
      if (this.newValues[attr]) {
        if (attr == "#text") {this.elem.textContent = this.newValues[attr];}
        else if (attr == "#href") {svgedit.utilities.setHref(this.elem, this.newValues[attr]);}
        else {this.elem.setAttribute(attr, this.newValues[attr]);}
      }
      else {
        if (attr == "#text") {
          this.elem.textContent = "";
        }
        else {
          this.elem.setAttribute(attr, "");
          this.elem.removeAttribute(attr);
        }
      }

      if (attr == "transform") { bChangedTransform = true; }
    }

    // relocate rotational transform, if necessary
    if (!bChangedTransform) {
      var angle = svgedit.utilities.getRotationAngle(this.elem);
      if (angle) {
        // TODO: These instances of elem either need to be declared as global
        //				(which would not be good for conflicts) or declare/use this.elem
        var bbox = elem.getBBox();
        var cx = bbox.x + bbox.width/2,
          cy = bbox.y + bbox.height/2;
        var rotate = ["rotate(", angle, " ", cx, ",", cy, ")"].join('');
        if (rotate != elem.getAttribute("transform")) {
          elem.setAttribute("transform", rotate);
        }
      }
    }

    if (handler) {
      handler.handleHistoryEvent(svgedit.history.HistoryEventTypes.AFTER_APPLY, this);
    }

    return true;
  };

// Function: svgedit.history.ChangeElementCommand.unapply
// Reverses the stored change action
  svgedit.history.ChangeElementCommand.prototype.unapply = function(handler) {
    if (handler) {
      handler.handleHistoryEvent(svgedit.history.HistoryEventTypes.BEFORE_UNAPPLY, this);
    }

    var bChangedTransform = false;
    var attr;
    for (attr in this.oldValues ) {
      if (this.oldValues[attr]) {
        if (attr == "#text") {this.elem.textContent = this.oldValues[attr];}
        else if (attr == "#href") {svgedit.utilities.setHref(this.elem, this.oldValues[attr]);}
        else {
          this.elem.setAttribute(attr, this.oldValues[attr]);
        }
      }
      else {
        if (attr == "#text") {
          this.elem.textContent = "";
        }
        else {this.elem.removeAttribute(attr);}
      }
      if (attr == "transform") { bChangedTransform = true; }
    }
    // relocate rotational transform, if necessary
    if (!bChangedTransform) {
      var angle = svgedit.utilities.getRotationAngle(this.elem);
      if (angle) {
        var bbox = elem.getBBox();
        var cx = bbox.x + bbox.width/2,
          cy = bbox.y + bbox.height/2;
        var rotate = ["rotate(", angle, " ", cx, ",", cy, ")"].join('');
        if (rotate != elem.getAttribute("transform")) {
          elem.setAttribute("transform", rotate);
        }
      }
    }

    // Remove transformlist to prevent confusion that causes bugs like 575.
    svgedit.transformlist.removeElementFromListMap(this.elem);

    if (handler) {
      handler.handleHistoryEvent(svgedit.history.HistoryEventTypes.AFTER_UNAPPLY, this);
    }

    return true;
  };

// Function: ChangeElementCommand.elements
// Returns array with element associated with this command
  svgedit.history.ChangeElementCommand.prototype.elements = function() {
    return [this.elem];
  };


// TODO: create a 'typing' command object that tracks changes in text
// if a new Typing command is created and the top command on the stack is also a Typing
// and they both affect the same element, then collapse the two commands into one


// Class: svgedit.history.BatchCommand
// implements svgedit.history.HistoryCommand
// History command that can contain/execute multiple other commands
//
// Parameters:
// text - An optional string visible to user related to this change
  svgedit.history.BatchCommand = function(text) {
    this.text = text || "Batch Command";
    this.stack = [];
  };
  svgedit.history.BatchCommand.type = function() { return 'svgedit.history.BatchCommand'; };
  svgedit.history.BatchCommand.prototype.type = svgedit.history.BatchCommand.type;

// Function: svgedit.history.BatchCommand.getText
  svgedit.history.BatchCommand.prototype.getText = function() {
    return this.text;
  };

// Function: svgedit.history.BatchCommand.apply
// Runs "apply" on all subcommands
  svgedit.history.BatchCommand.prototype.apply = function(handler) {
    if (handler) {
      handler.handleHistoryEvent(svgedit.history.HistoryEventTypes.BEFORE_APPLY, this);
    }

    var i,
      len = this.stack.length;
    for (i = 0; i < len; ++i) {
      this.stack[i].apply(handler);
    }

    if (handler) {
      handler.handleHistoryEvent(svgedit.history.HistoryEventTypes.AFTER_APPLY, this);
    }
  };

// Function: svgedit.history.BatchCommand.unapply
// Runs "unapply" on all subcommands
  svgedit.history.BatchCommand.prototype.unapply = function(handler) {
    if (handler) {
      handler.handleHistoryEvent(svgedit.history.HistoryEventTypes.BEFORE_UNAPPLY, this);
    }

    var i;
    for (i = this.stack.length-1; i >= 0; i--) {
      this.stack[i].unapply(handler);
    }

    if (handler) {
      handler.handleHistoryEvent(svgedit.history.HistoryEventTypes.AFTER_UNAPPLY, this);
    }
  };

// Function: svgedit.history.BatchCommand.elements
// Iterate through all our subcommands and returns all the elements we are changing
  svgedit.history.BatchCommand.prototype.elements = function() {
    var elems = [];
    var cmd = this.stack.length;
    while (cmd--) {
      var thisElems = this.stack[cmd].elements();
      var elem = thisElems.length;
      while (elem--) {
        if (elems.indexOf(thisElems[elem]) == -1) {elems.push(thisElems[elem]);}
      }
    }
    return elems;
  };

// Function: svgedit.history.BatchCommand.addSubCommand
// Adds a given command to the history stack
//
// Parameters:
// cmd - The undo command object to add
  svgedit.history.BatchCommand.prototype.addSubCommand = function(cmd) {
    this.stack.push(cmd);
  };

// Function: svgedit.history.BatchCommand.isEmpty
// Returns a boolean indicating whether or not the batch command is empty
  svgedit.history.BatchCommand.prototype.isEmpty = function() {
    return this.stack.length === 0;
  };


// Class: svgedit.history.UndoManager
// Parameters:
// historyEventHandler - an object that conforms to the HistoryEventHandler interface
// (see above)
  svgedit.history.UndoManager = function(historyEventHandler) {
    this.handler_ = historyEventHandler || null;
    this.undoStackPointer = 0;
    this.undoStack = [];

    // this is the stack that stores the original values, the elements and
    // the attribute name for begin/finish
    this.undoChangeStackPointer = -1;
    this.undoableChangeStack = [];
  };

// Function: svgedit.history.UndoManager.resetUndoStack
// Resets the undo stack, effectively clearing the undo/redo history
  svgedit.history.UndoManager.prototype.resetUndoStack = function() {
    this.undoStack = [];
    this.undoStackPointer = 0;
  };

// Function: svgedit.history.UndoManager.getUndoStackSize
// Returns:
// Integer with the current size of the undo history stack
  svgedit.history.UndoManager.prototype.getUndoStackSize = function() {
    return this.undoStackPointer;
  };

// Function: svgedit.history.UndoManager.getRedoStackSize
// Returns:
// Integer with the current size of the redo history stack
  svgedit.history.UndoManager.prototype.getRedoStackSize = function() {
    return this.undoStack.length - this.undoStackPointer;
  };

// Function: svgedit.history.UndoManager.getNextUndoCommandText
// Returns:
// String associated with the next undo command
  svgedit.history.UndoManager.prototype.getNextUndoCommandText = function() {
    return this.undoStackPointer > 0 ? this.undoStack[this.undoStackPointer-1].getText() : "";
  };

// Function: svgedit.history.UndoManager.getNextRedoCommandText
// Returns:
// String associated with the next redo command
  svgedit.history.UndoManager.prototype.getNextRedoCommandText = function() {
    return this.undoStackPointer < this.undoStack.length ? this.undoStack[this.undoStackPointer].getText() : "";
  };

// Function: svgedit.history.UndoManager.undo
// Performs an undo step
  svgedit.history.UndoManager.prototype.undo = function() {
    if (this.undoStackPointer > 0) {
      var cmd = this.undoStack[--this.undoStackPointer];
      cmd.unapply(this.handler_);
    }
  };

// Function: svgedit.history.UndoManager.redo
// Performs a redo step
  svgedit.history.UndoManager.prototype.redo = function() {
    if (this.undoStackPointer < this.undoStack.length && this.undoStack.length > 0) {
      var cmd = this.undoStack[this.undoStackPointer++];
      cmd.apply(this.handler_);
    }
  };

// Function: svgedit.history.UndoManager.addCommandToHistory
// Adds a command object to the undo history stack
//
// Parameters:
// cmd - The command object to add
  svgedit.history.UndoManager.prototype.addCommandToHistory = function(cmd) {
    // FIXME: we MUST compress consecutive text changes to the same element
    // (right now each keystroke is saved as a separate command that includes the
    // entire text contents of the text element)
    // TODO: consider limiting the history that we store here (need to do some slicing)

    // if our stack pointer is not at the end, then we have to remove
    // all commands after the pointer and insert the new command
    if (this.undoStackPointer < this.undoStack.length && this.undoStack.length > 0) {
      this.undoStack = this.undoStack.splice(0, this.undoStackPointer);
    }
    this.undoStack.push(cmd);
    this.undoStackPointer = this.undoStack.length;
  };


// Function: svgedit.history.UndoManager.beginUndoableChange
// This function tells the canvas to remember the old values of the
// attrName attribute for each element sent in.  The elements and values
// are stored on a stack, so the next call to finishUndoableChange() will
// pop the elements and old values off the stack, gets the current values
// from the DOM and uses all of these to construct the undo-able command.
//
// Parameters:
// attrName - The name of the attribute being changed
// elems - Array of DOM elements being changed
  svgedit.history.UndoManager.prototype.beginUndoableChange = function(attrName, elems) {
    var p = ++this.undoChangeStackPointer;
    var i = elems.length;
    var oldValues = new Array(i), elements = new Array(i);
    while (i--) {
      var elem = elems[i];
      if (elem == null) {continue;}
      elements[i] = elem;
      oldValues[i] = elem.getAttribute(attrName);
    }
    this.undoableChangeStack[p] = {
      'attrName': attrName,
      'oldValues': oldValues,
      'elements': elements
    };
  };

// Function: svgedit.history.UndoManager.finishUndoableChange
// This function returns a BatchCommand object which summarizes the
// change since beginUndoableChange was called.  The command can then
// be added to the command history
//
// Returns:
// Batch command object with resulting changes
  svgedit.history.UndoManager.prototype.finishUndoableChange = function() {
    var p = this.undoChangeStackPointer--;
    var changeset = this.undoableChangeStack[p];
    var i = changeset.elements.length;
    var attrName = changeset.attrName;
    var batchCmd = new svgedit.history.BatchCommand("Change " + attrName);
    while (i--) {
      var elem = changeset.elements[i];
      if (elem == null) {continue;}
      var changes = {};
      changes[attrName] = changeset.oldValues[i];
      if (changes[attrName] != elem.getAttribute(attrName)) {
        batchCmd.addSubCommand(new svgedit.history.ChangeElementCommand(elem, changes, attrName));
      }
    }
    this.undoableChangeStack[p] = null;
    return batchCmd;
  };

}());

/** historyrecording **/
(function() {
  'use strict';

  if (!svgedit.history) {
    svgedit.history = {};
  }
  var history = svgedit.history;

  /**
   * History recording service.
   *
   * A self-contained service interface for recording history. Once injected, no other dependencies
   * or globals are required (example: UndoManager, command types, etc.). Easy to mock for unit tests.
   * Built on top of history classes in history.js.
   *
   * There is a simple start/end interface for batch commands.
   *
   * HistoryRecordingService.NO_HISTORY is a singleton that can be passed in to functions
   * that record history. This helps when the caller requires that no history be recorded.
   *
   * Usage:
   * The following will record history: insert, batch, insert.
   * ```
   * hrService = new svgedit.history.HistoryRecordingService(this.undoMgr);
   * hrService.insertElement(elem, text);         // add simple command to history.
   * hrService.startBatchCommand('create two elements');
   * hrService.changeElement(elem, attrs, text);  // add to batchCommand
   * hrService.changeElement(elem, attrs2, text); // add to batchCommand
   * hrService.endBatchCommand();                  // add batch command with two change commands to history.
   * hrService.insertElement(elem, text);         // add simple command to history.
   * ```
   *
   * Note that all functions return this, so commands can be chained, like so:
   *
   * ```
   * hrService
   *   .startBatchCommand('create two elements')
   *   .insertElement(elem, text)
   *   .changeElement(elem, attrs, text)
   *   .endBatchCommand();
   * ```
   *
   * @param {svgedit.history.UndoManager} undoManager - The undo manager.
   * 		A value of null is valid for cases where no history recording is required.
   * 		See singleton: HistoryRecordingService.NO_HISTORY
   */
  var HistoryRecordingService = history.HistoryRecordingService = function(undoManager) {
    this.undoManager_ = undoManager;
    this.currentBatchCommand_ = null;
    this.batchCommandStack_ = [];
  };

  /**
   * @type {svgedit.history.HistoryRecordingService} NO_HISTORY - Singleton that can be passed
   *		in to functions that record history, but the caller requires that no history be recorded.
   */
  HistoryRecordingService.NO_HISTORY = new HistoryRecordingService();

  /**
   * Start a batch command so multiple commands can recorded as a single history command.
   * Requires a corresponding call to endBatchCommand. Start and end commands can be nested.
   *
   * @param {string} text - Optional string describing the batch command.
   * @returns {svgedit.history.HistoryRecordingService}
   */
  HistoryRecordingService.prototype.startBatchCommand = function(text) {
    if (!this.undoManager_) {return this;}
    this.currentBatchCommand_ = new history.BatchCommand(text);
    this.batchCommandStack_.push(this.currentBatchCommand_);
    return this;
  };

  /**
   * End a batch command and add it to the history or a parent batch command.
   * @returns {svgedit.history.HistoryRecordingService}
   */
  HistoryRecordingService.prototype.endBatchCommand = function() {
    if (!this.undoManager_) {return this;}
    if (this.currentBatchCommand_) {
      var batchCommand = this.currentBatchCommand_;
      this.batchCommandStack_.pop();
      var length = this.batchCommandStack_.length;
      this.currentBatchCommand_ = length ? this.batchCommandStack_[length-1] : null;
      this.addCommand_(batchCommand);
    }
    return this;
  };

  /**
   * Add a MoveElementCommand to the history or current batch command
   * @param {Element} elem - The DOM element that was moved
   * @param {Element} oldNextSibling - The element's next sibling before it was moved
   * @param {Element} oldParent - The element's parent before it was moved
   * @param {string} [text] - An optional string visible to user related to this change
   * @returns {svgedit.history.HistoryRecordingService}
   */
  HistoryRecordingService.prototype.moveElement = function(elem, oldNextSibling, oldParent, text) {
    if (!this.undoManager_) {return this;}
    this.addCommand_(new history.MoveElementCommand(elem, oldNextSibling, oldParent, text));
    return this;
  };

  /**
   * Add an InsertElementCommand to the history or current batch command
   * @param {Element} elem - The DOM element that was added
   * @param {string} [text] - An optional string visible to user related to this change
   * @returns {svgedit.history.HistoryRecordingService}
   */
  HistoryRecordingService.prototype.insertElement = function(elem, text) {
    if (!this.undoManager_) {return this;}
    this.addCommand_(new history.InsertElementCommand(elem, text));
    return this;
  };


  /**
   * Add a RemoveElementCommand to the history or current batch command
   * @param {Element} elem - The DOM element that was removed
   * @param {Element} oldNextSibling - The element's next sibling before it was removed
   * @param {Element} oldParent - The element's parent before it was removed
   * @param {string} [text] - An optional string visible to user related to this change
   * @returns {svgedit.history.HistoryRecordingService}
   */
  HistoryRecordingService.prototype.removeElement = function(elem, oldNextSibling, oldParent, text) {
    if (!this.undoManager_) {return this;}
    this.addCommand_(new history.RemoveElementCommand(elem, oldNextSibling, oldParent, text));
    return this;
  };


  /**
   * Add a ChangeElementCommand to the history or current batch command
   * @param {Element} elem - The DOM element that was changed
   * @param {object} attrs - An object with the attributes to be changed and the values they had *before* the change
   * @param {string} [text] - An optional string visible to user related to this change
   * @returns {svgedit.history.HistoryRecordingService}
   */
  HistoryRecordingService.prototype.changeElement = function(elem, attrs, text) {
    if (!this.undoManager_) {return this;}
    this.addCommand_(new history.ChangeElementCommand(elem, attrs, text));
    return this;
  };

  /**
   * Private function to add a command to the history or current batch command.
   * @param cmd
   * @returns {svgedit.history.HistoryRecordingService}
   * @private
   */
  HistoryRecordingService.prototype.addCommand_ = function(cmd) {
    if (!this.undoManager_) {return this;}
    if (this.currentBatchCommand_) {
      this.currentBatchCommand_.addSubCommand(cmd);
    } else {
      this.undoManager_.addCommandToHistory(cmd);
    }
  };


}());

/** coords **/
var svgedit = svgedit || {};
(function() {'use strict';

  if (!svgedit.coords) {
    svgedit.coords = {};
  }

// this is how we map paths to our preferred relative segment types
  var pathMap = [0, 'z', 'M', 'm', 'L', 'l', 'C', 'c', 'Q', 'q', 'A', 'a',
    'H', 'h', 'V', 'v', 'S', 's', 'T', 't'];

  /**
   * @typedef editorContext
   * @type {?object}
   * @property {function} getGridSnapping
   * @property {function} getDrawing
   */
  var editorContext_ = null;

  /**
   * @param {editorContext} editorContext
   */
  svgedit.coords.init = function(editorContext) {
    editorContext_ = editorContext;
  };

  /**
   * Applies coordinate changes to an element based on the given matrix
   * @param {Element} selected - DOM element to be changed
   * @param {object} changes - Object with changes to be remapped
   * @param {SVGMatrix} m - Matrix object to use for remapping coordinates
   */
  svgedit.coords.remapElement = function(selected, changes, m) {
    var i, type,
      remap = function(x, y) { return svgedit.math.transformPoint(x, y, m); },
      scalew = function(w) { return m.a * w; },
      scaleh = function(h) { return m.d * h; },
      doSnapping = editorContext_.getGridSnapping() && selected.parentNode.parentNode.localName === 'svg',
      finishUp = function() {
        var o;
        if (doSnapping) {
          for (o in changes) {
            changes[o] = svgedit.utilities.snapToGrid(changes[o]);
          }
        }
        svgedit.utilities.assignAttributes(selected, changes, 1000, true);
      },
      box = svgedit.utilities.getBBox(selected);

    for (i = 0; i < 2; i++) {
      type = i === 0 ? 'fill' : 'stroke';
      var attrVal = selected.getAttribute(type);
      if (attrVal && attrVal.indexOf('url(') === 0) {
        if (m.a < 0 || m.d < 0) {
          var grad = svgedit.utilities.getRefElem(attrVal);
          var newgrad = grad.cloneNode(true);
          if (m.a < 0) {
            // flip x
            var x1 = newgrad.getAttribute('x1');
            var x2 = newgrad.getAttribute('x2');
            newgrad.setAttribute('x1', -(x1 - 1));
            newgrad.setAttribute('x2', -(x2 - 1));
          }

          if (m.d < 0) {
            // flip y
            var y1 = newgrad.getAttribute('y1');
            var y2 = newgrad.getAttribute('y2');
            newgrad.setAttribute('y1', -(y1 - 1));
            newgrad.setAttribute('y2', -(y2 - 1));
          }
          newgrad.id = editorContext_.getDrawing().getNextId();
          svgedit.utilities.findDefs().appendChild(newgrad);
          selected.setAttribute(type, 'url(#' + newgrad.id + ')');
        }

        // Not really working :(
//      if (selected.tagName === 'path') {
//        reorientGrads(selected, m);
//      }
      }
    }

    var elName = selected.tagName;
    var chlist, mt;
    if (elName === 'g' || elName === 'text' || elName == 'tspan' || elName === 'use') {
      // if it was a translate, then just update x,y
      if (m.a == 1 && m.b == 0 && m.c == 0 && m.d == 1 && (m.e != 0 || m.f != 0) ) {
        // [T][M] = [M][T']
        // therefore [T'] = [M_inv][T][M]
        var existing = svgedit.math.transformListToTransform(selected).matrix,
          t_new = svgedit.math.matrixMultiply(existing.inverse(), m, existing);
        changes.x = parseFloat(changes.x) + t_new.e;
        changes.y = parseFloat(changes.y) + t_new.f;
      } else {
        // we just absorb all matrices into the element and don't do any remapping
        chlist = svgedit.transformlist.getTransformList(selected);
        mt = svgroot.createSVGTransform();
        mt.setMatrix(svgedit.math.matrixMultiply(svgedit.math.transformListToTransform(chlist).matrix, m));
        chlist.clear();
        chlist.appendItem(mt);
      }
    }
    var c, pt, pt1, pt2, len;
    // now we have a set of changes and an applied reduced transform list
    // we apply the changes directly to the DOM
    switch (elName) {
      case 'foreignObject':
      case 'rect':
      case 'image':
        // Allow images to be inverted (give them matrix when flipped)
        if (elName === 'image' && (m.a < 0 || m.d < 0)) {
          // Convert to matrix
          chlist = svgedit.transformlist.getTransformList(selected);
          mt = svgroot.createSVGTransform();
          mt.setMatrix(svgedit.math.matrixMultiply(svgedit.math.transformListToTransform(chlist).matrix, m));
          chlist.clear();
          chlist.appendItem(mt);
        } else {
          pt1 = remap(changes.x, changes.y);
          changes.width = scalew(changes.width);
          changes.height = scaleh(changes.height);
          changes.x = pt1.x + Math.min(0, changes.width);
          changes.y = pt1.y + Math.min(0, changes.height);
          changes.width = Math.abs(changes.width);
          changes.height = Math.abs(changes.height);
        }
        finishUp();
        break;
      case 'ellipse':
        c = remap(changes.cx, changes.cy);
        changes.cx = c.x;
        changes.cy = c.y;
        changes.rx = scalew(changes.rx);
        changes.ry = scaleh(changes.ry);
        changes.rx = Math.abs(changes.rx);
        changes.ry = Math.abs(changes.ry);
        finishUp();
        break;
      case 'circle':
        c = remap(changes.cx,changes.cy);
        changes.cx = c.x;
        changes.cy = c.y;
        // take the minimum of the new selected box's dimensions for the new circle radius
        var tbox = svgedit.math.transformBox(box.x, box.y, box.width, box.height, m);
        var w = tbox.tr.x - tbox.tl.x, h = tbox.bl.y - tbox.tl.y;
        changes.r = Math.min(w/2, h/2);

        if (changes.r) {changes.r = Math.abs(changes.r);}
        finishUp();
        break;
      case 'line':
        pt1 = remap(changes.x1, changes.y1);
        pt2 = remap(changes.x2, changes.y2);
        changes.x1 = pt1.x;
        changes.y1 = pt1.y;
        changes.x2 = pt2.x;
        changes.y2 = pt2.y;
      // deliberately fall through here
      case 'text':
      case 'tspan':
      case 'use':
        finishUp();
        break;
      case 'g':
        var gsvg = $(selected).data('gsvg');
        if (gsvg) {
          svgedit.utilities.assignAttributes(gsvg, changes, 1000, true);
        }
        break;
      case 'polyline':
      case 'polygon':
        len = changes.points.length;
        for (i = 0; i < len; ++i) {
          pt = changes.points[i];
          pt = remap(pt.x, pt.y);
          changes.points[i].x = pt.x;
          changes.points[i].y = pt.y;
        }

        len = changes.points.length;
        var pstr = '';
        for (i = 0; i < len; ++i) {
          pt = changes.points[i];
          pstr += pt.x + ',' + pt.y + ' ';
        }
        selected.setAttribute('points', pstr);
        break;
      case 'path':
        var seg;
        var segList = selected.pathSegList;
        len = segList.numberOfItems;
        changes.d = [];
        for (i = 0; i < len; ++i) {
          seg = segList.getItem(i);
          changes.d[i] = {
            type: seg.pathSegType,
            x: seg.x,
            y: seg.y,
            x1: seg.x1,
            y1: seg.y1,
            x2: seg.x2,
            y2: seg.y2,
            r1: seg.r1,
            r2: seg.r2,
            angle: seg.angle,
            largeArcFlag: seg.largeArcFlag,
            sweepFlag: seg.sweepFlag
          };
        }

        len = changes.d.length;
        var firstseg = changes.d[0],
          currentpt = remap(firstseg.x, firstseg.y);
        changes.d[0].x = currentpt.x;
        changes.d[0].y = currentpt.y;
        for (i = 1; i < len; ++i) {
          seg = changes.d[i];
          type = seg.type;
          // if absolute or first segment, we want to remap x, y, x1, y1, x2, y2
          // if relative, we want to scalew, scaleh
          if (type % 2 == 0) { // absolute
            var thisx = (seg.x != undefined) ? seg.x : currentpt.x, // for V commands
              thisy = (seg.y != undefined) ? seg.y : currentpt.y; // for H commands
            pt = remap(thisx,thisy);
            pt1 = remap(seg.x1, seg.y1);
            pt2 = remap(seg.x2, seg.y2);
            seg.x = pt.x;
            seg.y = pt.y;
            seg.x1 = pt1.x;
            seg.y1 = pt1.y;
            seg.x2 = pt2.x;
            seg.y2 = pt2.y;
            seg.r1 = scalew(seg.r1);
            seg.r2 = scaleh(seg.r2);
          }
          else { // relative
            seg.x = scalew(seg.x);
            seg.y = scaleh(seg.y);
            seg.x1 = scalew(seg.x1);
            seg.y1 = scaleh(seg.y1);
            seg.x2 = scalew(seg.x2);
            seg.y2 = scaleh(seg.y2);
            seg.r1 = scalew(seg.r1);
            seg.r2 = scaleh(seg.r2);
          }
        } // for each segment

        var dstr = '';
        len = changes.d.length;
        for (i = 0; i < len; ++i) {
          seg = changes.d[i];
          type = seg.type;
          dstr += pathMap[type];
          switch (type) {
            case 13: // relative horizontal line (h)
            case 12: // absolute horizontal line (H)
              dstr += seg.x + ' ';
              break;
            case 15: // relative vertical line (v)
            case 14: // absolute vertical line (V)
              dstr += seg.y + ' ';
              break;
            case 3: // relative move (m)
            case 5: // relative line (l)
            case 19: // relative smooth quad (t)
            case 2: // absolute move (M)
            case 4: // absolute line (L)
            case 18: // absolute smooth quad (T)
              dstr += seg.x + ',' + seg.y + ' ';
              break;
            case 7: // relative cubic (c)
            case 6: // absolute cubic (C)
              dstr += seg.x1 + ',' + seg.y1 + ' ' + seg.x2 + ',' + seg.y2 + ' ' +
                seg.x + ',' + seg.y + ' ';
              break;
            case 9: // relative quad (q)
            case 8: // absolute quad (Q)
              dstr += seg.x1 + ',' + seg.y1 + ' ' + seg.x + ',' + seg.y + ' ';
              break;
            case 11: // relative elliptical arc (a)
            case 10: // absolute elliptical arc (A)
              dstr += seg.r1 + ',' + seg.r2 + ' ' + seg.angle + ' ' + (+seg.largeArcFlag) +
                ' ' + (+seg.sweepFlag) + ' ' + seg.x + ',' + seg.y + ' ';
              break;
            case 17: // relative smooth cubic (s)
            case 16: // absolute smooth cubic (S)
              dstr += seg.x2 + ',' + seg.y2 + ' ' + seg.x + ',' + seg.y + ' ';
              break;
          }
        }
        selected.setAttribute('d', dstr);
        break;
    }
  };

}());

/** recalculate **/
var svgedit = svgedit || {};
(function() {

  if (!svgedit.recalculate) {
    svgedit.recalculate = {};
  }

  var NS = svgedit.NS;
  var context_;

// Function: svgedit.recalculate.init
  svgedit.recalculate.init = function(editorContext) {
    context_ = editorContext;
  };


// Function: svgedit.recalculate.updateClipPath
// Updates a <clipPath>s values based on the given translation of an element
//
// Parameters:
// attr - The clip-path attribute value with the clipPath's ID
// tx - The translation's x value
// ty - The translation's y value
  svgedit.recalculate.updateClipPath = function(attr, tx, ty) {
    var path = getRefElem(attr).firstChild;
    var cp_xform = svgedit.transformlist.getTransformList(path);
    var newxlate = context_.getSVGRoot().createSVGTransform();
    newxlate.setTranslate(tx, ty);

    cp_xform.appendItem(newxlate);

    // Update clipPath's dimensions
    svgedit.recalculate.recalculateDimensions(path);
  };


// Function: svgedit.recalculate.recalculateDimensions
// Decides the course of action based on the element's transform list
//
// Parameters:
// selected - The DOM element to recalculate
//
// Returns:
// Undo command object with the resulting change
  svgedit.recalculate.recalculateDimensions = function(selected) {
    if (selected == null) {return null;}

    // Firefox Issue - 1081
    if (selected.nodeName == "svg" && navigator.userAgent.indexOf("Firefox/20") >= 0) {
      return null;
    }

    var svgroot = context_.getSVGRoot();
    var tlist = svgedit.transformlist.getTransformList(selected);
    var k;
    // remove any unnecessary transforms
    if (tlist && tlist.numberOfItems > 0) {
      k = tlist.numberOfItems;
      while (k--) {
        var xform = tlist.getItem(k);
        if (xform.type === 0) {
          tlist.removeItem(k);
        }
        // remove identity matrices
        else if (xform.type === 1) {
          if (svgedit.math.isIdentity(xform.matrix)) {
            tlist.removeItem(k);
          }
        }
        // remove zero-degree rotations
        else if (xform.type === 4) {
          if (xform.angle === 0) {
            tlist.removeItem(k);
          }
        }
      }
      // End here if all it has is a rotation
      if (tlist.numberOfItems === 1 &&
        svgedit.utilities.getRotationAngle(selected)) {return null;}
    }

    // if this element had no transforms, we are done
    if (!tlist || tlist.numberOfItems == 0) {
      // Chrome has a bug that requires clearing the attribute first.
      selected.setAttribute('transform', '');
      selected.removeAttribute('transform');
      return null;
    }

    // TODO: Make this work for more than 2
    if (tlist) {
      k = tlist.numberOfItems;
      var mxs = [];
      while (k--) {
        var xform = tlist.getItem(k);
        if (xform.type === 1) {
          mxs.push([xform.matrix, k]);
        } else if (mxs.length) {
          mxs = [];
        }
      }
      if (mxs.length === 2) {
        var m_new = svgroot.createSVGTransformFromMatrix(svgedit.math.matrixMultiply(mxs[1][0], mxs[0][0]));
        tlist.removeItem(mxs[0][1]);
        tlist.removeItem(mxs[1][1]);
        tlist.insertItemBefore(m_new, mxs[1][1]);
      }

      // combine matrix + translate
      k = tlist.numberOfItems;
      if (k >= 2 && tlist.getItem(k-2).type === 1 && tlist.getItem(k-1).type === 2) {
        var mt = svgroot.createSVGTransform();

        var m = svgedit.math.matrixMultiply(
          tlist.getItem(k-2).matrix,
          tlist.getItem(k-1).matrix);
        mt.setMatrix(m);
        tlist.removeItem(k-2);
        tlist.removeItem(k-2);
        tlist.appendItem(mt);
      }
    }

    // If it still has a single [M] or [R][M], return null too (prevents BatchCommand from being returned).
    switch ( selected.tagName ) {
      // Ignore these elements, as they can absorb the [M]
      case 'line':
      case 'polyline':
      case 'polygon':
      case 'path':
        break;
      default:
        if ((tlist.numberOfItems === 1 && tlist.getItem(0).type === 1) ||
          (tlist.numberOfItems === 2 && tlist.getItem(0).type === 1 && tlist.getItem(0).type === 4)) {
          return null;
        }
    }

    // Grouped SVG element
    var gsvg = $(selected).data('gsvg');

    // we know we have some transforms, so set up return variable
    var batchCmd = new svgedit.history.BatchCommand('Transform');

    // store initial values that will be affected by reducing the transform list
    var changes = {}, initial = null, attrs = [];
    switch (selected.tagName) {
      case 'line':
        attrs = ['x1', 'y1', 'x2', 'y2'];
        break;
      case 'circle':
        attrs = ['cx', 'cy', 'r'];
        break;
      case 'ellipse':
        attrs = ['cx', 'cy', 'rx', 'ry'];
        break;
      case 'foreignObject':
      case 'rect':
      case 'image':
        attrs = ['width', 'height', 'x', 'y'];
        break;
      case 'use':
      case 'text':
      case 'tspan':
        attrs = ['x', 'y'];
        break;
      case 'polygon':
      case 'polyline':
        initial = {};
        initial.points = selected.getAttribute('points');
        var list = selected.points;
        var len = list.numberOfItems;
        changes.points = new Array(len);
        var i;
        for (i = 0; i < len; ++i) {
          var pt = list.getItem(i);
          changes.points[i] = {x:pt.x, y:pt.y};
        }
        break;
      case 'path':
        initial = {};
        initial.d = selected.getAttribute('d');
        changes.d = selected.getAttribute('d');
        break;
    } // switch on element type to get initial values

    if (attrs.length) {
      changes = $(selected).attr(attrs);
      $.each(changes, function(attr, val) {
        changes[attr] = svgedit.units.convertToNum(attr, val);
      });
    } else if (gsvg) {
      // GSVG exception
      changes = {
        x: $(gsvg).attr('x') || 0,
        y: $(gsvg).attr('y') || 0
      };
    }

    // if we haven't created an initial array in polygon/polyline/path, then
    // make a copy of initial values and include the transform
    if (initial == null) {
      initial = $.extend(true, {}, changes);
      $.each(initial, function(attr, val) {
        initial[attr] = svgedit.units.convertToNum(attr, val);
      });
    }
    // save the start transform value too
    initial.transform = context_.getStartTransform() || '';

    // if it's a regular group, we have special processing to flatten transforms
    if ((selected.tagName == 'g' && !gsvg) || selected.tagName == 'a') {
      var box = svgedit.utilities.getBBox(selected),
        oldcenter = {x: box.x+box.width/2, y: box.y+box.height/2},
        newcenter = svgedit.math.transformPoint(box.x+box.width/2,
          box.y+box.height/2,
          svgedit.math.transformListToTransform(tlist).matrix),
        m = svgroot.createSVGMatrix();

      // temporarily strip off the rotate and save the old center
      var gangle = svgedit.utilities.getRotationAngle(selected);
      if (gangle) {
        var a = gangle * Math.PI / 180;
        if ( Math.abs(a) > (1.0e-10) ) {
          var s = Math.sin(a)/(1 - Math.cos(a));
        } else {
          // FIXME: This blows up if the angle is exactly 0!
          var s = 2/a;
        }
        var i;
        for (i = 0; i < tlist.numberOfItems; ++i) {
          var xform = tlist.getItem(i);
          if (xform.type == 4) {
            // extract old center through mystical arts
            var rm = xform.matrix;
            oldcenter.y = (s*rm.e + rm.f)/2;
            oldcenter.x = (rm.e - s*rm.f)/2;
            tlist.removeItem(i);
            break;
          }
        }
      }
      var tx = 0, ty = 0,
        operation = 0,
        N = tlist.numberOfItems;

      if (N) {
        var first_m = tlist.getItem(0).matrix;
      }

      // first, if it was a scale then the second-last transform will be it
      if (N >= 3 && tlist.getItem(N-2).type == 3 &&
        tlist.getItem(N-3).type == 2 && tlist.getItem(N-1).type == 2)
      {
        operation = 3; // scale

        // if the children are unrotated, pass the scale down directly
        // otherwise pass the equivalent matrix() down directly
        var tm = tlist.getItem(N-3).matrix,
          sm = tlist.getItem(N-2).matrix,
          tmn = tlist.getItem(N-1).matrix;

        var children = selected.childNodes;
        var c = children.length;
        while (c--) {
          var child = children.item(c);
          tx = 0;
          ty = 0;
          if (child.nodeType == 1) {
            var childTlist = svgedit.transformlist.getTransformList(child);

            // some children might not have a transform (<metadata>, <defs>, etc)
            if (!childTlist) {continue;}

            var m = svgedit.math.transformListToTransform(childTlist).matrix;

            // Convert a matrix to a scale if applicable
//          if (svgedit.math.hasMatrixTransform(childTlist) && childTlist.numberOfItems == 1) {
//            if (m.b==0 && m.c==0 && m.e==0 && m.f==0) {
//              childTlist.removeItem(0);
//              var translateOrigin = svgroot.createSVGTransform(),
//                scale = svgroot.createSVGTransform(),
//                translateBack = svgroot.createSVGTransform();
//              translateOrigin.setTranslate(0, 0);
//              scale.setScale(m.a, m.d);
//              translateBack.setTranslate(0, 0);
//              childTlist.appendItem(translateBack);
//              childTlist.appendItem(scale);
//              childTlist.appendItem(translateOrigin);
//            }
//          }

            var angle = svgedit.utilities.getRotationAngle(child);
            var oldStartTransform = context_.getStartTransform();
            var childxforms = [];
            context_.setStartTransform(child.getAttribute('transform'));
            if (angle || svgedit.math.hasMatrixTransform(childTlist)) {
              var e2t = svgroot.createSVGTransform();
              e2t.setMatrix(svgedit.math.matrixMultiply(tm, sm, tmn, m));
              childTlist.clear();
              childTlist.appendItem(e2t);
              childxforms.push(e2t);
            }
            // if not rotated or skewed, push the [T][S][-T] down to the child
            else {
              // update the transform list with translate,scale,translate

              // slide the [T][S][-T] from the front to the back
              // [T][S][-T][M] = [M][T2][S2][-T2]

              // (only bringing [-T] to the right of [M])
              // [T][S][-T][M] = [T][S][M][-T2]
              // [-T2] = [M_inv][-T][M]
              var t2n = svgedit.math.matrixMultiply(m.inverse(), tmn, m);
              // [T2] is always negative translation of [-T2]
              var t2 = svgroot.createSVGMatrix();
              t2.e = -t2n.e;
              t2.f = -t2n.f;

              // [T][S][-T][M] = [M][T2][S2][-T2]
              // [S2] = [T2_inv][M_inv][T][S][-T][M][-T2_inv]
              var s2 = svgedit.math.matrixMultiply(t2.inverse(), m.inverse(), tm, sm, tmn, m, t2n.inverse());

              var translateOrigin = svgroot.createSVGTransform(),
                scale = svgroot.createSVGTransform(),
                translateBack = svgroot.createSVGTransform();
              translateOrigin.setTranslate(t2n.e, t2n.f);
              scale.setScale(s2.a, s2.d);
              translateBack.setTranslate(t2.e, t2.f);
              childTlist.appendItem(translateBack);
              childTlist.appendItem(scale);
              childTlist.appendItem(translateOrigin);
              childxforms.push(translateBack);
              childxforms.push(scale);
              childxforms.push(translateOrigin);
//            logMatrix(translateBack.matrix);
//            logMatrix(scale.matrix);
            } // not rotated
            batchCmd.addSubCommand( svgedit.recalculate.recalculateDimensions(child) );
            // TODO: If any <use> have this group as a parent and are
            // referencing this child, then we need to impose a reverse
            // scale on it so that when it won't get double-translated
//            var uses = selected.getElementsByTagNameNS(NS.SVG, 'use');
//            var href = '#' + child.id;
//            var u = uses.length;
//            while (u--) {
//              var useElem = uses.item(u);
//              if (href == svgedit.utilities.getHref(useElem)) {
//                var usexlate = svgroot.createSVGTransform();
//                usexlate.setTranslate(-tx,-ty);
//                svgedit.transformlist.getTransformList(useElem).insertItemBefore(usexlate,0);
//                batchCmd.addSubCommand( svgedit.recalculate.recalculateDimensions(useElem) );
//              }
//            }
            context_.setStartTransform(oldStartTransform);
          } // element
        } // for each child
        // Remove these transforms from group
        tlist.removeItem(N-1);
        tlist.removeItem(N-2);
        tlist.removeItem(N-3);
      } else if (N >= 3 && tlist.getItem(N-1).type == 1) {
        operation = 3; // scale
        m = svgedit.math.transformListToTransform(tlist).matrix;
        var e2t = svgroot.createSVGTransform();
        e2t.setMatrix(m);
        tlist.clear();
        tlist.appendItem(e2t);
      }
        // next, check if the first transform was a translate
        // if we had [ T1 ] [ M ] we want to transform this into [ M ] [ T2 ]
      // therefore [ T2 ] = [ M_inv ] [ T1 ] [ M ]
      else if ( (N == 1 || (N > 1 && tlist.getItem(1).type != 3)) &&
        tlist.getItem(0).type == 2)
      {
        operation = 2; // translate
        var T_M = svgedit.math.transformListToTransform(tlist).matrix;
        tlist.removeItem(0);
        var M_inv = svgedit.math.transformListToTransform(tlist).matrix.inverse();
        var M2 = svgedit.math.matrixMultiply( M_inv, T_M );

        tx = M2.e;
        ty = M2.f;

        if (tx != 0 || ty != 0) {
          // we pass the translates down to the individual children
          var children = selected.childNodes;
          var c = children.length;

          var clipPaths_done = [];

          while (c--) {
            var child = children.item(c);
            if (child.nodeType == 1) {

              // Check if child has clip-path
              if (child.getAttribute('clip-path')) {
                // tx, ty
                var attr = child.getAttribute('clip-path');
                if (clipPaths_done.indexOf(attr) === -1) {
                  svgedit.recalculate.updateClipPath(attr, tx, ty);
                  clipPaths_done.push(attr);
                }
              }

              var oldStartTransform = context_.getStartTransform();
              context_.setStartTransform(child.getAttribute('transform'));

              var childTlist = svgedit.transformlist.getTransformList(child);
              // some children might not have a transform (<metadata>, <defs>, etc)
              if (childTlist) {
                var newxlate = svgroot.createSVGTransform();
                newxlate.setTranslate(tx, ty);
                if (childTlist.numberOfItems) {
                  childTlist.insertItemBefore(newxlate, 0);
                } else {
                  childTlist.appendItem(newxlate);
                }
                batchCmd.addSubCommand(svgedit.recalculate.recalculateDimensions(child));
                // If any <use> have this group as a parent and are
                // referencing this child, then impose a reverse translate on it
                // so that when it won't get double-translated
                var uses = selected.getElementsByTagNameNS(NS.SVG, 'use');
                var href = '#' + child.id;
                var u = uses.length;
                while (u--) {
                  var useElem = uses.item(u);
                  if (href == svgedit.utilities.getHref(useElem)) {
                    var usexlate = svgroot.createSVGTransform();
                    usexlate.setTranslate(-tx,-ty);
                    svgedit.transformlist.getTransformList(useElem).insertItemBefore(usexlate, 0);
                    batchCmd.addSubCommand( svgedit.recalculate.recalculateDimensions(useElem) );
                  }
                }
                context_.setStartTransform(oldStartTransform);
              }
            }
          }

          clipPaths_done = [];
          context_.setStartTransform(oldStartTransform);
        }
      }
        // else, a matrix imposition from a parent group
      // keep pushing it down to the children
      else if (N == 1 && tlist.getItem(0).type == 1 && !gangle) {
        operation = 1;
        var m = tlist.getItem(0).matrix,
          children = selected.childNodes,
          c = children.length;
        while (c--) {
          var child = children.item(c);
          if (child.nodeType == 1) {
            var oldStartTransform = context_.getStartTransform();
            context_.setStartTransform(child.getAttribute('transform'));
            var childTlist = svgedit.transformlist.getTransformList(child);

            if (!childTlist) {continue;}

            var em = svgedit.math.matrixMultiply(m, svgedit.math.transformListToTransform(childTlist).matrix);
            var e2m = svgroot.createSVGTransform();
            e2m.setMatrix(em);
            childTlist.clear();
            childTlist.appendItem(e2m, 0);

            batchCmd.addSubCommand( svgedit.recalculate.recalculateDimensions(child) );
            context_.setStartTransform(oldStartTransform);

            // Convert stroke
            // TODO: Find out if this should actually happen somewhere else
            var sw = child.getAttribute('stroke-width');
            if (child.getAttribute('stroke') !== 'none' && !isNaN(sw)) {
              var avg = (Math.abs(em.a) + Math.abs(em.d)) / 2;
              child.setAttribute('stroke-width', sw * avg);
            }

          }
        }
        tlist.clear();
      }
      // else it was just a rotate
      else {
        if (gangle) {
          var newRot = svgroot.createSVGTransform();
          newRot.setRotate(gangle, newcenter.x, newcenter.y);
          if (tlist.numberOfItems) {
            tlist.insertItemBefore(newRot, 0);
          } else {
            tlist.appendItem(newRot);
          }
        }
        if (tlist.numberOfItems == 0) {
          selected.removeAttribute('transform');
        }
        return null;
      }

      // if it was a translate, put back the rotate at the new center
      if (operation == 2) {
        if (gangle) {
          newcenter = {
            x: oldcenter.x + first_m.e,
            y: oldcenter.y + first_m.f
          };

          var newRot = svgroot.createSVGTransform();
          newRot.setRotate(gangle, newcenter.x, newcenter.y);
          if (tlist.numberOfItems) {
            tlist.insertItemBefore(newRot, 0);
          } else {
            tlist.appendItem(newRot);
          }
        }
      }
      // if it was a resize
      else if (operation == 3) {
        var m = svgedit.math.transformListToTransform(tlist).matrix;
        var roldt = svgroot.createSVGTransform();
        roldt.setRotate(gangle, oldcenter.x, oldcenter.y);
        var rold = roldt.matrix;
        var rnew = svgroot.createSVGTransform();
        rnew.setRotate(gangle, newcenter.x, newcenter.y);
        var rnew_inv = rnew.matrix.inverse(),
          m_inv = m.inverse(),
          extrat = svgedit.math.matrixMultiply(m_inv, rnew_inv, rold, m);

        tx = extrat.e;
        ty = extrat.f;

        if (tx != 0 || ty != 0) {
          // now push this transform down to the children
          // we pass the translates down to the individual children
          var children = selected.childNodes;
          var c = children.length;
          while (c--) {
            var child = children.item(c);
            if (child.nodeType == 1) {
              var oldStartTransform = context_.getStartTransform();
              context_.setStartTransform(child.getAttribute('transform'));
              var childTlist = svgedit.transformlist.getTransformList(child);
              var newxlate = svgroot.createSVGTransform();
              newxlate.setTranslate(tx, ty);
              if (childTlist.numberOfItems) {
                childTlist.insertItemBefore(newxlate, 0);
              } else {
                childTlist.appendItem(newxlate);
              }

              batchCmd.addSubCommand( svgedit.recalculate.recalculateDimensions(child) );
              context_.setStartTransform(oldStartTransform);
            }
          }
        }

        if (gangle) {
          if (tlist.numberOfItems) {
            tlist.insertItemBefore(rnew, 0);
          } else {
            tlist.appendItem(rnew);
          }
        }
      }
    }
    // else, it's a non-group
    else {

      // FIXME: box might be null for some elements (<metadata> etc), need to handle this
      var box = svgedit.utilities.getBBox(selected);

      // Paths (and possbly other shapes) will have no BBox while still in <defs>,
      // but we still may need to recalculate them (see issue 595).
      // TODO: Figure out how to get BBox from these elements in case they
      // have a rotation transform

      if (!box && selected.tagName != 'path') return null;


      var m = svgroot.createSVGMatrix(),
        // temporarily strip off the rotate and save the old center
        angle = svgedit.utilities.getRotationAngle(selected);
      if (angle) {
        var oldcenter = {x: box.x+box.width/2, y: box.y+box.height/2},
          newcenter = svgedit.math.transformPoint(box.x+box.width/2, box.y+box.height/2,
            svgedit.math.transformListToTransform(tlist).matrix);

        var a = angle * Math.PI / 180;
        if ( Math.abs(a) > (1.0e-10) ) {
          var s = Math.sin(a)/(1 - Math.cos(a));
        } else {
          // FIXME: This blows up if the angle is exactly 0!
          var s = 2/a;
        }
        for (var i = 0; i < tlist.numberOfItems; ++i) {
          var xform = tlist.getItem(i);
          if (xform.type == 4) {
            // extract old center through mystical arts
            var rm = xform.matrix;
            oldcenter.y = (s*rm.e + rm.f)/2;
            oldcenter.x = (rm.e - s*rm.f)/2;
            tlist.removeItem(i);
            break;
          }
        }
      }

      // 2 = translate, 3 = scale, 4 = rotate, 1 = matrix imposition
      var operation = 0;
      var N = tlist.numberOfItems;

      // Check if it has a gradient with userSpaceOnUse, in which case
      // adjust it by recalculating the matrix transform.
      // TODO: Make this work in Webkit using svgedit.transformlist.SVGTransformList
      if (!svgedit.browser.isWebkit()) {
        var fill = selected.getAttribute('fill');
        if (fill && fill.indexOf('url(') === 0) {
          var paint = getRefElem(fill);
          var type = 'pattern';
          if (paint.tagName !== type) type = 'gradient';
          var attrVal = paint.getAttribute(type + 'Units');
          if (attrVal === 'userSpaceOnUse') {
            //Update the userSpaceOnUse element
            m = svgedit.math.transformListToTransform(tlist).matrix;
            var gtlist = svgedit.transformlist.getTransformList(paint);
            var gmatrix = svgedit.math.transformListToTransform(gtlist).matrix;
            m = svgedit.math.matrixMultiply(m, gmatrix);
            var m_str = 'matrix(' + [m.a, m.b, m.c, m.d, m.e, m.f].join(',') + ')';
            paint.setAttribute(type + 'Transform', m_str);
          }
        }
      }

      // first, if it was a scale of a non-skewed element, then the second-last
      // transform will be the [S]
      // if we had [M][T][S][T] we want to extract the matrix equivalent of
      // [T][S][T] and push it down to the element
      if (N >= 3 && tlist.getItem(N-2).type == 3 &&
        tlist.getItem(N-3).type == 2 && tlist.getItem(N-1).type == 2)

        // Removed this so a <use> with a given [T][S][T] would convert to a matrix.
        // Is that bad?
        //  && selected.nodeName != 'use'
      {
        operation = 3; // scale
        m = svgedit.math.transformListToTransform(tlist, N-3, N-1).matrix;
        tlist.removeItem(N-1);
        tlist.removeItem(N-2);
        tlist.removeItem(N-3);
      } // if we had [T][S][-T][M], then this was a skewed element being resized
      // Thus, we simply combine it all into one matrix
      else if (N == 4 && tlist.getItem(N-1).type == 1) {
        operation = 3; // scale
        m = svgedit.math.transformListToTransform(tlist).matrix;
        var e2t = svgroot.createSVGTransform();
        e2t.setMatrix(m);
        tlist.clear();
        tlist.appendItem(e2t);
        // reset the matrix so that the element is not re-mapped
        m = svgroot.createSVGMatrix();
      } // if we had [R][T][S][-T][M], then this was a rotated matrix-element
        // if we had [T1][M] we want to transform this into [M][T2]
        // therefore [ T2 ] = [ M_inv ] [ T1 ] [ M ] and we can push [T2]
      // down to the element
      else if ( (N == 1 || (N > 1 && tlist.getItem(1).type != 3)) &&
        tlist.getItem(0).type == 2)
      {
        operation = 2; // translate
        var oldxlate = tlist.getItem(0).matrix,
          meq = svgedit.math.transformListToTransform(tlist,1).matrix,
          meq_inv = meq.inverse();
        m = svgedit.math.matrixMultiply( meq_inv, oldxlate, meq );
        tlist.removeItem(0);
      }
        // else if this child now has a matrix imposition (from a parent group)
      // we might be able to simplify
      else if (N == 1 && tlist.getItem(0).type == 1 && !angle) {
        // Remap all point-based elements
        m = svgedit.math.transformListToTransform(tlist).matrix;
        switch (selected.tagName) {
          case 'line':
            changes = $(selected).attr(['x1', 'y1', 'x2', 'y2']);
          case 'polyline':
          case 'polygon':
            changes.points = selected.getAttribute('points');
            if (changes.points) {
              var list = selected.points;
              var len = list.numberOfItems;
              changes.points = new Array(len);
              for (var i = 0; i < len; ++i) {
                var pt = list.getItem(i);
                changes.points[i] = {x:pt.x, y:pt.y};
              }
            }
          case 'path':
            changes.d = selected.getAttribute('d');
            operation = 1;
            tlist.clear();
            break;
          default:
            break;
        }
      }
        // if it was a rotation, put the rotate back and return without a command
      // (this function has zero work to do for a rotate())
      else {
        operation = 4; // rotation
        if (angle) {
          var newRot = svgroot.createSVGTransform();
          newRot.setRotate(angle, newcenter.x, newcenter.y);

          if (tlist.numberOfItems) {
            tlist.insertItemBefore(newRot, 0);
          } else {
            tlist.appendItem(newRot);
          }
        }
        if (tlist.numberOfItems == 0) {
          selected.removeAttribute('transform');
        }
        return null;
      }

      // if it was a translate or resize, we need to remap the element and absorb the xform
      if (operation == 1 || operation == 2 || operation == 3) {
        svgedit.coords.remapElement(selected, changes, m);
      } // if we are remapping

      // if it was a translate, put back the rotate at the new center
      if (operation == 2) {
        if (angle) {
          if (!svgedit.math.hasMatrixTransform(tlist)) {
            newcenter = {
              x: oldcenter.x + m.e,
              y: oldcenter.y + m.f
            };
          }
          var newRot = svgroot.createSVGTransform();
          newRot.setRotate(angle, newcenter.x, newcenter.y);
          if (tlist.numberOfItems) {
            tlist.insertItemBefore(newRot, 0);
          } else {
            tlist.appendItem(newRot);
          }
        }
        // We have special processing for tspans:  Tspans are not transformable
        // but they can have x,y coordinates (sigh).  Thus, if this was a translate,
        // on a text element, also translate any tspan children.
        if (selected.tagName == 'text') {
          var children = selected.childNodes;
          var c = children.length;
          while (c--) {
            var child = children.item(c);
            if (child.tagName == 'tspan') {
              var tspanChanges = {
                x: $(child).attr('x') || 0,
                y: $(child).attr('y') || 0
              };
              svgedit.coords.remapElement(child, tspanChanges, m);
            }
          }
        }
      }
        // [Rold][M][T][S][-T] became [Rold][M]
        // we want it to be [Rnew][M][Tr] where Tr is the
        // translation required to re-center it
      // Therefore, [Tr] = [M_inv][Rnew_inv][Rold][M]
      else if (operation == 3 && angle) {
        var m = svgedit.math.transformListToTransform(tlist).matrix;
        var roldt = svgroot.createSVGTransform();
        roldt.setRotate(angle, oldcenter.x, oldcenter.y);
        var rold = roldt.matrix;
        var rnew = svgroot.createSVGTransform();
        rnew.setRotate(angle, newcenter.x, newcenter.y);
        var rnew_inv = rnew.matrix.inverse();
        var m_inv = m.inverse();
        var extrat = svgedit.math.matrixMultiply(m_inv, rnew_inv, rold, m);

        svgedit.coords.remapElement(selected, changes, extrat);
        if (angle) {
          if (tlist.numberOfItems) {
            tlist.insertItemBefore(rnew, 0);
          } else {
            tlist.appendItem(rnew);
          }
        }
      }
    } // a non-group

    // if the transform list has been emptied, remove it
    if (tlist.numberOfItems == 0) {
      selected.removeAttribute('transform');
    }

    batchCmd.addSubCommand(new svgedit.history.ChangeElementCommand(selected, initial));

    return batchCmd;
  };
})();

/** select **/
var myselect = function () {
  "use strict";
  return {
    initSelect: function () {

      if (!svgedit.select) {
        svgedit.select = {};
      }

      var svgFactory_;
      var config_;
      var selectorManager_; // A Singleton
      var gripRadius = svgedit.browser.isTouch() ? 10 : 4;

// Class: svgedit.select.Selector
// Private class for DOM element selection boxes
//
// Parameters:
// id - integer to internally indentify the selector
// elem - DOM element associated with this selector
// bbox - Optional bbox to use for initialization (prevents duplicate getBBox call).
      svgedit.select.Selector = function(id, elem, bbox) {
        // this is the selector's unique number
        this.id = id;

        // this holds a reference to the element for which this selector is being used
        this.selectedElement = elem;

        // this is a flag used internally to track whether the selector is being used or not
        this.locked = true;

        // this holds a reference to the <g> element that holds all visual elements of the selector
        this.selectorGroup = svgFactory_.createSVGElement({
          'element': 'g',
          'attr': {'id': ('selectorGroup' + this.id)}
        });

        // this holds a reference to the path rect
        this.selectorRect = this.selectorGroup.appendChild(
          svgFactory_.createSVGElement({
            'element': 'path',
            'attr': {
              'id': ('selectedBox' + this.id),
              'fill': 'none',
              'stroke': '#22C',
              'stroke-width': '1',
              'stroke-dasharray': '5,5',
              // need to specify this so that the rect is not selectable
              'style': 'pointer-events:none'
            }
          })
        );

        // this holds a reference to the grip coordinates for this selector
        this.gripCoords = {
          'nw': null,
          'n' : null,
          'ne': null,
          'e' : null,
          'se': null,
          's' : null,
          'sw': null,
          'w' : null
        };

        this.reset(this.selectedElement, bbox);
      };


// Function: svgedit.select.Selector.reset
// Used to reset the id and element that the selector is attached to
//
// Parameters:
// e - DOM element associated with this selector
// bbox - Optional bbox to use for reset (prevents duplicate getBBox call).
      svgedit.select.Selector.prototype.reset = function(e, bbox) {
        this.locked = true;
        this.selectedElement = e;
        this.resize(bbox);
        this.selectorGroup.setAttribute('display', 'inline');
      };


// Function: svgedit.select.Selector.updateGripCursors
// Updates cursors for corner grips on rotation so arrows point the right way
//
// Parameters:
// angle - Float indicating current rotation angle in degrees
      svgedit.select.Selector.prototype.updateGripCursors = function(angle) {
        var dir,
          dir_arr = [],
          steps = Math.round(angle / 45);
        if (steps < 0) {steps += 8;}
        for (dir in selectorManager_.selectorGrips) {
          dir_arr.push(dir);
        }
        while (steps > 0) {
          dir_arr.push(dir_arr.shift());
          steps--;
        }
        var i = 0;
        for (dir in selectorManager_.selectorGrips) {
          selectorManager_.selectorGrips[dir].setAttribute('style', ('cursor:' + dir_arr[i] + '-resize'));
          i++;
        }
      };

// Function: svgedit.select.Selector.showGrips
// Show the resize grips of this selector
//
// Parameters:
// show - boolean indicating whether grips should be shown or not
      svgedit.select.Selector.prototype.showGrips = function(show) {
        var bShow = show ? 'inline' : 'none';
        selectorManager_.selectorGripsGroup.setAttribute('display', bShow);
        var elem = this.selectedElement;
        this.hasGrips = show;
        if (elem && show) {
          this.selectorGroup.appendChild(selectorManager_.selectorGripsGroup);
          this.updateGripCursors(svgedit.utilities.getRotationAngle(elem));
        }
      };

// Function: svgedit.select.Selector.resize
// Updates the selector to match the element's size
// bbox - Optional bbox to use for resize (prevents duplicate getBBox call).
      svgedit.select.Selector.prototype.resize = function(bbox) {
        var selectedBox = this.selectorRect,
          mgr = selectorManager_,
          selectedGrips = mgr.selectorGrips,
          selected = this.selectedElement,
          sw = selected.getAttribute('stroke-width'),
          current_zoom = svgFactory_.currentZoom();
        var offset = 1/current_zoom;
        if (selected.getAttribute('stroke') !== 'none' && !isNaN(sw)) {
          offset += (sw/2);
        }

        var tagName = selected.tagName;
        if (tagName === 'text') {
          offset += 2/current_zoom;
        }

        // loop and transform our bounding box until we reach our first rotation
        var tlist = svgedit.transformlist.getTransformList(selected);
        var m = svgedit.math.transformListToTransform(tlist).matrix;

        // This should probably be handled somewhere else, but for now
        // it keeps the selection box correctly positioned when zoomed
        m.e *= current_zoom;
        m.f *= current_zoom;

        if (!bbox) {
          bbox = svgedit.utilities.getBBox(selected);
        }
        // TODO: svgedit.utilities.getBBox (previous line) already knows to call getStrokedBBox when tagName === 'g'. Remove this?
        // TODO: svgedit.utilities.getBBox doesn't exclude 'gsvg' and calls getStrokedBBox for any 'g'. Should getBBox be updated?
        if (tagName === 'g' && !$.data(selected, 'gsvg')) {
          // The bbox for a group does not include stroke vals, so we
          // get the bbox based on its children.
          var stroked_bbox = svgFactory_.getStrokedBBox(selected.childNodes);
          if (stroked_bbox) {
            bbox = stroked_bbox;
          }
        }

        // apply the transforms
        var l = bbox.x, t = bbox.y, w = bbox.width, h = bbox.height;
        bbox = {x:l, y:t, width:w, height:h};

        // we need to handle temporary transforms too
        // if skewed, get its transformed box, then find its axis-aligned bbox

        //*
        offset *= current_zoom;

        var nbox = svgedit.math.transformBox(l*current_zoom, t*current_zoom, w*current_zoom, h*current_zoom, m),
          aabox = nbox.aabox,
          nbax = aabox.x - offset,
          nbay = aabox.y - offset,
          nbaw = aabox.width + (offset * 2),
          nbah = aabox.height + (offset * 2);

        // now if the shape is rotated, un-rotate it
        var cx = nbax + nbaw/2,
          cy = nbay + nbah/2;

        var angle = svgedit.utilities.getRotationAngle(selected);
        if (angle) {
          var rot = svgFactory_.svgRoot().createSVGTransform();
          rot.setRotate(-angle, cx, cy);
          var rotm = rot.matrix;
          nbox.tl = svgedit.math.transformPoint(nbox.tl.x, nbox.tl.y, rotm);
          nbox.tr = svgedit.math.transformPoint(nbox.tr.x, nbox.tr.y, rotm);
          nbox.bl = svgedit.math.transformPoint(nbox.bl.x, nbox.bl.y, rotm);
          nbox.br = svgedit.math.transformPoint(nbox.br.x, nbox.br.y, rotm);

          // calculate the axis-aligned bbox
          var tl = nbox.tl;
          var minx = tl.x,
            miny = tl.y,
            maxx = tl.x,
            maxy = tl.y;

          var min = Math.min, max = Math.max;

          minx = min(minx, min(nbox.tr.x, min(nbox.bl.x, nbox.br.x) ) ) - offset;
          miny = min(miny, min(nbox.tr.y, min(nbox.bl.y, nbox.br.y) ) ) - offset;
          maxx = max(maxx, max(nbox.tr.x, max(nbox.bl.x, nbox.br.x) ) ) + offset;
          maxy = max(maxy, max(nbox.tr.y, max(nbox.bl.y, nbox.br.y) ) ) + offset;

          nbax = minx;
          nbay = miny;
          nbaw = (maxx-minx);
          nbah = (maxy-miny);
        }

        var dstr = 'M' + nbax + ',' + nbay
          + ' L' + (nbax+nbaw) + ',' + nbay
          + ' ' + (nbax+nbaw) + ',' + (nbay+nbah)
          + ' ' + nbax + ',' + (nbay+nbah) + 'z';
        selectedBox.setAttribute('d', dstr);

        var xform = angle ? 'rotate(' + [angle, cx, cy].join(',') + ')' : '';
        this.selectorGroup.setAttribute('transform', xform);

        // TODO(codedread): Is this if needed?
//	if (selected === selectedElements[0]) {
        this.gripCoords = {
          'nw': [nbax, nbay],
          'ne': [nbax+nbaw, nbay],
          'sw': [nbax, nbay+nbah],
          'se': [nbax+nbaw, nbay+nbah],
          'n':  [nbax + (nbaw)/2, nbay],
          'w':	[nbax, nbay + (nbah)/2],
          'e':	[nbax + nbaw, nbay + (nbah)/2],
          's':	[nbax + (nbaw)/2, nbay + nbah]
        };
        var dir;
        for (dir in this.gripCoords) {
          var coords = this.gripCoords[dir];
          selectedGrips[dir].setAttribute('cx', coords[0]);
          selectedGrips[dir].setAttribute('cy', coords[1]);
        }

        // we want to go 20 pixels in the negative transformed y direction, ignoring scale
        mgr.rotateGripConnector.setAttribute('x1', nbax + (nbaw)/2);
        mgr.rotateGripConnector.setAttribute('y1', nbay);
        mgr.rotateGripConnector.setAttribute('x2', nbax + (nbaw)/2);
        mgr.rotateGripConnector.setAttribute('y2', nbay - (gripRadius*5));

        mgr.rotateGrip.setAttribute('cx', nbax + (nbaw)/2);
        mgr.rotateGrip.setAttribute('cy', nbay - (gripRadius*5));
//	}
      };


// Class: svgedit.select.SelectorManager
      svgedit.select.SelectorManager = function() {
        // this will hold the <g> element that contains all selector rects/grips
        this.selectorParentGroup = null;

        // this is a special rect that is used for multi-select
        this.rubberBandBox = null;

        // this will hold objects of type svgedit.select.Selector (see above)
        this.selectors = [];

        // this holds a map of SVG elements to their Selector object
        this.selectorMap = {};

        // this holds a reference to the grip elements
        this.selectorGrips = {
          'nw': null,
          'n' :  null,
          'ne': null,
          'e' :  null,
          'se': null,
          's' :  null,
          'sw': null,
          'w' :  null
        };

        this.selectorGripsGroup = null;
        this.rotateGripConnector = null;
        this.rotateGrip = null;

        this.initGroup();
      };

// Function: svgedit.select.SelectorManager.initGroup
// Resets the parent selector group element
      svgedit.select.SelectorManager.prototype.initGroup = function() {
        // remove old selector parent group if it existed
        if (this.selectorParentGroup && this.selectorParentGroup.parentNode) {
          this.selectorParentGroup.parentNode.removeChild(this.selectorParentGroup);
        }

        // create parent selector group and add it to svgroot
        this.selectorParentGroup = svgFactory_.createSVGElement({
          'element': 'g',
          'attr': {'id': 'selectorParentGroup'}
        });
        this.selectorGripsGroup = svgFactory_.createSVGElement({
          'element': 'g',
          'attr': {'display': 'none'}
        });
        this.selectorParentGroup.appendChild(this.selectorGripsGroup);
        svgFactory_.svgRoot().appendChild(this.selectorParentGroup);

        this.selectorMap = {};
        this.selectors = [];
        this.rubberBandBox = null;

        // add the corner grips
        var dir;
        for (dir in this.selectorGrips) {
          var grip = svgFactory_.createSVGElement({
            'element': 'circle',
            'attr': {
              'id': ('selectorGrip_resize_' + dir),
              'fill': '#22C',
              'r': gripRadius,
              'style': ('cursor:' + dir + '-resize'),
              // This expands the mouse-able area of the grips making them
              // easier to grab with the mouse.
              // This works in Opera and WebKit, but does not work in Firefox
              // see https://bugzilla.mozilla.org/show_bug.cgi?id=500174
              'stroke-width': 2,
              'pointer-events': 'all'
            }
          });

          $.data(grip, 'dir', dir);
          $.data(grip, 'type', 'resize');
          this.selectorGrips[dir] = this.selectorGripsGroup.appendChild(grip);
        }

        // add rotator elems
        this.rotateGripConnector = this.selectorGripsGroup.appendChild(
          svgFactory_.createSVGElement({
            'element': 'line',
            'attr': {
              'id': ('selectorGrip_rotateconnector'),
              'stroke': '#22C',
              'stroke-width': '1'
            }
          })
        );

        this.rotateGrip = this.selectorGripsGroup.appendChild(
          svgFactory_.createSVGElement({
            'element': 'circle',
            'attr': {
              'id': 'selectorGrip_rotate',
              'fill': 'lime',
              'r': gripRadius,
              'stroke': '#22C',
              'stroke-width': 2,
              'style': 'cursor:url(' + config_.imgPath + 'rotate.png) 12 12, auto;'
            }
          })
        );
        $.data(this.rotateGrip, 'type', 'rotate');

        if ($('#canvasBackground').length) {return;}

        var dims = config_.dimensions;
        var canvasbg = svgFactory_.createSVGElement({
          'element': 'svg',
          'attr': {
            'id': 'canvasBackground',
            'width': dims[0],
            'height': dims[1],
            'x': 0,
            'y': 0,
            'overflow': (svgedit.browser.isWebkit() ? 'none' : 'visible'), // Chrome 7 has a problem with this when zooming out
            'style': 'pointer-events:none'
          }
        });

        var rect = svgFactory_.createSVGElement({
          'element': 'rect',
          'attr': {
            'width': '100%',
            'height': '100%',
            'x': 0,
            'y': 0,
            'stroke-width': 1,
            'stroke': '#000',
            'fill': '#FFF',
            'style': 'pointer-events:none'
          }
        });

        // Both Firefox and WebKit are too slow with this filter region (especially at higher
        // zoom levels) and Opera has at least one bug
//	if (!svgedit.browser.isOpera()) rect.setAttribute('filter', 'url(#canvashadow)');
        canvasbg.appendChild(rect);
        svgFactory_.svgRoot().insertBefore(canvasbg, svgFactory_.svgContent());
      };

// Function: svgedit.select.SelectorManager.requestSelector
// Returns the selector based on the given element
//
// Parameters:
// elem - DOM element to get the selector for
// bbox - Optional bbox to use for reset (prevents duplicate getBBox call).
      svgedit.select.SelectorManager.prototype.requestSelector = function(elem, bbox) {
        if (elem == null) {return null;}
        var i,
          N = this.selectors.length;
        // If we've already acquired one for this element, return it.
        if (typeof(this.selectorMap[elem.id]) == 'object') {
          this.selectorMap[elem.id].locked = true;
          return this.selectorMap[elem.id];
        }
        for (i = 0; i < N; ++i) {
          if (this.selectors[i] && !this.selectors[i].locked) {
            this.selectors[i].locked = true;
            this.selectors[i].reset(elem, bbox);
            this.selectorMap[elem.id] = this.selectors[i];
            return this.selectors[i];
          }
        }
        // if we reached here, no available selectors were found, we create one
        this.selectors[N] = new svgedit.select.Selector(N, elem, bbox);
        this.selectorParentGroup.appendChild(this.selectors[N].selectorGroup);
        this.selectorMap[elem.id] = this.selectors[N];
        return this.selectors[N];
      };

// Function: svgedit.select.SelectorManager.releaseSelector
// Removes the selector of the given element (hides selection box)
//
// Parameters:
// elem - DOM element to remove the selector for
      svgedit.select.SelectorManager.prototype.releaseSelector = function(elem) {
        if (elem == null) {return;}
        var i,
          N = this.selectors.length,
          sel = this.selectorMap[elem.id];
        if (!sel.locked) {
          // TODO(codedread): Ensure this exists in this module.
          console.log('WARNING! selector was released but was already unlocked');
        }
        for (i = 0; i < N; ++i) {
          if (this.selectors[i] && this.selectors[i] == sel) {
            delete this.selectorMap[elem.id];
            sel.locked = false;
            sel.selectedElement = null;
            sel.showGrips(false);

            // remove from DOM and store reference in JS but only if it exists in the DOM
            try {
              sel.selectorGroup.setAttribute('display', 'none');
            } catch(e) { }

            break;
          }
        }
      };

// Function: svgedit.select.SelectorManager.getRubberBandBox
// Returns the rubberBandBox DOM element. This is the rectangle drawn by the user for selecting/zooming
      svgedit.select.SelectorManager.prototype.getRubberBandBox = function() {
        if (!this.rubberBandBox) {
          this.rubberBandBox = this.selectorParentGroup.appendChild(
            svgFactory_.createSVGElement({
              'element': 'rect',
              'attr': {
                'id': 'selectorRubberBand',
                'fill': '#22C',
                'fill-opacity': 0.15,
                'stroke': '#22C',
                'stroke-width': 0.5,
                'display': 'none',
                'style': 'pointer-events:none'
              }
            })
          );
        }
        return this.rubberBandBox;
      };


      /**
       * Interface: svgedit.select.SVGFactory
       * An object that creates SVG elements for the canvas.
       *
       * interface svgedit.select.SVGFactory {
       *   SVGElement createSVGElement(jsonMap);
       *   SVGSVGElement svgRoot();
       *   SVGSVGElement svgContent();
       *
       *   Number currentZoom();
       *   Object getStrokedBBox(Element[]); // TODO(codedread): Remove when getStrokedBBox() has been put into svgutils.js
       * }
       */

      /**
       * Function: svgedit.select.init()
       * Initializes this module.
       *
       * Parameters:
       * config - an object containing configurable parameters (imgPath)
       * svgFactory - an object implementing the SVGFactory interface (see above).
       */
      svgedit.select.init = function(config, svgFactory) {
        config_ = config;
        svgFactory_ = svgFactory;
        selectorManager_ = new svgedit.select.SelectorManager();
      };

      /**
       * Function: svgedit.select.getSelectorManager
       *
       * Returns:
       * The SelectorManager instance.
       */
      svgedit.select.getSelectorManager = function() {
        return selectorManager_;
      };
    }
  }
}();

/** draw **/
var mydraw = function () {
  "use strict";
  return {
    initDraw: function () {
      if (!svgedit.draw) {
        svgedit.draw = {};
      }
// alias
      var NS = svgedit.NS;

      var visElems = 'a,circle,ellipse,foreignObject,g,image,line,path,polygon,polyline,rect,svg,text,tspan,use'.split(',');

      var RandomizeModes = {
        LET_DOCUMENT_DECIDE: 0,
        ALWAYS_RANDOMIZE: 1,
        NEVER_RANDOMIZE: 2
      };
      var randomize_ids = RandomizeModes.LET_DOCUMENT_DECIDE;


      /**
       * Called to ensure that drawings will or will not have randomized ids.
       * The currentDrawing will have its nonce set if it doesn't already.
       * @param {boolean} enableRandomization - flag indicating if documents should have randomized ids
       * @param {svgedit.draw.Drawing} currentDrawing
       */
      svgedit.draw.randomizeIds = function(enableRandomization, currentDrawing) {
        randomize_ids = enableRandomization === false ?
          RandomizeModes.NEVER_RANDOMIZE :
          RandomizeModes.ALWAYS_RANDOMIZE;

        if (randomize_ids == RandomizeModes.ALWAYS_RANDOMIZE && !currentDrawing.getNonce()) {
          currentDrawing.setNonce(Math.floor(Math.random() * 100001));
        } else if (randomize_ids == RandomizeModes.NEVER_RANDOMIZE && currentDrawing.getNonce()) {
          currentDrawing.clearNonce();
        }
      };

      /**
       * This class encapsulates the concept of a SVG-edit drawing
       * @param {SVGSVGElement} svgElem - The SVG DOM Element that this JS object
       *     encapsulates.  If the svgElem has a se:nonce attribute on it, then
       *     IDs will use the nonce as they are generated.
       * @param {String=svg_} [opt_idPrefix] - The ID prefix to use.
       */
      svgedit.draw.Drawing = function(svgElem, opt_idPrefix) {
        if (!svgElem || !svgElem.tagName || !svgElem.namespaceURI ||
          svgElem.tagName != 'svg' || svgElem.namespaceURI != NS.SVG) {
          throw "Error: svgedit.draw.Drawing instance initialized without a <svg> element";
        }

        /**
         * The SVG DOM Element that represents this drawing.
         * @type {SVGSVGElement}
         */
        this.svgElem_ = svgElem;

        /**
         * The latest object number used in this drawing.
         * @type {number}
         */
        this.obj_num = 0;

        /**
         * The prefix to prepend to each element id in the drawing.
         * @type {String}
         */
        this.idPrefix = opt_idPrefix || "svg_";

        /**
         * An array of released element ids to immediately reuse.
         * @type {Array.<number>}
         */
        this.releasedNums = [];

        /**
         * The z-ordered array of Layer objects. Each layer has a name
         * and group element.
         * The first layer is the one at the bottom of the rendering.
         * @type {Array.<Layer>}
         */
        this.all_layers = [];

        /**
         * Map of all_layers by name.
         *
         * Note: Layers are ordered, but referenced externally by name; so, we need both container
         * types depending on which function is called (i.e. all_layers and layer_map).
         *
         * @type {Object.<string, Layer>}
         */
        this.layer_map = {};

        /**
         * The current layer being used.
         * @type {Layer}
         */
        this.current_layer = null;

        /**
         * The nonce to use to uniquely identify elements across drawings.
         * @type {!String}
         */
        this.nonce_ = '';
        var n = this.svgElem_.getAttributeNS(NS.SE, 'nonce');
        // If already set in the DOM, use the nonce throughout the document
        // else, if randomizeIds(true) has been called, create and set the nonce.
        if (!!n && randomize_ids != RandomizeModes.NEVER_RANDOMIZE) {
          this.nonce_ = n;
        } else if (randomize_ids == RandomizeModes.ALWAYS_RANDOMIZE) {
          this.setNonce(Math.floor(Math.random() * 100001));
        }
      };

      /**
       * @param {string} id Element ID to retrieve
       * @returns {Element} SVG element within the root SVGSVGElement
       */
      svgedit.draw.Drawing.prototype.getElem_ = function (id) {
        if (this.svgElem_.querySelector) {
          // querySelector lookup
          return this.svgElem_.querySelector('#' + id);
        }
        // jQuery lookup: twice as slow as xpath in FF
        return $(this.svgElem_).find('[id=' + id + ']')[0];
      };

      /**
       * @returns {SVGSVGElement}
       */
      svgedit.draw.Drawing.prototype.getSvgElem = function () {
        return this.svgElem_;
      };

      /**
       * @returns {!string|number} The previously set nonce
       */
      svgedit.draw.Drawing.prototype.getNonce = function() {
        return this.nonce_;
      };

      /**
       * @param {!string|number} n The nonce to set
       */
      svgedit.draw.Drawing.prototype.setNonce = function(n) {
        this.svgElem_.setAttributeNS(NS.XMLNS, 'xmlns:se', NS.SE);
        this.svgElem_.setAttributeNS(NS.SE, 'se:nonce', n);
        this.nonce_ = n;
      };

      /**
       * Clears any previously set nonce
       */
      svgedit.draw.Drawing.prototype.clearNonce = function () {
        // We deliberately leave any se:nonce attributes alone,
        // we just don't use it to randomize ids.
        this.nonce_ = '';
      };

      /**
       * Returns the latest object id as a string.
       * @return {String} The latest object Id.
       */
      svgedit.draw.Drawing.prototype.getId = function () {
        return this.nonce_ ?
          this.idPrefix + this.nonce_ + '_' + this.obj_num :
          this.idPrefix + this.obj_num;
      };

      /**
       * Returns the next object Id as a string.
       * @return {String} The next object Id to use.
       */
      svgedit.draw.Drawing.prototype.getNextId = function () {
        var oldObjNum = this.obj_num;
        var restoreOldObjNum = false;

        // If there are any released numbers in the release stack,
        // use the last one instead of the next obj_num.
        // We need to temporarily use obj_num as that is what getId() depends on.
        if (this.releasedNums.length > 0) {
          this.obj_num = this.releasedNums.pop();
          restoreOldObjNum = true;
        } else {
          // If we are not using a released id, then increment the obj_num.
          this.obj_num++;
        }

        // Ensure the ID does not exist.
        var id = this.getId();
        while (this.getElem_(id)) {
          if (restoreOldObjNum) {
            this.obj_num = oldObjNum;
            restoreOldObjNum = false;
          }
          this.obj_num++;
          id = this.getId();
        }
        // Restore the old object number if required.
        if (restoreOldObjNum) {
          this.obj_num = oldObjNum;
        }
        return id;
      };

      /**
       * Releases the object Id, letting it be used as the next id in getNextId().
       * This method DOES NOT remove any elements from the DOM, it is expected
       * that client code will do this.
       * @param {string} id - The id to release.
       * @returns {boolean} True if the id was valid to be released, false otherwise.
       */
      svgedit.draw.Drawing.prototype.releaseId = function (id) {
        // confirm if this is a valid id for this Document, else return false
        var front = this.idPrefix + (this.nonce_ ? this.nonce_ + '_' : '');
        if (typeof id !== 'string' || id.indexOf(front) !== 0) {
          return false;
        }
        // extract the obj_num of this id
        var num = parseInt(id.substr(front.length), 10);

        // if we didn't get a positive number or we already released this number
        // then return false.
        if (typeof num !== 'number' || num <= 0 || this.releasedNums.indexOf(num) != -1) {
          return false;
        }

        // push the released number into the released queue
        this.releasedNums.push(num);

        return true;
      };

      /**
       * Returns the number of layers in the current drawing.
       * @returns {integer} The number of layers in the current drawing.
       */
      svgedit.draw.Drawing.prototype.getNumLayers = function() {
        return this.all_layers.length;
      };

      /**
       * Check if layer with given name already exists
       * @param {string} name - The layer name to check
       */
      svgedit.draw.Drawing.prototype.hasLayer = function (name) {
        return this.layer_map[name] !== undefined;
      };


      /**
       * Returns the name of the ith layer. If the index is out of range, an empty string is returned.
       * @param {integer} i - The zero-based index of the layer you are querying.
       * @returns {string} The name of the ith layer (or the empty string if none found)
       */
      svgedit.draw.Drawing.prototype.getLayerName = function (i) {
        return i >= 0 && i < this.getNumLayers() ? this.all_layers[i].getName() : '';
      };

      /**
       * @returns {SVGGElement} The SVGGElement representing the current layer.
       */
      svgedit.draw.Drawing.prototype.getCurrentLayer = function() {
        return this.current_layer ? this.current_layer.getGroup() : null;
      };

      /**
       * Get a layer by name.
       * @returns {SVGGElement} The SVGGElement representing the named layer or null.
       */
      svgedit.draw.Drawing.prototype.getLayerByName = function(name) {
        var layer = this.layer_map[name];
        return layer ? layer.getGroup() : null;
      };

      /**
       * Returns the name of the currently selected layer. If an error occurs, an empty string
       * is returned.
       * @returns {string} The name of the currently active layer (or the empty string if none found).
       */
      svgedit.draw.Drawing.prototype.getCurrentLayerName = function () {
        return this.current_layer ? this.current_layer.getName() : '';
      };

      /**
       * Set the current layer's name.
       * @param {string} name - The new name.
       * @param {svgedit.history.HistoryRecordingService} hrService - History recording service
       * @returns {string|null} The new name if changed; otherwise, null.
       */
      svgedit.draw.Drawing.prototype.setCurrentLayerName = function (name, hrService) {
        var finalName = null;
        if (this.current_layer) {
          var oldName = this.current_layer.getName();
          finalName = this.current_layer.setName(name, hrService);
          if (finalName) {
            delete this.layer_map[oldName];
            this.layer_map[finalName] = this.current_layer;
          }
        }
        return finalName;
      };

      /**
       * Set the current layer's position.
       * @param {number} newpos - The zero-based index of the new position of the layer. Range should be 0 to layers-1
       * @returns {Object} If the name was changed, returns {title:SVGGElement, previousName:string}; otherwise null.
       */
      svgedit.draw.Drawing.prototype.setCurrentLayerPosition = function (newpos) {
        var layer_count = this.getNumLayers();
        if (!this.current_layer || newpos < 0 || newpos >= layer_count) {
          return null;
        }

        var oldpos;
        for (oldpos = 0; oldpos < layer_count; ++oldpos) {
          if (this.all_layers[oldpos] == this.current_layer) {break;}
        }
        // some unknown error condition (current_layer not in all_layers)
        if (oldpos == layer_count) { return null; }

        if (oldpos != newpos) {
          // if our new position is below us, we need to insert before the node after newpos
          var refGroup = null;
          var current_group = this.current_layer.getGroup();
          var oldNextSibling = current_group.nextSibling;
          if (newpos > oldpos ) {
            if (newpos < layer_count-1) {
              refGroup = this.all_layers[newpos+1].getGroup();
            }
          }
          // if our new position is above us, we need to insert before the node at newpos
          else {
            refGroup = this.all_layers[newpos].getGroup();
          }
          this.svgElem_.insertBefore(current_group, refGroup);

          this.identifyLayers();
          this.setCurrentLayer(this.getLayerName(newpos));

          return {
            currentGroup: current_group,
            oldNextSibling: oldNextSibling
          };
        }
        return null;
      };

      svgedit.draw.Drawing.prototype.mergeLayer = function (hrService) {
        var current_group = this.current_layer.getGroup();
        var prevGroup = $(current_group).prev()[0];
        if (!prevGroup) {return;}

        hrService.startBatchCommand('Merge Layer');

        var layerNextSibling = current_group.nextSibling;
        hrService.removeElement(current_group, layerNextSibling, this.svgElem_);

        while (current_group.firstChild) {
          var child = current_group.firstChild;
          if (child.localName == 'title') {
            hrService.removeElement(child, child.nextSibling, current_group);
            current_group.removeChild(child);
            continue;
          }
          var oldNextSibling = child.nextSibling;
          prevGroup.appendChild(child);
          hrService.moveElement(child, oldNextSibling, current_group);
        }

        // Remove current layer's group
        this.current_layer.removeGroup();
        // Remove the current layer and set the previous layer as the new current layer
        var index = this.all_layers.indexOf(this.current_layer);
        if (index > 0) {
          var name = this.current_layer.getName();
          this.current_layer = this.all_layers[index-1]
          this.all_layers.splice(index, 1);
          delete this.layer_map[name];
        }

        hrService.endBatchCommand();
      };

      svgedit.draw.Drawing.prototype.mergeAllLayers = function (hrService) {
        // Set the current layer to the last layer.
        this.current_layer = this.all_layers[this.all_layers.length-1];

        hrService.startBatchCommand('Merge all Layers');
        while (this.all_layers.length > 1) {
          this.mergeLayer(hrService);
        }
        hrService.endBatchCommand();
      };

      /**
       * Sets the current layer. If the name is not a valid layer name, then this
       * function returns false. Otherwise it returns true. This is not an
       * undo-able action.
       * @param {string} name - The name of the layer you want to switch to.
       * @returns {boolean} true if the current layer was switched, otherwise false
       */
      svgedit.draw.Drawing.prototype.setCurrentLayer = function(name) {
        var layer = this.layer_map[name];
        if (layer) {
          if (this.current_layer) {
            this.current_layer.deactivate();
          }
          this.current_layer = layer;
          this.current_layer.activate();
          return true;
        }
        return false;
      };


      /**
       * Deletes the current layer from the drawing and then clears the selection.
       * This function then calls the 'changed' handler.  This is an undoable action.
       * @returns {SVGGElement} The SVGGElement of the layer removed or null.
       */
      svgedit.draw.Drawing.prototype.deleteCurrentLayer = function() {
        if (this.current_layer && this.getNumLayers() > 1) {
          var oldLayerGroup = this.current_layer.removeGroup();
          this.identifyLayers();
          return oldLayerGroup;
        }
        return null;
      };

      /**
       * Find the layer name in a group element.
       * @param group The group element to search in.
       * @returns {string} The layer name or empty string.
       */
      function findLayerNameInGroup(group) {
        var name = $("title", group).text();

        // Hack for Opera 10.60
        if (!name && svgedit.browser.isOpera() && group.querySelectorAll) {
          name = $(group.querySelectorAll('title')).text();
        }
        return name;
      }

      /**
       * Given a set of names, return a new unique name.
       * @param {Array.<string>} existingLayerNames - Existing layer names.
       * @returns {string} - The new name.
       */
      function getNewLayerName(existingLayerNames) {
        var i = 1;
        // TODO(codedread): What about internationalization of "Layer"?
        while (existingLayerNames.indexOf(("Layer " + i)) >= 0) { i++; }
        return "Layer " + i;
      }

      /**
       * Updates layer system and sets the current layer to the
       * top-most layer (last <g> child of this drawing).
       */
      svgedit.draw.Drawing.prototype.identifyLayers = function() {
        this.all_layers = [];
        this.layer_map = {};
        var numchildren = this.svgElem_.childNodes.length;
        // loop through all children of SVG element
        var orphans = [], layernames = [];
        var layer = null;
        var childgroups = false;
        for (var i = 0; i < numchildren; ++i) {
          var child = this.svgElem_.childNodes.item(i);
          // for each g, find its layer name
          if (child && child.nodeType == 1) {
            if (child.tagName == "g") {
              childgroups = true;
              var name = findLayerNameInGroup(child);
              if (name) {
                layernames.push(name);
                layer = new svgedit.draw.Layer(name, child);
                this.all_layers.push(layer);
                this.layer_map[name] = layer;
              } else {
                // if group did not have a name, it is an orphan
                orphans.push(child);
              }
            } else if (~visElems.indexOf(child.nodeName)) {
              // Child is "visible" (i.e. not a <title> or <defs> element), so it is an orphan
              orphans.push(child);
            }
          }
        }

        // If orphans or no layers found, create a new layer and add all the orphans to it
        if (orphans.length > 0 || !childgroups) {
          layer = new svgedit.draw.Layer(getNewLayerName(layernames), null, this.svgElem_);
          layer.appendChildren(orphans);
          this.all_layers.push(layer);
          this.layer_map[name] = layer;
        } else {
          layer.activate();
        }
        this.current_layer = layer;
      };

      /**
       * Creates a new top-level layer in the drawing with the given name and
       * makes it the current layer.
       * @param {string} name - The given name. If the layer name exists, a new name will be generated.
       * @param {svgedit.history.HistoryRecordingService} hrService - History recording service
       * @returns {SVGGElement} The SVGGElement of the new layer, which is
       * 		also the current layer of this drawing.
       */
      svgedit.draw.Drawing.prototype.createLayer = function(name, hrService) {
        if (this.current_layer) {
          this.current_layer.deactivate();
        }
        // Check for duplicate name.
        if (name === undefined || name === null || name === '' || this.layer_map[name]) {
          name = getNewLayerName(Object.keys(this.layer_map));
        }

        // Crate new layer and add to DOM as last layer
        var layer = new svgedit.draw.Layer(name, null, this.svgElem_);
        // Like to assume hrService exists, but this is backwards compatible with old version of createLayer.
        if (hrService) {
          hrService.startBatchCommand('Create Layer');
          hrService.insertElement(layer.getGroup());
          hrService.endBatchCommand();
        }

        this.all_layers.push(layer);
        this.layer_map[name] = layer;
        this.current_layer = layer;
        return layer.getGroup();
      };

      /**
       * Creates a copy of the current layer with the given name and makes it the current layer.
       * @param {string} name - The given name. If the layer name exists, a new name will be generated.
       * @param {svgedit.history.HistoryRecordingService} hrService - History recording service
       * @returns {SVGGElement} The SVGGElement of the new layer, which is
       * 		also the current layer of this drawing.
       */
      svgedit.draw.Drawing.prototype.cloneLayer = function(name, hrService) {
        if (!this.current_layer) {return null;}
        this.current_layer.deactivate();
        // Check for duplicate name.
        if (name === undefined || name === null || name === '' || this.layer_map[name]) {
          name = getNewLayerName(Object.keys(this.layer_map));
        }

        // Create new group and add to DOM just after current_layer
        var currentGroup = this.current_layer.getGroup();
        var layer = new svgedit.draw.Layer(name, currentGroup, this.svgElem_);
        var group  = layer.getGroup();

        // Clone children
        var children = currentGroup.childNodes;
        var index;
        for (index = 0; index < children.length; index++) {
          var ch = children[index];
          if (ch.localName == 'title') {continue;}
          group.appendChild(this.copyElem(ch));
        }

        if (hrService) {
          hrService.startBatchCommand('Duplicate Layer');
          hrService.insertElement(group);
          hrService.endBatchCommand();
        }

        // Update layer containers and current_layer.
        index = this.all_layers.indexOf(this.current_layer);
        if (index >= 0) {
          this.all_layers.splice(index + 1, 0, layer);
        } else {
          this.all_layers.push(layer);
        }
        this.layer_map[name] = layer;
        this.current_layer = layer;
        return group;
      };

      /**
       * Returns whether the layer is visible.  If the layer name is not valid,
       * then this function returns false.
       * @param {string} layername - The name of the layer which you want to query.
       * @returns {boolean} The visibility state of the layer, or false if the layer name was invalid.
       */
      svgedit.draw.Drawing.prototype.getLayerVisibility = function(layername) {
        var layer = this.layer_map[layername];
        return layer ? layer.isVisible() : false;
      };

      /**
       * Sets the visibility of the layer. If the layer name is not valid, this
       * function returns false, otherwise it returns true. This is an
       * undo-able action.
       * @param {string} layername - The name of the layer to change the visibility
       * @param {boolean} bVisible - Whether the layer should be visible
       * @returns {?SVGGElement} The SVGGElement representing the layer if the
       *   layername was valid, otherwise null.
       */
      svgedit.draw.Drawing.prototype.setLayerVisibility = function(layername, bVisible) {
        if (typeof bVisible !== 'boolean') {
          return null;
        }
        var layer = this.layer_map[layername];
        if (!layer) {return null;}
        layer.setVisible(bVisible);
        return layer.getGroup();
      };


      /**
       * Returns the opacity of the given layer.  If the input name is not a layer, null is returned.
       * @param {string} layername - name of the layer on which to get the opacity
       * @returns {?number} The opacity value of the given layer.  This will be a value between 0.0 and 1.0, or null
       * if layername is not a valid layer
       */
      svgedit.draw.Drawing.prototype.getLayerOpacity = function(layername) {
        var layer = this.layer_map[layername];
        if (!layer) {return null;}
        return layer.getOpacity();
      };

      /**
       * Sets the opacity of the given layer.  If the input name is not a layer,
       * nothing happens. If opacity is not a value between 0.0 and 1.0, then
       * nothing happens.
       * @param {string} layername - Name of the layer on which to set the opacity
       * @param {number} opacity - A float value in the range 0.0-1.0
       */
      svgedit.draw.Drawing.prototype.setLayerOpacity = function(layername, opacity) {
        if (typeof opacity !== 'number' || opacity < 0.0 || opacity > 1.0) {
          return;
        }
        var layer = this.layer_map[layername];
        if (layer) {
          layer.setOpacity(opacity);
        }
      };

      /**
       * Create a clone of an element, updating its ID and its children's IDs when needed
       * @param {Element} el - DOM element to clone
       * @returns {Element}
       */
      svgedit.draw.Drawing.prototype.copyElem = function(el) {
        var self = this;
        var getNextIdClosure = function() { return self.getNextId();}
        return svgedit.utilities.copyElem(el, getNextIdClosure)
      }
    }
  }
}();


/** draw **/
var mylayer= function () {
  "use strict";
  return {
    init: function () {
      if (!svgedit.draw) {
        svgedit.draw = {};
      }
      var NS = svgedit.NS;

      /**
       * This class encapsulates the concept of a layer in the drawing. It can be constructed with
       * an existing group element or, with three parameters, will create a new layer group element.
       *
       * Usage:
       * new Layer'name', group)          // Use the existing group for this layer.
       * new Layer('name', group, svgElem) // Create a new group and add it to the DOM after group.
       * new Layer('name', null, svgElem)  // Create a new group and add it to the DOM as the last layer.
       *
       * @param {string} name - Layer name
       * @param {SVGGElement|null} group - An existing SVG group element or null.
       * 		If group and no svgElem, use group for this layer.
       * 		If group and svgElem, create a new group element and insert it in the DOM after group.
       * 		If no group and svgElem, create a new group element and insert it in the DOM as the last layer.
       * @param {SVGGElement=} svgElem - The SVG DOM element. If defined, use this to add
       * 		a new layer to the document.
       */
      var Layer = svgedit.draw.Layer = function(name, group, svgElem) {
        this.name_ = name;
        this.group_ = svgElem ? null : group;

        if (svgElem) {
          // Create a group element with title and add it to the DOM.
          var svgdoc = svgElem.ownerDocument;
          this.group_ = svgdoc.createElementNS(NS.SVG, "g");
          var layer_title = svgdoc.createElementNS(NS.SVG, "title");
          layer_title.textContent = name;
          this.group_.appendChild(layer_title);
          if (group) {
            $(group).after(this.group_);
          } else {
            svgElem.appendChild(this.group_);
          }
        }

        addLayerClass(this.group_);
        svgedit.utilities.walkTree(this.group_, function(e){e.setAttribute("style", "pointer-events:inherit");});

        this.group_.setAttribute("style", svgElem ? "pointer-events:all" : "pointer-events:none");
      };

      /**
       * @type {string} CLASS_NAME - class attribute assigned to all layer groups.
       */
      Layer.CLASS_NAME = 'layer';

      /**
       * @type {RegExp} CLASS_REGEX - Used to test presence of class Layer.CLASS_NAME
       */
      Layer.CLASS_REGEX = new RegExp('(\\s|^)' + Layer.CLASS_NAME + '(\\s|$)');


      /**
       * Get the layer's name.
       * @returns {string} The layer name
       */
      Layer.prototype.getName = function() {
        return this.name_;
      };

      /**
       * Get the group element for this layer.
       * @returns {SVGGElement} The layer SVG group
       */
      Layer.prototype.getGroup = function() {
        return this.group_;
      };

      /**
       * Active this layer so it takes pointer events.
       */
      Layer.prototype.activate = function() {
        this.group_.setAttribute("style", "pointer-events:all");
      };

      /**
       * Deactive this layer so it does NOT take pointer events.
       */
      Layer.prototype.deactivate = function() {
        this.group_.setAttribute("style", "pointer-events:none");
      };

      /**
       * Set this layer visible or hidden based on 'visible' parameter.
       * @param {boolean} visible - If true, make visible; otherwise, hide it.
       */
      Layer.prototype.setVisible = function(visible) {
        var expected = visible === undefined || visible ? "inline" : "none";
        var oldDisplay = this.group_.getAttribute("display");
        if (oldDisplay !== expected) {
          this.group_.setAttribute("display", expected);
        }
      };

      /**
       * Is this layer visible?
       * @returns {boolean} True if visible.
       */
      Layer.prototype.isVisible = function() {
        return this.group_.getAttribute('display') !== 'none';
      };

      /**
       * Get layer opacity.
       * @returns {number} Opacity value.
       */
      Layer.prototype.getOpacity = function() {
        var opacity = this.group_.getAttribute('opacity');
        if (opacity === null || opacity === undefined) {
          return 1;
        }
        return parseFloat(opacity);
      };

      /**
       * Sets the opacity of this layer. If opacity is not a value between 0.0 and 1.0,
       * nothing happens.
       * @param {number} opacity - A float value in the range 0.0-1.0
       */
      Layer.prototype.setOpacity = function(opacity) {
        if (typeof opacity === 'number' && opacity >= 0.0 && opacity <= 1.0) {
          this.group_.setAttribute('opacity', opacity);
        }
      };

      /**
       * Append children to this layer.
       * @param {SVGGElement} children - The children to append to this layer.
       */
      Layer.prototype.appendChildren = function(children) {
        for (var i = 0; i < children.length; ++i) {
          this.group_.appendChild(children[i]);
        }
      };

      Layer.prototype.getTitleElement = function() {
        var len = this.group_.childNodes.length;
        for (var i = 0; i < len; ++i) {
          var child = this.group_.childNodes.item(i);
          if (child && child.tagName === 'title') {
            return child;
          }
        }
        return null;
      };

      /**
       * Set the name of this layer.
       * @param {string} name - The new name.
       * @param {svgedit.history.HistoryRecordingService} hrService - History recording service
       * @returns {string|null} The new name if changed; otherwise, null.
       */
      Layer.prototype.setName = function(name, hrService) {
        var previousName = this.name_;
        name = svgedit.utilities.toXml(name);
        // now change the underlying title element contents
        var title = this.getTitleElement();
        if (title) {
          while (title.firstChild) { title.removeChild(title.firstChild); }
          title.textContent = name;
          this.name_ = name;
          if (hrService) {
            hrService.changeElement(title, {'#text':previousName});
          }
          return this.name_;
        }
        return null;
      };

      /**
       * Remove this layer's group from the DOM. No more functions on group can be called after this.
       * @param {SVGGElement} children - The children to append to this layer.
       * @returns {SVGGElement} The layer SVG group that was just removed.
       */
      Layer.prototype.removeGroup = function() {
        var parent = this.group_.parentNode;
        var group = parent.removeChild(this.group_);
        this.group_ = undefined;
        return group;
      };


      /**
       * Add class Layer.CLASS_NAME to the element (usually class='layer').
       *
       * Parameters:
       * @param {SVGGElement} elem - The SVG element to update
       */
      function addLayerClass(elem) {
        var classes = elem.getAttribute('class');
        if (classes === null || classes === undefined || classes.length === 0) {
          elem.setAttribute('class', Layer.CLASS_NAME);
        } else if (! Layer.CLASS_REGEX.test(classes)) {
          elem.setAttribute('class', classes + ' ' + Layer.CLASS_NAME);
        }
      }
    }
  }
}();

/** path **/
(function() {'use strict';

  if (!svgedit.path) {
    svgedit.path = {};
  }

  var NS = svgedit.NS;
  var uiStrings = {
    'pathNodeTooltip': 'Drag node to move it. Double-click node to change segment type',
    'pathCtrlPtTooltip': 'Drag control point to adjust curve properties'
  };

  var segData = {
    2: ['x', 'y'],
    4: ['x', 'y'],
    6: ['x', 'y', 'x1', 'y1', 'x2', 'y2'],
    8: ['x', 'y', 'x1', 'y1'],
    10: ['x', 'y', 'r1', 'r2', 'angle', 'largeArcFlag', 'sweepFlag'],
    12: ['x'],
    14: ['y'],
    16: ['x', 'y', 'x2', 'y2'],
    18: ['x', 'y']
  };

  var pathFuncs = [];

  var link_control_pts = true;

// Stores references to paths via IDs.
// TODO: Make this cross-document happy.
  var pathData = {};

  svgedit.path.setLinkControlPoints = function(lcp) {
    link_control_pts = lcp;
  };

  svgedit.path.path = null;

  var editorContext_ = null;

  svgedit.path.init = function(editorContext) {
    editorContext_ = editorContext;

    pathFuncs = [0, 'ClosePath'];
    var pathFuncsStrs = ['Moveto', 'Lineto', 'CurvetoCubic', 'CurvetoQuadratic', 'Arc',
      'LinetoHorizontal', 'LinetoVertical', 'CurvetoCubicSmooth', 'CurvetoQuadraticSmooth'];
    $.each(pathFuncsStrs, function(i, s) {
      pathFuncs.push(s+'Abs');
      pathFuncs.push(s+'Rel');
    });
  };

  svgedit.path.insertItemBefore = function(elem, newseg, index) {
    // Support insertItemBefore on paths for FF2
    var list = elem.pathSegList;

    if (svgedit.browser.supportsPathInsertItemBefore()) {
      list.insertItemBefore(newseg, index);
      return;
    }
    var len = list.numberOfItems;
    var arr = [];
    var i;
    for (i=0; i < len; i++) {
      var cur_seg = list.getItem(i);
      arr.push(cur_seg);
    }
    list.clear();
    for (i=0; i < len; i++) {
      if (i == index) { //index+1
        list.appendItem(newseg);
      }
      list.appendItem(arr[i]);
    }
  };

// TODO: See if this should just live in replacePathSeg
  svgedit.path.ptObjToArr = function(type, seg_item) {
    var arr = segData[type], len = arr.length;
    var i, out = [];
    for (i = 0; i < len; i++) {
      out[i] = seg_item[arr[i]];
    }
    return out;
  };

  svgedit.path.getGripPt = function(seg, alt_pt) {
    var out = {
      x: alt_pt? alt_pt.x : seg.item.x,
      y: alt_pt? alt_pt.y : seg.item.y
    }, path = seg.path;

    if (path.matrix) {
      var pt = svgedit.math.transformPoint(out.x, out.y, path.matrix);
      out = pt;
    }

    out.x *= editorContext_.getCurrentZoom();
    out.y *= editorContext_.getCurrentZoom();

    return out;
  };

  svgedit.path.getPointFromGrip = function(pt, path) {
    var out = {
      x: pt.x,
      y: pt.y
    };

    if (path.matrix) {
      pt = svgedit.math.transformPoint(out.x, out.y, path.imatrix);
      out.x = pt.x;
      out.y = pt.y;
    }

    out.x /= editorContext_.getCurrentZoom();
    out.y /= editorContext_.getCurrentZoom();

    return out;
  };

  svgedit.path.addPointGrip = function(index, x, y) {
    // create the container of all the point grips
    var pointGripContainer = svgedit.path.getGripContainer();

    var pointGrip = svgedit.utilities.getElem('pathpointgrip_'+index);
    // create it
    if (!pointGrip) {
      pointGrip = document.createElementNS(NS.SVG, 'circle');
      svgedit.utilities.assignAttributes(pointGrip, {
        'id': 'pathpointgrip_' + index,
        'display': 'none',
        'r': 4,
        'fill': '#0FF',
        'stroke': '#00F',
        'stroke-width': 2,
        'cursor': 'move',
        'style': 'pointer-events:all',
        'xlink:title': uiStrings.pathNodeTooltip
      });
      pointGrip = pointGripContainer.appendChild(pointGrip);

      var grip = $('#pathpointgrip_'+index);
      grip.dblclick(function() {
        if (svgedit.path.path) {
          svgedit.path.path.setSegType();
        }
      });
    }
    if (x && y) {
      // set up the point grip element and display it
      svgedit.utilities.assignAttributes(pointGrip, {
        'cx': x,
        'cy': y,
        'display': 'inline'
      });
    }
    return pointGrip;
  };

  svgedit.path.getGripContainer = function() {
    var c = svgedit.utilities.getElem('pathpointgrip_container');
    if (!c) {
      var parent = svgedit.utilities.getElem('selectorParentGroup');
      c = parent.appendChild(document.createElementNS(NS.SVG, 'g'));
      c.id = 'pathpointgrip_container';
    }
    return c;
  };

  svgedit.path.addCtrlGrip = function(id) {
    var pointGrip = svgedit.utilities.getElem('ctrlpointgrip_'+id);
    if (pointGrip) {return pointGrip;}

    pointGrip = document.createElementNS(NS.SVG, 'circle');
    svgedit.utilities.assignAttributes(pointGrip, {
      'id': 'ctrlpointgrip_' + id,
      'display': 'none',
      'r': 4,
      'fill': '#0FF',
      'stroke': '#55F',
      'stroke-width': 1,
      'cursor': 'move',
      'style': 'pointer-events:all',
      'xlink:title': uiStrings.pathCtrlPtTooltip
    });
    svgedit.path.getGripContainer().appendChild(pointGrip);
    return pointGrip;
  };

  svgedit.path.getCtrlLine = function(id) {
    var ctrlLine = svgedit.utilities.getElem('ctrlLine_'+id);
    if (ctrlLine) {return ctrlLine;}

    ctrlLine = document.createElementNS(NS.SVG, 'line');
    svgedit.utilities.assignAttributes(ctrlLine, {
      'id': 'ctrlLine_'+id,
      'stroke': '#555',
      'stroke-width': 1,
      'style': 'pointer-events:none'
    });
    svgedit.path.getGripContainer().appendChild(ctrlLine);
    return ctrlLine;
  };

  svgedit.path.getPointGrip = function(seg, update) {
    var index = seg.index;
    var pointGrip = svgedit.path.addPointGrip(index);

    if (update) {
      var pt = svgedit.path.getGripPt(seg);
      svgedit.utilities.assignAttributes(pointGrip, {
        'cx': pt.x,
        'cy': pt.y,
        'display': 'inline'
      });
    }

    return pointGrip;
  };

  svgedit.path.getControlPoints = function(seg) {
    var item = seg.item;
    var index = seg.index;
    if (!('x1' in item) || !('x2' in item)) {return null;}
    var cpt = {};
    var pointGripContainer = svgedit.path.getGripContainer();

    // Note that this is intentionally not seg.prev.item
    var prev = svgedit.path.path.segs[index-1].item;

    var seg_items = [prev, item];

    var i;
    for (i = 1; i < 3; i++) {
      var id = index + 'c' + i;

      var ctrlLine = cpt['c' + i + '_line'] = svgedit.path.getCtrlLine(id);

      var pt = svgedit.path.getGripPt(seg, {x:item['x' + i], y:item['y' + i]});
      var gpt = svgedit.path.getGripPt(seg, {x:seg_items[i-1].x, y:seg_items[i-1].y});

      svgedit.utilities.assignAttributes(ctrlLine, {
        'x1': pt.x,
        'y1': pt.y,
        'x2': gpt.x,
        'y2': gpt.y,
        'display': 'inline'
      });

      cpt['c' + i + '_line'] = ctrlLine;

      // create it
      var pointGrip = cpt['c' + i] = svgedit.path.addCtrlGrip(id);

      svgedit.utilities.assignAttributes(pointGrip, {
        'cx': pt.x,
        'cy': pt.y,
        'display': 'inline'
      });
      cpt['c' + i] = pointGrip;
    }
    return cpt;
  };

// This replaces the segment at the given index. Type is given as number.
  svgedit.path.replacePathSeg = function(type, index, pts, elem) {
    var path = elem || svgedit.path.path.elem;

    var func = 'createSVGPathSeg' + pathFuncs[type];
    var seg = path[func].apply(path, pts);

    if (svgedit.browser.supportsPathReplaceItem()) {
      path.pathSegList.replaceItem(seg, index);
    } else {
      var segList = path.pathSegList;
      var len = segList.numberOfItems;
      var arr = [];
      var i;
      for (i = 0; i < len; i++) {
        var cur_seg = segList.getItem(i);
        arr.push(cur_seg);
      }
      segList.clear();
      for (i = 0; i < len; i++) {
        if (i == index) {
          segList.appendItem(seg);
        } else {
          segList.appendItem(arr[i]);
        }
      }
    }
  };

  svgedit.path.getSegSelector = function(seg, update) {
    var index = seg.index;
    var segLine = svgedit.utilities.getElem('segline_' + index);
    if (!segLine) {
      var pointGripContainer = svgedit.path.getGripContainer();
      // create segline
      segLine = document.createElementNS(NS.SVG, 'path');
      svgedit.utilities.assignAttributes(segLine, {
        'id': 'segline_' + index,
        'display': 'none',
        'fill': 'none',
        'stroke': '#0FF',
        'stroke-width': 2,
        'style':'pointer-events:none',
        'd': 'M0,0 0,0'
      });
      pointGripContainer.appendChild(segLine);
    }

    if (update) {
      var prev = seg.prev;
      if (!prev) {
        segLine.setAttribute('display', 'none');
        return segLine;
      }

      var pt = svgedit.path.getGripPt(prev);
      // Set start point
      svgedit.path.replacePathSeg(2, 0, [pt.x, pt.y], segLine);

      var pts = svgedit.path.ptObjToArr(seg.type, seg.item, true);
      var i;
      for (i = 0; i < pts.length; i += 2) {
        pt = svgedit.path.getGripPt(seg, {x:pts[i], y:pts[i+1]});
        pts[i] = pt.x;
        pts[i+1] = pt.y;
      }

      svgedit.path.replacePathSeg(seg.type, 1, pts, segLine);
    }
    return segLine;
  };

// Function: smoothControlPoints
// Takes three points and creates a smoother line based on them
//
// Parameters:
// ct1 - Object with x and y values (first control point)
// ct2 - Object with x and y values (second control point)
// pt - Object with x and y values (third point)
//
// Returns:
// Array of two "smoothed" point objects
  svgedit.path.smoothControlPoints = function(ct1, ct2, pt) {
    // each point must not be the origin
    var x1 = ct1.x - pt.x,
      y1 = ct1.y - pt.y,
      x2 = ct2.x - pt.x,
      y2 = ct2.y - pt.y;

    if ( (x1 != 0 || y1 != 0) && (x2 != 0 || y2 != 0) ) {
      var anglea = Math.atan2(y1, x1),
        angleb = Math.atan2(y2, x2),
        r1 = Math.sqrt(x1*x1+y1*y1),
        r2 = Math.sqrt(x2*x2+y2*y2),
        nct1 = editorContext_.getSVGRoot().createSVGPoint(),
        nct2 = editorContext_.getSVGRoot().createSVGPoint();
      if (anglea < 0) { anglea += 2*Math.PI; }
      if (angleb < 0) { angleb += 2*Math.PI; }

      var angleBetween = Math.abs(anglea - angleb),
        angleDiff = Math.abs(Math.PI - angleBetween)/2;

      var new_anglea, new_angleb;
      if (anglea - angleb > 0) {
        new_anglea = angleBetween < Math.PI ? (anglea + angleDiff) : (anglea - angleDiff);
        new_angleb = angleBetween < Math.PI ? (angleb - angleDiff) : (angleb + angleDiff);
      }
      else {
        new_anglea = angleBetween < Math.PI ? (anglea - angleDiff) : (anglea + angleDiff);
        new_angleb = angleBetween < Math.PI ? (angleb + angleDiff) : (angleb - angleDiff);
      }

      // rotate the points
      nct1.x = r1 * Math.cos(new_anglea) + pt.x;
      nct1.y = r1 * Math.sin(new_anglea) + pt.y;
      nct2.x = r2 * Math.cos(new_angleb) + pt.x;
      nct2.y = r2 * Math.sin(new_angleb) + pt.y;

      return [nct1, nct2];
    }
    return undefined;
  };

  svgedit.path.Segment = function(index, item) {
    this.selected = false;
    this.index = index;
    this.item = item;
    this.type = item.pathSegType;

    this.ctrlpts = [];
    this.ptgrip = null;
    this.segsel = null;
  };

  svgedit.path.Segment.prototype.showCtrlPts = function(y) {
    var i;
    for (i in this.ctrlpts) {
      if (this.ctrlpts.hasOwnProperty(i)) {
        this.ctrlpts[i].setAttribute('display', y ? 'inline' : 'none');
      }
    }
  };

  svgedit.path.Segment.prototype.selectCtrls = function(y) {
    $('#ctrlpointgrip_' + this.index + 'c1, #ctrlpointgrip_' + this.index + 'c2').
    attr('fill', y ? '#0FF' : '#EEE');
  };

  svgedit.path.Segment.prototype.show = function(y) {
    if (this.ptgrip) {
      this.ptgrip.setAttribute('display', y ? 'inline' : 'none');
      this.segsel.setAttribute('display', y ? 'inline' : 'none');
      // Show/hide all control points if available
      this.showCtrlPts(y);
    }
  };

  svgedit.path.Segment.prototype.select = function(y) {
    if (this.ptgrip) {
      this.ptgrip.setAttribute('stroke', y ? '#0FF' : '#00F');
      this.segsel.setAttribute('display', y ? 'inline' : 'none');
      if (this.ctrlpts) {
        this.selectCtrls(y);
      }
      this.selected = y;
    }
  };

  svgedit.path.Segment.prototype.addGrip = function() {
    this.ptgrip = svgedit.path.getPointGrip(this, true);
    this.ctrlpts = svgedit.path.getControlPoints(this, true);
    this.segsel = svgedit.path.getSegSelector(this, true);
  };

  svgedit.path.Segment.prototype.update = function(full) {
    if (this.ptgrip) {
      var pt = svgedit.path.getGripPt(this);
      svgedit.utilities.assignAttributes(this.ptgrip, {
        'cx': pt.x,
        'cy': pt.y
      });

      svgedit.path.getSegSelector(this, true);

      if (this.ctrlpts) {
        if (full) {
          this.item = svgedit.path.path.elem.pathSegList.getItem(this.index);
          this.type = this.item.pathSegType;
        }
        svgedit.path.getControlPoints(this);
      }
      // this.segsel.setAttribute('display', y?'inline':'none');
    }
  };

  svgedit.path.Segment.prototype.move = function(dx, dy) {
    var cur_pts, item = this.item;

    if (this.ctrlpts) {
      cur_pts = [item.x += dx, item.y += dy,
        item.x1, item.y1, item.x2 += dx, item.y2 += dy];
    } else {
      cur_pts = [item.x += dx, item.y += dy];
    }

    svgedit.path.replacePathSeg(this.type, this.index, cur_pts);

    if (this.next && this.next.ctrlpts) {
      var next = this.next.item;
      var next_pts = [next.x, next.y,
        next.x1 += dx, next.y1 += dy, next.x2, next.y2];
      svgedit.path.replacePathSeg(this.next.type, this.next.index, next_pts);
    }

    if (this.mate) {
      // The last point of a closed subpath has a 'mate',
      // which is the 'M' segment of the subpath
      item = this.mate.item;
      var pts = [item.x += dx, item.y += dy];
      svgedit.path.replacePathSeg(this.mate.type, this.mate.index, pts);
      // Has no grip, so does not need 'updating'?
    }

    this.update(true);
    if (this.next) {this.next.update(true);}
  };

  svgedit.path.Segment.prototype.setLinked = function(num) {
    var seg, anum, pt;
    if (num == 2) {
      anum = 1;
      seg = this.next;
      if (!seg) {return;}
      pt = this.item;
    } else {
      anum = 2;
      seg = this.prev;
      if (!seg) {return;}
      pt = seg.item;
    }

    var item = seg.item;
    item['x' + anum ] = pt.x + (pt.x - this.item['x' + num]);
    item['y' + anum ] = pt.y + (pt.y - this.item['y' + num]);

    var pts = [item.x, item.y,
      item.x1, item.y1,
      item.x2, item.y2];

    svgedit.path.replacePathSeg(seg.type, seg.index, pts);
    seg.update(true);
  };

  svgedit.path.Segment.prototype.moveCtrl = function(num, dx, dy) {
    var item = this.item;
    item['x' + num] += dx;
    item['y' + num] += dy;

    var pts = [item.x,item.y,
      item.x1,item.y1, item.x2,item.y2];

    svgedit.path.replacePathSeg(this.type, this.index, pts);
    this.update(true);
  };

  svgedit.path.Segment.prototype.setType = function(new_type, pts) {
    svgedit.path.replacePathSeg(new_type, this.index, pts);
    this.type = new_type;
    this.item = svgedit.path.path.elem.pathSegList.getItem(this.index);
    this.showCtrlPts(new_type === 6);
    this.ctrlpts = svgedit.path.getControlPoints(this);
    this.update(true);
  };

  svgedit.path.Path = function(elem) {
    if (!elem || elem.tagName !== 'path') {
      throw 'svgedit.path.Path constructed without a <path> element';
    }

    this.elem = elem;
    this.segs = [];
    this.selected_pts = [];
    svgedit.path.path = this;

    this.init();
  };

// Reset path data
  svgedit.path.Path.prototype.init = function() {
    // Hide all grips, etc

    //fixed, needed to work on all found elements, not just first
    $(svgedit.path.getGripContainer()).find('*').each( function() { $(this).attr('display', 'none') });

    var segList = this.elem.pathSegList;
    var len = segList.numberOfItems;
    this.segs = [];
    this.selected_pts = [];
    this.first_seg = null;

    // Set up segs array
    var i;
    for (i = 0; i < len; i++) {
      var item = segList.getItem(i);
      var segment = new svgedit.path.Segment(i, item);
      segment.path = this;
      this.segs.push(segment);
    }

    var segs = this.segs;
    var start_i = null;

    for (i = 0; i < len; i++) {
      var seg = segs[i];
      var next_seg = (i+1) >= len ? null : segs[i+1];
      var prev_seg = (i-1) < 0 ? null : segs[i-1];
      var start_seg;
      if (seg.type === 2) {
        if (prev_seg && prev_seg.type !== 1) {
          // New sub-path, last one is open,
          // so add a grip to last sub-path's first point
          start_seg = segs[start_i];
          start_seg.next = segs[start_i+1];
          start_seg.next.prev = start_seg;
          start_seg.addGrip();
        }
        // Remember that this is a starter seg
        start_i = i;
      } else if (next_seg && next_seg.type === 1) {
        // This is the last real segment of a closed sub-path
        // Next is first seg after "M"
        seg.next = segs[start_i+1];

        // First seg after "M"'s prev is this
        seg.next.prev = seg;
        seg.mate = segs[start_i];
        seg.addGrip();
        if (this.first_seg == null) {
          this.first_seg = seg;
        }
      } else if (!next_seg) {
        if (seg.type !== 1) {
          // Last seg, doesn't close so add a grip
          // to last sub-path's first point
          start_seg = segs[start_i];
          start_seg.next = segs[start_i+1];
          start_seg.next.prev = start_seg;
          start_seg.addGrip();
          seg.addGrip();

          if (!this.first_seg) {
            // Open path, so set first as real first and add grip
            this.first_seg = segs[start_i];
          }
        }
      } else if (seg.type !== 1){
        // Regular segment, so add grip and its "next"
        seg.addGrip();

        // Don't set its "next" if it's an "M"
        if (next_seg && next_seg.type !== 2) {
          seg.next = next_seg;
          seg.next.prev = seg;
        }
      }
    }
    return this;
  };

  svgedit.path.Path.prototype.eachSeg = function(fn) {
    var i;
    var len = this.segs.length;
    for (i = 0; i < len; i++) {
      var ret = fn.call(this.segs[i], i);
      if (ret === false) {break;}
    }
  };

  svgedit.path.Path.prototype.addSeg = function(index) {
    // Adds a new segment
    var seg = this.segs[index];
    if (!seg.prev) {return;}

    var prev = seg.prev;
    var newseg, new_x, new_y;
    switch(seg.item.pathSegType) {
      case 4:
        new_x = (seg.item.x + prev.item.x) / 2;
        new_y = (seg.item.y + prev.item.y) / 2;
        newseg = this.elem.createSVGPathSegLinetoAbs(new_x, new_y);
        break;
      case 6: //make it a curved segment to preserve the shape (WRS)
        // http://en.wikipedia.org/wiki/De_Casteljau%27s_algorithm#Geometric_interpretation
        var p0_x = (prev.item.x + seg.item.x1)/2;
        var p1_x = (seg.item.x1 + seg.item.x2)/2;
        var p2_x = (seg.item.x2 + seg.item.x)/2;
        var p01_x = (p0_x + p1_x)/2;
        var p12_x = (p1_x + p2_x)/2;
        new_x = (p01_x + p12_x)/2;
        var p0_y = (prev.item.y + seg.item.y1)/2;
        var p1_y = (seg.item.y1 + seg.item.y2)/2;
        var p2_y = (seg.item.y2 + seg.item.y)/2;
        var p01_y = (p0_y + p1_y)/2;
        var p12_y = (p1_y + p2_y)/2;
        new_y = (p01_y + p12_y)/2;
        newseg = this.elem.createSVGPathSegCurvetoCubicAbs(new_x, new_y, p0_x, p0_y, p01_x, p01_y);
        var pts = [seg.item.x, seg.item.y, p12_x, p12_y, p2_x, p2_y];
        svgedit.path.replacePathSeg(seg.type, index, pts);
        break;
    }

    svgedit.path.insertItemBefore(this.elem, newseg, index);
  };

  svgedit.path.Path.prototype.deleteSeg = function(index) {
    var seg = this.segs[index];
    var list = this.elem.pathSegList;

    seg.show(false);
    var next = seg.next;
    var pt;
    if (seg.mate) {
      // Make the next point be the "M" point
      pt = [next.item.x, next.item.y];
      svgedit.path.replacePathSeg(2, next.index, pt);

      // Reposition last node
      svgedit.path.replacePathSeg(4, seg.index, pt);

      list.removeItem(seg.mate.index);
    } else if (!seg.prev) {
      // First node of open path, make next point the M
      var item = seg.item;
      pt = [next.item.x, next.item.y];
      svgedit.path.replacePathSeg(2, seg.next.index, pt);
      list.removeItem(index);
    } else {
      list.removeItem(index);
    }
  };

  svgedit.path.Path.prototype.subpathIsClosed = function(index) {
    var closed = false;
    // Check if subpath is already open
    svgedit.path.path.eachSeg(function(i) {
      if (i <= index) {return true;}
      if (this.type === 2) {
        // Found M first, so open
        return false;
      }
      if (this.type === 1) {
        // Found Z first, so closed
        closed = true;
        return false;
      }
    });

    return closed;
  };

  svgedit.path.Path.prototype.removePtFromSelection = function(index) {
    var pos = this.selected_pts.indexOf(index);
    if (pos == -1) {
      return;
    }
    this.segs[index].select(false);
    this.selected_pts.splice(pos, 1);
  };

  svgedit.path.Path.prototype.clearSelection = function() {
    this.eachSeg(function() {
      // 'this' is the segment here
      this.select(false);
    });
    this.selected_pts = [];
  };

  svgedit.path.Path.prototype.storeD = function() {
    this.last_d = this.elem.getAttribute('d');
  };

  svgedit.path.Path.prototype.show = function(y) {
    // Shows this path's segment grips
    this.eachSeg(function() {
      // 'this' is the segment here
      this.show(y);
    });
    if (y) {
      this.selectPt(this.first_seg.index);
    }
    return this;
  };

// Move selected points
  svgedit.path.Path.prototype.movePts = function(d_x, d_y) {
    var i = this.selected_pts.length;
    while(i--) {
      var seg = this.segs[this.selected_pts[i]];
      seg.move(d_x, d_y);
    }
  };

  svgedit.path.Path.prototype.moveCtrl = function(d_x, d_y) {
    var seg = this.segs[this.selected_pts[0]];
    seg.moveCtrl(this.dragctrl, d_x, d_y);
    if (link_control_pts) {
      seg.setLinked(this.dragctrl);
    }
  };

  svgedit.path.Path.prototype.setSegType = function(new_type) {
    this.storeD();
    var i = this.selected_pts.length;
    var text;
    while(i--) {
      var sel_pt = this.selected_pts[i];

      // Selected seg
      var cur = this.segs[sel_pt];
      var prev = cur.prev;
      if (!prev) {continue;}

      if (!new_type) { // double-click, so just toggle
        text = 'Toggle Path Segment Type';

        // Toggle segment to curve/straight line
        var old_type = cur.type;

        new_type = (old_type == 6) ? 4 : 6;
      }

      new_type = Number(new_type);

      var cur_x = cur.item.x;
      var cur_y = cur.item.y;
      var prev_x = prev.item.x;
      var prev_y = prev.item.y;
      var points;
      switch ( new_type ) {
        case 6:
          if (cur.olditem) {
            var old = cur.olditem;
            points = [cur_x, cur_y, old.x1, old.y1, old.x2, old.y2];
          } else {
            var diff_x = cur_x - prev_x;
            var diff_y = cur_y - prev_y;
            // get control points from straight line segment
            /*
            var ct1_x = (prev_x + (diff_y/2));
            var ct1_y = (prev_y - (diff_x/2));
            var ct2_x = (cur_x + (diff_y/2));
            var ct2_y = (cur_y - (diff_x/2));
            */
            //create control points on the line to preserve the shape (WRS)
            var ct1_x = (prev_x + (diff_x/3));
            var ct1_y = (prev_y + (diff_y/3));
            var ct2_x = (cur_x - (diff_x/3));
            var ct2_y = (cur_y - (diff_y/3));
            points = [cur_x, cur_y, ct1_x, ct1_y, ct2_x, ct2_y];
          }
          break;
        case 4:
          points = [cur_x, cur_y];

          // Store original prevve segment nums
          cur.olditem = cur.item;
          break;
      }

      cur.setType(new_type, points);
    }
    svgedit.path.path.endChanges(text);
  };

  svgedit.path.Path.prototype.selectPt = function(pt, ctrl_num) {
    this.clearSelection();
    if (pt == null) {
      this.eachSeg(function(i) {
        // 'this' is the segment here.
        if (this.prev) {
          pt = i;
        }
      });
    }
    this.addPtsToSelection(pt);
    if (ctrl_num) {
      this.dragctrl = ctrl_num;

      if (link_control_pts) {
        this.segs[pt].setLinked(ctrl_num);
      }
    }
  };

// Update position of all points
  svgedit.path.Path.prototype.update = function() {
    var elem = this.elem;
    if (svgedit.utilities.getRotationAngle(elem)) {
      this.matrix = svgedit.math.getMatrix(elem);
      this.imatrix = this.matrix.inverse();
    } else {
      this.matrix = null;
      this.imatrix = null;
    }

    this.eachSeg(function(i) {
      this.item = elem.pathSegList.getItem(i);
      this.update();
    });

    return this;
  };

  svgedit.path.getPath_ = function(elem) {
    var p = pathData[elem.id];
    if (!p) {
      p = pathData[elem.id] = new svgedit.path.Path(elem);
    }
    return p;
  };

  svgedit.path.removePath_ = function(id) {
    if (id in pathData) {delete pathData[id];}
  };
  var newcx, newcy, oldcx, oldcy, angle;
  var getRotVals = function(x, y) {
    var dx = x - oldcx;
    var dy = y - oldcy;

    // rotate the point around the old center
    var r = Math.sqrt(dx*dx + dy*dy);
    var theta = Math.atan2(dy, dx) + angle;
    dx = r * Math.cos(theta) + oldcx;
    dy = r * Math.sin(theta) + oldcy;

    // dx,dy should now hold the actual coordinates of each
    // point after being rotated

    // now we want to rotate them around the new center in the reverse direction
    dx -= newcx;
    dy -= newcy;

    r = Math.sqrt(dx*dx + dy*dy);
    theta = Math.atan2(dy, dx) - angle;

    return {'x': r * Math.cos(theta) + newcx,
      'y': r * Math.sin(theta) + newcy};
  };

// If the path was rotated, we must now pay the piper:
// Every path point must be rotated into the rotated coordinate system of
// its old center, then determine the new center, then rotate it back
// This is because we want the path to remember its rotation

// TODO: This is still using ye olde transform methods, can probably
// be optimized or even taken care of by recalculateDimensions
  svgedit.path.recalcRotatedPath = function() {
    var current_path = svgedit.path.path.elem;
    angle = svgedit.utilities.getRotationAngle(current_path, true);
    if (!angle) {return;}
//	selectedBBoxes[0] = svgedit.path.path.oldbbox;
    var box = svgedit.utilities.getBBox(current_path),
      oldbox = svgedit.path.path.oldbbox; //selectedBBoxes[0],
    oldcx = oldbox.x + oldbox.width/2;
    oldcy = oldbox.y + oldbox.height/2;
    newcx = box.x + box.width/2;
    newcy = box.y + box.height/2;

    // un-rotate the new center to the proper position
    var dx = newcx - oldcx,
      dy = newcy - oldcy,
      r = Math.sqrt(dx*dx + dy*dy),
      theta = Math.atan2(dy, dx) + angle;

    newcx = r * Math.cos(theta) + oldcx;
    newcy = r * Math.sin(theta) + oldcy;

    var list = current_path.pathSegList,
      i = list.numberOfItems;
    while (i) {
      i -= 1;
      var seg = list.getItem(i),
        type = seg.pathSegType;
      if (type == 1) {continue;}

      var rvals = getRotVals(seg.x, seg.y),
        points = [rvals.x, rvals.y];
      if (seg.x1 != null && seg.x2 != null) {
        var c_vals1 = getRotVals(seg.x1, seg.y1);
        var c_vals2 = getRotVals(seg.x2, seg.y2);
        points.splice(points.length, 0, c_vals1.x , c_vals1.y, c_vals2.x, c_vals2.y);
      }
      svgedit.path.replacePathSeg(type, i, points);
    } // loop for each point

    box = svgedit.utilities.getBBox(current_path);
//	selectedBBoxes[0].x = box.x; selectedBBoxes[0].y = box.y;
//	selectedBBoxes[0].width = box.width; selectedBBoxes[0].height = box.height;

    // now we must set the new transform to be rotated around the new center
    var R_nc = svgroot.createSVGTransform(),
      tlist = svgedit.transformlist.getTransformList(current_path);
    R_nc.setRotate((angle * 180.0 / Math.PI), newcx, newcy);
    tlist.replaceItem(R_nc,0);
  };

// ====================================
// Public API starts here

  svgedit.path.clearData =  function() {
    pathData = {};
  };

}());

/** contextmenu **/
var svgedit = svgedit || {};
(function () {
  window.initContextmenu = function () {
    var self = this;
    if (!svgedit.contextmenu) {
      svgedit.contextmenu = {};
    }
    self.contextMenuExtensions = {};
    var menuItemIsValid = function(menuItem) {
      return menuItem && menuItem.id && menuItem.label && menuItem.action && typeof menuItem.action == 'function';
    };
    var addContextMenuItem = function(menuItem) {
      // menuItem: {id, label, shortcut, action}
      if (!menuItemIsValid(menuItem)) {
        console.error("Menu items must be defined and have at least properties: id, label, action, where action must be a function");
        return;
      }
      if (menuItem.id in self.contextMenuExtensions) {
        console.error('Cannot add extension "' + menuItem.id + '", an extension by that name already exists"');
        return;
      }
      // Register menuItem action, see below for deferred menu dom injection
      console.log("Registed contextmenu item: {id:"+ menuItem.id+", label:"+menuItem.label+"}");
      self.contextMenuExtensions[menuItem.id] = menuItem;
      //TODO: Need to consider how to handle custom enable/disable behavior
    };
    var hasCustomHandler = function(handlerKey) {
      return self.contextMenuExtensions[handlerKey] && true;
    };
    var getCustomHandler = function(handlerKey) {
      return self.contextMenuExtensions[handlerKey].action;
    };
    var injectExtendedContextMenuItemIntoDom = function(menuItem) {
      if (Object.keys(self.contextMenuExtensions).length === 0) {
        // all menuItems appear at the bottom of the menu in their own container.
        // if this is the first extension menu we need to add the separator.
        $("#cmenu_canvas").append("<li class='separator'>");
      }
      var shortcut = menuItem.shortcut || "";
      $("#cmenu_canvas").append("<li class='disabled'><a href='#" + menuItem.id + "'>"
        + menuItem.label + "<span class='shortcut'>"
        + shortcut + "</span></a></li>");
    };
    // Defer injection to wait out initial menu processing. This probably goes away once all context
    // menu behavior is brought here.
    svgEditor.ready(function() {
      var menuItem;
      for (menuItem in contextMenuExtensions) {
        injectExtendedContextMenuItemIntoDom(contextMenuExtensions[menuItem]);
      }
    });
    svgedit.contextmenu.resetCustomMenus = function(){self.contextMenuExtensions = {};};
    svgedit.contextmenu.add = addContextMenuItem;
    svgedit.contextmenu.hasCustomHandler = hasCustomHandler;
    svgedit.contextmenu.getCustomHandler = getCustomHandler;
  }
})();

var mysvgcanvas = {
  initSvgCanvas: function (t) {
    if (!window.console) {
      window.console = {};
      window.console.log = function(str) {};
      window.console.dir = function(str) {};
    }

    if (window.opera) {
      window.console.log = function(str) { opera.postError(str); };
      window.console.dir = function(str) {};
    }
  }
};

$.SvgCanvas = function(container, config) {
// Alias Namespace constants
  var NS = svgedit.NS;

// Default configuration options
  var curConfig = {
    show_outside_canvas: true,
    selectNew: true,
    dimensions: [640, 480]
  };

// Update config with new one if given
  if (config) {
    $.extend(curConfig, config);
  }

// Array with width/height of canvas
  var dimensions = curConfig.dimensions;

  var canvas = this;

// "document" element associated with the container (same as window.document using default svg-editor.js)
// NOTE: This is not actually a SVG document, but a HTML document.
  var svgdoc = container.ownerDocument;

// This is a container for the document being edited, not the document itself.
  var svgroot = svgdoc.importNode(svgedit.utilities.text2xml(
    '<svg id="svgroot" xmlns="' + NS.SVG + '" xlinkns="' + NS.XLINK + '" ' + ' xmlns:html="' + NS.HTML + '" ' +
    'width="' + dimensions[0] + '" height="' + dimensions[1] + '" x="' + dimensions[0] + '" y="' + dimensions[1] + '" overflow="visible">' +
    '<defs>' +
    '<filter id="canvashadow" filterUnits="objectBoundingBox">' +
    '<feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur"/>'+
    '<feOffset in="blur" dx="5" dy="5" result="offsetBlur"/>'+
    '<feMerge>'+
    '<feMergeNode in="offsetBlur"/>'+
    '<feMergeNode in="SourceGraphic"/>'+
    '</feMerge>'+
    '</filter>'+
    '</defs>'+
    '</svg>').documentElement, true);
  container.appendChild(svgroot);

// The actual element that represents the final output SVG element
  var svgcontent = svgdoc.createElementNS(NS.SVG, 'svg');

// This function resets the svgcontent element while keeping it in the DOM.
  var clearSvgContentElement = canvas.clearSvgContentElement = function() {
    while (svgcontent.firstChild) { svgcontent.removeChild(svgcontent.firstChild); }

    // TODO: Clear out all other attributes first?
    $(svgcontent).attr({
      id: 'svgcontent',
      width: dimensions[0],
      height: dimensions[1],
      x: dimensions[0],
      y: dimensions[1],
      overflow: curConfig.show_outside_canvas ? 'visible' : 'hidden',
      xmlns: NS.SVG,
      'xmlns:se': NS.SE,
      'xmlns:xlink': NS.XLINK
    }).appendTo(svgroot);

    // TODO: make this string optional and set by the client
    var comment = svgdoc.createComment(" Created with SVG-edit - https://github.com/SVG-Edit/svgedit");
    svgcontent.appendChild(comment);
  };
  clearSvgContentElement();

// Prefix string for element IDs
  var idprefix = 'svg_';

// Function: setIdPrefix
// Changes the ID prefix to the given value
//
// Parameters:
// p - String with the new prefix
  canvas.setIdPrefix = function(p) {
    idprefix = p;
  };

// Current svgedit.draw.Drawing object
// @type {svgedit.draw.Drawing}
  canvas.current_drawing_ = new svgedit.draw.Drawing(svgcontent, idprefix);

// Function: getCurrentDrawing
// Returns the current Drawing.
// @return {svgedit.draw.Drawing}
  var getCurrentDrawing = canvas.getCurrentDrawing = function() {
    return canvas.current_drawing_;
  };

// Float displaying the current zoom level (1 = 100%, .5 = 50%, etc)
  var current_zoom = 1;

// pointer to current group (for in-group editing)
  var current_group = null;

// Object containing data for the currently selected styles
  var all_properties = {
    shape: {
      fill: (curConfig.initFill.color == 'none' ? '' : '#') + curConfig.initFill.color,
      fill_paint: null,
      fill_opacity: curConfig.initFill.opacity,
      stroke: '#' + curConfig.initStroke.color,
      stroke_paint: null,
      stroke_opacity: curConfig.initStroke.opacity,
      stroke_width: curConfig.initStroke.width,
      stroke_dasharray: 'none',
      stroke_linejoin: 'miter',
      stroke_linecap: 'butt',
      opacity: curConfig.initOpacity
    }
  };

  all_properties.text = $.extend(true, {}, all_properties.shape);
  $.extend(all_properties.text, {
    fill: '#000000',
    stroke_width: curConfig.text.stroke_width,
    font_size: curConfig.text.font_size,
    font_family: curConfig.text.font_family
  });

// Current shape style properties
  var cur_shape = all_properties.shape;

// Array with all the currently selected elements
// default size of 1 until it needs to grow bigger
  var selectedElements = [];

  var getJsonFromSvgElement = this.getJsonFromSvgElement = function(data) {
    // Text node
    if(data.nodeType == 3) return data.nodeValue;

    var retval = {
      element: data.tagName,
      //namespace: nsMap[data.namespaceURI],
      attr: {},
      children: [],
    };

    // Iterate attributes
    for(var i=0; i < data.attributes.length; i++) {
      retval.attr[data.attributes[i].name] = data.attributes[i].value;
    };

    // Iterate children
    for(var i=0; i < data.childNodes.length; i++) {
      retval.children.push(getJsonFromSvgElement(data.childNodes[i]));
    }

    return retval;
  }

// Function: addSvgElementFromJson
// Create a new SVG element based on the given object keys/values and add it to the current layer
// The element will be ran through cleanupElement before being returned
//
// Parameters:
// data - Object with the following keys/values:
// * element - tag name of the SVG element to create
// * attr - Object with attributes key-values to assign to the new element
// * curStyles - Boolean indicating that current style attributes should be applied first
// * children - Optional array with data objects to be added recursively as children
//
// Returns: The new element
  var addSvgElementFromJson = this.addSvgElementFromJson = function(data) {
    if (typeof(data) == 'string') return svgdoc.createTextNode(data);

    var shape = svgedit.utilities.getElem(data.attr.id);
    // if shape is a path but we need to create a rect/ellipse, then remove the path
    var current_layer = getCurrentDrawing().getCurrentLayer();
    if (shape && data.element != shape.tagName) {
      current_layer.removeChild(shape);
      shape = null;
    }
    if (!shape) {
      shape = svgdoc.createElementNS(NS.SVG, data.element);
      if (current_layer) {
        (current_group || current_layer).appendChild(shape);
      }
    }
    if (data.curStyles) {
      svgedit.utilities.assignAttributes(shape, {
        'fill': cur_shape.fill,
        'stroke': cur_shape.stroke,
        'stroke-width': cur_shape.stroke_width,
        'stroke-dasharray': cur_shape.stroke_dasharray,
        'stroke-linejoin': cur_shape.stroke_linejoin,
        'stroke-linecap': cur_shape.stroke_linecap,
        'stroke-opacity': cur_shape.stroke_opacity,
        'fill-opacity': cur_shape.fill_opacity,
        'opacity': cur_shape.opacity / 2,
        'style': 'pointer-events:inherit'
      }, 100);
    }
    svgedit.utilities.assignAttributes(shape, data.attr, 100);
    svgedit.utilities.cleanupElement(shape);

    // Children
    if (data.children) {
      data.children.forEach(function(child) {
        shape.appendChild(addSvgElementFromJson(child));
      });
    }

    return shape;
  };

  var addSvgGroupFromJson = this.addSvgGroupFromJson = function (t) {
    var e = svgedit.utilities.getElem(t.id), current_layer = getCurrentDrawing().getCurrentLayer();
    e && t.group != e.tagName && (current_layer.removeChild(e), e = null), e || (e = svgdoc.createElementNS(NS.SVG, t.group), e.setAttribute("id", t.id), e.setAttribute("type", t.type), current_layer && (current_group || current_layer).appendChild(e));
    for (var r = 0; r < t.elements.length; r++) {
      var a = svgdoc.createElementNS(NS.SVG, t.elements[r].type);
      if (svgedit.utilities.assignAttributes(a, {
        "stroke-width": cur_shape.stroke_width,
        "stroke-dasharray": cur_shape.stroke_dasharray,
        "stroke-linejoin": cur_shape.stroke_linejoin,
        "stroke-linecap": cur_shape.stroke_linecap,
        style: "pointer-events:inherit"
      }, 100), svgedit.utilities.assignAttributes(a, t.elements[r].attr), "text" === t.elements[r].type) a.textContent = t.elements[r].content; else if ("foreignObject" === t.elements[r].type) {
        var s = t.elements[r].content;
        if (s) for (var o = 0; o < s.length; o++) {
          var d = document.createElement(s[o].tag);
          if (d.tagName = d.tagName.toLowerCase(), "select" === d.tagName.toLowerCase()) {
            var u = document.createElement("option");
            u.setAttribute("test", " "), d.appendChild(u)
          } else "button" === d.tagName.toLowerCase() ? d.innerHTML = "button" : "span" === d.tagName.toLowerCase() && (s[o].value && (d.innerHTML = s[o].value), s[o].attr && svgedit.utilities.assignAttributes(d, s[o].attr));
          svgedit.utilities.assignAttributes(d, s[o].attr), s[o].style && d.setAttribute("style", s[o].style), "input" === d.tagName.toLowerCase() && (d.style.backgroundColor = cur_shape.fill, d.style.color = cur_shape.stroke), a.appendChild(d)
        }
      }
      e.appendChild(a)
    }
    return t.curStyles && svgedit.utilities.assignAttributes(e, {
      fill: cur_shape.fill,
      stroke: cur_shape.stroke,
      "stroke-width": cur_shape.stroke_width,
      "stroke-dasharray": cur_shape.stroke_dasharray,
      "stroke-linejoin": cur_shape.stroke_linejoin,
      "stroke-linecap": cur_shape.stroke_linecap,
      style: "pointer-events:inherit"
    }, 100), svgedit.utilities.assignAttributes(e, t.attr, 100), svgedit.utilities.cleanupElement(e), call("onGaugeAdded", {
      id: t.id,
      type: t.type
    }), e
  }
// import svgtransformlist.js
  var getTransformList = canvas.getTransformList = svgedit.transformlist.getTransformList;

// import from math.js.
  var transformPoint = svgedit.math.transformPoint;
  var matrixMultiply = canvas.matrixMultiply = svgedit.math.matrixMultiply;
  var hasMatrixTransform = canvas.hasMatrixTransform = svgedit.math.hasMatrixTransform;
  var transformListToTransform = canvas.transformListToTransform = svgedit.math.transformListToTransform;
  var snapToAngle = svgedit.math.snapToAngle;
  var getMatrix = svgedit.math.getMatrix;

// initialize from units.js
// send in an object implementing the ElementContainer interface (see units.js)
  svgedit.units.init({
    getBaseUnit: function() { return curConfig.baseUnit; },
    getElement: svgedit.utilities.getElem,
    getHeight: function() { return svgcontent.getAttribute('height')/current_zoom; },
    getWidth: function() { return svgcontent.getAttribute('width')/current_zoom; },
    getRoundDigits: function() { return save_options.round_digits; }
  });
// import from units.js
  var convertToNum = canvas.convertToNum = svgedit.units.convertToNum;

// import from svgutils.js
  svgedit.utilities.init({
    getDOMDocument: function() { return svgdoc; },
    getDOMContainer: function() { return container; },
    getSVGRoot: function() { return svgroot; },
    // TODO: replace this mostly with a way to get the current drawing.
    getSelectedElements: function() { return selectedElements; },
    getSVGContent: function() { return svgcontent; },
    getBaseUnit: function() { return curConfig.baseUnit; },
    getSnappingStep: function() { return curConfig.snappingStep; }
  });
  var findDefs = canvas.findDefs = svgedit.utilities.findDefs;
  var getUrlFromAttr = canvas.getUrlFromAttr = svgedit.utilities.getUrlFromAttr;
  var getHref = canvas.getHref = svgedit.utilities.getHref;
  var setHref = canvas.setHref = svgedit.utilities.setHref;
  var getPathBBox = svgedit.utilities.getPathBBox;
  var getBBox = canvas.getBBox = svgedit.utilities.getBBox;
  var getRotationAngle = canvas.getRotationAngle = svgedit.utilities.getRotationAngle;
  var getElem = canvas.getElem = svgedit.utilities.getElem;
  var getRefElem = canvas.getRefElem = svgedit.utilities.getRefElem;
  var assignAttributes = canvas.assignAttributes = svgedit.utilities.assignAttributes;
  var cleanupElement = this.cleanupElement = svgedit.utilities.cleanupElement;

// import from coords.js
  svgedit.coords.init({
    getDrawing: function() { return getCurrentDrawing(); },
    getGridSnapping: function() { return curConfig.gridSnapping; }
  });
  var remapElement = this.remapElement = svgedit.coords.remapElement;

// import from recalculate.js
  svgedit.recalculate.init({
    getSVGRoot: function() { return svgroot; },
    getStartTransform: function() { return startTransform; },
    setStartTransform: function(transform) { startTransform = transform; }
  });
  var recalculateDimensions = this.recalculateDimensions = svgedit.recalculate.recalculateDimensions;

// import from sanitize.js
  var nsMap = svgedit.getReverseNS();
  var sanitizeSvg = canvas.sanitizeSvg = svgedit.sanitize.sanitizeSvg;

// import from history.js
  var MoveElementCommand = svgedit.history.MoveElementCommand;
  var InsertElementCommand = svgedit.history.InsertElementCommand;
  var RemoveElementCommand = svgedit.history.RemoveElementCommand;
  var ChangeElementCommand = svgedit.history.ChangeElementCommand;
  var BatchCommand = svgedit.history.BatchCommand;
  var call;
// Implement the svgedit.history.HistoryEventHandler interface.
  canvas.undoMgr = new svgedit.history.UndoManager({
    handleHistoryEvent: function(eventType, cmd) {
      var EventTypes = svgedit.history.HistoryEventTypes;
      // TODO: handle setBlurOffsets.
      if (eventType == EventTypes.BEFORE_UNAPPLY || eventType == EventTypes.BEFORE_APPLY) {
        canvas.clearSelection();
      } else if (eventType == EventTypes.AFTER_APPLY || eventType == EventTypes.AFTER_UNAPPLY) {
        var elems = cmd.elements();
        canvas.pathActions.clear();
        call('changed', elems);
        var cmdType = cmd.type();
        var isApply = (eventType == EventTypes.AFTER_APPLY);
        if (cmdType == MoveElementCommand.type()) {
          var parent = isApply ? cmd.newParent : cmd.oldParent;
          if (parent == svgcontent) {
            canvas.identifyLayers();
          }
        } else if (cmdType == InsertElementCommand.type() ||
          cmdType == RemoveElementCommand.type()) {
          if (cmd.parent == svgcontent) {
            canvas.identifyLayers();
          }
          if (cmdType == InsertElementCommand.type()) {
            if (isApply) {restoreRefElems(cmd.elem);}
          } else {
            if (!isApply) {restoreRefElems(cmd.elem);}
          }
          if (cmd.elem.tagName === 'use') {
            setUseData(cmd.elem);
          }
        } else if (cmdType == ChangeElementCommand.type()) {
          // if we are changing layer names, re-identify all layers
          if (cmd.elem.tagName == 'title' && cmd.elem.parentNode.parentNode == svgcontent) {
            canvas.identifyLayers();
          }
          var values = isApply ? cmd.newValues : cmd.oldValues;
          // If stdDeviation was changed, update the blur.
          if (values.stdDeviation) {
            canvas.setBlurOffsets(cmd.elem.parentNode, values.stdDeviation);
          }
          // This is resolved in later versions of webkit, perhaps we should
          // have a featured detection for correct 'use' behavior?
          // ——————————
          // Remove & Re-add hack for Webkit (issue 775)
          //if (cmd.elem.tagName === 'use' && svgedit.browser.isWebkit()) {
          //	var elem = cmd.elem;
          //	if (!elem.getAttribute('x') && !elem.getAttribute('y')) {
          //		var parent = elem.parentNode;
          //		var sib = elem.nextSibling;
          //		parent.removeChild(elem);
          //		parent.insertBefore(elem, sib);
          //	}
          //}
        }
      }
    }
  });
  var addCommandToHistory = function(cmd) {
    canvas.undoMgr.addCommandToHistory(cmd);
  };

  /**
   * Get a HistoryRecordingService.
   * @param {svgedit.history.HistoryRecordingService=} hrService - if exists, return it instead of creating a new service.
   * @returns {svgedit.history.HistoryRecordingService}
   */
  function historyRecordingService(hrService) {
    return hrService ? hrService : new svgedit.history.HistoryRecordingService(canvas.undoMgr);
  }

// import from select.js
  svgedit.select.init(curConfig, {
    createSVGElement: function(jsonMap) { return canvas.addSvgElementFromJson(jsonMap); },
    svgRoot: function() { return svgroot; },
    svgContent: function() { return svgcontent; },
    currentZoom: function() { return current_zoom; },
    // TODO(codedread): Remove when getStrokedBBox() has been put into svgutils.js.
    getStrokedBBox: function(elems) { return canvas.getStrokedBBox([elems]); }
  });
// this object manages selectors for us
  var selectorManager = this.selectorManager = svgedit.select.getSelectorManager();

// Import from path.js
  svgedit.path.init({
    getCurrentZoom: function() { return current_zoom; },
    getSVGRoot: function() { return svgroot; }
  });

// Interface strings, usually for title elements
  var uiStrings = {
    exportNoBlur: "Blurred elements will appear as un-blurred",
    exportNoforeignObject: "foreignObject elements will not appear",
    exportNoDashArray: "Strokes will appear filled",
    exportNoText: "Text may not appear as expected"
  };

  var visElems = 'a,circle,ellipse,foreignObject,g,image,line,path,polygon,polyline,rect,svg,text,tspan,use';
  var ref_attrs = ['clip-path', 'fill', 'filter', 'marker-end', 'marker-mid', 'marker-start', 'mask', 'stroke'];

  var elData = $.data;

// Animation element to change the opacity of any newly created element
  var opac_ani = document.createElementNS(NS.SVG, 'animate');
  $(opac_ani).attr({
    attributeName: 'opacity',
    begin: 'indefinite',
    dur: 1,
    fill: 'freeze'
  }).appendTo(svgroot);

  var restoreRefElems = function(elem) {
    // Look for missing reference elements, restore any found
    var o, i, l,
      attrs = $(elem).attr(ref_attrs);
    for (o in attrs) {
      var val = attrs[o];
      if (val && val.indexOf('url(') === 0) {
        var id = svgedit.utilities.getUrlFromAttr(val).substr(1);
        var ref = getElem(id);
        if (!ref) {
          svgedit.utilities.findDefs().appendChild(removedElements[id]);
          delete removedElements[id];
        }
      }
    }

    var childs = elem.getElementsByTagName('*');

    if (childs.length) {
      for (i = 0, l = childs.length; i < l; i++) {
        restoreRefElems(childs[i]);
      }
    }
  };

  (function() {
    // TODO For Issue 208: this is a start on a thumbnail
    //	var svgthumb = svgdoc.createElementNS(NS.SVG, 'use');
    //	svgthumb.setAttribute('width', '100');
    //	svgthumb.setAttribute('height', '100');
    //	svgedit.utilities.setHref(svgthumb, '#svgcontent');
    //	svgroot.appendChild(svgthumb);

  }());

// Object to contain image data for raster images that were found encodable
  var encodableImages = {},

    // String with image URL of last loadable image
    last_good_img_url = curConfig.imgPath + 'logo.png',

    // Array with current disabled elements (for in-group editing)
    disabled_elems = [],

    // Object with save options
    save_options = {round_digits: 5},

    // Boolean indicating whether or not a draw action has been started
    started = false,

    // String with an element's initial transform attribute value
    startTransform = null,

    // String indicating the current editor mode
    current_mode = 'select',

    // String with the current direction in which an element is being resized
    current_resize_mode = 'none',

    // Object with IDs for imported files, to see if one was already added
    import_ids = {},

    // Current text style properties
    cur_text = all_properties.text,

    // Current general properties
    cur_properties = cur_shape,

    // Array with selected elements' Bounding box object
//	selectedBBoxes = new Array(1),

    // The DOM element that was just selected
    justSelected = null,

    // DOM element for selection rectangle drawn by the user
    rubberBox = null,

    // Array of current BBoxes, used in getIntersectionList().
    curBBoxes = [],

    // Object to contain all included extensions
    extensions = {},

    // Canvas point for the most recent right click
    lastClickPoint = null,

    // Map of deleted reference elements
    removedElements = {};

// Should this return an array by default, so extension results aren't overwritten?
  var runExtensions = this.runExtensions = function(action, vars, returnArray) {
    var result = returnArray ? [] : false;
    $.each(extensions, function(name, opts) {
      if (opts && action in opts) {
        if (returnArray) {
          result.push(opts[action](vars));
        } else {
          result = opts[action](vars);
        }
      }
    });
    return result;
  };

  var runGetExtensions = this.runGetExtensions = function (t, e) {
    var i = !1;
    return $.each(extensions, function (r, n) {
      if (n && t in n) {
        let r = n[t](e);
        r && (i = r)
      }
    }), i
  }

// Function: addExtension
// Add an extension to the editor
//
// Parameters:
// name - String with the ID of the extension
// ext_func - Function supplied by the extension with its data
  this.addExtension = function(name, ext_func) {
    var ext;
    if (!(name in extensions)) {
      // Provide private vars/funcs here. Is there a better way to do this?
      if ($.isFunction(ext_func)) {
        ext = ext_func($.extend(canvas.getPrivateMethods(), {
          svgroot: svgroot,
          svgcontent: svgcontent,
          nonce: getCurrentDrawing().getNonce(),
          selectorManager: selectorManager
        }));
      } else {
        ext = ext_func;
      }
      extensions[name] = ext;
      call('extension_added', ext);
    } else {
      console.log('Cannot add extension "' + name + '", an extension by that name already exists.');
    }
  };

// This method rounds the incoming value to the nearest value based on the current_zoom
  var round = this.round = function(val) {
    return parseInt(val*current_zoom, 10)/current_zoom;
  };

// This method sends back an array or a NodeList full of elements that
// intersect the multi-select rubber-band-box on the current_layer only.
//
// We brute-force getIntersectionList for browsers that do not support it (Firefox).
//
// Reference:
// Firefox does not implement getIntersectionList(), see https://bugzilla.mozilla.org/show_bug.cgi?id=501421
  var getIntersectionList = this.getIntersectionList = function(rect) {
    if (rubberBox == null) { return null; }

    var parent = current_group || getCurrentDrawing().getCurrentLayer();

    var rubberBBox;
    if (!rect) {
      rubberBBox = rubberBox.getBBox();
      var o, bb = svgcontent.createSVGRect();

      for (o in rubberBBox) {
        bb[o] = rubberBBox[o] / current_zoom;
      }
      rubberBBox = bb;
    } else {
      rubberBBox = svgcontent.createSVGRect();
      rubberBBox.x = rect.x;
      rubberBBox.y = rect.y;
      rubberBBox.width = rect.width;
      rubberBBox.height = rect.height;
    }

    var resultList = null;
    if (!svgedit.browser.isIE) {
      if (typeof(svgroot.getIntersectionList) == 'function') {
        // Offset the bbox of the rubber box by the offset of the svgcontent element.
        rubberBBox.x += parseInt(svgcontent.getAttribute('x'), 10);
        rubberBBox.y += parseInt(svgcontent.getAttribute('y'), 10);

        resultList = svgroot.getIntersectionList(rubberBBox, parent);
      }
    }

    if (resultList == null || typeof(resultList.item) != 'function') {
      resultList = [];

      if (!curBBoxes.length) {
        // Cache all bboxes
        curBBoxes = getVisibleElementsAndBBoxes(parent);
      }
      var i = curBBoxes.length;
      while (i--) {
        if (!rubberBBox.width) {continue;}
        if (svgedit.math.rectsIntersect(rubberBBox, curBBoxes[i].bbox)) {
          resultList.push(curBBoxes[i].elem);
        }
      }
    }

    // addToSelection expects an array, but it's ok to pass a NodeList
    // because using square-bracket notation is allowed:
    // http://www.w3.org/TR/DOM-Level-2-Core/ecma-script-binding.html
    return resultList;
  };

// TODO(codedread): Migrate this into svgutils.js
// Function: getStrokedBBox
// Get the bounding box for one or more stroked and/or transformed elements
//
// Parameters:
// elems - Array with DOM elements to check
//
// Returns:
// A single bounding box object
  var getStrokedBBox = this.getStrokedBBox = function(elems) {
    if (!elems) {elems = getVisibleElements();}
    return svgedit.utilities.getStrokedBBox(elems, addSvgElementFromJson, pathActions)
  };

// Function: getVisibleElements
// Get all elements that have a BBox (excludes <defs>, <title>, etc).
// Note that 0-opacity, off-screen etc elements are still considered "visible"
// for this function
//
// Parameters:
// parent - The parent DOM element to search within
//
// Returns:
// An array with all "visible" elements.
  var getVisibleElements = this.getVisibleElements = function(parent) {
    if (!parent) {
      parent = $(svgcontent).children(); // Prevent layers from being included
    }

    var contentElems = [];
    $(parent).children().each(function(i, elem) {
      if (elem.getBBox) {
        contentElems.push(elem);
      }
    });
    return contentElems.reverse();
  };

// Function: getVisibleElementsAndBBoxes
// Get all elements that have a BBox (excludes <defs>, <title>, etc).
// Note that 0-opacity, off-screen etc elements are still considered "visible"
// for this function
//
// Parameters:
// parent - The parent DOM element to search within
//
// Returns:
// An array with objects that include:
// * elem - The element
// * bbox - The element's BBox as retrieved from getStrokedBBox
  var getVisibleElementsAndBBoxes = this.getVisibleElementsAndBBoxes = function(parent) {
    if (!parent) {
      parent = $(svgcontent).children(); // Prevent layers from being included
    }
    var contentElems = [];
    $(parent).children().each(function(i, elem) {
      if (elem.getBBox) {
        contentElems.push({'elem':elem, 'bbox':getStrokedBBox([elem])});
      }
    });
    return contentElems.reverse();
  };

// Function: groupSvgElem
// Wrap an SVG element into a group element, mark the group as 'gsvg'
//
// Parameters:
// elem - SVG element to wrap
  var groupSvgElem = this.groupSvgElem = function(elem) {
    var g = document.createElementNS(NS.SVG, 'g');
    elem.parentNode.replaceChild(g, elem);
    $(g).append(elem).data('gsvg', elem)[0].id = getNextId();
  };


// Set scope for these functions
  var getId, getNextId;
  var textActions, pathActions;

  (function(c) {

    // Object to contain editor event names and callback functions
    var events = {};

    getId = c.getId = function() { return getCurrentDrawing().getId(); };
    getNextId = c.getNextId = function() { return getCurrentDrawing().getNextId(); };

    // Function: call
    // Run the callback function associated with the given event
    //
    // Parameters:
    // event - String with the event name
    // arg - Argument to pass through to the callback function
    call = c.call = function(event, arg) {
      if (events[event]) {
        return events[event](this, arg);
      }
    };

    // Function: bind
    // Attaches a callback function to an event
    //
    // Parameters:
    // event - String indicating the name of the event
    // f - The callback function to bind to the event
    //
    // Return:
    // The previous event
    c.bind = function(event, f) {
      var old = events[event];
      events[event] = f;
      return old;
    };

  }(canvas));

// Function: canvas.prepareSvg
// Runs the SVG Document through the sanitizer and then updates its paths.
//
// Parameters:
// newDoc - The SVG DOM document
  this.prepareSvg = function(newDoc) {
    this.sanitizeSvg(newDoc.documentElement);

    // convert paths into absolute commands
    var i, path, len,
      paths = newDoc.getElementsByTagNameNS(NS.SVG, 'path');
    for (i = 0, len = paths.length; i < len; ++i) {
      path = paths[i];
      path.setAttribute('d', pathActions.convertPath(path));
      pathActions.fixEnd(path);
    }
  };

// Function: ffClone
// Hack for Firefox bugs where text element features aren't updated or get
// messed up. See issue 136 and issue 137.
// This function clones the element and re-selects it
// TODO: Test for this bug on load and add it to "support" object instead of
// browser sniffing
//
// Parameters:
// elem - The (text) DOM element to clone
  var ffClone = function(elem) {
    if (!svgedit.browser.isGecko()) {return elem;}
    var clone = elem.cloneNode(true);
    elem.parentNode.insertBefore(clone, elem);
    elem.parentNode.removeChild(elem);
    selectorManager.releaseSelector(elem);
    selectedElements[0] = clone;
    selectorManager.requestSelector(clone).showGrips(true);
    return clone;
  };


// this.each is deprecated, if any extension used this it can be recreated by doing this:
// $(canvas.getRootElem()).children().each(...)

// this.each = function(cb) {
//	$(svgroot).children().each(cb);
// };


// Function: setRotationAngle
// Removes any old rotations if present, prepends a new rotation at the
// transformed center
//
// Parameters:
// val - The new rotation angle in degrees
// preventUndo - Boolean indicating whether the action should be undoable or not
  this.setRotationAngle = function(val, preventUndo) {
    // ensure val is the proper type
    val = parseFloat(val);
    var elem = selectedElements[0];
    var oldTransform = elem.getAttribute('transform');
    var bbox = svgedit.utilities.getBBox(elem);
    var cx = bbox.x+bbox.width/2, cy = bbox.y+bbox.height/2;
    var tlist = svgedit.transformlist.getTransformList(elem);

    // only remove the real rotational transform if present (i.e. at index=0)
    if (tlist.numberOfItems > 0) {
      var xform = tlist.getItem(0);
      if (xform.type == 4) {
        tlist.removeItem(0);
      }
    }
    // find R_nc and insert it
    if (val != 0) {
      var center = svgedit.math.transformPoint(cx, cy, svgedit.math.transformListToTransform(tlist).matrix);
      var R_nc = svgroot.createSVGTransform();
      R_nc.setRotate(val, center.x, center.y);
      if (tlist.numberOfItems) {
        tlist.insertItemBefore(R_nc, 0);
      } else {
        tlist.appendItem(R_nc);
      }
    } else if (tlist.numberOfItems == 0) {
      elem.removeAttribute('transform');
    }

    if (!preventUndo) {
      // we need to undo it, then redo it so it can be undo-able! :)
      // TODO: figure out how to make changes to transform list undo-able cross-browser?
      var newTransform = elem.getAttribute('transform');
      elem.setAttribute('transform', oldTransform);
      changeSelectedAttribute('transform', newTransform, selectedElements);
      call('changed', selectedElements);
    }
    var pointGripContainer = svgedit.utilities.getElem('pathpointgrip_container');
//		if (elem.nodeName == 'path' && pointGripContainer) {
//			pathActions.setPointContainerTransform(elem.getAttribute('transform'));
//		}
    var selector = selectorManager.requestSelector(selectedElements[0]);
    selector.resize();
    selector.updateGripCursors(val);
  };

// Function: recalculateAllSelectedDimensions
// Runs recalculateDimensions on the selected elements,
// adding the changes to a single batch command
  var recalculateAllSelectedDimensions = this.recalculateAllSelectedDimensions = function() {
    var text = (current_resize_mode == 'none' ? 'position' : 'size');
    var batchCmd = new svgedit.history.BatchCommand(text);

    var i = selectedElements.length;
    while (i--) {
      var elem = selectedElements[i];
//			if (svgedit.utilities.getRotationAngle(elem) && !svgedit.math.hasMatrixTransform(getTransformList(elem))) {continue;}
      var cmd = svgedit.recalculate.recalculateDimensions(elem);
      if (cmd) {
        batchCmd.addSubCommand(cmd);
      }
    }

    if (!batchCmd.isEmpty()) {
      addCommandToHistory(batchCmd);
      call('changed', selectedElements);
    }
  };


// Debug tool to easily see the current matrix in the browser's console
  var logMatrix = function(m) {
    console.log([m.a, m.b, m.c, m.d, m.e, m.f]);
  };

// Root Current Transformation Matrix in user units
  var root_sctm = null;

// Group: Selection

// Function: clearSelection
// Clears the selection. The 'selected' handler is then called.
// Parameters:
// noCall - Optional boolean that when true does not call the "selected" handler
  var clearSelection = this.clearSelection = function(noCall) {
    selectedElements.map(function(elem){
      if(elem == null) return;

      selectorManager.releaseSelector(elem);
    });
    selectedElements = [];

    if (!noCall) {call('selected', selectedElements);}
  };

// TODO: do we need to worry about selectedBBoxes here?


// Function: addToSelection
// Adds a list of elements to the selection. The 'selected' handler is then called.
//
// Parameters:
// elemsToAdd - an array of DOM elements to add to the selection
// showGrips - a boolean flag indicating whether the resize grips should be shown
  var addToSelection = this.addToSelection = function(elemsToAdd, showGrips) {
    if (elemsToAdd.length == 0) { return; }
    // find the first null in our selectedElements array
    var j = 0;

    while (j < selectedElements.length) {
      if (selectedElements[j] == null) {
        break;
      }
      ++j;
    }

    // now add each element consecutively
    var i = elemsToAdd.length;
    while (i--) {
      var elem = elemsToAdd[i];
      if (!elem) {continue;}
      var bbox = svgedit.utilities.getBBox(elem);
      if (!bbox) {continue;}

      if (elem.tagName === 'a' && elem.childNodes.length === 1) {
        // Make "a" element's child be the selected element
        elem = elem.firstChild;
      }

      // if it's not already there, add it
      if (selectedElements.indexOf(elem) == -1) {

        selectedElements[j] = elem;

        // only the first selectedBBoxes element is ever used in the codebase these days
//			if (j == 0) selectedBBoxes[0] = svgedit.utilities.getBBox(elem);
        j++;
        var sel = selectorManager.requestSelector(elem, bbox);

        if (selectedElements.length > 1) {
          sel.showGrips(false);
        }
      }
    }
    call('selected', selectedElements);

    if (showGrips || selectedElements.length == 1) {
      selectorManager.requestSelector(selectedElements[0]).showGrips(true);
    }
    else {
      selectorManager.requestSelector(selectedElements[0]).showGrips(false);
    }

    // make sure the elements are in the correct order
    // See: http://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-compareDocumentPosition

    selectedElements.sort(function(a, b) {
      if (a && b && a.compareDocumentPosition) {
        return 3 - (b.compareDocumentPosition(a) & 6);
      }
      if (a == null) {
        return 1;
      }
    });

    // Make sure first elements are not null
    while (selectedElements[0] == null) {
      selectedElements.shift(0);
    }
  };

// Function: selectOnly()
// Selects only the given elements, shortcut for clearSelection(); addToSelection()
//
// Parameters:
// elems - an array of DOM elements to be selected
  var selectOnly = this.selectOnly = function(elems, showGrips) {
    clearSelection(true);
    addToSelection(elems, showGrips);
  };

// TODO: could use slice here to make this faster?
// TODO: should the 'selected' handler

// Function: removeFromSelection
// Removes elements from the selection.
//
// Parameters:
// elemsToRemove - an array of elements to remove from selection
  var removeFromSelection = this.removeFromSelection = function(elemsToRemove) {
    if (selectedElements[0] == null) { return; }
    if (elemsToRemove.length == 0) { return; }

    // find every element and remove it from our array copy
    var i,
      j = 0,
      newSelectedItems = [],
      len = selectedElements.length;
    newSelectedItems.length = len;
    for (i = 0; i < len; ++i) {
      var elem = selectedElements[i];
      if (elem) {
        // keep the item
        if (elemsToRemove.indexOf(elem) == -1) {
          newSelectedItems[j] = elem;
          j++;
        } else { // remove the item and its selector
          selectorManager.releaseSelector(elem);
        }
      }
    }
    // the copy becomes the master now
    selectedElements = newSelectedItems;
  };

// Function: selectAllInCurrentLayer
// Clears the selection, then adds all elements in the current layer to the selection.
  this.selectAllInCurrentLayer = function() {
    var current_layer = getCurrentDrawing().getCurrentLayer();
    if (current_layer) {
      current_mode = 'select';
      selectOnly($(current_group || current_layer).children());
    }
  };

// Function: getMouseTarget
// Gets the desired element from a mouse event
//
// Parameters:
// evt - Event object from the mouse event
//
// Returns:
// DOM element we want
  var getMouseTarget = this.getMouseTarget = function(evt) {
    if (evt == null) {
      return null;
    }
    var mouse_target = evt.target;

    // if it was a <use>, Opera and WebKit return the SVGElementInstance
    if (mouse_target.correspondingUseElement) {mouse_target = mouse_target.correspondingUseElement;}

    // for foreign content, go up until we find the foreignObject
    // WebKit browsers set the mouse target to the svgcanvas div
    if ([NS.MATH, NS.HTML].indexOf(mouse_target.namespaceURI) >= 0 &&
      mouse_target.id != 'svgcanvas')
    {
      while (mouse_target.nodeName != 'foreignObject') {
        mouse_target = mouse_target.parentNode;
        if (!mouse_target) {return svgroot;}
      }
    }

    // Get the desired mouse_target with jQuery selector-fu
    // If it's root-like, select the root
    var current_layer = getCurrentDrawing().getCurrentLayer();
    if ([svgroot, container, svgcontent, current_layer].indexOf(mouse_target) >= 0) {
      return svgroot;
    }

    var $target = $(mouse_target);

    // If it's a selection grip, return the grip parent
    if ($target.closest('#selectorParentGroup').length) {
      // While we could instead have just returned mouse_target,
      // this makes it easier to indentify as being a selector grip
      return selectorManager.selectorParentGroup;
    }

    while (mouse_target.parentNode !== (current_group || current_layer)) {
      mouse_target = mouse_target.parentNode;
    }

//
//	// go up until we hit a child of a layer
//	while (mouse_target.parentNode.parentNode.tagName == 'g') {
//		mouse_target = mouse_target.parentNode;
//	}
    // Webkit bubbles the mouse event all the way up to the div, so we
    // set the mouse_target to the svgroot like the other browsers
//	if (mouse_target.nodeName.toLowerCase() == 'div') {
//		mouse_target = svgroot;
//	}

    return mouse_target;
  };

// Mouse events
  (function() {
    var d_attr = null,
      start_x = null,
      start_y = null,
      r_start_x = null,
      r_start_y = null,
      init_bbox = {},
      freehand = {
        minx: null,
        miny: null,
        maxx: null,
        maxy: null
      },
      sumDistance = 0,
      controllPoint2 = {x:0, y:0},
      controllPoint1 = {x:0, y:0},
      start = {x:0, y:0},
      end = {x:0, y:0},
      parameter,
      nextParameter,
      bSpline = {x:0, y:0},
      nextPos = {x:0, y:0},
      THRESHOLD_DIST = 0.8,
      STEP_COUNT = 10;

    var getBsplinePoint = function(t) {
      var spline = {x:0, y:0},
        p0 = controllPoint2,
        p1 = controllPoint1,
        p2 = start,
        p3 = end,
        S = 1.0 / 6.0,
        t2 = t * t,
        t3 = t2 * t;

      var m = [
        [-1, 3, -3, 1],
        [3, -6, 3, 0],
        [-3, 0, 3, 0],
        [1, 4, 1, 0]
      ];

      spline.x = S * (
        (p0.x * m[0][0] + p1.x * m[0][1] + p2.x * m[0][2] + p3.x * m[0][3] ) * t3 +
        (p0.x * m[1][0] + p1.x * m[1][1] + p2.x * m[1][2] + p3.x * m[1][3] ) * t2 +
        (p0.x * m[2][0] + p1.x * m[2][1] + p2.x * m[2][2] + p3.x * m[2][3] ) * t +
        (p0.x * m[3][0] + p1.x * m[3][1] + p2.x * m[3][2] + p3.x * m[3][3] )
      );
      spline.y = S * (
        (p0.y * m[0][0] + p1.y * m[0][1] + p2.y * m[0][2] + p3.y * m[0][3] ) * t3 +
        (p0.y * m[1][0] + p1.y * m[1][1] + p2.y * m[1][2] + p3.y * m[1][3] ) * t2 +
        (p0.y * m[2][0] + p1.y * m[2][1] + p2.y * m[2][2] + p3.y * m[2][3] ) * t +
        (p0.y * m[3][0] + p1.y * m[3][1] + p2.y * m[3][2] + p3.y * m[3][3] )
      );

      return {
        x:spline.x,
        y:spline.y
      };
    };
    // - when we are in a create mode, the element is added to the canvas
    // but the action is not recorded until mousing up
    // - when we are in select mode, select the element, remember the position
    // and do nothing else
    var mouseDown = function(evt) {
      if (canvas.spaceKey || evt.button === 1) {return;}

      var right_click = evt.button === 2;

      if (evt.altKey) { // duplicate when dragging
        svgCanvas.cloneSelectedElements(0, 0);
      }

      root_sctm = $('#svgcontent g')[0].getScreenCTM().inverse();

      var pt = svgedit.math.transformPoint( evt.pageX, evt.pageY, root_sctm ),
        mouse_x = pt.x * current_zoom,
        mouse_y = pt.y * current_zoom;

      evt.preventDefault();

      if (right_click) {
        current_mode = 'select';
        lastClickPoint = pt;
      }

      // This would seem to be unnecessary...
//		if (['select', 'resize'].indexOf(current_mode) == -1) {
//			setGradient();
//		}

      var x = mouse_x / current_zoom,
        y = mouse_y / current_zoom,
        mouse_target = getMouseTarget(evt);

      if (mouse_target.tagName === 'a' && mouse_target.childNodes.length === 1) {
        mouse_target = mouse_target.firstChild;
      }

      // real_x/y ignores grid-snap value
      var real_x = x;
      r_start_x = start_x = x;
      var real_y = y;
      r_start_y = start_y = y;

      if (curConfig.gridSnapping){
        x = svgedit.utilities.snapToGrid(x);
        y = svgedit.utilities.snapToGrid(y);
        start_x = svgedit.utilities.snapToGrid(start_x);
        start_y = svgedit.utilities.snapToGrid(start_y);
      }

      // if it is a selector grip, then it must be a single element selected,
      // set the mouse_target to that and update the mode to rotate/resize

      if (mouse_target == selectorManager.selectorParentGroup && selectedElements[0] != null) {
        var grip = evt.target;
        var griptype = elData(grip, 'type');
        // rotating
        if (griptype == 'rotate') {
          current_mode = 'rotate';
        }
        // resizing
        else if (griptype == 'resize') {
          current_mode = 'resize';
          current_resize_mode = elData(grip, 'dir');
        }
        mouse_target = selectedElements[0];
      }

      startTransform = mouse_target.getAttribute('transform');
      var i, stroke_w,
        tlist = svgedit.transformlist.getTransformList(mouse_target);
      switch (current_mode) {
        case 'select':
          started = true;
          current_resize_mode = 'none';
          if (right_click) {started = false;}

          if (mouse_target != svgroot) {
            // if this element is not yet selected, clear selection and select it
            if (selectedElements.indexOf(mouse_target) == -1) {
              // only clear selection if shift is not pressed (otherwise, add
              // element to selection)
              if (!evt.shiftKey) {
                // No need to do the call here as it will be done on addToSelection
                clearSelection(true);
              }
              addToSelection([mouse_target]);
              justSelected = mouse_target;
              pathActions.clear();
            }
            // else if it's a path, go into pathedit mode in mouseup

            if (!right_click) {
              // insert a dummy transform so if the element(s) are moved it will have
              // a transform to use for its translate
              for (i = 0; i < selectedElements.length; ++i) {
                if (selectedElements[i] == null) {continue;}
                var slist = svgedit.transformlist.getTransformList(selectedElements[i]);
                if (slist.numberOfItems) {
                  slist.insertItemBefore(svgroot.createSVGTransform(), 0);
                } else {
                  slist.appendItem(svgroot.createSVGTransform());
                }
              }
            }
          } else if (!right_click){
            clearSelection();
            current_mode = 'multiselect';
            if (rubberBox == null) {
              rubberBox = selectorManager.getRubberBandBox();
            }
            r_start_x *= current_zoom;
            r_start_y *= current_zoom;
//					console.log('p',[evt.pageX, evt.pageY]);
//					console.log('c',[evt.clientX, evt.clientY]);
//					console.log('o',[evt.offsetX, evt.offsetY]);
//					console.log('s',[start_x, start_y]);

            svgedit.utilities.assignAttributes(rubberBox, {
              'x': r_start_x,
              'y': r_start_y,
              'width': 0,
              'height': 0,
              'display': 'inline'
            }, 100);
          }
          break;
        case 'zoom':
          started = true;
          if (rubberBox == null) {
            rubberBox = selectorManager.getRubberBandBox();
          }
          svgedit.utilities.assignAttributes(rubberBox, {
            'x': real_x * current_zoom,
            'y': real_x * current_zoom,
            'width': 0,
            'height': 0,
            'display': 'inline'
          }, 100);
          break;
        case 'resize':
          started = true;
          start_x = x;
          start_y = y;

          // Getting the BBox from the selection box, since we know we
          // want to orient around it
          init_bbox = svgedit.utilities.getBBox($('#selectedBox0')[0]);
          var bb = {};
          $.each(init_bbox, function(key, val) {
            bb[key] = val/current_zoom;
          });
          init_bbox = bb;

          // append three dummy transforms to the tlist so that
          // we can translate,scale,translate in mousemove
          var pos = svgedit.utilities.getRotationAngle(mouse_target) ? 1 : 0;

          if (svgedit.math.hasMatrixTransform(tlist)) {
            tlist.insertItemBefore(svgroot.createSVGTransform(), pos);
            tlist.insertItemBefore(svgroot.createSVGTransform(), pos);
            tlist.insertItemBefore(svgroot.createSVGTransform(), pos);
          } else {
            tlist.appendItem(svgroot.createSVGTransform());
            tlist.appendItem(svgroot.createSVGTransform());
            tlist.appendItem(svgroot.createSVGTransform());

            if (svgedit.browser.supportsNonScalingStroke()) {
              // Handle crash for newer Chrome and Safari 6 (Mobile and Desktop):
              // https://code.google.com/p/svg-edit/issues/detail?id=904
              // Chromium issue: https://code.google.com/p/chromium/issues/detail?id=114625
              // TODO: Remove this workaround once vendor fixes the issue
              var isWebkit = svgedit.browser.isWebkit();

              if (isWebkit) {
                var delayedStroke = function(ele) {
                  var _stroke = ele.getAttributeNS(null, 'stroke');
                  ele.removeAttributeNS(null, 'stroke');
                  // Re-apply stroke after delay. Anything higher than 1 seems to cause flicker
                  if (_stroke !== null) setTimeout(function() { ele.setAttributeNS(null, 'stroke', _stroke); }, 0);
                };
              }
              mouse_target.style.vectorEffect = 'non-scaling-stroke';
              if (isWebkit) {delayedStroke(mouse_target);}

              var all = mouse_target.getElementsByTagName('*'),
                len = all.length;
              for (i = 0; i < len; i++) {
                all[i].style.vectorEffect = 'non-scaling-stroke';
                if (isWebkit) {delayedStroke(all[i]);}
              }
            }
          }
          break;
        case 'fhellipse':
        case 'fhrect':
        case 'fhpath':
          start.x = real_x;
          start.y = real_y;
          started = true;
          d_attr = real_x + ',' + real_y + ' ';
          stroke_w = cur_shape.stroke_width == 0 ? 1 : cur_shape.stroke_width;
          addSvgElementFromJson({
            element: 'polyline',
            curStyles: true,
            attr: {
              points: d_attr,
              id: getNextId(),
              fill: 'none',
              opacity: cur_shape.opacity / 2,
              'stroke-linecap': 'round',
              style: 'pointer-events:none'
            }
          });
          freehand.minx = real_x;
          freehand.maxx = real_x;
          freehand.miny = real_y;
          freehand.maxy = real_y;
          break;
        case 'image':
          started = true;
          var newImage = addSvgElementFromJson({
            element: 'image',
            attr: {
              x: x,
              y: y,
              width: 0,
              height: 0,
              id: getNextId(),
              opacity: cur_shape.opacity / 2,
              style: 'pointer-events:inherit'
            }
          });
          setHref(newImage, last_good_img_url);
          svgedit.utilities.preventClickDefault(newImage);
          break;
        case 'square':
        // FIXME: once we create the rect, we lose information that this was a square
        // (for resizing purposes this could be important)
        case 'rect':
          started = true;
          start_x = x;
          start_y = y;
          addSvgElementFromJson({
            element: 'rect',
            curStyles: true,
            attr: {
              x: x,
              y: y,
              width: 0,
              height: 0,
              id: getNextId(),
              opacity: cur_shape.opacity / 2
            }
          });
          break;
        case 'line':
          started = true;
          stroke_w = cur_shape.stroke_width == 0 ? 1 : cur_shape.stroke_width;
          addSvgElementFromJson({
            element: 'line',
            curStyles: true,
            attr: {
              x1: x,
              y1: y,
              x2: x,
              y2: y,
              id: getNextId(),
              stroke: cur_shape.stroke,
              'stroke-width': stroke_w,
              'stroke-dasharray': cur_shape.stroke_dasharray,
              'stroke-linejoin': cur_shape.stroke_linejoin,
              'stroke-linecap': cur_shape.stroke_linecap,
              'stroke-opacity': cur_shape.stroke_opacity,
              fill: 'none',
              opacity: cur_shape.opacity / 2,
              style: 'pointer-events:none'
            }
          });
          break;
        case 'circle':
          started = true;
          addSvgElementFromJson({
            element: 'circle',
            curStyles: true,
            attr: {
              cx: x,
              cy: y,
              r: 0,
              id: getNextId(),
              opacity: cur_shape.opacity / 2
            }
          });
          break;
        case 'ellipse':
          started = true;
          addSvgElementFromJson({
            element: 'ellipse',
            curStyles: true,
            attr: {
              cx: x,
              cy: y,
              rx: 0,
              ry: 0,
              id: getNextId(),
              opacity: cur_shape.opacity / 2
            }
          });
          break;
        case 'text':
          started = true;
          var newText = addSvgElementFromJson({
            element: 'text',
            curStyles: true,
            attr: {
              x: x,
              y: y,
              id: getNextId(),
              fill: cur_text.fill,
              'stroke-width': cur_text.stroke_width,
              'font-size': cur_text.font_size,
              'font-family': cur_text.font_family,
              'text-anchor': 'middle',
              'xml:space': 'preserve',
              opacity: cur_shape.opacity
            }
          });
//					newText.textContent = 'text';
          break;
        case 'path':
        // Fall through
        case 'pathedit':
          start_x *= current_zoom;
          start_y *= current_zoom;
          pathActions.mouseDown(evt, mouse_target, start_x, start_y);
          started = true;
          break;
        case 'textedit':
          start_x *= current_zoom;
          start_y *= current_zoom;
          textActions.mouseDown(evt, mouse_target, start_x, start_y);
          started = true;
          break;
        case 'rotate':
          started = true;
          // we are starting an undoable change (a drag-rotation)
          canvas.undoMgr.beginUndoableChange('transform', selectedElements);
          break;
        default:
          // This could occur in an extension
          break;
      }

      var ext_result = runExtensions('mouseDown', {
        event: evt,
        start_x: start_x,
        start_y: start_y,
        selectedElements: selectedElements
      }, true);

      $.each(ext_result, function(i, r) {
        if (r && r.started) {
          started = true;
        }
      });
    };

    // in this function we do not record any state changes yet (but we do update
    // any elements that are still being created, moved or resized on the canvas)
    var mouseMove = function(evt) {
      if (!started) {return;}
      if (evt.button === 1 || canvas.spaceKey) {return;}

      var i, xya, c, cx, cy, dx, dy, len, angle, box,
        selected = selectedElements[0],
        pt = svgedit.math.transformPoint( evt.pageX, evt.pageY, root_sctm ),
        mouse_x = pt.x * current_zoom,
        mouse_y = pt.y * current_zoom,
        shape = svgedit.utilities.getElem(getId());

      var real_x = mouse_x / current_zoom;
      x = real_x;
      var real_y = mouse_y / current_zoom;
      y = real_y;

      if (curConfig.gridSnapping){
        x = svgedit.utilities.snapToGrid(x);
        y = svgedit.utilities.snapToGrid(y);
      }

      evt.preventDefault();
      var tlist;
      switch (current_mode) {
        case 'select':
          // we temporarily use a translate on the element(s) being dragged
          // this transform is removed upon mousing up and the element is
          // relocated to the new location
          if (selectedElements[0] !== null) {
            dx = x - start_x;
            dy = y - start_y;

            if (curConfig.gridSnapping){
              dx = svgedit.utilities.snapToGrid(dx);
              dy = svgedit.utilities.snapToGrid(dy);
            }

            if (evt.shiftKey) {
              xya = svgedit.math.snapToAngle(start_x, start_y, x, y);
              x = xya.x;
              y = xya.y;
            }

            if (dx != 0 || dy != 0) {
              len = selectedElements.length;
              for (i = 0; i < len; ++i) {
                selected = selectedElements[i];
                if (selected == null) {break;}
//							if (i==0) {
//								var box = svgedit.utilities.getBBox(selected);
//									selectedBBoxes[i].x = box.x + dx;
//									selectedBBoxes[i].y = box.y + dy;
//							}

                // update the dummy transform in our transform list
                // to be a translate
                var xform = svgroot.createSVGTransform();
                tlist = svgedit.transformlist.getTransformList(selected);
                // Note that if Webkit and there's no ID for this
                // element, the dummy transform may have gotten lost.
                // This results in unexpected behaviour

                xform.setTranslate(dx, dy);
                if (tlist.numberOfItems) {
                  tlist.replaceItem(xform, 0);
                } else {
                  tlist.appendItem(xform);
                }

                // update our internal bbox that we're tracking while dragging
                selectorManager.requestSelector(selected).resize();
              }

              call('transition', selectedElements);
            }
          }
          break;
        case 'multiselect':
          real_x *= current_zoom;
          real_y *= current_zoom;
          svgedit.utilities.assignAttributes(rubberBox, {
            'x': Math.min(r_start_x, real_x),
            'y': Math.min(r_start_y, real_y),
            'width': Math.abs(real_x - r_start_x),
            'height': Math.abs(real_y - r_start_y)
          }, 100);

          // for each selected:
          // - if newList contains selected, do nothing
          // - if newList doesn't contain selected, remove it from selected
          // - for any newList that was not in selectedElements, add it to selected
          var elemsToRemove = selectedElements.slice(), elemsToAdd = [],
            newList = getIntersectionList();

          // For every element in the intersection, add if not present in selectedElements.
          len = newList.length;
          for (i = 0; i < len; ++i) {
            var intElem = newList[i];
            // Found an element that was not selected before, so we should add it.
            if (selectedElements.indexOf(intElem) == -1) {
              elemsToAdd.push(intElem);
            }
            // Found an element that was already selected, so we shouldn't remove it.
            var foundInd = elemsToRemove.indexOf(intElem);
            if (foundInd != -1) {
              elemsToRemove.splice(foundInd, 1)
            }
          }

          if (elemsToRemove.length > 0) {
            canvas.removeFromSelection(elemsToRemove);
          }

          if (elemsToAdd.length > 0) {
            canvas.addToSelection(elemsToAdd);
          }

          break;
        case 'resize':
          // we track the resize bounding box and translate/scale the selected element
          // while the mouse is down, when mouse goes up, we use this to recalculate
          // the shape's coordinates
          tlist = svgedit.transformlist.getTransformList(selected);
          var hasMatrix = svgedit.math.hasMatrixTransform(tlist);
          box = hasMatrix ? init_bbox : svgedit.utilities.getBBox(selected);
          var left = box.x, top = box.y, width = box.width,
            height = box.height;
          dx = (x-start_x);
          dy = (y-start_y);

          if (curConfig.gridSnapping) {
            dx = svgedit.utilities.snapToGrid(dx);
            dy = svgedit.utilities.snapToGrid(dy);
            height = svgedit.utilities.snapToGrid(height);
            width = svgedit.utilities.snapToGrid(width);
          }

          // if rotated, adjust the dx,dy values
          angle = svgedit.utilities.getRotationAngle(selected);
          if (angle) {
            var r = Math.sqrt( dx*dx + dy*dy ),
              theta = Math.atan2(dy, dx) - angle * Math.PI / 180.0;
            dx = r * Math.cos(theta);
            dy = r * Math.sin(theta);
          }

          // if not stretching in y direction, set dy to 0
          // if not stretching in x direction, set dx to 0
          if (current_resize_mode.indexOf('n')==-1 && current_resize_mode.indexOf('s')==-1) {
            dy = 0;
          }
          if (current_resize_mode.indexOf('e')==-1 && current_resize_mode.indexOf('w')==-1) {
            dx = 0;
          }

          var ts = null,
            tx = 0, ty = 0,
            sy = height ? (height+dy)/height : 1,
            sx = width ? (width+dx)/width : 1;
          // if we are dragging on the north side, then adjust the scale factor and ty
          if (current_resize_mode.indexOf('n') >= 0) {
            sy = height ? (height-dy)/height : 1;
            ty = height;
          }

          // if we dragging on the east side, then adjust the scale factor and tx
          if (current_resize_mode.indexOf('w') >= 0) {
            sx = width ? (width-dx)/width : 1;
            tx = width;
          }

          // update the transform list with translate,scale,translate
          var translateOrigin = svgroot.createSVGTransform(),
            scale = svgroot.createSVGTransform(),
            translateBack = svgroot.createSVGTransform();

          if (curConfig.gridSnapping) {
            left = svgedit.utilities.snapToGrid(left);
            tx = svgedit.utilities.snapToGrid(tx);
            top = svgedit.utilities.snapToGrid(top);
            ty = svgedit.utilities.snapToGrid(ty);
          }

          translateOrigin.setTranslate(-(left+tx), -(top+ty));
          if (evt.shiftKey) {
            if (sx == 1) {sx = sy;}
            else {sy = sx;}
          }
          scale.setScale(sx, sy);

          translateBack.setTranslate(left+tx, top+ty);
          if (hasMatrix) {
            var diff = angle ? 1 : 0;
            tlist.replaceItem(translateOrigin, 2+diff);
            tlist.replaceItem(scale, 1+diff);
            tlist.replaceItem(translateBack, Number(diff));
          } else {
            var N = tlist.numberOfItems;
            tlist.replaceItem(translateBack, N-3);
            tlist.replaceItem(scale, N-2);
            tlist.replaceItem(translateOrigin, N-1);
          }

          selectorManager.requestSelector(selected).resize();

          call('transition', selectedElements);

          break;
        case 'zoom':
          real_x *= current_zoom;
          real_y *= current_zoom;
          svgedit.utilities.assignAttributes(rubberBox, {
            'x': Math.min(r_start_x*current_zoom, real_x),
            'y': Math.min(r_start_y*current_zoom, real_y),
            'width': Math.abs(real_x - r_start_x*current_zoom),
            'height': Math.abs(real_y - r_start_y*current_zoom)
          }, 100);
          break;
        case 'text':
          svgedit.utilities.assignAttributes(shape,{
            'x': x,
            'y': y
          }, 1000);
          break;
        case 'line':
          if (curConfig.gridSnapping) {
            x = svgedit.utilities.snapToGrid(x);
            y = svgedit.utilities.snapToGrid(y);
          }

          var x2 = x;
          var y2 = y;

          if (evt.shiftKey) {
            xya = svgedit.math.snapToAngle(start_x, start_y, x2, y2);
            x2 = xya.x;
            y2 = xya.y;
          }

          shape.setAttributeNS(null, 'x2', x2);
          shape.setAttributeNS(null, 'y2', y2);
          break;
        case 'foreignObject':
        // fall through
        case 'square':
        // fall through
        case 'rect':
        // fall through
        case 'image':
          var square = (current_mode == 'square') || evt.shiftKey,
            w = Math.abs(x - start_x),
            h = Math.abs(y - start_y),
            new_x, new_y;
          if (square) {
            w = h = Math.max(w, h);
            new_x = start_x < x ? start_x : start_x - w;
            new_y = start_y < y ? start_y : start_y - h;
          } else {
            new_x = Math.min(start_x, x);
            new_y = Math.min(start_y, y);
          }

          if (curConfig.gridSnapping) {
            w = svgedit.utilities.snapToGrid(w);
            h = svgedit.utilities.snapToGrid(h);
            new_x = svgedit.utilities.snapToGrid(new_x);
            new_y = svgedit.utilities.snapToGrid(new_y);
          }

          svgedit.utilities.assignAttributes(shape,{
            'width': w,
            'height': h,
            'x': new_x,
            'y': new_y
          },1000);

          break;
        case 'circle':
          c = $(shape).attr(['cx', 'cy']);
          cx = c.cx;
          cy = c.cy;
          var rad = Math.sqrt( (x-cx)*(x-cx) + (y-cy)*(y-cy) );
          if (curConfig.gridSnapping) {
            rad = svgedit.utilities.snapToGrid(rad);
          }
          shape.setAttributeNS(null, 'r', rad);
          break;
        case 'ellipse':
          c = $(shape).attr(['cx', 'cy']);
          cx = c.cx;
          cy = c.cy;
          if (curConfig.gridSnapping) {
            x = svgedit.utilities.snapToGrid(x);
            cx = svgedit.utilities.snapToGrid(cx);
            y = svgedit.utilities.snapToGrid(y);
            cy = svgedit.utilities.snapToGrid(cy);
          }
          shape.setAttributeNS(null, 'rx', Math.abs(x - cx) );
          var ry = Math.abs(evt.shiftKey?(x - cx):(y - cy));
          shape.setAttributeNS(null, 'ry', ry );
          break;
        case 'fhellipse':
        case 'fhrect':
          freehand.minx = Math.min(real_x, freehand.minx);
          freehand.maxx = Math.max(real_x, freehand.maxx);
          freehand.miny = Math.min(real_y, freehand.miny);
          freehand.maxy = Math.max(real_y, freehand.maxy);
        // break; missing on purpose
        case 'fhpath':
//				d_attr += + real_x + ',' + real_y + ' ';
//				shape.setAttributeNS(null, 'points', d_attr);
          end.x = real_x; end.y = real_y;
          if (controllPoint2.x && controllPoint2.y) {
            for (i = 0; i < STEP_COUNT - 1; i++) {
              parameter = i / STEP_COUNT;
              nextParameter = (i + 1) / STEP_COUNT;
              bSpline = getBsplinePoint(nextParameter);
              nextPos = bSpline;
              bSpline = getBsplinePoint(parameter);
              sumDistance += Math.sqrt((nextPos.x - bSpline.x) * (nextPos.x - bSpline.x) + (nextPos.y - bSpline.y) * (nextPos.y - bSpline.y));
              if (sumDistance > THRESHOLD_DIST) {
                d_attr += + bSpline.x + ',' + bSpline.y + ' ';
                shape.setAttributeNS(null, 'points', d_attr);
                sumDistance -= THRESHOLD_DIST;
              }
            }
          }
          controllPoint2 = {x:controllPoint1.x, y:controllPoint1.y};
          controllPoint1 = {x:start.x, y:start.y};
          start = {x:end.x, y:end.y};
          break;
        // update path stretch line coordinates
        case 'path':
        // fall through
        case 'pathedit':
          x *= current_zoom;
          y *= current_zoom;

          if (curConfig.gridSnapping) {
            x = svgedit.utilities.snapToGrid(x);
            y = svgedit.utilities.snapToGrid(y);
            start_x = svgedit.utilities.snapToGrid(start_x);
            start_y = svgedit.utilities.snapToGrid(start_y);
          }
          if (evt.shiftKey) {
            var path = svgedit.path.path;
            var x1, y1;
            if (path) {
              x1 = path.dragging?path.dragging[0]:start_x;
              y1 = path.dragging?path.dragging[1]:start_y;
            } else {
              x1 = start_x;
              y1 = start_y;
            }
            xya = svgedit.math.snapToAngle(x1, y1, x, y);
            x = xya.x;
            y = xya.y;
          }

          if (rubberBox && rubberBox.getAttribute('display') !== 'none') {
            real_x *= current_zoom;
            real_y *= current_zoom;
            svgedit.utilities.assignAttributes(rubberBox, {
              'x': Math.min(r_start_x*current_zoom, real_x),
              'y': Math.min(r_start_y*current_zoom, real_y),
              'width': Math.abs(real_x - r_start_x*current_zoom),
              'height': Math.abs(real_y - r_start_y*current_zoom)
            },100);
          }
          pathActions.mouseMove(x, y);

          break;
        case 'textedit':
          x *= current_zoom;
          y *= current_zoom;
//					if (rubberBox && rubberBox.getAttribute('display') != 'none') {
//						svgedit.utilities.assignAttributes(rubberBox, {
//							'x': Math.min(start_x,x),
//							'y': Math.min(start_y,y),
//							'width': Math.abs(x-start_x),
//							'height': Math.abs(y-start_y)
//						},100);
//					}

          textActions.mouseMove(mouse_x, mouse_y);

          break;
        case 'rotate':
          box = svgedit.utilities.getBBox(selected);
          cx = box.x + box.width/2;
          cy = box.y + box.height/2;
          var m = svgedit.math.getMatrix(selected),
            center = svgedit.math.transformPoint(cx, cy, m);
          cx = center.x;
          cy = center.y;
          angle = ((Math.atan2(cy-y, cx-x) * (180/Math.PI))-90) % 360;
          if (curConfig.gridSnapping) {
            angle = svgedit.utilities.snapToGrid(angle);
          }
          if (evt.shiftKey) { // restrict rotations to nice angles (WRS)
            var snap = 45;
            angle= Math.round(angle/snap)*snap;
          }

          canvas.setRotationAngle(angle<-180?(360+angle):angle, true);
          call('transition', selectedElements);
          break;
        default:
          break;
      }

      runExtensions('mouseMove', {
        event: evt,
        mouse_x: mouse_x,
        mouse_y: mouse_y,
        selected: selected
      });

    }; // mouseMove()

    // - in create mode, the element's opacity is set properly, we create an InsertElementCommand
    // and store it on the Undo stack
    // - in move/resize mode, the element's attributes which were affected by the move/resize are
    // identified, a ChangeElementCommand is created and stored on the stack for those attrs
    // this is done in when we recalculate the selected dimensions()
    var mouseUp = function(evt) {
      if (evt.button === 2) {return;}
      var tempJustSelected = justSelected;
      justSelected = null;
      if (!started) {return;}
      var pt = svgedit.math.transformPoint(evt.pageX, evt.pageY, root_sctm),
        mouse_x = pt.x * current_zoom,
        mouse_y = pt.y * current_zoom,
        x = mouse_x / current_zoom,
        y = mouse_y / current_zoom,
        element = svgedit.utilities.getElem(getId()),
        keep = false;

      var real_x = x;
      var real_y = y;

      // TODO: Make true when in multi-unit mode
      var useUnit = false; // (curConfig.baseUnit !== 'px');
      started = false;
      var attrs, t;
      switch (current_mode) {
        // intentionally fall-through to select here
        case 'resize':
        case 'multiselect':
          if (rubberBox != null) {
            rubberBox.setAttribute('display', 'none');
            curBBoxes = [];
          }
          current_mode = 'select';
        case 'select':
          if (selectedElements[0] != null) {
            // if we only have one selected element
            if (selectedElements[1] == null) {
              // set our current stroke/fill properties to the element's
              var selected = selectedElements[0];
              switch ( selected.tagName ) {
                case 'g':
                case 'use':
                case 'image':
                case 'foreignObject':
                  break;
                default:
                  cur_properties.fill = selected.getAttribute('fill');
                  cur_properties.fill_opacity = selected.getAttribute('fill-opacity');
                  cur_properties.stroke = selected.getAttribute('stroke');
                  cur_properties.stroke_opacity = selected.getAttribute('stroke-opacity');
                  cur_properties.stroke_width = selected.getAttribute('stroke-width');
                  cur_properties.stroke_dasharray = selected.getAttribute('stroke-dasharray');
                  cur_properties.stroke_linejoin = selected.getAttribute('stroke-linejoin');
                  cur_properties.stroke_linecap = selected.getAttribute('stroke-linecap');
              }

              if (selected.tagName == 'text') {
                cur_text.font_size = selected.getAttribute('font-size');
                cur_text.font_family = selected.getAttribute('font-family');
              }
              selectorManager.requestSelector(selected).showGrips(true);

              // This shouldn't be necessary as it was done on mouseDown...
//							call('selected', [selected]);
            }
            // always recalculate dimensions to strip off stray identity transforms
            recalculateAllSelectedDimensions();
            // if it was being dragged/resized
            if (real_x != r_start_x || real_y != r_start_y) {
              var i, len = selectedElements.length;
              for (i = 0; i < len; ++i) {
                if (selectedElements[i] == null) {break;}
                if (!selectedElements[i].firstChild) {
                  // Not needed for groups (incorrectly resizes elems), possibly not needed at all?
                  selectorManager.requestSelector(selectedElements[i]).resize();
                }
              }
            }
            // no change in position/size, so maybe we should move to pathedit
            else {
              t = evt.target;
              if (selectedElements[0].nodeName === 'path' && selectedElements[1] == null) {
                pathActions.select(selectedElements[0]);
              } // if it was a path
              // else, if it was selected and this is a shift-click, remove it from selection
              else if (evt.shiftKey) {
                if (tempJustSelected != t) {
                  canvas.removeFromSelection([t]);
                }
              }
            } // no change in mouse position

            // Remove non-scaling stroke
            // if (svgedit.browser.supportsNonScalingStroke()) {
            //   var elem = selectedElements[0];
            //   if (elem) {
            //     elem.removeAttribute('style');
            //     svgedit.utilities.walkTree(elem, function(elem) {
            //       elem.removeAttribute('style');
            //     });
            //   }
            // }
          }
          return;
        case 'zoom':
          if (rubberBox != null) {
            rubberBox.setAttribute('display', 'none');
          }
          var factor = evt.shiftKey ? 0.5 : 2;
          call('zoomed', {
            'x': Math.min(r_start_x, real_x),
            'y': Math.min(r_start_y, real_y),
            'width': Math.abs(real_x - r_start_x),
            'height': Math.abs(real_y - r_start_y),
            'factor': factor
          });
          return;
        case 'fhpath':
          // Check that the path contains at least 2 points; a degenerate one-point path
          // causes problems.
          // Webkit ignores how we set the points attribute with commas and uses space
          // to separate all coordinates, see https://bugs.webkit.org/show_bug.cgi?id=29870
          sumDistance = 0;
          controllPoint2 = {x:0, y:0};
          controllPoint1 = {x:0, y:0};
          start = {x:0, y:0};
          end = {x:0, y:0};
          var coords = element.getAttribute('points');
          var commaIndex = coords.indexOf(',');
          if (commaIndex >= 0) {
            keep = coords.indexOf(',', commaIndex+1) >= 0;
          } else {
            keep = coords.indexOf(' ', coords.indexOf(' ')+1) >= 0;
          }
          if (keep) {
            element = pathActions.smoothPolylineIntoPath(element);
          }
          break;
        case 'line':
          attrs = $(element).attr(['x1', 'x2', 'y1', 'y2']);
          keep = (attrs.x1 != attrs.x2 || attrs.y1 != attrs.y2);
          break;
        case 'foreignObject':
        case 'square':
        case 'rect':
        case 'image':
          attrs = $(element).attr(['width', 'height']);
          // Image should be kept regardless of size (use inherit dimensions later)
          keep = (attrs.width != 0 || attrs.height != 0) || current_mode === 'image';
          break;
        case 'circle':
          keep = (element.getAttribute('r') != 0);
          break;
        case 'ellipse':
          attrs = $(element).attr(['rx', 'ry']);
          keep = (attrs.rx != null || attrs.ry != null);
          break;
        case 'fhellipse':
          if ((freehand.maxx - freehand.minx) > 0 &&
            (freehand.maxy - freehand.miny) > 0) {
            element = addSvgElementFromJson({
              element: 'ellipse',
              curStyles: true,
              attr: {
                cx: (freehand.minx + freehand.maxx) / 2,
                cy: (freehand.miny + freehand.maxy) / 2,
                rx: (freehand.maxx - freehand.minx) / 2,
                ry: (freehand.maxy - freehand.miny) / 2,
                id: getId()
              }
            });
            call('changed',[element]);
            keep = true;
          }
          break;
        case 'fhrect':
          if ((freehand.maxx - freehand.minx) > 0 &&
            (freehand.maxy - freehand.miny) > 0) {
            element = addSvgElementFromJson({
              element: 'rect',
              curStyles: true,
              attr: {
                x: freehand.minx,
                y: freehand.miny,
                width: (freehand.maxx - freehand.minx),
                height: (freehand.maxy - freehand.miny),
                id: getId()
              }
            });
            call('changed',[element]);
            keep = true;
          }
          break;
        case 'text':
          keep = true;
          selectOnly([element]);
          textActions.start(element);
          break;
        case 'path':
          // set element to null here so that it is not removed nor finalized
          element = null;
          // continue to be set to true so that mouseMove happens
          started = true;

          var res = pathActions.mouseUp(evt, element, mouse_x, mouse_y);
          element = res.element;
          keep = res.keep;
          break;
        case 'pathedit':
          keep = true;
          element = null;
          pathActions.mouseUp(evt);
          break;
        case 'textedit':
          keep = false;
          element = null;
          textActions.mouseUp(evt, mouse_x, mouse_y);
          break;
        case 'rotate':
          keep = true;
          element = null;
          current_mode = 'select';
          var batchCmd = canvas.undoMgr.finishUndoableChange();
          if (!batchCmd.isEmpty()) {
            addCommandToHistory(batchCmd);
          }
          // perform recalculation to weed out any stray identity transforms that might get stuck
          recalculateAllSelectedDimensions();
          call('changed', selectedElements);
          break;
        default:
          // This could occur in an extension
          break;
      }

      var ext_result = runExtensions('mouseUp', {
        event: evt,
        mouse_x: mouse_x,
        mouse_y: mouse_y
      }, true);

      $.each(ext_result, function(i, r) {
        if (r) {
          keep = r.keep || keep;
          element = r.element;
          started = r.started || started;
        }
      });

      if (!keep && element != null) {
        getCurrentDrawing().releaseId(getId());
        element.parentNode.removeChild(element);
        element = null;

        t = evt.target;

        // if this element is in a group, go up until we reach the top-level group
        // just below the layer groups
        // TODO: once we implement links, we also would have to check for <a> elements
        while (t.parentNode.parentNode.tagName == 'g') {
          t = t.parentNode;
        }
        // if we are not in the middle of creating a path, and we've clicked on some shape,
        // then go to Select mode.
        // WebKit returns <div> when the canvas is clicked, Firefox/Opera return <svg>
        if ( (current_mode != 'path' || !drawn_path) &&
          t.parentNode.id != 'selectorParentGroup' &&
          t.id != 'svgcanvas' && t.id != 'svgroot')
        {
          // switch into "select" mode if we've clicked on an element
          canvas.setMode('select');
          selectOnly([t], true);
        }

      } else if (element != null) {
        canvas.addedNew = true;

        if (useUnit) {svgedit.units.convertAttrs(element);}

        var ani_dur = 0.2, c_ani;
        if (opac_ani.beginElement && element.getAttribute('opacity') != cur_shape.opacity) {
          c_ani = $(opac_ani).clone().attr({
            to: cur_shape.opacity,
            dur: ani_dur
          }).appendTo(element);
          try {
            // Fails in FF4 on foreignObject
            c_ani[0].beginElement();
          } catch(e){}
        } else {
          ani_dur = 0;
        }

        // Ideally this would be done on the endEvent of the animation,
        // but that doesn't seem to be supported in Webkit
        setTimeout(function() {
          if (c_ani) {c_ani.remove();}
          element.setAttribute('opacity', cur_shape.opacity);
          element.setAttribute('style', 'pointer-events:inherit');
          cleanupElement(element);
          if (current_mode === 'path') {
            pathActions.toEditMode(element);
          } else if (curConfig.selectNew) {
            selectOnly([element], true);
          }
          // we create the insert command that is stored on the stack
          // undo means to call cmd.unapply(), redo means to call cmd.apply()
          addCommandToHistory(new svgedit.history.InsertElementCommand(element));

          call('changed',[element]);
        }, ani_dur * 1000);
      }

      startTransform = null;
    };

    var dblClick = function(evt) {
      var evt_target = evt.target;
      var parent = evt_target.parentNode;

      // Do nothing if already in current group
      if (parent === current_group) {return;}

      var mouse_target = getMouseTarget(evt);
      var tagName = mouse_target.tagName;

      if (tagName === 'text' && current_mode !== 'textedit') {
        var pt = svgedit.math.transformPoint( evt.pageX, evt.pageY, root_sctm );
        textActions.select(mouse_target, pt.x, pt.y);
      }

      if ((tagName === 'g' || tagName === 'a') && svgedit.utilities.getRotationAngle(mouse_target)) {
        // TODO: Allow method of in-group editing without having to do
        // this (similar to editing rotated paths)

        // Ungroup and regroup
        pushGroupProperties(mouse_target);
        mouse_target = selectedElements[0];
        clearSelection(true);
      }
      // Reset context
      if (current_group) {
        leaveContext();
      }

      if ((parent.tagName !== 'g' && parent.tagName !== 'a') ||
        parent === getCurrentDrawing().getCurrentLayer() ||
        mouse_target === selectorManager.selectorParentGroup)
      {
        // Escape from in-group edit
        return;
      }
      setContext(mouse_target);
    };

    // prevent links from being followed in the canvas
    var handleLinkInCanvas = function(e) {
      e.preventDefault();
      return false;
    };

    // Added mouseup to the container here.
    // TODO(codedread): Figure out why after the Closure compiler, the window mouseup is ignored.
    $(container).mousedown(mouseDown).mousemove(mouseMove).click(handleLinkInCanvas).dblclick(dblClick).mouseup(mouseUp);
//	$(window).mouseup(mouseUp);

    //TODO(rafaelcastrocouto): User preference for shift key and zoom factor
    $(container).bind('mousewheel DOMMouseScroll', function(e){
      if (!e.shiftKey) return;

      e.preventDefault();
      var i = e.originalEvent;
      root_sctm = $("#svgcontent g")[0].getScreenCTM().inverse();
      var workarea = $("#workarea");
      var scrbar = 0;
      var rulerwidth = 0;
      var pt = svgedit.math.transformPoint(i.pageX, i.pageY, root_sctm);
      var editorFullW = workarea.width();
      var editorFullH = workarea.height();
      var editorW = editorFullW - scrbar - rulerwidth;
      var editorH = editorFullH - scrbar - rulerwidth;
      var workareaViewW = editorW * root_sctm.a;
      var workareaViewH = editorH * root_sctm.d;
      var wOffset = workarea.offset();

      wOffsetLeft = wOffset.left + rulerwidth;
      wOffsetTop = wOffset.top + rulerwidth;
      var delta = i.wheelDelta ? i.wheelDelta : i.detail ? -i.detail : 0;
      if (!delta) return;
      let wZoom, hZoom, factor = Math.max(.9, Math.min(10 / 9, delta));
      factor > 1 ? (wZoom = Math.ceil(editorW / workareaViewW * factor * 100) / 100, hZoom = Math.ceil(editorH / workareaViewH * factor * 100) / 100) : (wZoom = Math.floor(editorW / workareaViewW * factor * 100) / 100, hZoom = Math.floor(editorH / workareaViewH * factor * 100) / 100);
      let S = Math.min(wZoom, hZoom);
      if (S === current_zoom) return;
      factor = S / current_zoom;
      var C = svgedit.math.transformPoint(wOffsetLeft, wOffsetTop, root_sctm);
      var topLeftNew = {x: pt.x - (pt.x - C.x) / factor, y: pt.y - (pt.y - C.y) / factor};
      var topLeftNewCanvas = {x: topLeftNew.x * S, y: topLeftNew.y * S};
      var newCtr = {
        x: topLeftNewCanvas.x - rulerwidth + editorFullW / 2,
        y: topLeftNewCanvas.y - rulerwidth + editorFullH / 2,
        width: 0,
        height: 0,
        factor: factor
      };
      call("myZoomed", {center: !1, bbox: newCtr})

    });

  }());


// Group: Text edit functions
// Functions relating to editing text elements
  textActions = canvas.textActions = (function() {
    var curtext;
    var textinput;
    var cursor;
    var selblock;
    var blinker;
    var chardata = [];
    var textbb, transbb;
    var matrix;
    var last_x, last_y;
    var allow_dbl;

    function setCursor(index) {
      var empty = (textinput.value === '');
      $(textinput).focus();

      if (!arguments.length) {
        if (empty) {
          index = 0;
        } else {
          if (textinput.selectionEnd !== textinput.selectionStart) {return;}
          index = textinput.selectionEnd;
        }
      }

      var charbb;
      charbb = chardata[index];
      if (!charbb){
        return;
      }
      if (!empty) {
        textinput.setSelectionRange(index, index);
      }
      cursor = svgedit.utilities.getElem('text_cursor');
      if (!cursor) {
        cursor = document.createElementNS(NS.SVG, 'line');
        svgedit.utilities.assignAttributes(cursor, {
          id: 'text_cursor',
          stroke: '#333',
          'stroke-width': 1
        });
        cursor = svgedit.utilities.getElem('selectorParentGroup').appendChild(cursor);
      }

      if (!blinker) {
        blinker = setInterval(function() {
          var show = (cursor.getAttribute('display') === 'none');
          cursor.setAttribute('display', show?'inline':'none');
        }, 600);
      }

      var start_pt = ptToScreen(charbb.x, textbb.y);
      var end_pt = ptToScreen(charbb.x, (textbb.y + textbb.height));

      svgedit.utilities.assignAttributes(cursor, {
        x1: start_pt.x,
        y1: start_pt.y,
        x2: end_pt.x,
        y2: end_pt.y,
        visibility: 'visible',
        display: 'inline'
      });

      if (selblock) {
        selblock.setAttribute('d', '');
      }
    }

    function setSelection(start, end, skipInput) {
      if (start === end) {
        setCursor(end);
        return;
      }

      if (!skipInput) {
        textinput.setSelectionRange(start, end);
      }

      selblock = svgedit.utilities.getElem('text_selectblock');
      if (!selblock) {

        selblock = document.createElementNS(NS.SVG, 'path');
        svgedit.utilities.assignAttributes(selblock, {
          id: 'text_selectblock',
          fill: 'green',
          opacity: 0.5,
          style: 'pointer-events:none'
        });
        svgedit.utilities.getElem('selectorParentGroup').appendChild(selblock);
      }

      var startbb = chardata[start];
      var endbb = chardata[end];

      cursor.setAttribute('visibility', 'hidden');

      var tl = ptToScreen(startbb.x, textbb.y),
        tr = ptToScreen(startbb.x + (endbb.x - startbb.x), textbb.y),
        bl = ptToScreen(startbb.x, textbb.y + textbb.height),
        br = ptToScreen(startbb.x + (endbb.x - startbb.x), textbb.y + textbb.height);

      var dstr = 'M' + tl.x + ',' + tl.y
        + ' L' + tr.x + ',' + tr.y
        + ' ' + br.x + ',' + br.y
        + ' ' + bl.x + ',' + bl.y + 'z';

      svgedit.utilities.assignAttributes(selblock, {
        d: dstr,
        'display': 'inline'
      });
    }

    function getIndexFromPoint(mouse_x, mouse_y) {
      // Position cursor here
      var pt = svgroot.createSVGPoint();
      pt.x = mouse_x;
      pt.y = mouse_y;

      // No content, so return 0
      if (chardata.length == 1) {return 0;}
      // Determine if cursor should be on left or right of character
      var charpos = curtext.getCharNumAtPosition(pt);
      if (charpos < 0) {
        // Out of text range, look at mouse coords
        charpos = chardata.length - 2;
        if (mouse_x <= chardata[0].x) {
          charpos = 0;
        }
      } else if (charpos >= chardata.length - 2) {
        charpos = chardata.length - 2;
      }
      var charbb = chardata[charpos];
      var mid = charbb.x + (charbb.width/2);
      if (mouse_x > mid) {
        charpos++;
      }
      return charpos;
    }

    function setCursorFromPoint(mouse_x, mouse_y) {
      setCursor(getIndexFromPoint(mouse_x, mouse_y));
    }

    function setEndSelectionFromPoint(x, y, apply) {
      var i1 = textinput.selectionStart;
      var i2 = getIndexFromPoint(x, y);

      var start = Math.min(i1, i2);
      var end = Math.max(i1, i2);
      setSelection(start, end, !apply);
    }

    function screenToPt(x_in, y_in) {
      var out = {
        x: x_in,
        y: y_in
      };

      out.x /= current_zoom;
      out.y /= current_zoom;

      if (matrix) {
        var pt = svgedit.math.transformPoint(out.x, out.y, matrix.inverse());
        out.x = pt.x;
        out.y = pt.y;
      }

      return out;
    }

    function ptToScreen(x_in, y_in) {
      var out = {
        x: x_in,
        y: y_in
      };

      if (matrix) {
        var pt = svgedit.math.transformPoint(out.x, out.y, matrix);
        out.x = pt.x;
        out.y = pt.y;
      }

      out.x *= current_zoom;
      out.y *= current_zoom;

      return out;
    }

    function hideCursor() {
      if (cursor) {
        cursor.setAttribute('visibility', 'hidden');
      }
    }

    function selectAll(evt) {
      setSelection(0, curtext.textContent.length);
      $(this).unbind(evt);
    }

    function selectWord(evt) {
      if (!allow_dbl || !curtext) {return;}

      var ept = svgedit.math.transformPoint( evt.pageX, evt.pageY, root_sctm ),
        mouse_x = ept.x * current_zoom,
        mouse_y = ept.y * current_zoom;
      var pt = screenToPt(mouse_x, mouse_y);

      var index = getIndexFromPoint(pt.x, pt.y);
      var str = curtext.textContent;
      var first = str.substr(0, index).replace(/[a-z0-9]+$/i, '').length;
      var m = str.substr(index).match(/^[a-z0-9]+/i);
      var last = (m?m[0].length:0) + index;
      setSelection(first, last);

      // Set tripleclick
      $(evt.target).click(selectAll);
      setTimeout(function() {
        $(evt.target).unbind('click', selectAll);
      }, 300);

    }

    return {
      select: function(target, x, y) {
        curtext = target;
        textActions.toEditMode(x, y);
      },
      start: function(elem) {
        curtext = elem;
        textActions.toEditMode();
      },
      mouseDown: function(evt, mouse_target, start_x, start_y) {
        var pt = screenToPt(start_x, start_y);

        textinput.focus();
        setCursorFromPoint(pt.x, pt.y);
        last_x = start_x;
        last_y = start_y;

        // TODO: Find way to block native selection
      },
      mouseMove: function(mouse_x, mouse_y) {
        var pt = screenToPt(mouse_x, mouse_y);
        setEndSelectionFromPoint(pt.x, pt.y);
      },
      mouseUp: function(evt, mouse_x, mouse_y) {
        var pt = screenToPt(mouse_x, mouse_y);

        setEndSelectionFromPoint(pt.x, pt.y, true);

        // TODO: Find a way to make this work: Use transformed BBox instead of evt.target
//				if (last_x === mouse_x && last_y === mouse_y
//					&& !svgedit.math.rectsIntersect(transbb, {x: pt.x, y: pt.y, width:0, height:0})) {
//					textActions.toSelectMode(true);
//				}

        if (
          evt.target !== curtext
          &&	mouse_x < last_x + 2
          && mouse_x > last_x - 2
          &&	mouse_y < last_y + 2
          && mouse_y > last_y - 2) {

          textActions.toSelectMode(true);
        }

      },
      setCursor: setCursor,
      toEditMode: function(x, y) {
        allow_dbl = false;
        current_mode = 'textedit';
        selectorManager.requestSelector(curtext).showGrips(false);
        // Make selector group accept clicks
        var sel = selectorManager.requestSelector(curtext).selectorRect;

        textActions.init();

        $(curtext).css('cursor', 'text');

//				if (svgedit.browser.supportsEditableText()) {
//					curtext.setAttribute('editable', 'simple');
//					return;
//				}

        if (!arguments.length) {
          setCursor();
        } else {
          var pt = screenToPt(x, y);
          setCursorFromPoint(pt.x, pt.y);
        }

        setTimeout(function() {
          allow_dbl = true;
        }, 300);
      },
      toSelectMode: function(selectElem) {
        current_mode = 'select';
        clearInterval(blinker);
        blinker = null;
        if (selblock) {$(selblock).attr('display', 'none');}
        if (cursor) {$(cursor).attr('visibility', 'hidden');}
        $(curtext).css('cursor', 'move');

        if (selectElem) {
          clearSelection();
          $(curtext).css('cursor', 'move');

          call('selected', [curtext]);
          addToSelection([curtext], true);
        }
        if (curtext && !curtext.textContent.length) {
          // No content, so delete
          canvas.deleteSelectedElements();
        }

        $(textinput).blur();

        curtext = false;

//				if (svgedit.browser.supportsEditableText()) {
//					curtext.removeAttribute('editable');
//				}
      },
      setInputElem: function(elem) {
        textinput = elem;
//			$(textinput).blur(hideCursor);
      },
      clear: function() {
        if (current_mode == 'textedit') {
          textActions.toSelectMode();
        }
      },
      init: function(inputElem) {
        if (!curtext) {return;}
        var i, end;
//				if (svgedit.browser.supportsEditableText()) {
//					curtext.select();
//					return;
//				}

        if (!curtext.parentNode) {
          // Result of the ffClone, need to get correct element
          curtext = selectedElements[0];
          selectorManager.requestSelector(curtext).showGrips(false);
        }

        var str = curtext.textContent;
        var len = str.length;

        var xform = curtext.getAttribute('transform');

        textbb = svgedit.utilities.getBBox(curtext);

        matrix = xform ? svgedit.math.getMatrix(curtext) : null;

        chardata = [];
        chardata.length = len;
        textinput.focus();

        $(curtext).unbind('dblclick', selectWord).dblclick(selectWord);

        if (!len) {
          end = {x: textbb.x + (textbb.width/2), width: 0};
        }

        for (i=0; i<len; i++) {
          var start = curtext.getStartPositionOfChar(i);
          end = curtext.getEndPositionOfChar(i);

          if (!svgedit.browser.supportsGoodTextCharPos()) {
            var offset = canvas.contentW * current_zoom;
            start.x -= offset;
            end.x -= offset;

            start.x /= current_zoom;
            end.x /= current_zoom;
          }

          // Get a "bbox" equivalent for each character. Uses the
          // bbox data of the actual text for y, height purposes

          // TODO: Decide if y, width and height are actually necessary
          chardata[i] = {
            x: start.x,
            y: textbb.y, // start.y?
            width: end.x - start.x,
            height: textbb.height
          };
        }

        // Add a last bbox for cursor at end of text
        chardata.push({
          x: end.x,
          width: 0
        });
        setSelection(textinput.selectionStart, textinput.selectionEnd, true);
      }
    };
  }());

// TODO: Migrate all of this code into path.js
// Group: Path edit functions
// Functions relating to editing path elements
  pathActions = canvas.pathActions = function() {

    var subpath = false;
    var current_path;
    var newPoint, firstCtrl;

    function resetD(p) {
      p.setAttribute('d', pathActions.convertPath(p));
    }

    // TODO: Move into path.js
    svgedit.path.Path.prototype.endChanges = function(text) {
      if (svgedit.browser.isWebkit()) {resetD(this.elem);}
      var cmd = new svgedit.history.ChangeElementCommand(this.elem, {d: this.last_d}, text);
      addCommandToHistory(cmd);
      call('changed', [this.elem]);
    };

    svgedit.path.Path.prototype.addPtsToSelection = function(indexes) {
      var i, seg;
      if (!$.isArray(indexes)) {indexes = [indexes];}
      for (i = 0; i< indexes.length; i++) {
        var index = indexes[i];
        seg = this.segs[index];
        if (seg.ptgrip) {
          if (this.selected_pts.indexOf(index) == -1 && index >= 0) {
            this.selected_pts.push(index);
          }
        }
      }
      this.selected_pts.sort();
      i = this.selected_pts.length;
      var grips = [];
      grips.length = i;
      // Loop through points to be selected and highlight each
      while (i--) {
        var pt = this.selected_pts[i];
        seg = this.segs[pt];
        seg.select(true);
        grips[i] = seg.ptgrip;
      }
      // TODO: Correct this:
      pathActions.canDeleteNodes = true;

      pathActions.closed_subpath = this.subpathIsClosed(this.selected_pts[0]);

      call('selected', grips);
    };

    current_path = null;
    var drawn_path = null,
      hasMoved = false;

    // This function converts a polyline (created by the fh_path tool) into
    // a path element and coverts every three line segments into a single bezier
    // curve in an attempt to smooth out the free-hand
    var smoothPolylineIntoPath = function(element) {
      var i, points = element.points;
      var N = points.numberOfItems;
      if (N >= 4) {
        // loop through every 3 points and convert to a cubic bezier curve segment
        //
        // NOTE: this is cheating, it means that every 3 points has the potential to
        // be a corner instead of treating each point in an equal manner. In general,
        // this technique does not look that good.
        //
        // I am open to better ideas!
        //
        // Reading:
        // - http://www.efg2.com/Lab/Graphics/Jean-YvesQueinecBezierCurves.htm
        // - http://www.codeproject.com/KB/graphics/BezierSpline.aspx?msg=2956963
        // - http://www.ian-ko.com/ET_GeoWizards/UserGuide/smooth.htm
        // - http://www.cs.mtu.edu/~shene/COURSES/cs3621/NOTES/spline/Bezier/bezier-der.html
        var curpos = points.getItem(0), prevCtlPt = null;
        var d = [];
        d.push(['M', curpos.x, ',', curpos.y, ' C'].join(''));
        for (i = 1; i <= (N-4); i += 3) {
          var ct1 = points.getItem(i);
          var ct2 = points.getItem(i+1);
          var end = points.getItem(i+2);

          // if the previous segment had a control point, we want to smooth out
          // the control points on both sides
          if (prevCtlPt) {
            var newpts = svgedit.path.smoothControlPoints( prevCtlPt, ct1, curpos );
            if (newpts && newpts.length == 2) {
              var prevArr = d[d.length-1].split(',');
              prevArr[2] = newpts[0].x;
              prevArr[3] = newpts[0].y;
              d[d.length-1] = prevArr.join(',');
              ct1 = newpts[1];
            }
          }

          d.push([ct1.x, ct1.y, ct2.x, ct2.y, end.x, end.y].join(','));

          curpos = end;
          prevCtlPt = ct2;
        }
        // handle remaining line segments
        d.push('L');
        while (i < N) {
          var pt = points.getItem(i);
          d.push([pt.x, pt.y].join(','));
          i++;
        }
        d = d.join(' ');

        // create new path element
        element = addSvgElementFromJson({
          element: 'path',
          curStyles: true,
          attr: {
            id: getId(),
            d: d,
            fill: 'none'
          }
        });
        // No need to call "changed", as this is already done under mouseUp
      }
      return element;
    };

    return {
      mouseDown: function(evt, mouse_target, start_x, start_y) {
        var id;
        if (current_mode === 'path') {
          mouse_x = start_x;
          mouse_y = start_y;

          var x = mouse_x/current_zoom,
            y = mouse_y/current_zoom,
            stretchy = svgedit.utilities.getElem('path_stretch_line');
          newPoint = [x, y];

          if (curConfig.gridSnapping){
            x = svgedit.utilities.snapToGrid(x);
            y = svgedit.utilities.snapToGrid(y);
            mouse_x = svgedit.utilities.snapToGrid(mouse_x);
            mouse_y = svgedit.utilities.snapToGrid(mouse_y);
          }

          if (!stretchy) {
            stretchy = document.createElementNS(NS.SVG, 'path');
            svgedit.utilities.assignAttributes(stretchy, {
              id: 'path_stretch_line',
              stroke: '#22C',
              'stroke-width': '0.5',
              fill: 'none'
            });
            stretchy = svgedit.utilities.getElem('selectorParentGroup').appendChild(stretchy);
          }
          stretchy.setAttribute('display', 'inline');

          var keep = null;
          var index;
          // if pts array is empty, create path element with M at current point
          if (!drawn_path) {
            d_attr = 'M' + x + ',' + y + ' ';
            drawn_path = addSvgElementFromJson({
              element: 'path',
              curStyles: true,
              attr: {
                d: d_attr,
                id: getNextId(),
                opacity: cur_shape.opacity / 2
              }
            });
            // set stretchy line to first point
            stretchy.setAttribute('d', ['M', mouse_x, mouse_y, mouse_x, mouse_y].join(' '));
            index = subpath ? svgedit.path.path.segs.length : 0;
            svgedit.path.addPointGrip(index, mouse_x, mouse_y);
          } else {
            // determine if we clicked on an existing point
            var seglist = drawn_path.pathSegList;
            var i = seglist.numberOfItems;
            var FUZZ = 6/current_zoom;
            var clickOnPoint = false;
            while (i) {
              i --;
              var item = seglist.getItem(i);
              var px = item.x, py = item.y;
              // found a matching point
              if ( x >= (px-FUZZ) && x <= (px+FUZZ) && y >= (py-FUZZ) && y <= (py+FUZZ) ) {
                clickOnPoint = true;
                break;
              }
            }

            // get path element that we are in the process of creating
            id = getId();

            // Remove previous path object if previously created
            svgedit.path.removePath_(id);

            var newpath = svgedit.utilities.getElem(id);
            var newseg;
            var s_seg;
            var len = seglist.numberOfItems;
            // if we clicked on an existing point, then we are done this path, commit it
            // (i, i+1) are the x,y that were clicked on
            if (clickOnPoint) {
              // if clicked on any other point but the first OR
              // the first point was clicked on and there are less than 3 points
              // then leave the path open
              // otherwise, close the path
              if (i <= 1 && len >= 2) {
                // Create end segment
                var abs_x = seglist.getItem(0).x;
                var abs_y = seglist.getItem(0).y;


                s_seg = stretchy.pathSegList.getItem(1);
                if (s_seg.pathSegType === 4) {
                  newseg = drawn_path.createSVGPathSegLinetoAbs(abs_x, abs_y);
                } else {
                  newseg = drawn_path.createSVGPathSegCurvetoCubicAbs(
                    abs_x,
                    abs_y,
                    s_seg.x1 / current_zoom,
                    s_seg.y1 / current_zoom,
                    abs_x,
                    abs_y
                  );
                }

                var endseg = drawn_path.createSVGPathSegClosePath();
                seglist.appendItem(newseg);
                seglist.appendItem(endseg);
              } else if (len < 3) {
                keep = false;
                return keep;
              }
              $(stretchy).remove();

              // This will signal to commit the path
              element = newpath;
              drawn_path = null;
              started = false;

              if (subpath) {
                if (svgedit.path.path.matrix) {
                  svgedit.coords.remapElement(newpath, {}, svgedit.path.path.matrix.inverse());
                }

                var new_d = newpath.getAttribute('d');
                var orig_d = $(svgedit.path.path.elem).attr('d');
                $(svgedit.path.path.elem).attr('d', orig_d + new_d);
                $(newpath).remove();
                if (svgedit.path.path.matrix) {
                  svgedit.path.recalcRotatedPath();
                }
                svgedit.path.path.init();
                pathActions.toEditMode(svgedit.path.path.elem);
                svgedit.path.path.selectPt();
                return false;
              }
            }
            // else, create a new point, update path element
            else {
              // Checks if current target or parents are #svgcontent
              if (!$.contains(container, getMouseTarget(evt))) {
                // Clicked outside canvas, so don't make point
                console.log('Clicked outside canvas');
                return false;
              }

              var num = drawn_path.pathSegList.numberOfItems;
              var last = drawn_path.pathSegList.getItem(num -1);
              var lastx = last.x, lasty = last.y;

              if (evt.shiftKey) {
                var xya = svgedit.math.snapToAngle(lastx, lasty, x, y);
                x = xya.x;
                y = xya.y;
              }

              // Use the segment defined by stretchy
              s_seg = stretchy.pathSegList.getItem(1);
              if (s_seg.pathSegType === 4) {
                newseg = drawn_path.createSVGPathSegLinetoAbs(round(x), round(y));
              } else {
                newseg = drawn_path.createSVGPathSegCurvetoCubicAbs(
                  round(x),
                  round(y),
                  s_seg.x1 / current_zoom,
                  s_seg.y1 / current_zoom,
                  s_seg.x2 / current_zoom,
                  s_seg.y2 / current_zoom
                );
              }

              drawn_path.pathSegList.appendItem(newseg);

              x *= current_zoom;
              y *= current_zoom;

              // set stretchy line to latest point
              stretchy.setAttribute('d', ['M', x, y, x, y].join(' '));
              index = num;
              if (subpath) {index += svgedit.path.path.segs.length;}
              svgedit.path.addPointGrip(index, x, y);
            }
//					keep = true;
          }

          return;
        }

        // TODO: Make sure current_path isn't null at this point
        if (!svgedit.path.path) {return;}

        svgedit.path.path.storeD();

        id = evt.target.id;
        var cur_pt;
        if (id.substr(0,14) == 'pathpointgrip_') {
          // Select this point
          cur_pt = svgedit.path.path.cur_pt = parseInt(id.substr(14));
          svgedit.path.path.dragging = [start_x, start_y];
          var seg = svgedit.path.path.segs[cur_pt];

          // only clear selection if shift is not pressed (otherwise, add
          // node to selection)
          if (!evt.shiftKey) {
            if (svgedit.path.path.selected_pts.length <= 1 || !seg.selected) {
              svgedit.path.path.clearSelection();
            }
            svgedit.path.path.addPtsToSelection(cur_pt);
          } else if (seg.selected) {
            svgedit.path.path.removePtFromSelection(cur_pt);
          } else {
            svgedit.path.path.addPtsToSelection(cur_pt);
          }
        } else if (id.indexOf('ctrlpointgrip_') == 0) {
          svgedit.path.path.dragging = [start_x, start_y];

          var parts = id.split('_')[1].split('c');
          cur_pt = Number(parts[0]);
          var ctrl_num = Number(parts[1]);
          svgedit.path.path.selectPt(cur_pt, ctrl_num);
        }

        // Start selection box
        if (!svgedit.path.path.dragging) {
          if (rubberBox == null) {
            rubberBox = selectorManager.getRubberBandBox();
          }
          svgedit.utilities.assignAttributes(rubberBox, {
            'x': start_x * current_zoom,
            'y': start_y * current_zoom,
            'width': 0,
            'height': 0,
            'display': 'inline'
          }, 100);
        }
      },
      mouseMove: function(mouse_x, mouse_y) {
        hasMoved = true;
        if (current_mode === 'path') {
          if (!drawn_path) {return;}
          var seglist = drawn_path.pathSegList;
          var index = seglist.numberOfItems - 1;

          if (newPoint) {
            // First point
//					if (!index) {return;}

            // Set control points
            var pointGrip1 = svgedit.path.addCtrlGrip('1c1');
            var pointGrip2 = svgedit.path.addCtrlGrip('0c2');

            // dragging pointGrip1
            pointGrip1.setAttribute('cx', mouse_x);
            pointGrip1.setAttribute('cy', mouse_y);
            pointGrip1.setAttribute('display', 'inline');

            var pt_x = newPoint[0];
            var pt_y = newPoint[1];

            // set curve
            var seg = seglist.getItem(index);
            var cur_x = mouse_x / current_zoom;
            var cur_y = mouse_y / current_zoom;
            var alt_x = (pt_x + (pt_x - cur_x));
            var alt_y = (pt_y + (pt_y - cur_y));

            pointGrip2.setAttribute('cx', alt_x * current_zoom);
            pointGrip2.setAttribute('cy', alt_y * current_zoom);
            pointGrip2.setAttribute('display', 'inline');

            var ctrlLine = svgedit.path.getCtrlLine(1);
            svgedit.utilities.assignAttributes(ctrlLine, {
              x1: mouse_x,
              y1: mouse_y,
              x2: alt_x * current_zoom,
              y2: alt_y * current_zoom,
              display: 'inline'
            });

            if (index === 0) {
              firstCtrl = [mouse_x, mouse_y];
            } else {
              var last = seglist.getItem(index - 1);
              var last_x = last.x;
              var last_y = last.y;

              if (last.pathSegType === 6) {
                last_x += (last_x - last.x2);
                last_y += (last_y - last.y2);
              } else if (firstCtrl) {
                last_x = firstCtrl[0]/current_zoom;
                last_y = firstCtrl[1]/current_zoom;
              }
              svgedit.path.replacePathSeg(6, index, [pt_x, pt_y, last_x, last_y, alt_x, alt_y], drawn_path);
            }
          } else {
            var stretchy = svgedit.utilities.getElem('path_stretch_line');
            if (stretchy) {
              var prev = seglist.getItem(index);
              if (prev.pathSegType === 6) {
                var prev_x = prev.x + (prev.x - prev.x2);
                var prev_y = prev.y + (prev.y - prev.y2);
                svgedit.path.replacePathSeg(6, 1, [mouse_x, mouse_y, prev_x * current_zoom, prev_y * current_zoom, mouse_x, mouse_y], stretchy);
              } else if (firstCtrl) {
                svgedit.path.replacePathSeg(6, 1, [mouse_x, mouse_y, firstCtrl[0], firstCtrl[1], mouse_x, mouse_y], stretchy);
              } else {
                svgedit.path.replacePathSeg(4, 1, [mouse_x, mouse_y], stretchy);
              }
            }
          }
          return;
        }
        // if we are dragging a point, let's move it
        if (svgedit.path.path.dragging) {
          var pt = svgedit.path.getPointFromGrip({
            x: svgedit.path.path.dragging[0],
            y: svgedit.path.path.dragging[1]
          }, svgedit.path.path);
          var mpt = svgedit.path.getPointFromGrip({
            x: mouse_x,
            y: mouse_y
          }, svgedit.path.path);
          var diff_x = mpt.x - pt.x;
          var diff_y = mpt.y - pt.y;
          svgedit.path.path.dragging = [mouse_x, mouse_y];

          if (svgedit.path.path.dragctrl) {
            svgedit.path.path.moveCtrl(diff_x, diff_y);
          } else {
            svgedit.path.path.movePts(diff_x, diff_y);
          }
        } else {
          svgedit.path.path.selected_pts = [];
          svgedit.path.path.eachSeg(function(i) {
            var seg = this;
            if (!seg.next && !seg.prev) {return;}

            var item = seg.item;
            var rbb = rubberBox.getBBox();

            var pt = svgedit.path.getGripPt(seg);
            var pt_bb = {
              x: pt.x,
              y: pt.y,
              width: 0,
              height: 0
            };

            var sel = svgedit.math.rectsIntersect(rbb, pt_bb);

            this.select(sel);
            //Note that addPtsToSelection is not being run
            if (sel) {svgedit.path.path.selected_pts.push(seg.index);}
          });

        }
      },
      mouseUp: function(evt, element, mouse_x, mouse_y) {

        // Create mode
        if (current_mode === 'path') {
          newPoint = null;
          if (!drawn_path) {
            element = svgedit.utilities.getElem(getId());
            started = false;
            firstCtrl = null;
          }

          return {
            keep: true,
            element: element
          };
        }

        // Edit mode

        if (svgedit.path.path.dragging) {
          var last_pt = svgedit.path.path.cur_pt;

          svgedit.path.path.dragging = false;
          svgedit.path.path.dragctrl = false;
          svgedit.path.path.update();

          if (hasMoved) {
            svgedit.path.path.endChanges('Move path point(s)');
          }

          if (!evt.shiftKey && !hasMoved) {
            svgedit.path.path.selectPt(last_pt);
          }
        } else if (rubberBox && rubberBox.getAttribute('display') != 'none') {
          // Done with multi-node-select
          rubberBox.setAttribute('display', 'none');

          if (rubberBox.getAttribute('width') <= 2 && rubberBox.getAttribute('height') <= 2) {
            pathActions.toSelectMode(evt.target);
          }

          // else, move back to select mode
        } else {
          pathActions.toSelectMode(evt.target);
        }
        hasMoved = false;
      },
      toEditMode: function(element) {
        svgedit.path.path = svgedit.path.getPath_(element);
        current_mode = 'pathedit';
        clearSelection();
        svgedit.path.path.show(true).update();
        svgedit.path.path.oldbbox = svgedit.utilities.getBBox(svgedit.path.path.elem);
        subpath = false;
      },
      toSelectMode: function(elem) {
        var selPath = (elem == svgedit.path.path.elem);
        current_mode = 'select';
        svgedit.path.path.show(false);
        current_path = false;
        clearSelection();

        if (svgedit.path.path.matrix) {
          // Rotated, so may need to re-calculate the center
          svgedit.path.recalcRotatedPath();
        }

        if (selPath) {
          call('selected', [elem]);
          addToSelection([elem], true);
        }
      },
      addSubPath: function(on) {
        if (on) {
          // Internally we go into "path" mode, but in the UI it will
          // still appear as if in "pathedit" mode.
          current_mode = 'path';
          subpath = true;
        } else {
          pathActions.clear(true);
          pathActions.toEditMode(svgedit.path.path.elem);
        }
      },
      select: function(target) {
        if (current_path === target) {
          pathActions.toEditMode(target);
          current_mode = 'pathedit';
        } // going into pathedit mode
        else {
          current_path = target;
        }
      },
      reorient: function() {
        var elem = selectedElements[0];
        if (!elem) {return;}
        var angle = svgedit.utilities.getRotationAngle(elem);
        if (angle == 0) {return;}

        var batchCmd = new svgedit.history.BatchCommand('Reorient path');
        var changes = {
          d: elem.getAttribute('d'),
          transform: elem.getAttribute('transform')
        };
        batchCmd.addSubCommand(new svgedit.history.ChangeElementCommand(elem, changes));
        clearSelection();
        this.resetOrientation(elem);

        addCommandToHistory(batchCmd);

        // Set matrix to null
        svgedit.path.getPath_(elem).show(false).matrix = null;

        this.clear();

        addToSelection([elem], true);
        call('changed', selectedElements);
      },

      clear: function(remove) {
        current_path = null;
        if (drawn_path) {
          var elem = svgedit.utilities.getElem(getId());
          $(svgedit.utilities.getElem('path_stretch_line')).remove();
          $(elem).remove();
          $(svgedit.utilities.getElem('pathpointgrip_container')).find('*').attr('display', 'none');
          drawn_path = firstCtrl = null;
          started = false;
        } else if (current_mode == 'pathedit') {
          this.toSelectMode();
        }
        if (svgedit.path.path) {svgedit.path.path.init().show(false);}
      },
      resetOrientation: function(path) {
        if (path == null || path.nodeName != 'path') {return false;}
        var tlist = svgedit.transformlist.getTransformList(path);
        var m = svgedit.math.transformListToTransform(tlist).matrix;
        tlist.clear();
        path.removeAttribute('transform');
        var segList = path.pathSegList;

        // Opera/win/non-EN throws an error here.
        // TODO: Find out why!
        // Presumed fixed in Opera 10.5, so commented out for now

//			try {
        var len = segList.numberOfItems;
//			} catch(err) {
//				var fixed_d = pathActions.convertPath(path);
//				path.setAttribute('d', fixed_d);
//				segList = path.pathSegList;
//				var len = segList.numberOfItems;
//			}
        var i, last_x, last_y;

        for (i = 0; i < len; ++i) {
          var seg = segList.getItem(i);
          var type = seg.pathSegType;
          if (type == 1) {continue;}
          var pts = [];
          $.each(['',1,2], function(j, n) {
            var x = seg['x'+n], y = seg['y'+n];
            if (x !== undefined && y !== undefined) {
              var pt = svgedit.math.transformPoint(x, y, m);
              pts.splice(pts.length, 0, pt.x, pt.y);
            }
          });
          svgedit.path.replacePathSeg(type, i, pts, path);
        }

        reorientGrads(path, m);
      },
      zoomChange: function() {
        if (current_mode == 'pathedit') {
          svgedit.path.path.update();
        }
      },
      getNodePoint: function() {
        var sel_pt = svgedit.path.path.selected_pts.length ? svgedit.path.path.selected_pts[0] : 1;

        var seg = svgedit.path.path.segs[sel_pt];
        return {
          x: seg.item.x,
          y: seg.item.y,
          type: seg.type
        };
      },
      linkControlPoints: function(linkPoints) {
        svgedit.path.setLinkControlPoints(linkPoints);
      },
      clonePathNode: function() {
        svgedit.path.path.storeD();

        var sel_pts = svgedit.path.path.selected_pts;
        var segs = svgedit.path.path.segs;

        var i = sel_pts.length;
        var nums = [];

        while (i--) {
          var pt = sel_pts[i];
          svgedit.path.path.addSeg(pt);

          nums.push(pt + i);
          nums.push(pt + i + 1);
        }
        svgedit.path.path.init().addPtsToSelection(nums);

        svgedit.path.path.endChanges('Clone path node(s)');
      },
      opencloseSubPath: function() {
        var sel_pts = svgedit.path.path.selected_pts;
        // Only allow one selected node for now
        if (sel_pts.length !== 1) {return;}

        var elem = svgedit.path.path.elem;
        var list = elem.pathSegList;

        var len = list.numberOfItems;

        var index = sel_pts[0];

        var open_pt = null;
        var start_item = null;

        // Check if subpath is already open
        svgedit.path.path.eachSeg(function(i) {
          if (this.type === 2 && i <= index) {
            start_item = this.item;
          }
          if (i <= index) {return true;}
          if (this.type === 2) {
            // Found M first, so open
            open_pt = i;
            return false;
          }
          if (this.type === 1) {
            // Found Z first, so closed
            open_pt = false;
            return false;
          }
        });

        if (open_pt == null) {
          // Single path, so close last seg
          open_pt = svgedit.path.path.segs.length - 1;
        }

        if (open_pt !== false) {
          // Close this path

          // Create a line going to the previous "M"
          var newseg = elem.createSVGPathSegLinetoAbs(start_item.x, start_item.y);

          var closer = elem.createSVGPathSegClosePath();
          if (open_pt == svgedit.path.path.segs.length - 1) {
            list.appendItem(newseg);
            list.appendItem(closer);
          } else {
            svgedit.path.insertItemBefore(elem, closer, open_pt);
            svgedit.path.insertItemBefore(elem, newseg, open_pt);
          }

          svgedit.path.path.init().selectPt(open_pt+1);
          return;
        }

        // M 1,1 L 2,2 L 3,3 L 1,1 z // open at 2,2
        // M 2,2 L 3,3 L 1,1

        // M 1,1 L 2,2 L 1,1 z M 4,4 L 5,5 L6,6 L 5,5 z
        // M 1,1 L 2,2 L 1,1 z [M 4,4] L 5,5 L(M)6,6 L 5,5 z

        var seg = svgedit.path.path.segs[index];

        if (seg.mate) {
          list.removeItem(index); // Removes last "L"
          list.removeItem(index); // Removes the "Z"
          svgedit.path.path.init().selectPt(index - 1);
          return;
        }

        var i, last_m, z_seg;

        // Find this sub-path's closing point and remove
        for (i = 0; i<list.numberOfItems; i++) {
          var item = list.getItem(i);

          if (item.pathSegType === 2) {
            // Find the preceding M
            last_m = i;
          } else if (i === index) {
            // Remove it
            list.removeItem(last_m);
//						index--;
          } else if (item.pathSegType === 1 && index < i) {
            // Remove the closing seg of this subpath
            z_seg = i-1;
            list.removeItem(i);
            break;
          }
        }

        var num = (index - last_m) - 1;

        while (num--) {
          svgedit.path.insertItemBefore(elem, list.getItem(last_m), z_seg);
        }

        var pt = list.getItem(last_m);

        // Make this point the new "M"
        svgedit.path.replacePathSeg(2, last_m, [pt.x, pt.y]);

        i = index; // i is local here, so has no effect; what is the reason for this?

        svgedit.path.path.init().selectPt(0);
      },
      deletePathNode: function() {
        if (!pathActions.canDeleteNodes) {return;}
        svgedit.path.path.storeD();

        var sel_pts = svgedit.path.path.selected_pts;
        var i = sel_pts.length;

        while (i--) {
          var pt = sel_pts[i];
          svgedit.path.path.deleteSeg(pt);
        }

        // Cleanup
        var cleanup = function() {
          var segList = svgedit.path.path.elem.pathSegList;
          var len = segList.numberOfItems;

          var remItems = function(pos, count) {
            while (count--) {
              segList.removeItem(pos);
            }
          };

          if (len <= 1) {return true;}

          while (len--) {
            var item = segList.getItem(len);
            if (item.pathSegType === 1) {
              var prev = segList.getItem(len-1);
              var nprev = segList.getItem(len-2);
              if (prev.pathSegType === 2) {
                remItems(len-1, 2);
                cleanup();
                break;
              } else if (nprev.pathSegType === 2) {
                remItems(len-2, 3);
                cleanup();
                break;
              }

            } else if (item.pathSegType === 2) {
              if (len > 0) {
                var prev_type = segList.getItem(len-1).pathSegType;
                // Path has M M
                if (prev_type === 2) {
                  remItems(len-1, 1);
                  cleanup();
                  break;
                  // Entire path ends with Z M
                } else if (prev_type === 1 && segList.numberOfItems-1 === len) {
                  remItems(len, 1);
                  cleanup();
                  break;
                }
              }
            }
          }
          return false;
        };

        cleanup();

        // Completely delete a path with 1 or 0 segments
        if (svgedit.path.path.elem.pathSegList.numberOfItems <= 1) {
          pathActions.toSelectMode(svgedit.path.path.elem);
          canvas.deleteSelectedElements();
          return;
        }

        svgedit.path.path.init();
        svgedit.path.path.clearSelection();

        // TODO: Find right way to select point now
        // path.selectPt(sel_pt);
        if (window.opera) { // Opera repaints incorrectly
          var cp = $(svgedit.path.path.elem);
          cp.attr('d', cp.attr('d'));
        }
        svgedit.path.path.endChanges('Delete path node(s)');
      },
      smoothPolylineIntoPath: smoothPolylineIntoPath,
      setSegType: function(v) {
        svgedit.path.path.setSegType(v);
      },
      moveNode: function(attr, newValue) {
        var sel_pts = svgedit.path.path.selected_pts;
        if (!sel_pts.length) {return;}

        svgedit.path.path.storeD();

        // Get first selected point
        var seg = svgedit.path.path.segs[sel_pts[0]];
        var diff = {x:0, y:0};
        diff[attr] = newValue - seg.item[attr];

        seg.move(diff.x, diff.y);
        svgedit.path.path.endChanges('Move path point');
      },
      fixEnd: function(elem) {
        // Adds an extra segment if the last seg before a Z doesn't end
        // at its M point
        // M0,0 L0,100 L100,100 z
        var segList = elem.pathSegList;
        var len = segList.numberOfItems;
        var i, last_m;
        for (i = 0; i < len; ++i) {
          var item = segList.getItem(i);
          if (item.pathSegType === 2) {
            last_m = item;
          }

          if (item.pathSegType === 1) {
            var prev = segList.getItem(i-1);
            if (prev.x != last_m.x || prev.y != last_m.y) {
              // Add an L segment here
              var newseg = elem.createSVGPathSegLinetoAbs(last_m.x, last_m.y);
              svgedit.path.insertItemBefore(elem, newseg, i);
              // Can this be done better?
              pathActions.fixEnd(elem);
              break;
            }

          }
        }
        if (svgedit.browser.isWebkit()) {resetD(elem);}
      },
      // Convert a path to one with only absolute or relative values
      convertPath: svgedit.utilities.convertPath
    };
  }();
// end pathActions

// Group: Serialization

// Function: removeUnusedDefElems
// Looks at DOM elements inside the <defs> to see if they are referred to,
// removes them from the DOM if they are not.
//
// Returns:
// The amount of elements that were removed
  var removeUnusedDefElems = this.removeUnusedDefElems = function() {
    var defs = svgcontent.getElementsByTagNameNS(NS.SVG, 'defs');
    if (!defs || !defs.length) {return 0;}

//	if (!defs.firstChild) {return;}

    var defelem_uses = [],
      numRemoved = 0;
    var attrs = ['fill', 'stroke', 'filter', 'marker-start', 'marker-mid', 'marker-end'];
    var alen = attrs.length;

    var all_els = svgcontent.getElementsByTagNameNS(NS.SVG, '*');
    var all_len = all_els.length;

    var i, j;
    for (i = 0; i < all_len; i++) {
      var el = all_els[i];
      for (j = 0; j < alen; j++) {
        var ref = svgedit.utilities.getUrlFromAttr(el.getAttribute(attrs[j]));
        if (ref) {
          defelem_uses.push(ref.substr(1));
        }
      }

      // gradients can refer to other gradients
      var href = getHref(el);
      if (href && href.indexOf('#') === 0) {
        defelem_uses.push(href.substr(1));
      }
    }

    var defelems = $(defs).find('linearGradient, radialGradient, filter, marker, svg, symbol');
    i = defelems.length;
    while (i--) {
      var defelem = defelems[i];
      var id = defelem.id;
      if (defelem_uses.indexOf(id) < 0) {
        // Not found, so remove (but remember)
        removedElements[id] = defelem;
        defelem.parentNode.removeChild(defelem);
        numRemoved++;
      }
    }

    return numRemoved;
  };

// Function: svgCanvasToString
// Main function to set up the SVG content for output
//
// Returns:
// String containing the SVG image for output
  this.svgCanvasToString = function() {
    // keep calling it until there are none to remove
    while (removeUnusedDefElems() > 0) {}

    pathActions.clear(true);

    // Keep SVG-Edit comment on top
    $.each(svgcontent.childNodes, function(i, node) {
      if (i && node.nodeType === 8 && node.data.indexOf('Created with') >= 0) {
        svgcontent.insertBefore(node, svgcontent.firstChild);
      }
    });

    // Move out of in-group editing mode
    if (current_group) {
      leaveContext();
      selectOnly([current_group]);
    }

    var naked_svgs = [];

    // Unwrap gsvg if it has no special attributes (only id and style)
    $(svgcontent).find('g:data(gsvg)').each(function() {
      var attrs = this.attributes;
      var len = attrs.length;
      var i;
      for (i = 0; i < len; i++) {
        if (attrs[i].nodeName == 'id' || attrs[i].nodeName == 'style') {
          len--;
        }
      }
      // No significant attributes, so ungroup
      if (len <= 0) {
        var svg = this.firstChild;
        naked_svgs.push(svg);
        $(this).replaceWith(svg);
      }
    });
    var output = this.svgToString(svgcontent, 0);

    // Rewrap gsvg
    if (naked_svgs.length) {
      $(naked_svgs).each(function() {
        groupSvgElem(this);
      });
    }

    return output;
  };

// Function: svgToString
// Sub function ran on each SVG element to convert it to a string as desired
//
// Parameters:
// elem - The SVG element to convert
// indent - Integer with the amount of spaces to indent this tag
//
// Returns:
// String with the given element as an SVG tag
  this.svgToString = function(elem, indent) {
    var out = [],
      toXml = svgedit.utilities.toXml;
    var unit = curConfig.baseUnit;
    var unit_re = new RegExp('^-?[\\d\\.]+' + unit + '$');

    if (elem) {
      cleanupElement(elem);
      var attrs = elem.attributes,
        attr,
        i,
        childs = elem.childNodes;

      for (i = 0; i < indent; i++) {out.push(' ');}
      out.push('<'); out.push(elem.nodeName);
      if (elem.id === 'svgcontent') {
        // Process root element separately
        var res = getResolution();

        var vb = '';
        // TODO: Allow this by dividing all values by current baseVal
        // Note that this also means we should properly deal with this on import
//			if (curConfig.baseUnit !== 'px') {
//				var unit = curConfig.baseUnit;
//				var unit_m = svgedit.units.getTypeMap()[unit];
//				res.w = svgedit.units.shortFloat(res.w / unit_m)
//				res.h = svgedit.units.shortFloat(res.h / unit_m)
//				vb = ' viewBox="' + [0, 0, res.w, res.h].join(' ') + '"';
//				res.w += unit;
//				res.h += unit;
//			}

        if (unit !== 'px') {
          res.w = svgedit.units.convertUnit(res.w, unit) + unit;
          res.h = svgedit.units.convertUnit(res.h, unit) + unit;
        }

        out.push(' width="' + res.w + '" height="' + res.h + '"' + vb + ' xmlns="'+NS.SVG+'"');

        var nsuris = {};

        // Check elements for namespaces, add if found
        $(elem).find('*').andSelf().each(function() {
          var el = this;
          // for some elements have no attribute
          var uri = this.namespaceURI;
          if (uri && !nsuris[uri] && nsMap[uri] && nsMap[uri] !== 'xmlns' && nsMap[uri] !== 'xml' ) {
            nsuris[uri] = true;
            out.push(' xmlns:' + nsMap[uri] + '="' + uri +'"');
          }

          $.each(this.attributes, function(i, attr) {
            var uri = attr.namespaceURI;
            if (uri && !nsuris[uri] && nsMap[uri] !== 'xmlns' && nsMap[uri] !== 'xml' ) {
              nsuris[uri] = true;
              out.push(' xmlns:' + nsMap[uri] + '="' + uri +'"');
            }
          });
        });

        i = attrs.length;
        var attr_names = ['width', 'height', 'xmlns', 'x', 'y', 'viewBox', 'id', 'overflow'];
        while (i--) {
          attr = attrs.item(i);
          var attrVal = toXml(attr.value);

          // Namespaces have already been dealt with, so skip
          if (attr.nodeName.indexOf('xmlns:') === 0) {continue;}

          // only serialize attributes we don't use internally
          if (attrVal != '' && attr_names.indexOf(attr.localName) == -1) {

            if (!attr.namespaceURI || nsMap[attr.namespaceURI]) {
              out.push(' ');
              out.push(attr.nodeName); out.push('="');
              out.push(attrVal); out.push('"');
            }
          }
        }
      } else {
        // Skip empty defs
        if (elem.nodeName === 'defs' && !elem.firstChild) {return;}

        var moz_attrs = ['-moz-math-font-style', '_moz-math-font-style'];
        for (i = attrs.length - 1; i >= 0; i--) {
          attr = attrs.item(i);
          var attrVal = toXml(attr.value);
          //remove bogus attributes added by Gecko
          if (moz_attrs.indexOf(attr.localName) >= 0) {continue;}
          if (attrVal != '') {
            if (attrVal.indexOf('pointer-events') === 0) {continue;}
            if (attr.localName === 'class' && attrVal.indexOf('se_') === 0) {continue;}
            out.push(' ');
            if (attr.localName === 'd') {attrVal = pathActions.convertPath(elem, true);}
            if (!isNaN(attrVal)) {
              attrVal = svgedit.units.shortFloat(attrVal);
            } else if (unit_re.test(attrVal)) {
              attrVal = svgedit.units.shortFloat(attrVal) + unit;
            }

            // Embed images when saving
            if (save_options.apply
              && elem.nodeName === 'image'
              && attr.localName === 'href'
              && save_options.images
              && save_options.images === 'embed')
            {
              var img = encodableImages[attrVal];
              if (img) {attrVal = img;}
            }

            // map various namespaces to our fixed namespace prefixes
            // (the default xmlns attribute itself does not get a prefix)
            if (!attr.namespaceURI || attr.namespaceURI == NS.SVG || nsMap[attr.namespaceURI]) {
              out.push(attr.nodeName); out.push('="');
              out.push(attrVal); out.push('"');
            }
          }
        }
      }

      if (elem.hasChildNodes()) {
        out.push('>');
        indent++;
        var bOneLine = false;

        for (i = 0; i < childs.length; i++) {
          var child = childs.item(i);
          switch(child.nodeType) {
            case 1: // element node
              out.push('\n');
              out.push(this.svgToString(childs.item(i), indent));
              break;
            case 3: // text node
              var str = child.nodeValue.replace(/^\s+|\s+$/g, '');
              if (str != '') {
                bOneLine = true;
                out.push(String(toXml(str)));
              }
              break;
            case 4: // cdata node
              out.push('\n');
              out.push(new Array(indent+1).join(' '));
              out.push('<![CDATA[');
              out.push(child.nodeValue);
              out.push(']]>');
              break;
            case 8: // comment
              out.push('\n');
              out.push(new Array(indent+1).join(' '));
              out.push('<!--');
              out.push(child.data);
              out.push('-->');
              break;
          } // switch on node type
        }
        indent--;
        if (!bOneLine) {
          out.push('\n');
          for (i = 0; i < indent; i++) {out.push(' ');}
        }
        out.push('</'); out.push(elem.nodeName); out.push('>');
      } else {
        out.push('/>');
      }
    }
    return out.join('');
  }; // end svgToString()

// Function: embedImage
// Converts a given image file to a data URL when possible, then runs a given callback
//
// Parameters:
// val - String with the path/URL of the image
// callback - Optional function to run when image data is found, supplies the
// result (data URL or false) as first parameter.
  this.embedImage = function(val, callback) {
    // load in the image and once it's loaded, get the dimensions
    $(new Image()).load(function() {
      // create a canvas the same size as the raster image
      var canvas = document.createElement('canvas');
      canvas.width = this.width;
      canvas.height = this.height;
      // load the raster image into the canvas
      canvas.getContext('2d').drawImage(this, 0, 0);
      // retrieve the data: URL
      try {
        var urldata = ';svgedit_url=' + encodeURIComponent(val);
        urldata = canvas.toDataURL().replace(';base64', urldata+';base64');
        encodableImages[val] = urldata;
      } catch(e) {
        encodableImages[val] = false;
      }
      last_good_img_url = val;
      if (callback) {callback(encodableImages[val]);}
    }).attr('src', val);
  };

// Function: setGoodImage
// Sets a given URL to be a "last good image" URL
  this.setGoodImage = function(val) {
    last_good_img_url = val;
  };

  this.open = function() {
    // Nothing by default, handled by optional widget/extension
  };

// Function: save
// Serializes the current drawing into SVG XML text and returns it to the 'saved' handler.
// This function also includes the XML prolog. Clients of the SvgCanvas bind their save
// function to the 'saved' event.
//
// Returns:
// Nothing
  this.save = function(opts) {
    // remove the selected outline before serializing
    clearSelection();
    // Update save options if provided
    if (opts) {$.extend(save_options, opts);}
    save_options.apply = true;

    // no need for doctype, see http://jwatt.org/svg/authoring/#doctype-declaration
    var str = this.svgCanvasToString();
    call('saved', str);
  };

  function getIssues () {
    // remove the selected outline before serializing
    clearSelection();

    // Check for known CanVG issues
    var issues = [];

    // Selector and notice
    var issue_list = {
      'feGaussianBlur': uiStrings.exportNoBlur,
      'foreignObject': uiStrings.exportNoforeignObject,
      '[stroke-dasharray]': uiStrings.exportNoDashArray
    };
    var content = $(svgcontent);

    // Add font/text check if Canvas Text API is not implemented
    if (!('font' in $('<canvas>')[0].getContext('2d'))) {
      issue_list.text = uiStrings.exportNoText;
    }

    $.each(issue_list, function(sel, descr) {
      if (content.find(sel).length) {
        issues.push(descr);
      }
    });
    return issues;
  }

// Function: rasterExport
// Generates a Data URL based on the current image, then calls "exported"
// with an object including the string, image information, and any issues found
  this.rasterExport = function(imgType, quality, exportWindowName) {
    var mimeType = 'image/' + imgType.toLowerCase();
    var issues = getIssues();
    var str = this.svgCanvasToString();

    svgedit.utilities.buildCanvgCallback(function () {
      var type = imgType || 'PNG';
      if (!$('#export_canvas').length) {
        $('<canvas>', {id: 'export_canvas'}).hide().appendTo('body');
      }
      var c = $('#export_canvas')[0];
      c.width = svgCanvas.contentW;
      c.height = svgCanvas.contentH;

      canvg(c, str, {renderCallback: function() {
          var dataURLType = (type === 'ICO' ? 'BMP' : type).toLowerCase();
          var datauri = quality ? c.toDataURL('image/' + dataURLType, quality) : c.toDataURL('image/' + dataURLType);

          call('exported', {datauri: datauri, svg: str, issues: issues, type: imgType, mimeType: mimeType, quality: quality, exportWindowName: exportWindowName});
        }});
    })();
  };

  this.exportPDF = function (exportWindowName, outputType) {
    var that = this;
    svgedit.utilities.buildJSPDFCallback(function () {
      var res = getResolution();
      var orientation = res.w > res.h ? 'landscape' : 'portrait';
      var units = 'pt'; // curConfig.baseUnit; // We could use baseUnit, but that is presumably not intended for export purposes
      var doc = jsPDF({
        orientation: orientation,
        unit: units,
        format: [res.w, res.h]
        // , compressPdf: true
      }); // Todo: Give options to use predefined jsPDF formats like "a4", etc. from pull-down (with option to keep customizable)
      var docTitle = getDocumentTitle();
      doc.setProperties({
        title: docTitle/*,
			subject: '',
			author: '',
			keywords: '',
			creator: ''*/
      });
      var issues = getIssues();
      var str = that.svgCanvasToString();
      doc.addSVG(str, 0, 0);

      // doc.output('save'); // Works to open in a new
      //  window; todo: configure this and other export
      //  options to optionally work in this manner as
      //  opposed to opening a new tab
      var obj = {svg: str, issues: issues, exportWindowName: exportWindowName};
      var method = outputType || 'dataurlstring';
      obj[method] = doc.output(method);
      call('exportedPDF', obj);
    })();
  };

// Function: getSvgString
// Returns the current drawing as raw SVG XML text.
//
// Returns:
// The current drawing as raw SVG XML text.
  this.getSvgString = function() {
    save_options.apply = false;
    return this.svgCanvasToString();
  };

// Function: randomizeIds
// This function determines whether to use a nonce in the prefix, when
// generating IDs for future documents in SVG-Edit.
//
// Parameters:
// an optional boolean, which, if true, adds a nonce to the prefix. Thus
// svgCanvas.randomizeIds() <==> svgCanvas.randomizeIds(true)
//
// if you're controlling SVG-Edit externally, and want randomized IDs, call
// this BEFORE calling svgCanvas.setSvgString
//
  this.randomizeIds = function(enableRandomization) {
    if (arguments.length > 0 && enableRandomization == false) {
      svgedit.draw.randomizeIds(false, getCurrentDrawing());
    } else {
      svgedit.draw.randomizeIds(true, getCurrentDrawing());
    }
  };

// Function: uniquifyElems
// Ensure each element has a unique ID
//
// Parameters:
// g - The parent element of the tree to give unique IDs
  var uniquifyElems = this.uniquifyElems = function(g) {
    var ids = {};
    // TODO: Handle markers and connectors. These are not yet re-identified properly
    // as their referring elements do not get remapped.
    //
    // <marker id='se_marker_end_svg_7'/>
    // <polyline id='svg_7' se:connector='svg_1 svg_6' marker-end='url(#se_marker_end_svg_7)'/>
    //
    // Problem #1: if svg_1 gets renamed, we do not update the polyline's se:connector attribute
    // Problem #2: if the polyline svg_7 gets renamed, we do not update the marker id nor the polyline's marker-end attribute
    var ref_elems = ['filter', 'linearGradient', 'pattern',	'radialGradient', 'symbol', 'textPath', 'use'];

    svgedit.utilities.walkTree(g, function(n) {
      // if it's an element node
      if (n.nodeType == 1) {
        // and the element has an ID
        if (n.id) {
          // and we haven't tracked this ID yet
          if (!(n.id in ids)) {
            // add this id to our map
            ids[n.id] = {elem:null, attrs:[], hrefs:[]};
          }
          ids[n.id].elem = n;
        }

        // now search for all attributes on this element that might refer
        // to other elements
        $.each(ref_attrs, function(i, attr) {
          var attrnode = n.getAttributeNode(attr);
          if (attrnode) {
            // the incoming file has been sanitized, so we should be able to safely just strip off the leading #
            var url = svgedit.utilities.getUrlFromAttr(attrnode.value),
              refid = url ? url.substr(1) : null;
            if (refid) {
              if (!(refid in ids)) {
                // add this id to our map
                ids[refid] = {elem:null, attrs:[], hrefs:[]};
              }
              ids[refid].attrs.push(attrnode);
            }
          }
        });

        // check xlink:href now
        var href = svgedit.utilities.getHref(n);
        // TODO: what if an <image> or <a> element refers to an element internally?
        if (href && ref_elems.indexOf(n.nodeName) >= 0) {
          var refid = href.substr(1);
          if (refid) {
            if (!(refid in ids)) {
              // add this id to our map
              ids[refid] = {elem:null, attrs:[], hrefs:[]};
            }
            ids[refid].hrefs.push(n);
          }
        }
      }
    });

    // in ids, we now have a map of ids, elements and attributes, let's re-identify
    var oldid;
    for (oldid in ids) {
      if (!oldid) {continue;}
      var elem = ids[oldid].elem;
      if (elem) {
        var newid = getNextId();

        // assign element its new id
        elem.id = newid;

        // remap all url() attributes
        var attrs = ids[oldid].attrs;
        var j = attrs.length;
        while (j--) {
          var attr = attrs[j];
          attr.ownerElement.setAttribute(attr.name, 'url(#' + newid + ')');
        }

        // remap all href attributes
        var hreffers = ids[oldid].hrefs;
        var k = hreffers.length;
        while (k--) {
          var hreffer = hreffers[k];
          svgedit.utilities.setHref(hreffer, '#' + newid);
        }
      }
    }
  };

// Function setUseData
// Assigns reference data for each use element
  var setUseData = this.setUseData = function(parent) {
    var elems = $(parent);

    if (parent.tagName !== 'use') {
      elems = elems.find('use');
    }

    elems.each(function() {
      var id = getHref(this).substr(1);
      var ref_elem = svgedit.utilities.getElem(id);
      if (!ref_elem) {return;}
      $(this).data('ref', ref_elem);
      if (ref_elem.tagName == 'symbol' || ref_elem.tagName == 'svg') {
        $(this).data('symbol', ref_elem).data('ref', ref_elem);
      }
    });
  };

// Function convertGradients
// Converts gradients from userSpaceOnUse to objectBoundingBox
  var convertGradients = this.convertGradients = function(elem) {
    var elems = $(elem).find('linearGradient, radialGradient');
    if (!elems.length && svgedit.browser.isWebkit()) {
      // Bug in webkit prevents regular *Gradient selector search
      elems = $(elem).find('*').filter(function() {
        return (this.tagName.indexOf('Gradient') >= 0);
      });
    }

    elems.each(function() {
      var grad = this;
      if ($(grad).attr('gradientUnits') === 'userSpaceOnUse') {
        // TODO: Support more than one element with this ref by duplicating parent grad
        var elems = $(svgcontent).find('[fill="url(#' + grad.id + ')"],[stroke="url(#' + grad.id + ')"]');
        if (!elems.length) {return;}

        // get object's bounding box
        var bb = svgedit.utilities.getBBox(elems[0]);

        // This will occur if the element is inside a <defs> or a <symbol>,
        // in which we shouldn't need to convert anyway.
        if (!bb) {return;}

        if (grad.tagName === 'linearGradient') {
          var g_coords = $(grad).attr(['x1', 'y1', 'x2', 'y2']);

          // If has transform, convert
          var tlist = grad.gradientTransform.baseVal;
          if (tlist && tlist.numberOfItems > 0) {
            var m = svgedit.math.transformListToTransform(tlist).matrix;
            var pt1 = svgedit.math.transformPoint(g_coords.x1, g_coords.y1, m);
            var pt2 = svgedit.math.transformPoint(g_coords.x2, g_coords.y2, m);

            g_coords.x1 = pt1.x;
            g_coords.y1 = pt1.y;
            g_coords.x2 = pt2.x;
            g_coords.y2 = pt2.y;
            grad.removeAttribute('gradientTransform');
          }

          $(grad).attr({
            x1: (g_coords.x1 - bb.x) / bb.width,
            y1: (g_coords.y1 - bb.y) / bb.height,
            x2: (g_coords.x2 - bb.x) / bb.width,
            y2: (g_coords.y2 - bb.y) / bb.height
          });
          grad.removeAttribute('gradientUnits');
        }
        // else {
        // Note: radialGradient elements cannot be easily converted
        // because userSpaceOnUse will keep circular gradients, while
        // objectBoundingBox will x/y scale the gradient according to
        // its bbox.

        // For now we'll do nothing, though we should probably have
        // the gradient be updated as the element is moved, as
        // inkscape/illustrator do.

//						var g_coords = $(grad).attr(['cx', 'cy', 'r']);
//
//						$(grad).attr({
//							cx: (g_coords.cx - bb.x) / bb.width,
//							cy: (g_coords.cy - bb.y) / bb.height,
//							r: g_coords.r
//						});
//
//						grad.removeAttribute('gradientUnits');
        // }
      }
    });
  };

// Function: convertToGroup
// Converts selected/given <use> or child SVG element to a group
  var convertToGroup = this.convertToGroup = function(elem) {
    if (!elem) {
      elem = selectedElements[0];
    }
    var $elem = $(elem);
    var batchCmd = new svgedit.history.BatchCommand();
    var ts;

    if ($elem.data('gsvg')) {
      // Use the gsvg as the new group
      var svg = elem.firstChild;
      var pt = $(svg).attr(['x', 'y']);

      $(elem.firstChild.firstChild).unwrap();
      $(elem).removeData('gsvg');

      var tlist = svgedit.transformlist.getTransformList(elem);
      var xform = svgroot.createSVGTransform();
      xform.setTranslate(pt.x, pt.y);
      tlist.appendItem(xform);
      svgedit.recalculate.recalculateDimensions(elem);
      call('selected', [elem]);
    } else if ($elem.data('symbol')) {
      elem = $elem.data('symbol');

      ts = $elem.attr('transform');
      var pos = $elem.attr(['x', 'y']);

      var vb = elem.getAttribute('viewBox');

      if (vb) {
        var nums = vb.split(' ');
        pos.x -= +nums[0];
        pos.y -= +nums[1];
      }

      // Not ideal, but works
      ts += ' translate(' + (pos.x || 0) + ',' + (pos.y || 0) + ')';

      var prev = $elem.prev();

      // Remove <use> element
      batchCmd.addSubCommand(new svgedit.history.RemoveElementCommand($elem[0], $elem[0].nextSibling, $elem[0].parentNode));
      $elem.remove();

      // See if other elements reference this symbol
      var has_more = $(svgcontent).find('use:data(symbol)').length;

      var g = svgdoc.createElementNS(NS.SVG, 'g');
      var childs = elem.childNodes;

      var i;
      for (i = 0; i < childs.length; i++) {
        g.appendChild(childs[i].cloneNode(true));
      }

      // Duplicate the gradients for Gecko, since they weren't included in the <symbol>
      if (svgedit.browser.isGecko()) {
        var dupeGrads = $(svgedit.utilities.findDefs()).children('linearGradient,radialGradient,pattern').clone();
        $(g).append(dupeGrads);
      }

      if (ts) {
        g.setAttribute('transform', ts);
      }

      var parent = elem.parentNode;

      uniquifyElems(g);

      // Put the dupe gradients back into <defs> (after uniquifying them)
      if (svgedit.browser.isGecko()) {
        $(findDefs()).append( $(g).find('linearGradient,radialGradient,pattern') );
      }

      // now give the g itself a new id
      g.id = getNextId();

      prev.after(g);

      if (parent) {
        if (!has_more) {
          // remove symbol/svg element
          var nextSibling = elem.nextSibling;
          parent.removeChild(elem);
          batchCmd.addSubCommand(new svgedit.history.RemoveElementCommand(elem, nextSibling, parent));
        }
        batchCmd.addSubCommand(new svgedit.history.InsertElementCommand(g));
      }

      setUseData(g);

      if (svgedit.browser.isGecko()) {
        convertGradients(svgedit.utilities.findDefs());
      } else {
        convertGradients(g);
      }

      // recalculate dimensions on the top-level children so that unnecessary transforms
      // are removed
      svgedit.utilities.walkTreePost(g, function(n){
        try {
          svgedit.recalculate.recalculateDimensions(n);
        } catch(e) {
          console.log(e);
        }
      });

      // Give ID for any visible element missing one
      $(g).find(visElems).each(function() {
        if (!this.id) {this.id = getNextId();}
      });

      selectOnly([g]);

      var cm = pushGroupProperties(g, true);
      if (cm) {
        batchCmd.addSubCommand(cm);
      }

      addCommandToHistory(batchCmd);

    } else {
      console.log('Unexpected element to ungroup:', elem);
    }
  };

//
// Function: setSvgString
// This function sets the current drawing as the input SVG XML.
//
// Parameters:
// xmlString - The SVG as XML text.
// preventUndo - Boolean (defaults to false) indicating if we want to do the
// changes without adding them to the undo stack - e.g. for initializing a
// drawing on page load.
//
// Returns:
// This function returns false if the set was unsuccessful, true otherwise.
  this.setSvgString = function(xmlString, preventUndo) {
    try {
      // convert string into XML document
      var newDoc = svgedit.utilities.text2xml(xmlString);

      this.prepareSvg(newDoc);

      var batchCmd = new svgedit.history.BatchCommand('Change Source');

      // remove old svg document
      var nextSibling = svgcontent.nextSibling;
      var oldzoom = svgroot.removeChild(svgcontent);
      batchCmd.addSubCommand(new svgedit.history.RemoveElementCommand(oldzoom, nextSibling, svgroot));

      // set new svg document
      // If DOM3 adoptNode() available, use it. Otherwise fall back to DOM2 importNode()
      if (svgdoc.adoptNode) {
        svgcontent = svgdoc.adoptNode(newDoc.documentElement);
      }
      else {
        svgcontent = svgdoc.importNode(newDoc.documentElement, true);
      }

      svgroot.appendChild(svgcontent);
      var content = $(svgcontent);

      canvas.current_drawing_ = new svgedit.draw.Drawing(svgcontent, idprefix);

      // retrieve or set the nonce
      var nonce = getCurrentDrawing().getNonce();
      if (nonce) {
        call('setnonce', nonce);
      } else {
        call('unsetnonce');
      }

      // change image href vals if possible
      content.find('image').each(function() {
        var image = this;
        svgedit.utilities.preventClickDefault(image);
        var val = getHref(this);
        if (val) {
          if (val.indexOf('data:') === 0) {
            // Check if an SVG-edit data URI
            var m = val.match(/svgedit_url=(.*?);/);
            if (m) {
              var url = decodeURIComponent(m[1]);
              $(new Image()).load(function () {
                image.setAttributeNS(NS.XLINK, 'xlink:href', url);
              }).attr('src', url);
            }
          }
          // Add to encodableImages if it loads
          canvas.embedImage(val);
        }
      });

      // Wrap child SVGs in group elements
      content.find('svg').each(function() {
        // Skip if it's in a <defs>
        if ($(this).closest('defs').length) {return;}

        uniquifyElems(this);

        // Check if it already has a gsvg group
        var pa = this.parentNode;
        if (pa.childNodes.length === 1 && pa.nodeName === 'g') {
          $(pa).data('gsvg', this);
          pa.id = pa.id || getNextId();
        } else {
          groupSvgElem(this);
        }
      });

      // For Firefox: Put all paint elems in defs
      if (svgedit.browser.isGecko()) {
        content.find('linearGradient, radialGradient, pattern').appendTo(svgedit.utilities.findDefs());
      }

      // Set ref element for <use> elements

      // TODO: This should also be done if the object is re-added through "redo"
      setUseData(content);

      convertGradients(content[0]);

      var attrs = {
        id: 'svgcontent',
        overflow: curConfig.show_outside_canvas ? 'visible' : 'hidden'
      };

      var percs = false;

      // determine proper size
      if (content.attr('viewBox')) {
        var vb = content.attr('viewBox').split(' ');
        attrs.width = vb[2];
        attrs.height = vb[3];
      }
      // handle content that doesn't have a viewBox
      else {
        $.each(['width', 'height'], function(i, dim) {
          // Set to 100 if not given
          var val = content.attr(dim);

          if (!val) {val = '100%';}

          if (String(val).substr(-1) === '%') {
            // Use user units if percentage given
            percs = true;
          } else {
            attrs[dim] = svgedit.units.convertToNum(dim, val);
          }
        });
      }

      // identify layers
      identifyLayers();

      // Give ID for any visible layer children missing one
      content.children().find(visElems).each(function() {
        if (!this.id) {this.id = getNextId();}
      });

      // Percentage width/height, so let's base it on visible elements
      if (percs) {
        var bb = getStrokedBBox();
        attrs.width = bb.width + bb.x;
        attrs.height = bb.height + bb.y;
      }

      // Just in case negative numbers are given or
      // result from the percs calculation
      if (attrs.width <= 0) {attrs.width = 100;}
      if (attrs.height <= 0) {attrs.height = 100;}

      content.attr(attrs);
      this.contentW = attrs.width;
      this.contentH = attrs.height;

      batchCmd.addSubCommand(new svgedit.history.InsertElementCommand(svgcontent));
      // update root to the correct size
      var changes = content.attr(['width', 'height']);
      batchCmd.addSubCommand(new svgedit.history.ChangeElementCommand(svgroot, changes));

      // reset zoom
      current_zoom = 1;

      // reset transform lists
      svgedit.transformlist.resetListMap();
      clearSelection();
      svgedit.path.clearData();
      svgroot.appendChild(selectorManager.selectorParentGroup);

      if (!preventUndo) addCommandToHistory(batchCmd);
      call('changed', [svgcontent]);
    } catch(e) {
      console.log(e);
      return false;
    }

    return true;
  };

// Function: importSvgString
// This function imports the input SVG XML as a <symbol> in the <defs>, then adds a
// <use> to the current layer.
//
// Parameters:
// xmlString - The SVG as XML text.
//
// Returns:
// This function returns null if the import was unsuccessful, or the element otherwise.
// TODO:
// * properly handle if namespace is introduced by imported content (must add to svgcontent
// and update all prefixes in the imported node)
// * properly handle recalculating dimensions, recalculateDimensions() doesn't handle
// arbitrary transform lists, but makes some assumptions about how the transform list
// was obtained
// * import should happen in top-left of current zoomed viewport
  this.importSvgString = function(xmlString) {
    var j, ts;
    try {
      // Get unique ID
      var uid = svgedit.utilities.encode64(xmlString.length + xmlString).substr(0,32);

      var useExisting = false;

      // Look for symbol and make sure symbol exists in image
      if (import_ids[uid]) {
        if ( $(import_ids[uid].symbol).parents('#svgroot').length ) {
          useExisting = true;
        }
      }

      var batchCmd = new svgedit.history.BatchCommand('Import Image');
      var symbol;
      if (useExisting) {
        symbol = import_ids[uid].symbol;
        ts = import_ids[uid].xform;
      } else {
        // convert string into XML document
        var newDoc = svgedit.utilities.text2xml(xmlString);

        this.prepareSvg(newDoc);

        // import new svg document into our document
        var svg;
        // If DOM3 adoptNode() available, use it. Otherwise fall back to DOM2 importNode()
        if (svgdoc.adoptNode) {
          svg = svgdoc.adoptNode(newDoc.documentElement);
        } else {
          svg = svgdoc.importNode(newDoc.documentElement, true);
        }

        uniquifyElems(svg);

        var innerw = svgedit.units.convertToNum('width', svg.getAttribute('width')),
          innerh = svgedit.units.convertToNum('height', svg.getAttribute('height')),
          innervb = svg.getAttribute('viewBox'),
          // if no explicit viewbox, create one out of the width and height
          vb = innervb ? innervb.split(' ') : [0, 0, innerw, innerh];
        for (j = 0; j < 4; ++j) {
          vb[j] = +(vb[j]);
        }

        // TODO: properly handle preserveAspectRatio
        var canvasw = +svgcontent.getAttribute('width'),
          canvash = +svgcontent.getAttribute('height');
        // imported content should be 1/3 of the canvas on its largest dimension

        if (innerh > innerw) {
          ts = 'scale(' + (canvash/3)/vb[3] + ')';
        } else {
          ts = 'scale(' + (canvash/3)/vb[2] + ')';
        }

        // Hack to make recalculateDimensions understand how to scale
        ts = 'translate(0) ' + ts + ' translate(0)';

        symbol = svgdoc.createElementNS(NS.SVG, 'symbol');
        var defs = svgedit.utilities.findDefs();

        if (svgedit.browser.isGecko()) {
          // Move all gradients into root for Firefox, workaround for this bug:
          // https://bugzilla.mozilla.org/show_bug.cgi?id=353575
          // TODO: Make this properly undo-able.
          $(svg).find('linearGradient, radialGradient, pattern').appendTo(defs);
        }

        while (svg.firstChild) {
          var first = svg.firstChild;
          symbol.appendChild(first);
        }
        var attrs = svg.attributes;
        var i;
        for (i = 0; i < attrs.length; i++) {
          var attr = attrs[i];
          symbol.setAttribute(attr.nodeName, attr.value);
        }
        symbol.id = getNextId();

        // Store data
        import_ids[uid] = {
          symbol: symbol,
          xform: ts
        };

        svgedit.utilities.findDefs().appendChild(symbol);
        batchCmd.addSubCommand(new svgedit.history.InsertElementCommand(symbol));
      }

      var use_el = svgdoc.createElementNS(NS.SVG, 'use');
      use_el.id = getNextId();
      setHref(use_el, '#' + symbol.id);

      (current_group || getCurrentDrawing().getCurrentLayer()).appendChild(use_el);
      batchCmd.addSubCommand(new svgedit.history.InsertElementCommand(use_el));
      clearSelection();

      use_el.setAttribute('transform', ts);
      svgedit.recalculate.recalculateDimensions(use_el);
      $(use_el).data('symbol', symbol).data('ref', symbol);
      addToSelection([use_el]);

      // TODO: Find way to add this in a recalculateDimensions-parsable way
//				if (vb[0] != 0 || vb[1] != 0)
//					ts = 'translate(' + (-vb[0]) + ',' + (-vb[1]) + ') ' + ts;
      addCommandToHistory(batchCmd);
      call('changed', [svgcontent]);

    } catch(e) {
      console.log(e);
      return null;
    }

    // we want to return the element so we can automatically select it
    return use_el;
  };

// TODO(codedread): Move all layer/context functions in draw.js
// Layer API Functions

// Group: Layers

// Function: identifyLayers
// Updates layer system
  var identifyLayers = canvas.identifyLayers = function() {
    leaveContext();
    getCurrentDrawing().identifyLayers();
  };

// Function: createLayer
// Creates a new top-level layer in the drawing with the given name, sets the current layer
// to it, and then clears the selection. This function then calls the 'changed' handler.
// This is an undoable action.
//
// Parameters:
// name - The given name
  this.createLayer = function(name, hrService) {
    var new_layer = getCurrentDrawing().createLayer(name, historyRecordingService(hrService));
    clearSelection();
    call('changed', [new_layer]);
  };

  /**
   * Creates a new top-level layer in the drawing with the given name, copies all the current layer's contents
   * to it, and then clears the selection. This function then calls the 'changed' handler.
   * This is an undoable action.
   * @param {string} name - The given name. If the layer name exists, a new name will be generated.
   * @param {svgedit.history.HistoryRecordingService} hrService - History recording service
   */
  this.cloneLayer = function(name, hrService) {
    // Clone the current layer and make the cloned layer the new current layer
    var new_layer = getCurrentDrawing().cloneLayer(name, historyRecordingService(hrService));

    clearSelection();
    leaveContext();
    call('changed', [new_layer]);
  };

// Function: deleteCurrentLayer
// Deletes the current layer from the drawing and then clears the selection. This function
// then calls the 'changed' handler. This is an undoable action.
  this.deleteCurrentLayer = function() {
    var current_layer = getCurrentDrawing().getCurrentLayer();
    var nextSibling = current_layer.nextSibling;
    var parent = current_layer.parentNode;
    current_layer = getCurrentDrawing().deleteCurrentLayer();
    if (current_layer) {
      var batchCmd = new svgedit.history.BatchCommand('Delete Layer');
      // store in our Undo History
      batchCmd.addSubCommand(new svgedit.history.RemoveElementCommand(current_layer, nextSibling, parent));
      addCommandToHistory(batchCmd);
      clearSelection();
      call('changed', [parent]);
      return true;
    }
    return false;
  };

// Function: setCurrentLayer
// Sets the current layer. If the name is not a valid layer name, then this function returns
// false. Otherwise it returns true. This is not an undo-able action.
//
// Parameters:
// name - the name of the layer you want to switch to.
//
// Returns:
// true if the current layer was switched, otherwise false
  this.setCurrentLayer = function(name) {
    var result = getCurrentDrawing().setCurrentLayer(svgedit.utilities.toXml(name));
    if (result) {
      clearSelection();
    }
    return result;
  };

// Function: renameCurrentLayer
// Renames the current layer. If the layer name is not valid (i.e. unique), then this function
// does nothing and returns false, otherwise it returns true. This is an undo-able action.
//
// Parameters:
// newname - the new name you want to give the current layer. This name must be unique
// among all layer names.
//
// Returns:
// true if the rename succeeded, false otherwise.
  this.renameCurrentLayer = function(newname) {
    var drawing = getCurrentDrawing();
    var layer = drawing.getCurrentLayer();
    if (layer) {
      var result = drawing.setCurrentLayerName(newname, historyRecordingService());
      if (result) {
        call('changed', [layer]);
        return true;
      }
    }
    return false;
  };

// Function: setCurrentLayerPosition
// Changes the position of the current layer to the new value. If the new index is not valid,
// this function does nothing and returns false, otherwise it returns true. This is an
// undo-able action.
//
// Parameters:
// newpos - The zero-based index of the new position of the layer. This should be between
// 0 and (number of layers - 1)
//
// Returns:
// true if the current layer position was changed, false otherwise.
  this.setCurrentLayerPosition = function(newpos) {
    var oldpos, drawing = getCurrentDrawing();
    var result = drawing.setCurrentLayerPosition(newpos);
    if (result) {
      addCommandToHistory(new svgedit.history.MoveElementCommand(result.currentGroup, result.oldNextSibling, svgcontent));
      return true;
    }
    return false;
  };

// Function: setLayerVisibility
// Sets the visibility of the layer. If the layer name is not valid, this function return
// false, otherwise it returns true. This is an undo-able action.
//
// Parameters:
// layername - the name of the layer to change the visibility
// bVisible - true/false, whether the layer should be visible
//
// Returns:
// true if the layer's visibility was set, false otherwise
  this.setLayerVisibility = function(layername, bVisible) {
    var drawing = getCurrentDrawing();
    var prevVisibility = drawing.getLayerVisibility(layername);
    var layer = drawing.setLayerVisibility(layername, bVisible);
    if (layer) {
      var oldDisplay = prevVisibility ? 'inline' : 'none';
      addCommandToHistory(new svgedit.history.ChangeElementCommand(layer, {'display':oldDisplay}, 'Layer Visibility'));
    } else {
      return false;
    }

    if (layer == drawing.getCurrentLayer()) {
      clearSelection();
      pathActions.clear();
    }
//		call('changed', [selected]);
    return true;
  };

// Function: moveSelectedToLayer
// Moves the selected elements to layername. If the name is not a valid layer name, then false
// is returned. Otherwise it returns true. This is an undo-able action.
//
// Parameters:
// layername - the name of the layer you want to which you want to move the selected elements
//
// Returns:
// true if the selected elements were moved to the layer, false otherwise.
  this.moveSelectedToLayer = function(layername) {
    // find the layer
    var i;
    var drawing = getCurrentDrawing();
    var layer = drawing.getLayerByName(layername);
    if (!layer) {return false;}

    var batchCmd = new svgedit.history.BatchCommand('Move Elements to Layer');

    // loop for each selected element and move it
    var selElems = selectedElements;
    i = selElems.length;
    while (i--) {
      var elem = selElems[i];
      if (!elem) {continue;}
      var oldNextSibling = elem.nextSibling;
      // TODO: this is pretty brittle!
      var oldLayer = elem.parentNode;
      layer.appendChild(elem);
      batchCmd.addSubCommand(new svgedit.history.MoveElementCommand(elem, oldNextSibling, oldLayer));
    }

    addCommandToHistory(batchCmd);

    return true;
  };


  this.mergeLayer = function(hrService) {
    getCurrentDrawing().mergeLayer(historyRecordingService(hrService));
    clearSelection();
    leaveContext();
    call('changed', [svgcontent]);
  };

  this.mergeAllLayers = function(hrService) {
    getCurrentDrawing().mergeAllLayers(historyRecordingService(hrService));
    clearSelection();
    leaveContext();
    call('changed', [svgcontent]);
  };

// Function: leaveContext
// Return from a group context to the regular kind, make any previously
// disabled elements enabled again
  var leaveContext = this.leaveContext = function() {
    var i, len = disabled_elems.length;
    if (len) {
      for (i = 0; i < len; i++) {
        var elem = disabled_elems[i];
        var orig = elData(elem, 'orig_opac');
        if (orig !== 1) {
          elem.setAttribute('opacity', orig);
        } else {
          elem.removeAttribute('opacity');
        }
        elem.setAttribute('style', 'pointer-events: inherit');
      }
      disabled_elems = [];
      clearSelection(true);
      call('contextset', null);
    }
    current_group = null;
  };

// Function: setContext
// Set the current context (for in-group editing)
  var setContext = this.setContext = function(elem) {
    leaveContext();
    if (typeof elem === 'string') {
      elem = svgedit.utilities.getElem(elem);
    }

    // Edit inside this group
    current_group = elem;

    // Disable other elements
    $(elem).parentsUntil('#svgcontent').andSelf().siblings().each(function() {
      var opac = this.getAttribute('opacity') || 1;
      // Store the original's opacity
      elData(this, 'orig_opac', opac);
      this.setAttribute('opacity', opac * 0.33);
      this.setAttribute('style', 'pointer-events: none');
      disabled_elems.push(this);
    });

    clearSelection();
    call('contextset', current_group);
  };

// Group: Document functions

// Function: clear
// Clears the current document. This is not an undoable action.
  this.clear = function() {
    pathActions.clear();

    clearSelection();

    // clear the svgcontent node
    canvas.clearSvgContentElement();

    // create new document
    canvas.current_drawing_ = new svgedit.draw.Drawing(svgcontent);

    // create empty first layer
    canvas.createLayer('Layer 1');

    // clear the undo stack
    canvas.undoMgr.resetUndoStack();

    // reset the selector manager
    selectorManager.initGroup();

    // reset the rubber band box
    rubberBox = selectorManager.getRubberBandBox();

    call('cleared');
  };

// Function: linkControlPoints
// Alias function
  this.linkControlPoints = pathActions.linkControlPoints;

// Function: getContentElem
// Returns the content DOM element
  this.getContentElem = function() { return svgcontent; };

// Function: getRootElem
// Returns the root DOM element
  this.getRootElem = function() { return svgroot; };

// Function: getSelectedElems
// Returns the array with selected DOM elements
  this.getSelectedElems = function() { return selectedElements; };

// Function: getResolution
// Returns the current dimensions and zoom level in an object
  var getResolution = this.getResolution = function() {
//		var vb = svgcontent.getAttribute('viewBox').split(' ');
//		return {'w':vb[2], 'h':vb[3], 'zoom': current_zoom};

    var width = svgcontent.getAttribute('width')/current_zoom;
    var height = svgcontent.getAttribute('height')/current_zoom;

    return {
      'w': width,
      'h': height,
      'zoom': current_zoom
    };
  };

// Function: getZoom
// Returns the current zoom level
  this.getZoom = function(){return current_zoom;};

// Function: getSnapToGrid
// Returns the current snap to grid setting
  this.getSnapToGrid = function(){return curConfig.gridSnapping;};


// Function: getVersion
// Returns a string which describes the revision number of SvgCanvas.
  this.getVersion = function() {
    return 'svgcanvas.js ($Rev$)';
  };

// Function: setUiStrings
// Update interface strings with given values
//
// Parameters:
// strs - Object with strings (see uiStrings for examples)
  this.setUiStrings = function(strs) {
    $.extend(uiStrings, strs.notification);
  };

// Function: setConfig
// Update configuration options with given values
//
// Parameters:
// opts - Object with options (see curConfig for examples)
  this.setConfig = function(opts) {
    $.extend(curConfig, opts);
  };

// Function: getTitle
// Returns the current group/SVG's title contents
  this.getTitle = function(elem) {
    var i;
    elem = elem || selectedElements[0];
    if (!elem) {return;}
    elem = $(elem).data('gsvg') || $(elem).data('symbol') || elem;
    var childs = elem.childNodes;
    for (i = 0; i < childs.length; i++) {
      if (childs[i].nodeName == 'title') {
        return childs[i].textContent;
      }
    }
    return '';
  };

// Function: setGroupTitle
// Sets the group/SVG's title content
// TODO: Combine this with setDocumentTitle
  this.setGroupTitle = function(val) {
    var elem = selectedElements[0];
    elem = $(elem).data('gsvg') || elem;

    var ts = $(elem).children('title');

    var batchCmd = new svgedit.history.BatchCommand('Set Label');

    if (!val.length) {
      // Remove title element
      var tsNextSibling = ts.nextSibling;
      batchCmd.addSubCommand(new svgedit.history.RemoveElementCommand(ts[0], tsNextSibling, elem));
      ts.remove();
    } else if (ts.length) {
      // Change title contents
      var title = ts[0];
      batchCmd.addSubCommand(new svgedit.history.ChangeElementCommand(title, {'#text': title.textContent}));
      title.textContent = val;
    } else {
      // Add title element
      title = svgdoc.createElementNS(NS.SVG, 'title');
      title.textContent = val;
      $(elem).prepend(title);
      batchCmd.addSubCommand(new svgedit.history.InsertElementCommand(title));
    }

    addCommandToHistory(batchCmd);
  };

// Function: getDocumentTitle
// Returns the current document title or an empty string if not found
  var getDocumentTitle = this.getDocumentTitle = function() {
    return canvas.getTitle(svgcontent);
  };

// Function: setDocumentTitle
// Adds/updates a title element for the document with the given name.
// This is an undoable action
//
// Parameters:
// newtitle - String with the new title
  this.setDocumentTitle = function(newtitle) {
    var i;
    var childs = svgcontent.childNodes, doc_title = false, old_title = '';

    var batchCmd = new svgedit.history.BatchCommand('Change Image Title');

    for (i = 0; i < childs.length; i++) {
      if (childs[i].nodeName == 'title') {
        doc_title = childs[i];
        old_title = doc_title.textContent;
        break;
      }
    }
    if (!doc_title) {
      doc_title = svgdoc.createElementNS(NS.SVG, 'title');
      svgcontent.insertBefore(doc_title, svgcontent.firstChild);
    }

    if (newtitle.length) {
      doc_title.textContent = newtitle;
    } else {
      // No title given, so element is not necessary
      doc_title.parentNode.removeChild(doc_title);
    }
    batchCmd.addSubCommand(new svgedit.history.ChangeElementCommand(doc_title, {'#text': old_title}));
    addCommandToHistory(batchCmd);
  };

// Function: getEditorNS
// Returns the editor's namespace URL, optionally adds it to root element
//
// Parameters:
// add - Boolean to indicate whether or not to add the namespace value
  this.getEditorNS = function(add) {
    if (add) {
      svgcontent.setAttribute('xmlns:se', NS.SE);
    }
    return NS.SE;
  };

// Function: setResolution
// Changes the document's dimensions to the given size
//
// Parameters:
// x - Number with the width of the new dimensions in user units.
// Can also be the string "fit" to indicate "fit to content"
// y - Number with the height of the new dimensions in user units.
//
// Returns:
// Boolean to indicate if resolution change was succesful.
// It will fail on "fit to content" option with no content to fit to.
  this.setResolution = function(x, y) {
    var res = getResolution();
    var w = res.w, h = res.h;
    var batchCmd;

    if (x == 'fit') {
      // Get bounding box
      var bbox = getStrokedBBox();

      if (bbox) {
        batchCmd = new svgedit.history.BatchCommand('Fit Canvas to Content');
        var visEls = getVisibleElements();
        addToSelection(visEls);
        var dx = [], dy = [];
        $.each(visEls, function(i, item) {
          dx.push(bbox.x*-1);
          dy.push(bbox.y*-1);
        });

        var cmd = canvas.moveSelectedElements(dx, dy, true);
        batchCmd.addSubCommand(cmd);
        clearSelection();

        x = Math.round(bbox.width);
        y = Math.round(bbox.height);
      } else {
        return false;
      }
    }
    if (x != w || y != h) {
      if (!batchCmd) {
        batchCmd = new svgedit.history.BatchCommand('Change Image Dimensions');
      }

      x = svgedit.units.convertToNum('width', x);
      y = svgedit.units.convertToNum('height', y);

      svgcontent.setAttribute('width', x);
      svgcontent.setAttribute('height', y);

      this.contentW = x;
      this.contentH = y;
      batchCmd.addSubCommand(new svgedit.history.ChangeElementCommand(svgcontent, {'width':w, 'height':h}));

      svgcontent.setAttribute('viewBox', [0, 0, x/current_zoom, y/current_zoom].join(' '));
      batchCmd.addSubCommand(new svgedit.history.ChangeElementCommand(svgcontent, {'viewBox': ['0 0', w, h].join(' ')}));

      addCommandToHistory(batchCmd);
      call('changed', [svgcontent]);
    }
    return true;
  };

// Function: getOffset
// Returns an object with x, y values indicating the svgcontent element's
// position in the editor's canvas.
  this.getOffset = function() {
    return $(svgcontent).attr(['x', 'y']);
  };

// Function: setBBoxZoom
// Sets the zoom level on the canvas-side based on the given value
//
// Parameters:
// val - Bounding box object to zoom to or string indicating zoom option
// editor_w - Integer with the editor's workarea box's width
// editor_h - Integer with the editor's workarea box's height
  this.setBBoxZoom = function(val, editor_w, editor_h) {
    var spacer = 0.85;
    var bb;
    var calcZoom = function(bb) {
      if (!bb) {return false;}
      var w_zoom = Math.round((editor_w / bb.width)*100 * spacer)/100;
      var h_zoom = Math.round((editor_h / bb.height)*100 * spacer)/100;
      var zoomlevel = Math.min(w_zoom, h_zoom);
      canvas.setZoom(zoomlevel);
      return {'zoom': zoomlevel, 'bbox': bb};
    };

    if (typeof val == 'object') {
      bb = val;
      if (bb.width == 0 || bb.height == 0) {
        var newzoom = bb.zoom ? bb.zoom : current_zoom * bb.factor;
        canvas.setZoom(newzoom);
        return {'zoom': current_zoom, 'bbox': bb};
      }
      return calcZoom(bb);
    }

    switch (val) {
      case 'selection':
        if (!selectedElements[0]) {return;}
        var sel_elems = $.map(selectedElements, function(n){ if (n) {return n;} });
        bb = getStrokedBBox(sel_elems);
        break;
      case 'canvas':
        var res = getResolution();
        spacer = 0.95;
        bb = {width:res.w, height:res.h , x:0, y:0};
        break;
      case 'content':
        bb = getStrokedBBox();
        break;
      case 'layer':
        bb = getStrokedBBox(getVisibleElements(getCurrentDrawing().getCurrentLayer()));
        break;
      default:
        return;
    }
    return calcZoom(bb);
  };

// Function: setZoom
// Sets the zoom to the given level
//
// Parameters:
// zoomlevel - Float indicating the zoom level to change to
  this.setZoom = function(zoomlevel) {
    var res = getResolution();
    svgcontent.setAttribute('viewBox', '0 0 ' + res.w/zoomlevel + ' ' + res.h/zoomlevel);
    current_zoom = zoomlevel;
    $.each(selectedElements, function(i, elem) {
      if (!elem) {return;}
      selectorManager.requestSelector(elem).resize();
    });
    pathActions.zoomChange();
    runExtensions('zoomChanged', zoomlevel);
  };

// Function: getMode
// Returns the current editor mode string
  this.getMode = function() {
    return current_mode;
  };

// Function: setMode
// Sets the editor's mode to the given string
//
// Parameters:
// name - String with the new mode to change to
  this.setMode = function(name) {
    pathActions.clear(true);
    textActions.clear();
    cur_properties = (selectedElements[0] && selectedElements[0].nodeName == 'text') ? cur_text : cur_shape;
    current_mode = name;
  };

// Group: Element Styling

// Function: getColor
// Returns the current fill/stroke option
  this.getColor = function(type) {
    return cur_properties[type];
  };

// Function: setColor
// Change the current stroke/fill color/gradient value
//
// Parameters:
// type - String indicating fill or stroke
// val - The value to set the stroke attribute to
// preventUndo - Boolean indicating whether or not this should be and undoable option
  this.setColor = function(type, val, preventUndo) {
    cur_shape[type] = val;
    cur_properties[type + '_paint'] = {type:'solidColor'};
    var elems = [];
    function addNonG (e) {
      if (e.nodeName != 'g') {
        elems.push(e);
      }
    }
    var i = selectedElements.length;
    while (i--) {
      var elem = selectedElements[i];
      if (elem) {
        if (elem.tagName == 'g') {
          svgedit.utilities.walkTree(elem, addNonG);
        } else {
          if (type == 'fill') {
            if (elem.tagName != 'polyline' && elem.tagName != 'line') {
              elems.push(elem);
            }
          } else {
            elems.push(elem);
          }
        }
      }
    }
    if (elems.length > 0) {
      if (!preventUndo) {
        changeSelectedAttribute(type, val, elems);
        call('changed', elems);
      } else {
        changeSelectedAttributeNoUndo(type, val, elems);
      }
    }
  };

// Function: setGradient
// Apply the current gradient to selected element's fill or stroke
//
// Parameters
// type - String indicating "fill" or "stroke" to apply to an element
  var setGradient = this.setGradient = function(type) {
    if (!cur_properties[type + '_paint'] || cur_properties[type + '_paint'].type == 'solidColor') {return;}
    var grad = canvas[type + 'Grad'];
    // find out if there is a duplicate gradient already in the defs
    var duplicate_grad = findDuplicateGradient(grad);
    var defs = svgedit.utilities.findDefs();
    // no duplicate found, so import gradient into defs
    if (!duplicate_grad) {
      var orig_grad = grad;
      grad = defs.appendChild( svgdoc.importNode(grad, true) );
      // get next id and set it on the grad
      grad.id = getNextId();
    } else { // use existing gradient
      grad = duplicate_grad;
    }
    canvas.setColor(type, 'url(#' + grad.id + ')');
  };

// Function: findDuplicateGradient
// Check if exact gradient already exists
//
// Parameters:
// grad - The gradient DOM element to compare to others
//
// Returns:
// The existing gradient if found, null if not
  var findDuplicateGradient = function(grad) {
    var defs = svgedit.utilities.findDefs();
    var existing_grads = $(defs).find('linearGradient, radialGradient');
    var i = existing_grads.length;
    var rad_attrs = ['r', 'cx', 'cy', 'fx', 'fy'];
    while (i--) {
      var og = existing_grads[i];
      if (grad.tagName == 'linearGradient') {
        if (grad.getAttribute('x1') != og.getAttribute('x1') ||
          grad.getAttribute('y1') != og.getAttribute('y1') ||
          grad.getAttribute('x2') != og.getAttribute('x2') ||
          grad.getAttribute('y2') != og.getAttribute('y2'))
        {
          continue;
        }
      } else {
        var grad_attrs = $(grad).attr(rad_attrs);
        var og_attrs = $(og).attr(rad_attrs);

        var diff = false;
        $.each(rad_attrs, function(i, attr) {
          if (grad_attrs[attr] != og_attrs[attr]) {diff = true;}
        });

        if (diff) {continue;}
      }

      // else could be a duplicate, iterate through stops
      var stops = grad.getElementsByTagNameNS(NS.SVG, 'stop');
      var ostops = og.getElementsByTagNameNS(NS.SVG, 'stop');

      if (stops.length != ostops.length) {
        continue;
      }

      var j = stops.length;
      while (j--) {
        var stop = stops[j];
        var ostop = ostops[j];

        if (stop.getAttribute('offset') != ostop.getAttribute('offset') ||
          stop.getAttribute('stop-opacity') != ostop.getAttribute('stop-opacity') ||
          stop.getAttribute('stop-color') != ostop.getAttribute('stop-color'))
        {
          break;
        }
      }

      if (j == -1) {
        return og;
      }
    } // for each gradient in defs

    return null;
  };

  function reorientGrads(elem, m) {
    var i;
    var bb = svgedit.utilities.getBBox(elem);
    for (i = 0; i < 2; i++) {
      var type = i === 0 ? 'fill' : 'stroke';
      var attrVal = elem.getAttribute(type);
      if (attrVal && attrVal.indexOf('url(') === 0) {
        var grad = svgedit.utilities.getRefElem(attrVal);
        if (grad.tagName === 'linearGradient') {
          var x1 = grad.getAttribute('x1') || 0;
          var y1 = grad.getAttribute('y1') || 0;
          var x2 = grad.getAttribute('x2') || 1;
          var y2 = grad.getAttribute('y2') || 0;

          // Convert to USOU points
          x1 = (bb.width * x1) + bb.x;
          y1 = (bb.height * y1) + bb.y;
          x2 = (bb.width * x2) + bb.x;
          y2 = (bb.height * y2) + bb.y;

          // Transform those points
          var pt1 = svgedit.math.transformPoint(x1, y1, m);
          var pt2 = svgedit.math.transformPoint(x2, y2, m);

          // Convert back to BB points
          var g_coords = {};

          g_coords.x1 = (pt1.x - bb.x) / bb.width;
          g_coords.y1 = (pt1.y - bb.y) / bb.height;
          g_coords.x2 = (pt2.x - bb.x) / bb.width;
          g_coords.y2 = (pt2.y - bb.y) / bb.height;

          var newgrad = grad.cloneNode(true);
          $(newgrad).attr(g_coords);

          newgrad.id = getNextId();
          svgedit.utilities.findDefs().appendChild(newgrad);
          elem.setAttribute(type, 'url(#' + newgrad.id + ')');
        }
      }
    }
  }

// Function: setPaint
// Set a color/gradient to a fill/stroke
//
// Parameters:
// type - String with "fill" or "stroke"
// paint - The jGraduate paint object to apply
  this.setPaint = function(type, paint) {
    // make a copy
    var p = new $.jGraduate.Paint(paint);
    this.setPaintOpacity(type, p.alpha / 100, true);

    // now set the current paint object
    cur_properties[type + '_paint'] = p;
    switch (p.type) {
      case 'solidColor':
        this.setColor(type, p.solidColor != 'none' ? '#' + p.solidColor : 'none');
        break;
      case 'linearGradient':
      case 'radialGradient':
        canvas[type + 'Grad'] = p[p.type];
        setGradient(type);
        break;
    }
  };

// alias
  this.setStrokePaint = function(paint) {
    this.setPaint('stroke', paint);
  };

  this.setFillPaint = function(paint) {
    this.setPaint('fill', paint);
  };

// Function: getStrokeWidth
// Returns the current stroke-width value
  this.getStrokeWidth = function() {
    return cur_properties.stroke_width;
  };

// Function: setStrokeWidth
// Sets the stroke width for the current selected elements
// When attempting to set a line's width to 0, this changes it to 1 instead
//
// Parameters:
// val - A Float indicating the new stroke width value
  this.setStrokeWidth = function(val) {
    if (val == 0 && ['line', 'path'].indexOf(current_mode) >= 0) {
      canvas.setStrokeWidth(1);
      return;
    }
    cur_properties.stroke_width = val;

    var elems = [];
    function addNonG (e) {
      if (e.nodeName != 'g') {
        elems.push(e);
      }
    }
    var i = selectedElements.length;
    while (i--) {
      var elem = selectedElements[i];
      if (elem) {
        if (elem.tagName == 'g') {
          svgedit.utilities.walkTree(elem, addNonG);
        }
        else {
          elems.push(elem);
        }
      }
    }
    if (elems.length > 0) {
      changeSelectedAttribute('stroke-width', val, elems);
      call('changed', selectedElements);
    }
  };

// Function: setStrokeAttr
// Set the given stroke-related attribute the given value for selected elements
//
// Parameters:
// attr - String with the attribute name
// val - String or number with the attribute value
  this.setStrokeAttr = function(attr, val) {
    cur_shape[attr.replace('-', '_')] = val;
    var elems = [];
    function addNonG (e) {
      if (e.nodeName != 'g') {
        elems.push(e);
      }
    }
    var i = selectedElements.length;
    while (i--) {
      var elem = selectedElements[i];
      if (elem) {
        if (elem.tagName == 'g') {
          svgedit.utilities.walkTree(elem, function(e){if (e.nodeName!='g') {elems.push(e);}});
        }
        else {
          elems.push(elem);
        }
      }
    }
    if (elems.length > 0) {
      changeSelectedAttribute(attr, val, elems);
      call('changed', selectedElements);
    }
  };

// Function: getStyle
// Returns current style options
  this.getStyle = function() {
    return cur_shape;
  };

// Function: getOpacity
// Returns the current opacity
  this.getOpacity = function() {
    return cur_shape.opacity;
  };

// Function: setOpacity
// Sets the given opacity to the current selected elements
  this.setOpacity = function(val) {
    cur_shape.opacity = val;
    changeSelectedAttribute('opacity', val);
  };

// Function: getOpacity
// Returns the current fill opacity
  this.getFillOpacity = function() {
    return cur_shape.fill_opacity;
  };

// Function: getStrokeOpacity
// Returns the current stroke opacity
  this.getStrokeOpacity = function() {
    return cur_shape.stroke_opacity;
  };

// Function: setPaintOpacity
// Sets the current fill/stroke opacity
//
// Parameters:
// type - String with "fill" or "stroke"
// val - Float with the new opacity value
// preventUndo - Boolean indicating whether or not this should be an undoable action
  this.setPaintOpacity = function(type, val, preventUndo) {
    cur_shape[type + '_opacity'] = val;
    if (!preventUndo) {
      changeSelectedAttribute(type + '-opacity', val);
    }
    else {
      changeSelectedAttributeNoUndo(type + '-opacity', val);
    }
  };

// Function: getPaintOpacity
// Gets the current fill/stroke opacity
//
// Parameters:
// type - String with "fill" or "stroke"
  this.getPaintOpacity = function(type) {
    return type === 'fill' ? this.getFillOpacity() : this.getStrokeOpacity();
  };

// Function: getBlur
// Gets the stdDeviation blur value of the given element
//
// Parameters:
// elem - The element to check the blur value for
  this.getBlur = function(elem) {
    var val = 0;
//	var elem = selectedElements[0];

    if (elem) {
      var filter_url = elem.getAttribute('filter');
      if (filter_url) {
        var blur = svgedit.utilities.getElem(elem.id + '_blur');
        if (blur) {
          val = blur.firstChild.getAttribute('stdDeviation');
        }
      }
    }
    return val;
  };

  (function() {
    var cur_command = null;
    var filter = null;
    var filterHidden = false;

    // Function: setBlurNoUndo
    // Sets the stdDeviation blur value on the selected element without being undoable
    //
    // Parameters:
    // val - The new stdDeviation value
    canvas.setBlurNoUndo = function(val) {
      if (!filter) {
        canvas.setBlur(val);
        return;
      }
      if (val === 0) {
        // Don't change the StdDev, as that will hide the element.
        // Instead, just remove the value for "filter"
        changeSelectedAttributeNoUndo('filter', '');
        filterHidden = true;
      } else {
        var elem = selectedElements[0];
        if (filterHidden) {
          changeSelectedAttributeNoUndo('filter', 'url(#' + elem.id + '_blur)');
        }
        if (svgedit.browser.isWebkit()) {
          elem.removeAttribute('filter');
          elem.setAttribute('filter', 'url(#' + elem.id + '_blur)');
        }
        changeSelectedAttributeNoUndo('stdDeviation', val, [filter.firstChild]);
        canvas.setBlurOffsets(filter, val);
      }
    };

    function finishChange() {
      var bCmd = canvas.undoMgr.finishUndoableChange();
      cur_command.addSubCommand(bCmd);
      addCommandToHistory(cur_command);
      cur_command = null;
      filter = null;
    }

    // Function: setBlurOffsets
    // Sets the x, y, with, height values of the filter element in order to
    // make the blur not be clipped. Removes them if not neeeded
    //
    // Parameters:
    // filter - The filter DOM element to update
    // stdDev - The standard deviation value on which to base the offset size
    canvas.setBlurOffsets = function(filter, stdDev) {
      if (stdDev > 3) {
        // TODO: Create algorithm here where size is based on expected blur
        svgedit.utilities.assignAttributes(filter, {
          x: '-50%',
          y: '-50%',
          width: '200%',
          height: '200%'
        }, 100);
      } else {
        // Removing these attributes hides text in Chrome (see Issue 579)
        if (!svgedit.browser.isWebkit()) {
          filter.removeAttribute('x');
          filter.removeAttribute('y');
          filter.removeAttribute('width');
          filter.removeAttribute('height');
        }
      }
    };

    // Function: setBlur
    // Adds/updates the blur filter to the selected element
    //
    // Parameters:
    // val - Float with the new stdDeviation blur value
    // complete - Boolean indicating whether or not the action should be completed (to add to the undo manager)
    canvas.setBlur = function(val, complete) {
      if (cur_command) {
        finishChange();
        return;
      }

      // Looks for associated blur, creates one if not found
      var elem = selectedElements[0];
      var elem_id = elem.id;
      filter = svgedit.utilities.getElem(elem_id + '_blur');

      val -= 0;

      var batchCmd = new svgedit.history.BatchCommand();

      // Blur found!
      if (filter) {
        if (val === 0) {
          filter = null;
        }
      } else {
        // Not found, so create
        var newblur = addSvgElementFromJson({ 'element': 'feGaussianBlur',
          'attr': {
            'in': 'SourceGraphic',
            'stdDeviation': val
          }
        });

        filter = addSvgElementFromJson({ 'element': 'filter',
          'attr': {
            'id': elem_id + '_blur'
          }
        });

        filter.appendChild(newblur);
        svgedit.utilities.findDefs().appendChild(filter);

        batchCmd.addSubCommand(new svgedit.history.InsertElementCommand(filter));
      }

      var changes = {filter: elem.getAttribute('filter')};

      if (val === 0) {
        elem.removeAttribute('filter');
        batchCmd.addSubCommand(new svgedit.history.ChangeElementCommand(elem, changes));
        return;
      }

      changeSelectedAttribute('filter', 'url(#' + elem_id + '_blur)');
      batchCmd.addSubCommand(new svgedit.history.ChangeElementCommand(elem, changes));
      canvas.setBlurOffsets(filter, val);

      cur_command = batchCmd;
      canvas.undoMgr.beginUndoableChange('stdDeviation', [filter?filter.firstChild:null]);
      if (complete) {
        canvas.setBlurNoUndo(val);
        finishChange();
      }
    };
  }());

// Function: getBold
// Check whether selected element is bold or not
//
// Returns:
// Boolean indicating whether or not element is bold
  this.getBold = function() {
    // should only have one element selected
    var selected = selectedElements[0];
    if (selected != null && selected.tagName == 'text' &&
      selectedElements[1] == null)
    {
      return (selected.getAttribute('font-weight') == 'bold');
    }
    return false;
  };

// Function: setBold
// Make the selected element bold or normal
//
// Parameters:
// b - Boolean indicating bold (true) or normal (false)
  this.setBold = function(b) {
    var selected = selectedElements[0];
    if (selected != null && selected.tagName == 'text' &&
      selectedElements[1] == null)
    {
      changeSelectedAttribute('font-weight', b ? 'bold' : 'normal');
    }
    if (!selectedElements[0].textContent) {
      textActions.setCursor();
    }
  };

// Function: getItalic
// Check whether selected element is italic or not
//
// Returns:
// Boolean indicating whether or not element is italic
  this.getItalic = function() {
    var selected = selectedElements[0];
    if (selected != null && selected.tagName == 'text' &&
      selectedElements[1] == null)
    {
      return (selected.getAttribute('font-style') == 'italic');
    }
    return false;
  };

// Function: setItalic
// Make the selected element italic or normal
//
// Parameters:
// b - Boolean indicating italic (true) or normal (false)
  this.setItalic = function(i) {
    var selected = selectedElements[0];
    if (selected != null && selected.tagName == 'text' &&
      selectedElements[1] == null)
    {
      changeSelectedAttribute('font-style', i ? 'italic' : 'normal');
    }
    if (!selectedElements[0].textContent) {
      textActions.setCursor();
    }
  };

// Function: getFontFamily
// Returns the current font family
  this.getFontFamily = function() {
    return cur_text.font_family;
  };


// Function: setFontFamily
// Set the new font family
//
// Parameters:
// val - String with the new font family
  this.setFontFamily = function(val) {
    cur_text.font_family = val;
    changeSelectedAttribute('font-family', val);
    if (selectedElements[0] && !selectedElements[0].textContent) {
      textActions.setCursor();
    }
    runExtensions("setFontAttribute", {
      elem: selectedElements[0],
      attr: "font-family",
      value: val
    })
  };


  this.setTextAlign = function (val) {
    cur_text.font_family = val;
    changeSelectedAttribute('text-anchor', val);
    if (selectedElements[0] && !selectedElements[0].textContent) {
      textActions.setCursor();
    }
    runExtensions("setFontAttribute", {
      elem: selectedElements[0],
      attr: "text-anchor",
      value: val
    })
  }

// Function: setFontColor
// Set the new font color
//
// Parameters:
// val - String with the new font color
  this.setFontColor = function(val) {
    cur_text.fill = val;
    changeSelectedAttribute('fill', val);
  };

// Function: getFontColor
// Returns the current font color
  this.getFontColor = function() {
    return cur_text.fill;
  };

// Function: getFontSize
// Returns the current font size
  this.getFontSize = function() {
    return cur_text.font_size;
  };

  this.getExtensionFont = function (t) {
    return runGetExtensions("getFontAttribute", {elem: t})
  }
// Function: setFontSize
// Applies the given font size to the selected element
//
// Parameters:
// val - Float with the new font size
  this.setFontSize = function(val) {
    cur_text.font_size = val;
    changeSelectedAttribute('font-size', val);
    if (!selectedElements[0].textContent) {
      textActions.setCursor();
    }
  };

// Function: getText
// Returns the current text (textContent) of the selected element
  this.getText = function() {
    var selected = selectedElements[0];
    if (selected == null) { return ''; }
    return selected.textContent;
  };

// Function: setTextContent
// Updates the text element with the given string
//
// Parameters:
// val - String with the new text
  this.setTextContent = function(val) {
    changeSelectedAttribute('#text', val);
    textActions.init(val);
    textActions.setCursor();
  };

// Function: setImageURL
// Sets the new image URL for the selected image element. Updates its size if
// a new URL is given
//
// Parameters:
// val - String with the image URL/path
  this.setImageURL = function(val) {
    var elem = selectedElements[0];
    if (!elem) {return;}

    var attrs = $(elem).attr(['width', 'height']);
    var setsize = (!attrs.width || !attrs.height);

    var cur_href = getHref(elem);

    // Do nothing if no URL change or size change
    if (cur_href !== val) {
      setsize = true;
    } else if (!setsize) {return;}

    var batchCmd = new svgedit.history.BatchCommand('Change Image URL');

    setHref(elem, val);
    batchCmd.addSubCommand(new svgedit.history.ChangeElementCommand(elem, {
      '#href': cur_href
    }));

    if (setsize) {
      $(new Image()).load(function() {
        var changes = $(elem).attr(['width', 'height']);

        $(elem).attr({
          width: this.width,
          height: this.height
        });

        selectorManager.requestSelector(elem).resize();

        batchCmd.addSubCommand(new svgedit.history.ChangeElementCommand(elem, changes));
        addCommandToHistory(batchCmd);
        call('changed', [elem]);
      }).attr('src', val);
    } else {
      addCommandToHistory(batchCmd);
    }
  };

// Function: setLinkURL
// Sets the new link URL for the selected anchor element.
//
// Parameters:
// val - String with the link URL/path
  this.setLinkURL = function(val) {
    var elem = selectedElements[0];
    if (!elem) {return;}
    if (elem.tagName !== 'a') {
      // See if parent is an anchor
      var parents_a = $(elem).parents('a');
      if (parents_a.length) {
        elem = parents_a[0];
      } else {
        return;
      }
    }

    var cur_href = getHref(elem);

    if (cur_href === val) {return;}

    var batchCmd = new svgedit.history.BatchCommand('Change Link URL');

    setHref(elem, val);
    batchCmd.addSubCommand(new svgedit.history.ChangeElementCommand(elem, {
      '#href': cur_href
    }));

    addCommandToHistory(batchCmd);
  };


// Function: setRectRadius
// Sets the rx & ry values to the selected rect element to change its corner radius
//
// Parameters:
// val - The new radius
  this.setRectRadius = function(val) {
    var selected = selectedElements[0];
    if (selected != null && selected.tagName == 'rect') {
      var r = selected.getAttribute('rx');
      if (r != val) {
        selected.setAttribute('rx', val);
        selected.setAttribute('ry', val);
        addCommandToHistory(new svgedit.history.ChangeElementCommand(selected, {'rx':r, 'ry':r}, 'Radius'));
        call('changed', [selected]);
      }
    }
  };

// Function: makeHyperlink
// Wraps the selected element(s) in an anchor element or converts group to one
  this.makeHyperlink = function(url) {
    canvas.groupSelectedElements('a', url);

    // TODO: If element is a single "g", convert to "a"
    //	if (selectedElements.length > 1 && selectedElements[1]) {

  };

// Function: removeHyperlink
  this.removeHyperlink = function() {
    canvas.ungroupSelectedElement();
  };

// Group: Element manipulation

// Function: setSegType
// Sets the new segment type to the selected segment(s).
//
// Parameters:
// new_type - Integer with the new segment type
// See http://www.w3.org/TR/SVG/paths.html#InterfaceSVGPathSeg for list
  this.setSegType = function(new_type) {
    pathActions.setSegType(new_type);
  };

// TODO(codedread): Remove the getBBox argument and split this function into two.
// Function: convertToPath
// Convert selected element to a path, or get the BBox of an element-as-path
//
// Parameters:
// elem - The DOM element to be converted
// getBBox - Boolean on whether or not to only return the path's BBox
//
// Returns:
// If the getBBox flag is true, the resulting path's bounding box object.
// Otherwise the resulting path element is returned.
  this.convertToPath = function(elem, getBBox) {
    if (elem == null) {
      var elems = selectedElements;
      $.each(elems, function(i, elem) {
        if (elem) {canvas.convertToPath(elem);}
      });
      return;
    }
    if (getBBox) {
      return svgedit.utilities.getBBoxOfElementAsPath(elem, addSvgElementFromJson, pathActions)
    } else {
      // TODO: Why is this applying attributes from cur_shape, then inside utilities.convertToPath it's pulling addition attributes from elem?
      // TODO: If convertToPath is called with one elem, cur_shape and elem are probably the same; but calling with multiple is a bug or cool feature.
      var attrs = {
        'fill': cur_shape.fill,
        'fill-opacity': cur_shape.fill_opacity,
        'stroke': cur_shape.stroke,
        'stroke-width': cur_shape.stroke_width,
        'stroke-dasharray': cur_shape.stroke_dasharray,
        'stroke-linejoin': cur_shape.stroke_linejoin,
        'stroke-linecap': cur_shape.stroke_linecap,
        'stroke-opacity': cur_shape.stroke_opacity,
        'opacity': cur_shape.opacity,
        'visibility':'hidden'
      };
      return svgedit.utilities.convertToPath(elem, attrs, addSvgElementFromJson, pathActions, clearSelection, addToSelection, svgedit.history, addCommandToHistory);
    }
  };


// Function: changeSelectedAttributeNoUndo
// This function makes the changes to the elements. It does not add the change
// to the history stack.
//
// Parameters:
// attr - String with the attribute name
// newValue - String or number with the new attribute value
// elems - The DOM elements to apply the change to
  var changeSelectedAttributeNoUndo = function(attr, newValue, elems) {
    if (current_mode == 'pathedit') {
      // Editing node
      pathActions.moveNode(attr, newValue);
    }
    elems = elems || selectedElements;
    var i = elems.length;
    var no_xy_elems = ['g', 'polyline', 'path'];
    var good_g_attrs = ['transform', 'opacity', 'filter'];

    while (i--) {
      var elem = elems[i];
      if (elem == null) {continue;}

      // Set x,y vals on elements that don't have them
      if ((attr === 'x' || attr === 'y') && no_xy_elems.indexOf(elem.tagName) >= 0) {
        var bbox = getStrokedBBox([elem]);
        var diff_x = attr === 'x' ? newValue - bbox.x : 0;
        var diff_y = attr === 'y' ? newValue - bbox.y : 0;
        canvas.moveSelectedElements(diff_x*current_zoom, diff_y*current_zoom, true);
        continue;
      }

      // only allow the transform/opacity/filter attribute to change on <g> elements, slightly hacky
      // TODO: FIXME: This doesn't seem right. Where's the body of this if statement?
      if (elem.tagName === 'g' && good_g_attrs.indexOf(attr) >= 0) {}
      var oldval = attr === '#text' ? elem.textContent : elem.getAttribute(attr);
      if (oldval == null) {oldval = '';}
      if (oldval !== String(newValue)) {
        if (attr == '#text') {
          var old_w = svgedit.utilities.getBBox(elem).width;
          elem.textContent = newValue;

          // FF bug occurs on on rotated elements
          if (/rotate/.test(elem.getAttribute('transform'))) {
            elem = ffClone(elem);
          }

          // Hoped to solve the issue of moving text with text-anchor="start",
          // but this doesn't actually fix it. Hopefully on the right track, though. -Fyrd

//					var box=getBBox(elem), left=box.x, top=box.y, width=box.width,
//						height=box.height, dx = width - old_w, dy=0;
//					var angle = svgedit.utilities.getRotationAngle(elem, true);
//					if (angle) {
//						var r = Math.sqrt( dx*dx + dy*dy );
//						var theta = Math.atan2(dy,dx) - angle;
//						dx = r * Math.cos(theta);
//						dy = r * Math.sin(theta);
//
//						elem.setAttribute('x', elem.getAttribute('x')-dx);
//						elem.setAttribute('y', elem.getAttribute('y')-dy);
//					}

        } else if (attr == '#href') {
          setHref(elem, newValue);
        }
        else {elem.setAttribute(attr, newValue);}

        // Go into "select" mode for text changes
        // NOTE: Important that this happens AFTER elem.setAttribute() or else attributes like
        // font-size can get reset to their old value, ultimately by svgedit.updateContextPanel(),
        // after calling textActions.toSelectMode() below
        if (current_mode === 'textedit' && attr !== '#text' && elem.textContent.length) {
          textActions.toSelectMode(elem);
        }

//			if (i==0)
//				selectedBBoxes[0] = svgedit.utilities.getBBox(elem);
        // Use the Firefox ffClone hack for text elements with gradients or
        // where other text attributes are changed.
        if (svgedit.browser.isGecko() && elem.nodeName === 'text' && /rotate/.test(elem.getAttribute('transform'))) {
          if (String(newValue).indexOf('url') === 0 || (['font-size', 'font-family', 'x', 'y'].indexOf(attr) >= 0 && elem.textContent)) {
            elem = ffClone(elem);
          }
        }
        // Timeout needed for Opera & Firefox
        // codedread: it is now possible for this function to be called with elements
        // that are not in the selectedElements array, we need to only request a
        // selector if the element is in that array
        if (selectedElements.indexOf(elem) >= 0) {
          setTimeout(function() {
            // Due to element replacement, this element may no longer
            // be part of the DOM
            if (!elem.parentNode) {return;}
            selectorManager.requestSelector(elem).resize();
          }, 0);
        }
        // if this element was rotated, and we changed the position of this element
        // we need to update the rotational transform attribute
        var angle = svgedit.utilities.getRotationAngle(elem);
        if (angle != 0 && attr != 'transform') {
          var tlist = svgedit.transformlist.getTransformList(elem);
          var n = tlist.numberOfItems;
          while (n--) {
            var xform = tlist.getItem(n);
            if (xform.type == 4) {
              // remove old rotate
              tlist.removeItem(n);

              var box = svgedit.utilities.getBBox(elem);
              var center = svgedit.math.transformPoint(box.x+box.width/2, box.y+box.height/2, svgedit.math.transformListToTransform(tlist).matrix);
              var cx = center.x,
                cy = center.y;
              var newrot = svgroot.createSVGTransform();
              newrot.setRotate(angle, cx, cy);
              tlist.insertItemBefore(newrot, n);
              break;
            }
          }
        }
      } // if oldValue != newValue
    } // for each elem
  };

// Function: changeSelectedAttribute
// Change the given/selected element and add the original value to the history stack
// If you want to change all selectedElements, ignore the elems argument.
// If you want to change only a subset of selectedElements, then send the
// subset to this function in the elems argument.
//
// Parameters:
// attr - String with the attribute name
// newValue - String or number with the new attribute value
// elems - The DOM elements to apply the change to
  var changeSelectedAttribute = this.changeSelectedAttribute = function(attr, val, elems) {
    elems = elems || selectedElements;
    canvas.undoMgr.beginUndoableChange(attr, elems);
    var i = elems.length;

    changeSelectedAttributeNoUndo(attr, val, elems);

    var batchCmd = canvas.undoMgr.finishUndoableChange();
    if (!batchCmd.isEmpty()) {
      addCommandToHistory(batchCmd);
    }
  };

// Function: deleteSelectedElements
// Removes all selected elements from the DOM and adds the change to the
// history stack
  this.deleteSelectedElements = function() {
    var i;
    var batchCmd = new svgedit.history.BatchCommand('Delete Elements');
    var len = selectedElements.length;
    var selectedCopy = []; //selectedElements is being deleted

    for (i = 0; i < len; ++i) {
      var selected = selectedElements[i];
      if (selected == null) {break;}

      var parent = selected.parentNode;
      var t = selected;

      // this will unselect the element and remove the selectedOutline
      selectorManager.releaseSelector(t);

      // Remove the path if present.
      svgedit.path.removePath_(t.id);

      // Get the parent if it's a single-child anchor
      if (parent.tagName === 'a' && parent.childNodes.length === 1) {
        t = parent;
        parent = parent.parentNode;
      }

      var nextSibling = t.nextSibling;
      var elem = parent.removeChild(t);
      selectedCopy.push(selected); //for the copy
      batchCmd.addSubCommand(new RemoveElementCommand(elem, nextSibling, parent));
    }
    selectedElements = [];

    if (!batchCmd.isEmpty()) {addCommandToHistory(batchCmd);}
    call('changed', selectedCopy);
    clearSelection();
  };

// Function: cutSelectedElements
// Removes all selected elements from the DOM and adds the change to the
// history stack. Remembers removed elements on the clipboard
  this.cutSelectedElements = function() {
    svgCanvas.copySelectedElements();
    svgCanvas.deleteSelectedElements();
  };

// Function: copySelectedElements
// Remembers the current selected elements on the clipboard
  this.copySelectedElements = function() {
    localStorage.setItem('svgedit_clipboard', JSON.stringify(
      selectedElements.map(function(x){ return getJsonFromSvgElement(x) })
    ));

    $('#cmenu_canvas').enableContextMenuItems('#paste,#paste_in_place');
  };

  this.pasteElements = function(type, x, y) {
    var cb = JSON.parse(localStorage.getItem('svgedit_clipboard'));
    var len = cb.length;
    if (!len) {return;}

    var pasted = [];
    var batchCmd = new svgedit.history.BatchCommand('Paste elements');
    var drawing = getCurrentDrawing();
    var changedIDs = {};

    // Recursively replace IDs and record the changes
    function checkIDs(elem) {
      if(elem.attr && elem.attr.id) {
        changedIDs[elem.attr.id] = getNextId();
        elem.attr.id = changedIDs[elem.attr.id];
      }
      if(elem.children) elem.children.forEach(checkIDs);
    }
    cb.forEach(checkIDs);

    // Give extensions like the connector extension a chance to reflect new IDs and remove invalid elements
    runExtensions('IDsUpdated', {elems: cb, changes: changedIDs}, true).forEach(function(extChanges){
      if(!extChanges || !('remove' in extChanges)) return;

      extChanges.remove.forEach(function(removeID){
        cb = cb.filter(function(cbItem){
          return cbItem.attr.id != removeID;

        });
      });
    });

    // Move elements to lastClickPoint
    while (len--) {
      var elem = cb[len];
      if (!elem) {continue;}

      var copy = addSvgElementFromJson(elem);
      pasted.push(copy);
      batchCmd.addSubCommand(new svgedit.history.InsertElementCommand(copy));

      restoreRefElems(copy);
    }

    selectOnly(pasted);

    if (type !== 'in_place') {

      var ctr_x, ctr_y;

      if (!type) {
        ctr_x = lastClickPoint.x;
        ctr_y = lastClickPoint.y;
      } else if (type === 'point') {
        ctr_x = x;
        ctr_y = y;
      }

      var bbox = getStrokedBBox(pasted);
      var cx = ctr_x - (bbox.x + bbox.width/2),
        cy = ctr_y - (bbox.y + bbox.height/2),
        dx = [],
        dy = [];

      $.each(pasted, function(i, item) {
        dx.push(cx);
        dy.push(cy);
      });

      var cmd = canvas.moveSelectedElements(dx, dy, false);
      if(cmd) batchCmd.addSubCommand(cmd);
    }

    addCommandToHistory(batchCmd);
    call('changed', pasted);
  };

// Function: groupSelectedElements
// Wraps all the selected elements in a group (g) element

// Parameters:
// type - type of element to group into, defaults to <g>
  this.groupSelectedElements = function(type, urlArg) {
    if (!type) {type = 'g';}
    var cmd_str = '';

    switch (type) {
      case 'a':
        cmd_str = 'Make hyperlink';
        var url = '';
        if (arguments.length > 1) {
          url = urlArg;
        }
        break;
      default:
        type = 'g';
        cmd_str = 'Group Elements';
        break;
    }

    var batchCmd = new svgedit.history.BatchCommand(cmd_str);

    // create and insert the group element
    var g = addSvgElementFromJson({
      'element': type,
      'attr': {
        'id': getNextId()
      }
    });
    if (type === 'a') {
      setHref(g, url);
    }
    batchCmd.addSubCommand(new svgedit.history.InsertElementCommand(g));

    // now move all children into the group
    var i = selectedElements.length;
    while (i--) {
      var elem = selectedElements[i];
      if (elem == null) {continue;}

      if (elem.parentNode.tagName === 'a' && elem.parentNode.childNodes.length === 1) {
        elem = elem.parentNode;
      }

      var oldNextSibling = elem.nextSibling;
      var oldParent = elem.parentNode;
      g.appendChild(elem);
      batchCmd.addSubCommand(new svgedit.history.MoveElementCommand(elem, oldNextSibling, oldParent));
    }
    if (!batchCmd.isEmpty()) {addCommandToHistory(batchCmd);}

    // update selection
    selectOnly([g], true);
  };


// Function: pushGroupProperties
// Pushes all appropriate parent group properties down to its children, then
// removes them from the group
  var pushGroupProperties = this.pushGroupProperties = function(g, undoable) {

    var children = g.childNodes;
    var len = children.length;
    var xform = g.getAttribute('transform');

    var glist = svgedit.transformlist.getTransformList(g);
    var m = svgedit.math.transformListToTransform(glist).matrix;

    var batchCmd = new svgedit.history.BatchCommand('Push group properties');

    // TODO: get all fill/stroke properties from the group that we are about to destroy
    // "fill", "fill-opacity", "fill-rule", "stroke", "stroke-dasharray", "stroke-dashoffset",
    // "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity",
    // "stroke-width"
    // and then for each child, if they do not have the attribute (or the value is 'inherit')
    // then set the child's attribute

    var i = 0;
    var gangle = svgedit.utilities.getRotationAngle(g);

    var gattrs = $(g).attr(['filter', 'opacity']);
    var gfilter, gblur, changes;
    var drawing = getCurrentDrawing();

    for (i = 0; i < len; i++) {
      var elem = children[i];

      if (elem.nodeType !== 1) {continue;}

      if (gattrs.opacity !== null && gattrs.opacity !== 1) {
        var c_opac = elem.getAttribute('opacity') || 1;
        var new_opac = Math.round((elem.getAttribute('opacity') || 1) * gattrs.opacity * 100)/100;
        changeSelectedAttribute('opacity', new_opac, [elem]);
      }

      if (gattrs.filter) {
        var cblur = this.getBlur(elem);
        var orig_cblur = cblur;
        if (!gblur) {gblur = this.getBlur(g);}
        if (cblur) {
          // Is this formula correct?
          cblur = Number(gblur) + Number(cblur);
        } else if (cblur === 0) {
          cblur = gblur;
        }

        // If child has no current filter, get group's filter or clone it.
        if (!orig_cblur) {
          // Set group's filter to use first child's ID
          if (!gfilter) {
            gfilter = svgedit.utilities.getRefElem(gattrs.filter);
          } else {
            // Clone the group's filter
            gfilter = drawing.copyElem(gfilter);
            svgedit.utilities.findDefs().appendChild(gfilter);
          }
        } else {
          gfilter = svgedit.utilities.getRefElem(elem.getAttribute('filter'));
        }

        // Change this in future for different filters
        var suffix = (gfilter.firstChild.tagName === 'feGaussianBlur')?'blur':'filter';
        gfilter.id = elem.id + '_' + suffix;
        changeSelectedAttribute('filter', 'url(#' + gfilter.id + ')', [elem]);

        // Update blur value
        if (cblur) {
          changeSelectedAttribute('stdDeviation', cblur, [gfilter.firstChild]);
          canvas.setBlurOffsets(gfilter, cblur);
        }
      }

      var chtlist = svgedit.transformlist.getTransformList(elem);

      // Don't process gradient transforms
      if (~elem.tagName.indexOf('Gradient')) {chtlist = null;}

      // Hopefully not a problem to add this. Necessary for elements like <desc/>
      if (!chtlist) {continue;}

      // Apparently <defs> can get get a transformlist, but we don't want it to have one!
      if (elem.tagName === 'defs') {continue;}

      if (glist.numberOfItems) {
        // TODO: if the group's transform is just a rotate, we can always transfer the
        // rotate() down to the children (collapsing consecutive rotates and factoring
        // out any translates)
        if (gangle && glist.numberOfItems == 1) {
          // [Rg] [Rc] [Mc]
          // we want [Tr] [Rc2] [Mc] where:
          //	- [Rc2] is at the child's current center but has the
          // sum of the group and child's rotation angles
          //	- [Tr] is the equivalent translation that this child
          // undergoes if the group wasn't there

          // [Tr] = [Rg] [Rc] [Rc2_inv]

          // get group's rotation matrix (Rg)
          var rgm = glist.getItem(0).matrix;

          // get child's rotation matrix (Rc)
          var rcm = svgroot.createSVGMatrix();
          var cangle = svgedit.utilities.getRotationAngle(elem);
          if (cangle) {
            rcm = chtlist.getItem(0).matrix;
          }

          // get child's old center of rotation
          var cbox = svgedit.utilities.getBBox(elem);
          var ceqm = svgedit.math.transformListToTransform(chtlist).matrix;
          var coldc = svgedit.math.transformPoint(cbox.x+cbox.width/2, cbox.y+cbox.height/2, ceqm);

          // sum group and child's angles
          var sangle = gangle + cangle;

          // get child's rotation at the old center (Rc2_inv)
          var r2 = svgroot.createSVGTransform();
          r2.setRotate(sangle, coldc.x, coldc.y);

          // calculate equivalent translate
          var trm = svgedit.math.matrixMultiply(rgm, rcm, r2.matrix.inverse());

          // set up tlist
          if (cangle) {
            chtlist.removeItem(0);
          }

          if (sangle) {
            if (chtlist.numberOfItems) {
              chtlist.insertItemBefore(r2, 0);
            } else {
              chtlist.appendItem(r2);
            }
          }

          if (trm.e || trm.f) {
            var tr = svgroot.createSVGTransform();
            tr.setTranslate(trm.e, trm.f);
            if (chtlist.numberOfItems) {
              chtlist.insertItemBefore(tr, 0);
            } else {
              chtlist.appendItem(tr);
            }
          }
        } else { // more complicated than just a rotate

          // transfer the group's transform down to each child and then
          // call svgedit.recalculate.recalculateDimensions()
          var oldxform = elem.getAttribute('transform');
          changes = {};
          changes.transform = oldxform || '';

          var newxform = svgroot.createSVGTransform();

          // [ gm ] [ chm ] = [ chm ] [ gm' ]
          // [ gm' ] = [ chm_inv ] [ gm ] [ chm ]
          var chm = svgedit.math.transformListToTransform(chtlist).matrix,
            chm_inv = chm.inverse();
          var gm = svgedit.math.matrixMultiply( chm_inv, m, chm );
          newxform.setMatrix(gm);
          chtlist.appendItem(newxform);
        }
        var cmd = svgedit.recalculate.recalculateDimensions(elem);
        if (cmd) {batchCmd.addSubCommand(cmd);}
      }
    }


    // remove transform and make it undo-able
    if (xform) {
      changes = {};
      changes.transform = xform;
      g.setAttribute('transform', '');
      g.removeAttribute('transform');
      batchCmd.addSubCommand(new svgedit.history.ChangeElementCommand(g, changes));
    }

    if (undoable && !batchCmd.isEmpty()) {
      return batchCmd;
    }
  };


// Function: ungroupSelectedElement
// Unwraps all the elements in a selected group (g) element. This requires
// significant recalculations to apply group's transforms, etc to its children
  this.ungroupSelectedElement = function() {
    var g = selectedElements[0];
    if (!g) {
      return;
    }
    if ($(g).data('gsvg') || $(g).data('symbol')) {
      // Is svg, so actually convert to group
      convertToGroup(g);
      return;
    }
    if (g.tagName === 'use') {
      // Somehow doesn't have data set, so retrieve
      var symbol = svgedit.utilities.getElem(getHref(g).substr(1));
      $(g).data('symbol', symbol).data('ref', symbol);
      convertToGroup(g);
      return;
    }
    var parents_a = $(g).parents('a');
    if (parents_a.length) {
      g = parents_a[0];
    }

    // Look for parent "a"
    if (g.tagName === 'g' || g.tagName === 'a') {

      var batchCmd = new svgedit.history.BatchCommand('Ungroup Elements');
      var cmd = pushGroupProperties(g, true);
      if (cmd) {batchCmd.addSubCommand(cmd);}

      var parent = g.parentNode;
      var anchor = g.nextSibling;
      var children = new Array(g.childNodes.length);

      var i = 0;

      while (g.firstChild) {
        var elem = g.firstChild;
        var oldNextSibling = elem.nextSibling;
        var oldParent = elem.parentNode;

        // Remove child title elements
        if (elem.tagName === 'title') {
          var nextSibling = elem.nextSibling;
          batchCmd.addSubCommand(new svgedit.history.RemoveElementCommand(elem, nextSibling, oldParent));
          oldParent.removeChild(elem);
          continue;
        }

        children[i++] = elem = parent.insertBefore(elem, anchor);
        batchCmd.addSubCommand(new svgedit.history.MoveElementCommand(elem, oldNextSibling, oldParent));
      }

      // remove the group from the selection
      clearSelection();

      // delete the group element (but make undo-able)
      var gNextSibling = g.nextSibling;
      g = parent.removeChild(g);
      batchCmd.addSubCommand(new svgedit.history.RemoveElementCommand(g, gNextSibling, parent));

      if (!batchCmd.isEmpty()) {addCommandToHistory(batchCmd);}

      // update selection
      addToSelection(children);
    }
  };

// Function: moveToTopSelectedElement
// Repositions the selected element to the bottom in the DOM to appear on top of
// other elements
  this.moveToTopSelectedElement = function() {
    var selected = selectedElements[0];
    if (selected != null) {
      var t = selected;
      var oldParent = t.parentNode;
      var oldNextSibling = t.nextSibling;
      t = t.parentNode.appendChild(t);
      // If the element actually moved position, add the command and fire the changed
      // event handler.
      if (oldNextSibling != t.nextSibling) {
        addCommandToHistory(new svgedit.history.MoveElementCommand(t, oldNextSibling, oldParent, 'top'));
        call('changed', [t]);
      }
    }
  };

// Function: moveToBottomSelectedElement
// Repositions the selected element to the top in the DOM to appear under
// other elements
  this.moveToBottomSelectedElement = function() {
    var selected = selectedElements[0];
    if (selected != null) {
      var t = selected;
      var oldParent = t.parentNode;
      var oldNextSibling = t.nextSibling;
      var firstChild = t.parentNode.firstChild;
      if (firstChild.tagName == 'title') {
        firstChild = firstChild.nextSibling;
      }
      // This can probably be removed, as the defs should not ever apppear
      // inside a layer group
      if (firstChild.tagName == 'defs') {
        firstChild = firstChild.nextSibling;
      }
      t = t.parentNode.insertBefore(t, firstChild);
      // If the element actually moved position, add the command and fire the changed
      // event handler.
      if (oldNextSibling != t.nextSibling) {
        addCommandToHistory(new svgedit.history.MoveElementCommand(t, oldNextSibling, oldParent, 'bottom'));
        call('changed', [t]);
      }
    }
  };

// Function: moveUpDownSelected
// Moves the select element up or down the stack, based on the visibly
// intersecting elements
//
// Parameters:
// dir - String that's either 'Up' or 'Down'
  this.moveUpDownSelected = function(dir) {
    var selected = selectedElements[0];
    if (!selected) {return;}

    curBBoxes = [];
    var closest, found_cur;
    // jQuery sorts this list
    var list = $(getIntersectionList(getStrokedBBox([selected]))).toArray();
    if (dir == 'Down') {list.reverse();}

    $.each(list, function() {
      if (!found_cur) {
        if (this == selected) {
          found_cur = true;
        }
        return;
      }
      closest = this;
      return false;
    });
    if (!closest) {return;}

    var t = selected;
    var oldParent = t.parentNode;
    var oldNextSibling = t.nextSibling;
    $(closest)[dir == 'Down'?'before':'after'](t);
    // If the element actually moved position, add the command and fire the changed
    // event handler.
    if (oldNextSibling != t.nextSibling) {
      addCommandToHistory(new svgedit.history.MoveElementCommand(t, oldNextSibling, oldParent, 'Move ' + dir));
      call('changed', [t]);
    }
  };

// Function: moveSelectedElements
// Moves selected elements on the X/Y axis
//
// Parameters:
// dx - Float with the distance to move on the x-axis
// dy - Float with the distance to move on the y-axis
// undoable - Boolean indicating whether or not the action should be undoable
//
// Returns:
// Batch command for the move
  this.moveSelectedElements = function(dx, dy, undoable) {
    // if undoable is not sent, default to true
    // if single values, scale them to the zoom
    if (dx.constructor != Array) {
      dx /= current_zoom;
      dy /= current_zoom;
    }
    undoable = undoable || true;
    var batchCmd = new svgedit.history.BatchCommand('position');
    var i = selectedElements.length;
    while (i--) {
      var selected = selectedElements[i];
      if (selected != null) {
//			if (i==0)
//				selectedBBoxes[0] = svgedit.utilities.getBBox(selected);

//			var b = {};
//			for (var j in selectedBBoxes[i]) b[j] = selectedBBoxes[i][j];
//			selectedBBoxes[i] = b;

        var xform = svgroot.createSVGTransform();
        var tlist = svgedit.transformlist.getTransformList(selected);

        // dx and dy could be arrays
        if (dx.constructor == Array) {
//				if (i==0) {
//					selectedBBoxes[0].x += dx[0];
//					selectedBBoxes[0].y += dy[0];
//				}
          xform.setTranslate(dx[i], dy[i]);
        } else {
//				if (i==0) {
//					selectedBBoxes[0].x += dx;
//					selectedBBoxes[0].y += dy;
//				}
          xform.setTranslate(dx, dy);
        }

        if (tlist.numberOfItems) {
          tlist.insertItemBefore(xform, 0);
        } else {
          tlist.appendItem(xform);
        }

        var cmd = svgedit.recalculate.recalculateDimensions(selected);
        if (cmd) {
          batchCmd.addSubCommand(cmd);
        }

        selectorManager.requestSelector(selected).resize();
      }
    }
    if (!batchCmd.isEmpty()) {
      if (undoable) {
        addCommandToHistory(batchCmd);
      }
      call('changed', selectedElements);
      return batchCmd;
    }
  };

// Function: cloneSelectedElements
// Create deep DOM copies (clones) of all selected elements and move them slightly
// from their originals
  this.cloneSelectedElements = function(x, y) {
    var i, elem;
    var batchCmd = new svgedit.history.BatchCommand('Clone Elements');
    // find all the elements selected (stop at first null)
    var len = selectedElements.length;
    function sortfunction(a, b){
      return ($(b).index() - $(a).index()); //causes an array to be sorted numerically and ascending
    }
    selectedElements.sort(sortfunction);
    for (i = 0; i < len; ++i) {
      elem = selectedElements[i];
      if (elem == null) {break;}
    }
    // use slice to quickly get the subset of elements we need
    var copiedElements = selectedElements.slice(0, i);
    this.clearSelection(true);
    // note that we loop in the reverse way because of the way elements are added
    // to the selectedElements array (top-first)
    var drawing = getCurrentDrawing();
    i = copiedElements.length;
    while (i--) {
      // clone each element and replace it within copiedElements
      elem = copiedElements[i] = drawing.copyElem(copiedElements[i]);
      (current_group || drawing.getCurrentLayer()).appendChild(elem);
      batchCmd.addSubCommand(new svgedit.history.InsertElementCommand(elem));
    }

    if (!batchCmd.isEmpty()) {
      addToSelection(copiedElements.reverse()); // Need to reverse for correct selection-adding
      this.moveSelectedElements(x, y, false);
      addCommandToHistory(batchCmd);
    }
  };

// Function: alignSelectedElements
// Aligns selected elements
//
// Parameters:
// type - String with single character indicating the alignment type
// relative_to - String that must be one of the following:
// "selected", "largest", "smallest", "page"
  this.alignSelectedElements = function(type, relative_to) {
    var i, elem;
    var bboxes = [], angles = [];
    var minx = Number.MAX_VALUE, maxx = Number.MIN_VALUE, miny = Number.MAX_VALUE, maxy = Number.MIN_VALUE;
    var curwidth = Number.MIN_VALUE, curheight = Number.MIN_VALUE;
    var len = selectedElements.length;
    if (!len) {return;}
    for (i = 0; i < len; ++i) {
      if (selectedElements[i] == null) {break;}
      elem = selectedElements[i];
      bboxes[i] = getStrokedBBox([elem]);

      // now bbox is axis-aligned and handles rotation
      switch (relative_to) {
        case 'smallest':
          if ( (type == 'l' || type == 'c' || type == 'r') && (curwidth == Number.MIN_VALUE || curwidth > bboxes[i].width) ||
            (type == 't' || type == 'm' || type == 'b') && (curheight == Number.MIN_VALUE || curheight > bboxes[i].height) ) {
            minx = bboxes[i].x;
            miny = bboxes[i].y;
            maxx = bboxes[i].x + bboxes[i].width;
            maxy = bboxes[i].y + bboxes[i].height;
            curwidth = bboxes[i].width;
            curheight = bboxes[i].height;
          }
          break;
        case 'largest':
          if ( (type == 'l' || type == 'c' || type == 'r') && (curwidth == Number.MIN_VALUE || curwidth < bboxes[i].width) ||
            (type == 't' || type == 'm' || type == 'b') && (curheight == Number.MIN_VALUE || curheight < bboxes[i].height) ) {
            minx = bboxes[i].x;
            miny = bboxes[i].y;
            maxx = bboxes[i].x + bboxes[i].width;
            maxy = bboxes[i].y + bboxes[i].height;
            curwidth = bboxes[i].width;
            curheight = bboxes[i].height;
          }
          break;
        default: // 'selected'
          if (bboxes[i].x < minx) {minx = bboxes[i].x;}
          if (bboxes[i].y < miny) {miny = bboxes[i].y;}
          if (bboxes[i].x + bboxes[i].width > maxx) {maxx = bboxes[i].x + bboxes[i].width;}
          if (bboxes[i].y + bboxes[i].height > maxy) {maxy = bboxes[i].y + bboxes[i].height;}
          break;
      }
    } // loop for each element to find the bbox and adjust min/max

    if (relative_to == 'page') {
      minx = 0;
      miny = 0;
      maxx = canvas.contentW;
      maxy = canvas.contentH;
    }

    var dx = new Array(len);
    var dy = new Array(len);
    for (i = 0; i < len; ++i) {
      if (selectedElements[i] == null) {break;}
      elem = selectedElements[i];
      var bbox = bboxes[i];
      dx[i] = 0;
      dy[i] = 0;
      switch (type) {
        case 'l': // left (horizontal)
          dx[i] = minx - bbox.x;
          break;
        case 'c': // center (horizontal)
          dx[i] = (minx+maxx)/2 - (bbox.x + bbox.width/2);
          break;
        case 'r': // right (horizontal)
          dx[i] = maxx - (bbox.x + bbox.width);
          break;
        case 't': // top (vertical)
          dy[i] = miny - bbox.y;
          break;
        case 'm': // middle (vertical)
          dy[i] = (miny+maxy)/2 - (bbox.y + bbox.height/2);
          break;
        case 'b': // bottom (vertical)
          dy[i] = maxy - (bbox.y + bbox.height);
          break;
      }
    }
    this.moveSelectedElements(dx, dy);
  };

// Group: Additional editor tools

  this.contentW = getResolution().w;
  this.contentH = getResolution().h;

// Function: updateCanvas
// Updates the editor canvas width/height/position after a zoom has occurred
//
// Parameters:
// w - Float with the new width
// h - Float with the new height
//
// Returns:
// Object with the following values:
// * x - The canvas' new x coordinate
// * y - The canvas' new y coordinate
// * old_x - The canvas' old x coordinate
// * old_y - The canvas' old y coordinate
// * d_x - The x position difference
// * d_y - The y position difference
  this.updateCanvas = function(w, h) {
    svgroot.setAttribute('width', w);
    svgroot.setAttribute('height', h);
    var bg = $('#canvasBackground')[0];
    var old_x = svgcontent.getAttribute('x');
    var old_y = svgcontent.getAttribute('y');
    var x = (w/2 - this.contentW*current_zoom/2);
    var y = (h/2 - this.contentH*current_zoom/2);

    svgedit.utilities.assignAttributes(svgcontent, {
      width: this.contentW*current_zoom,
      height: this.contentH*current_zoom,
      'x': x,
      'y': y,
      'viewBox' : '0 0 ' + this.contentW + ' ' + this.contentH
    });

    svgedit.utilities.assignAttributes(bg, {
      width: svgcontent.getAttribute('width'),
      height: svgcontent.getAttribute('height'),
      x: x,
      y: y
    });

    var bg_img = svgedit.utilities.getElem('background_image');
    if (bg_img) {
      svgedit.utilities.assignAttributes(bg_img, {
        'width': '100%',
        'height': '100%'
      });
    }

    selectorManager.selectorParentGroup.setAttribute('transform', 'translate(' + x + ',' + y + ')');
    runExtensions('canvasUpdated', {new_x:x, new_y:y, old_x:old_x, old_y:old_y, d_x:x - old_x, d_y:y - old_y});
    return {x:x, y:y, old_x:old_x, old_y:old_y, d_x:x - old_x, d_y:y - old_y};
  };

// Function: setBackground
// Set the background of the editor (NOT the actual document)
//
// Parameters:
// color - String with fill color to apply
// url - URL or path to image to use
  this.setBackground = function(color, url) {
    var bg = svgedit.utilities.getElem('canvasBackground');
    var border = $(bg).find('rect')[0];
    var bg_img = svgedit.utilities.getElem('background_image');
    border.setAttribute('fill', color);
    if (url) {
      if (!bg_img) {
        bg_img = svgdoc.createElementNS(NS.SVG, 'image');
        svgedit.utilities.assignAttributes(bg_img, {
          'id': 'background_image',
          'width': '100%',
          'height': '100%',
          'preserveAspectRatio': 'xMinYMin',
          'style':'pointer-events:none'
        });
      }
      setHref(bg_img, url);
      bg.appendChild(bg_img);
    } else if (bg_img) {
      bg_img.parentNode.removeChild(bg_img);
    }
  };

// Function: cycleElement
// Select the next/previous element within the current layer
//
// Parameters:
// next - Boolean where true = next and false = previous element
  this.cycleElement = function(next) {
    var num;
    var cur_elem = selectedElements[0];
    var elem = false;
    var all_elems = getVisibleElements(current_group || getCurrentDrawing().getCurrentLayer());
    if (!all_elems.length) {return;}
    if (cur_elem == null) {
      num = next?all_elems.length-1:0;
      elem = all_elems[num];
    } else {
      var i = all_elems.length;
      while (i--) {
        if (all_elems[i] == cur_elem) {
          num = next ? i - 1 : i + 1;
          if (num >= all_elems.length) {
            num = 0;
          } else if (num < 0) {
            num = all_elems.length-1;
          }
          elem = all_elems[num];
          break;
        }
      }
    }
    selectOnly([elem], true);
    call('selected', selectedElements);
  };

  this.getExtensionMember = function (t, e) {
    var i = [];
    return $.each(extensions, function (r, n) {
      n && t in n && i.push(n[t](e))
    }), i
  }

  this.clear();


// DEPRECATED: getPrivateMethods
// Since all methods are/should be public somehow, this function should be removed

// Being able to access private methods publicly seems wrong somehow,
// but currently appears to be the best way to allow testing and provide
// access to them to plugins.
  this.getPrivateMethods = function() {
    var obj = {
      addCommandToHistory: addCommandToHistory,
      setGradient: setGradient,
      addSvgElementFromJson: addSvgElementFromJson,
      addSvgGroupFromJson: addSvgGroupFromJson,
      assignAttributes: assignAttributes,
      BatchCommand: BatchCommand,
      call: call,
      ChangeElementCommand: ChangeElementCommand,
      copyElem: function(elem) {return getCurrentDrawing().copyElem(elem)},
      ffClone: ffClone,
      findDefs: findDefs,
      findDuplicateGradient: findDuplicateGradient,
      getElem: getElem,
      getId: getId,
      getIntersectionList: getIntersectionList,
      getMouseTarget: getMouseTarget,
      getNextId: getNextId,
      getPathBBox: getPathBBox,
      getUrlFromAttr: getUrlFromAttr,
      hasMatrixTransform: hasMatrixTransform,
      identifyLayers: identifyLayers,
      InsertElementCommand: InsertElementCommand,
      isIdentity: svgedit.math.isIdentity,
      logMatrix: logMatrix,
      matrixMultiply: matrixMultiply,
      MoveElementCommand: MoveElementCommand,
      preventClickDefault: svgedit.utilities.preventClickDefault,
      recalculateAllSelectedDimensions: recalculateAllSelectedDimensions,
      recalculateDimensions: recalculateDimensions,
      remapElement: remapElement,
      RemoveElementCommand: RemoveElementCommand,
      removeUnusedDefElems: removeUnusedDefElems,
      round: round,
      runExtensions: runExtensions,
      sanitizeSvg: sanitizeSvg,
      SVGEditTransformList: svgedit.transformlist.SVGTransformList,
      toString: toString,
      transformBox: svgedit.math.transformBox,
      transformListToTransform: transformListToTransform,
      transformPoint: transformPoint,
      walkTree: svgedit.utilities.walkTree
    };
    return obj;
  };

};
console.log("svg-editor V2.8.1.026");
var mysvgeditor = {
  initSvgEditor: function (e, t, n, o, i, a, r, l) {
    window.svgEditor = function (e) {
      function s(t, n) {
        var o = !1 !== svgCanvasInst.setSvgString(t);
        n = n || e.noop, o ? n(!0) : e.alert(uiStrings.notification.errorLoadingSVG, function () {
          n(!1)
        })
      }

      var editor = {};
        e(document).unbind("keydown"), editor.tool_scale = 1, editor.exportWindowCt = 0, editor.langChanged = !1, editor.showSaveWarning = !1, editor.storagePromptClosed = !1,
        editor.extensionLoadedCallback = n,
        editor.onSelectedElement = t,editor
        editor.changeColor = o,
        editor.onGaugeAdded = i,
        editor.onGaugeResized = r,
        editor.onGaugeRemoved = a,
        editor.onGaugeCopyPaste = l, editor.currentExtensionsInteractivityType = [], editor.currentExtensionsPrefixIdType = [], editor.shapesGrps = {}, editor.shapesList = [];


      var svgCanvasInst, d, prefixes = ["VAL_", "HXI_", "HXB_", "HXS_"], svgeditUtilites = svgedit.utilities, svgeditShapes = svgedit.shapes;
      return isReady = !1, customExportImage = !1, customExportPDF = !1, callbacks = [], defaultPrefs = {
        lang: "",
        iconsize: "",
        bkgd_color: "#FFF",
        bkgd_url: "",
        img_save: "embed",
        save_notice_done: !1,
        export_notice_done: !1
      }, curPrefs = {}, curConfig = {
        extensions: [],
        allowedOrigins: [],
        text: {
          font_size: '14',
          font_family: "sans-serif",
          text_anchor: "middle"
        }
      }, defaultExtensions = ["ext-overview_window.js", "ext-markers.js", "ext-connector.js", "ext-eyedropper.js", "ext-imagelib.js", "ext-grid.js", "ext-polygon.js", "ext-panning.js", "ext-storage.js"], defaultConfig = {
        canvasName: "default",
        canvas_expansion: 3,
        initFill: {color: "FF0000", opacity: 1},
        initStroke: {width: 1, color: "000000", opacity: 1},
        initOpacity: 1,
        colorPickerCSS: null,
        initTool: "select",
        exportWindowType: "new",
        wireframe: !1,
        showlayers: !1,
        no_save_warning: !1,
        imgPath: "assets/images/",
        langPath: "locale/",
        extPath: "extensions/",
        jGraduatePath: "jgraduate/images/",
        shapesPath: "assets/lib/svgeditor/shapes/",
        dimensions: [640, 480],
        gridSnapping: !0,
        gridColor: "#000",
        baseUnit: "px",
        snappingStep: 2,
        showRulers: !0,
        preventAllURLConfig: !1,
        preventURLContentLoading: !1,
        lockExtensions: !1,
        noDefaultExtensions: !1,
        showGrid: !1,
        noStorageOnLoad: !1,
        forceStorage: !1,
        emptyStorageOnDecline: !1
      }, uiStrings = editor.uiStrings = {
        common: {
          ok: "OK",
          cancel: "Cancel",
          key_up: "Up",
          key_down: "Down",
          key_backspace: "Backspace",
          key_del: "Del"
        }, layers: {layer: "Layer"}, notification: {
          invalidAttrValGiven: "Invalid value given",
          noContentToFitTo: "No content to fit to",
          dupeLayerName: "There is already a layer named that!",
          enterUniqueLayerName: "Please enter a unique layer name",
          enterNewLayerName: "Please enter the new layer name",
          layerHasThatName: "Layer already has that name",
          QmoveElemsToLayer: "Move selected elements to layer '%s'?",
          QwantToClear: "Do you want to clear the drawing?\nThis will also erase your undo history!",
          QwantToOpen: "Do you want to open a new file?\nThis will also erase your undo history!",
          QerrorsRevertToSource: "There were parsing errors in your SVG source.\nRevert back to original SVG source?",
          QignoreSourceChanges: "Ignore changes made to SVG source?",
          featNotSupported: "Feature not supported",
          enterNewImgURL: "Enter the new image URL",
          defsFailOnSave: "NOTE: Due to a bug in your browser, this image may appear wrong (missing gradients or elements). It will however appear correct once actually saved.",
          loadingImage: "Loading image, please wait...",
          saveFromBrowser: "Select 'Save As...' in your browser to save this image as a %s file.",
          noteTheseIssues: "Also note the following issues: ",
          unsavedChanges: "There are unsaved changes.",
          enterNewLinkURL: "Enter the new hyperlink URL",
          errorLoadingSVG: "Error: Unable to load SVG data",
          URLloadFail: "Unable to load from URL",
          retrieving: "Retrieving '%s' ..."
        }
      }, e.pref = function (e, t) {
        return t ? (curPrefs[e] = t, void (editor.curPrefs = curPrefs)) : e in curPrefs ? curPrefs[e] : defaultPrefs[e]
      }, editor.loadContentAndPrefs = function () {
        if (curConfig.forceStorage || !curConfig.noStorageOnLoad && document.cookie.match(/(?:^|;\s*)store=(?:prefsAndContent|prefsOnly)/)) {
          if (editor.storage && (curConfig.forceStorage || !curConfig.noStorageOnLoad && document.cookie.match(/(?:^|;\s*)store=prefsAndContent/))) {
            var e = "svgedit-" + curConfig.canvasName, t = editor.storage.getItem(e);
            t && editor.loadFromString(t)
          }
          var n;
          for (n in defaultPrefs) if (defaultPrefs.hasOwnProperty(n)) {
            var o = "web-edit-" + n;
            if (editor.storage) {
              var i = editor.storage.getItem(o);
              i && (defaultPrefs[n] = String(i))
            } else if (window.widget) defaultPrefs[n] = widget.preferenceForKey(o); else {
              var a = document.cookie.match(new RegExp("(?:^|;\\s*)" + svgeditUtilites.preg_quote(encodeURIComponent(o)) + "=([^;]+)"));
              defaultPrefs[n] = a ? decodeURIComponent(a[1]) : ""
            }
          }
        }
      }, editor.setConfig = function (t, n) {
        function o(t, n, o) {
          t[n] && "object" == typeof t[n] ? e.extend(!0, t[n], o) : t[n] = o
        }

        n = n || {}, e.each(t, function (i, a) {
          if (t.hasOwnProperty(i)) if (defaultPrefs.hasOwnProperty(i)) {
            if (!1 === n.overwrite && (curConfig.preventAllURLConfig || curPrefs.hasOwnProperty(i))) return;
            !0 === n.allowInitialUserOverride ? defaultPrefs[i] = a : e.pref(i, a)
          } else if (["extensions", "allowedOrigins"].indexOf(i) > -1) {
            if (!1 === n.overwrite && (curConfig.preventAllURLConfig || "allowedOrigins" === i || "extensions" === i && curConfig.lockExtensions)) return;
            curConfig[i] = curConfig[i].concat(a)
          } else if (defaultConfig.hasOwnProperty(i)) {
            if (!1 === n.overwrite && (curConfig.preventAllURLConfig || curConfig.hasOwnProperty(i))) return;
            if (curConfig.hasOwnProperty(i)) {
              if (!1 === n.overwrite) return;
              o(curConfig, i, a)
            } else !0 === n.allowInitialUserOverride ? o(defaultConfig, i, a) : defaultConfig[i] && "object" == typeof defaultConfig[i] ? (curConfig[i] = {}, e.extend(!0, curConfig[i], a)) : curConfig[i] = a
          }
        }), editor.curConfig = curConfig
      }, editor.setCustomHandlers = function (t) {
        editor.ready(function () {
          t.open && (e('#tool_open > input[type="file"]').remove(), e("#tool_open").show(), svgCanvasInst.open = t.open), t.save && (editor.showSaveWarning = !1, svgCanvasInst.bind("saved", t.save)), t.exportImage && (customExportImage = t.exportImage, svgCanvasInst.bind("exported", customExportImage)), t.exportPDF && (customExportPDF = t.exportPDF, svgCanvasInst.bind("exportedPDF", customExportPDF))
        })
      },
        editor.randomizeIds = function () {
        svgCanvasInst.randomizeIds(arguments)
      }, editor.init = function (t) {
        function setupCurPrefs() {
          curPrefs = e.extend(!0, {}, defaultPrefs, curPrefs);
          editor.curPrefs = curPrefs;
        }

        function setupCurConfig() {
          curConfig = e.extend(!0, {}, defaultConfig, curConfig), curConfig.noDefaultExtensions || (curConfig.extensions = curConfig.extensions.concat(defaultExtensions)), e.each(["extensions", "allowedOrigins"], function (t, n) {
            curConfig[n] = e.grep(curConfig[n], function (e, t) {
              return t === curConfig[n].indexOf(e)
            })
          }), editor.curConfig = curConfig
        }

        function i(t, n) {
          var o = t.id, i = o.split("_"), a = i[0], r = i[1];
          n && svgCanvasInst.setStrokeAttr("stroke-" + a, r), de(), E("#cur_" + a, o, 20), e(t).addClass("current").siblings().removeClass("current")
        }

        function r(t, n) {
          e.pref("bkgd_color", t), e.pref("bkgd_url", n), svgCanvasInst.setBackground(t, n)
        }

        function l() {
          var t = svgCanvasInst.getHref(Q);
          if (t = 0 === t.indexOf("data:") ? "" : t, editor.promptImgURLcallback) {
            var n = editor.promptImgURLcallback;
            n && ge(n)
          } else e.prompt(uiStrings.notification.enterNewImgURL, t, function (e) {
            e && ge(e)
          })
        }

        function v(t, n) {
          var o, i;
          n || (n = svgCanvasInst.getZoom()), t || (t = e("#svgcanvas"));
          var a = 3e4, r = svgCanvasInst.getContentElem(), l = svgedit.units.getTypeMap(), s = l[curConfig.baseUnit];
          for (o = 0; o < 2; o++) {
            var c = 0 === o, d = c ? "x" : "y", f = c ? "width" : "height", p = Number(r.getAttribute(d)),
              g = e("#ruler_" + d + " canvas:first"), v = g.clone();
            g.replaceWith(v);
            var h = v[0], m = t[f](), _ = m;
            h.parentNode.style[f] = _ + "px";
            var w, y, b, C = 0, x = h.getContext("2d");
            if (x.fillStyle = "#666666", x.fillRect(0, 0, h.width, h.height), v.siblings().remove(), m >= a) {
              var k;
              for (b = parseInt(m / a, 10) + 1, w = [], w[0] = x, i = 1; i < b; i++) h[f] = a, k = h.cloneNode(!0), h.parentNode.appendChild(k), w[i] = k.getContext("2d");
              k[f] = m % a, m = a
            }
            h[f] = m;
            var S = s * n, E = 50 / S, F = 1;
            for (i = 0; i < ie.length && (y = ie[i], F = y, !(E <= y)); i++) ;
            var P = F * S;
            x.font = "8px sans-serif";
            for (var A = p / S % F * S, L = A - P; A < _;) {
              L += P, x.fillStyle = "#CACACA";
              var D, T = Math.round(A) + .5;
              if (c ? (x.moveTo(T, 15), x.lineTo(T, 0)) : (x.moveTo(15, T), x.lineTo(0, T)), y = (L - p) / S, F >= 1) D = Math.round(y); else {
                var I = String(F).split(".")[1].length;
                D = y.toFixed(I)
              }
              if (0 !== D && 1e3 !== D && D % 1e3 == 0 && (D = D / 1e3 + "K"), c) x.fillText(D, A + 2, 8); else {
                var N = String(D).split("");
                for (i = 0; i < N.length; i++) x.fillText(N[i], 1, A + 9 + 9 * i)
              }
              var B = P / 10;
              for (i = 1; i < 10; i++) {
                var O = Math.round(A + B * i) + .5;
                if (w && O > m) {
                  if (C++, x.stroke(), C >= b) {
                    i = 10, A = _;
                    continue
                  }
                  x = w[C], A -= a, O = Math.round(A + B * i) + .5
                }
                var U = i % 2 ? 12 : 10;
                c ? (x.moveTo(O, 15), x.lineTo(O, U)) : (x.moveTo(15, O), x.lineTo(U, O))
              }
              A += P
            }
            x.strokeStyle = "#666666", x.stroke()
          }
        }

        function h() {
          svgCanvasInst.deleteCurrentLayer() && (_e(), re(), e("#layerlist tr.layer").removeClass("layersel"), e("#layerlist tr.layer:first").addClass("layersel"))
        }

        function m() {
          var t = svgCanvasInst.getCurrentDrawing().getCurrentLayerName() + " copy";
          e.prompt(uiStrings.notification.enterUniqueLayerName, t, function (t) {
            t && (svgCanvasInst.getCurrentDrawing().hasLayer(t) ? e.alert(uiStrings.notification.dupeLayerName) : (svgCanvasInst.cloneLayer(t), _e(), re()))
          })
        }

        function _() {
          e("#layerlist tr.layersel").index() != svgCanvasInst.getCurrentDrawing().getNumLayers() - 1 && (svgCanvasInst.mergeLayer(), _e(), re())
        }

        function w(t) {
          var n = e("#layerlist tr.layersel").index(), o = svgCanvasInst.getCurrentDrawing().getNumLayers();
          (n > 0 || n < o - 1) && (n += t, svgCanvasInst.setCurrentLayerPosition(o - n - 1), re())
        }

        function y(e, t) {
          var n = Number(e.value), o = n + t, i = o >= n;
          return 0 === t ? n : n >= 24 ? i ? Math.round(1.1 * n) : Math.round(n / 1.1) : n <= 1 ? i ? 2 * n : n / 2 : o
        }

        function b(e, t) {
          var n = Number(e.value);
          if (0 === n) return 100;
          var o = n + t;
          return 0 === t ? n : n >= 100 ? o : o >= n ? 2 * n : n / 2
        }

        function C(e) {
          e.stopPropagation(), e.preventDefault()
        }

        function x(e) {
          e.stopPropagation(), e.preventDefault()
        }

        function k(e) {
          e.stopPropagation(), e.preventDefault()
        }

        try {
          "localStorage" in window && (editor.storage = localStorage)
        } catch (e) {
        }
        var S = [];
        e("#lang_select option").each(function () {
          S.push(this.value)
        }), function () {
          var t, i;
          if (d = e.deparam.querystring(!0), e.isEmptyObject(d)) setupCurConfig(), editor.loadContentAndPrefs(), setupCurPrefs(); else {
            if (d.dimensions && (d.dimensions = d.dimensions.split(",")), d.bkgd_color && (d.bkgd_color = "#" + d.bkgd_color), d.extensions && (d.extensions = d.extensions.match(/[:\/\\]/) ? "" : d.extensions.split(",")), e.each(["extPath", "imgPath", "langPath", "jGraduatePath"], function (e) {
              d[e] && delete d[e]
            }), editor.setConfig(d, {overwrite: !1}), setupCurConfig(), !curConfig.preventURLContentLoading) {
              if (t = d.source, i = e.param.querystring(), t || i.indexOf("source=data:") >= 0 && (t = i.match(/source=(data:[^&]*)/)[1]), t) return void (0 === t.indexOf("data:") ? editor.loadFromDataURI(t) : editor.loadFromString(t));
              if (d.url) return void editor.loadFromURL(d.url)
            }
            d.noStorageOnLoad && !curConfig.forceStorage || editor.loadContentAndPrefs(), setupCurPrefs()
          }
        }(), function () {
          var e, n = window.opener;
          if (n) try {
            e = n.document.createEvent("Event"), e.initEvent("svgEditorReady", !0, !0), n.document.documentElement.dispatchEvent(e)
          } catch (e) {
          }
          t && setTimeout(t, 2e3)
        }();
        var E = editor.setIcon = function (t, n, o) {
          var i = "string" == typeof n ? e.getSvgIcon(n, !0) : n.clone();
          i && e(t).empty().append(i)
        }, F = function () {
          window.extOverview && window.extOverview(), window.extMarkers && window.extMarkers(), window.extEyedropper && window.extEyedropper(), window.extImagelib && window.extImagelib(), window.extGrid && window.extGrid(), window.extPanning && window.extPanning(), window.extStorage && window.extStorage(), window.extSwitch && window.extSwitch(), window.extValue && window.extValue(), window.extHtmlInput && window.extHtmlInput(), window.extHtmlChart && window.extHtmlChart(), window.extHtmlSelect && window.extHtmlSelect(), window.extHtmlButton && window.extHtmlButton(), window.extGaugeProgress && window.extGaugeProgress(), window.extGaugeSemaphore && window.extGaugeSemaphore(), window.extHtmlBag && window.extHtmlBag(), window.extLinear && window.extLinear(), window.extPipe && window.extPipe(), window.extHtmlSlider && window.extHtmlSlider(), window.extHtmlSwitch && window.extHtmlSwitch(), editor.putLocale && editor.putLocale(null, S)
        },

          P = function (e) {
          svgeditShapes.load(curConfig.shapesPath, function () {
            Object.values(editor.shapesGrps).forEach(e => {
              for (var t = 0; t < e.length; t++) editor.shapesList.push(e[t])
            }), window.extShapes && window.extShapes(), e && e()
          })
        };
        "file:" === document.location.protocol && setTimeout(F, 100), editor.canvas = svgCanvasInst = new e.SvgCanvas(document.getElementById("svgcanvas"), curConfig);
        var A, L, D, T,
          I = ["#FFFFFF", "#000000", "#333333", "#4D4D4D", "#666666", "#808080", "#999999", "#B3B3B3", "#CCCCCC", "#E6E6E6", "#ECECEC", "#F9F9F9", "#05285B", "#073984", "#094BAC", "#0B5CD5", "#0D6EFD", "#3485FD", "#5A9CFE", "#81B4FE", "#A8CBFE", "#250657", "#35087E", "#450BA5", "#560DCB", "#6610F2", "#7E36F4", "#975CF6", "#AF83F8", "#C8A9FA", "#281845", "#3A2264", "#4B2D83", "#5D37A2", "#6F42C1", "#8660CB", "#9D7ED5", "#B49DDF", "#CBBBE9", "#4D1230", "#6F1B45", "#92235A", "#B42B6F", "#D63384", "#DD5498", "#E374AB", "#EA95BF", "#F0B6D3", "#4F1319", "#721C24", "#96242F", "#B92D3A", "#DC3545", "#E25563", "#E77681", "#ED969E", "#F2B6BC", "#5B2D07", "#84420A", "#AC560E", "#D56A11", "#FD7E14", "#FD933A", "#FEA75F", "#FEBC85", "#FED1AA", "#5C4503", "#856404", "#AD8305", "#D6A206", "#FFC107", "#FFCB2F", "#FFD556", "#FFDF7E", "#FFE9A6", "#0E3C19", "#155724", "#1B722F", "#228C3A", "#28A745", "#4AB563", "#6DC381", "#8FD19E", "#B2DFBC", "#0C4836", "#11694F", "#168967", "#1BA97F", "#20C997", "#44D2A8", "#67DAB8", "#8BE3C9", "#AFECDA", "#083A42", "#0C5460", "#106E7D", "#13889B", "#17A2B8", "#3CB1C3", "#61C0CF", "#86CFDA", "#ABDEE5"],
          N = svgedit.browser.isMac() ? "meta+" : "ctrl+", B = svgCanvasInst.pathActions, O = svgCanvasInst.undoMgr,
          U = curConfig.imgPath + "logo.png", R = e("#workarea"), M = e("#cmenu_canvas"), z = null, G = "crosshair",
          j = "crosshair", H = "toolbars", W = "", V = {fill: null, stroke: null};
        (function () {
          e("#dialog_container").draggable({cancel: "#dialog_content, #dialog_buttons *", containment: "window"});
          var t = e("#dialog_box"), n = e("#dialog_buttons"), o = e("#dialog_content"),
            i = function (i, a, r, l, s, c, u) {
              var d, f, p;
              if (o.html("<p>" + a.replace(/\n/g, "</p><p>") + "</p>").toggleClass("prompt", "prompt" == i), n.empty(), d = e('<input type="button" value="' + uiStrings.common.ok + '">').appendTo(n), "alert" !== i && e('<input type="button" value="' + uiStrings.common.cancel + '">').appendTo(n).click(function () {
                t.hide(), r && r(!1)
              }), "prompt" === i) f = e('<input type="text">').prependTo(n), f.val(l || ""), f.bind("keydown", "return", function () {
                d.click()
              }); else if ("select" === i) {
                var g = e('<div style="text-align:center;">');
                if (f = e("<select>").appendTo(g), u) {
                  var v = e("<label>").text(u.label);
                  p = e('<input type="checkbox">').appendTo(v), p.val(u.value), u.tooltip && v.attr("title", u.tooltip), p.prop("checked", !!u.checked), g.append(e("<div>").append(v))
                }
                e.each(s || [], function (t, n) {
                  "object" == typeof n ? f.append(e("<option>").val(n.value).html(n.text)) : f.append(e("<option>").html(n))
                }), o.append(g), l && f.val(l), c && f.bind("change", "return", c), f.bind("keydown", "return", function () {
                  d.click()
                })
              } else "process" === i && d.hide();
              t.show(), d.click(function () {
                t.hide();
                var e = "prompt" !== i && "select" !== i || f.val();
                r && (p ? r(e, p.prop("checked")) : r(e))
              }).focus(), "prompt" !== i && "select" !== i || f.focus()
            };
          e.alert = function (e, t) {
            i("alert", e, t)
          }, e.confirm = function (e, t) {
            i("confirm", e, t)
          }, e.process_cancel = function (e, t) {
            i("process", e, t)
          }, e.prompt = function (e, t, n) {
            i("prompt", e, n, t)
          }, e.select = function (e, t, n, o, a, r) {
            i("select", e, n, a, t, o, r)
          }
        })();
        var Z, q = function () {
            var t = e(".tool_button_current");
            t.length && "tool_select" !== t[0].id && (t.removeClass("tool_button_current").addClass("tool_button"), e("#tool_select").addClass("tool_button_current").removeClass("tool_button"), e("#styleoverrides").text("#svgcanvas svg *{cursor:move;pointer-events:all} #svgcanvas svg{cursor:default}")), svgCanvasInst.setMode("select"), R.css("cursor", "auto")
          }, Q = null, X = !1, K = !1, Y = !1, J = !1, $ = !1, ee = !1, te = !1, ne = "", oe = e("title:first").text(),
          ie = [];
        for (Z = .1; Z < 1e5; Z *= 10) ie.push(Z), ie.push(2 * Z), ie.push(5 * Z);
        var ae = function (e) {
          var t, n = [], o = svgCanvasInst.getCurrentDrawing().getNumLayers();
          for (t = 0; t < o; t++) n[t] = svgCanvasInst.getCurrentDrawing().getLayerName(t);
          if (e) for (t = 0; t < o; ++t) n[t] != e && svgCanvasInst.getCurrentDrawing().setLayerOpacity(n[t], .5); else for (t = 0; t < o; ++t) svgCanvasInst.getCurrentDrawing().setLayerOpacity(n[t], 1)
        }, re = function () {
          svgCanvasInst.clearSelection();
          for (var t = e("#layerlist tbody").empty(), n = e("#selLayerNames").empty(), o = svgCanvasInst.getCurrentDrawing(), i = o.getCurrentLayerName(), a = svgCanvasInst.getCurrentDrawing().getNumLayers(), r = e.getSvgIcon("eye"); a--;) {
            var l = o.getLayerName(a), s = e('<tr class="layer">').toggleClass("layersel", l === i),
              c = e('<td class="layervis">').toggleClass("layerinvis", !o.getLayerVisibility(l)),
              d = e('<td class="layername">' + l + "</td>");
            t.append(s.append(c, d)), n.append('<option value="' + l + '">' + l + "</option>")
          }
          if (void 0 !== r) {
            var f = r.clone();
            e("td.layervis", t).append(f), e.resizeSvgIcons({"td.layervis .svg_icon": 14})
          }
          e("#layerlist td.layername").mouseup(function (t) {
            e("#layerlist tr.layer").removeClass("layersel"), e(this.parentNode).addClass("layersel"), svgCanvasInst.setCurrentLayer(this.textContent), t.preventDefault()
          }).mouseover(function () {
            ae(this.textContent)
          }).mouseout(function () {
            ae()
          }), e("#layerlist td.layervis").click(function () {
            var t = e(this.parentNode).prevAll().length, n = e("#layerlist tr.layer:eq(" + t + ") td.layername").text(),
              o = e(this).hasClass("layerinvis");
            svgCanvasInst.setLayerVisibility(n, o), e(this).toggleClass("layerinvis")
          });
          for (var p = 5 - e("#layerlist tr.layer").size(); p-- > 0;) t.append('<tr><td style="color:white">_</td><td/></tr>')
        }, le = function (t, n) {
          $ || ($ = !0, W = svgCanvasInst.getSvgString(), e("#save_output_btns").toggle(!!n), e("#tool_source_back").toggle(!n), e("#svg_source_textarea").val(W), e("#svg_source_editor").fadeIn(), e("#svg_source_textarea").focus())
        }, se = function (t, n) {
          e("#path_node_panel").toggle(t), e("#tools_bottom_2,#tools_bottom_3").toggle(!t), t ? (e(".tool_button_current").removeClass("tool_button_current").addClass("tool_button"), e("#tool_select").addClass("tool_button_current").removeClass("tool_button"), E("#tool_select", "select_node"), X = !1, K = !1, n.length && (Q = n[0])) : setTimeout(function () {
            E("#tool_select", "select")
          }, 1e3)
        }, ce = function (t, n) {
          if (editor.showSaveWarning = !1, n = '<?xml version="1.0"?>\n' + n, svgedit.browser.isIE()) le(0, !0); else {
            var o = t.open("data:image/svg+xml;base64," + svgeditUtilites.encode64(n)), i = e.pref("save_notice_done");
            if ("all" !== i) {
              var a = uiStrings.notification.saveFromBrowser.replace("%s", "SVG");
              svgedit.browser.isGecko() ? -1 !== n.indexOf("<defs") ? (a += "\n\n" + uiStrings.notification.defsFailOnSave, e.pref("save_notice_done", "all"), i = "all") : e.pref("save_notice_done", "part") : e.pref("save_notice_done", "all"), "part" !== i && o.alert(a)
            }
          }
        }, ue = function (t, n) {
          var o = n.issues, i = n.exportWindowName;
          i && (z = window.open("", i)), z.location.href = n.datauri;
          var a = e.pref("export_notice_done");
          if ("all" !== a) {
            var r = uiStrings.notification.saveFromBrowser.replace("%s", n.type);
            if (o.length) {
              var l = "\n • ";
              r += "\n\n" + uiStrings.notification.noteTheseIssues + l + o.join(l)
            }
            e.pref("export_notice_done", "all"), z.alert(r)
          }
        }, de = function () {
          window.opera && e("<p/>").hide().appendTo("body").remove()
        }, fe = editor.toolButtonClick = function (t, n) {
          if (e(t).hasClass("disabled")) return !1;
          if (e(t).parent().hasClass("tools_flyout")) return !0;
          var o = "normal";
          return n || e(".tools_flyout").fadeOut(o), e("#styleoverrides").text(""), R.css("cursor", "auto"), e(".tool_button_current").removeClass("tool_button_current").addClass("tool_button"), e(t).addClass("tool_button_current").removeClass("tool_button"), !0
        }, pe = editor.clickSelect = function () {
          fe("#tool_select") && (svgCanvasInst.setMode("select"), e("#styleoverrides").text("#svgcanvas svg *{cursor:move;pointer-events:all}, #svgcanvas svg{cursor:default}"))
        }, ge = editor.setImageURL = function (t) {
          t || (t = U), svgCanvasInst.setImageURL(t), e("#image_url").val(t), 0 === t.indexOf("data:") ? (e("#image_url").hide(), e("#change_image_url").hide()) : (svgCanvasInst.embedImage(t, function (n) {
            e("#url_notice").toggle(!n), U = t
          }), e("#image_url").hide(), e("#change_image_url").hide())
        };
        editor.promptImgURLcallback = null;
        var ve = editor.updateCanvas = function (t, n) {
          var o = R.width(), i = R.height(), a = o, r = i, l = svgCanvasInst.getZoom(), s = R, f = e("#svgcanvas"),
            p = {x: s[0].scrollLeft + a / 2, y: s[0].scrollTop + r / 2}, g = curConfig.canvas_expansion;
          o = Math.max(a, svgCanvasInst.contentW * l * g), i = Math.max(r, svgCanvasInst.contentH * l * g), o == a && i == r ? R.css("overflow", "hidden") : R.css("overflow", "scroll");
          var h = f.height() / 2, m = f.width() / 2;
          f.width(o).height(i);
          var _ = i / 2, w = o / 2, y = svgCanvasInst.updateCanvas(o, i), b = w / m, C = o / 2 - a / 2, x = i / 2 - r / 2;
          if (n) n.x += y.x, n.y += y.y; else {
            var k = p.x - m, S = w + k * b, E = p.y - h, F = _ + E * b;
            n = {x: S, y: F}
          }
          t ? svgCanvasInst.contentW > s.width() ? (R[0].scrollLeft = y.x - 10, R[0].scrollTop = y.y - 10) : (s[0].scrollLeft = C, s[0].scrollTop = x) : (s[0].scrollLeft = n.x - a / 2, s[0].scrollTop = n.y - r / 2), curConfig.showRulers && (v(f, l), R.scroll()), !0 === d.storagePrompt || editor.storagePromptClosed || e("#dialog_box").hide()
        }, he = function () {
          var t, n, o = "none" == svgCanvasInst.getColor("fill"), i = "none" == svgCanvasInst.getColor("stroke"),
            a = ["#tool_fhpath", "#tool_line"],
            r = ["#tools_rect .tool_button", "#tools_ellipse .tool_button", "#tool_text", "#tool_path"];
          if (i) for (t in a) n = a[t], e(n).hasClass("tool_button_current") && pe(), e(n).addClass("disabled"); else for (t in a) n = a[t], e(n).removeClass("disabled");
          if (i && o) for (t in r) n = r[t], e(n).hasClass("tool_button_current") && pe(), e(n).addClass("disabled"); else for (t in r) n = r[t], e(n).removeClass("disabled");
          svgCanvasInst.runExtensions("toolButtonStateUpdate", {nofill: o, nostroke: i}), e(".tools_flyout").each(function () {
            var t = e("#" + this.id + "_show"), n = !1;
            e(this).children().each(function () {
              e(this).hasClass("disabled") || (n = !0)
            }), t.toggleClass("disabled", !n)
          }), de()
        }, me = function () {
          var t, n;
          if (null != Q) switch (Q.tagName) {
            case"use":
            case"image":
            case"foreignObject":
              break;
            case"g":
            case"a":
              var o = null, a = Q.getElementsByTagName("*");
              for (t = 0, n = a.length; t < n; t++) {
                var r = a[t].getAttribute("stroke-width");
                0 === t ? o = r : o !== r && (o = null)
              }
              e("#stroke_width").val(null === o ? "1" : o), V.fill.update(!0);
              break;
            default:
              V.fill.update(!0), V.stroke.update(!0);
              var l = Q.getAttribute("stroke-width");
              e("#stroke_width").val(null === l || "null" === l ? "1" : l), e("#stroke_style").val(Q.getAttribute("stroke-dasharray") || "none");
              var s = Q.getAttribute("stroke-linejoin") || "miter";
              0 != e("#linejoin_" + s).length && i(e("#linejoin_" + s)[0]), s = Q.getAttribute("stroke-linecap") || "butt", 0 != e("#linecap_" + s).length && i(e("#linecap_" + s)[0])
          }
          if (null != Q) {
            var c = 100 * (Q.getAttribute("opacity") || 1);
            e("#group_opacity").val(c), e("#opac_slider").slider("option", "value", c), e("#elem_id").val(Q.id), e("#elem_class").val(Q.getAttribute("class"))
          }
          he()
        }, _e = function () {
          var t = Q;
          null == t || t.parentNode || (t = null);
          var n = svgCanvasInst.getCurrentDrawing().getCurrentLayerName(), o = svgCanvasInst.getMode(),
            i = "px" !== curConfig.baseUnit ? curConfig.baseUnit : null, a = "pathedit" == o, r = e("#cmenu_canvas li");
          if (e("#selected_panel, #multiselected_panel, #threemoreselected_panel, #g_panel, #rect_panel, #circle_panel,#ellipse_panel, #line_panel, #text_panel, #image_panel, #container_panel, #use_panel, #a_panel, #xy_panel, #marker_panel, #htmlctrl_panel, #tool_stroke, #tool_angle, #shape_panel").hide(), Y || J || a || e("#tool_stroke").show(), null != t) {
            var s = t.nodeName;
            e("#tool_angle").show();
            var d = svgCanvasInst.getRotationAngle(t);
            e("#angle").val(d);
            var p = svgCanvasInst.getBlur(t);
            if (e("#blur").val(p), e("#blur_slider").slider("option", "value", p), svgCanvasInst.addedNew && "image" === s && 0 !== svgCanvasInst.getHref(t).indexOf("data:") && l(), a || "pathedit" == o) {
              var g = B.getNodePoint();
              if (e("#tool_add_subpath").removeClass("push_button_pressed").addClass("tool_button"), e("#tool_node_delete").toggleClass("disabled", !B.canDeleteNodes), E("#tool_openclose_path", B.closed_subpath ? "open_path" : "close_path"), g) {
                var v = e("#seg_type");
                i && (g.x = svgedit.units.convertUnit(g.x), g.y = svgedit.units.convertUnit(g.y)), e("#path_node_x").val(g.x), e("#path_node_y").val(g.y), g.type ? v.val(g.type).removeAttr("disabled") : v.val(4).attr("disabled", "disabled")
              }
              return
            }
            if (e("#selected_panel").show(), ["line", "circle", "ellipse"].indexOf(s) >= 0) e("#xy_panel").hide(); else {
              var h, m;
              if (["g", "polyline", "path"].indexOf(s) >= 0) {
                var _ = svgCanvasInst.getStrokedBBox([t]);
                _ && (h = _.x, m = _.y)
              } else h = t.getAttribute("x"), m = t.getAttribute("y");
              i && (h = svgedit.units.convertUnit(h), m = svgedit.units.convertUnit(m)), t.getAttribute("width"), t.getAttribute("heght"), h = Number.parseFloat(h), h = h.toFixed(Number.isInteger(h) ? 0 : 2), m = Number.parseFloat(m), m = m.toFixed(Number.isInteger(m) ? 0 : 2), e("#selected_x").val(h || 0), e("#selected_y").val(m || 0), e("#xy_panel").show()
            }
            var w = -1 == ["image", "text", "path", "g", "use"].indexOf(s);
            e("#tool_topath").toggle(w), e("#tool_reorient").toggle("path" === s), e("#tool_reorient").toggleClass("disabled", 0 === d);
            var y = {
              g: [],
              a: [],
              rect: ["rx", "width", "height"],
              image: ["width", "height"],
              circle: ["cx", "cy", "r"],
              ellipse: ["cx", "cy", "rx", "ry"],
              line: ["x1", "y1", "x2", "y2"],
              text: [],
              use: []
            }, b = t.tagName, C = null;
            "a" === b && (C = svgCanvasInst.getHref(t), e("#g_panel").show()), "a" === t.parentNode.tagName && (e(t).siblings().length || (e("#a_panel").show(), C = svgCanvasInst.getHref(t.parentNode))), e("#tool_make_link, #tool_make_link").toggle(!C), C && e("#link_url").val(C);
            var x = !1;
            if (y[b]) {
              var k = y[b], S = t.getAttribute("type");
              S && 0 === S.indexOf("svg-ext") ? x = !0 : e("#" + b + "_panel").show(), e.each(k, function (n, o) {
                var i = t.getAttribute(o);
                if ("px" !== curConfig.baseUnit && t[o]) {
                  var a = t[o].baseVal.value;
                  i = svgedit.units.convertUnit(a)
                }
                e("#" + b + "_" + o).val(i || 0)
              });
              var F = "g" === b && prefixes.indexOf(t.id.substr(0, 4)) >= 0;
              if ("text" == b || F) {
                if (e("#text_panel").css("display", "inline"), svgCanvasInst.getItalic() ? e("#tool_italic").addClass("push_button_pressed").removeClass("tool_button") : e("#tool_italic").removeClass("push_button_pressed").addClass("tool_button"), svgCanvasInst.getBold() ? e("#tool_bold").addClass("push_button_pressed").removeClass("tool_button") : e("#tool_bold").removeClass("push_button_pressed").addClass("tool_button"), e("#font_family").val(t.getAttribute("font-family")), e("#font_size").val(t.getAttribute("font-size")), e("#text_anchor").val(t.getAttribute("text-anchor")), F) {
                  var P = svgCanvasInst.getExtensionFont(t);
                  P && (P.fontFamily && e("#font_family").val(P.fontFamily), P.fontSize && e("#font_size").val(P.fontSize.replace("px", "")), P.textAnchor && e("#text_anchor").val(P.textAnchor))
                }
                e("#text").val(t.textContent), svgCanvasInst.addedNew && !F && setTimeout(function () {
                  e("#text").focus().select()
                }, 100)
              } else "image" == b ? ge(svgCanvasInst.getHref(t)) : "g" === b || "use" === b ? (e("#container_panel").show(), svgCanvasInst.getTitle()) : "line" === b && e("#marker_panel").show()
            }
            r[("g" === b ? "en" : "dis") + "ableContextMenuItems"]("#ungroup"), r[("g" !== b && X ? "en" : "dis") + "ableContextMenuItems"]("#group"), x && r.disableContextMenuItems("#ungroup")
          } else X ? (e("#multiselected_panel").show(), r.enableContextMenuItems("#group").disableContextMenuItems("#ungroup"), K && e("#threemoreselected_panel").show()) : r.disableContextMenuItems("#interactivity,#delete,#cut,#copy,#group,#ungroup,#move_front,#move_up,#move_down,#move_back");
          !Y && !J || X || (r.disableContextMenuItems("#ungroup"), e("#g_panel").hide()), e("#tool_undo").toggleClass("disabled", 0 === O.getUndoStackSize()), e("#tool_redo").toggleClass("disabled", 0 === O.getRedoStackSize()), svgCanvasInst.addedNew = !1, t && !a || X ? (e("#selLayerNames").removeAttr("disabled").val(n), M.enableContextMenuItems("#delete,#deselect,#cut,#copy,#move_front,#move_up,#move_down,#move_back")) : e("#selLayerNames").attr("disabled", "disabled"), r.disableContextMenuItems("#interactivity"), t && !X && (S = t.getAttribute("type"), S && editor.currentExtensionsInteractivityType.indexOf(S) > -1 && r.enableContextMenuItems("#interactivity"))
        }, we = function () {
          if (!A) {
            var t = "#workarea.wireframe #svgcontent * { stroke-width: " + 1 / svgCanvasInst.getZoom() + "px; }";
            e("#wireframe_rules").text(R.hasClass("wireframe") ? t : "")
          }
        }, ye = function (t) {
          t = t || svgCanvasInst.getDocumentTitle();
          var n = oe + (t ? ": " + t : "");
          e("title:first").text(n)
        }, be = function (e, t) {
          editor.onGaugeAdded && editor.onGaugeAdded(t)
        }, Ce = function (e, t) {
          editor.onGaugeResized && editor.onGaugeResized(t)
        }, xe = function (e, t) {
          editor.onGaugeCopyPaste && editor.onGaugeCopyPaste(t)
        }, ke = function (t, n) {
          var o = svgCanvasInst.getMode();
          "select" === o && q();
          var i = "pathedit" == o;
          Q = 1 === n.length || null == n[1] ? n[0] : null, X = n.length >= 2 && null != n[1], K = n.length >= 3 && null != n[2], Y = !1, J = !1;
          for (var a = 0; a < n.length; a++) n[a] && n[a].id && (0 === n[a].id.indexOf("HX") ? Y = !0 : 0 === n[a].id.indexOf("PIE") && (J = !0));
          null != Q && (i || J || me()), se(i, n), _e(), svgCanvasInst.runExtensions("selectedChanged", {
            elems: n,
            selectedElement: Q,
            multiselected: X
          }), J && e("#marker_panel").hide();
          var r = [];
          if (X) {
            for (a = 0; a < n.length; a++) n[a] && r.push({id: n[a].id, type: n[a].getAttribute("type")});
            editor.onSelectedElement(r)
          } else Q ? (r.push({
            id: Q.id,
            type: Q.getAttribute("type")
          }), editor.onSelectedElement(r)) : editor.onSelectedElement(null)
        }, Se = function (t, n) {
          var o = svgCanvasInst.getMode(), i = n[0];
          if (i) {
            if (X = n.length >= 2 && null != n[1], K = n.length >= 3 && null != n[2], !X) switch (o) {
              case"rotate":
                var a = svgCanvasInst.getRotationAngle(i);
                e("#angle").val(a), e("#tool_reorient").toggleClass("disabled", 0 === a)
            }
            svgCanvasInst.runExtensions("elementTransition", {elems: n})
          }
        }, Ee = function (e, t) {
          var n, o = svgCanvasInst.getMode();
          for ("select" === o && q(), n = 0; n < t.length; ++n) {
            var i = t[n];
            i && "svg" === i.tagName ? (re(), ve()) : i && Q && null == Q.parentNode && (Q = i)
          }
          editor.showSaveWarning = !0, _e(), Q && "select" === o && (V.fill.update(), V.stroke.update()), svgCanvasInst.runExtensions("elementChanged", {elems: t})
        }, Fe = function () {
          we()
        }, Pe = svgCanvasInst.zoomChanged = function (t, n, o) {
          var i = 0, a = R, r = svgCanvasInst.setBBoxZoom(n, a.width() - i, a.height() - i);
          if (r) {
            var l = r.zoom, s = r.bbox;
            l < .001 ? L({value: .1}) : (e("#zoom").val((100 * l).toFixed(1)), o ? ve() : ve(!1, {
              x: s.x * l + s.width * l / 2,
              y: s.y * l + s.height * l / 2
            }), "zoom" == svgCanvasInst.getMode() && s.width && q(), Fe())
          }
        }, Ae = svgCanvasInst.myZoomed = function (t, n) {
          const o = 0;
          w_area = R;
          var i = svgCanvasInst.setBBoxZoom(n.bbox, w_area.width() - o, w_area.height() - o);
          if (i) {
            var a = i.zoom;
            a < .001 ? L({value: .1}) : (e("#zoom").val((100 * a).toFixed(1)), n.center ? ve() : ve(!1, n.bbox), Fe())
          }
        };
        L = function (e) {
          var t = e.value / 100;
          if (t < .001) e.value = .1; else {
            var n = svgCanvasInst.getZoom(), o = R;
            Pe(window, {
              width: 0,
              height: 0,
              x: (o[0].scrollLeft + o.width() / 2) / n,
              y: (o[0].scrollTop + o.height() / 2) / n,
              zoom: t
            }, !0)
          }
        }, e("#cur_context_panel").delegate("a", "click", function () {
          var t = e(this);
          return t.attr("data-root") ? svgCanvasInst.leaveContext() : svgCanvasInst.setContext(t.text()), svgCanvasInst.clearSelection(), !1
        });
        var Le = function (t, n) {
          var o = "";
          if (n) {
            var i = "";
            o = '<a href="#" data-root="y">' + svgCanvasInst.getCurrentDrawing().getCurrentLayerName() + "</a>", e(n).parentsUntil("#svgcontent > g").andSelf().each(function () {
              this.id && (i += " > " + this.id, o += this !== n ? ' > <a href="#">' + this.id + "</a>" : " > " + this.id)
            }), ne = i
          } else ne = null;
          e("#cur_context_panel").toggle(!!n).html(o), ye()
        }, De = function () {
          V.fill.prep(), V.stroke.prep()
        }, Te = {}, Ie = function () {
          e(".tools_flyout").each(function () {
            var t = e("#" + this.id + "_show");
            if (!t.data("isLibrary")) {
              var n = [];
              e(this).children().each(function () {
                n.push(this.title)
              }), t[0] && (t[0].title = n.join(" / "))
            }
          })
        }, Ne = function () {
          e(".tools_flyout").each(function () {
            var t = e("#" + this.id + "_show"), n = t.offset(), o = t.outerWidth();
            n && e(this).css({left: (n.left + o) * editor.tool_scale, top: n.top})
          })
        }, Be = function (t) {
          e.each(t, function (n, o) {
            var i, a = e(n).children(), r = n + "_show", l = e(r), s = !1;
            a.addClass("tool_button").unbind("click mousedown mouseup").each(function (n) {
              var i = o[n];
              Te[i.sel] = i.fn, i.isDefault && (s = n);
              var a = function (n) {
                var o, a = i;
                if ("keydown" === n.type) {
                  var s = e(a.parent + "_show").hasClass("tool_button_current"),
                    c = e(a.parent + "_show").attr("data-curopt");
                  e.each(t[i.parent], function (e, o) {
                    o.sel == c && (a = n.shiftKey && s ? t[i.parent][e + 1] || t[i.parent][0] : o)
                  })
                }
                if (e(this).hasClass("disabled")) return !1;
                fe(r) && a.fn(), o = a.icon ? e.getSvgIcon(a.icon, !0) : e(a.sel).children().eq(0).clone(), o[0].setAttribute("width", l.width()), o[0].setAttribute("height", l.height()), l.children(":not(.flyout_arrow_horiz)").remove(), l.append(o).attr("data-curopt", a.sel)
              };
              e(this).mouseup(a), i.key && e(document).bind("keydown", i.key[0] + " shift+" + i.key[0], a)
            }), s ? l.attr("data-curopt", o[s].sel) : l.attr("data-curopt") || l.attr("data-curopt", o[0].sel);
            var c = e(r).position();
            l.mousedown(function (t) {
              if (l.hasClass("disabled")) return !1;
              var o = e(n), a = c.left + 34, r = -1 * o.width(), s = o.data("shown_popop") ? 200 : 0;
              i = setTimeout(function () {
                l.data("isLibrary") ? o.css("left", a).show() : o.css("left", r).show().animate({left: a}, 150), o.data("shown_popop", !0)
              }, s), t.preventDefault()
            }).mouseup(function (t) {
              clearTimeout(i);
              var n = e(this).attr("data-curopt");
              l.data("isLibrary") && e(r.replace("_show", "")).is(":visible") ? fe(r, !0) : fe(r) && Te[n] && Te[n]()
            })
          }), Ie(), Ne()
        }, Oe = function (t, n) {
          var o = e("<div>", {class: "tools_flyout", id: t}).appendTo("#svg_editor").append(n);
          return o
        }, Ue = function () {
          var e, t = /^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/, n = document.getElementsByTagName("script")[0];
          for (e in n.style) if (t.test(e)) return e.match(t)[0];
          return "WebkitOpacity" in n.style ? "Webkit" : "KhtmlOpacity" in n.style ? "Khtml" : ""
        }(), Re = function (t, n) {
          var o = ["top", "left", "bottom", "right"];
          t.each(function () {
            var t, i = e(this), a = i.outerWidth() * (n - 1), r = i.outerHeight() * (n - 1);
            for (t = 0; t < 4; t++) {
              var l = o[t], s = i.data("orig_margin-" + l);
              null == s && (s = parseInt(i.css("margin-" + l), 10), i.data("orig_margin-" + l, s));
              var c = s * n;
              "right" === l ? c += a : "bottom" === l && (c += r), i.css("margin-" + l, c)
            }
          })
        }, Me = editor.setIconSize = function (t) {
          var n = "#tools_top .toolset, #editor_panel > *, #history_panel > *,\t\t\t\t#main_button, #tools_left > *, #path_node_panel > *, #multiselected_panel > *,\t\t\t\t#g_panel > *, #tool_font_size > *, .tools_flyout",
            o = e(n), i = 1;
          if ("number" == typeof t) i = t; else {
            var a = {s: .75, m: 1, l: 1.25, xl: 1.5};
            i = a[t]
          }
          editor.tool_scale = i, Ne();
          var r = o.parents(":hidden");
          r.css("visibility", "hidden").show(), Re(o, i), r.css("visibility", "visible").hide(), e.pref("iconsize", t), e("#iconsize").val(t);
          var l = {
            "#tools_top": {left: 50 + e("#main_button").width(), height: 72},
            "#tools_left": {width: 31, top: 74},
            "div#workarea": {left: 38, top: 74}
          }, s = e("#tool_size_rules");
          if (s.length ? s.empty() : s = e('<style id="tool_size_rules"></style>').appendTo("head"), "m" !== t) {
            var u = "";
            e.each(l, function (n, o) {
              n = "#svg_editor " + n.replace(/,/g, ", #svg_editor"), u += n + "{", e.each(o, function (e, n) {
                var o;
                "number" == typeof n ? o = n * i + "px" : (n[t] || n.all) && (o = n[t] || n.all), u += e + ":" + o + ";"
              }), u += "}"
            });
            var d = "-" + Ue.toLowerCase() + "-"
            ;u += n + "{" + d + "transform: scale(" + i + ");} #svg_editor div.toolset .toolset {" + d + "transform: scale(1); margin: 1px !important;} #svg_editor .ui-slider {" + d + "transform: scale(" + 1 / i + ");}", s.text(u)
          }
          Ne()
        }, ze = function (t, n, o, i) {
          var a = e(t);
          n = e(n);
          var r = !1, l = i.dropUp;
          l && e(t).addClass("dropup"), n.find("li").bind("mouseup", function () {
            i.seticon && (E("#cur_" + a[0].id, e(this).children()), e(this).addClass("current").siblings().removeClass("current")), o.apply(this, arguments)
          }), e(window).mouseup(function (e) {
            r || (a.removeClass("down"), n.hide(), n.css({top: 0, left: 0})), r = !1
          }), a.bind("mousedown", function () {
            var e = a.offset();
            l ? (e.top -= n.height(), e.left += 8) : e.top += a.height(), n.offset(e), a.hasClass("down") ? (n.hide(), n.css({
              top: 0,
              left: 0
            })) : (n.show(), r = !0), a.toggleClass("down")
          }).hover(function () {
            r = !0
          }).mouseout(function () {
            r = !1
          }), i.multiclick && n.mousedown(function () {
            r = !0
          })
        }, Ge = [], je = function (t, n) {
          if (n) {
            var o = !1, i = !0;
            if (n.langReady) if (editor.langChanged) {
              var a = e.pref("lang");
              n.langReady({lang: a, uiStrings: uiStrings})
            } else Ge.push(n);
            var r = function () {
              n.callback && !o && i && (o = !0, n.callback())
            }, l = [];
            n.context_tools && e.each(n.context_tools, function (t, n) {
              var o, i = n.container_id ? ' id="' + n.container_id + '"' : "", a = e("#" + n.panel);
              switch (a.length || (a = e("<div>", {id: n.panel}).appendTo("#tools_top")), n.type) {
                case"tool_button":
                  o = '<div class="tool_button">' + n.id + "</div>";
                  var r = e(o).appendTo(a);
                  n.events && e.each(n.events, function (t, n) {
                    e(r).bind(t, n)
                  });
                  break;
                case"select":
                  o = "<label" + i + '><select id="' + n.id + '">', e.each(n.options, function (e, t) {
                    var i = e == n.defval ? " selected" : "";
                    o += '<option value="' + e + '"' + i + ">" + t + "</option>"
                  }), o += "</select></label>";
                  var s = e(o).appendTo(a).find("select");
                  e.each(n.events, function (t, n) {
                    e(s).bind(t, n)
                  });
                  break;
                case"button-select":
                  o = '<div id="' + n.id + '" class="dropdown toolset" title="' + n.title + '"><div id="cur_' + n.id + '" class="icon_label"></div><button></button></div>';
                  var c = e('<ul id="' + n.id + '_opts"></ul>').appendTo("#option_lists");
                  n.colnum && c.addClass("optcols" + n.colnum), e(o).appendTo(a).children(), l.push({
                    elem: "#" + n.id,
                    list: "#" + n.id + "_opts",
                    title: n.title,
                    callback: n.events.change,
                    cur: "#cur_" + n.id
                  });
                  break;
                case"input":
                  o = "<label" + i + '><span id="' + n.id + '_label">' + n.label + ':</span><input id="' + n.id + '" title="' + n.title + '" size="' + (n.size || "4") + '" value="' + (n.defval || "") + '" type="text"/></label>';
                  var u = e(o).appendTo(a).find("input");
                  n.spindata && u.SpinButton(n.spindata), n.events && e.each(n.events, function (e, t) {
                    u.bind(e, t)
                  })
              }
            }), n.mySetMarker && (editor.setMarker = n.mySetMarker), r()
          }
        }, He = function (t, n, o) {
          var i = {alpha: n};
          if (0 === t.indexOf("url(#")) {
            var a = svgCanvasInst.getRefElem(t);
            a = a ? a.cloneNode(!0) : e("#" + o + "_color defs *")[0], i[a.tagName] = a
          } else 0 === t.indexOf("#") ? i.solidColor = t.substr(1) : i.solidColor = "none";
          return new e.jGraduate.Paint(i)
        };
        e("#text").focus(function () {
        }), e("#text").blur(function () {
        }), svgCanvasInst.bind("onGaugeAdded", be), svgCanvasInst.bind("onGaugeResized", Ce), svgCanvasInst.bind("onGaugeCopyPaste", xe), svgCanvasInst.bind("selected", ke), svgCanvasInst.bind("transition", Se), svgCanvasInst.bind("changed", Ee), svgCanvasInst.bind("saved", ce), svgCanvasInst.bind("exported", ue), svgCanvasInst.bind("exportedPDF", function (e, t) {
          var n = t.exportWindowName;
          n && (z = window.open("", n)), z.location.href = t.dataurlstring
        }), svgCanvasInst.bind("zoomed", Pe), svgCanvasInst.bind("myZoomed", Ae), svgCanvasInst.bind("contextset", Le), svgCanvasInst.bind("extension_added", je), svgCanvasInst.textActions.setInputElem(e("#text")[0]);
        var We = '<div class="palette_item" style="background-color:#FFF;color:red;font-size:20px;line-height: 15px;text-align:center;" data-rgb="none">X</div>';
        e.each(I, function (e, t) {
          We += '<div class="palette_item" style="background-color: ' + t + ';" data-rgb="' + t + '"></div>'
        }), e("#palette").append(We);
        var Ve = ["#FFF", "#888", "#000"];
        We = "", e.each(Ve, function () {
          We += '<div class="color_block" style="background-color:' + this + ';"></div>'
        }), e("#bg_blocks").append(We);
        var Ze = e("#bg_blocks div"), qe = "cur_background";
        Ze.each(function () {
          var t = e(this);
          t.click(function () {
            Ze.removeClass(qe), e(this).addClass(qe)
          })
        }), r(e.pref("bkgd_color"), e.pref("bkgd_url")), e("#image_save_opts input").val([e.pref("img_save")]);
        var Qe = function (e) {
          svgCanvasInst.setRectRadius(e.value)
        }, Xe = function (e) {
          svgCanvasInst.setFontSize(e.value)
        }, Ke = function (e) {
          var t = e.value;
          0 == t && Q && ["line", "polyline"].indexOf(Q.nodeName) >= 0 && (t = e.value = 1), svgCanvasInst.setStrokeWidth(t)
        }, Ye = function (t) {
          svgCanvasInst.setRotationAngle(t.value), e("#tool_reorient").toggleClass("disabled", 0 === parseInt(t.value, 10))
        }, Je = function (t, n) {
          null == n && (n = t.value), e("#group_opacity").val(n), t && t.handle || e("#opac_slider").slider("option", "value", n), svgCanvasInst.setOpacity(n / 100)
        }, $e = function (t, n, o) {
          null == n && (n = t.value), e("#blur").val(n);
          var i = !1;
          t && t.handle || (e("#blur_slider").slider("option", "value", n), i = !0), o ? svgCanvasInst.setBlurNoUndo(n) : svgCanvasInst.setBlur(n, i)
        };
        e("#stroke_style").change(function () {
          svgCanvasInst.setStrokeAttr("stroke-dasharray", e(this).val()), de()
        }), e("#stroke_linejoin").change(function () {
          svgCanvasInst.setStrokeAttr("stroke-linejoin", e(this).val()), de()
        }), e("select").change(function () {
          e(this).blur()
        });
        var et = !1;
        e("#selLayerNames").change(function () {
          var t = this.options[this.selectedIndex].value, n = uiStrings.notification.QmoveElemsToLayer.replace("%s", t),
            o = function (e) {
              e && (et = !0, svgCanvasInst.moveSelectedToLayer(t), svgCanvasInst.clearSelection(), re())
            };
          t && (et ? o(!0) : e.confirm(n, o))
        }), e("#font_family").change(function () {
          svgCanvasInst.setFontFamily(this.value)
        }), e("#seg_type").change(function () {
          svgCanvasInst.setSegType(e(this).val())
        }), e("#text").keyup(function () {
          svgCanvasInst.setTextContent(this.value)
        }), e("#image_url").change(function () {
          ge(this.value)
        }), e("#link_url").change(function () {
          this.value.length ? svgCanvasInst.setLinkURL(this.value) : svgCanvasInst.removeHyperlink()
        }), e("#g_title").change(function () {
          svgCanvasInst.setGroupTitle(this.value)
        }), e(".attr_changer").change(function () {
          var t = this.getAttribute("data-attr"), n = this.value, o = svgedit.units.isValidUnit(t, n, Q);
          if (!o) return e.alert(uiStrings.notification.invalidAttrValGiven), this.value = Q.getAttribute(t), !1;
          if ("id" !== t && "class" !== t) if (isNaN(n)) n = svgCanvasInst.convertToNum(t, n); else if ("px" !== curConfig.baseUnit) {
            var i = svgedit.units.getTypeMap();
            (Q[t] || "pathedit" === svgCanvasInst.getMode() || "x" === t || "y" === t) && (n *= i[curConfig.baseUnit])
          }
          if ("id" === t) {
            var a = Q;
            svgCanvasInst.clearSelection(), a.id = n, svgCanvasInst.addToSelection([a], !0)
          } else svgCanvasInst.changeSelectedAttribute(t, n);
          this.blur()
        }), e("#palette").mouseover(function () {
          var t = e('<input type="hidden">');
          e(this).append(t), t.focus().remove()
        }), e(".palette_item").mousedown(function (t) {
          var n, o = t.shiftKey || 2 === t.button ? "stroke" : "fill", i = e(this).data("rgb");
          "none" === i || "transparent" === i || "initial" === i ? (i = "none", n = new e.jGraduate.Paint) : n = new e.jGraduate.Paint({
            alpha: 100,
            solidColor: i.substr(1)
          }), V[o].setPaint(n), svgCanvasInst.setColor(o, i), "none" !== i && 1 !== svgCanvasInst.getPaintOpacity(o) && svgCanvasInst.setPaintOpacity(o, 1), editor.changeColor && editor.changeColor(o, i), he()
        }).bind("contextmenu", function (e) {
          e.preventDefault()
        }), e("#toggle_stroke_tools").on("click", function () {
          e("#tools_bottom").toggleClass("expanded")
        }), function () {
          var t = null, n = null, o = R[0], i = !1, a = !1;
          e("#svgcanvas").bind("mousemove mouseup", function (e) {
            if (!1 !== i) return o.scrollLeft -= e.clientX - t, o.scrollTop -= e.clientY - n, t = e.clientX, n = e.clientY, "mouseup" === e.type && (i = !1), !1
          }).mousedown(function (e) {
            if (1 === e.button || !0 === a) return i = !0, t = e.clientX, n = e.clientY, !1
          }), e(window).mouseup(function () {
            i = !1
          }), e(document).bind("keydown", "space", function (e) {
            svgCanvasInst.spaceKey = a = !0, e.preventDefault()
          }).bind("keyup", "space", function (e) {
            e.preventDefault(), svgCanvasInst.spaceKey = a = !1
          }).bind("keydown", "shift", function (e) {
            "zoom" === svgCanvasInst.getMode() && R.css("cursor", j)
          }).bind("keyup", "shift", function (e) {
            "zoom" === svgCanvasInst.getMode() && R.css("cursor", G)
          }), editor.setPanning = function (e) {
            svgCanvasInst.spaceKey = a = e
          }
        }(), function () {
          var t = e("#main_icon"), n = e("#main_icon span"), o = e("#main_menu"), i = !1, a = 0, r = !0, l = !1;
          e(window).mouseup(function (n) {
            i || (t.removeClass("buttondown"), "INPUT" != n.target.tagName ? o.fadeOut(200) : l || (l = !0, e(n.target).click(function () {
              o.css("margin-left", "-9999px").show()
            }))), i = !1
          }).mousedown(function (t) {
            var n = e(t.target).closest("div.tools_flyout, .contextMenu").length;
            n || e(".tools_flyout:visible,.contextMenu").fadeOut(250)
          }), n.bind("mousedown", function () {
            t.hasClass("buttondown") ? o.fadeOut(200) : (o.css("margin-left", 0).show(), a || (a = o.height()), o.css("height", 0).animate({height: a}, 200), i = !0), t.toggleClass("buttondown buttonup")
          }).hover(function () {
            i = !0
          }).mouseout(function () {
            i = !1
          });
          var s = e("#main_menu li");
          s.mouseover(function () {
            r = "rgba(0, 0, 0, 0)" == e(this).css("background-color"), s.unbind("mouseover"), r && s.mouseover(function () {
              this.style.backgroundColor = "#FFC"
            }).mouseout(function () {
              return this.style.backgroundColor = "transparent", !0
            })
          })
        }(), editor.addDropDown = function (t, n, o) {
          if (0 != e(t).length) {
            var i = e(t).find("button"), a = e(t).find("ul").attr("id", e(t)[0].id + "-list"), r = !1;
            o ? e(t).addClass("dropup") : e("#option_lists").append(a), a.find("li").bind("mouseup", n), e(window).mouseup(function (e) {
              r || (i.removeClass("down"), a.hide()), r = !1
            }), i.bind("mousedown", function () {
              if (i.hasClass("down")) a.hide(); else {
                if (!o) {
                  var n = e(t).position();
                  a.css({top: n.top + 24, left: n.left - 10})
                }
                a.show(), r = !0
              }
              i.toggleClass("down")
            }).hover(function () {
              r = !0
            }).mouseout(function () {
              r = !1
            })
          }
        }, editor.addDropDown("#font_family_dropdown", function () {
          e("#font_family").val(e(this).text()).change()
        }), editor.addDropDown("#opacity_dropdown", function () {
          if (!e(this).find("div").length) {
            var t = parseInt(e(this).text().split("%")[0], 10);
            Je(!1, t)
          }
        }, !0), e("#opac_slider").slider({
          start: function () {
            e("#opacity_dropdown li:not(.special)").hide()
          }, stop: function () {
            e("#opacity_dropdown li").show(), e(window).mouseup()
          }, slide: function (e, t) {
            Je(t)
          }
        }), editor.addDropDown("#blur_dropdown", e.noop);
        var tt, nt, ot = !1;
        e("#blur_slider").slider({
          max: 10, step: .1, stop: function (t, n) {
            ot = !1, $e(n), e("#blur_dropdown li").show(), e(window).mouseup()
          }, start: function () {
            ot = !0
          }, slide: function (e, t) {
            $e(t, null, ot)
          }
        }), editor.addDropDown("#zoom_dropdown", function () {
          var t = e(this), n = t.data("val");
          n ? Pe(window, n) : L({value: parseFloat(t.text())})
        }, !0), ze("#stroke_linecap", "#linecap_opts", function () {
          i(this, !0)
        }, {dropUp: !0}), ze("#stroke_linejoin", "#linejoin_opts", function () {
          i(this, !0)
        }, {dropUp: !0}), ze("#tool_position", "#position_opts", function () {
          var e = this.id.replace("tool_pos", "").charAt(0);
          svgCanvasInst.alignSelectedElements(e, "page")
        }, {multiclick: !0}), nt = function () {
          e(tt).blur()
        }, e("#svg_editor").find("button, select, input:not(#text)").focus(function () {
          tt = this, H = "toolbars", R.mousedown(nt)
        }).blur(function () {
          H = "canvas", R.unbind("mousedown", nt), "textedit" == svgCanvasInst.getMode() && e("#text").focus()
        });
        var it = function () {
          fe("#tool_fhpath") && svgCanvasInst.setMode("fhpath")
        }, at = function () {
          fe("#tool_line") && svgCanvasInst.setMode("line")
        }, rt = function () {
          fe("#tool_square") && svgCanvasInst.setMode("square")
        }, lt = function () {
          fe("#tool_rect") && svgCanvasInst.setMode("rect")
        }, st = function () {
          fe("#tool_fhrect") && svgCanvasInst.setMode("fhrect")
        }, ct = function () {
          fe("#tool_circle") && svgCanvasInst.setMode("circle")
        }, ut = function () {
          fe("#tool_ellipse") && svgCanvasInst.setMode("ellipse")
        }, dt = function () {
          fe("#tool_fhellipse") && svgCanvasInst.setMode("fhellipse")
        }, ft = function () {
          fe("#tool_image") && svgCanvasInst.setMode("image")
        }, pt = function () {
          fe("#tool_zoom") && (svgCanvasInst.setMode("zoom"), R.css("cursor", G))
        }, gt = function (t) {
          var n = svgCanvasInst.getResolution();
          t = t ? n.zoom * t : 1, e("#zoom").val(100 * t), svgCanvasInst.setZoom(t), Fe(), ve(!0)
        }, vt = function () {
          fe("#tool_zoom") && (gt(), q())
        }, ht = function () {
          fe("#tool_text") && svgCanvasInst.setMode("text")
        }, mt = function () {
          fe("#tool_path") && svgCanvasInst.setMode("path")
        };
        editor.clickExtension = function (e) {
          svgCanvasInst.clickExtension(e)
        }, editor.clickZoom = function () {
          svgCanvasInst.setMode("zoom"), R.css("cursor", G)
        }, editor.clickToSetMode = function (e) {
          svgCanvasInst.setMode(e)
        }, editor.getSvgString = function () {
          editor.showSaveWarning = !1;
          let str = svgCanvasInst.getSvgString();
          return str;
        }, editor.getSelectedElements = function () {
          return svgCanvasInst.getSelectedElems()
        }, editor.setSvgString = function (e) {
          return svgCanvasInst.setSvgString(e)
        }, editor.enableGridSnapping = function (e) {
          curConfig.gridSnapping = e
        }, editor.setDocProperty = function (e, t, n, o) {
          return !("fit" != t && !svgedit.units.isValidUnit("width", t)) && !("fit" != n && !svgedit.units.isValidUnit("height", n)) && !!svgCanvasInst.setResolution(t, n) && (o || (o = "#ffffff"), !(o && !svgCanvasInst.setBackground(o)) && void ve())
        }, editor.alignSelectedElements = function (e) {
          svgCanvasInst.alignSelectedElements(e, "page")
        }, editor.setColor = function (e, t, n) {
          var o = {alpha: t, solidColor: e, type: "solidColor"};
          V[n].setPaint(o), svgCanvasInst.setPaint(n, o)
        }, editor.setStrokeOption = function (e) {
          i(e, !0)
        }, editor.setFilterShadow = function (e) {
          svgCanvasInst.setFilterShadow(e)
        }, editor.setFontFamily = function (e) {
          svgCanvasInst.setFontFamily(e)
        }, editor.setTextAlign = function (e) {
          svgCanvasInst.setTextAlign(e)
        }, editor.clickClearAll = function () {
          var e = curConfig.dimensions;
          q(), svgCanvasInst.clear(), svgCanvasInst.setResolution(e[0], e[1]), ve(!0), gt(), re(), _e(), De(), svgCanvasInst.runExtensions("onNewDocument")
        }, editor.clearSelection = function () {
          svgCanvasInst.clearSelection()
        }, editor.setMarker = function (e, t) {
          console.log("marker selected " + e + " " + t)
        }, editor.setSvgImageToAdd = function (e) {
          svgCanvasInst.setGoodSvgImageContent(e)
        }, editor.getShapes = function () {
          return editor.shapesGrps
        }, editor.runExtension = function (e, t, ...n) {
          return svgCanvasInst.runExtension(e, t, n)
        }, editor.makeHyperlink = function (e) {
          e && svgCanvasInst.makeHyperlink(e)
        }, editor.renameSvgExtensionId = function (e) {
          let t = e.id.substring(0, e.id.indexOf("_"));
          var n = svgCanvasInst.getNextId().replace("svg_", t + "_");
          return e.content = e.content.split(e.id).join(n), n
        }, editor.renameAllSvgExtensionId = function (t, n) {
          var o = {content: t, id: ""};
          return e.each(editor.currentExtensionsPrefixIdType, function (e, i) {
            for (var a = 'id=\\"' + i, r = o.content.indexOf(a); r > 0;) {
              idend = o.content.indexOf('\\"', r + a.length), o.id = o.content.substring(r, idend);
              var l = o.id.replace('id=\\"', "");
              if (-1 === n.indexOf(l)) {
                var s = editor.renameSvgExtensionId(o);
                n.push(s.replace('id=\\"', ""))
              }
              r = t.indexOf(a, r + 1)
            }
          }), t = o.content, t
        };
        var _t = function () {
          if (null != Q || X) {
            var e = svgCanvasInst.deleteSelectedElements();
            null != a && a(e)
          }
        }, wt = function () {
          (null != Q || X) && svgCanvasInst.cutSelectedElements()
        }, yt = function () {
          (null != Q || X) && svgCanvasInst.copySelectedElements()
        }, bt = function () {
          var e = svgCanvasInst.getZoom(), t = (R[0].scrollLeft + R.width() / 2) / e - svgCanvasInst.contentW,
            n = (R[0].scrollTop + R.height() / 2) / e - svgCanvasInst.contentH;
          svgCanvasInst.pasteElements("point", t, n)
        }, Ct = function () {
          null != Q && svgCanvasInst.moveToTopSelectedElement()
        }, xt = function () {
          null != Q && svgCanvasInst.moveToBottomSelectedElement()
        }, kt = function (e) {
          null != Q && svgCanvasInst.moveUpDownSelected(e)
        }, St = function () {
          null != Q && svgCanvasInst.convertToPath()
        }, Et = function () {
          null != Q && B.reorient()
        }, Ft = function (e, t) {
          if (null != Q || X) {
            if (curConfig.gridSnapping) {
              var n = svgCanvasInst.getZoom() * curConfig.snappingStep;
              e *= n, t *= n
            }
            svgCanvasInst.moveSelectedElements(e, t)
          }
        }, Pt = function () {
          e("#tool_node_link").toggleClass("push_button_pressed tool_button");
          var t = e("#tool_node_link").hasClass("push_button_pressed");
          B.linkControlPoints(t)
        }, At = function () {
          B.getNodePoint() && B.clonePathNode()
        }, Lt = function () {
          B.getNodePoint() && B.deletePathNode()
        }, Dt = function () {
          var t = e("#tool_add_subpath"), n = !t.hasClass("push_button_pressed");
          t.toggleClass("push_button_pressed tool_button"), B.addSubPath(n)
        }, Tt = function () {
          B.opencloseSubPath()
        }, It = function () {
          svgCanvasInst.cycleElement(1)
        }, Nt = function () {
          svgCanvasInst.cycleElement(0)
        }, Bt = function (t, n) {
          if (null != Q && !X) {
            t || (n *= -1);
            var o = parseFloat(e("#angle").val()) + n;
            svgCanvasInst.setRotationAngle(o), _e()
          }
        };
        clickClear = function () {
          var t = curConfig.dimensions;
          e.confirm(uiStrings.notification.QwantToClear, function (e) {
            e && (q(), svgCanvasInst.clear(), svgCanvasInst.setResolution(t[0], t[1]), ve(!0), gt(), re(), _e(), De(), svgCanvasInst.runExtensions("onNewDocument"))
          })
        };
        var Ot = function () {
          return svgCanvasInst.setBold(!svgCanvasInst.getBold()), _e(), !1
        }, Ut = function () {
          return svgCanvasInst.setItalic(!svgCanvasInst.getItalic()), _e(), !1
        }, Rt = function () {
          var t = {images: e.pref("img_save"), round_digits: 6};
          svgCanvasInst.save(t)
        }, Mt = function () {
          e.select("Select an image type for export: ", ["PNG", "JPEG", "BMP", "WEBP", "PDF"], function (t) {
            function n() {
              var e = uiStrings.notification.loadingImage;
              "new" === curConfig.exportWindowType && editor.exportWindowCt++, o = curConfig.canvasName + editor.exportWindowCt, z = window.open("data:text/html;charset=utf-8," + encodeURIComponent("<title>" + e + "</title><h1>" + e + "</h1>"), o)
            }

            var o;
            if (t) if ("PDF" === t) customExportPDF || n(), svgCanvasInst.exportPDF(o); else {
              customExportImage || n();
              var i = parseInt(e("#image-slider").val(), 10) / 100;
              svgCanvasInst.rasterExport(t, i, o)
            }
          }, function () {
            var t = e(this);
            "JPEG" === t.val() || "WEBP" === t.val() ? e("#image-slider").length || e('<div><label>Quality: <input id="image-slider" type="range" min="1" max="100" value="92" /></label></div>').appendTo(t.parent()) : e("#image-slider").parent().remove()
          })
        }, zt = function () {
          svgCanvasInst.open()
        }, Gt = function () {
        }, jt = function () {
          O.getUndoStackSize() > 0 && (O.undo(), re())
        }, Ht = function () {
          O.getRedoStackSize() > 0 && (O.redo(), re())
        }, Wt = function () {
          X ? svgCanvasInst.groupSelectedElements() : Q && svgCanvasInst.ungroupSelectedElement()
        }, Vt = function () {
          svgCanvasInst.copySelectedElements(), svgCanvasInst.pasteElements("point", 20, 20)
        }, Zt = function () {
          var t = this.id.replace("tool_align", "").charAt(0);
          svgCanvasInst.alignSelectedElements(t, e("#align_relative_to").val())
        }, qt = function () {
          var e = this.id.replace("tool_divide", "").charAt(0);
          svgCanvasInst.divideSelectedElements(e)
        }, Qt = function () {
          if (e("#tool_wireframe").toggleClass("push_button_pressed tool_button"), R.toggleClass("wireframe"), !A) {
            var t = e("#wireframe_rules");
            t.length ? t.empty() : t = e('<style id="wireframe_rules"></style>').appendTo("head"), we()
          }
        };
        e("#svg_docprops_container, #svg_prefs_container").draggable({
          cancel: "button,fieldset",
          containment: "window"
        });
        var Xt, Kt, Yt, Jt = function () {
          if (!ee) {
            ee = !0, e("#image_save_opts input").val([e.pref("img_save")]);
            var t = svgCanvasInst.getResolution();
            "px" !== curConfig.baseUnit && (t.w = svgedit.units.convertUnit(t.w) + curConfig.baseUnit, t.h = svgedit.units.convertUnit(t.h) + curConfig.baseUnit), e("#canvas_width").val(t.w), e("#canvas_height").val(t.h), e("#canvas_title").val(svgCanvasInst.getDocumentTitle()), e("#svg_docprops").show()
          }
        }, $t = function () {
          if (!te) {
            te = !0, e("#main_menu").hide();
            var t = e("#bg_blocks div"), n = "cur_background", o = curPrefs.bkgd_color, i = e.pref("bkgd_url");
            t.each(function () {
              var t = e(this), i = t.css("background-color") == o;
              t.toggleClass(n, i), i && e("#canvas_bg_url").removeClass(n)
            }), o || t.eq(0).addClass(n), i && e("#canvas_bg_url").val(i), e("#grid_snapping_on").prop("checked", curConfig.gridSnapping), e("#grid_snapping_step").attr("value", curConfig.snappingStep), e("#grid_color").attr("value", curConfig.gridColor), e("#svg_prefs").show()
          }
        }, en = function () {
          e("#svg_source_editor").hide(), $ = !1, e("#svg_source_textarea").blur()
        }, tn = function () {
          if ($) {
            var t = function () {
              svgCanvasInst.clearSelection(), en(), gt(), re(), ye(), De()
            };
            svgCanvasInst.setSvgString(e("#svg_source_textarea").val()) ? t() : e.confirm(uiStrings.notification.QerrorsRevertToSource, function (e) {
              if (!e) return !1;
              t()
            }), q()
          }
        }, nn = function () {
          e("#svg_docprops").hide(), e("#canvas_width,#canvas_height").removeAttr("disabled"), e("#resolution")[0].selectedIndex = 0, e("#image_save_opts input").val([e.pref("img_save")]), ee = !1
        }, on = function () {
          e("#svg_prefs").hide(), te = !1
        }, an = function () {
          var t = e("#canvas_title").val();
          ye(t), svgCanvasInst.setDocumentTitle(t);
          var n = e("#canvas_width"), o = n.val(), i = e("#canvas_height"), a = i.val();
          return "fit" == o || svgedit.units.isValidUnit("width", o) ? (n.parent().removeClass("error"), "fit" == a || svgedit.units.isValidUnit("height", a) ? (i.parent().removeClass("error"), svgCanvasInst.setResolution(o, a) ? (e.pref("img_save", e("#image_save_opts :checked").val()), ve(), void nn()) : (e.alert(uiStrings.notification.noContentToFitTo), !1)) : (e.alert(uiStrings.notification.invalidAttrValGiven), i.parent().addClass("error"), !1)) : (e.alert(uiStrings.notification.invalidAttrValGiven), n.parent().addClass("error"), !1)
        }, rn = editor.savePreferences = function () {
          var t = e("#bg_blocks div.cur_background").css("background-color") || "#FFF";
          r(t, e("#canvas_bg_url").val());
          var n = e("#lang_select").val();
          n !== e.pref("lang") && editor.putLocale(n, S), Me(e("#iconsize").val()), curConfig.gridSnapping = e("#grid_snapping_on")[0].checked, curConfig.snappingStep = e("#grid_snapping_step").val(), curConfig.gridColor = e("#grid_color").val(), curConfig.showRulers = e("#show_rulers")[0].checked, e("#rulers").toggle(curConfig.showRulers), curConfig.showRulers && v(), curConfig.baseUnit = e("#base_unit").val(), svgCanvasInst.setConfig(curConfig), ve(), on()
        }, ln = e.noop, sn = function () {
          e("#dialog_box").hide(), $ || ee || te ? ($ ? W !== e("#svg_source_textarea").val() ? e.confirm(uiStrings.notification.QignoreSourceChanges, function (e) {
            e && en()
          }) : en() : ee ? nn() : te && on(), ln()) : ne && svgCanvasInst.leaveContext()
        }, cn = {width: e(window).width(), height: e(window).height()};
        if (svgedit.browser.isIE() && (ln = function () {
          0 === R[0].scrollLeft && 0 === R[0].scrollTop && (R[0].scrollLeft = T.left, R[0].scrollTop = T.top)
        }, T = {left: R[0].scrollLeft, top: R[0].scrollTop}, e(window).resize(ln), editor.ready(function () {
          setTimeout(function () {
            ln()
          }, 500)
        }), R.scroll(function () {
          T = {left: R[0].scrollLeft, top: R[0].scrollTop}
        })), e(window).resize(function (t) {
          e.each(cn, function (t, n) {
            var o = e(window)[t]();
            R[0]["scroll" + ("width" === t ? "Left" : "Top")] -= (o - n) / 2, cn[t] = o
          }), Ne()
        }), R.scroll(function () {
          0 != e("#ruler_x").length && (e("#ruler_x")[0].scrollLeft = R[0].scrollLeft), 0 != e("#ruler_y").length && (e("#ruler_y")[0].scrollTop = R[0].scrollTop)
        }), e("#url_notice").click(function () {
          e.alert(this.title)
        }), e("#change_image_url").click(l), Xt = ["clear", "open", "save", "source", "delete", "delete_multi", "paste", "clone", "clone_multi", "move_top", "move_bottom"], Kt = "", Yt = "tool_button_current", e.each(Xt, function (e, t) {
          Kt += (e ? "," : "") + "#tool_" + t
        }), e(Kt).mousedown(function () {
          e(this).addClass(Yt)
        }).bind("mousedown mouseout", function () {
          e(this).removeClass(Yt)
        }), e("#tool_undo, #tool_redo").mousedown(function () {
          e(this).hasClass("disabled") || e(this).addClass(Yt)
        }).bind("mousedown mouseout", function () {
          e(this).removeClass(Yt)
        }), svgedit.browser.isMac() && !window.opera) {
          var un = ["tool_clear", "tool_save", "tool_source", "tool_undo", "tool_redo", "tool_clone"];
          for (Z = un.length; Z--;) {
            var dn = document.getElementById(un[Z]);
            if (dn) {
              var fn = dn.title, pn = fn.indexOf("Ctrl+");
              dn.title = [fn.substr(0, pn), "Cmd+", fn.substr(pn + 5)].join("")
            }
          }
        }
        var gn = function (t) {
          var n = "stroke_color" == t.attr("id") ? "stroke" : "fill", o = V[n].paint,
            i = "stroke" == n ? "Pick a Stroke Paint and Opacity" : "Pick a Fill Paint and Opacity", a = t.offset();
          e("#color_picker").draggable({
            cancel: ".jGraduate_tabs, .jGraduate_colPick, .jGraduate_gradPick, .jPicker",
            containment: "window"
          }).css(curConfig.colorPickerCSS || {left: a.left - 140, bottom: 40}).jGraduate({
            paint: o,
            window: {pickerTitle: i},
            images: {clientPath: curConfig.jGraduatePath},
            newstop: "inverse"
          }, function (t) {
            o = new e.jGraduate.Paint(t), V[n].setPaint(o), svgCanvasInst.setPaint(n, o), e("#color_picker").hide()
          }, function () {
            e("#color_picker").hide()
          })
        }, vn = function (t, n) {
          var o, i, a = curConfig["fill" === n ? "initFill" : "initStroke"],
            r = (new DOMParser).parseFromString('<svg xmlns="http://www.w3.org/2000/svg"><rect width="16.5" height="16.5"\t\t\t\t\tfill="#' + a.color + '" opacity="' + a.opacity + '"/>\t\t\t\t\t<defs><linearGradient id="gradbox_"/></defs></svg>', "text/xml"),
            l = r.documentElement;
          l = e(t)[0].appendChild(document.importNode(l, !0)), l.setAttribute("width", 16.5), this.rect = l.firstChild, this.defs = l.getElementsByTagName("defs")[0], this.grad = this.defs.firstChild, this.paint = new e.jGraduate.Paint({solidColor: a.color}), this.type = n, this.setPaint = function (e, t) {
            this.paint = e;
            var n = "none", a = e.type, r = e.alpha / 100;
            switch (a) {
              case"solidColor":
                n = "none" != e[a] ? "#" + e[a] : e[a];
                break;
              case"linearGradient":
              case"radialGradient":
                this.defs.removeChild(this.grad), this.grad = this.defs.appendChild(e[a]);
                var l = this.grad.id = "gradbox_" + this.type;
                n = "url(#" + l + ")"
            }
            this.rect.setAttribute("fill", n), this.rect.setAttribute("opacity", r), t && (svgCanvasInst.setColor(this.type, o, !0), svgCanvasInst.setPaintOpacity(this.type, i, !0))
          }, this.update = function (e) {
            if (Q) {
              var t, n, a = this.type;
              switch (Q.tagName) {
                case"use":
                case"image":
                case"foreignObject":
                  return;
                case"g":
                case"a":
                  var r = null, l = Q.getElementsByTagName("*");
                  for (t = 0, n = l.length; t < n; t++) {
                    var s = l[t], c = s.getAttribute(a);
                    if (0 === t) r = c; else if (r !== c) {
                      r = null;
                      break
                    }
                  }
                  if (null === r) return void (o = null);
                  o = r, i = 1;
                  break;
                default:
                  i = parseFloat(Q.getAttribute(a + "-opacity")), isNaN(i) && (i = 1);
                  var d = "fill" === a ? "black" : "none";
                  o = Q.getAttribute(a) || d
              }
              e && (svgCanvasInst.setColor(a, o, !0), svgCanvasInst.setPaintOpacity(a, i, !0)), i *= 100;
              var f = He(o, i, a);
              this.setPaint(f)
            }
          }, this.prep = function () {
            var t = this.paint.type;
            switch (t) {
              case"linearGradient":
              case"radialGradient":
                var o = new e.jGraduate.Paint({copy: this.paint});
                svgCanvasInst.setPaint(n, o)
            }
          }
        };
        V.fill = new vn("#fill_color", "fill"), V.stroke = new vn("#stroke_color", "stroke"), e("#stroke_width").val(curConfig.initStroke.width), e("#group_opacity").val(100 * curConfig.initOpacity);
        var hn = V.fill.rect.cloneNode(!1);
        hn.setAttribute("style", "vector-effect:non-scaling-stroke"), A = "non-scaling-stroke" === hn.style.vectorEffect, hn.removeAttribute("style");
        var mn, _n, wn = V.fill.rect.ownerDocument, yn = wn.createElementNS(svgedit.NS.SVG, "feGaussianBlur");
        void 0 === yn.stdDeviationX && e("#tool_blur").hide(), e(yn).remove(), mn = "-" + Ue.toLowerCase() + "-zoom-", _n = mn + "in", R.css("cursor", _n), R.css("cursor") === _n && (G = _n, j = mn + "out"), R.css("cursor", "auto"), e("#fill_color, #tool_fill .icon_label").click(function () {
          gn(e("#fill_color")), he()
        }), e("#stroke_color, #tool_stroke .icon_label").click(function () {
          gn(e("#stroke_color")), he()
        }), e("#group_opacityLabel").click(function () {
          e("#opacity_dropdown button").mousedown(), e(window).mouseup()
        }), e("#zoomLabel").click(function () {
          e("#zoom_dropdown button").mousedown(), e(window).mouseup()
        }), e("#tool_move_top").mousedown(function (t) {
          e("#tools_stacking").show(), t.preventDefault()
        }), e(".layer_button").mousedown(function () {
          e(this).addClass("layer_buttonpressed")
        }).mouseout(function () {
          e(this).removeClass("layer_buttonpressed")
        }).mouseup(function () {
          e(this).removeClass("layer_buttonpressed")
        }), e(".push_button").mousedown(function () {
          e(this).hasClass("disabled") || e(this).addClass("push_button_pressed").removeClass("push_button")
        }).mouseout(function () {
          e(this).removeClass("push_button_pressed").addClass("push_button")
        }).mouseup(function () {
          e(this).removeClass("push_button_pressed").addClass("push_button")
        }), e("#layer_new").click(function () {
          var t, n = svgCanvasInst.getCurrentDrawing().getNumLayers();
          do {
            t = uiStrings.layers.layer + " " + ++n
          } while (svgCanvasInst.getCurrentDrawing().hasLayer(t));
          e.prompt(uiStrings.notification.enterUniqueLayerName, t, function (t) {
            t && (svgCanvasInst.getCurrentDrawing().hasLayer(t) ? e.alert(uiStrings.notification.dupeLayerName) : (svgCanvasInst.createLayer(t), _e(), re()))
          })
        }), e("#layer_delete").click(h), e("#layer_up").click(function () {
          w(-1)
        }), e("#layer_down").click(function () {
          w(1)
        }), e("#layer_rename").click(function () {
          var t = e("#layerlist tr.layersel td.layername").text();
          e.prompt(uiStrings.notification.enterNewLayerName, "", function (n) {
            n && (t == n || svgCanvasInst.getCurrentDrawing().hasLayer(n) ? e.alert(uiStrings.notification.layerHasThatName) : (svgCanvasInst.renameCurrentLayer(n), re()))
          })
        });
        var bn = 300, Cn = 150, xn = -1, kn = !1, Sn = !1, En = function (t) {
          var n = e("#ruler_x");
          e("#sidepanels").width("+=" + t), e("#layerpanel").width("+=" + t), n.css("right", parseInt(n.css("right"), 10) + t), R.css("right", parseInt(R.css("right"), 10) + t), svgCanvasInst.runExtensions("workareaResized")
        }, Fn = function (t) {
          if (Sn && -1 != xn) {
            kn = !0;
            var n = xn - t.pageX, o = e("#sidepanels").width();
            o + n > bn ? (n = bn - o, o = bn) : o + n < 2 && (n = 2 - o, o = 2), 0 != n && (xn -= n, En(n))
          }
        }, Pn = function (t) {
          var n = e("#sidepanels").width(), o = (n > 2 || t ? 2 : Cn) - n;
          En(o)
        };
        e("#sidepanel_handle").mousedown(function (t) {
          xn = t.pageX, e(window).mousemove(Fn), Sn = !1, setTimeout(function () {
            Sn = !0
          }, 20)
        }).mouseup(function (e) {
          kn || Pn(), xn = -1, kn = !1
        }), e(window).mouseup(function () {
          xn = -1, kn = !1, e("#svg_editor").unbind("mousemove", Fn)
        }), re();
        var An, Ln, Dn = function () {
          R.css("line-height", R.height() + "px")
        };
        e(window).bind("load resize", Dn), e("#resolution").change(function () {
          var t = e("#canvas_width,#canvas_height");
          if (this.selectedIndex) if ("content" == this.value) t.val("fit").attr("disabled", "disabled"); else {
            var n = this.value.split("x");
            e("#canvas_width").val(n[0]), e("#canvas_height").val(n[1]), t.removeAttr("disabled")
          } else "fit" == e("#canvas_width").val() && t.removeAttr("disabled").val(100)
        }), e("input,select").attr("autocomplete", "off"), An = [{
          sel: "#tool_select",
          fn: pe,
          evt: "click",
          key: ["V", !0]
        }, {sel: "#tool_fhpath", fn: it, evt: "click", key: ["Q", !0]}, {
          sel: "#tool_line",
          fn: at,
          evt: "click",
          key: ["L", !0]
        }, {
          sel: "#tool_rect",
          fn: lt,
          evt: "mouseup",
          key: ["R", !0],
          parent: "#tools_rect",
          icon: "rect"
        }, {sel: "#tool_square", fn: rt, evt: "mouseup", parent: "#tools_rect", icon: "square"}, {
          sel: "#tool_fhrect",
          fn: st,
          evt: "mouseup",
          parent: "#tools_rect",
          icon: "fh_rect"
        }, {
          sel: "#tool_ellipse",
          fn: ut,
          evt: "mouseup",
          key: ["E", !0],
          parent: "#tools_ellipse",
          icon: "ellipse"
        }, {
          sel: "#tool_circle",
          fn: ct,
          evt: "mouseup",
          parent: "#tools_ellipse",
          icon: "circle"
        }, {
          sel: "#tool_fhellipse",
          fn: dt,
          evt: "mouseup",
          parent: "#tools_ellipse",
          icon: "fh_ellipse"
        }, {sel: "#tool_path", fn: mt, evt: "click", key: ["P", !0]}, {
          sel: "#tool_text",
          fn: ht,
          evt: "click",
          key: ["T", !0]
        }, {sel: "#tool_image", fn: ft, evt: "mouseup"}, {
          sel: "#tool_zoom",
          fn: pt,
          evt: "mouseup",
          key: ["Z", !0]
        }, {sel: "#tool_clear", fn: clickClear, evt: "mouseup", key: ["N", !0]}, {
          sel: "#tool_save", fn: function () {
            $ ? tn() : Rt()
          }, evt: "mouseup", key: ["S", !0]
        }, {sel: "#tool_export", fn: Mt, evt: "mouseup"}, {
          sel: "#tool_open",
          fn: zt,
          evt: "mouseup",
          key: ["O", !0]
        }, {sel: "#tool_import", fn: Gt, evt: "mouseup"}, {
          sel: "#tool_source",
          fn: le,
          evt: "click",
          key: ["U", !0]
        }, {sel: "#tool_wireframe", fn: Qt, evt: "click", key: ["F", !0]}, {
          sel: "#tool_source_save",
          fn: tn,
          evt: "click"
        }, {sel: "#tool_docprops_save", fn: an, evt: "click"}, {
          sel: "#tool_docprops",
          fn: Jt,
          evt: "mouseup"
        }, {sel: "#tool_prefs_save", fn: rn, evt: "click"}, {
          sel: "#tool_prefs_option", fn: function () {
            return $t(), !1
          }, evt: "mouseup"
        }, {
          sel: "#tool_delete,#tool_delete_multi",
          fn: _t,
          evt: "click",
          key: ["del/backspace", !0]
        }, {sel: "#tool_reorient", fn: Et, evt: "click"}, {
          sel: "#tool_node_link",
          fn: Pt,
          evt: "click"
        }, {sel: "#tool_node_clone", fn: At, evt: "click"}, {
          sel: "#tool_node_delete",
          fn: Lt,
          evt: "click"
        }, {sel: "#tool_openclose_path", fn: Tt, evt: "click"}, {
          sel: "#tool_add_subpath",
          fn: Dt,
          evt: "click"
        }, {sel: "#tool_move_top", fn: Ct, evt: "click", key: "ctrl+shift+]"}, {
          sel: "#tool_move_bottom",
          fn: xt,
          evt: "click",
          key: "ctrl+shift+["
        }, {sel: "#tool_topath", fn: St, evt: "click"}, {
          sel: "#tool_undo",
          fn: jt,
          evt: "click",
          key: ["Z", !0]
        }, {sel: "#tool_redo", fn: Ht, evt: "click", key: ["Y", !0]}, {
          sel: "#tool_clone,#tool_clone_multi",
          fn: Vt,
          evt: "click",
          key: ["D", !0]
        }, {sel: "#tool_group_elements", fn: Wt, evt: "click", key: ["G", !0]}, {
          sel: "#tool_ungroup",
          fn: Wt,
          evt: "click"
        }, {sel: "#tool_unlink_use", fn: Wt, evt: "click"}, {
          sel: "[id^=tool_align]",
          fn: Zt,
          evt: "click"
        }, {sel: "[id^=tool_divide]", fn: qt, evt: "click"}, {
          sel: "#tool_bold",
          fn: Ot,
          evt: "mousedown"
        }, {sel: "#tool_italic", fn: Ut, evt: "mousedown"}, {
          sel: "#sidepanel_handle",
          fn: Pn,
          key: ["X"]
        }, {sel: "#copy_save_done", fn: sn, evt: "click"}, {
          key: "ctrl+left", fn: function () {
            Bt(0, 1)
          }
        }, {
          key: "ctrl+right", fn: function () {
            Bt(1, 1)
          }
        }, {
          key: "ctrl+shift+left", fn: function () {
            Bt(0, 5)
          }
        }, {
          key: "ctrl+shift+right", fn: function () {
            Bt(1, 5)
          }
        }, {key: "shift+O", fn: Nt}, {key: "shift+P", fn: It}, {
          key: [N + "up", !0], fn: function () {
            gt(2)
          }
        }, {
          key: [N + "down", !0], fn: function () {
            gt(.5)
          }
        }, {
          key: [N + "]", !0], fn: function () {
            kt("Up")
          }
        }, {
          key: [N + "[", !0], fn: function () {
            kt("Down")
          }
        }, {
          key: ["up", !0], fn: function () {
            Ft(0, -1)
          }
        }, {
          key: ["down", !0], fn: function () {
            Ft(0, 1)
          }
        }, {
          key: ["left", !0], fn: function () {
            Ft(-1, 0)
          }
        }, {
          key: ["right", !0], fn: function () {
            Ft(1, 0)
          }
        }, {
          key: "shift+up", fn: function () {
            Ft(0, -10)
          }
        }, {
          key: "shift+down", fn: function () {
            Ft(0, 10)
          }
        }, {
          key: "shift+left", fn: function () {
            Ft(-10, 0)
          }
        }, {
          key: "shift+right", fn: function () {
            Ft(10, 0)
          }
        }, {
          key: "A", fn: function () {
            svgCanvasInst.selectAllInCurrentLayer()
          }
        }, {key: N + "z", fn: jt}, {key: N + "shift+z", fn: Ht}, {key: N + "y", fn: Ht}, {
          key: N + "x",
          fn: wt
        }, {key: N + "c", fn: yt}, {key: N + "v", fn: bt}], Ln = {
          "4/Shift+4": "#tools_rect_show",
          "5/Shift+5": "#tools_ellipse_show"
        }, D = {
          setAll: function () {
            var t = {};
            e.each(An, function (n, o) {
              var i;
              if (o.sel) {
                if (i = e(o.sel), 0 == i.length) return !0;
                if (o.evt && (svgedit.browser.isTouch() && "click" === o.evt && (o.evt = "mousedown"), i[o.evt](o.fn)), o.parent && 0 != e(o.parent + "_show").length) {
                  var a = e(o.parent);
                  a.length || (a = Oe(o.parent.substr(1))), a.append(i), e.isArray(t[o.parent]) || (t[o.parent] = []), t[o.parent].push(o)
                }
              }
              if (o.key) {
                var r, l = o.fn, s = !1;
                if (e.isArray(o.key) ? (r = o.key[0], o.key.length > 1 && (s = o.key[1]), o.key.length > 2 && o.key[2]) : r = o.key, r += "", e.each(r.split("/"), function (t, n) {
                  e(document).bind("keydown", n, function (e) {
                    return l(), s && e.preventDefault(), !1
                  })
                }), o.sel && !o.hidekey && i.attr("title")) {
                  var c = i.attr("title").split("[")[0] + " (" + r + ")";
                  Ln[r] = o.sel, i.parents("#main_menu").length || i.attr("title", c)
                }
              }
            }), Be(t), e(".attr_changer, #image_url").bind("keydown", "return", function (t) {
              e(this).change(), t.preventDefault()
            }), e(window).bind("keydown", "tab", function (e) {
              "canvas" === H && (e.preventDefault(), It())
            }).bind("keydown", "shift+tab", function (e) {
              "canvas" === H && (e.preventDefault(), Nt())
            }), e("#tool_zoom").dblclick(vt)
          }, setTitles: function () {
            e.each(Ln, function (t, n) {
              var o = e(n).parents("#main_menu").length;
              e(n).each(function () {
                var n;
                n = o ? e(this).text().split(" [")[0] : this.title.split(" [")[0];
                var i = "";
                e.each(t.split("/"), function (e, t) {
                  var n = t.split("+"), o = "";
                  n.length > 1 && (o = n[0] + "+", t = n[1]), i += (e ? "/" : "") + o + (uiStrings["key_" + t] || t)
                }), o ? this.lastChild.textContent = n + " [" + i + "]" : this.title = n + " [" + i + "]"
              })
            })
          }, getButtonData: function (t) {
            var n;
            return e.each(An, function (e, o) {
              o.sel === t && (n = o)
            }), n
          }
        }, D.setAll(), editor.ready(function () {
          var t, n = curConfig.initTool, o = e("#tools_left, #svg_editor .tools_flyout"), i = o.find("#tool_" + n),
            a = o.find("#" + n);
          t = i.length ? i : a.length ? a : e("#tool_select"), t.click().mouseup(), curConfig.wireframe && e("#tool_wireframe").click(), curConfig.showlayers && Pn(),
            e("#rulers").toggle(!!curConfig.showRulers), curConfig.showRulers && (e("#show_rulers")[0].checked = !0), curConfig.baseUnit && e("#base_unit").val(curConfig.baseUnit), curConfig.gridSnapping && (e("#grid_snapping_on")[0].checked = !0), curConfig.snappingStep && e("#grid_snapping_step").val(curConfig.snappingStep), curConfig.gridColor && e("#grid_color").val(curConfig.gridColor)
        }), e("#rect_rx").SpinButton({min: 0, max: 1e3, callback: Qe}), e("#stroke_width").SpinButton({
          min: 0,
          max: 99,
          smallStep: .1,
          callback: Ke
        }), e("#angle").SpinButton({min: -180, max: 180, step: 5, callback: Ye}), e("#font_size").SpinButton({
          min: .001,
          stepfunc: y,
          callback: Xe
        }), e("#group_opacity").SpinButton({min: 0, max: 100, step: 5, callback: Je}), e("#blur").SpinButton({
          min: 0,
          max: 10,
          step: .1,
          callback: $e
        }), e("#zoom").SpinButton({
          min: .001,
          max: 1e4,
          step: 50,
          stepfunc: b,
          callback: L
        }).val(100 * svgCanvasInst.getZoom()), e("#workarea").contextMenu({menu: "cmenu_canvas", inSpeed: 0}, function (e, t, n) {
          switch (e) {
            case"interactivity":
              break;
            case"delete":
              _t();
              break;
            case"deselect":
              var o = svgCanvasInst.getMode();
              svgCanvasInst.clearSelection(), svgCanvasInst.setMode(o);
              break;
            case"cut":
              wt();
              break;
            case"copy":
              yt();
              break;
            case"paste":
              svgCanvasInst.pasteElements();
              break;
            case"paste_in_place":
              svgCanvasInst.pasteElements("in_place");
              break;
            case"group":
            case"group_elements":
              svgCanvasInst.groupSelectedElements();
              break;
            case"ungroup":
              svgCanvasInst.ungroupSelectedElement();
              break;
            case"move_front":
              Ct();
              break;
            case"move_up":
              kt("Up");
              break;
            case"move_down":
              kt("Down");
              break;
            case"move_back":
              xt();
              break;
            default:
              svgedit.contextmenu && svgedit.contextmenu.hasCustomHandler(e) && svgedit.contextmenu.getCustomHandler(e).call()
          }
          // svgCanvasInst.clipBoard.length && M.enableContextMenuItems("#paste,#paste_in_place")
        });
        var Tn = function (e, t, n) {
          switch (e) {
            case"dupe":
              m();
              break;
            case"delete":
              h();
              break;
            case"merge_down":
              _();
              break;
            case"merge_all":
              svgCanvasInst.mergeAllLayers(), _e(), re()
          }
        };
        if (e("#layerlist").contextMenu({
          menu: "cmenu_layers",
          inSpeed: 0
        }, Tn), e("#layer_moreopts").contextMenu({
          menu: "cmenu_layers",
          inSpeed: 0,
          allowLeft: !0
        }, Tn), e(".contextMenu li").mousedown(function (e) {
          e.preventDefault()
        }), e("#cmenu_canvas li").disableContextMenu(), M.enableContextMenuItems("#delete,#deselect,#cut,#copy"), window.addEventListener("beforeunload", function (e) {
          if (0 === O.getUndoStackSize() && (editor.showSaveWarning = !1), !curConfig.no_save_warning && editor.showSaveWarning) return e.returnValue = uiStrings.notification.unsavedChanges, uiStrings.notification.unsavedChanges
        }, !1), editor.openPrep = function (t) {
          e("#main_menu").hide(), 0 === O.getUndoStackSize() ? t(!0) : e.confirm(uiStrings.notification.QwantToOpen, t)
        }, window.FileReader) {
          var In = function (t) {
            e.process_cancel(uiStrings.notification.loadingImage), t.stopPropagation(), t.preventDefault(), e("#workarea").removeAttr("style"), e("#main_menu").hide();
            var n, o = "drop" == t.type ? t.dataTransfer.files[0] : this.files[0];
            o ? -1 != o.type.indexOf("image") && (-1 != o.type.indexOf("svg") ? (n = new FileReader, n.onloadend = function (t) {
              svgCanvasInst.importSvgString(t.target.result, !0), e("#dialog_box").hide()
            }, n.readAsText(o)) : (n = new FileReader, n.onloadend = function (t) {
              var n = function (n, o) {
                var i = svgCanvasInst.addSvgElementFromJson({
                  element: "image",
                  attr: {x: 0, y: 0, width: n, height: o, id: svgCanvasInst.getNextId(), style: "pointer-events:inherit"}
                });
                svgCanvasInst.setHref(i, t.target.result), svgCanvasInst.selectOnly([i]), svgCanvasInst.alignSelectedElements("m", "page"), svgCanvasInst.alignSelectedElements("c", "page"), _e(), e("#dialog_box").hide()
              }, o = 100, i = 100, a = new Image;
              a.src = t.target.result, a.style.opacity = 0, a.onload = function () {
                o = a.offsetWidth, i = a.offsetHeight, n(o, i)
              }
            }, n.readAsDataURL(o))) : e("#dialog_box").hide()
          };
          R[0].addEventListener("dragenter", C, !1), R[0].addEventListener("dragover", x, !1), R[0].addEventListener("dragleave", k, !1), R[0].addEventListener("drop", In, !1);
          var Nn = e('<input type="file">').change(function () {
            var t = this;
            editor.openPrep(function (n) {
              if (n && (svgCanvasInst.clear(), 1 === t.files.length)) {
                e.process_cancel(uiStrings.notification.loadingImage);
                var o = new FileReader;
                o.onloadend = function (e) {
                  s(e.target.result), ve()
                }, o.readAsText(t.files[0])
              }
            })
          });
          e("#tool_open").show().prepend(Nn);
          var Bn = e('<input type="file">').change(In);
          e("#tool_import").show().prepend(Bn)
        }
        ve(!0), e(function () {
          window.svgCanvas = svgCanvasInst, svgCanvasInst.ready = editor.ready
        }), editor.setLang = function (t, n) {
          if (editor.langChanged = !0, e.pref("lang", t), e("#lang_select").val(t), n) {
            var o = e("#layerlist tr.layersel td.layername").text(), i = o == uiStrings.common.layer + " 1";
            if (e.extend(uiStrings, n), svgCanvasInst.setUiStrings(n), D.setTitles(), i && (svgCanvasInst.renameCurrentLayer(uiStrings.common.layer + " 1"), re()), Ge.length) for (; Ge.length;) {
              var a = Ge.shift();
              a.langReady({lang: t, uiStrings: uiStrings})
            } else svgCanvasInst.runExtensions("langReady", {lang: t, uiStrings: uiStrings});
            svgCanvasInst.runExtensions("langChanged", t), Ie();
            var r = {
              "#stroke_color": "#tool_stroke .icon_label, #tool_stroke .color_block",
              "#fill_color": "#tool_fill label, #tool_fill .color_block",
              "#linejoin_miter": "#cur_linejoin",
              "#linecap_butt": "#cur_linecap"
            };
            e.each(r, function (t, n) {
              e(n).attr("title", e(t)[0].title)
            }), e("#multiselected_panel div[id^=tool_align]").each(function () {
              e("#tool_pos" + this.id.substr(10))[0].title = this.title
            })
          }
        },

        svgCanvasInst && svgCanvasInst.setColor("fill", "#FFFFFF"), svgeditUtilites.takePil() && (F(), P(function () {
          editor.currentExtensionsInteractivityType = svgCanvasInst.getExtensionMember("getClassId"), editor.currentExtensionsPrefixIdType = svgCanvasInst.getExtensionMember("getPrefixId")
        }))
      },
        editor.ready = function (e) {
        isReady ? e() : callbacks.push(e)
      }, editor.runCallbacks = function () {
        e.each(callbacks, function () {
          this()
        }), isReady = !0
      }, editor.loadFromString = function (e) {
        editor.ready(function () {
          s(e)
        })
      }, editor.disableUI = function (e) {
      }, editor.loadFromURL = function (t, n) {
        n || (n = {});
        var o = n.cache, i = n.callback;
        editor.ready(function () {
          e.ajax({
            url: t, dataType: "text", cache: !!o, beforeSend: function () {
              e.process_cancel(uiStrings.notification.loadingImage)
            }, success: function (e) {
              s(e, i)
            }, error: function (t, n, o) {
              404 != t.status && t.responseText ? s(t.responseText, i) : e.alert(uiStrings.notification.URLloadFail + ": \n" + o, i)
            }, complete: function () {
              e("#dialog_box").hide()
            }
          })
        })
      }, editor.loadFromDataURI = function (e) {
        editor.ready(function () {
          var t = !1, n = e.match(/^data:image\/svg\+xml;base64,/);
          n ? t = !0 : n = e.match(/^data:image\/svg\+xml(?:;(?:utf8)?)?,/), n && (n = n[0]);
          var o = e.slice(n.length);
          s(t ? svgeditUtilites.decode64(o) : decodeURIComponent(o))
        })
      }, editor.addExtension = function () {
        var e = arguments;
        svgCanvasInst && (svgCanvasInst.addExtension.apply(this, e), editor && editor.extensionLoadedCallback && editor.extensionLoadedCallback(e[0], e))
      }, editor
    }(jQuery)
  }
};

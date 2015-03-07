// Mouse control

var pressd = false;

$("html")
    .mousedown(function(){ pressd = true; })
    .mouseup(function(){ pressd = false; });

// Trackbar class

function Trackbar(onChangeValue) {
    this.track = $("<div class=\"track\">");
    this.field = $("<canvas class=\"field\" width=\"256\" height=\"20\">");
    this.value = 0;
    this.valel = $("<div class=\"value\">0</div>");
    this.label = $("<div class=\"label\">");
    this.onChangeValue = onChangeValue;

    this.field
        .mousedown( (function(o) { return function(e){
            o.value = e.offsetX;
            o.valel.html(e.offsetX);
            o.label.css("left", e.offsetX+"px");
            if ( o.onChangeValue !== undefined )
                o.onChangeValue(e.offsetX);
        } })(this) )
        .mousemove( (function(o) { return function(e){
            if ( pressd ) {
                o.value = e.offsetX;
                o.valel.html(e.offsetX);
                o.label.css("left", e.offsetX+"px");
                if ( o.onChangeValue !== undefined )
                    o.onChangeValue(e.offsetX);
            }
        }}) (this) );

    this.track.append(this.field).append(this.valel).append(this.label);

    this.context = function () {
        return this.field[0].getContext("2d");
    }
}

var redT = new Trackbar(updateColors);
var greenT = new Trackbar(updateColors);
var blueT = new Trackbar(updateColors);

$("#tracks")
    .append(redT.track)
    .append(greenT.track)
    .append(blueT.track);

function updateColors() {
    var ctx = redT.context();
    var grd = ctx.createLinearGradient(0,0,256,0);
    grd.addColorStop(0,"rgb(" + 0 + "," + greenT.value + "," + blueT.value + ")");
    grd.addColorStop(1,"rgb(" + 255 + "," + greenT.value + "," + blueT.value + ")");
    ctx.fillStyle = grd;
    ctx.fillRect(0,0,256,20);

    ctx = greenT.context();
    grd = ctx.createLinearGradient(0,0,256,0);
    grd.addColorStop(0,"rgb(" + redT.value + "," + 0 + "," + blueT.value + ")");
    grd.addColorStop(1,"rgb(" + redT.value + "," + 255 + "," + blueT.value + ")");
    ctx.fillStyle = grd;
    ctx.fillRect(0,0,256,20);

    ctx = blueT.context();
    grd = ctx.createLinearGradient(0,0,256,0);
    grd.addColorStop(0,"rgb(" + redT.value + "," + greenT.value + "," + 0 + ")");
    grd.addColorStop(1,"rgb(" + redT.value + "," + greenT.value + "," + 255 + ")");
    ctx.fillStyle = grd;
    ctx.fillRect(0,0,256,20);
}

updateColors();
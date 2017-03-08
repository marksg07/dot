var svgspace = document.getElementById("svgcanvas");
var animateButton = document.getElementById( "animate" );

var requestID;

var circleClick = function(e){
    if (this.getAttribute("fill") == "red"){
        this.parentNode.removeChild(this);
        var randx = Math.random() * (svgspace.width.animVal.value - 80) + 40;
        var randy = Math.random() * (svgspace.height.animVal.value - 80) + 40;
        drawRand(randx, randy);
    }
    else if (this.getAttribute("fill") == "purple"){
        this.setAttribute("fill", "red");
    }
    e.stopPropagation();
    //e.target();

};

var makeDot = function(x, y){
    var element = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    element.setAttribute("cx", x);
    element.setAttribute("cy", y);
    element.setAttribute("r", 40);
    element.setAttribute("fill", "purple");
    element.setAttribute("stroke", "white");
    element.xv = 1;
    element.yv = 1;

    element.addEventListener("click", circleClick);

    return element;
};

var drawRand = function(x, y){
    var dot = makeDot(x, y);
    svgspace.appendChild(dot);
}


var drawDot = function(e){
        var dot = makeDot(e.offsetX, e.offsetY);
        svgspace.appendChild(dot);
};

var animateDots = function() {
    
    window.cancelAnimationFrame( requestID );
    
    //console.log(requestID);

    //init params for drawing dot
    

    var drawDots = function() {
    console.log( requestID )

    // while (svgspace.lastChild) {
    //     svgspace.removeChild(svgspace.lastChild);
    // }

    var dots = svgspace.children;
    var len = dots.length;

    for (var i = 0; i < len; i++){
        var dot = dots[i]
        var x = parseInt(dot.getAttribute("cx"));
        var y = parseInt(dot.getAttribute("cy"));

        if( x<40 || x>(750 - 40)) dot.xv=parseInt(-dot.xv); 
        if( y<40 || y>(750 - 40)) dot.yv=parseInt(-dot.yv);
        x += parseInt(dot.xv);
        y += parseInt(dot.yv);


        dot.setAttribute("cx", x); 
        dot.setAttribute("cy", y); 

    };

    requestID = window.requestAnimationFrame( drawDots );
    };
    drawDots();
};



var clearBut = document.getElementById("clear");
clearBut.addEventListener("click", function() {
    console.clear() 
    while (svgspace.lastChild) {
        svgspace.removeChild(svgspace.lastChild);
    }
});

var stopIt = function() {
    console.log("stop initiated")
    //console.log( requestID );
    window.cancelAnimationFrame( requestID );
};

svgspace.addEventListener("click", drawDot);

stopButton.addEventListener( "click",  stopIt );

animateButton.addEventListener( "click", animateDots );



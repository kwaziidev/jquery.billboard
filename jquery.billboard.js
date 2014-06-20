(function($) {
    $.fn.billboard = function(options,blocks) {
    	var container=$(this);

		var settings=$.extend({
        	cWidth: 960,
        	cHeight: 1000,
        	minBlockHeight: 30,
        	minBlockWidth: 100,
        	blockBorderWidth: 2,
        	block1Scale: 10,
        	block2Scale: 10,
        	flag: false,
        	iteBCA: "#74e3ae,#a3c6fe,#c571fd,#ffcc4c,#f9b9b7,#fe4449"
        }, options || {});

		var blocks = blocks || {};

		var blockArr =new Array();

        var initialize=function() {
        	var a = calCellSize();
        	this.rowNum = a.rowNum;
        	this.colNum = a.colNum;
        	this.blockHeight = Math.floor(settings.cHeight / this.rowNum) - settings.blockBorderWidth;
        	this.blockWidth = Math.floor(settings.cWidth / this.colNum) - settings.blockBorderWidth;
        	this.blockObj = {
        		block1: {
        			initNum: Math.round(this.rowNum * this.colNum / settings.block1Scale),
        			readerNum: 0
        		},
        		block2: {
        			initNum: Math.ceil(this.rowNum * this.colNum / settings.block2Scale),
        			readerNum: 0
        		}
        	};
        	if (this.rowNum * this.colNum < 20) {
        		settings.blockBorderWidth = 1
        	}
        	if (this.colNum < 2) {
        		this.blockObj.block1.initNum = 0
        	}
        	if (this.rowNum < 2) {
        		this.blockObj.block1.initNum = this.blockObj.block2.initNum = 0
        	}
        	this.iteBCA = settings.iteBCA.split(",");
        	this.adContainer = container.get(0);
        	this.adContainer.style.width = settings.cWidth + "px";
        	this.adContainer.style.height = settings.cHeight + "px"
        };

	    var calCellSize=function() {
	    	var i = {};
	        var c = Math.floor(settings.cHeight / settings.minBlockHeight); //以最小块为例,纵向最大个数
	        var d = Math.floor(settings.cWidth / settings.minBlockWidth);	//以最小块为例,横向最大个数
	        var f = c * d; //以最小块为例,总个数
	        var b = Math.round(f / settings.block1Scale);
	        var h = Math.ceil(f / settings.block2Scale);
	        var g = (2 * 2 - 1) / settings.block1Scale + (2 * 1 - 1) / settings.block2Scale;
	        var a = blocks.length / (1 - g);
	        if (a < f) {
	        	var e = Math.sqrt(a / f);
	        	c = Math.floor(settings.cHeight * e / settings.minBlockHeight);
	        	d = Math.floor(settings.cWidth * e / settings.minBlockWidth)
	        }
	        i.rowNum = c;
	        i.colNum = d;
	        return i;
	    };


	    var render=function() {
	    	initialize();
	    	for (k = 0, l = blocks.length; k < l; k++) {
	    		settings.flag = false;
	    		var a = document.createElement("a");
	    		a.innerHTML = blocks[k].title;
	    		a.href = blocks[k].curl;
	    		a.target = "_blank";
	    		if (this.blockObj.block1.readerNum != this.blockObj.block1.initNum) {
	    			this.blockObj.block1.readerNum++;
	    			reanderAd(renderBlock1, 1, 1, a)
	    		} else {
	    			if (this.blockObj.block2.readerNum != this.blockObj.block2.initNum) {
	    				this.blockObj.block2.readerNum++;
	    				reanderAd(renderBlock2, 1, 0, a)
	    			} else {
	    				reanderAd(renderBlock3, 0, 0, a)
	    			}
	    		}
	    	}
	    };
	    var reanderAd=function(f, b, e, d) {
	    	for (var c = 0; c < 300; c++) {
	    		var a = Math.floor(Math.random() * (this.rowNum - b));
	    		var g = Math.floor(Math.random() * (this.colNum - e));
	    		if (f(a, g, d)) {
	    			break
	    		}
	    	}
	    	if (c == 300) {
	    		for (var a = 0; a < this.rowNum - this.blockNeedRowNum; a++) {
	    			for (var g = 0; g < this.colNum - this.blockNeedColNum; g++) {
	    				if (f(a, g, d)) {
	    					a = this.rowNum;
	    					break
	    				}
	    			}
	    		}
	    	}
	    	if (!settings.flag) {
	    		for (var a = 0; a < this.rowNum; a++) {
	    			for (var g = 0; g < this.colNum; g++) {
	    				if (renderBlock3(a, g, d)) {
	    					a = this.rowNum;
	    					break
	    				}
	    			}
	    		}
	    	}
	    };
	    var renderBlock1=function(a, d, b) {
	    	blockArr[a] = blockArr[a] || [];
	    	blockArr[a + 1] = blockArr[a + 1] || [];
	    	blockArr[a + 2] = blockArr[a + 2] || [];
	    	blockArr[a + 3] = blockArr[a + 3] || [];
	    	blockArr[a - 1] = blockArr[a - 1] || [];
	    	blockArr[a - 2] = blockArr[a - 2] || [];
	    	if ((blockArr[a - 1][d] == "block1" && blockArr[a - 1][d + 1] == "block1" && blockArr[a - 2][d] == "block1" && blockArr[a - 2][d + 1] == "block1") || (blockArr[a + 2][d] == "block1" && blockArr[a + 2][d + 1] == "block1" && blockArr[a + 3][d] == "block1" && blockArr[a + 3][d + 1] == "block1") || (blockArr[a][d + 2] == "block1" && blockArr[a][d + 3] == "block1" && blockArr[a + 1][d + 2] == "block1" && blockArr[a + 1][d + 3] == "block1") || (blockArr[a][d - 1] == "block1" && blockArr[a][d - 2] == "block1" && blockArr[a + 1][d - 1] == "block1" && blockArr[a + 1][d - 2] == "block1")) {
	    		return false;
	    	}
	    	if (!blockArr[a][d] && !blockArr[a][d + 1]) {
	    		if (!blockArr[a + 1][d] && !blockArr[a + 1][d + 1]) {
	    			blockArr[a][d] = blockArr[a][d + 1] = blockArr[a + 1][d] = blockArr[a + 1][d + 1] = "block1";
	    			b.className = "block1";
	    			var c = Math.floor(Math.random() * 1);
	    			addAdStyle(a, d, 2, 2, b, c);
	    			settings.flag = true;
	    			return true;
	    		}
	    	}
	    	return false;
	    };
	    var renderBlock2=function(a, e, c) {
	    	blockArr[a] = blockArr[a] || [];
	    	blockArr[a + 1] = blockArr[a + 1] || [];
	    	blockArr[a + 2] = blockArr[a + 2] || [];
	    	blockArr[a + 3] = blockArr[a + 3] || [];
	    	blockArr[a - 1] = blockArr[a - 1] || [];
	    	blockArr[a - 2] = blockArr[a - 2] || [];
	    	if ((blockArr[a - 1][e] == "block2" && blockArr[a - 2][e] == "block2") || (blockArr[a + 2][e] == "block2" && blockArr[a + 3][e] == "block2") || (blockArr[a][e - 1] == "block2" && blockArr[a + 1][e - 1] == "block2") || (blockArr[a][e + 1] == "block2" && blockArr[a + 1][e + 1] == "block2")) {
	    		return false;
	    	}
	    	if (!blockArr[a][e] && !blockArr[a + 1][e]) {
	    		blockArr[a][e] = blockArr[a + 1][e] = "block2";
	    		var b = Math.ceil(c.innerHTML.replace(/[^\x00-\xff]/g, "ci").length / 2);
	    		c.className = "block2 block2_" + b;
	    		var d = Math.floor(Math.random() * 2) + 1;
	    		addAdStyle(a, e, 2, 1, c, d);
	    		settings.flag = true;
	    		return true;
	    	}
	    	return false;
	    };
	    var renderBlock3=function(a, d, b) {
	    	blockArr[a] = blockArr[a] || [];
	    	if (!blockArr[a][d]) {
	    		blockArr[a][d] = 1;
	    		b.className = "block3";
	    		var c = Math.floor(Math.random() * (this.iteBCA.length / 2 - 3)) + 3;
	    		addAdStyle(a, d, 1, 1, b, c);
	    		settings.flag = true;
	    		return true;
	    	}
	    	return false;
	    };
	    var addAdStyle=function(a, g, e, c, d, f) {
	    	d.style.top = (this.blockHeight + settings.blockBorderWidth) * a + "px";
	    	d.style.left = (this.blockWidth + settings.blockBorderWidth) * g + "px";
	    	d.style.height = d.style.lineHeight = this.blockHeight * e + settings.blockBorderWidth * (e - 1) + "px";
	    	d.style.width = this.blockWidth * c + settings.blockBorderWidth * (c - 1) + "px";
	    	var b = this.iteBCA[f];
	    	d.style.backgroundColor = b;
	    	d.style.color='#FFFFFF';
	    	d.style.textAlign='center';
	    	d.style.textDecoration='none';
	    	d.style.position='absolute';
	    	this.adContainer.appendChild(d);
	    	if (a + (e - 1) == (this.rowNum - 1)) {
	    		d.style.height = d.style.lineHeight = settings.cHeight - (this.blockHeight + settings.blockBorderWidth) * a + "px"
	    	}
	    	if (g + (c - 1) == (this.colNum - 1)) {
	    		d.style.width = settings.cWidth - (this.blockWidth + settings.blockBorderWidth) * g + "px"
	    	}
	    	d.onmouseover = function() {
	    		d.style.backgroundColor = this.iteBCA[f + this.iteBCA.length / 2]
	    	};
	    	d.onmouseout = function() {
	    		d.style.backgroundColor = b
	    	}
	    };

	    render();
	    return this;
    }
})(jQuery);
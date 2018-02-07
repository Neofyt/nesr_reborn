
var d = document,
	w = window,
	StorageName = "Nesroulette",
	Nesroulette = {
		Arpeggio: {
			sl: true,
			ds: 0,
			dk: 0
		},
		Capriccio: {
			sl: true,
			ds: 0,
			dk: 0
		},
		Cosi: {
			sl: true,
			ds: 0,
			dk: 0
		},
		Deca: {
			sl: true,
			ds: 0,
			dk: 0
		},
		int: {
			sl: true,
			ds: 0,
			dk: 0
		},
		lun: {
			sl: true,
			ds: 0,
			dk: 0
		},
		Dulsao: {
			sl: true,
			ds: 0,
			dk: 0
		},
		Finezzo: {
			sl: true,
			ds: 0,
			dk: 0
		},
		Fortissio: {
			sl: true,
			ds: 0,
			dk: 0
		},
		Indriya: {
			sl: true,
			ds: 0,
			dk: 0
		},
		Livanto: {
			sl: true,
			ds: 0,
			dk: 0
		},
		Ristretto: {
			sl: false,
			ds: 0,
			dk: 0
		},
		Roma: {
			sl: false,
			ds: 0,
			dk: 0
		},
		Rosabaya: {
			sl: true,
			ds: 0,
			dk: 0
		},
		Vivalto: {
			sl: false,
			ds: 0,
			dk: 0
		},
		Volluto: {
			sl: false,
			ds: 0,
			dk: 0
		}
	},
	settings = {
		Arpeggio: {
			st: 9,
			color: "#5F3E63"
		},
		Capriccio: {
			st: 5,
			color: "#384B34"
		},
		Cosi: {
			st: 3,
			color: "#2A1D13"
		},
		Deca: {
			st: 2,
			color: "#531912"
		},
		int: {
			st: 3,
			color: "#7C262A"
		},
		lun: {
			st: 7,
			color: "#703022"
		},
		Dulsao: {
			st: 5,
			color: "#977551"
		},
		Finezzo: {
			st: 3,
			color: "#AF9637"
		},
		Fortissio: {
			st: 7,
			color: "#1D3E2F"
		},
		Indriya: {
			st: 10,
			color: "#56543F"
		},
		Livanto: {
			st: 6,
			color: "#8E441A"
		},
		Ristretto: {
			st: 10,
			color: "#25281D"
		},
		Roma: {
			st: 8,
			color: "#403C2E"
		},
		Rosabaya: {
			st: 6,
			color: "#A66F77"
		},
		Vivalto: {
			st: 4,
			color: "#334F81"
		},
		Volluto: {
			st: 4,
			color: "#896A2E"
		}
	},
	canvas = document.getElementsByTagName('canvas')[0],
	ctx = canvas.getContext('2d'),
	doses = ['short','long'],
	sugar = ['with','without'];

	canvas.width = canvas.height = 16;


// ============
// HELPERS
// ============

function $(expr) { return d.body.querySelector(expr); }
function $$(expr) { return d.body.querySelectorAll(expr); }

// Browser sniffing
var ua = (function(){
	var agent = navigator.userAgent.toLowerCase();
	return function(browser){
		return agent.indexOf(browser) !== -1;
	};
}());

var browser = {
	ie: ua('msie'),
	chrome: ua('chrome'),
	webkit: ua('chrome') || ua('safari'),
	safari: ua('safari') && !ua('chrome'),
	mozilla: ua('mozilla') && !ua('chrome') && !ua('safari')
};

Array.prototype.rdm = function(){
	return this[Math.floor(Math.random() * this.length)];
}

String.prototype.format = function(){
	var string = this;

	for (var i = 0, j = arguments.length; i < j; i++) {
		string = string.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
	}

	return string;
};

//function k(c, f, p) {
//	if (w.c === c) {
//		p ? f(p) : f();
//	}
//}

function k(c, f, p){
	if (w.c === c) f(p);
}


function log(m){
	return console.log(m);
}


// =================
// CSS MANIPULATIONS
// =================

Element.prototype.hasClass = function (className) {
    return new RegExp(' ' + className + ' ').test(' ' + this.className + ' ');
};

Element.prototype.addClass = function (className) {
    if (!this.hasClass(className)) {
        this.className += ' ' + className;
    }
    return this;
};

Element.prototype.removeClass = function (className) {
    var newClass = ' ' + this.className.replace(/[\t\r\n]/g, ' ') + ' ';
    if (this.hasClass(className)) {
        while (newClass.indexOf( ' ' + className + ' ') >= 0) {
            newClass = newClass.replace(' ' + className + ' ', ' ');
        }
        this.className = newClass.replace(/^\s+|\s+$/g, ' ');
    }
    return this;
};

Element.prototype.toggleClass = function(className){
	 if (!this.hasClass(className)) {
        this.className += ' ' + className;
    } else {
    	this.removeClass(className);
    }
    return this;
}






function isFirstRun() {
	(localStorage.getItem(StorageName)) ? load() : save();
}

function save() {
	localStorage.setItem(StorageName, JSON.stringify(Nesroulette));
}

function load() {
	Nesroulette = JSON.parse(localStorage.getItem(StorageName));
	list();
}

function get(coffee, param) {
	return (param) ? Nesroulette[coffee][param] : Nesroulette[coffee];
}

function set(coffee, param, val) {
	Nesroulette[coffee][param] = val;
	save();
}

function rdm() {
	var selected = [];
	for (var prop in Nesroulette) {
		if (Nesroulette[prop].sl === true) {
			selected.push(prop);
		}
	}
	return selected[Math.floor(selected.length * Math.random())];
}

function list() {
	for (var prop in Nesroulette) {
		if (Nesroulette.hasOwnProperty(prop)) {
			var coffee = $("input[name='"+ prop +"']");
			//console.log(coffee);
			coffee.value = Nesroulette[prop].ds;
			if (Nesroulette[prop].sl) {
				//coffee.parent().parent().parent().addClass("selected");
				coffee.parentNode.parentNode.parentNode.addClass("selected");
			}
		}
	}
}


function append(coffee, str, dos) {
	dos = dos || 0;

	Nesroulette[coffee] = {
		st: str,
		sl: true,
		ds: dos,
		dk: 0
	};
}

function remove(coffee) {
	delete Nesroulette[coffee];
}


function updateCount(obj, delta) {
	var parent = $(obj).parentNode,
		item = parent.find("input"),
		newValue = parseInt(item.val(), 10) + delta,
		coffee = $(item).prop("name");

	item.val(Math.max(newValue, 0));

	set(coffee, "ds", Math.max(newValue, 0));
					
	if(Math.max(newValue, 0) === 0){
		$("#"+coffee).removeClass(coffee + " selected");
		$(parent).addClass("hide");
	} else {
		if ($("#"+coffee).hasClass(coffee + " selected") !== true){
			$("#"+coffee).addClass(coffee + " selected");
		}
		if ($(parent).hasClass("hide")){
			$(parent).removeClass("hide")
		}
	}

	save();
}


function updateCount2(item, delta) {


	var oldValue = get(item, "ds"),
		newValue = oldValue + delta;


	set(item, "ds", newValue);


	if(newValue == 0){
		$("#"+item).parentNode.parentNode.parentNode.removeClass("selected");
		//$("#"+item).parentNode.addClass("hide");
	} else {
			$("#"+item).value = newValue;

	}		/*
		if ($("#"+coffee).hasClass(coffee + " selected") !== true){
			$("#"+coffee).addClass(coffee + " selected");
		}*/
		/*if ($(parent).hasClass("hide")){
			$(parent).removeClass("hide")
		}
	}*/















/*
	var which = d.getElementsByName(item);
	console.log(which, which.value);
	var newValue = parseInt(which.value, 10) + delta;
	console.log('A', newValue);


		coffee = $(item).getAttribute("name");

	item.value = Math.max(newValue, 0);

	set(coffee, "ds", Math.max(newValue, 0));
					
	if(Math.max(newValue, 0) === 0){
		$("#"+coffee).removeClass(coffee + " selected");
		$(parent).addClass("hide");
	} else {
		if ($("#"+coffee).hasClass(coffee + " selected") !== true){
			$("#"+coffee).addClass(coffee + " selected");
		}
		if ($(parent).hasClass("hide")){
			$(parent).removeClass("hide")
		}
	}

	save();
	*/
}



function chooseOne() {
	var coffee = rdm(), 
		coffeeName;

	if(coffee){

		switch (coffee){
			case "lun":
				coffeeName = "Deca. lun.";
				break;
			case "int":
				coffeeName = "Deca. int.";
				break;
			default:
				coffeeName = coffee;
		}

		$("#scale td").removeClass("selected");

		window.location.hash = coffee;
		var color = settings[coffee].color;

		$("#verdict").css({"display": "block", "background": color})
			.find("h1")
			.html(coffeeName + " <span>" + doses[Math.floor(Math.random()*doses.length)] + " " + sugar[Math.floor(Math.random()*sugar.length)] + " sugar</span>");

		$("#sc" + settings[coffee].st).addClass("selected");

		//drawFavicon(color);

	} else {
		displayMessage('Please pick your coffees first !!', '#ffdfdf', 'red', true, 'none');
	}
}



function drawFavicon(color){
	ctx.fillStyle = color;
	ctx.clearRect(0, 0, 16, 16);
	ctx.fillRect(0, 0, 16, 16);
	$('link[rel="shortcut icon"]').prop('href', canvas.toDataURL());
}









isFirstRun();

//append("Crealto", 8, 10);
//set("Finezzo", "dos", 12);
//remove("Dulsao");

list();

//window.location.hash = JSON.stringify(Nesroulette);

// AFFECTATIONS

/*	$('td.coffee').click(function(){
		var coffee = $(this).prop('id');

		if($("input[name="+coffee+"]").prop("value") !== "0" ){
			$(this).toggleClass(coffee + " selected");
		} else {
			if(coffee === "lun"){ coffee = "Deca. lun."; };
			if(coffee === "int"){ coffee = "Deca. int."; };
			displayMessage('There is no available cup for ' + coffee, '#ffdfdf', 'red', true, 'none');
		}
		
		saveList();
	});
	*/
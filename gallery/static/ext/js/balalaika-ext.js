$.fn.prepend = function(element) {
    element = $(element);
    this.forEach(function(node){
			element.forEach(
			function(chunk){
				node.insertBefore(chunk, node.firstChild);
				});
		});
    return this;
};
	
$.fn.hasClass = function( className ) {
	//return !!this[ 0 ] && this[ 0 ].classList.contains( className );
	// this code is compatible with ie8
	return new RegExp('(\\s|^)' + className + '(\\s|$)').test(this[ 0 ].className);
};

$.fn.append = function(element) {
    element = $(element);
    this.forEach(function(node){
		element.forEach(function(chunk){
				node.appendChild(chunk);
			});
		});
    return this;
};

$.fn.replaceClass = function(a, b) {
    this.removeClass(a);
    this.addClass(b);
    return this;
};

/* Not working in ie8
$.fn.appendTo = function(element) {
	//This method is not working in ie8
	
    element = $(element);
    this.forEach(function(node){
        element.forEach(function(chunk){
			chunk.appendChild(node);
			});
    });
    return this;
	
};
*/
$.fn.addClass = function(className) {
	
    this.forEach(function(item){
		//item.classList.add.apply(item.classList, className.split(/\s/));
		// this code is compatible with ie8
		if (!$(item).hasClass(className)) {
			item.className += ' ' + className;
		}
	});
    return this;
};

$.fn.removeClass = function(className) {
    this.forEach(function(item){
		//item.classList.remove.apply(item.classList, className.split(/\s/))
			// this code is compatible with ie8
			if ($(item).hasClass(className)) {
				var newClass = ' ' + item.className.replace( /[\t\r\n]/g, ' ') + ' ';

				while (newClass.indexOf(' ' + className + ' ') >= 0 ) {
					newClass = newClass.replace(' ' + className + ' ', ' ');
				}
				item.className = newClass.replace(/^\s+|\s+$/g, '');

			}
		});
    return this;
};

function removeClass(elem, className) {
    var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, ' ') + ' ';
    if (hasClass(elem, className)) {
        while (newClass.indexOf(' ' + className + ' ') >= 0 ) {
            newClass = newClass.replace(' ' + className + ' ', ' ');
        }
        elem.className = newClass.replace(/^\s+|\s+$/g, '');
    }
}

// Заменить класс, если он есть
$.fn.swapClass = function(a, b) {
    if (this.hasClass(a)) {
        this.replaceClass(a, b);
    } else {
        this.replaceClass(b, a);
    }
	
    return this;
};

$.fn.toggleClass = function(className) {
    if (this.hasClass(className)) {
        this.removeClass(className);
    } else {
        this.addClass(className);
    }
    return this;
};

$.fn.on = function(event, handler) {
	this.forEach(function(e) {
		e.addEventListener(event, handler);
	});

	return this;
};

/* Лучше не использовать
$.fn.show = function() {
	$.extend(this,{
		display: 'block'
	});
    
    return this;
};

$.fn.hide = function() {
    $.extend(this,{
		display: 'none'
	});
    return this;
};
*/

$.fn.siblings = function(of_type) {
        var siblings = [];
        var sibling = this[0].parentNode.firstChild;

        while (sibling) {
            if (
                sibling.nodeType === 1 &&
                sibling !== this[0] &&
                (of_type ? sibling.localName === of_type : true)
            ) {
                siblings.push(sibling);
            }
            sibling = sibling.nextSibling;
        }

        return $(siblings);
    }

//Get cross-browser firstElementChild for ie8 and other browsers
$.fn.firstElementChild = function() {
        var fec = this[0].firstElementChild;
		if(fec === undefined){
			fec = this[0].firstChild;
		}
        return $(fec);
    }

// children не всегда работает, использовать осторожно
$.fn.children = function(of_type) {
    return of_type ? $(of_type, this) : $(this[0].children);
};


$.fn.parent = function() {
    return $(this[0].parentNode);
};
/* Лучше не использовать
$.fn.is_visible = function() {
    return this[0] && !this[0].hidden;
};

$.fn.is_hidden = function() {
    return this[0] && this[0].hidden;
};
*/
/* Этот метод лучше не использовать
$.fn.html = function(content) {
    if (
        typeof content != "object" ||
        (typeof content == "string" && content.trim()[0] != "<")
    ) {
        this.forEach(function(node){
            node.innerText = content;
        });
    } else {
        content = $(content);
        this.forEach(function(node){
            content.forEach(function(e){
				node.appendChild(e)
			});
        });
    }
    return this;
};
*/
$.fn.parents = function(selector) {
	var collection = $();
	this.forEach(function(node) {
		var parent;
		while((node = node.parentNode) && (node !== document)) {
			if(selector) {
				if($(node).is(selector)) {
					parent = node;
				}
			} else {
				parent = node;
			}
			if(parent && !~collection.indexOf(parent)) {
				collection.push(parent);
			}
		}
	});
	
	return collection;
};

var typeMatch = function(o, type){
    return (typeof o === type);
};

$.fn.attr = function (attributeName, val) {
    if (!val || !typeMatch(val, 'string')) {
        return this[0].getAttribute(attributeName);
    } else {
        $(this).forEach(function (item) {
            item.setAttribute(attributeName, val);
        });
    }

    return this;
};

$.fn.is = function( s ) {
		if(this.length > 0){
			var i = this[ 0 ];
		}else{
			return false;
		}
		return (i.matches
				|| i[ 'webkit' + s_MatchesSelector ]
				|| i[ 'moz' + s_MatchesSelector ]
				|| i[ 'ms' + s_MatchesSelector ]
				|| i[ 'o' + s_MatchesSelector ]).call( i, s );
		}		
	
/*
You can do AJAX requests using SULX (SUL AJAX) object:

//Do a GET request
SULX.get(url, callback, options);

//Do a POST request
SULX.post(url, data, callback, options);

Where:

url - target URL

data - data, that will be sent with POST request

callback(status, data) - the callback function, which will be called when request will be finished. The status argument is status code from server, and data is data from server (will be null if request failed)

options - options for AJAX request, must be an object. By default, global options used, but you can use custom or edit globalOptions, so they will be applied for all next requests.

Example of options object:

var options = {};

options.async = true; //Should request be async?
options.contentType = "application/x-www-form-urlencoded"; // Content-Type header
options.ajaxHeader = true; //Should SUL include AJAX header in request? (X-Requested-With)

*/

function sulNoop() {
		// nope :)
	}

$.ajax =  

	{

		globalOptions: {
			async: true,
			contentType: "application/x-www-form-urlencoded",
			ajaxHeader: true
		},

		ajax: function(method, url, data, callback, options) {
			if (method.toUpperCase() != "GET" && method.toUpperCase() != "POST") {
				console.log("[SUL AJAX] Invalid method. Use GET or POST");
				return;
			}

			var xhr = new XMLHttpRequest();

			xhr.open(method, url, options.async);

			xhr.setRequestHeader("Content-Type", options.contentType);

			if (options.ajaxHeader) {
				xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
			}

			if (data == {}) {
				xhr.send();
			} else {
				xhr.send(data);
			}



			xhr.onreadystatechange = function() {
			  if (xhr.readyState != 4) return;

			  if (xhr.status != 200) {
			   	callback(xhr.status, null);
			  } else {
			    callback(xhr.status, xhr.responseText);
			  }

			};
		},

		get: function(url, callback, options) {
			callback = callback || sulNoop;
			options = options || this.globalOptions;

			this.ajax("GET", url, {}, callback, options);
		},

		post: function(url, data, callback, options) {
			callback = callback || sulNoop;
			data = data || {};
			options = options || this.globalOptions;

			this.ajax("POST", url, data, callback, options);
		}
	};
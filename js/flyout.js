//if querySelectorAll is defined (IE9+)
if(typeof(document.querySelectorAll) == 'function')
{
	var elements = document.querySelectorAll("li.flyout");
	Array.prototype.forEach.call(elements, function(el, i){
		el.addEventListener("click", navClicked);
	})
}

//flyout li clicked
function navClicked(e)
{
	//add hover class to li.flyout
    this.classList.add('hover');
    //add click handler to document
	document.addEventListener("click", docClicked);
}

//document clicked
function docClicked(e)
{
	//get active flyout menus
    var elements = document.querySelectorAll("li.flyout.hover");
	Array.prototype.forEach.call(elements, function(el, i){
		//remove hover if the click event was not from a child (inside the flyout menu)
		if(isContained(e.target, el) === false)
			el.classList.remove('hover');
	})
}

//is the given child is a child of the given parent
function isContained(child, parent){
    var current = child;    
    while (current) {
        if(current === parent) return true;
        current = current.parentNode;
    }
    return false;
}


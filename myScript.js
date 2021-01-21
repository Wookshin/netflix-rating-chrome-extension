for(var children of parent){
	var child = children.firstElementChild;
	while(child){
			console.log(child.firstElementChild.firstElementChild.firstElementChild.firstElementChild.getAttribute('aria-label'));
			child = child.nextElementSibling;
	}
}

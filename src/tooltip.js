export function tooltip(node, options) {
	
	let component, hover;
	
	node.addEventListener('mouseenter', attachTooltip);
	node.addEventListener('mouseleave', removeTooltip);

	function attachTooltip() {
		component = new options.content({
			target: options.target, 
			props: { text: options.text, x: options.x, y: options.y }
		})
		console.log("X:Y ", options.x, options.y)
	}
	
	function removeTooltip() {
		component.$destroy()
	}

	return {
		destroy() {
			node.removeEventListener('mouseenter', attachTooltip);
			node.removeEventListener('mouseleave', removeTooltip);
		}
	};
}
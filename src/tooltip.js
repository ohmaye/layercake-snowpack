export function tooltip(node, options) {
	
	let component, hover;
	
	node.addEventListener('mouseenter', attachTooltip);
	node.addEventListener('mouseleave', removeTooltip);

	function attachTooltip() {
		component = new options.content({
			target: node, 
			props: { text: options.text, x: options.x, y: options.y }
		})
	}
	
	function removeTooltip() {
		component.$destroy()
	}

	return {
		destroy() {
			node.removeEventListener('mouseover', attachTooltip);
			node.removeEventListener('mouseout', removeTooltip);
		}
	};
}
export function capitalizedFull(str: string) {
	let words = str.split(' ').map((word: string) => {
		return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
	});
	return words.join(' ');
}

export function capitalized(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

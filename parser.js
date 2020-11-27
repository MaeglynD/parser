function parser(input) {
	// split input into letters and sequences of numbers
	const portions = input.match(/(\d+|[a-z])/g);
	// the starting portion to be analysed
	let current_portion = portions[0];

	// parse an equation
	const parse_equation = () => {
		// this function will move on to the next_
		let total = evaluate();

		// whilst current_portion is an operand, move on to the
		// next and add to total
		while ('abcd'.includes(current_portion)) {
			const temp_portion = current_portion;
			next();
			total = operation(temp_portion, total, evaluate());
		}

		return total;
	}

	// evaluate the current portion
	const evaluate = () => {
		let result = null;
		const parsed_portion = parseInt(current_portion);

		// if its a number
		if (!isNaN(parsed_portion)) {
			result = parsed_portion;
		}

		// if its an open bracket
		if (current_portion === 'e'){
			next();
			result = parse_equation();
		}
		
		next();

		return result
	}

	// move onto the next portion
	const next = () => {
		// remove evaluated portion from buffer
		portions.shift();

		// queue up the buffer
		if (portions.length) current_portion = portions[0];
	}

	// translate string to operand
	const operation = (operator, a, b) => {
		a = parseInt(a);
		b = parseInt(b);

		switch (operator) {
			case 'a': return a + b;
			case 'b': return a - b;
			case 'c': return a * b;
			case 'd': return a / b;
			default: return a * b;
		}
	}

	return parseInt(parse_equation());
}

console.log(parser('3a2c4'));
console.log(parser('32a2d2'));
console.log(parser('500a10b66c32'));
console.log(parser('3ae4c66fb32'));
console.log(parser('3c4d2aee2a4c41fc4f'));
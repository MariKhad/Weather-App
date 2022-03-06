function Calc(operator, num1, num2) {
	const isNumber = (typeof num1 === "number") && (typeof num2 === "number");
	if (!isNumber) {
		return 'Error';
	}

	let operations = {
		'sum': num1 + num2,
		'sub': num1 - num2,
		'multi': num1 * num2,
		'div': num1 / num2,
		'exp': num1 ** num2,
		'rem': num1 % num2,
	}
	// "+" = sum, "-" = sub, "*" = multi, "/" = div, "**" = exp, "%" = rem


	if (operations[operator] === undefined) {
		return "unknown operation";
	} else {
		return operations[operator];
	}
}

console.log(Calc("div", 5, 8));


function oftenUsedCodes() {
	return {
		compose:`
		const compose = (...fns) => {
			const _length = fns.length;
			return (...args) => {
					let next_args = null;
					for (let i = _length; --i >= 0;) {
							const fn = fns[i];
							let fnArg = next_args ? next_args : args
							let currentArgs = fn.length ? fnArg.slice(0, fn.length) : fnArg;
							next_args = args.slice(fn.length || 1);
							let result = fn.call(null, ...currentArgs);
							next_args.unshift(result);
					}
					return next_args[0];
			}
		};`,
		curry: `
		const curry = (fn) => {
			const arity = fn.length;
			let curriedFn = (...args) => {
					if (args.length >= arity) {
							return fn.apply(null, args);
					} else {
							return (...anotherArgs) => {
									return curriedFn.apply(null, args.concat(anotherArgs))
							};
					}
			};
			return curriedFn;
		};`
	}
}


module.exports = {
	oftenUsedCodes
};


class ScriptLoader {

	constructor () {
		this.elPassingTopPos = false;
	}

	//get browser base url
	getBaseurl () {
		let loc = location;
		return loc.origin || loc.protocol + '//' + loc.hostname + (loc.port ? ':' + loc.port : '');
	}

	/**
	 * @desc inject scripts into DOM dynamically with sync or async and execute a callback after script is loaded
	 * @param string url
	 * @param function callback
	 * @param bool async - true or false
	 * @return undefined
	 */
	getScript (url, callback, async) {

		// Create a new script and setup the basics.
		let script = document.createElement("script");
		let	firstScript = document.getElementsByTagName('script')[0];

		//if the third argument is passed, load the script asynchronously; otherwise load it synchronously
		if(async === undefined && async !== false) {
			script.async = true;
		} else {
			script.async = false;
		}

		script.src = url;

		// Handle the case where an optional callback was passed in.
		if ("function" === typeof(callback)) {
			script.onload = function() {

				callback();

				// Clear it out to avoid getting called more than once or any memory leaks.
				script.onload = script.onreadystatechange = undefined;
			};

			script.onreadystatechange = function() {
				if ("loaded" === script.readyState || "complete" === script.readyState) {
					script.onload();
				}
			};
		}

		//Attach the script tag to the page (before the first script) so the magic can happen.
		return firstScript.parentNode.insertBefore(script, firstScript);

	}

}

export default ScriptLoader;


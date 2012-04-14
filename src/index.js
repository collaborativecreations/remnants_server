var remnantsweb = require('./web');

// initialize web module
remnantsweb();



// This makes ctrl+c work. Highly recommended.
var tty = require("tty");

process.openStdin().on("keypress", function(chunk, key) {
	if (!key || !key.name)
		return;
	if (key.name === "c" && key.ctrl) {
		console.log("^C -- Killing");
		process.exit();
	} else if (key.name === "enter") {
		console.log();
	}
});

tty.setRawMode(true);


// Translate and display the new input
function newInput() {
	var input = document.getElementById('input-text-area').value;
	var output = translate(input, document.suffixPrefix);
	document.getElementById('output-text-area').value = output;
}

// Set a new suffix prefix
function selectSuffixPrefix(selectedSuffixPrefix) {
	// clear previously selected element/s
	var buttons = document.getElementsByClassName('custom-suffix-prefix-setting-button');
	for (var i=0; i<buttons.length; i++) {
		buttons[i].checked = false;
		buttons[i].style.backgroundColor = '#defbff';
	}

	// check the newly selected element
	selectedElement = document.getElementById('suf-pre-'+selectedSuffixPrefix);
	selectedElement.checked = true;
	selectedElement.style.backgroundColor = '#fdc6ff';

	// set the new value
	document.suffixPrefix = selectedSuffixPrefix;

	// trigger a re-translation given the new setting
	newInput();
}
selectSuffixPrefix('y'); // default prefix

// Register listeners to activate/deactivate settings overlay
document.getElementById('settings-image').addEventListener("click", settingsOverlayOn);
document.getElementById('settings-overlay-background').addEventListener("click", settingsOverlayOff);
function settingsOverlayOn() {
  document.getElementById("settings-overlay-background").style.display = "block";
}
function settingsOverlayOff(clickEvent) {
	// if user clicked the overlay background (and not one of its children), close it
	if (clickEvent.target.id == 'settings-overlay-background')
		document.getElementById("settings-overlay-background").style.display = "none";
}

monaco.editor.getModels().forEach(function(m) {
	monaco.editor.setModelLanguage(m, 'javascript');
	m.updateOptions({tabSize: 4});
});
var r = new XMLHttpRequest();
r.open("GET", `https://gist.githubusercontent.com/
		stephanlensky/445a7867159fbab1ad2035961ceaf1e8/raw/
		06fda1c089f2c264cbdd71b908828ec4cc146a97/lib220.d.ts`);
r.addEventListener('load', function(){monaco.languages.typescript.javascriptDefaults.addExtraLib(this.responseText);});
r.send();
monaco.editor.getModels().forEach(function(m) {
	monaco.editor.setModelLanguage(m, 'javascript');
	m.updateOptions({tabSize: 4});
});
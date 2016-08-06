
import ScriptLoader from './ScriptLoader';


describe('ScriptLoader', () => {

	let scriptLoader;

	beforeEach( ()  => {scriptLoader = new ScriptLoader ()}) ;


    afterEach( ()  => {scriptLoader = null }) ;


	it('should return the base url', () => {

		let testUrl = location.href;

		let baseurl = scriptLoader.getBaseurl();

		expect(baseurl).toBe('http://localhost:9876');   //we set the port 9876 on karma.conf file

	});

	it('should load the script', () => {

		let scriptToLoad =  scriptLoader.getScript ('https://www.google.com/test.js', () =>{}, true);

		let script = document.getElementsByTagName('script')[0];

        expect(script.src).toBe('https://www.google.com/test.js');

	});

});



# ant task

Live version on Herok at: [https://ant-test.herokuapp.com](https://ant-test.herokuapp.com)


####Hello Red Ants.

Please find my solution to the JavaScript test. 

It was good fun but had me working with unfamilier tools. I have tried to compensate for my rusty Backbone skills with some funky map action on the 'Show Stores' page.

It's a long time since I've done any Backbone and this was a *very* Backbone oriented exercise. I have been solidly Google for years, using Angular and Closure. It's been a while since I've used jQuery too - we try and do it in native JavaScript at Thomson Reuters.


Anyway, I dusted off my O'Rielly Backbone book and got stuck in. I know item 3c - the scoping exercise - will not be executed in a Backbone way. I set the global vars as a singleton class, however, I'm sure there is a specific Backbone or Require technique you had in mind.

I opted for a regular $.ajax call to pull in the webservice. Pulling the jsonp into the Collection was a pain using the built-in 'fetch' method of the Collection as I couldn't find a way to change the name of the callback and kept getting XML. 

###Installation

If you want to run locally you need Node and Bower installed.

If you haven't got Node install it from the site:

[http://nodejs.org/](http://nodejs.org/)

Then run...

		$ npm install bower -g
		
		$ npm install node cli -g
		
Clone the repo, cd into the cloned repo, then... 

		$ npm install
		
		$ bower install
		
You may need to run npm with 'sudo' in front on a Mac.
		
It runs on a node server, so type...

		$ node server
		
and you should see it on [http://localhost:5090/](http://localhost:5090/)

		

Have a look round my GitHub account - it will be a better indicator of my coding.

There is a test project on GitHub I did for another interview at [https://github.com/mrClapham/b_swan_test](https://github.com/mrClapham/b_swan_test) . It was done in Anguala and D3. I withdrew my application as it looked like a sideways move, but it was an exercise more in my comfort zone as I got to choose the technology. Again there is a link to it on Heroku [https://gclapham-swan.herokuapp.com/#/](https://gclapham-swan.herokuapp.com/#/).
 
The Oslo hackathon project is worth a look too: [https://gentle-thicket-7917.herokuapp.com/#/](https://gentle-thicket-7917.herokuapp.com/#/) and the Canvas Shoot-out: [https://canvas-shootout.herokuapp.com/#/](https://canvas-shootout.herokuapp.com/#/) where I experimented with a bunch of canvas/svg libraries.
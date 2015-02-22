# ant task

Live version on Herok at: [https://ant-test.herokuapp.com](https://ant-test.herokuapp.com)


####Hello Red Ants.

In the spirit of full disclosure, it is years since my brief flirtation with Backbone and this was a very Backbone exercise. I have been solidly Google since using Angular and Closure. It's been a while since I've used jQuery too - we try and do it in native JavaScript at Thomson Reuters.


Anyway, I dusted off my O'Rielly book on Backbone and got stuck in, but don't expect Backbone best practices. I know item 3c - the scoping exercise - will not be executed in a Backbone way. I set the global vars as a singleton class, however, I'm sure there is a specific Backbone or Require technique you had in mind.

Pulling the jsonp webservice into the collection was a pain. I tried using the fetch method of the collection but couldn't work out how to change the 'callback' to 'jsonp_callback'. I opted for a regular $.ajax call in the end.

I've tried to compensate with a funky map. You can drag the pointer to your start position and do a search from there. 

If you want to run locally you need Node and Bower installed.

Hopefully you have Node and Bower - if not, install Node from the site

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
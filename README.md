twitter-sentiment-analysis
==========================

Fetch twits in real time with their sentiment being either negative or positive.

To run the application please clone or download the repo and from inside the downloaded or extracted folder: <br />

1. Run npm install
2. Run gulp dev [to run in dev mode, this will keep running in watch mode to compile's client specific javascript files automatically without minifying them]
3. Finally run node server.js
4. 

Before deployment

1. Run gulp [This will run the task to generate minified files]
2. Check in/deploy the generated files as well.
3. For deployment into heroku Procfile is already available with the project.

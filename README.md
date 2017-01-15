# learning-node

I'm learning node.js

I'm using [this tutorial](https://blog.risingstack.com/node-hero-tutorial-getting-started-with-node-js/).

Installing node on ubuntu 16.04 by itself. (NOT WHAT I DID)
```console
sudo apt-get update
sudo apt-get install nodejs
sudo apt-get install npm
```

Installing node through nvm on ubuntu 16.04 (what I'm doing). 
This gets the pre-requisites for nvm
```console
sudo apt-get update
sudo apt-get install build-essential libssl-dev
```

Then look to the [nvm page](https://github.com/creationix/nvm) for the curl script. The version numbers can change here.
```console
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
```
Close and reopen terminal.

And test the nvm install by doing
```console
command -v nvm
```

With that done, install node with nvm. This command installs the latest version of node. Other commands can be found at the nvm page above.
```console
nvm install node
```

With node installed, the executable is called node (not nodejs like it would be if installing node by itself). nvm creates the node->nodejs alias for us. nvm also installs npm for us.


Node is installed in this directory now, and just for future reference, ~ is the home directory in linux (I'm embarrased that I didn't realize that):
```console
~/.nvm/versions/node/v7.4.0
```


With that squared away, we can start playing with the node repl. This can be activated by doing:
```console
node
```

What a surprise. Now we can type fancy things in to test them out in node. ctrl-d to get out of repl.
```console
> console.log('hello from Node.js')
hello from Node.js  
undefined                 # not sure why it says undefined at the end, might be a null return or something.
```

Time to pick an ide/text editor for this. I'm gonna try vim. I'm scared. Let's go.
```console
vim index.js
```

I created a ~/dev/node/helloworld folder and now have an index.js inside.
```javascript
console.log('hello from node.js')   // running this yields what you might expect
```

So we should make a package.json file. Run this command and fill out to the best of ability.
```console
npm init
```

Then we created an app folder and put another index.js and calc.js in there. Turns out \` these backticks make template strings so that we can use the ${stuff} notation to reference specific variables in the string itself. Also we  can define a scripts script in the package.json that looks like the below thing to run a specific file by calling npm start.
```json
"start": "node index.js"
```

Okay, well webstorm is yelling at me for using ecmascript6 and not transpiling it to ecmascript5 with babel. If it comes up, I guess I'll find this message at some point. Look up how to install babel and use the default filewatcher in webstorm to do it.

We're now gonna add the lodash dependency to our project.
```console
npm install lodash --save    # this creates a dependency in our package.json
```

We also added node_modules to the .gitignore so that others can download the project and just npm the dependencies themselves. Might be useful to check out this [.gitignore](https://blog.risingstack.com/node-hero-npm-tutorial/) as an example for later projects too.

We're also going to add a dev dependency. These don't get installed in a production environment.
```console
npm install mocha --save-dev
```

We're gonna add a test script to our package.json so that we can run mocha. We don't have to, since mocha is installed globally anyway, but it's good practice I suppose. We can call mocha with npm test.
```json
"test": "mocha test"
```

npm has scoped packages with the formatting below. It's name is just that combination right there. 
```console
@myorg/mypackage

npm install @myorg/mypackage --save
require('@myorg/mypackage')
```

I then created a first node.js server by using the http module. That's not very efficient. We're now gonna install express to make that process a lot easier.
```console
npm install express --save
```

Using express is a whole lot easier because it has a built in router. 

Now we're gonna install and setup our first postgresql database. I'm running ubuntu 16.04 so this should be easy.
```console
sudo apt-get install postgresql
```
Set up the default user password for the postgres user. This is the only user that can admin any databases created in postgresql.
```console
sudo passwd postgres
```

Testing this requires the following commands
```console
su - postgres   # change user to postgres
psql
```

Should look something like:
```console
postgres=#
# all other users access like so, where DB_NAME is the name of an EXISTING database
psql DB_NAME
```

Then you must set the admin password (otherwise no other applications will have access to the database)
```console
\password postgres
\q          #to exit
```

Create a new database by being in the postgres prompt and inputting the next command.
```console
create database testdb;
\l          #to test
```

Make a user to access our new testdb database.
```console
create user username;
grant all privileges on database testdb to username;
\password username   #to set password to the user, otherwise nothing works
```
Now the database is set up for use.

Sample database commands:
```sql
delete from users where name is null;
update users set age = 30 where name = 'bill';
```
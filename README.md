# learning-node

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

Time to pick an ide/text editor for this. 

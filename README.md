# chodo

A to-do list with rewards upon completing tasks.

## Problems

- if npm run start gives error => check that the program has been build and deployed with npm run build and npm run deploy
- if solana net is down i need to create again the payer account and add the new vaues to soprox config, then do as above

The needed steps to do the whole stuff is:

1- localnet:update
2- localnet:up => now the docker image has started with a running solana devnet
3- npm run account => create a usable account on the network (save the data in soprox.config)
4- npm run build => build solana rust program
5- npm run deploy => deploy the program on the network and create needed json data for the client based on the deployed data (store)

Now i can do my things and run client interactive stuff like npm run start

When finished => npm run localnet:down

## Account

Actually our account didn’t exist until just now, the action of sending funds to an address is what calls the account into existence.

In Solana, accounts are charged a very tiny amount of ‘rent’ every epoch, when the balance of an account goes to zero, it returns to the void...
There is an exception to this rule, above a certain balance, an account is rent exempt and lives forever.

## Folder structure

todo

## Notes

Less config file taken from
<https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less>

Vapor is the name of the theme

The flux of the build would be to deploy the program and then just connect through the frontend with the generated solana.config.file that point to the correct program address of the dapp and the correct network.
If further data is needed it should be added there.

So everytime i deploy a new program i must change this config file so that i can correctly connect to it with the frontend.

## Cool icons

import { WalletFilled } from '@ant-design/icons';

<WalletFilled />

## RUST

Remember that i have to put all the crates i use and implement in each file where i use them or implement them

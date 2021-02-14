# Notes

## Account

Actually our account didn’t exist until just now, the action of sending funds to an address is what calls the account into existence.

In Solana, accounts are charged a very tiny amount of ‘rent’ every epoch, when the balance of an account goes to zero, it returns to the void...
There is an exception to this rule, above a certain balance, an account is rent exempt and lives forever.

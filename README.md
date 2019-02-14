<a href="https://codeclimate.com/github/codeclimate/codeclimate/maintainability"><img src="https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/maintainability" /></a><a href="https://codeclimate.com/github/jabichris/Politico-v1/test_coverage"><img src="https://api.codeclimate.com/v1/badges/ec520af03ed3f1659047/test_coverage" /></a>[![Build Status](https://travis-ci.org/jabichris/Politico-v1.svg?branch=develop)](https://travis-ci.org/jabichris/Politico-v1)
[![Coverage Status](https://coveralls.io/repos/github/jabichris/Politico-v1/badge.svg?branch=develop&kill_cache=1)](https://coveralls.io/github/jabichris/Politico-v1?branch=develop)
# Politico

Politico enables citizens give their mandate to politicians running for different government offices while building trust in the process through transparency.

## Getting Started

Installation
```
git clone https://git@github.com:jabichris/Politico-v1.git
npm install
```
Starting development server

```
*npm run dev
```

run test
```
npm run test
```
## Endpoints to test
```
|API Endpoint              |METHODS|DESCRIPTION                |       
|       ---                   ---               ---            |
| /api/v1/parties          |GET    |This will fetch all parties|
|/api/v1/parties/<:id>     |GET    |This will fetch one party  |
|/api/v1/parties/          |POST   |This will create a party   |
|/api/v1/parties/<:id>/name|PATCH  |This will edit a party     |
|/api/v1/parties/<:id>     |DELETE |This will delete a party   |
|/api/v1/offices/          |POST   |This will create an office |
|/api/v1/offices/          |GET    |This will get all offices  |
|/api/v1/offices/<:id>/    |GET    |This will get one party    |
```
## Links
```
https://politico-by-chris.herokuapp.com/
https://jabichris.github.io/Politico-v1/
```
## Contributing
```
For this readme, I used this template (https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)
And for the whole project,i used alot of different resources.
```
## Authors
```
JABIRO Christian
```
## License
```
This project is licensed under the MIT License - see the LICENSE.md file for details
```
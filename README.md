![mirror-banner](/mirror-banner.png)

# mirror

[![Join the chat at https://gitter.im/therebelrobot/mirror](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/therebelrobot/mirror?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

A simple, restriction-less forking tool for Github. See it in action at [mirror.therebelrobot.com](http://mirror.therebelrobot.com/)

[![mirror this repo](http://mirror.therebelrobot.com/badge-mid.svg)](http://mirror.therebelrobot.com/?source=therebelrobot/mirror)
[![](https://ga-beacon.appspot.com/UA-59630297-4/mirror/README?flat)](https://github.com/igrigorik/ga-beacon)
[![Join the chat at https://gitter.im/therebelrobot/mirror](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/therebelrobot/mirror?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)


Github, by design, restricts the number of times you can fork a repo into a single account. Even then, after forking, you are bound to the upstream in your repo page, which if you are doing an iterative work can sometimes be a hinderance to marketing. There are [hacks](https://adrianshort.org/create-multiple-forks-of-a-github-repo/)  [and](http://therebelrobot.com/tech/2015/10/16/a-simple-method-to-fork-repos-more-than-once.html) [workarounds](https://help.github.com/articles/duplicating-a-repository/) for this, but **mirror** provides a user-friendly UI to apply them without command line knowledge.

### 1:1 copies

Ever wanted to start a new project based off an old one? You can do that using **mirror**. Just put in the source and target repos, and we'll do the rest for you. Easy peasy.

### infinite forks

Ever wanted more than one fork of a repo? Boilerplates? Iterative works? **mirror** lets you fork to your heart's content.

### break from upstream

Making a brand new iterative work? What do you do if you want to fork and break from the upstream entirely? With normal forking, your repo will always link back to the upstream version next to the title, but **mirror** gives you the power to break free and start fresh.

## repo badges

Already use mirror? Want to have your repo mirrored instead of forked? Add a badge to your repo!

![mirror this repo](http://mirror.therebelrobot.com/badge-large.svg)

`[![mirror this repo](http://mirror.therebelrobot.com/badge-large.svg)](http://mirror.therebelrobot.com/?source=USER/REPO)`

![mirror this repo](http://mirror.therebelrobot.com/badge-mid.svg)

`[![mirror this repo](http://mirror.therebelrobot.com/badge-mid.svg)](http://mirror.therebelrobot.com/?source=USER/REPO)`

![mirror this repo](http://mirror.therebelrobot.com/badge-small.svg)

`[![mirror this repo](http://mirror.therebelrobot.com/badge-small.svg)](http://mirror.therebelrobot.com/?source=USER/REPO)`

## cli utility

Want to skip the middleman? Use the CLI tool!

You can find the `mirror-cli` utility on the npm registry. Usage details can be found at [therebelrobot/mirror-cli](https://github.com/therebelrobot/mirror-cli)

[![](https://nodei.co/npm/mirror-cli.png?downloads=true)](https://github.com/therebelrobot/mirror-cli)
[![](https://nodei.co/npm-dl/mirror-cli.png?months=3&height=2)](https://github.com/therebelrobot/mirror-cli)

## roadmap

- [ ] convert to feross/standard
- [ ] allow for cloning of wikis and issues
- [ ] **cleanup**: remove unneeded hackathon-starter components
- [ ] add support for enterprise repos
- [ ] add UI sugar: repo url checking, etc.
- [ ] add additional support for syncing target repo with source
- [ ] add support for single branch cloning *(maybe)*

## contribute

Want to contribute? Feel free! Fork this repo or open an issue, and let's get rolling!

### what is needed

- You a designer? Wanna take a better crack at those badges for me? I'm a newb.
- moar testing
- edge cases

### contributors

- Trent Oswald (@therebelrobot) <`trentoswald``@``therebelrobot.com`>
- Sahat Yalkabov (@sahat) (via [hackathon-starter](https://github.com/sahat/hackathon-starter))
- *you?*

## license

[ISC](https://tldrlegal.com/license/-isc-license)

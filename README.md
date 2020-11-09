# WonderQ
![Node](https://img.shields.io/badge/node-v14.15.0-brightgreen.svg)
![Dependencies](https://img.shields.io/badge/dependencies-up%20to%20date-brightgreen.svg)

 ## Basic Overview

This project is a simplified version of a message broker.

## Runing the project

This project was built using Node v14.15.0, which is the latest LTS version. I've put an .nvmrc file for convenently set this up. If you have nvm on your machine, just:

```shell
nvm use
```

Install all the dependencies:

```shell
npm install
```

Now you can start the project, just:

```shell
npm start
```

The app will run on http://localhost:3000

## Testing the project

This project ships with unit and acceptance tests, to run them:

```shell
npm test
```

If I had a little more time, testing is one the things I would invest, in real life, investing in linting is not just about aesthetics, it provides productivity and get slow decisions out of the way of the developers, because guess what! Those decisions have already been made! :sunglasses:

Productivity and faster onboarding... Oh yeah!

To lint the project:

```shell
npm run eslint
```

To just check, but not fix quite yet:

```shell
npm run eslint:check
```

Don't forget the prettier:

```shell
npm run prettier
```

Checking things with prettier:

```shell
npm run prettier:check
```

Combo! Prettier + Eslint:

```shell
npm run fmt
or
npm run fmt:check
```

## Decisions, decisions... life's full of them

Well, to construct a message broker from the ground up is quite a feat! Especially in such a short time, so I believed that I was supposed to stick to the core decisions and explain my mind later on, I swear that I've tried :joy:

Javascript is quite resourceful when it comes to algorithm implementation, and I soon realized that I would need some flexibility here, more precisely I would need two views of the same data set: one where I could reach a specific piece of data in O(1), and the other where I could quickly reach a cutoff point... hmmm... I started the thinking process on: How would I achieve that?

Ok, first things first, a queue is a queue, no big deal in that, just... first in first out, checked! And once a consumer gets a message from it, I just have to displace that message from this queue, put a timestamp on it (we'll talk about this later) and put it on another, that's it.

Now that this message is no more on the "ready-to-be-picked" queue, no one could ever take the same message, checked! What about the other "queue"?

Well the other queue is, in fact, an array with its elements sorted by a number, remember the "timestamp"? This number not only puts the elements in order but also tells me when it's time for this message to leave, AHA! :tada:

Hmmm, but let's see more closely... if I put a "setTimeout" in each and every message that I get... where my CPU would go if I had, say... half a million messages there? Nice! You just crashed the Event Loop! :collision:

So I decided that a "garbage collector" behavior would be much more interesting here, it would run just once at a time and vanish the expired ones, cool! But wait, the array is sorted, but still... I have to iterate through each element untill I find the cutoff point, that gives me a O(n) complexity... hmmm... BINARY SEARCH TO THE RESCUE:exclamation: :fire_engine:

With binary search I would reach the cutoff point in just O(log n) complexity, fair enough, now I just have to "splice" :scissors: the array at that point and get all the "bad part" to the "ready-to-be-picked" queue again, all at once. :recycle:

Ok, ok... how about the other "view" I needed to pick an element in O(1) complexity, by id? That was tricky at first but I realized that a dictionary would do the job just fine, besides, I don't need to replicate the entire element there, memory is expensive, I just need the id to be the key with the "other-queue-index" as its value, working as a pointer.:point_left:

## Worth Noting

Every log provided by the API is written in json format, so as it becomes easier to plug in a tool like to index the logs on Elasticsearch and  Kibana to navigate through logs
(in real life no one is looking to the console inside a container).

## Next steps I would take
- Better protocol - pure HTTP communications has too much overhead for this purpose, instead I would make use of a [protocol buffer](https://grpc.io/) to optimize the use of resources and ensure less overhead.
- Persistence of data - I would implement triggers to ensure a minimal persistence if an emmergency occurs, memory-allocated data is really faster to access but is more likely to lose. Besides this implementation doesn't scale to multiple nodes running in a cluster, to achieve that, one should move the persistence to somewhere else.
- Schema definition and more tests - I would very much like to have more time to use [yup](https://github.com/jquense/yup) and have our endpoint schemas in a more tidy fashion and move some responsibilities away from the controllers.
- Containerized solution and CI - I would not only put the project in an Docker register but also configurate a CI/CD solution going through [CircleCI](https://circleci.com/) to run all the tests when a PR is open.
- Rules for the master branch - It shouldn't accept commits directly, work should be put there by a PR that has been passed through the automatized tests on CircleCI and approved by other developers.
- Instrumentation - Super important! How would anyone know how the queues are behaving? The resources it is been consuming? I would put up a 'metrics' endpoint to export that type of data to [Prometheus](https://prometheus.io/) and plug [Grafana](https://grafana.com/) using his datasource. By the way, Grafana sends alerts to [PagerDuty](https://www.pagerduty.com/), which is a convenient way to know when things need attention.
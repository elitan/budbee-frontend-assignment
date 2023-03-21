# Furry Friends

## Possible improvements

- asd

## Get Started

### 1. Start the database:

```
docker-compose up -d
```

### 2. Apply database migrations

```
cd db && ./apply.sh && cd ../
```

### 3. Start the [web](web/README.md) app.

```
pnpm install
pnpm codegen
pnpm dev
```

---

# Frontend Code Assignment

This is a code assignment for frontend candidates. The purpose is to give us a better understanding of your skills as a developer.

In the technical interview, you will have a chance to present the result and discuss it with future colleagues at Budbee!

## The Assignment

Your friend Dave is hoarding cats and he has asked you to help organize his growing furry family of cats.

As a user, one should be able to

- add cats to the collection,
- view the list of cats and their individual details (e.g. name, date of birth...)
- as well as edit the details,
- and remove cats that has gone to Cat Heaven/Valhall.

It would be nice if one could also sort and search for them, but that might be a future feature (optional).

### Wireframe

_Example wireframe for what a web app could look like. Not a strict requirement._

![Furry Friends](https://github.com/budbee/frontend-assignment/blob/master/FurryFriends_WireFrame.png "Furry Friends Wireframe")
![Furry Friends](https://github.com/budbee/frontend-assignment/blob/master/FurryFriends-edit.png "Furry Friends Wireframe")

## Assessment

The result will be assessed based on:

- Functionality
- Usability
- Code readability
- Code testability
- Your thoughts on possible improvements

## FAQ

Q: Which frameworks should I use?
A: Use anything you feel comfortble with, but consider how to best show us your skills relevant for the position you have applied to.

Q: How much time to I have?
A: Spend a reasonable amount of time (to you). If you have ideas that you don't have time to implement, feel free to add comments and bring them up in the technical interview.

Q: Do I have to build the backend?
A: You don't need to build any backend. You can store the data temporarily or use local storage for example.

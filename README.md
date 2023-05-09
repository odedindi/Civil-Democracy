# Civil Democracy

## context

- Civil democracy platform _to unite global civil society_ [introduction pdf by Dr. Scholz](https://github.com/odedindi/Civil-Democracy/blob/c38ffaf492528b5c809bb169a6f38ad962ae9b73/documentation/introduction.pdf)
- [second step](https://github.com/odedindi/Civil-Democracy/blob/c38ffaf492528b5c809bb169a6f38ad962ae9b73/documentation/second-step.pdf)
  [Dev Environment](https://civil-democracy.vercel.app/)

## App Features

- **postgres DB** (vercel free tier)
  - login / signup
  - manage account
  - assign Open Actors
  - raise votes
  - vote
  - chat
- **i18n** (ltr & rtl support)
  - English (en)
  - German (de)
  - Hebrew (he)
  - Farsi (fa-IR) (currently utilizing google translate)
- graphs queries showing my cv.

## Tech/framework used

This is a [nextjs](https://nextjs.org/) project with

- [turbo](https://github.com/vercel/turbo)
- [apollo server](https://www.apollographql.com/)
- [Prisma ORM](https://www.prisma.io/)
- [Pothos GraphQL](https://pothos-graphql.dev/)
- [Next-Auth](https://next-auth.js.org/)
- [next-i18next](https://github.com/i18next/next-i18next
- for styling
  - [styled-components](https://github.com/styled-components/styled-components)
  - [Mantine](https://mantine.dev/)

### getting started and important scripts

- run `turbo dev` to run it locally on [localhost:3000](http://localhost:3000)
- run `turbo check:types` to check types
- run `turbo lint` to check linting
- run `generate:types` to generate new apollo types

## Contributing

- If you'd like to contribute, please do fork the repository and use a feature branch.
- Pull requests are most welcome.

## Links

- word press prototype: https://civil-democracy.ropstam.dev/
- Project homepage: https://github.com/odedindi/Civil-Democracy
- Repository: git@github.com:odedindi/Civil-Democracy.git
- Issue tracker: https://github.com/odedindi/Civil-Democracy/issues
  #### I value the care and effort to improve the security and privacy of this project!
- In case of sensitive bugs like security vulnerabilities, please contact
  odedindi@gmail.com directly instead of using issue tracker.

## Licensing

The code in this project is licensed under MIT [license](https://github.com/odedindi/Civil-Democracy/blob/main/LICENSE).

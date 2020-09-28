# Web UI

ReactJS application using a custom API.

## Develop on this project ?

```
yarn install
yarn start
```

And it will pop `http://localhost:3000` with the app. Edit a file under `src/` to see it live refresh.

## Run tests ?

```
yarn test
```

## Documentation of the API

It provide a Montessori nomenclature list. It allow to list add edit delete
nomenclatures.

Available [here](https://montessori-ressources-api.herokuapp.com/api-docs/)

## Technical choices

- we are using [React Bulma Components](https://couds.github.io/react-bulma-components/) for 
React CSS components. Please use it instead of creating specific CSS.
- We are using [functional component](https://reactjs.org/docs/components-and-props.html)
 when possible.
- The PDF generation is done using [react-pdf](https://react-pdf.org). It is a set
of React components that allow to generate a PDF client side, show a PDF in a canevas,
provide a download link. Currently we are generating the PDF locally and showing it in a
canevas. See `src/components/pdf/nomenclature.js` for more information.
- [react-dropzone](https://react-dropzone.js.org) is used to provide a way to
upload a full nomenclature. Behin the scene it use a POST endpoint of the API. See
`src/components/dropzone.js` for the corresponding component.
- inline edit: want to use [react-contenteditable](https://github.com/lovasoa/react-contenteditable/)
 but this [bad bug](https://github.com/lovasoa/react-contenteditable/issues/161)
 is not fun to workaround. Using [react-editext](https://github.com/alioguzhan/react-editext)
  because simple and up-to-date.

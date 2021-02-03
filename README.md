# Web UI

ReactJS frontend using a Firebase backend.

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

## Technical choices

- we are using [React Bulma Components](https://couds.github.io/react-bulma-components/) for React CSS components. Please use it instead of creating specific CSS.
- We are using [functional component](https://reactjs.org/docs/components-and-props.html) when possible.
- The PDF generation is done using [react-pdf](https://react-pdf.org). It is a set of React components that allow to generate a PDF client side, show a PDF in a canevas, provide a download link. Currently we are generating the PDF locally and showing it in a canevas. See `src/components/DocumentPrint/nomenclature.js` for more information.
- [react-dropzone](https://react-dropzone.js.org) is used to provide a way to upload a full nomenclature. Behin the scene it use a POST endpoint of the API. See `src/components/Add/index.js` for the corresponding component. (NOT USED ANYMORE)
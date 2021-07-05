# Montessori Ressources

NextJS app using a Firebase backend.

## Develop on this project ?

Create a `.env.local` file based on `.env.local.default` and provide the correct values.

```
yarn
yarn dev
```

And it will pop `http://localhost:3000` with the app. Edit a file under `pages/` to see it live refresh.


## Technical choices

- The PDF generation is done using [react-pdf](https://react-pdf.org). It is a set of React components that allow to generate a PDF client side, show a PDF in a canevas, provide a download link. Currently we are generating the PDF locally and showing it in a canevas. See `src/components/DocumentPrint/nomenclature.js` for more information.
- [react-dropzone](https://react-dropzone.js.org) is used to provide a way to upload a full nomenclature. Behind the scene it use a POST endpoint of the API. See `src/components/Add/index.js` for the corresponding component.
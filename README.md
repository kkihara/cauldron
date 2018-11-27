## TODO

How to store PDFs?

- copy under the application directory and save path
- store encoded base64 string in store/DB

## Reference

![electron-react-webpack](https://github.com/pastahito/electron-react-webpack)


## State

```
{
  pagesById: {
    <id>: {
      id: string,
      pageType: string,
      created: number,
      title: string
    }
  },
  pdfPathsById: {  # TODO: replace this later with a DB query
    <id>: {
      id: string,
      path: string
    }
  },
  currentPage: {
    id: string,
    progress: string,
    pageType: string,
    contents: {
      # PDF
      pdfDocument: string  # base64 encoded string
    }
  },
  highlightsById: {
    <id>: {
      id: string,
      encoded: string  # serialized string of all highlights for id
    }
  }
}
```

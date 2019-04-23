## Setup

Steps to start:

```
git clone git@github.com:sta-tec/test__bookstore.git
cd test__bookstore
npm install
npm run server
npm run app

/* Server will run on port 3004 */
```

## Introduction

In this assignment you are offered to create a simple bookshop site.
It will consist of two pages. One for displaying existing books, another for adding new or editing existing ones.
For client-server interaction you should install and run mock server.
Detailed description of "how to" are described further.

## Endpoints

```
  http://localhost:3004/books
  http://localhost:3004/formats
  http://localhost:3004/countries
  http://localhost:3004/cities
  http://localhost:3004/companies
```

## Request Authentication header

For retrieving data every request should be supplied with
"x-auth-token: bad18eba1ff45jk7858b8ae88a77fa30" header.

## Assignment 1

'Main' - page:

1. Output list of available books.
2. Each book should contain link to "Book page" for editing.

## Assignment 2

'Book' - page:

1. Page should contain form with next fields:
   - Author (input)
   - Title (input)
   - ISBN (input)
   - Number of Pages (select)
   - Format (select)
   - Description (textarea)
   - Price (input)
   - Country (select)
   - City (select)
   - Company (select)
2. Add validation and display errors under invalid fields.
3. All fields are required.
4. Format, Country, City, Company options should be loaded from server.
5. Submit form data to server.

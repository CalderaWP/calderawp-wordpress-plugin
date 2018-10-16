Run tests:

1) Start local dev environment (See main readme)
2) Start test runner (See main readme)
3) Choose a test suite to run from Cypress menu

## How To Add A Test
* Export your form
* save form in `cypress/forms` using form ID as file name
* Add an entry in `cypress/test.json` to `forms` with:
    - `formId` - Required. The ID of the form
    - `pageSlug` - Optional. Slug of page to put form on. Skip for admin tests.
    - `ghostId` - Optional. ID of Ghost Inspector test if it exists.
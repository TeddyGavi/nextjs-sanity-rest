import { StructureBuilder } from 'sanity/desk'
export const myStructure = (S: StructureBuilder) =>
  S.list()
    .title('Home')
    .items([
      S.listItem()
        .id('menu')
        .title('Menu')
        .child(
          S.list()
            .title('Menu Items')
            .items([
              ...S.documentTypeListItems().filter(
                (listItem) => listItem.getId() !== 'information'
              ),
            ])
        ),
      S.listItem()
        .id('info')
        .title('Restaurant Information')
        .child(
          S.list()
            .title('Information')
            .items([
              S.listItem()
                .title('Information')
                .child(
                  S.document()
                    .schemaType('information')
                    .documentId('information')
                ),
            ])
        ),
      // ...S.documentTypeListItems().filter(
      //   (listItem) => !['drinks'].includes(listItem.getId())
      // ),
    ])

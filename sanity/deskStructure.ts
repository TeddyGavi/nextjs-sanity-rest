import { ComposeIcon } from '@sanity/icons'
import { LinkIcon } from '@sanity/icons'
import { MenuIcon } from '@sanity/icons'
import { InfoOutlineIcon } from '@sanity/icons'
import { StructureBuilder } from 'sanity/desk'

export const myStructure = (S: StructureBuilder) =>
  S.list()
    .title('Home')
    .items([
      S.listItem()
        .id('menu')
        .title('Menu')
        .icon(MenuIcon)
        .child(
          S.list()
            .title('Menu Items')
            .showIcons(false)
            .items([
              ...S.documentTypeListItems().filter(
                (listItem) => listItem.getId() !== 'information'
              ),
            ])
        ),
      S.listItem()
        .id('info')
        .title('Restaurant Information')
        .icon(InfoOutlineIcon)
        .child(
          S.list()
            .title('Information')
            .items([
              S.listItem()
                .title('Information')
                .icon(ComposeIcon)
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

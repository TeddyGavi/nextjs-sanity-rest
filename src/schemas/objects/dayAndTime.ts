import { days } from 'constants/days'
// import {defineField, defineType} from "@sanity-typed/types"
// import type {InferSchemaValues} from "@sanity-typed/types"
import { defineField, defineType } from 'sanity'

const verifyInput = (dayAndTime) => {
  const { day, opensAt, closesAt } = dayAndTime
  if (!day) {
    return 'Please select a day'
  }
  if (!opensAt) {
    return 'Choose when the store opens'
  }
  if (!closesAt) {
    return 'Choose when the store closes'
  }
  return opensAt < closesAt
    ? true
    : `Let's open the store before we close it on ${day}, shall we?`
}

export default defineType({
  name: 'dayAndTime',
  title: 'Open Hours',
  type: 'object',
  validation: (Rule) => Rule.custom(verifyInput),
  fields: [
    defineField({
      name: 'day',
      title: 'Day',
      type: 'string',
      description: 'Select day of week',
      options: {
        list: days,
        layout: 'radio',
      },
    }),
    defineField({
      name: 'opensAt',
      title: 'Open Time',
      description: 'When will you open?',
      type: 'string',
    }),
    defineField({
      name: 'closesAt',
      title: 'Closing time!',
      description: 'When will you close?',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      day: 'day',
      opensAt: 'opensAt',
      closesAt: 'closesAt',
    },
    prepare({ day, opensAt, closesAt }) {
      return {
        title: day,
        subtitle: `${opensAt} - ${closesAt}`,
      }
    },
  },
})

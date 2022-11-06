export default {
  name: 'dish',
  title: 'Dish',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name of dish',
      type: 'string',
      validation: (Rule)=>Rule.required()
    },
    {
      name: 'short_description',
      title: 'Short Description',
      type: 'string',
      validation: (Rule)=>Rule.required()
    },
    {
      name: 'price',
      title: 'Price of the dish in USD',
      type: 'number',
      validation: (Rule)=>Rule.required().min(0)
    },
    {
      name: 'image',
      title: 'Image of the Dish',
      type: 'image',
    },
  ],
}

// schemas/pet.js
export default {
    name: 'saree',
    type: 'document',
    title: 'Saree',
    fields: [
        {
            name:'image',
            type:'image',
            title:'Image',
            validation:(rule)=>rule.required(),
        },
        {
            name:'name',
            type:'string',
            title:'Product_name',
            validation:(rule)=>rule.required(),
        },
        {
            name:'description',
            type:'string',
            title:'product_description',
            validation:(rule)=>rule.required(),
        },
        {
            name:'ratings',
            type:'number',
            title:'Product_ratings',
            validation:(rule)=>rule.required().min(1).max(5).error("please enter between 1 and 5 only "),
        },
        {
            name:'manu',
            type:'string',
            title:'Owner',
            validation:(rule)=>rule.required(),
        },
        {
            name:'nft',
            type:'number',
            title:'nft_rate',
            
        },
        {
            name:'views',
            type:'number',
            title:'Viewed',
            validation:(rule)=>rule.required(),
        },
        {
            name:'id',
            type:'number',
            title:'ID',
            validation:(rule)=>rule.required(),
        },
        {
            name:'cost',
            type:'number',
            title:'Price',
            validation:(rule)=>rule.required(),
        },
        {
            name:'offers',
            type:'string',
            title:'Offers',
        }
    ]
  }
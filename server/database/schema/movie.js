const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {Mixed, ObjectId} = Schema.Types;

const movieSchema = new Schema({
    doubanId: {
        unique:true,
        type:String
    },
    rate: Number,
    title: String,
    summary: String,
    vedio: String,
    poster: String,
    cover: String,

    vedioKey: String,
    posterKey: String,
    coverKey: String,

    rowTitle: String,
    movieTypes: [String],
    pubDate: Mixed,
    year: Number,
    tags: Array,

    category:{
        type:ObjectId,
        ref:'Category'
    },
    meta: {
        updatedAt: {
            type: Date,
            default: Date.now()
        }
    }
});

movieSchema.pre('save',next=>{
    if(this.isNew){
        this.meta.createdAt=this.meta.updatedAt=Date.now();
    }else{
        this.meta.updatedAt=Date.now();
    }
    next();
})

mongoose.model('Movie',movieSchema)
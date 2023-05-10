import {Schema,model} from "mongoose"

//defining user document schema
const roomSchema=new Schema({
    roomName:{type:String,required:true},
    userId:{type:Schema.Types.ObjectId, ref:"users"},
    players:[{type:Schema.Types.ObjectId,ref:"users"}]
})

//creating users collection
const RoomCollection=model("rooms",roomSchema)

export default RoomCollection;
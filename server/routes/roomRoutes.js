import { Router } from "express";
import { createRoom, deleteRoom, getAllRooms, getSingleRoom} from "../controllers/roomControllers.js";



const router = Router();

//get all rooms
router.get("/",getAllRooms)



//create room
router.post("/",createRoom)


//get single room by id
router.get("/:id",getSingleRoom)


//delete room
router.delete("/:id",deleteRoom)


export default router;
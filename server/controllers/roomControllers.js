import httpErrors from "http-errors";
import RoomCollection from "../models/roomSchema.js";

export const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await RoomCollection.find().populate("players");
    res.json({ success: true, data: rooms });
  } catch (err) {
    next(
      new httpErrors.InternalServerError("Please try again in few minutes !")
    );
  }
};

export const getSingleRoom = async (req, res, next) => {
    try {
      const { id } = req.params;
      const room = await RoomCollection.findByID(id);
      res.json({ success: true, data: room });
    } catch (err) {
      next(new httpErrors.NotFound("No record found !"));
    }
  };


  export const createRoom = async (req, res, next) => {
    try {
      const room = new RoomCollection(req.body);
      await room.save();
      res.json({ success: true, data: room });
    } catch (err) {
      next(new httpErrors.InternalServerError(err.message));
    }
  };
  



  export const deleteRoom = async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedRoom = await RoomCollection.findByIdAndRemove(id);
      res.json({ success: true, data: deletedRoom });
    } catch (err) {
      next(new httpErrors.NotFound("No record found !"));
    }
  };
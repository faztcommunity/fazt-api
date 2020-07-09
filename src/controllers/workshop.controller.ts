import { Request, Response } from "express";
import Workshop from "../models/Workshops";

export const getWorshops = async (req: Request, res: Response) => {
  try {
    const workshops = await Workshop.find();
    return res.status(200).json(workshops);
  } catch (e) {
    return res.status(500).send({ message: "Error getting workshops" });
  }
};
export const getWorshop = async (req: Request, res: Response) => {
  const workshops = await Workshop.findById(req.params.id);
  return res.status(200).json(workshops);
};
export const createWorshop = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { title, description, date, workshopUser } = req.body;
    const newWorkshop = new Workshop({
      title,
      description,
      date,
      workshopUser,
    });
    await newWorkshop.save();
    return res.status(201).json(newWorkshop);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const deleteWorshop = async (req: Request, res: Response) => {
  try {
    const workshopDeleted = await Workshop.findByIdAndDelete(req.params.id);
    if (!workshopDeleted) return res.json({ message: "Workshop not found" });
    res.status(200).json({ message: "Workshop Deleted" });
  } catch (e) {
    res.status(500).json({ message: "Error delete workshop" });
  }
};
export const updateWorshop = async (req: Request, res: Response) => {
  try{
  const workshop = await Workshop.findById(req.params.id);
  if (!workshop) {
    return res.status(200).json({ message: "Workshop Updated" });
     await Workshop.findByIdAndUpdate(req.params.id, req.body);

  }
}catch (e) {
  return res.status(500).json({ message: "Workshop not found" });

}
};

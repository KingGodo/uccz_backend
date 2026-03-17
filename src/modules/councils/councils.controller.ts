import { Request, Response } from "express";
import * as service from "./councils.service";

export const getCouncils = async (req: Request, res: Response) => {

  try {

    const councils = await service.getCouncils();

    res.json({
      success: true,
      data: councils
    });

  } catch {

    res.status(500).json({
      success: false,
      message: "Failed to fetch councils"
    });

  }

};

export const getCouncil = async (req: Request, res: Response) => {

  try {

    const id = Number(req.params.id);

    const council = await service.getCouncilById(id);

    if (!council) {
      return res.status(404).json({
        success: false,
        message: "Council not found"
      });
    }

    res.json({
      success: true,
      data: council
    });

  } catch {

    res.status(500).json({
      success: false,
      message: "Error fetching council"
    });

  }

};

export const getCouncilsByChurch = async (req: Request, res: Response) => {

  try {

    const churchId = Number(req.params.churchId);

    const councils = await service.getCouncilsByChurch(churchId);

    res.json({
      success: true,
      data: councils
    });

  } catch {

    res.status(500).json({
      success: false,
      message: "Error fetching councils"
    });

  }

};

export const createCouncil = async (req: Request, res: Response) => {

  try {

    const council = await service.createCouncil(req.body);

    res.status(201).json({
      success: true,
      data: council
    });

  } catch (error: any) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }

};

export const updateCouncil = async (req: Request, res: Response) => {

  try {

    const id = Number(req.params.id);

    const council = await service.updateCouncil(id, req.body);

    res.json({
      success: true,
      data: council
    });

  } catch {

    res.status(500).json({
      success: false,
      message: "Failed to update council"
    });

  }

};

export const deleteCouncil = async (req: Request, res: Response) => {

  try {

    const id = Number(req.params.id);

    await service.deleteCouncil(id);

    res.json({
      success: true,
      message: "Council deleted"
    });

  } catch {

    res.status(500).json({
      success: false,
      message: "Failed to delete council"
    });

  }

};

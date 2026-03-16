import { Request, Response } from "express";
import * as service from "./churches.service";

export const getChurches = async (req: Request, res: Response) => {

  try {

    const churches = await service.getAllChurches();

    res.json({
      success: true,
      data: churches
    });

  } catch {

    res.status(500).json({
      success: false,
      message: "Failed to fetch churches"
    });

  }

};

export const getChurch = async (req: Request, res: Response) => {

  try {

    const id = Number(req.params.id);

    const church = await service.getChurchById(id);

    if (!church) {
      return res.status(404).json({
        success: false,
        message: "Church not found"
      });
    }

    res.json({
      success: true,
      data: church
    });

  } catch {

    res.status(500).json({
      success: false,
      message: "Error fetching church"
    });

  }

};

export const getChurchesByRegion = async (
  req: Request,
  res: Response
) => {

  try {

    const regionId = Number(req.params.regionId);

    const churches = await service.getChurchesByRegion(regionId);

    res.json({
      success: true,
      data: churches
    });

  } catch {

    res.status(500).json({
      success: false,
      message: "Failed to fetch churches"
    });

  }

};

export const createChurch = async (req: Request, res: Response) => {

  try {

    const church = await service.createChurch(req.body);

    res.status(201).json({
      success: true,
      data: church
    });

  } catch {

    res.status(500).json({
      success: false,
      message: "Failed to create church"
    });

  }

};

export const updateChurch = async (req: Request, res: Response) => {

  try {

    const id = Number(req.params.id);

    const church = await service.updateChurch(id, req.body);

    res.json({
      success: true,
      data: church
    });

  } catch {

    res.status(500).json({
      success: false,
      message: "Failed to update church"
    });

  }

};

export const deleteChurch = async (req: Request, res: Response) => {

  try {

    const id = Number(req.params.id);

    const church = await service.deleteChurch(id);

    res.json({
      success: true,
      data: church
    });

  } catch {

    res.status(500).json({
      success: false,
      message: "Failed to delete church"
    });

  }

};

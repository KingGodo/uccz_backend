import { Request, Response } from "express";
import * as service from "./regions.service";

export const getRegions = async (req: Request, res: Response) => {

  try {

    const regions = await service.getAllRegions();

    res.json({
      success: true,
      data: regions
    });

  } catch {

    res.status(500).json({
      success: false,
      message: "Failed to fetch regions"
    });

  }

};

export const getRegion = async (req: Request, res: Response) => {

  try {

    const id = Number(req.params.id);

    const region = await service.getRegionById(id);

    if (!region) {
      return res.status(404).json({
        success: false,
        message: "Region not found"
      });
    }

    res.json({
      success: true,
      data: region
    });

  } catch {

    res.status(500).json({
      success: false,
      message: "Error fetching region"
    });

  }

};

export const getRegionsByConference = async (
  req: Request,
  res: Response
) => {

  try {

    const conferenceId = Number(req.params.conferenceId);

    const regions = await service.getRegionsByConference(conferenceId);

    res.json({
      success: true,
      data: regions
    });

  } catch {

    res.status(500).json({
      success: false,
      message: "Failed to fetch regions"
    });

  }

};

export const createRegion = async (req: Request, res: Response) => {

  try {

    const region = await service.createRegion(req.body);

    res.status(201).json({
      success: true,
      data: region
    });

  } catch {

    res.status(500).json({
      success: false,
      message: "Failed to create region"
    });

  }

};

export const updateRegion = async (req: Request, res: Response) => {

  try {

    const id = Number(req.params.id);

    const region = await service.updateRegion(id, req.body);

    res.json({
      success: true,
      data: region
    });

  } catch {

    res.status(500).json({
      success: false,
      message: "Failed to update region"
    });

  }

};

export const deleteRegion = async (req: Request, res: Response) => {

  try {

    const id = Number(req.params.id);

    const region = await service.deleteRegion(id);

    res.json({
      success: true,
      data: region
    });

  } catch {

    res.status(500).json({
      success: false,
      message: "Failed to delete region"
    });

  }

};

import { Request, Response } from "express";
import * as service from "./ministries.service";

export const getMinistries = async (req: Request, res: Response) => {

  try {

    const ministries = await service.getMinistries();

    res.json({
      success: true,
      data: ministries
    });

  } catch {

    res.status(500).json({
      success: false,
      message: "Failed to fetch ministries"
    });

  }

};

export const getMinistry = async (req: Request, res: Response) => {

  try {

    const id = Number(req.params.id);

    const ministry = await service.getMinistryById(id);

    if (!ministry) {
      return res.status(404).json({
        success: false,
        message: "Ministry not found"
      });
    }

    res.json({
      success: true,
      data: ministry
    });

  } catch {

    res.status(500).json({
      success: false,
      message: "Error fetching ministry"
    });

  }

};

export const createMinistry = async (req: Request, res: Response) => {

  try {

    const ministry = await service.createMinistry(req.body);

    res.status(201).json({
      success: true,
      data: ministry
    });

  } catch (error: any) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }

};

export const updateMinistry = async (req: Request, res: Response) => {

  try {

    const id = Number(req.params.id);

    const ministry = await service.updateMinistry(id, req.body);

    res.json({
      success: true,
      data: ministry
    });

  } catch {

    res.status(500).json({
      success: false,
      message: "Failed to update ministry"
    });

  }

};

export const deleteMinistry = async (req: Request, res: Response) => {

  try {

    const id = Number(req.params.id);

    await service.deleteMinistry(id);

    res.json({
      success: true,
      message: "Ministry deleted"
    });

  } catch {

    res.status(500).json({
      success: false,
      message: "Failed to delete ministry"
    });

  }

};

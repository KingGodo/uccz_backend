import { Request, Response } from "express";
import * as service from "./conferences.service";

export const getConferences = async (req: Request, res: Response) => {
  try {

    const conferences = await service.getAllConferences();

    res.json({
      success: true,
      data: conferences
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to fetch conferences"
    });

  }
};

export const getConference = async (req: Request, res: Response) => {
  try {

    const id = Number(req.params.id);

    const conference = await service.getConferenceById(id);

    if (!conference) {
      return res.status(404).json({
        success: false,
        message: "Conference not found"
      });
    }

    res.json({
      success: true,
      data: conference
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Error fetching conference"
    });

  }
};

export const createConference = async (req: Request, res: Response) => {
  try {

    const conference = await service.createConference(req.body);

    res.status(201).json({
      success: true,
      data: conference
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to create conference"
    });

  }
};

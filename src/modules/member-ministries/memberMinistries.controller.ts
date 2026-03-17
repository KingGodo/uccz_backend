import { Request, Response } from "express";
import * as service from "./memberMinistries.service";

export const getAll = async (req: Request, res: Response) => {

  try {

    const data = await service.getAll();

    res.json({
      success: true,
      data
    });

  } catch {

    res.status(500).json({
      success: false,
      message: "Failed to fetch records"
    });

  }

};

export const getOne = async (req: Request, res: Response) => {

  try {

    const id = Number(req.params.id);

    const record = await service.getById(id);

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Record not found"
      });
    }

    res.json({
      success: true,
      data: record
    });

  } catch {

    res.status(500).json({
      success: false,
      message: "Error fetching record"
    });

  }

};

export const getMemberMinistries = async (req: Request, res: Response) => {

  try {

    const memberId = Number(req.params.memberId);

    const data = await service.getByMember(memberId);

    res.json({
      success: true,
      data
    });

  } catch {

    res.status(500).json({
      success: false,
      message: "Error fetching member ministries"
    });

  }

};

export const create = async (req: Request, res: Response) => {

  try {

    const record = await service.create(req.body);

    res.status(201).json({
      success: true,
      data: record
    });

  } catch (error: any) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }

};

export const update = async (req: Request, res: Response) => {

  try {

    const id = Number(req.params.id);

    const record = await service.update(id, req.body);

    res.json({
      success: true,
      data: record
    });

  } catch {

    res.status(500).json({
      success: false,
      message: "Failed to update record"
    });

  }

};

export const remove = async (req: Request, res: Response) => {

  try {

    const id = Number(req.params.id);

    await service.remove(id);

    res.json({
      success: true,
      message: "Removed successfully"
    });

  } catch {

    res.status(500).json({
      success: false,
      message: "Failed to delete"
    });

  }

};

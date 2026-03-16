import { Request, Response } from "express";
import * as service from "./members.service";

export const getMembers = async (req: Request, res: Response) => {

  try {

    const members = await service.getMembers();

    res.json({
      success: true,
      data: members
    });

  } catch {

    res.status(500).json({
      success: false,
      message: "Failed to fetch members"
    });

  }

};

export const getMember = async (req: Request, res: Response) => {

  try {

    const id = Number(req.params.id);

    const member = await service.getMemberById(id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found"
      });
    }

    res.json({
      success: true,
      data: member
    });

  } catch {

    res.status(500).json({
      success: false,
      message: "Error fetching member"
    });

  }

};

export const createMember = async (req: Request, res: Response) => {

  try {

    const member = await service.createMember(req.body);

    res.status(201).json({
      success: true,
      data: member
    });

  } catch (error: any) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }

};

export const updateMember = async (req: Request, res: Response) => {

  try {

    const id = Number(req.params.id);

    const member = await service.updateMember(id, req.body);

    res.json({
      success: true,
      data: member
    });

  } catch {

    res.status(500).json({
      success: false,
      message: "Failed to update member"
    });

  }

};

export const deleteMember = async (req: Request, res: Response) => {

  try {

    const id = Number(req.params.id);

    await service.deleteMember(id);

    res.json({
      success: true,
      message: "Member deleted"
    });

  } catch {

    res.status(500).json({
      success: false,
      message: "Failed to delete member"
    });

  }

};

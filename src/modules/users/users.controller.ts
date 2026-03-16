import { Request, Response } from "express";
import * as service from "./users.service";

export const getUsers = async (req: Request, res: Response) => {

  try {

    const users = await service.getUsers();

    res.json({
      success: true,
      data: users
    });

  } catch {

    res.status(500).json({
      success: false,
      message: "Failed to fetch users"
    });

  }

};

export const getUser = async (req: Request, res: Response) => {

  try {

    const id = Number(req.params.id);

    const user = await service.getUserById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.json({
      success: true,
      data: user
    });

  } catch {

    res.status(500).json({
      success: false,
      message: "Error fetching user"
    });

  }

};

export const createUser = async (req: Request, res: Response) => {

  try {

    const user = await service.createUser(req.body);

    res.status(201).json({
      success: true,
      data: user
    });

  } catch (error: any) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }

};

export const updateUser = async (req: Request, res: Response) => {

  try {

    const id = Number(req.params.id);

    const user = await service.updateUser(id, req.body);

    res.json({
      success: true,
      data: user
    });

  } catch {

    res.status(500).json({
      success: false,
      message: "Failed to update user"
    });

  }

};

export const deleteUser = async (req: Request, res: Response) => {

  try {

    const id = Number(req.params.id);

    await service.deleteUser(id);

    res.json({
      success: true,
      message: "User deleted"
    });

  } catch {

    res.status(500).json({
      success: false,
      message: "Failed to delete user"
    });

  }

};

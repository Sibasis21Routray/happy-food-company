import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import * as userDao from "../dao/userDao";

export interface AuthRequest extends Request {
  userId?: string;
  user?: any;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ 
      message: "No token, unauthorized" 
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
    
    const user = await userDao.findUserById(decoded.userId);
    
    if (!user) {
      res.status(401).json({ 
        message: "User not found" 
      });
      return;
    }

    if (user.isBlocked) {
      res.status(403).json({ 
        message: "User is blocked" 
      });
      return;
    }

    req.userId = decoded.userId;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ 
      message: "Invalid token" 
    });
  }
};

// ─── IS ADMIN - Check for lowercase 'admin' ──────────────────
export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
  // Check both role values (uppercase and lowercase)
  const role = req.user?.role?.toLowerCase();
  
  if (role === 'admin') {
    next();
  } else {
    res.status(403).json({ 
      message: "Access denied. Admin only." 
    });
  }
};

// ─── IS VENDOR - Check for lowercase 'vendor' ────────────────
export const isVendor = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const role = req.user?.role?.toLowerCase();
  
  if (role === 'vendor' || role === 'admin') {
    next();
  } else {
    res.status(403).json({ 
      message: "Access denied. Vendor only." 
    });
  }
};

// ─── IS CUSTOMER - Check for lowercase 'user' ────────────────
export const isCustomer = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const role = req.user?.role?.toLowerCase();
  
  if (role === 'user') {
    next();
  } else {
    res.status(403).json({ 
      message: "Access denied. Customer only." 
    });
  }
};

// ─── IS ADMIN OR VENDOR ──────────────────────────────────────
export const isAdminOrVendor = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const role = req.user?.role?.toLowerCase();
  
  if (role === 'admin' || role === 'vendor') {
    next();
  } else {
    res.status(403).json({ 
      message: "Access denied. Admin or Vendor only." 
    });
  }
};
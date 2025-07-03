import { Response } from "express";

class ApiResponse {
  static success<T = unknown>(
    res: Response,
    options: {
      data?: T;
      message?: string;
      code?: number;
    } = {}
  ): void {
    const { data, message = "Success", code = 200 } = options;

    res.status(code).json({
      success: true,
      message,
      data,
    });
  }

  static failure(
    res: Response,
    options: {
      error: unknown;
      message?: string;
      code?: number;
    }
  ): void {
    const { error, message = "Something went wrong!", code = 500 } = options;

    res.status(code).json({
      success: false,
      message,
      error,
    });
  }
}

export default ApiResponse;

import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

type ValidationRequest<TBody, TQuery, TParams> = Request<
  TParams,
  any,
  TBody,
  TQuery
>;

export function validateRequest<
  TBody = any,
  TQuery = any,
  TParams = any
>(schemas: {
  body?: ZodSchema<TBody>;
  query?: ZodSchema<TQuery>;
  params?: ZodSchema<TParams>;
}) {
  return (
    req: ValidationRequest<TBody, TQuery, TParams>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (schemas.body) req.body = schemas.body.parse(req.body);
      if (schemas.query) req.query = schemas.query.parse(req.query);
      if (schemas.params) req.params = schemas.params.parse(req.params);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).json({
          success: false,
          message: "Validation error",
          errors: err.errors,
        });
        return;
      }
      next();
    }
  };
}

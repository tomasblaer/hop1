import e from "express";
import { Schema } from "express-validator";

export const createItemSchema: Schema = {
  name: {
    in: ["body"],
    optional: false,
    isLength: {
      options: { min: 1 },
      errorMessage: "Name is required",
      bail: true,
    },
    isString: {
      errorMessage: "Name must be a string",
      bail: true,
    },
    escape: true,
  },
  price: {
    in: ["body"],
    optional: false,
    isInt: {
      errorMessage: "Price must be an integer",
      bail: true,
    },
    escape: true,
  },
  companyId: {
    in: ["body"],
    optional: false,
    isInt: {
      errorMessage: "Company must be an integer",
      bail: true,
    },
    toInt: true,
  },
  amount: {
    in: ["body"],
    optional: false,
    isInt: {
      errorMessage: "Amount must be an integer",
      bail: true,
    },
    escape: true,
  },
  location: {
    in: ["body"],
    optional: true,
    isString: {
      errorMessage: "Location must be a string",
      bail: true,
    },
    escape: true,
  },
  comment: {
    in: ["body"],
    optional: true,
    isString: {
      errorMessage: "Comment must be a string",
      bail: true,
    },
    escape: true,
  },
};

export const updateItemSchema: Schema = {
  name: {
    in: ["body"],
    optional: true,
    isLength: {
      options: { min: 1 },
      errorMessage: "Name is required",
      bail: true,
    },
    isString: {
      errorMessage: "Name must be a string",
      bail: true,
    },
    escape: true,
  },
  price: {
    in: ["body"],
    optional: true,
    isInt: {
      errorMessage: "Price must be an integer",
      bail: true,
    },
    escape: true,
  },
  companyId: {
    in: ["body"],
    optional: true,
    isInt: {
      errorMessage: "Company must be an integer",
      bail: true,
    },
    toInt: true,
  },
  amount: {
    in: ["body"],
    optional: true,
    isInt: {
      errorMessage: "Amount must be an integer",
      bail: true,
    },
    escape: true,
  },
  location: {
    in: ["body"],
    optional: true,
    isString: {
      errorMessage: "Location must be a string",
      bail: true,
    },
    escape: true,
  },
  comment: {
    in: ["body"],
    optional: true,
    isString: {
      errorMessage: "Comment must be a string",
      bail: true,
    },
    escape: true,
  },
  saleId: {
    in: ["body"],
    optional: true,
    isString: {
      errorMessage: "Sale must be a string",
      bail: true,
    },
    escape: true,
  },
};

export const createCompanySchema: Schema = {
  name: {
    in: ["body"],
    optional: false,
    isLength: {
      options: { min: 1 },
      errorMessage: "Name is required",
      bail: true,
    },
    isString: {
      errorMessage: "Name must be a string",
      bail: true,
    },
    escape: true,
  },
};

export const updateCompanySchema: Schema = {
  name: {
    in: ["body"],
    optional: true,
    isLength: {
      options: { min: 1 },
      errorMessage: "Name is required",
      bail: true,
    },
    isString: {
      errorMessage: "Name must be a string",
      bail: true,
    },
    escape: true,
  },
};


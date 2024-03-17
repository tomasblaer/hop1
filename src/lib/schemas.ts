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

export const createUserSchema: Schema = {
  username: {
    in: ["body"],
    optional: true,
    isLength: {
      options: { min: 1, max: 255 },
      errorMessage: "username cannot be empty / longer than 255 characters",
    },
    escape: true,
  },
  email: {
    in: ["body"],
    optional: true,
    isLength: {
      options: { min: 0, max: 255 },
      errorMessage: "email cannot be empty / longer than 255 characters",
      bail: true,
    },
    isEmail: {
      errorMessage: "Invalid email address format",
    },
    notEmpty: true,
    escape: true,
  },
  companyId: {
    in: ["body"],
    isInt: {
      errorMessage: "companyId (number) is required",
    }
  },
  password: {
    in: ["body"],
    isLength: {
      options: { min: 3 },
      errorMessage: "Password is required",
      bail: true,
    },
  },
};



export const createItemTypeSchema: Schema = {
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
    isInt: {
      errorMessage: "Price (number) is required",
      bail: true,
    },
  },
  companyId: {
    in: ["body"],
    isInt: {
      errorMessage: "companyId (number) is required",
    }
  }
};

export const updateItemTypeSchema: Schema = {
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
    isInt: {
      errorMessage: "Price (number) is required",
      bail: true,
    },
  },
};

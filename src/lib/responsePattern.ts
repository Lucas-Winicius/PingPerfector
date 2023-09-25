interface ResponseOptions {
  mode: "success" | "error";
  status?: number;
  message?: string;
  data?: object;
}

function createResponse({ mode, status, message, data }: ResponseOptions) {
  if (mode === "success") {
    return {
      status: status || 200,
      message: message || "Success: The operation was completed successfully.",
      data,
    };
  }

  if (mode === "error") {
    return {
      status: status || 500,
      message: message || "Oops! Something went wrong. Please try again later.",
      error: data !== undefined ? data : {},
    };
  }
}

export default createResponse;

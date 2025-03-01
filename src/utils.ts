import sanitizeHtml from "sanitize-html";

export const sanitize = (input: string) => {
  return sanitizeHtml(input, {
    allowedTags: [],
    allowedAttributes: {},
  });
};

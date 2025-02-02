import keyBy from "lodash/keyBy";
import mapValues from "lodash/mapValues";

export interface Header {
  name: string;
  value: string;
  error?: boolean;
}

export const stringifyHeaders = (headers: Header[]): string =>
  JSON.stringify(mapValues(keyBy(headers, "name"), "value"));

const validateName = (name: string) => {
  if (
    name.toLowerCase().match("(^x$)|(^x-)|(^authorization$)|(^authorization-)")
  ) {
    return false;
  }

  if (name === "") {
    return false;
  }

  return true;
};

export const mapHeaders = (customHeaders: string): Header[] => {
  const parsedHeaders = JSON.parse(customHeaders);

  return Object.keys(parsedHeaders).map(key => ({
    name: key,
    value: parsedHeaders[key],
    error: validateName(key),
  }));
};

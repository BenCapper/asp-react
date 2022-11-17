import truncate from "lodash/truncate";

export function excerpt(string) {
  return truncate(string, {    
    length: 400, // maximum 400 characters
    separator: /,?\.* +/, // separate by spaces, including preceding commas and periods
  });
}

export function excerptShort(string) {
  return truncate(string, {    
    length: 150, // maximum 400 characters
    separator: /,?\.* +/, // separate by spaces, including preceding commas and periods
  });
}
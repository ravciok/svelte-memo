const { format } = new Intl.DateTimeFormat("en", {
  minute: "2-digit",
  second: "2-digit",
});

export const timeFormatter = format;

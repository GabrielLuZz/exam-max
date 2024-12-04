export function formatText(text: string, limit: number) {
  let textReduced = text.split(" ");

  if (textReduced.length > limit) {
    textReduced = textReduced.slice(0, limit);
    textReduced.push("...");
    return textReduced.join(" ");
  }

  return text;
}

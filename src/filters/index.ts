// Set utils function parseTime to filter
export { parseTime } from "@/utils";

// Filter for article status
export const articlesStatusFilter = (status: string) => {
  const statusMap: { [key: string]: string } = {
    published: "success",
    draft: "info",
    deleted: "danger"
  };
  return statusMap[status];
};

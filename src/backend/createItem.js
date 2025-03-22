const fs = require("fs");
const path = require("path");
const { parse } = require("json2csv");
let inputJson = JSON.parse(
  fs.readFileSync(path.join(__dirname, "input.json"), "utf8")
);

if (!Array.isArray(inputJson)) {
  inputJson = [inputJson];
}

const setDefaults = (data) => {
  return data.map((item) => {
    return {
      "Project Name": item["Project Name"] || "Unnamed",
      Gallery: item["Gallery"] || "sample_gallery.jpg",
      "Main Project Image": item["Main Project Image"] || "sample_image.jpg",
      "Hot Resell": item["Hot Resell"] || 0,
      "Retail Price From Manufacturer":
        item["Retail Price From Manufacturer"] || 0,
      "Max Price": item["Max Price"] || 0,
      "Average Price": item["Average Price"] || 0,
      "Recommended Reseller Buy Price (New)":
        item["Recommended Reseller Buy Price (New)"] ||
        (item["Average Price"] || 0) * 0.85,
      "Min Price": item["Min Price"] || (item["Average Price"] || 0) * 0.65,
      "Current Cheapest Reseller Price":
        item["Current Cheapest Reseller Price"] || 0,
      "Recommended Resell Price (New)":
        item["Recommended Resell Price (New)"] ||
        (item["Average Price"] || 0) * 0.75,
      "Number Of Identical Listings": item["Number Of Identical Listings"] || 0,
      "Short Project Description":
        item["Short Project Description"] || "No description",
      "Long Project Description":
        item["Long Project Description"] ||
        "There is no description for this project",
      "Projects (Item)": item["Projects (Item)"] || "sample_item",
      "Projects (List)": item["Projects (List)"] || "sample_list",
      "Date of Product Launch": item["Date of Product Launch"] || "2023-01-01",
      ID: item["ID"] || "0",
      "Created Date": item["Created Date"] || "2023-01-01T00:00:00Z",
      "Updated Date": item["Updated Date"] || "2023-01-02T00:00:00Z",
      Owner: item["Owner"] || "Unknown owner",
    };
  });
};

const inputJsonWithDefaults = setDefaults(inputJson);

const fields = Object.keys(inputJson[0]);
const opts = { fields };
try {
  const csv = parse(inputJson, opts);
  fs.writeFileSync(path.join(__dirname, "output.csv"), csv);
  console.log("CSV file successfully created");
} catch (err) {
  console.error(err);
}

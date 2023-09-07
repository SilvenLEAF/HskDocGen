const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");

const replaceDocPlaceholders = async ({ fileBuffer, placeholders, replacerKey }: any = {}) => {
  try {
    // Load the docx file as binary content
    const zip = new PizZip(fileBuffer);
    const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });

    // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
    const refinedPlaceholders: any = {};
    for (let [key, value] of Object.entries(placeholders)) {
      if (value === undefined || value === null) {
        refinedPlaceholders[key] = value || replacerKey || "";
      } else {
        refinedPlaceholders[key] = value;
      }
    }
    doc.render(refinedPlaceholders || {});

    const xnewFileBuffer = doc.getZip().generate({
      type: "nodebuffer",
      // compression: DEFLATE adds a compression step.
      // For a 50MB output document, expect 500ms additional CPU time
      compression: "DEFLATE",
    });

    return xnewFileBuffer;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export { replaceDocPlaceholders }
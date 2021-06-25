import fs from "fs-extra";

import { v4 as uuidv4 } from "uuid";

import createError from "http-errors";

import { fileURLToPath } from "url";

import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

export const getDataFilePath = (name) => join(__dirname, "../data", name);

export const readFile = async (name) => {
  const filesJSONPath = getDataFilePath(name);
  const json = await fs.readJSON(filesJSONPath);
  return json;
};

export const writeFile = async (name, content) => {
  const filesJSONPath = getDataFilePath(name);
  const json = await readFile(name);
  json.push({
    id: uuidv4(),
    ...content,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  await fs.writeJSON(filesJSONPath, json);
  return json;
};

export const findById = async (id, name) => {
  const json = await readFile(name);
  const foundObject = json.find((obj) => obj.id === id);
  if (foundObject) {
    return foundObject;
  } else {
    const error = createError(404, "This object not found");
    throw error;
  }
};

export const findByIdAndDelete = async (id, name) => {
  let json = await readFile(name);
  const filesJSONPath = getDataFilePath(name);
  const foundObject = json.find((obj) => obj.id === id);
  if (foundObject) {
    json = json.filter((obj) => obj.id !== id);
    await fs.writeJSON(filesJSONPath, json);
    return foundObject;
  } else {
    const error = createError(404, "This object not found");
    throw error;
  }
};

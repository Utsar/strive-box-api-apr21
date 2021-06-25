import { Router } from "express";

import createError from "http-errors";

import {
  readFile,
  writeFile,
  findById,
  findByIdAndDelete,
} from "../../utils/file-utils.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const files = await readFile("files.json");
    res.send(files);
  } catch (error) {}
});

router.post("/", async (req, res, next) => {
  try {
    const files = await writeFile("files.json", req.body);
    res.send(files);
  } catch (error) {}
});

router.get("/:id", async (req, res, next) => {
  try {
    const file = await findById(req.params.id, "files.json");
    res.send(file);
  } catch (err) {
    const error = createError(
      err.status || 500,
      err.message || "Cant delete file"
    );
    next(error);
  }
});

router.put("/:id", (req, res, next) => {
  try {
    res.send("UPDATE SINGLE FILE");
  } catch (error) {}
});

router.delete("/:id", async (req, res, next) => {
  try {
    const deletedObject = await findByIdAndDelete(req.params.id, "files.json");
    res.status(200).send(deletedObject);
  } catch (err) {
    const error = createError(
      err.status || 500,
      err.message || "Cant delete file"
    );
    next(error);
  }
});
export default router;

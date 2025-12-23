import { createClient } from "@supabase/supabase-js";
import "dotenv/config";
import fs from "fs/promises";
import download from "image-downloader";
import mime from "mime-types";
import multer from "multer";
import { __dirname } from "../../server.js";

const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, SUPABASE_BUCKET } =
  process.env;

const getExtension = (path) => {
  const mimeType = mime.lookup(path);
  const contentType = mime.contentType(mimeType);
  const extension = mime.extension(contentType);

  return extension;
};

const client = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

export const uploadSupabase = async ({ link, file }) => {
  let filename;
  let fullPath;
  let contentType;

  if (link) {
    const extension = getExtension(link);
    filename = `${Date.now()}.${extension}`;
    fullPath = `${__dirname}/tmp/${filename}`;
    contentType = mime.lookup(filename);

    await download.image({ url: link, dest: fullPath });
  } else if (file) {
    filename = file.filename;
    fullPath = file.path;
    contentType = file.mimetype;
  } else {
    throw new Error("Nenhum arquivo ou link informado");
  }

  const fileBuffer = await fs.readFile(fullPath);

  const { error } = await client.storage
    .from(SUPABASE_BUCKET)
    .upload(filename, fileBuffer, {
      contentType,
      upsert: true,
    });

  if (error) throw error;

  const { data } = client.storage.from(SUPABASE_BUCKET).getPublicUrl(filename);

  return {
    id: filename,
    url: data.publicUrl,
  };
};

export const downloadImage = async (link) => {
  if (!link) {
    throw new Error("URL da imagem não foi informada");
  }

  const extension = getExtension(link);
  const destination = `${__dirname}/tmp/`;

  const filename = `${Date.now()}.${extension}`;
  const fullPath = `${destination}${filename}`;

  try {
    const options = {
      url: link,
      dest: fullPath,
    };

    await download.image(options);

    return { filename, fullPath, mimeType };
    // console.log("Saved to", filename);
  } catch (error) {
    console.error("Erro ao baixar imagem:", error);
    throw error;
  }
};

export const uploadImage = () => {
  const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, `${__dirname}/tmp/`);
    },
    filename: function (req, file, cb) {
      const extension = mime.extension(file.mimetype);

      cb(null, `${Date.now()}.${extension}`);
    },
  });
  return multer({ storage });
};

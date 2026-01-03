import { createClient } from "@supabase/supabase-js";
import "dotenv/config";
import mime from "mime-types";
import multer from "multer";

const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, SUPABASE_BUCKET } =
  process.env;

const getExtension = (path) => {
  const mimeType = mime.lookup(path);

  if (!mimeType) {
    throw new Error("Não foi possível identificar o tipo do arquivo");
  }

  const extension = mime.extension(mimeType);

  return { extension, mimeType };
};

const client = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

export const uploadSupabase = async ({ link, file }) => {
  let filename;
  let fileBuffer;
  let contentType;

  if (link) {
    const { extension, mimeType } = getExtension(link);
    filename = `${Date.now()}.${extension}`;
    contentType = mimeType;

    const response = await fetch(link);
    fileBuffer = Buffer.from(await response.arrayBuffer());
  } else if (file) {
    filename = `${Date.now()}.${mime.extension(file.mimetype)}`;
    fileBuffer = file.buffer;
    contentType = file.mimetype;
  } else {
    throw new Error("Nenhum arquivo ou link informado");
  }

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

export const uploadImage = () => {
  return multer({
    storage: multer.memoryStorage(),
  });
};

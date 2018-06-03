import fs from 'fs';
import path from 'path';

const getCertificate = async () => {
  const certPromise = fs.promises.readFile(
    path.join(process.cwd(), 'ssl/localhost.crt'),
  );
  const keyPromise = fs.promises.readFile(
    path.join(process.cwd(), 'ssl/localhost.key'),
  );

  const [cert, key] = await Promise.all([certPromise, keyPromise]);

  return { cert, key };
};

export default getCertificate;
